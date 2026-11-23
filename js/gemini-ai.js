// =========================================================================
// MATHLAB MINI — PIKE MAN AI (GOOGLE GEMINI) + TAYLOR-MACLAURIN (n -> ∞)
// =========================================================================

(function () {
  "use strict";

  const STORAGE_KEYS = {
    API_KEY: "mathlab_gemini_api_key",
    API_KEY_LEGACY: "mathlab_gemini_api_key_v1",
    MODEL: "mathlab_gemini_model",
    THINKING: "mathlab_gemini_thinking",
    CUSTOM_TOPICS: "mathlab_ai_custom_topics_v8",
    PATCHED_TOPICS: "mathlab_ai_patched_topics_v8",
    PLAN: "mathlab_study_plan_v1",
  };

  // Model miễn phí mặc định & danh sách dự phòng (ưu tiên các bản Flash nhanh lên trước)
  const DEFAULT_HIGH_MODEL = "gemini-3.8-flash";
  const DEFAULT_THINKING_LEVEL = "low";
  const FREE_FALLBACK_MODELS = [
    "gemini-3.8-flash",
    "gemini-3.6-flash",
    "gemini-3.5-flash-lite",
    "gemini-3.1-flash-lite",
    "gemini-2.5-flash-lite",
    "gemini-4-hydrogen",
  ];
  // Nhớ tạm các model vừa bị quá tải 503/429 trong 90 giây để câu sau né qua luôn cho nhanh
  const overloadedUntil = {};

  // Từ điển tra cứu nhanh offline khi người dùng chưa dán Gemini API Key
  const OFFLINE_FORMULAS = [
    {
      keywords: ["taylor", "maclaurin", "khai triển"],
      title: "Khai triển Taylor & Maclaurin (Giải tích 1)",
      answer: `Công thức khai triển Maclaurin đến cấp $n$ với phần dư Peano:<br>
      $$f(x) = f(0) + \\frac{f'(0)}{1!}x + \\frac{f''(0)}{2!}x^2 + \\dots + \\frac{f^{(n)}(0)}{n!}x^n + o(x^n)$$
      <b>Các khai triển chuẩn hay dùng khử dạng vô định:</b><br>
      • $e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + o(x^3)$<br>
      • $\\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} + o(x^5)$<br>
      • $\\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} + o(x^4)$<br>
      • $\\ln(1+x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} + o(x^3)$`,
    },
    {
      keywords: ["vô cùng bé", "vcb", "tương đương", "giới hạn"],
      title: "Vô cùng bé (VCB) tương đương khi x → 0 (Giải tích 1)",
      answer: `Khi $u(x) \\to 0$:<br>
      • $\\sin u \\sim u \\sim \\tan u \\sim \\arcsin u \\sim \\arctan u$<br>
      • $1 - \\cos u \\sim \\frac{u^2}{2}$ ; $\\quad e^u - 1 \\sim u$ ; $\\quad \\ln(1+u) \\sim u$<br>
      • $(1+u)^\\alpha - 1 \\sim \\alpha u$<br>
      <i>Lưu ý:</i> Chỉ thay VCB tương đương trong phép <b>nhân / chia</b>, tuyệt đối không thay trong tổng/hiệu!`,
    },
    {
      keywords: [
        "hạng",
        "rank",
        "ma trận",
        "gauss",
        "độc lập tuyến tính",
        "kronecker",
      ],
      title: "Hạng ma trận & Định lý Kronecker–Capelli (ĐSTT)",
      answer: `• <b>Hạng ma trận:</b> $\\text{rank}(A)$ bằng số hàng khác $0$ sau khi khử Gauss về dạng bậc thang.<br>
      • <b>Định lý Kronecker–Capelli:</b> Hệ $AX = b$ ($n$ ẩn) có nghiệm $\\iff \\text{rank}(A) = \\text{rank}([A|b])$. Nghiệm duy nhất khi $= n$; vô số nghiệm phụ thuộc $n - r$ ẩn tự do khi $< n$.`,
    },
    {
      keywords: [
        "không gian con",
        "subspace",
        "span",
        "cơ sở",
        "số chiều",
        "grassmann",
      ],
      title: "Không gian con, Cơ sở & Công thức Grassmann (ĐSTT)",
      answer: `• $W \\subseteq V$ là không gian con $\\iff 0_V \\in W$ và $\\forall u, v \\in W, \\alpha, \\beta \\in \\mathbb{R}: \\alpha u + \\beta v \\in W$.<br>
      • <b>Công thức Grassmann:</b> $\\dim(U + W) = \\dim U + \\dim W - \\dim(U \\cap W)$.<br>
      • <b>Định lý số chiều ánh xạ tuyến tính:</b> $\\dim(\\ker f) + \\dim(\\operatorname{Im} f) = \\dim V$.`,
    },
  ];

  // -----------------------------------------------------------------------
  // 1. ĐỒNG BỘ DỮ LIỆU BÀI HỌC PIKE MAN AI ĐÃ TẠO VÀO DEFAULT_TOPICS
  // -----------------------------------------------------------------------
  function syncAILessonsIntoTopics() {
    if (typeof DEFAULT_TOPICS === "undefined") return;

    try {
      const customTopics = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.CUSTOM_TOPICS) || "[]",
      );
      customTopics.forEach((ct) => {
        if (!DEFAULT_TOPICS.some((t) => t.id === ct.id)) {
          DEFAULT_TOPICS.push(ct);
        }
      });

      const patches = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.PATCHED_TOPICS) || "{}",
      );
      Object.keys(patches).forEach((topicId) => {
        const target = DEFAULT_TOPICS.find((t) => t.id === topicId);
        if (!target) return;
        const p = patches[topicId];
        if (Array.isArray(p.exercises)) {
          p.exercises.forEach((ex) => {
            if (!target.exercises.some((e) => e.question === ex.question)) {
              target.exercises.push(ex);
            }
          });
        }
        if (Array.isArray(p.quiz)) {
          p.quiz.forEach((qz) => {
            if (!target.quiz.some((q) => q.question === qz.question)) {
              target.quiz.push(qz);
            }
          });
        }
      });
    } catch (err) {
      console.warn("[Pike Man AI] Lỗi đồng bộ dữ liệu bài học:", err);
    }
  }

  syncAILessonsIntoTopics();

  // -----------------------------------------------------------------------
  // 2. CORE GỌI GEMINI API (ĐỒNG BỘ KEY CHUNG TOÀN WEB)
  // -----------------------------------------------------------------------
  const PikeManAI = {
    getApiKey() {
      return (
        localStorage.getItem(STORAGE_KEYS.API_KEY) ||
        localStorage.getItem(STORAGE_KEYS.API_KEY_LEGACY) ||
        ""
      ).trim();
    },

    setApiKey(key) {
      const clean = (key || "").trim();
      localStorage.setItem(STORAGE_KEYS.API_KEY, clean);
      localStorage.setItem(STORAGE_KEYS.API_KEY_LEGACY, clean);
      const examKeyInput = document.getElementById("gemini-api-key-input");
      if (examKeyInput && examKeyInput.value !== clean) {
        examKeyInput.value = clean;
      }
    },

    getPreferredModel() {
      const saved = (localStorage.getItem(STORAGE_KEYS.MODEL) || "").trim();
      if (!saved || /^gemini-2\.5-pro$/i.test(saved)) {
        localStorage.setItem(STORAGE_KEYS.MODEL, DEFAULT_HIGH_MODEL);
        return DEFAULT_HIGH_MODEL;
      }
      return saved;
    },

    setPreferredModel(model) {
      const clean = (model || "").trim() || DEFAULT_HIGH_MODEL;
      localStorage.setItem(STORAGE_KEYS.MODEL, clean);
    },

    getThinkingLevel() {
      const saved = (localStorage.getItem(STORAGE_KEYS.THINKING) || "").trim();
      return ["minimal", "low", "medium", "high"].includes(saved)
        ? saved
        : DEFAULT_THINKING_LEVEL;
    },

    setThinkingLevel(level) {
      const clean = ["minimal", "low", "medium", "high"].includes(level)
        ? level
        : DEFAULT_THINKING_LEVEL;
      localStorage.setItem(STORAGE_KEYS.THINKING, clean);
    },

    resolveThinkingConfig(model, level) {
      if (!/^gemini-(3|4)/i.test(model)) return null;
      const clean = (level || DEFAULT_THINKING_LEVEL).toLowerCase();
      if (/^gemini-3\.8-flash|^gemini-4/i.test(model)) {
        if (clean === "minimal") return { thinkingLevel: "low" };
        if (["low", "medium", "high"].includes(clean)) {
          return { thinkingLevel: clean };
        }
        return { thinkingLevel: "low" };
      }
      if (["minimal", "low", "medium", "high"].includes(clean)) {
        return { thinkingLevel: clean };
      }
      return { thinkingLevel: "low" };
    },

    async fileToImagePayload(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error("Không đọc được file ảnh."));
        reader.onload = () => {
          const rawDataUrl = reader.result;
          const img = new Image();
          img.onerror = () => {
            const commaIdx = rawDataUrl.indexOf(",");
            resolve({
              mimeType: file.type || "image/jpeg",
              base64: commaIdx !== -1 ? rawDataUrl.slice(commaIdx + 1) : "",
              dataUrl: rawDataUrl,
              name: file.name || "bai-lam.jpg",
            });
          };
          img.onload = () => {
            const MAX_SIDE = 1280;
            let w = img.width;
            let h = img.height;
            if (w > MAX_SIDE || h > MAX_SIDE) {
              const ratio = Math.min(MAX_SIDE / w, MAX_SIDE / h);
              w = Math.round(w * ratio);
              h = Math.round(h * ratio);
            }
            const canvas = document.createElement("canvas");
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, w, h);
            const compressedUrl = canvas.toDataURL("image/jpeg", 0.82);
            const commaIdx = compressedUrl.indexOf(",");
            resolve({
              mimeType: "image/jpeg",
              base64: commaIdx !== -1 ? compressedUrl.slice(commaIdx + 1) : "",
              dataUrl: compressedUrl,
              name: file.name || "bai-lam.jpg",
            });
          };
          img.src = rawDataUrl;
        };
        reader.readAsDataURL(file);
      });
    },

    async fileToAttachmentPayload(file) {
      if (!file) throw new Error("Không có file hợp lệ.");
      const name = file.name || "tai-lieu";
      const type = (file.type || "").toLowerCase();

      if (type.startsWith("image/")) {
        const imgData = await this.fileToImagePayload(file);
        return { kind: "binary", ...imgData };
      }

      if (type === "application/pdf" || /\.pdf$/i.test(name)) {
        if (file.size > 18 * 1024 * 1024) {
          throw new Error(
            `File PDF "${name}" nặng quá 18MB, hãy tách nhỏ dưới 18MB để Gemini đọc ổn định nhé!`,
          );
        }
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onerror = () =>
            reject(new Error(`Không đọc được PDF "${name}".`));
          reader.onload = () => {
            const raw = String(reader.result || "");
            const commaIdx = raw.indexOf(",");
            resolve({
              kind: "binary",
              mimeType: "application/pdf",
              base64: commaIdx !== -1 ? raw.slice(commaIdx + 1) : "",
              name,
            });
          };
          reader.readAsDataURL(file);
        });
      }

      if (
        type.startsWith("text/") ||
        /\.(txt|md|tex|csv|json|html)$/i.test(name)
      ) {
        const textContent = await file.text();
        return {
          kind: "text",
          mimeType: type || "text/plain",
          textContent: textContent.slice(0, 60000),
          name,
        };
      }

      throw new Error(
        `Định dạng "${name}" chưa hỗ trợ trực tiếp. Hãy dùng PDF, Ảnh (JPG/PNG) hoặc file Text/Markdown (.txt, .md)!`,
      );
    },

    async generate({
      prompt,
      images = [],
      attachments = [],
      systemInstruction = "",
      jsonMode = false,
      temperature = 0.3,
      thinkingLevel = null,
      timeoutMs = null,
      onStatus = null,
    }) {
      const apiKey = this.getApiKey();
      if (!apiKey) {
        throw new Error(
          "Pike Man chưa có Gemini API Key! Mở tab '⚙️ API Key' dán key từ Google AI Studio vào nhé.",
        );
      }

      const allFiles = [
        ...(Array.isArray(images) ? images : []),
        ...(Array.isArray(attachments) ? attachments : []),
      ];
      const hasDocAttachment = allFiles.some(
        (f) => f && f.mimeType === "application/pdf",
      );

      const activeThinking = thinkingLevel || this.getThinkingLevel();
      const effectiveTimeout =
        timeoutMs ||
        (hasDocAttachment
          ? 60000
          : activeThinking === "high"
            ? 45000
            : activeThinking === "medium"
              ? 25000
              : 15000);

      const userParts = [];
      const extraTextBlocks = [];

      allFiles.forEach((item) => {
        if (!item) return;
        if (item.base64) {
          userParts.push({
            inline_data: {
              mime_type: item.mimeType || "image/jpeg",
              data: item.base64,
            },
          });
        } else if (item.textContent) {
          extraTextBlocks.push(
            `--- NỘI DUNG TỆP ĐÍNH KÈM (${item.name || "tai-lieu"}) ---\n${item.textContent}`,
          );
        }
      });

      const finalPrompt = extraTextBlocks.length
        ? `${extraTextBlocks.join("\n\n")}\n\n${prompt}`
        : prompt;
      userParts.push({ text: finalPrompt });

      const preferred = this.getPreferredModel();
      const baseList = [
        preferred,
        ...FREE_FALLBACK_MODELS.filter((m) => m !== preferred),
      ];
      const now = Date.now();
      const healthyModels = baseList.filter(
        (m) => !(overloadedUntil[m] && overloadedUntil[m] > now),
      );
      const cooledModels = baseList.filter(
        (m) => overloadedUntil[m] && overloadedUntil[m] > now,
      );
      const modelsToTry = [...healthyModels, ...cooledModels];

      let lastErr = null;
      for (let i = 0; i < modelsToTry.length; i++) {
        const model = modelsToTry[i];
        if (typeof onStatus === "function") {
          onStatus(model, i, modelsToTry.length);
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
          model,
        )}:generateContent?key=${encodeURIComponent(apiKey)}`;

        const body = {
          contents: [{ role: "user", parts: userParts }],
          generationConfig: { temperature },
        };

        const tConfig = this.resolveThinkingConfig(
          model,
          jsonMode ? "low" : activeThinking,
        );
        if (tConfig) {
          body.generationConfig.thinkingConfig = tConfig;
        }

        if (systemInstruction) {
          body.systemInstruction = { parts: [{ text: systemInstruction }] };
        }

        if (jsonMode) {
          body.generationConfig.responseMimeType = "application/json";
        }

        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), effectiveTimeout);

        try {
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            signal: controller.signal,
          });

          const data = await res.json();

          if (!res.ok) {
            const errMsg = data?.error?.message || `Lỗi HTTP ${res.status}`;
            // Nếu model tùy chỉnh không nhận tham số thinkingConfig thì tự thử lại không kèm tham số đó
            if (
              res.status === 400 &&
              body.generationConfig.thinkingConfig &&
              /thinking/i.test(errMsg)
            ) {
              delete body.generationConfig.thinkingConfig;
              const retryRes = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                signal: controller.signal,
              });
              const retryData = await retryRes.json();
              if (retryRes.ok) {
                const retryText =
                  retryData?.candidates?.[0]?.content?.parts
                    ?.map((p) => p.text || "")
                    .join("") || "";
                if (retryText) {
                  delete overloadedUntil[model];
                  return { text: retryText, modelUsed: model };
                }
              }
            }

            console.warn(`[Pike Man] ${model} (${res.status}):`, errMsg);
            lastErr = new Error(`[Model: ${model}] ${errMsg}`);
            const isRetryable =
              res.status === 429 ||
              res.status === 404 ||
              res.status === 403 ||
              res.status === 500 ||
              res.status === 503 ||
              /quota|rate|not found|not supported|overloaded|high demand|limit/i.test(
                errMsg,
              );
            if (isRetryable) {
              overloadedUntil[model] = Date.now() + 90000;
              continue;
            }
            throw lastErr;
          }

          const text =
            data?.candidates?.[0]?.content?.parts
              ?.map((p) => p.text || "")
              .join("") || "";

          if (!text) {
            lastErr = new Error(
              `[Model: ${model}] Gemini trả về phản hồi rỗng.`,
            );
            continue;
          }

          delete overloadedUntil[model];
          return { text, modelUsed: model };
        } catch (err) {
          if (err && err.name === "AbortError") {
            console.warn(
              `[Pike Man] ${model} quá thời gian chờ (${effectiveTimeout}ms).`,
            );
            overloadedUntil[model] = Date.now() + 90000;
            lastErr = new Error(
              `[Model: ${model}] Quá thời gian chờ (${Math.round(
                effectiveTimeout / 1000,
              )}s) do server Google phản hồi chậm.`,
            );
            continue;
          }
          if (/Failed to fetch|NetworkError/i.test(err?.message || "")) {
            throw new Error(
              "Lỗi kết nối mạng tới Google API. Kiểm tra lại Wi-Fi/mạng của bạn nhé.",
            );
          }
          throw err;
        } finally {
          clearTimeout(timer);
        }
      }

      const rawMsg = lastErr?.message || "";
      if (/high demand|503|overloaded/i.test(rawMsg)) {
        throw new Error(
          `${rawMsg} — Lưu ý: đây là lỗi quá tải tạm thời trên máy chủ Google. Hãy thử giảm Thinking xuống Minimal/Low hoặc chọn 'gemini-3.5-flash-lite' rồi gửi lại nhé!`,
        );
      }
      throw lastErr || new Error("Không thể kết nối tới các model Gemini.");
    },

    parseSafeJSON(rawText) {
      let cleaned = String(rawText || "")
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```$/i, "")
        .trim();

      const firstBrace = cleaned.indexOf("{");
      const lastBrace = cleaned.lastIndexOf("}");
      if (firstBrace !== -1 && lastBrace > firstBrace) {
        cleaned = cleaned.slice(firstBrace, lastBrace + 1);
      }

      // Bảo vệ các lệnh LaTeX bắt đầu bằng \f, \t, \b, \r, \n viết đơn trong chuỗi JSON
      const sanitizeLatexEscapes = (str) =>
        str
          .replace(
            /(?<!\\)\\(frac|forall|tan|tanh|theta|tau|times|text|textbf|textit|to|top|triangle|beta|binom|bar|big|begin|neq|nu|nabla|notin|rho|right|rangle|rightarrow|Rightarrow)/g,
            "\\\\$1",
          )
          .replace(/\\(?!["\\/bfnrtu])/g, "\\\\");

      try {
        return JSON.parse(cleaned);
      } catch (_) {
        return JSON.parse(sanitizeLatexEscapes(cleaned));
      }
    },

    // AI đọc tài liệu người dùng đóng góp (PDF, Ảnh đề thi, Text) -> bóc tách chuẩn cấu trúc gt-c1
    async ingestContributedResource({
      files = [],
      rawText = "",
      targetTopicId = "auto",
      sourceTitle = "",
      onStatus = null,
    }) {
      const attachmentPayloads = [];
      for (const f of Array.from(files || [])) {
        const payload = await this.fileToAttachmentPayload(f);
        attachmentPayloads.push(payload);
      }

      const cleanText = String(rawText || "").trim();
      if (!attachmentPayloads.length && !cleanText) {
        throw new Error(
          "Bạn chưa chọn file tài liệu (PDF/Ảnh/TXT) hoặc dán nội dung câu hỏi nào!",
        );
      }

      const availableTopics =
        typeof DEFAULT_TOPICS !== "undefined"
          ? DEFAULT_TOPICS.map(
              (t) => `- "${t.id}": ${t.code} — ${t.title}`,
            ).join("\n")
          : '- "gt-c1": Giới hạn & Liên tục\n- "gt-c2": Đạo hàm & Vi phân\n- "gt-c3": Tích phân\n- "gt-c4": Chuỗi số & Chuỗi hàm\n- "dstt-c5": Ma trận, Định thức & Hệ PTTT\n- "dstt-c7": Không gian vectơ & Euclide';

      const targetRule =
        targetTopicId && targetTopicId !== "auto"
          ? `Tất cả nội dung bóc tách phải gán vào topicId = "${targetTopicId}".`
          : `Tự động phân loại từng mục kiến thức/câu hỏi vào đúng topicId phù hợp nhất trong danh sách chương hiện có của web:\n${availableTopics}`;

      const systemPrompt = `Bạn là Pike Man — Biên tập viên học liệu & Quản trị ngân hàng đề Toán Cao Cấp (chuẩn KaTeX & cấu trúc dữ liệu MathLab Mini — HCMUE).
Nhiệm vụ: Đọc kỹ toàn bộ tài liệu người dùng đóng góp (PDF, ảnh chụp đề thi/giáo trình, ghi chú hoặc văn bản thô), trích xuất đầy đủ các câu hỏi trắc nghiệm, bài tập tự luận, và các định lý/mẹo giải hay (nếu có) để bổ sung vào kho học liệu của web.

QUY TẮC BẮT BUỘC:
1. ${targetRule}
2. Toàn bộ công thức toán học phải chuẩn KaTeX, bọc trong $...$ (inline) hoặc $$...$$ (display). Trong JSON string, mọi dấu gạch chéo ngược LaTeX PHẢI viết đôi (ví dụ: "\\\\frac{1}{2}", "\\\\lim_{x \\\\to 0}", "\\\\mathbb{R}").
3. Với bài tập tự luận (exercises): tự giải chi tiết và chia rõ từng bước có thang điểm vào mảng "steps", kèm mục "trap" chỉ ra lỗi sinh viên hay mất điểm. Nếu tài liệu gốc đã có lời giải thì chuẩn hóa và kiểm chứng lại tính chính xác.
4. Với câu hỏi trắc nghiệm (quizzes): phải có đúng 4 phương án trong "options", "answer" là chỉ số nguyên 0, 1, 2 hoặc 3, và "explanation" giải thích rõ cách làm.
5. Với lý thuyết bổ sung (theories): CHỈ tạo khi tài liệu có định lý, công thức mở rộng hoặc kỹ thuật giải mới đáng giá; nếu tài liệu chỉ thuần đề bài tập thì để mảng "theories": [].
6. Trả về JSON thuần túy đúng schema sau:
{
  "detectedSourceTitle": "Tên gợi ý ngắn gọn cho tài liệu đóng góp",
  "bundles": [
    {
      "topicId": "gt-c1",
      "theories": [
        {
          "heading": "Tên mục kiến thức bổ sung",
          "content": "Nội dung HTML dùng <b>, <br> và LaTeX $...$",
          "checkpoint": {
            "question": "Ví dụ minh họa ngắn",
            "rubric": [
              { "step": "Bước 1 (0.5đ)", "detail": "Chi tiết lời giải" },
              { "step": "Bước 2 (0.5đ)", "detail": "Kết luận" }
            ],
            "trap": "Lưu ý tránh sai sót"
          }
        }
      ],
      "exercises": [
        {
          "level": "Cơ bản | Vừa | Khó",
          "question": "Đề bài tự luận đầy đủ (dùng <br> xuống dòng nếu có nhiều ý a, b, c)",
          "steps": [
            { "tag": "Bước 1 (0.5đ)", "detail": "Lời giải chi tiết có LaTeX" },
            { "tag": "Bước 2 (0.5đ)", "detail": "Kết luận đáp số" }
          ],
          "trap": "Lỗi mất điểm tự luận thường gặp"
        }
      ],
      "quizzes": [
        {
          "question": "Nội dung câu hỏi trắc nghiệm",
          "options": ["Phương án A", "Phương án B", "Phương án C", "Phương án D"],
          "answer": 0,
          "explanation": "Giải thích chi tiết đáp án đúng"
        }
      ]
    }
  ]
}`;

      const userPrompt = `Hãy đọc tài liệu người dùng đóng góp dưới đây và bóc tách thành học liệu chuẩn cho MathLab Mini.
- Tên nguồn người dùng nhập: ${sourceTitle || "(Tự đặt tên phù hợp dựa theo tiêu đề tài liệu)"}
${cleanText ? `\n--- VĂN BẢN / ĐỀ BÀI NGƯỜI DÙNG DÁN VÀO ---\n${cleanText}` : ""}`;

      const { text, modelUsed } = await this.generate({
        prompt: userPrompt,
        attachments: attachmentPayloads,
        systemInstruction: systemPrompt,
        jsonMode: true,
        temperature: 0.2,
        onStatus,
      });

      const parsed = this.parseSafeJSON(text);
      const bundles = Array.isArray(parsed.bundles) ? parsed.bundles : [];
      const finalSourceTitle =
        (sourceTitle || "").trim() ||
        parsed.detectedSourceTitle ||
        (attachmentPayloads[0]?.name
          ? attachmentPayloads[0].name.replace(/\.[^.]+$/, "")
          : "Tài liệu đóng góp");

      bundles.forEach((b) => {
        b.sourceTitle = finalSourceTitle;
      });

      return {
        sourceTitle: finalSourceTitle,
        bundles,
        modelUsed,
      };
    },

    commitExtractedBundles(bundles) {
      let totalTheory = 0;
      let totalExercise = 0;
      let totalQuiz = 0;
      let totalSkipped = 0;

      (bundles || []).forEach((b) => {
        if (window.MathLabDataManager) {
          const res = window.MathLabDataManager.addContributedBundle(b);
          totalTheory += res.addedTheory;
          totalExercise += res.addedExercise;
          totalQuiz += res.addedQuiz;
          totalSkipped += res.skipped;
        }
      });

      if (typeof window.renderTopicsGrid === "function") {
        window.renderTopicsGrid();
      }

      return { totalTheory, totalExercise, totalQuiz, totalSkipped };
    },

    async createNewChapter({ subject, title, syllabusNotes }) {
      const systemPrompt = `Bạn là Pike Man — giảng viên & chuyên gia biên soạn giáo trình Toán Cao Cấp (Giải tích 1 & Đại số tuyến tính chuẩn Khoa CNTT — ĐH Sư phạm TP.HCM).
Nhiệm vụ: Tạo một chương bài học hoàn chỉnh, chính xác tuyệt đối về mặt toán học dưới dạng JSON thuần túy theo đúng schema sau:
{
  "id": "custom-slug-khong-dau",
  "code": "TÊN MÔN • CHƯƠNG X",
  "subject": "${subject}",
  "level": "Cơ bản | Trung bình | Nâng cao",
  "title": "Tên chương",
  "summary": "Tóm tắt súc tích các định lý và phương pháp trọng tâm",
  "previewFormula": "$$...$$",
  "bannerGradient": "linear-gradient(135deg, #1d4ed8 0%, #4f46e5 100%)",
  "theory": [
    {
      "heading": "1. Tiêu đề mục",
      "content": "Nội dung HTML dùng thẻ <b>, <i>, <br> và công thức LaTeX $...$ hoặc $$...$$",
      "checkpoint": {
        "question": "Câu hỏi ví dụ minh họa có LaTeX",
        "rubric": [
          { "step": "Bước 1 • Tên bước (0.5đ)", "detail": "Lời giải chi tiết có LaTeX" },
          { "step": "Bước 2 • Tên bước (0.5đ)", "detail": "Lời giải chi tiết có LaTeX" }
        ],
        "trap": "Lỗi trình bày tự luận sinh viên hay mất điểm"
      }
    }
  ],
  "exercises": [
    {
      "level": "Vừa",
      "question": "Đề bài tự luận có LaTeX $...$",
      "solution": "<div class=\\"rubric-box\\"><div class=\\"rubric-step\\"><span class=\\"rubric-tag\\">Bước 1 (0.5đ)</span> ...</div><div class=\\"rubric-step\\"><span class=\\"rubric-tag\\">Bước 2 (0.5đ)</span> ...</div><div class=\\"rubric-trap\\">⚠️ <b>Lỗi mất điểm tự luận:</b> ...</div></div>"
    }
  ],
  "quiz": [
    {
      "question": "Câu hỏi trắc nghiệm có LaTeX",
      "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
      "answer": 0,
      "explanation": "Giải thích chặt chẽ tại sao đáp án đúng"
    }
  ],
  "keySummary": [
    { "title": "1. Nhóm công thức 1", "body": "Nội dung công thức" }
  ]
}
Yêu cầu bắt buộc: Tối thiểu 3 mục theory, 3 bài tập exercises có barem và 5 câu quiz. Kiểm tra kỹ mọi phép tính trước khi xuất JSON.`;

      const userPrompt = `Hãy biên soạn chương bài học mới chất lượng cao:
- Học phần: ${subject}
- Tên chương / chuyên đề: ${title}
- Yêu cầu nội dung / ghi chú trọng tâm: ${
        syllabusNotes ||
        "Bám sát chương trình đại học HCMUE, đầy đủ định lý, ví dụ bẫy tự luận và bài tập phân loại."
      }`;

      const { text } = await this.generate({
        prompt: userPrompt,
        systemInstruction: systemPrompt,
        jsonMode: true,
        temperature: 0.25,
      });

      const chapter = this.parseSafeJSON(text);
      chapter.id = `${chapter.id || "pikeman-topic"}-${Date.now().toString(36)}`;

      const customTopics = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.CUSTOM_TOPICS) || "[]",
      );
      customTopics.push(chapter);
      localStorage.setItem(
        STORAGE_KEYS.CUSTOM_TOPICS,
        JSON.stringify(customTopics),
      );

      if (typeof DEFAULT_TOPICS !== "undefined") {
        DEFAULT_TOPICS.push(chapter);
      }

      if (typeof window.renderTopicsGrid === "function") {
        window.renderTopicsGrid();
      }

      return chapter;
    },

    async enrichExistingChapter(topicId, mode = "exercises") {
      if (typeof DEFAULT_TOPICS === "undefined") {
        throw new Error("Không tìm thấy dữ liệu DEFAULT_TOPICS từ data.js.");
      }
      const topic = DEFAULT_TOPICS.find((t) => t.id === topicId);
      if (!topic) throw new Error("Không tìm thấy chương đã chọn.");

      const patches = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.PATCHED_TOPICS) || "{}",
      );
      if (!patches[topicId]) {
        patches[topicId] = { exercises: [], quiz: [] };
      }

      if (mode === "exercises") {
        const existingQuestions = (topic.exercises || [])
          .map((e) => e.question)
          .join(" | ");
        const prompt = `Chương học: "${topic.title}" (${topic.subject}).
Tóm tắt: ${topic.summary}.
Các đề đã có (TUYỆT ĐỐI KHÔNG TRÙNG): ${existingQuestions}

Hãy biên soạn thêm 3 bài tập tự luận MỚI (1 mức Vừa, 2 mức Khó/Tổng hợp) kèm lời giải chia barem điểm chuẩn tự luận HCMUE dưới dạng JSON:
{
  "exercises": [
    {
      "level": "Vừa hoặc Khó",
      "question": "Đề bài có LaTeX $...$",
      "solution": "<div class=\\"rubric-box\\"><div class=\\"rubric-step\\"><span class=\\"rubric-tag\\">Bước 1 (0.5đ)</span> ...</div><div class=\\"rubric-step\\"><span class=\\"rubric-tag\\">Bước 2 (0.5đ)</span> ...</div><div class=\\"rubric-trap\\">⚠️ <b>Lỗi mất điểm tự luận:</b> ...</div></div>"
    }
  ]
}`;
        const { text } = await this.generate({
          prompt,
          systemInstruction:
            "Bạn là giảng viên Toán Cao Cấp HCMUE. Tính toán kiểm chứng kỹ đáp số trước khi xuất JSON hợp lệ 100%.",
          jsonMode: true,
          temperature: 0.25,
        });
        const parsed = this.parseSafeJSON(text);
        const newEx = parsed.exercises || [];
        patches[topicId].exercises.push(...newEx);
        topic.exercises.push(...newEx);
        localStorage.setItem(
          STORAGE_KEYS.PATCHED_TOPICS,
          JSON.stringify(patches),
        );
        if (typeof window.renderTopicsGrid === "function") {
          window.renderTopicsGrid();
        }
        return `Pike Man đã bổ sung ${newEx.length} bài tập tự luận mới vào "${topic.title}"!`;
      }

      if (mode === "quiz") {
        const prompt = `Chương học: "${topic.title}" (${topic.subject}).
Tóm tắt: ${topic.summary}.
Hãy tạo thêm 5 câu hỏi trắc nghiệm MỚI (có câu bẫy lý thuyết và câu tính toán nhanh) chuẩn JSON:
{
  "quiz": [
    {
      "question": "Nội dung câu hỏi có LaTeX $...$",
      "options": ["Phương án 0", "Phương án 1", "Phương án 2", "Phương án 3"],
      "answer": 0,
      "explanation": "Giải thích chi tiết và chỉ ra bẫy nếu chọn nhầm phương án khác"
    }
  ]
}`;
        const { text } = await this.generate({
          prompt,
          systemInstruction:
            "Trả về JSON hợp lệ 100%, answer là chỉ số nguyên 0, 1, 2 hoặc 3.",
          jsonMode: true,
          temperature: 0.25,
        });
        const parsed = this.parseSafeJSON(text);
        const newQuiz = parsed.quiz || [];
        patches[topicId].quiz.push(...newQuiz);
        topic.quiz.push(...newQuiz);
        localStorage.setItem(
          STORAGE_KEYS.PATCHED_TOPICS,
          JSON.stringify(patches),
        );
        if (typeof window.renderTopicsGrid === "function") {
          window.renderTopicsGrid();
        }
        return `Pike Man đã bổ sung ${newQuiz.length} câu Quiz mới vào "${topic.title}"!`;
      }
    },

    exportUpdatedDataJS() {
      if (typeof DEFAULT_TOPICS === "undefined") return;
      const fileContent = `// =========================================================================
// MATHLAB MINI — DỮ LIỆU ĐÃ ĐƯỢC PIKE MAN AI CẬP NHẬT (${new Date().toLocaleString("vi-VN")})
// =========================================================================

const DEFAULT_TOPICS = ${JSON.stringify(DEFAULT_TOPICS, null, 2)};

const EXAM_BANK = ${
        typeof EXAM_BANK !== "undefined"
          ? JSON.stringify(EXAM_BANK, null, 2)
          : "{}"
      };

const DATA_SCHEMA_VERSION = "mathlab_topics_v8_pikeman";
`;
      const blob = new Blob([fileContent], {
        type: "application/javascript;charset=utf-8",
      });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "data.js";
      a.click();
      URL.revokeObjectURL(a.href);
    },
  };

  window.PikeManAI = PikeManAI;

  // -----------------------------------------------------------------------
  // 3. GIAO DIỆN PIKE MAN AI HỢP NHẤT (5 TAB ĐẦY ĐỦ, TỰ NÉ NÚT ĐÓNG MODAL)
  // -----------------------------------------------------------------------
  function injectStyles() {
    if (document.getElementById("pikeman-ai-styles")) return;
    const style = document.createElement("style");
    style.id = "pikeman-ai-styles";
    style.textContent = `
      #pikeman-ai-fab {
        position: fixed;
        right: 22px;
        bottom: 22px;
        z-index: 10050;
        background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
        color: #ffffff;
        border: 1px solid rgba(255, 255, 255, 0.22);
        border-radius: 999px;
        padding: 11px 18px;
        font-weight: 700;
        font-size: 13.5px;
        cursor: pointer;
        box-shadow: 0 10px 26px rgba(37, 99, 235, 0.45);
        display: flex;
        align-items: center;
        gap: 8px;
        transition: bottom 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
      }
      body:has(#study-modal.open) #pikeman-ai-fab,
      body:has(.modal-backdrop.open) #pikeman-ai-fab {
        bottom: 76px;
      }
      #pikeman-ai-fab:hover {
        transform: translateY(-2px);
        box-shadow: 0 14px 32px rgba(79, 70, 229, 0.55);
      }
      #pikeman-ai-drawer {
        position: fixed;
        right: 22px;
        bottom: 78px;
        width: 460px;
        max-width: calc(100vw - 32px);
        height: 575px;
        max-height: calc(100vh - 155px);
        background: #ffffff;
        color: #0f172a;
        border-radius: 18px;
        box-shadow: 0 22px 54px rgba(15, 23, 42, 0.32);
        border: 1px solid #cbd5e1;
        z-index: 10051;
        display: none;
        flex-direction: column;
        overflow: hidden;
        font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      }
      body:has(#study-modal.open) #pikeman-ai-drawer,
      body:has(.modal-backdrop.open) #pikeman-ai-drawer {
        bottom: 130px;
      }
      #pikeman-ai-drawer.open { display: flex; }
      .pm-ai-header {
        background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
        color: #fff;
        padding: 13px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .pm-model-badge {
        display: inline-block;
        background: rgba(255, 255, 255, 0.16);
        border: 1px solid rgba(255, 255, 255, 0.25);
        padding: 2px 8px;
        border-radius: 999px;
        font-size: 10.5px;
        font-family: 'JetBrains Mono', monospace;
        margin-top: 3px;
      }
      .pm-ai-tabs {
        display: flex;
        background: #f1f5f9;
        border-bottom: 1px solid #e2e8f0;
        overflow-x: auto;
      }
      .pm-ai-tab {
        flex: 1;
        padding: 9px 5px;
        border: none;
        background: transparent;
        font-size: 11.5px;
        font-weight: 700;
        color: #475569;
        cursor: pointer;
        border-bottom: 2px solid transparent;
        white-space: nowrap;
      }
      .pm-ai-tab.active {
        color: #2563eb;
        border-bottom-color: #2563eb;
        background: #fff;
      }
      .pm-ai-panel {
        flex: 1;
        overflow-y: auto;
        padding: 14px;
        display: none;
        flex-direction: column;
        gap: 10px;
      }
      .pm-ai-panel.active { display: flex; }
      .pm-ai-msg {
        padding: 10px 13px;
        border-radius: 12px;
        font-size: 13.5px;
        line-height: 1.58;
        word-break: break-word;
      }
      .pm-ai-msg.user {
        background: #2563eb;
        color: #fff;
        align-self: flex-end;
        max-width: 86%;
      }
      .pm-ai-msg.bot {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        color: #0f172a;
        align-self: flex-start;
        max-width: 96%;
      }
      .pm-ai-input-bar {
        padding: 10px;
        border-top: 1px solid #e2e8f0;
        display: flex;
        gap: 8px;
        background: #fff;
      }
      .pm-ai-input-bar textarea, .pm-ai-field {
        width: 100%;
        border: 1px solid #cbd5e1;
        border-radius: 10px;
        padding: 8px 10px;
        font-size: 13px;
        font-family: inherit;
        box-sizing: border-box;
        color: #0f172a;
        background: #fff;
      }
      .pm-ai-btn {
        background: #2563eb;
        color: #fff;
        border: none;
        border-radius: 10px;
        padding: 9px 14px;
        font-weight: 700;
        font-size: 13px;
        cursor: pointer;
      }
      .pm-ai-btn:disabled { opacity: 0.6; cursor: not-allowed; }
      .pm-ai-btn.secondary { background: #0f766e; }
      .pm-ai-btn.outline {
        background: #f1f5f9;
        color: #1e293b;
        border: 1px solid #cbd5e1;
      }
      .pm-inline-ai-bar {
        margin-top: 10px;
        padding-top: 8px;
        border-top: 1px dashed rgba(148, 163, 184, 0.35);
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .pm-inline-chip {
        background: #eff6ff;
        color: #1d4ed8;
        border: 1px solid #bfdbfe;
        border-radius: 999px;
        padding: 4px 11px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
      }
      .pm-inline-chip:hover { background: #dbeafe; }
      .pm-plan-card {
        background: #f8fafc;
        color: #0f172a;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 11px 12px;
      }
      .pm-plan-item {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        padding: 6px 0;
        font-size: 12.8px;
        color: #0f172a;
        border-bottom: 1px dashed #e2e8f0;
        cursor: pointer;
      }
      .pm-plan-item:last-child { border-bottom: none; }
      .pm-img-btn {
        background: #f1f5f9;
        color: #1e293b;
        border: 1px solid #cbd5e1;
        border-radius: 10px;
        padding: 0 11px;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pm-img-btn:hover { background: #e2e8f0; }
      .pm-preview-strip {
        padding: 6px 10px;
        background: #f8fafc;
        border-top: 1px solid #e2e8f0;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .pm-preview-thumb {
        position: relative;
        width: 56px;
        height: 56px;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid #cbd5e1;
      }
      .pm-preview-thumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .pm-preview-remove {
        position: absolute;
        top: 2px;
        right: 2px;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: none;
        background: rgba(15, 23, 42, 0.78);
        color: #fff;
        font-size: 11px;
        line-height: 1;
        cursor: pointer;
      }
      .pm-context-pill {
        padding: 6px 10px;
        background: #eff6ff;
        border-top: 1px solid #bfdbfe;
        color: #1e40af;
        font-size: 11.8px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .pm-msg-images {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-bottom: 6px;
      }
      .pm-msg-images img {
        max-width: 160px;
        max-height: 140px;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        object-fit: cover;
      }
      .pm-quick-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 6px 10px;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        font-size: 12px;
        font-weight: 700;
        color: #334155;
      }
      .pm-mini-select {
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        padding: 4px 8px;
        font-size: 12px;
        font-weight: 600;
        color: #0f172a;
        background: #ffffff;
        cursor: pointer;
      }
      .taylor-controls-stack {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .taylor-slider-row {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .taylor-slider-row input[type="range"] {
        flex: 1;
        min-width: 0;
        cursor: pointer;
        accent-color: #f59e0b;
      }
      .btn-danger {
        background: #dc2626 !important;
        color: #ffffff !important;
        border-color: #b91c1c !important;
      }
      [data-theme="dark"] #pikeman-ai-drawer {
        background: #0d1526;
        color: #f1f5f9;
        border-color: rgba(56, 189, 248, 0.28);
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.72);
      }
      [data-theme="dark"] .pm-ai-header {
        background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
        border-bottom: 1px solid rgba(56, 189, 248, 0.22);
      }
      [data-theme="dark"] .pm-ai-tabs {
        background: #09101f;
        border-bottom-color: #1e293b;
      }
      [data-theme="dark"] .pm-ai-tab {
        color: #94a3b8;
      }
      [data-theme="dark"] .pm-ai-tab.active {
        color: #38bdf8;
        border-bottom-color: #38bdf8;
        background: #0d1526;
      }
      [data-theme="dark"] .pm-ai-panel {
        color: #e2e8f0;
      }
      [data-theme="dark"] .pm-ai-msg.bot {
        background: #131e36;
        border-color: #24334d;
        color: #e2e8f0;
      }
      [data-theme="dark"] .pm-ai-input-bar {
        background: #09101f;
        border-top-color: #1e293b;
      }
      [data-theme="dark"] .pm-ai-input-bar textarea,
      [data-theme="dark"] .pm-ai-field,
      [data-theme="dark"] .pm-mini-select {
        background: #131e36;
        border-color: #334155;
        color: #f8fafc;
      }
      [data-theme="dark"] .pm-ai-input-bar textarea::placeholder,
      [data-theme="dark"] .pm-ai-field::placeholder {
        color: #64748b;
      }
      [data-theme="dark"] .pm-ai-btn.outline,
      [data-theme="dark"] .pm-img-btn {
        background: #1e293b;
        color: #e2e8f0;
        border-color: #334155;
      }
      [data-theme="dark"] .pm-ai-btn.outline:hover,
      [data-theme="dark"] .pm-img-btn:hover {
        background: #334155;
      }
      [data-theme="dark"] .pm-quick-bar,
      [data-theme="dark"] .pm-plan-card,
      [data-theme="dark"] .pm-preview-strip {
        background: #131e36;
        border-color: #24334d;
        color: #e2e8f0;
      }
      [data-theme="dark"] .pm-plan-item {
        color: #e2e8f0;
        border-bottom-color: #24334d;
      }
      [data-theme="dark"] .pm-context-pill {
        background: rgba(37, 99, 235, 0.16);
        border-top-color: rgba(56, 189, 248, 0.3);
        color: #93c5fd;
      }
      [data-theme="dark"] #pm-clear-ctx {
        color: #93c5fd !important;
      }
      [data-theme="dark"] .pm-inline-chip {
        background: rgba(37, 99, 235, 0.16);
        color: #7dd3fc;
        border-color: rgba(56, 189, 248, 0.32);
      }
      [data-theme="dark"] .pm-inline-chip:hover {
        background: rgba(37, 99, 235, 0.28);
      }
      [data-theme="dark"] #pm-panel-planner .pm-plan-card > div,
      [data-theme="dark"] #pm-panel-planner .pm-plan-item span:not([style*="line-through"]),
      [data-theme="dark"] #pm-plan-output > div,
      [data-theme="dark"] #pm-panel-analyzer .pm-plan-card > div,
      [data-theme="dark"] #pm-panel-analyzer .pm-plan-card > div > div:first-child,
      [data-theme="dark"] #pm-panel-analyzer .pm-plan-card b {
        color: #e2e8f0 !important;
      }
      [data-theme="dark"] #pm-panel-analyzer .pm-plan-card > div {
        border-bottom-color: #24334d !important;
      }
      [data-theme="dark"] #pm-panel-analyzer .pm-plan-card > div > div {
        color: #94a3b8 !important;
      }
      [data-theme="dark"] #pm-panel-manager > div:not(#pm-manager-status) {
        background: #131e36 !important;
        border-color: #24334d !important;
        color: #e2e8f0 !important;
      }
      [data-theme="dark"] #pm-panel-manager > div:not(#pm-manager-status) > div {
        color: #cbd5e1 !important;
      }
      [data-theme="dark"] #pm-contrib-preview > div {
        background: #0f172a !important;
        border-color: #334155 !important;
        color: #e2e8f0 !important;
      }
      [data-theme="dark"] #pm-contrib-checklist label {
        background: #1e293b !important;
        border-color: #334155 !important;
        color: #e2e8f0 !important;
      }
      [data-theme="dark"] #pikeman-ai-drawer code {
        background: rgba(56, 189, 248, 0.14);
        color: #7dd3fc;
        padding: 1px 5px;
        border-radius: 5px;
      }
    `;
    document.head.appendChild(style);
  }

  function renderMathIfAvailable(el) {
    if (typeof window.renderMathInElement === "function") {
      try {
        window.renderMathInElement(el, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
          ],
          throwOnError: false,
        });
      } catch (_) {}
    }
  }

  function formatMarkdownLite(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
      .replace(/\n/g, "<br>");
  }

  function updateHeaderModelBadge() {
    const badge = document.getElementById("pm-active-model-badge");
    if (badge) {
      badge.textContent = `Model: ${PikeManAI.getPreferredModel()} • Thinking: ${PikeManAI.getThinkingLevel()}`;
    }
  }

  function renderPlannerPanel() {
    const panel = document.getElementById("pm-panel-planner");
    if (!panel) return;

    let savedPlan = null;
    try {
      savedPlan = JSON.parse(localStorage.getItem(STORAGE_KEYS.PLAN) || "null");
    } catch {
      savedPlan = null;
    }

    panel.innerHTML = `
      <div class="pm-plan-card">
        <div style="font-weight:700;font-size:13.5px;color:#0f172a;margin-bottom:8px;">🗓️ Lộ trình Ôn tập cùng Pike Man</div>
        <div style="display:flex;flex-direction:column;gap:8px;font-size:12.5px;color:#0f172a;">
          <label>Môn trọng tâm:
            <select id="pm-plan-subject" class="pm-ai-field" style="margin-top:3px;">
              <option value="all">Combo 3 môn (GT1 + ĐSTT + Toán rời rạc)</option>
              <option value="gt1">Giải tích 1</option>
              <option value="dstt">Đại số tuyến tính</option>
              <option value="trr">Toán rời rạc</option>
            </select>
          </label>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <label>Số ngày ôn:
              <input type="number" id="pm-plan-days" class="pm-ai-field" value="7" min="3" max="30" style="margin-top:3px;" />
            </label>
            <label>Khung giờ vàng:
              <select id="pm-plan-slot" class="pm-ai-field" style="margin-top:3px;">
                <option value="Sáng sớm (06:00 - 08:00)">Sáng sớm (06:00 - 08:00)</option>
                <option value="Chiều (14:00 - 17:00)">Chiều (14:00 - 17:00)</option>
                <option value="Tối (20:00 - 22:30)">Tối (20:00 - 22:30)</option>
              </select>
            </label>
          </div>
          <button type="button" class="pm-ai-btn" id="pm-generate-plan-btn" style="width:100%;">⚡ Tạo Kế hoạch Học tập</button>
        </div>
      </div>
      <div id="pm-plan-output"></div>
    `;

    const outputEl = panel.querySelector("#pm-plan-output");

    function drawPlan(planList) {
      if (!planList || !planList.length) return;
      outputEl.innerHTML = `<div style="font-weight:700;font-size:12.5px;margin-bottom:6px;color:#0f172a;">📋 Checklist Lộ trình (Tự động lưu):</div>`;
      const card = document.createElement("div");
      card.className = "pm-plan-card";
      planList.forEach((task, idx) => {
        const row = document.createElement("label");
        row.className = "pm-plan-item";
        row.innerHTML = `
          <input type="checkbox" ${task.done ? "checked" : ""} style="margin-top:3px;" />
          <span style="color:${task.done ? "#94a3b8" : "#0f172a"};${task.done ? "text-decoration:line-through;" : ""}">
            <b>Ngày ${task.day} (${task.slot}):</b> ${task.text}
          </span>
        `;
        row.querySelector("input").addEventListener("change", (e) => {
          planList[idx].done = e.target.checked;
          localStorage.setItem(STORAGE_KEYS.PLAN, JSON.stringify(planList));
          drawPlan(planList);
        });
        card.appendChild(row);
      });
      outputEl.appendChild(card);
    }

    if (savedPlan) drawPlan(savedPlan);

    panel
      .querySelector("#pm-generate-plan-btn")
      .addEventListener("click", () => {
        const subj = panel.querySelector("#pm-plan-subject").value;
        const days = Math.min(
          30,
          Math.max(
            3,
            parseInt(panel.querySelector("#pm-plan-days").value, 10) || 7,
          ),
        );
        const slot = panel.querySelector("#pm-plan-slot").value;

        const pools = {
          gt1: [
            "Giới hạn hàm số, khử 7 dạng vô định & VCB tương đương",
            "Hàm số liên tục, phân loại điểm gián đoạn & Định lý giá trị trung gian",
            "Đạo hàm cấp cao, quy tắc L'Hôpital & Khai triển Taylor - Maclaurin",
            "Tích phân bất định, tích phân từng phần & hữu tỷ",
            "Tích phân xác định, ứng dụng diện tích - thể tích & Tích phân suy rộng",
          ],
          dstt: [
            "Phép toán ma trận, định thức cấp n & Ma trận nghịch đảo",
            "Hệ phương trình tuyến tính & Phương pháp khử Gauss - Jordan",
            "Không gian vectơ, Độc lập tuyến tính, Cơ sở và Số chiều",
            "Không gian con, Tổng & Giao hai không gian con",
            "Ánh xạ tuyến tính, Hạt nhân Ker(f), Ảnh Im(f) & Trị riêng - Vectơ riêng",
          ],
          trr: [
            "Logic mệnh đề, Bảng chân trị (0 trước 1) & Biến đổi De Morgan",
            "Logic vị từ, Lượng từ & Bài toán suy diễn tự nhiên",
            "Tập hợp, Chứng minh Song ánh & Ánh xạ ngược",
            "Quan hệ tương đương, Lớp tương đương & Quan hệ thứ tự",
            "Nguyên lý bao hàm - loại trừ, Chia kẹo Euler & Đồ thị Euler/Hamilton",
          ],
        };

        const activePool =
          subj === "all"
            ? [...pools.gt1, ...pools.dstt, ...pools.trr]
            : pools[subj];

        const generated = [];
        for (let d = 1; d <= days; d++) {
          const topic = activePool[(d - 1) % activePool.length];
          generated.push({
            day: d,
            slot,
            text: `${topic} + Làm 10 câu luyện tập & đánh dấu hoàn thành trên web`,
            done: false,
          });
        }
        localStorage.setItem(STORAGE_KEYS.PLAN, JSON.stringify(generated));
        drawPlan(generated);
      });
  }

  function renderAnalyzerPanel() {
    const panel = document.getElementById("pm-panel-analyzer");
    if (!panel) return;

    if (window.MathLabUpgrades?.injectProgressBarsOnCards) {
      window.MathLabUpgrades.injectProgressBarsOnCards();
    }

    const cards = Array.from(
      document.querySelectorAll(".chapter-progress-box"),
    );
    let html = `<div class="pm-plan-card"><div style="font-weight:700;font-size:13.5px;color:#0f172a;margin-bottom:8px;">📊 Chẩn đoán Tiến độ & Lỗ hổng</div>`;
    if (!cards.length) {
      html += `<div style="font-size:12.8px;color:#475569;">Mở trang <b>Chuyên đề &amp; Lab</b> để Pike Man quét tiến độ chi tiết từng chương nhé!</div>`;
    } else {
      cards.forEach((box) => {
        const title =
          box.dataset.chapterTitle ||
          box.parentElement?.querySelector("h2, h3, h4")?.textContent.trim() ||
          "Chương học";
        const pct = parseInt(box.dataset.percent || "0", 10);
        const doneCount = box.dataset.doneCount || "0";
        const totalParts = box.dataset.totalParts || "5";

        const status =
          pct === 100
            ? `<span style="color:#059669;font-weight:700;">✓ Đã nắm vững</span>`
            : pct >= 50
              ? `<span style="color:#2563eb;font-weight:700;">Đang tiến triển</span>`
              : `<span style="color:#dc2626;font-weight:700;">Cần ưu tiên học</span>`;

        html += `<div style="padding:8px 0;border-bottom:1px dashed #cbd5e1;font-size:12.8px;color:#0f172a;">
          <div style="font-weight:700;color:#0f172a;margin-bottom:3px;">${title}</div>
          <div style="display:flex;justify-content:space-between;align-items:center;color:#475569;">
            <span>Hoàn thành: <b style="color:#0f172a;">${doneCount}/${totalParts} phần (${pct}%)</b></span>
            ${status}
          </div>
        </div>`;
      });
    }
    html += `</div>`;
    panel.innerHTML = html;
  }

  function buildDrawerUI() {
    if (document.getElementById("pikeman-ai-fab")) return;
    injectStyles();

    const fab = document.createElement("button");
    fab.id = "pikeman-ai-fab";
    fab.type = "button";
    fab.innerHTML = `<span>🤖 Pike Man</span>`;
    document.body.appendChild(fab);

    const drawer = document.createElement("div");
    drawer.id = "pikeman-ai-drawer";
    drawer.innerHTML = `
      <div class="pm-ai-header">
        <div>
          <div style="font-weight:800;font-size:14.5px;">🤖 Pike Man — Trợ lý Toán &amp; Học liệu</div>
          <div class="pm-model-badge" id="pm-active-model-badge">Model: ${PikeManAI.getPreferredModel()}</div>
        </div>
        <button id="pm-ai-close" type="button" style="background:rgba(255,255,255,0.16);border:none;color:#fff;border-radius:8px;padding:4px 9px;font-size:15px;cursor:pointer;">✕</button>
      </div>
      <div class="pm-ai-tabs">
        <button type="button" class="pm-ai-tab active" data-tab="chat">💬 Hỏi AI</button>
        <button type="button" class="pm-ai-tab" data-tab="planner">🗓️ Kế hoạch</button>
        <button type="button" class="pm-ai-tab" data-tab="analyzer">📊 Lỗ hổng</button>
        <button type="button" class="pm-ai-tab" data-tab="manager">📚 Bài học</button>
        <button type="button" class="pm-ai-tab" data-tab="settings">⚙️ API Key</button>
      </div>

      <!-- TAB 1: CHAT GIA SƯ PIKE MAN -->
      <div class="pm-ai-panel active" id="pm-panel-chat">
        <div class="pm-quick-bar">
          <span>🧠 Thinking Level:</span>
          <select id="pm-chat-thinking" class="pm-mini-select" title="Chọn mức độ suy nghĩ của Gemini">
            <option value="minimal">Minimal (Siêu nhanh)</option>
            <option value="low">Low (Nhanh — Mặc định)</option>
            <option value="medium">Medium (Cân bằng)</option>
            <option value="high">High (Chuyên sâu)</option>
          </select>
        </div>
        <div id="pm-chat-feed" style="display:flex;flex-direction:column;gap:8px;flex:1;overflow-y:auto;">
          <div class="pm-ai-msg bot">
            Chào Hoàng! Mình là <b>Pike Man</b> (chạy <b>gemini-3.8-flash</b> miễn phí, đọc được ảnh chụp bài làm). Cần giảng bài <b>Giải tích 1</b> / <b>ĐSTT</b> hoặc <b>chụp ảnh bài viết tay để chấm tự luận</b> thì bấm nút 📷 bên dưới hoặc dán ảnh (<code>Ctrl+V</code>) nhé!
          </div>
        </div>
        <div id="pm-context-pill" class="pm-context-pill" style="display:none;"></div>
        <div id="pm-image-preview" class="pm-preview-strip" style="display:none;"></div>
        <div class="pm-ai-input-bar">
          <input type="file" id="pm-chat-file" accept="image/*" multiple style="display:none;" />
          <button type="button" class="pm-img-btn" id="pm-chat-attach" title="Chụp hoặc tải ảnh bài làm">📷</button>
          <textarea id="pm-chat-input" rows="2" placeholder="Hỏi toán, dán ảnh (Ctrl+V) hoặc gửi ảnh bài làm cần chấm..."></textarea>
          <button type="button" class="pm-ai-btn" id="pm-chat-send">Gửi</button>
        </div>
      </div>

      <!-- TAB 2: LẬP KẾ HOẠCH ÔN TẬP -->
      <div class="pm-ai-panel" id="pm-panel-planner"></div>

      <!-- TAB 3: CHẨN ĐOÁN LỖ HỔNG -->
      <div class="pm-ai-panel" id="pm-panel-analyzer"></div>

      <!-- TAB 4: QUẢN LÝ BÀI HỌC THÔNG MINH -->
      <div class="pm-ai-panel" id="pm-panel-manager">
        <div style="background:#eff6ff;padding:11px;border-radius:12px;border:1px solid #bfdbfe;">
          <div style="font-weight:800;font-size:13.2px;color:#1e3a8a;margin-bottom:4px;">📥 1. AI Đọc Tài Liệu Đóng Góp &amp; Nâng Cấp Kho Đề</div>
          <div style="font-size:11.8px;color:#334155;margin-bottom:8px;">Tải lên <b>PDF đề thi/giáo trình, Ảnh chụp đề, file .txt/.md</b> hoặc dán trực tiếp câu hỏi. AI sẽ tự phân loại chương, giải chi tiết chuẩn KaTeX và nạp vào ngân hàng bài tập.</div>
          <input id="pm-contrib-source" class="pm-ai-field" placeholder="Tên nguồn đóng góp (VD: Đề thi GK1 HCMUE 2025)" style="margin-bottom:6px;" />
          <select id="pm-contrib-topic" class="pm-ai-field" style="margin-bottom:6px;">
            <option value="auto">🤖 Để AI tự nhận diện &amp; phân loại đúng chương</option>
          </select>
          <input type="file" id="pm-contrib-files" class="pm-ai-field" accept=".pdf,image/*,.txt,.md,.tex" multiple style="margin-bottom:6px;padding:6px;" />
          <textarea id="pm-contrib-text" class="pm-ai-field" rows="3" placeholder="Hoặc dán trực tiếp nội dung đề bài / ghi chú đóng góp tại đây..."></textarea>
          <button type="button" class="pm-ai-btn" id="pm-btn-ingest-contrib" style="width:100%;margin-top:6px;">🚀 AI Phân Tích &amp; Trích Xuất Học Liệu</button>
          <div id="pm-contrib-preview" style="margin-top:8px;"></div>
        </div>

        <div style="background:#f8fafc;padding:10px;border-radius:12px;border:1px solid #e2e8f0;">
          <div style="font-weight:700;font-size:13px;margin-bottom:6px;">➕ 2. Tạo Chương / Chuyên đề mới bằng Pike Man</div>
          <select id="pm-new-subject" class="pm-ai-field" style="margin-bottom:6px;">
            <option value="Giải tích 1">Giải tích 1</option>
            <option value="Đại số tuyến tính">Đại số tuyến tính</option>
            <option value="Toán rời rạc">Toán rời rạc</option>
            <option value="Ôn thi THPTQG / ĐGNL">Ôn thi THPTQG / ĐGNL</option>
          </select>
          <input id="pm-new-title" class="pm-ai-field" placeholder="VD: Chương 8: Phương trình vi phân cấp 1" style="margin-bottom:6px;" />
          <textarea id="pm-new-notes" class="pm-ai-field" rows="2" placeholder="Ghi chú trọng tâm (VD: tách biến, tuyến tính, Bernoulli...)"></textarea>
          <button type="button" class="pm-ai-btn" id="pm-btn-create-chapter" style="width:100%;margin-top:6px;">✨ Biên soạn &amp; Lưu vào Web</button>
        </div>

        <div style="background:#f8fafc;padding:10px;border-radius:12px;border:1px solid #e2e8f0;">
          <div style="font-weight:700;font-size:13px;margin-bottom:6px;">⚡ 3. Bổ sung nội dung cho Chương có sẵn</div>
          <select id="pm-target-topic" class="pm-ai-field" style="margin-bottom:8px;"></select>
          <div style="display:flex;gap:6px;">
            <button type="button" class="pm-ai-btn secondary" id="pm-btn-add-ex" style="flex:1;">+3 Bài tự luận</button>
            <button type="button" class="pm-ai-btn" id="pm-btn-add-quiz" style="flex:1;">+5 Câu Quiz</button>
          </div>
        </div>

        <div style="background:#fffbeb;padding:10px;border-radius:12px;border:1px solid #fde68a;">
          <div style="font-weight:700;font-size:13px;margin-bottom:4px;">💾 4. Xuất code JS chuẩn KaTeX cho GitHub Pages</div>
          <div style="font-size:12px;color:#78350f;margin-bottom:6px;">Copy đoạn code JS của các câu AI vừa nạp từ tài liệu đóng góp để dán vĩnh viễn vào <code>data-gt1.js</code> / <code>data-dstt.js</code>.</div>
          <div style="display:flex;gap:6px;">
            <button type="button" class="pm-ai-btn outline" id="pm-btn-copy-contrib-js" style="flex:1;">📋 Copy code đóng góp</button>
            <button type="button" class="pm-ai-btn outline" id="pm-btn-export-data" style="flex:1;">⬇️ Tải data.js</button>
          </div>
        </div>

        <div id="pm-manager-status" style="font-size:12.5px;font-weight:600;color:#0f766e;"></div>
      </div>

      <!-- TAB 5: CÀI ĐẶT API KEY & MÔ HÌNH CAO -->
      <div class="pm-ai-panel" id="pm-panel-settings">
        <div style="font-size:13px;line-height:1.5;">
          Dán <b>Gemini API Key</b> từ Google AI Studio (<code>aistudio.google.com</code>). Key này tự động đồng bộ cho cả Pike Man và Phòng Thi Chấm Ảnh AI.
        </div>
        <label style="font-size:12.5px;font-weight:700;">Gemini API Key:</label>
        <input id="pm-api-key-input" type="password" class="pm-ai-field" placeholder="AIzaSy..." />
        <label style="font-size:12.5px;font-weight:700;">Mô hình Gemini (Khóa cố định):</label>
        <select id="pm-model-select" class="pm-ai-field">
          <option value="gemini-3.8-flash">gemini-3.8-flash (Khuyên dùng — Miễn phí, thông minh nhất dòng Flash)</option>
          <option value="gemini-3.6-flash">gemini-3.6-flash (Miễn phí — Ổn định, ít nghẽn hơn giờ cao điểm)</option>
          <option value="gemini-3.5-flash-lite">gemini-3.5-flash-lite (Miễn phí — Nhanh, hạn mức lượt gọi/ngày rất cao)</option>
          <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Miễn phí — Tốc độ cao, nhẹ)</option>
          <option value="gemini-2.5-flash-lite">gemini-2.5-flash-lite (Miễn phí — Dự phòng ổn định)</option>
          <option value="gemini-4-hydrogen">gemini-4-hydrogen (Gemini 4 Free Tier trên AI Studio)</option>
        </select>
        <input id="pm-custom-model-input" class="pm-ai-field" placeholder="Hoặc nhập tên model tùy chọn (để trống nếu dùng ô trên)" />
        <label style="font-size:12.5px;font-weight:700;">Mức độ suy nghĩ mặc định (Thinking Level):</label>
        <select id="pm-thinking-select" class="pm-ai-field">
          <option value="minimal">Minimal — Siêu nhanh (Flash / Flash-Lite)</option>
          <option value="low">Low — Nhanh, cân bằng cho chấm ảnh (Khuyên dùng)</option>
          <option value="medium">Medium — Suy luận kỹ cho bài toán khó</option>
          <option value="high">High — Chuyên sâu cho chứng minh dài (chậm hơn)</option>
        </select>
        <div style="display:flex;gap:8px;margin-top:4px;">
          <button type="button" class="pm-ai-btn" id="pm-save-key" style="flex:1;">Lưu cấu hình</button>
          <button type="button" class="pm-ai-btn outline" id="pm-test-key">Test kết nối</button>
        </div>
        <div id="pm-settings-status" style="font-size:12.5px;font-weight:600;"></div>
      </div>
    `;
    document.body.appendChild(drawer);

    const refreshTopicDropdown = () => {
      const sel = document.getElementById("pm-target-topic");
      const contribSel = document.getElementById("pm-contrib-topic");
      if (typeof DEFAULT_TOPICS === "undefined") return;
      const optionsHtml = DEFAULT_TOPICS.map(
        (t) => `<option value="${t.id}">${t.code} — ${t.title}</option>`,
      ).join("");
      if (sel) sel.innerHTML = optionsHtml;
      if (contribSel) {
        contribSel.innerHTML =
          `<option value="auto">🤖 Để AI tự nhận diện &amp; phân loại đúng chương</option>` +
          optionsHtml;
      }
    };
    refreshTopicDropdown();

    const currentModel = PikeManAI.getPreferredModel();
    const currentThinking = PikeManAI.getThinkingLevel();
    document.getElementById("pm-api-key-input").value = PikeManAI.getApiKey();
    const selEl = document.getElementById("pm-model-select");
    if ([...selEl.options].some((o) => o.value === currentModel)) {
      selEl.value = currentModel;
    } else {
      document.getElementById("pm-custom-model-input").value = currentModel;
    }
    const chatThinkEl = document.getElementById("pm-chat-thinking");
    const settingsThinkEl = document.getElementById("pm-thinking-select");
    if (chatThinkEl) chatThinkEl.value = currentThinking;
    if (settingsThinkEl) settingsThinkEl.value = currentThinking;
    updateHeaderModelBadge();

    const syncThinkingUI = (val) => {
      PikeManAI.setThinkingLevel(val);
      if (chatThinkEl) chatThinkEl.value = PikeManAI.getThinkingLevel();
      if (settingsThinkEl) settingsThinkEl.value = PikeManAI.getThinkingLevel();
      updateHeaderModelBadge();
    };
    chatThinkEl?.addEventListener("change", (e) =>
      syncThinkingUI(e.target.value),
    );
    settingsThinkEl?.addEventListener("change", (e) =>
      syncThinkingUI(e.target.value),
    );

    fab.addEventListener("click", () => drawer.classList.toggle("open"));
    document
      .getElementById("pm-ai-close")
      .addEventListener("click", () => drawer.classList.remove("open"));

    drawer.querySelectorAll(".pm-ai-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        drawer
          .querySelectorAll(".pm-ai-tab")
          .forEach((b) => b.classList.remove("active"));
        drawer
          .querySelectorAll(".pm-ai-panel")
          .forEach((p) => p.classList.remove("active"));
        btn.classList.add("active");
        const tabName = btn.dataset.tab;
        document.getElementById(`pm-panel-${tabName}`).classList.add("active");
        if (tabName === "planner") renderPlannerPanel();
        else if (tabName === "analyzer") renderAnalyzerPanel();
        else if (tabName === "manager") refreshTopicDropdown();
      });
    });

    const applySettings = () => {
      PikeManAI.setApiKey(document.getElementById("pm-api-key-input").value);
      const customMod = document
        .getElementById("pm-custom-model-input")
        .value.trim();
      const chosenMod =
        customMod || document.getElementById("pm-model-select").value;
      PikeManAI.setPreferredModel(chosenMod);
      const thinkVal = document.getElementById("pm-thinking-select")?.value;
      if (thinkVal) {
        PikeManAI.setThinkingLevel(thinkVal);
        const chatThink = document.getElementById("pm-chat-thinking");
        if (chatThink) chatThink.value = PikeManAI.getThinkingLevel();
      }
      updateHeaderModelBadge();
    };

    document.getElementById("pm-save-key").addEventListener("click", () => {
      applySettings();
      const st = document.getElementById("pm-settings-status");
      st.style.color = "#059669";
      st.textContent = `✅ Đã lưu API Key & khóa cứng mô hình: ${PikeManAI.getPreferredModel()}!`;
    });

    document
      .getElementById("pm-test-key")
      .addEventListener("click", async () => {
        const st = document.getElementById("pm-settings-status");
        st.style.color = "#2563eb";
        st.textContent = "⏳ Đang kiểm tra kết nối với mô hình đã chọn...";
        try {
          applySettings();
          const { modelUsed } = await PikeManAI.generate({
            prompt: "Trả lời ngắn gọn 1 câu: Pike Man đã sẵn sàng!",
          });
          st.style.color = "#059669";
          st.textContent = `✅ Kết nối thành công! Đang chạy cố định: ${modelUsed}`;
        } catch (err) {
          st.style.color = "#dc2626";
          st.textContent = `❌ ${err.message}`;
        }
      });

    let pendingImages = [];
    let pendingProblemContext = "";

    const renderPendingImages = () => {
      const strip = document.getElementById("pm-image-preview");
      if (!strip) return;
      if (!pendingImages.length) {
        strip.style.display = "none";
        strip.innerHTML = "";
        return;
      }
      strip.style.display = "flex";
      strip.innerHTML = "";
      pendingImages.forEach((img, idx) => {
        const box = document.createElement("div");
        box.className = "pm-preview-thumb";
        box.innerHTML = `<img src="${img.dataUrl}" alt="Ảnh bài làm" /><button type="button" class="pm-preview-remove" title="Xóa ảnh">✕</button>`;
        box
          .querySelector(".pm-preview-remove")
          .addEventListener("click", () => {
            pendingImages.splice(idx, 1);
            renderPendingImages();
          });
        strip.appendChild(box);
      });
    };

    const renderContextBanner = () => {
      const pill = document.getElementById("pm-context-pill");
      if (!pill) return;
      if (!pendingProblemContext) {
        pill.style.display = "none";
        pill.innerHTML = "";
        return;
      }
      const shortTitle =
        pendingProblemContext.replace(/\s+/g, " ").slice(0, 75) +
        (pendingProblemContext.length > 75 ? "..." : "");
      pill.style.display = "flex";
      pill.innerHTML = `<span>📝 Đang chấm bài: <i>${shortTitle.replace(/</g, "&lt;")}</i></span><button type="button" id="pm-clear-ctx" style="border:none;background:transparent;color:#1e40af;font-weight:800;cursor:pointer;">✕</button>`;
      pill.querySelector("#pm-clear-ctx").addEventListener("click", () => {
        pendingProblemContext = "";
        renderContextBanner();
      });
    };

    const addFilesToPending = async (fileList) => {
      const files = Array.from(fileList || []).filter((f) =>
        f.type.startsWith("image/"),
      );
      for (const file of files.slice(0, 4 - pendingImages.length)) {
        try {
          const payload = await PikeManAI.fileToImagePayload(file);
          pendingImages.push(payload);
        } catch (_) {}
      }
      renderPendingImages();
    };

    const normalizeLatexDelimiters = (str) =>
      str
        .replace(/\\\[([\s\S]*?)\\\]/g, (_, m) => `$$${m}$$`)
        .replace(/\\\(([\s\S]*?)\\\)/g, (_, m) => `$${m}$`);

    const appendMsg = (
      content,
      sender = "bot",
      isRawHtml = false,
      images = [],
    ) => {
      const feed = document.getElementById("pm-chat-feed");
      const div = document.createElement("div");
      div.className = `pm-ai-msg ${sender}`;
      let imgHtml = "";
      if (Array.isArray(images) && images.length) {
        imgHtml = `<div class="pm-msg-images">${images
          .map((im) => `<img src="${im.dataUrl}" alt="Ảnh đính kèm" />`)
          .join("")}</div>`;
      }
      const bodyHtml = isRawHtml
        ? content
        : formatMarkdownLite(normalizeLatexDelimiters(content));
      div.innerHTML = imgHtml + bodyHtml;
      feed.appendChild(div);
      feed.scrollTop = feed.scrollHeight;
      renderMathIfAvailable(div);
      return div;
    };

    window.askPikeMan = async (promptText, options = {}) => {
      const images = Array.isArray(options.images) ? options.images : [];
      const displayText = options.displayText || promptText;
      drawer.classList.add("open");
      drawer.querySelector('[data-tab="chat"]').click();
      appendMsg(displayText, "user", false, images);

      // Nếu chưa nhập API Key và không kèm ảnh, hỗ trợ tra cứu nhanh offline trước
      if (!PikeManAI.getApiKey() && !images.length) {
        const lower = promptText.toLowerCase();
        const offlineMatch = OFFLINE_FORMULAS.find((item) =>
          item.keywords.some((kw) => lower.includes(kw)),
        );
        if (offlineMatch) {
          appendMsg(
            `<div style="font-weight:700;color:#1d4ed8;margin-bottom:4px;">📌 ${offlineMatch.title} (Tra cứu nhanh Offline)</div>${offlineMatch.answer}<div style="margin-top:8px;font-size:12px;color:#64748b;">💡 Dán Gemini API Key ở tab <b>⚙️ API Key</b> để Pike Man giải &amp; chấm ảnh bài làm chi tiết từng bước!</div>`,
            "bot",
            true,
          );
          return;
        }
      }

      const loadingDiv = appendMsg(
        `⏳ Pike Man (${PikeManAI.getPreferredModel()}) đang ${
          images.length ? "đọc ảnh bài làm & chấm điểm" : "phân tích"
        }...`,
        "bot",
      );

      const pageContext =
        document.querySelector("#study-modal-title, h1, h2")?.innerText ||
        "MathLab Mini — Giải tích 1 & Đại số tuyến tính";

      const gradingAddon = images.length
        ? " Người dùng có đính kèm ảnh chụp bài làm (có thể viết tay). Hãy đọc kỹ từng dòng trong ảnh, đối chiếu đề bài, chấm điểm chi tiết từng bước (thang điểm tự luận), chỉ rõ dòng nào đúng, dòng nào sai dấu/sai công thức/thiếu điều kiện và viết lại lời giải chuẩn."
        : "";

      try {
        const { text, modelUsed } = await PikeManAI.generate({
          prompt: promptText,
          images,
          systemInstruction: `Bạn là Pike Man — trợ lý gia sư Toán Cao Cấp (Giải tích 1 & Đại số tuyến tính chuẩn HCMUE) trên nền tảng MathLab Mini. Người dùng đang xem: "${pageContext}". Hãy giải thích chặt chẽ từng bước, kiểm chứng kỹ mọi phép biến đổi, chỉ rõ bẫy mất điểm khi thi tự luận và luôn bọc công thức bằng $...$ hoặc $$...$$.${gradingAddon}`,
          onStatus: (activeModel, idx) => {
            loadingDiv.innerHTML =
              idx === 0
                ? `⏳ Pike Man (<code>${activeModel}</code>) đang ${
                    images.length ? "đọc ảnh bài làm & chấm điểm" : "phân tích"
                  }...`
                : `⏳ Model trước đang bận/hết lượt, tự động chuyển sang <code>${activeModel}</code>...`;
          },
        });
        loadingDiv.innerHTML =
          formatMarkdownLite(normalizeLatexDelimiters(text)) +
          `<div style="margin-top:8px;font-size:11px;color:#64748b;">⚡ Model: <code>${modelUsed}</code> • Thinking: <code>${PikeManAI.getThinkingLevel()}</code></div>`;
        renderMathIfAvailable(loadingDiv);
      } catch (err) {
        loadingDiv.innerHTML = `<span style="color:#dc2626;">❌ ${err.message}</span>`;
      }
    };
    window.askMathLabGemini = window.askPikeMan;

    window.openPikeManGrader = (problemText) => {
      pendingProblemContext = (problemText || "").trim();
      renderContextBanner();
      drawer.classList.add("open");
      drawer.querySelector('[data-tab="chat"]').click();
      document.getElementById("pm-chat-input")?.focus();
    };

    const fileInputEl = document.getElementById("pm-chat-file");
    document
      .getElementById("pm-chat-attach")
      .addEventListener("click", () => fileInputEl?.click());
    fileInputEl?.addEventListener("change", (e) => {
      addFilesToPending(e.target.files);
      e.target.value = "";
    });

    const chatInputEl = document.getElementById("pm-chat-input");
    chatInputEl.addEventListener("paste", (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      const imgFiles = [];
      for (const item of items) {
        if (item.type && item.type.startsWith("image/")) {
          const f = item.getAsFile();
          if (f) imgFiles.push(f);
        }
      }
      if (imgFiles.length) {
        e.preventDefault();
        addFilesToPending(imgFiles);
      }
    });

    const chatPanelEl = document.getElementById("pm-panel-chat");
    chatPanelEl.addEventListener("dragover", (e) => e.preventDefault());
    chatPanelEl.addEventListener("drop", (e) => {
      if (e.dataTransfer?.files?.length) {
        e.preventDefault();
        addFilesToPending(e.dataTransfer.files);
      }
    });

    const handleSendChat = () => {
      const val = chatInputEl.value.trim();
      if (!val && !pendingImages.length) return;

      const imgsToSend = pendingImages.slice();
      const ctx = pendingProblemContext;
      chatInputEl.value = "";
      pendingImages = [];
      pendingProblemContext = "";
      renderPendingImages();
      renderContextBanner();

      let fullPrompt = val;
      if (ctx && imgsToSend.length) {
        fullPrompt = `Đề bài:\n${ctx}\n\n${
          val ||
          "Hãy đọc ảnh bài làm viết tay đính kèm và chấm điểm chi tiết từng bước, chỉ ra lỗi sai hoặc thiếu sót trình bày tự luận."
        }`;
      } else if (ctx) {
        fullPrompt = `Đề bài:\n${ctx}\n\nBài làm / Câu hỏi của tôi:\n${val}`;
      } else if (!val && imgsToSend.length) {
        fullPrompt =
          "Hãy đọc đề bài và bài làm trong ảnh đính kèm: nếu là bài làm của tôi hãy chấm điểm chi tiết từng bước và sửa lỗi sai; nếu chỉ là đề bài hãy giải chi tiết từng bước.";
      }

      const shortDisplay = val
        ? val
        : ctx
          ? "📝 Chấm ảnh bài làm theo đề bài đã chọn"
          : "📷 Xem và chấm/giải ảnh đính kèm";

      window.askPikeMan(fullPrompt, {
        images: imgsToSend,
        displayText: shortDisplay,
      });
    };

    document
      .getElementById("pm-chat-send")
      .addEventListener("click", handleSendChat);
    chatInputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendChat();
      }
    });

    document
      .getElementById("pm-btn-create-chapter")
      .addEventListener("click", async (e) => {
        const btn = e.target;
        const status = document.getElementById("pm-manager-status");
        const title = document.getElementById("pm-new-title").value.trim();
        if (!title) {
          status.style.color = "#dc2626";
          status.textContent = "⚠️ Vui lòng nhập tên chương trước!";
          return;
        }
        btn.disabled = true;
        status.style.color = "#2563eb";
        status.textContent =
          "⏳ Pike Man đang biên soạn lý thuyết, bài tập & quiz...";
        try {
          const ch = await PikeManAI.createNewChapter({
            subject: document.getElementById("pm-new-subject").value,
            title,
            syllabusNotes: document.getElementById("pm-new-notes").value.trim(),
          });
          refreshTopicDropdown();
          status.style.color = "#059669";
          status.textContent = `✅ Đã tạo xong "${ch.title}" và cập nhật lên danh sách chương!`;
        } catch (err) {
          status.style.color = "#dc2626";
          status.textContent = `❌ ${err.message}`;
        } finally {
          btn.disabled = false;
        }
      });

    const handleEnrich = async (mode, btn) => {
      const status = document.getElementById("pm-manager-status");
      const topicId = document.getElementById("pm-target-topic").value;
      btn.disabled = true;
      status.style.color = "#2563eb";
      status.textContent = "⏳ Pike Man đang soạn thêm câu hỏi mới...";
      try {
        const msg = await PikeManAI.enrichExistingChapter(topicId, mode);
        status.style.color = "#059669";
        status.textContent = `✅ ${msg}`;
      } catch (err) {
        status.style.color = "#dc2626";
        status.textContent = `❌ ${err.message}`;
      } finally {
        btn.disabled = false;
      }
    };

    document
      .getElementById("pm-btn-add-ex")
      .addEventListener("click", (e) => handleEnrich("exercises", e.target));
    document
      .getElementById("pm-btn-add-quiz")
      .addEventListener("click", (e) => handleEnrich("quiz", e.target));
    document
      .getElementById("pm-btn-export-data")
      .addEventListener("click", () => PikeManAI.exportUpdatedDataJS());

    document
      .getElementById("pm-btn-copy-contrib-js")
      .addEventListener("click", async () => {
        const status = document.getElementById("pm-manager-status");
        if (!window.MathLabDataManager) {
          status.style.color = "#dc2626";
          status.textContent = "⚠️ Chưa nạp MathLabDataManager trong data.js!";
          return;
        }
        const code = window.MathLabDataManager.exportJSCode();
        try {
          await navigator.clipboard.writeText(code);
          status.style.color = "#059669";
          status.textContent =
            "✅ Đã copy toàn bộ code JS (chuẩn KaTeX) của dữ liệu đóng góp vào Clipboard!";
        } catch {
          status.style.color = "#2563eb";
          status.textContent =
            "ℹ️ Trình duyệt chặn clipboard tự động, đã xuất log ra Console (F12).";
          console.log(code);
        }
      });

    document
      .getElementById("pm-btn-ingest-contrib")
      .addEventListener("click", async (e) => {
        const btn = e.target;
        const status = document.getElementById("pm-manager-status");
        const previewBox = document.getElementById("pm-contrib-preview");
        const files = document.getElementById("pm-contrib-files")?.files;
        const rawText = document.getElementById("pm-contrib-text")?.value || "";
        const targetTopicId =
          document.getElementById("pm-contrib-topic")?.value || "auto";
        const sourceTitle =
          document.getElementById("pm-contrib-source")?.value || "";

        btn.disabled = true;
        previewBox.innerHTML = "";
        status.style.color = "#2563eb";
        status.textContent =
          "⏳ Pike Man đang đọc tài liệu đóng góp & bóc tách câu hỏi...";

        try {
          const result = await PikeManAI.ingestContributedResource({
            files,
            rawText,
            targetTopicId,
            sourceTitle,
            onStatus: (mod, idx) => {
              status.textContent =
                idx === 0
                  ? `⏳ Pike Man (${mod}) đang đọc & chuẩn hóa LaTeX tài liệu...`
                  : `⏳ Đang thử model dự phòng (${mod})...`;
            },
          });

          const flatItems = [];
          result.bundles.forEach((b) => {
            (b.theories || []).forEach((item) =>
              flatItems.push({ topicId: b.topicId, kind: "theory", item }),
            );
            (b.exercises || []).forEach((item) =>
              flatItems.push({ topicId: b.topicId, kind: "exercise", item }),
            );
            (b.quizzes || []).forEach((item) =>
              flatItems.push({ topicId: b.topicId, kind: "quiz", item }),
            );
          });

          if (!flatItems.length) {
            status.style.color = "#d97706";
            status.textContent =
              "⚠️ AI không tìm thấy câu hỏi hoặc nội dung toán học nào trong tài liệu này.";
            return;
          }

          status.style.color = "#0f766e";
          status.textContent = `✨ AI (${result.modelUsed}) đã trích xuất được ${flatItems.length} mục từ "${result.sourceTitle}". Tick chọn và bấm Duyệt!`;

          const card = document.createElement("div");
          card.style.cssText =
            "background:#ffffff;border:1px solid #93c5fd;border-radius:10px;padding:9px;font-size:12px;";
          card.innerHTML = `
            <div style="font-weight:700;color:#1e3a8a;margin-bottom:6px;">
              📋 Xem trước kết quả AI bóc tách (${flatItems.length} mục):
            </div>
            <div id="pm-contrib-checklist" style="max-height:210px;overflow-y:auto;display:flex;flex-direction:column;gap:6px;margin-bottom:8px;"></div>
            <button type="button" id="pm-btn-approve-contrib" class="pm-ai-btn secondary" style="width:100%;">
              ✅ Duyệt &amp; Nạp vào Ngân hàng Web
            </button>
          `;

          const listEl = card.querySelector("#pm-contrib-checklist");
          flatItems.forEach((entry, idx) => {
            const labelMap = {
              theory: "📘 Lý thuyết",
              exercise: "✍️ Tự luận",
              quiz: "🔘 Trắc nghiệm",
            };
            const titleText =
              entry.kind === "theory"
                ? entry.item.heading
                : entry.item.question;

            const row = document.createElement("label");
            row.style.cssText =
              "display:flex;align-items:flex-start;gap:6px;padding:6px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;cursor:pointer;";
            row.innerHTML = `
              <input type="checkbox" data-idx="${idx}" checked style="margin-top:3px;" />
              <div style="flex:1;line-height:1.45;">
                <span style="font-weight:700;color:#2563eb;">[${entry.topicId}] ${labelMap[entry.kind]}:</span>
                <span>${String(titleText || "").slice(0, 140)}${String(titleText || "").length > 140 ? "..." : ""}</span>
              </div>
            `;
            listEl.appendChild(row);
          });

          previewBox.appendChild(card);
          renderMathIfAvailable(previewBox);

          card
            .querySelector("#pm-btn-approve-contrib")
            .addEventListener("click", () => {
              const checkedIndices = new Set(
                Array.from(
                  card.querySelectorAll('input[type="checkbox"]:checked'),
                ).map((cb) => parseInt(cb.dataset.idx, 10)),
              );

              const grouped = {};
              flatItems.forEach((entry, idx) => {
                if (!checkedIndices.has(idx)) return;
                if (!grouped[entry.topicId]) {
                  grouped[entry.topicId] = {
                    topicId: entry.topicId,
                    sourceTitle: result.sourceTitle,
                    theories: [],
                    exercises: [],
                    quizzes: [],
                  };
                }
                if (entry.kind === "theory") {
                  grouped[entry.topicId].theories.push(entry.item);
                } else if (entry.kind === "exercise") {
                  grouped[entry.topicId].exercises.push(entry.item);
                } else if (entry.kind === "quiz") {
                  grouped[entry.topicId].quizzes.push(entry.item);
                }
              });

              const summary = PikeManAI.commitExtractedBundles(
                Object.values(grouped),
              );
              previewBox.innerHTML = "";
              document.getElementById("pm-contrib-text").value = "";
              const fileInput = document.getElementById("pm-contrib-files");
              if (fileInput) fileInput.value = "";

              status.style.color = "#059669";
              status.textContent = `🎉 Đã nạp vào kho: +${summary.totalTheory} lý thuyết, +${summary.totalExercise} bài tự luận, +${summary.totalQuiz} câu quiz${summary.totalSkipped ? ` (bỏ qua ${summary.totalSkipped} câu trùng)` : ""}!`;
            });
        } catch (err) {
          status.style.color = "#dc2626";
          status.textContent = `❌ ${err.message}`;
        } finally {
          btn.disabled = false;
        }
      });
  }

  // -----------------------------------------------------------------------
  // 4. GẮN NÚT PIKE MAN VÀO TỪNG BÀI TẬP / VÍ DỤ TRÊN TRANG
  // -----------------------------------------------------------------------
  function extractCleanMathText(el) {
    const clone = el.cloneNode(true);
    clone
      .querySelectorAll(".pm-inline-ai-bar, button")
      .forEach((n) => n.remove());
    clone.querySelectorAll(".katex").forEach((kEl) => {
      const ann = kEl.querySelector('annotation[encoding="application/x-tex"]');
      if (ann && ann.textContent) {
        const isDisplay = !!kEl.closest(".katex-display");
        const tex = ann.textContent.trim();
        kEl.replaceWith(
          document.createTextNode(isDisplay ? `$$${tex}$$` : `$${tex}$`),
        );
      }
    });
    clone.querySelectorAll(".katex-mathml").forEach((m) => m.remove());
    return (clone.innerText || clone.textContent || "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function attachInlineTutorButtons(root = document) {
    if (!root || typeof root.querySelectorAll !== "function") return;
    const targets = root.querySelectorAll(
      ".exercise-card, .exercise-item, .checkpoint-box, .quiz-question, .rubric-box",
    );
    targets.forEach((card) => {
      if (card.dataset.pmAttached === "1") return;
      if (
        card.classList.contains("rubric-box") &&
        card.parentElement?.closest(
          ".exercise-card, .exercise-item, .checkpoint-box",
        )
      ) {
        return;
      }
      card.dataset.pmAttached = "1";

      const bar = document.createElement("div");
      bar.className = "pm-inline-ai-bar";
      bar.innerHTML = `
        <button type="button" class="pm-inline-chip" data-act="explain">💡 Pike Man giảng bài</button>
        <button type="button" class="pm-inline-chip" data-act="grade">📷 Chấm bài làm</button>
        <button type="button" class="pm-inline-chip" data-act="similar">🔄 Đẻ bài tương tự</button>
      `;

      bar.addEventListener("click", (e) => {
        const btn = e.target.closest(".pm-inline-chip");
        if (!btn) return;
        const problemText = extractCleanMathText(card).slice(0, 1800);
        const act = btn.dataset.act;

        if (act === "explain") {
          window.askPikeMan(
            `Giải thích chi tiết từng bước và bản chất toán học của bài sau:\n\n${problemText}`,
          );
        } else if (act === "similar") {
          window.askPikeMan(
            `Tạo cho tôi 1 bài tập tương tự (thay đổi số liệu/hàm số cùng độ khó) kèm lời giải từng bước dựa trên bài này:\n\n${problemText}`,
          );
        } else if (act === "grade") {
          window.openPikeManGrader(problemText);
        }
      });

      card.appendChild(bar);
    });
  }

  // -----------------------------------------------------------------------
  // 5. KHẢO SÁT KHAI TRIỂN TAYLOR - MACLAURIN TỚI n -> ∞ (VI PHÂN TỰ ĐỘNG)
  // -----------------------------------------------------------------------
  const TaylorEngine = {
    zeros(N) {
      return new Array(N + 1).fill(0);
    },
    constant(val, N) {
      const a = this.zeros(N);
      a[0] = val;
      return a;
    },
    variable(x0, N) {
      const a = this.zeros(N);
      a[0] = x0;
      if (N >= 1) a[1] = 1;
      return a;
    },
    add(A, B) {
      return A.map((v, i) => v + B[i]);
    },
    sub(A, B) {
      return A.map((v, i) => v - B[i]);
    },
    mul(A, B) {
      const N = A.length - 1;
      const C = this.zeros(N);
      for (let k = 0; k <= N; k++) {
        let sum = 0;
        for (let j = 0; j <= k; j++) {
          sum += A[j] * B[k - j];
        }
        C[k] = sum;
      }
      return C;
    },
    div(A, B) {
      const N = A.length - 1;
      if (Math.abs(B[0]) < 1e-13) {
        throw new Error("Mẫu số bằng 0 tại tâm khai triển x₀!");
      }
      const Q = this.zeros(N);
      Q[0] = A[0] / B[0];
      for (let k = 1; k <= N; k++) {
        let sum = 0;
        for (let j = 1; j <= k; j++) {
          sum += B[j] * Q[k - j];
        }
        Q[k] = (A[k] - sum) / B[0];
      }
      return Q;
    },
    exp(U) {
      const N = U.length - 1;
      const E = this.zeros(N);
      E[0] = Math.exp(U[0]);
      for (let k = 1; k <= N; k++) {
        let sum = 0;
        for (let j = 1; j <= k; j++) {
          sum += j * U[j] * E[k - j];
        }
        E[k] = sum / k;
      }
      return E;
    },
    ln(U) {
      const N = U.length - 1;
      if (U[0] <= 0) {
        throw new Error("Hàm ln(u) không xác định tại u(x₀) ≤ 0!");
      }
      const L = this.zeros(N);
      L[0] = Math.log(U[0]);
      for (let k = 1; k <= N; k++) {
        let sum = 0;
        for (let j = 1; j < k; j++) {
          sum += j * L[j] * U[k - j];
        }
        L[k] = (U[k] - sum / k) / U[0];
      }
      return L;
    },
    sinCos(U) {
      const N = U.length - 1;
      const S = this.zeros(N);
      const C = this.zeros(N);
      S[0] = Math.sin(U[0]);
      C[0] = Math.cos(U[0]);
      for (let k = 1; k <= N; k++) {
        let sumS = 0;
        let sumC = 0;
        for (let j = 1; j <= k; j++) {
          sumS += j * U[j] * C[k - j];
          sumC += j * U[j] * S[k - j];
        }
        S[k] = sumS / k;
        C[k] = -sumC / k;
      }
      return { S, C };
    },
    sinhCosh(U) {
      const N = U.length - 1;
      const SH = this.zeros(N);
      const CH = this.zeros(N);
      SH[0] = Math.sinh(U[0]);
      CH[0] = Math.cosh(U[0]);
      for (let k = 1; k <= N; k++) {
        let sumSH = 0;
        let sumCH = 0;
        for (let j = 1; j <= k; j++) {
          sumSH += j * U[j] * CH[k - j];
          sumCH += j * U[j] * SH[k - j];
        }
        SH[k] = sumSH / k;
        CH[k] = sumCH / k;
      }
      return { SH, CH };
    },
    powConst(U, alpha) {
      const N = U.length - 1;
      if (Number.isInteger(alpha) && alpha >= 0) {
        let res = this.constant(1, N);
        let base = U.slice();
        let p = alpha;
        while (p > 0) {
          if (p & 1) res = this.mul(res, base);
          base = this.mul(base, base);
          p >>= 1;
        }
        return res;
      }
      if (U[0] === 0) {
        throw new Error("Không khả vi lũy thừa lẻ tại u(x₀) = 0!");
      }
      const P = this.zeros(N);
      P[0] = Math.pow(U[0], alpha);
      for (let k = 1; k <= N; k++) {
        let sum = 0;
        for (let j = 1; j <= k; j++) {
          sum += (alpha * j - (k - j)) * U[j] * P[k - j];
        }
        P[k] = sum / (k * U[0]);
      }
      return P;
    },
    atan(U) {
      const N = U.length - 1;
      const out = this.zeros(N);
      out[0] = Math.atan(U[0]);
      if (N === 0) return out;
      const dU = U.slice(1).map((v, idx) => (idx + 1) * v);
      const Usub = U.slice(0, N);
      const denom = this.add(this.constant(1, N - 1), this.mul(Usub, Usub));
      const deriv = this.div(dU, denom);
      for (let k = 1; k <= N; k++) {
        out[k] = deriv[k - 1] / k;
      }
      return out;
    },
    asin(U) {
      const N = U.length - 1;
      if (Math.abs(U[0]) >= 1) {
        throw new Error("arcsin(u) cần |u(x₀)| < 1 để khả vi!");
      }
      const out = this.zeros(N);
      out[0] = Math.asin(U[0]);
      if (N === 0) return out;
      const dU = U.slice(1).map((v, idx) => (idx + 1) * v);
      const Usub = U.slice(0, N);
      const inside = this.sub(this.constant(1, N - 1), this.mul(Usub, Usub));
      const denom = this.powConst(inside, 0.5);
      const deriv = this.div(dU, denom);
      for (let k = 1; k <= N; k++) {
        out[k] = deriv[k - 1] / k;
      }
      return out;
    },

    tokenize(expr) {
      const raw = String(expr || "")
        .replace(/\*\*/g, "^")
        .replace(/\s+/g, "");
      const tokens = [];
      let i = 0;
      while (i < raw.length) {
        const ch = raw[i];
        if (/[0-9.]/.test(ch)) {
          let num = "";
          while (i < raw.length && /[0-9.]/.test(raw[i])) {
            num += raw[i++];
          }
          if (/^[eE][+-]?\d/.test(raw.slice(i))) {
            num += raw[i++];
            if (raw[i] === "+" || raw[i] === "-") {
              num += raw[i++];
            }
            while (i < raw.length && /[0-9]/.test(raw[i])) {
              num += raw[i++];
            }
          }
          const parsedNum = parseFloat(num);
          if (
            !/^(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/.test(num) ||
            !Number.isFinite(parsedNum)
          ) {
            throw new Error(`Số không hợp lệ: "${num}"`);
          }
          tokens.push({ type: "num", val: parsedNum });
        } else if (/[a-zA-Z]/.test(ch)) {
          const startIdx = i;
          let id = "";
          while (i < raw.length && /[a-zA-Z0-9_]/.test(raw[i])) {
            id += raw[i++];
          }
          const lowerId = id.toLowerCase();
          const KNOWN_FNS = new Set([
            "sin",
            "cos",
            "tan",
            "cot",
            "ctg",
            "exp",
            "ln",
            "log",
            "sqrt",
            "atan",
            "arctan",
            "asin",
            "arcsin",
            "acos",
            "arccos",
            "sinh",
            "cosh",
            "tanh",
            "abs",
          ]);
          if (lowerId === "pi") {
            tokens.push({ type: "num", val: Math.PI });
          } else if (lowerId === "e") {
            tokens.push({ type: "num", val: Math.E });
          } else if (lowerId === "x") {
            tokens.push({ type: "var", val: "x" });
          } else if (KNOWN_FNS.has(lowerId)) {
            tokens.push({ type: "fn", val: lowerId });
          } else if (lowerId.startsWith("pi") && id.length > 2) {
            tokens.push({ type: "num", val: Math.PI });
            i = startIdx + 2;
          } else if (lowerId.startsWith("x") && id.length > 1) {
            tokens.push({ type: "var", val: "x" });
            i = startIdx + 1;
          } else if (lowerId.startsWith("e") && id.length > 1) {
            tokens.push({ type: "num", val: Math.E });
            i = startIdx + 1;
          } else {
            tokens.push({ type: "fn", val: lowerId });
          }
        } else if ("+-*/^()".includes(ch)) {
          tokens.push({ type: "op", val: ch });
          i++;
        } else {
          throw new Error(`Ký tự không hợp lệ: "${ch}"`);
        }
      }

      const out = [];
      for (let k = 0; k < tokens.length; k++) {
        out.push(tokens[k]);
        const cur = tokens[k];
        const nxt = tokens[k + 1];
        if (!nxt) continue;
        const leftCanMul =
          cur.type === "num" ||
          cur.type === "var" ||
          (cur.type === "op" && cur.val === ")");
        const rightCanMul =
          nxt.type === "var" ||
          nxt.type === "fn" ||
          (nxt.type === "op" && nxt.val === "(");
        if (leftCanMul && rightCanMul) {
          out.push({ type: "op", val: "*" });
        }
      }
      return out;
    },

    computeJet(expr, x0, N) {
      const normalizedExpr =
        typeof window.latexToMathExpr === "function"
          ? window.latexToMathExpr(expr)
          : expr;
      const tokens = this.tokenize(normalizedExpr);
      let pos = 0;
      const peek = () => tokens[pos];
      const consume = () => tokens[pos++];

      const parseExpr = () => {
        let left = parseTerm();
        while (
          peek() &&
          peek().type === "op" &&
          (peek().val === "+" || peek().val === "-")
        ) {
          const op = consume().val;
          const right = parseTerm();
          left = op === "+" ? this.add(left, right) : this.sub(left, right);
        }
        return left;
      };

      const parseTerm = () => {
        let left = parseUnary();
        while (
          peek() &&
          peek().type === "op" &&
          (peek().val === "*" || peek().val === "/")
        ) {
          const op = consume().val;
          const right = parseUnary();
          left = op === "*" ? this.mul(left, right) : this.div(left, right);
        }
        return left;
      };

      const parseUnary = () => {
        if (
          peek() &&
          peek().type === "op" &&
          (peek().val === "+" || peek().val === "-")
        ) {
          const op = consume().val;
          const val = parseUnary();
          return op === "-" ? this.sub(this.zeros(N), val) : val;
        }
        return parsePower();
      };

      const parsePower = () => {
        let base = parsePrimary();
        if (peek() && peek().type === "op" && peek().val === "^") {
          consume();
          const exp = parseUnary();
          const isConstExp = exp.slice(1).every((v) => Math.abs(v) < 1e-14);
          if (isConstExp) {
            base = this.powConst(base, exp[0]);
          } else {
            base = this.exp(this.mul(exp, this.ln(base)));
          }
        }
        return base;
      };

      const parsePrimary = () => {
        const tok = peek();
        if (!tok) throw new Error("Biểu thức thiếu toán hạng!");
        if (tok.type === "num") {
          consume();
          return this.constant(tok.val, N);
        }
        if (tok.type === "var") {
          consume();
          return this.variable(x0, N);
        }
        if (tok.type === "fn") {
          const fn = consume().val;
          if (!peek() || peek().val !== "(") {
            throw new Error(`Thiếu ngoặc '(' sau hàm ${fn}`);
          }
          consume();
          const arg = parseExpr();
          if (!peek() || peek().val !== ")") {
            throw new Error(`Thiếu ngoặc ')' đóng hàm ${fn}`);
          }
          consume();

          switch (fn) {
            case "sin":
              return this.sinCos(arg).S;
            case "cos":
              return this.sinCos(arg).C;
            case "tan": {
              const { S, C } = this.sinCos(arg);
              return this.div(S, C);
            }
            case "cot":
            case "ctg": {
              const { S, C } = this.sinCos(arg);
              return this.div(C, S);
            }
            case "exp":
              return this.exp(arg);
            case "ln":
            case "log":
              return this.ln(arg);
            case "sqrt":
              return this.powConst(arg, 0.5);
            case "atan":
            case "arctan":
              return this.atan(arg);
            case "asin":
            case "arcsin":
              return this.asin(arg);
            case "acos":
            case "arccos":
              return this.sub(this.constant(Math.PI / 2, N), this.asin(arg));
            case "sinh":
              return this.sinhCosh(arg).SH;
            case "cosh":
              return this.sinhCosh(arg).CH;
            case "tanh": {
              const { SH, CH } = this.sinhCosh(arg);
              return this.div(SH, CH);
            }
            case "abs":
              if (arg[0] === 0)
                throw new Error("|u(x)| không khả vi tại u(x₀) = 0!");
              return arg[0] > 0 ? arg : this.sub(this.zeros(N), arg);
            default:
              throw new Error(`Chưa hỗ trợ hàm "${fn}"`);
          }
        }
        if (tok.type === "op" && tok.val === "(") {
          consume();
          const inner = parseExpr();
          if (!peek() || peek().val !== ")") {
            throw new Error("Thiếu ngoặc đóng ')'");
          }
          consume();
          return inner;
        }
        throw new Error(`Lỗi cú pháp gần "${tok.val}"`);
      };

      const result = parseExpr();
      if (pos < tokens.length) {
        throw new Error(`Dư ký tự "${tokens[pos].val}"`);
      }
      return result;
    },

    evalHorner(coeffs, x, x0) {
      const dx = x - x0;
      let acc = 0;
      for (let k = coeffs.length - 1; k >= 0; k--) {
        acc = acc * dx + coeffs[k];
      }
      return acc;
    },
  };

  function setupInfiniteTaylorUI() {
    const slot = document.getElementById("taylor-controls-slot");
    if (!slot) return;

    slot.innerHTML = `
      <div id="taylor-visual-panel" style="padding:14px;border-radius:12px;background:var(--bg-surface-alt,#f8fafc);border:1px solid var(--border-color,#cbd5e1);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <span style="font-size:0.82rem;font-weight:800;color:var(--primary,#2563eb);text-transform:uppercase;">
            📐 Xấp xỉ Taylor – Maclaurin (n → ∞)
          </span>
          <label style="display:inline-flex;align-items:center;gap:5px;font-size:0.82rem;font-weight:700;cursor:pointer;">
            <input type="checkbox" id="taylor-enable-chk" checked /> Hiển thị Tₙ(x)
          </label>
        </div>

        <div class="taylor-controls-stack">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <div>
              <label for="taylor-x0-input" style="font-size:0.8rem;font-weight:700;display:block;margin-bottom:4px;">Tâm khai triển x₀:</label>
              <input type="text" id="taylor-x0-input" class="input-control" value="0" placeholder="VD: 0, 0.5, pi/4" style="width:100%;padding:7px 10px;" />
            </div>
            <div>
              <label for="taylor-n-input" style="font-size:0.8rem;font-weight:700;display:block;margin-bottom:4px;">Bậc đa thức n (tới ∞):</label>
              <input type="number" min="1" step="1" id="taylor-n-input" class="input-control" value="3" style="width:100%;padding:7px 10px;" />
            </div>
          </div>

          <div class="taylor-slider-row">
            <input type="range" id="taylor-n-slider" min="1" max="50" value="3" />
            <button type="button" id="taylor-play-btn" class="btn btn-sm btn-primary">
              ▶ Khảo sát n → ∞
            </button>
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:5px;">
            <button type="button" class="btn btn-sm btn-outline taylor-preset-btn" data-fn="sin(x)" data-x0="0" data-n="5">sin(x)</button>
            <button type="button" class="btn btn-sm btn-outline taylor-preset-btn" data-fn="exp(x)" data-x0="0" data-n="6">eˣ</button>
            <button type="button" class="btn btn-sm btn-outline taylor-preset-btn" data-fn="ln(1 + x)" data-x0="0" data-n="12">ln(1+x) (R=1)</button>
            <button type="button" class="btn btn-sm btn-outline taylor-preset-btn" data-fn="1 / (1 - x)" data-x0="0" data-n="15">1/(1-x) (R=1)</button>
          </div>

          <div id="taylor-live-stats" style="font-size:0.8rem;line-height:1.55;padding:9px 11px;border-radius:8px;background:var(--bg-surface,#ffffff);border:1px dashed var(--border-color,#94a3b8);color:var(--text-primary,#0f172a);"></div>
        </div>
      </div>
    `;

    const enableChk = document.getElementById("taylor-enable-chk");
    const x0Input = document.getElementById("taylor-x0-input");
    const nInput = document.getElementById("taylor-n-input");
    const nSlider = document.getElementById("taylor-n-slider");
    const playBtn = document.getElementById("taylor-play-btn");
    const statsBox = document.getElementById("taylor-live-stats");

    const parseX0Value = (rawStr) => {
      const clean = String(rawStr || "").trim();
      if (!clean) return 0;
      try {
        const val = TaylorEngine.computeJet(clean, 0, 0)[0];
        if (Number.isFinite(val)) return val;
      } catch (_) {}
      const num = parseFloat(clean);
      return Number.isFinite(num) ? num : 0;
    };

    const resolveViewport = (canvas) => {
      const W = canvas.width;
      const H = canvas.height;
      const vp = canvas._mathViewport;
      if (vp) {
        if (
          typeof vp.scale === "number" &&
          typeof vp.originX === "number" &&
          typeof vp.originY === "number"
        ) {
          return {
            scaleX: vp.scale,
            scaleY: vp.scale,
            originX: vp.originX,
            originY: vp.originY,
          };
        }
        if (
          typeof vp.xMin === "number" &&
          typeof vp.xMax === "number" &&
          typeof vp.yMin === "number" &&
          typeof vp.yMax === "number"
        ) {
          const scaleX = W / (vp.xMax - vp.xMin);
          const scaleY = H / (vp.yMax - vp.yMin);
          return {
            scaleX,
            scaleY,
            originX: -vp.xMin * scaleX,
            originY: vp.yMax * scaleY,
          };
        }
      }
      return {
        scaleX: 40,
        scaleY: 40,
        originX: W / 2,
        originY: H / 2,
      };
    };

    let cleanBaseSnapshot = null;
    let isDrawingOverlay = false;

    const hookCalculusLab = () => {
      if (
        typeof window.runCalculusLab === "function" &&
        !window.runCalculusLab._taylorHooked
      ) {
        const origFn = window.runCalculusLab;
        const wrapped = function () {
          const res = origFn.apply(this, arguments);
          cleanBaseSnapshot = null;
          drawTaylorOverlay(true);
          return res;
        };
        wrapped._taylorHooked = true;
        window.__origRunCalculusLab = origFn;
        window.runCalculusLab = wrapped;
      }
    };

    hookCalculusLab();

    const mainX0 = document.getElementById("calc-x0");
    let lastMainX0 = mainX0 ? mainX0.value || "0" : "0";
    if (mainX0) {
      x0Input.value = lastMainX0;
      mainX0.addEventListener("input", () => {
        lastMainX0 = mainX0.value;
        x0Input.value = mainX0.value;
        if (!window.runCalculusLab?._taylorHooked) {
          triggerFullRedraw();
        }
      });
    }

    const calcFuncEl = document.getElementById("calc-func");
    if (calcFuncEl) {
      calcFuncEl.addEventListener("input", () => {
        if (!window.runCalculusLab?._taylorHooked) {
          triggerFullRedraw();
        }
      });
    }

    let animTimer = null;

    const stopAnimation = () => {
      if (animTimer) {
        clearInterval(animTimer);
        animTimer = null;
      }
      playBtn.textContent = "▶ Khảo sát n → ∞";
      playBtn.classList.remove("btn-danger");
      playBtn.classList.add("btn-primary");
    };

    const drawTaylorOverlay = (fromBaseRender = false) => {
      if (isDrawingOverlay) return;
      isDrawingOverlay = true;
      try {
        hookCalculusLab();
        const canvas = document.getElementById("calc-canvas");
        const funcInput = document.getElementById("calc-func");
        if (!canvas || !funcInput) return;

        const ctx = canvas.getContext("2d");
        const W = canvas.width;
        const H = canvas.height;

        if (
          fromBaseRender ||
          !cleanBaseSnapshot ||
          cleanBaseSnapshot.width !== W ||
          cleanBaseSnapshot.height !== H
        ) {
          cleanBaseSnapshot = ctx.getImageData(0, 0, W, H);
        } else {
          ctx.putImageData(cleanBaseSnapshot, 0, 0);
        }

        if (fromBaseRender && mainX0 && mainX0.value !== lastMainX0) {
          lastMainX0 = mainX0.value;
          x0Input.value = mainX0.value || "0";
        }

        const expr = funcInput.value.trim();
        const x0 = parseX0Value(x0Input.value);
        const x0Label = Number(x0.toFixed(4));
        const rawN = Math.max(1, Math.floor(parseFloat(nInput.value) || 1));
        const calcN = Math.min(rawN, 160);

        if (!enableChk.checked) {
          statsBox.innerHTML =
            "Đã tắt đường cong xấp xỉ Taylor $T_n(x)$. Tích vào ô phía trên để khảo sát.";
          renderMathIfAvailable(statsBox);
          return;
        }

        if (!expr) {
          statsBox.innerHTML =
            "Nhập biểu thức hàm số $f(x)$ ở khung trên để bắt đầu khai triển Taylor.";
          renderMathIfAvailable(statsBox);
          return;
        }

        if (
          !window.__mlTaylorCache ||
          window.__mlTaylorCache.expr !== expr ||
          window.__mlTaylorCache.x0 !== x0 ||
          window.__mlTaylorCache.maxN < calcN
        ) {
          const targetN = Math.max(calcN, 50);
          window.__mlTaylorCache = {
            expr,
            x0,
            maxN: targetN,
            coeffs: TaylorEngine.computeJet(expr, x0, targetN),
          };
        }
        const coeffs = window.__mlTaylorCache.coeffs.slice(0, calcN + 1);
        const vp = resolveViewport(canvas);
        const toPxX = (x) => vp.originX + x * vp.scaleX;
        const toPxY = (y) => vp.originY - y * vp.scaleY;

        ctx.save();
        ctx.strokeStyle = "#f59e0b";
        ctx.lineWidth = 2.5;
        ctx.setLineDash([7, 5]);
        ctx.beginPath();
        let started = false;
        for (let px = 0; px <= W; px += 2) {
          const x = (px - vp.originX) / vp.scaleX;
          const y = TaylorEngine.evalHorner(coeffs, x, x0);
          const py = toPxY(y);
          if (!Number.isFinite(py) || py < -H || py > H * 2) {
            started = false;
            continue;
          }
          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.stroke();
        ctx.setLineDash([]);

        const pxX0 = toPxX(x0);
        const pyY0 = toPxY(coeffs[0]);
        if (pxX0 >= 0 && pxX0 <= W && pyY0 >= 0 && pyY0 <= H) {
          ctx.fillStyle = "#f59e0b";
          ctx.beginPath();
          ctx.arc(pxX0, pyY0, 5, 0, Math.PI * 2);
          ctx.fill();
        }

        const badgeText = `--- T_${rawN}(x) tại x₀=${x0Label}`;
        ctx.font = "bold 12px 'JetBrains Mono', monospace";
        const badgeW = Math.max(205, ctx.measureText(badgeText).width + 22);
        ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
        ctx.fillRect(W - badgeW - 10, 10, badgeW, 30);
        ctx.strokeStyle = "#f59e0b";
        ctx.strokeRect(W - badgeW - 10, 10, badgeW, 30);
        ctx.fillStyle = "#fbbf24";
        ctx.fillText(badgeText, W - badgeW, 29);
        ctx.restore();

        // Tính sai số tại điểm lân cận (tách try/catch để không sập UI nếu gặp điểm kỳ dị)
        let errorHtml = "Không xác định tại biên kỳ dị";
        let xTestUsed = Number((x0 + 0.25).toFixed(4));
        const candidateOffsets = [0.25, -0.25, 0.05, -0.05];
        for (const delta of candidateOffsets) {
          const candidateX = Number((x0 + delta).toFixed(4));
          try {
            const exactVal = TaylorEngine.computeJet(expr, candidateX, 0)[0];
            if (Number.isFinite(exactVal)) {
              const approxVal = TaylorEngine.evalHorner(coeffs, candidateX, x0);
              const absErr = Math.abs(exactVal - approxVal);
              xTestUsed = candidateX;
              errorHtml = Number.isFinite(absErr)
                ? absErr.toExponential(3)
                : "Phân kỳ";
              break;
            }
          } catch (_) {}
        }

        const terms = [];
        for (let k = 0; k <= Math.min(calcN, 4); k++) {
          if (Math.abs(coeffs[k]) < 1e-12) continue;
          const cStr = Number(coeffs[k].toFixed(4));
          if (k === 0) terms.push(`${cStr}`);
          else if (Math.abs(x0) < 1e-12)
            terms.push(`${cStr}x${k > 1 ? "^" + k : ""}`);
          else terms.push(`${cStr}(x-${x0Label})${k > 1 ? "^" + k : ""}`);
        }
        const polyPreview =
          (terms.join(" + ").replace(/\+\s-/g, "- ") || "0") +
          (rawN > 4 ? " + ..." : "");

        statsBox.innerHTML = `
          <div><b>Bậc đang khảo sát:</b> <code>n = ${rawN}</code> ${
            rawN > 160 ? "(tính tới 160 số hạng chuẩn double)" : ""
          }</div>
          <div><b>Khai triển:</b> <code>T_${rawN}(x) ≈ ${polyPreview}</code></div>
          <div><b>Sai số tại x = ${xTestUsed}:</b> <code>|f(${xTestUsed}) - T_${rawN}(${xTestUsed})| = ${errorHtml}</code></div>
        `;
      } catch (err) {
        statsBox.innerHTML = `<span style="color:#dc2626;">⚠️ ${err.message}</span>`;
      } finally {
        isDrawingOverlay = false;
      }
    };

    const triggerFullRedraw = () => {
      hookCalculusLab();
      if (typeof window.__origRunCalculusLab === "function") {
        window.__origRunCalculusLab();
        cleanBaseSnapshot = null;
        drawTaylorOverlay(true);
      } else {
        drawTaylorOverlay(false);
      }
    };

    nInput.addEventListener("input", () => {
      const val = Math.max(1, Math.floor(parseFloat(nInput.value) || 1));
      if (val > parseInt(nSlider.max, 10)) {
        nSlider.max = String(Math.min(val, 200));
      }
      nSlider.value = String(Math.min(val, parseInt(nSlider.max, 10)));
      drawTaylorOverlay(false);
    });

    nSlider.addEventListener("input", () => {
      nInput.value = nSlider.value;
      drawTaylorOverlay(false);
    });

    x0Input.addEventListener("input", () => {
      if (mainX0) {
        const parsedX0 = parseX0Value(x0Input.value);
        if (Number.isFinite(parsedX0)) {
          const syncedVal = String(Number(parsedX0.toFixed(6)));
          mainX0.value = syncedVal;
          lastMainX0 = syncedVal;
        }
      }
      triggerFullRedraw();
    });

    enableChk.addEventListener("change", () => drawTaylorOverlay(false));

    playBtn.addEventListener("click", () => {
      if (animTimer) {
        stopAnimation();
        return;
      }
      playBtn.textContent = "⏸ Dừng khảo sát";
      playBtn.classList.remove("btn-primary");
      playBtn.classList.add("btn-danger");

      animTimer = setInterval(() => {
        let cur = Math.max(1, Math.floor(parseFloat(nInput.value) || 1));
        cur += 1;
        if (cur > 30) cur = 1;
        nInput.value = String(cur);
        if (cur > parseInt(nSlider.max, 10) && cur <= 200) {
          nSlider.max = String(cur);
        }
        nSlider.value = String(Math.min(cur, parseInt(nSlider.max, 10)));
        drawTaylorOverlay(false);
      }, 450);
    });

    slot.querySelectorAll(".taylor-preset-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        stopAnimation();
        const fn = btn.dataset.fn;
        const x0 = btn.dataset.x0;
        const n = btn.dataset.n;
        const calcFunc = document.getElementById("calc-func");
        if (calcFunc) calcFunc.value = fn;
        if (mainX0) mainX0.value = x0;
        x0Input.value = x0;
        nInput.value = n;
        nSlider.value = n;
        triggerFullRedraw();
      });
    });

    setTimeout(triggerFullRedraw, 150);
  }

  // -----------------------------------------------------------------------
  // 6. KHỞI CHẠY TOÀN BỘ HỆ THỐNG
  // -----------------------------------------------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    buildDrawerUI();
    attachInlineTutorButtons();
    setupInfiniteTaylorUI();

    const studyModal = document.getElementById("study-modal");
    if (studyModal) {
      let rafQueued = false;
      const observer = new MutationObserver(() => {
        if (rafQueued) return;
        rafQueued = true;
        requestAnimationFrame(() => {
          rafQueued = false;
          observer.disconnect();
          attachInlineTutorButtons(studyModal);
          observer.observe(studyModal, { childList: true, subtree: true });
        });
      });
      observer.observe(studyModal, { childList: true, subtree: true });
    }
  });
})();
