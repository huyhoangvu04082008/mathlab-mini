/* ==========================================================================
   FILE: js/data.js (PHIÊN BẢN V3 - HỌC CUỐN CHIẾU & BAREM CHẤM TỰ LUẬN)
   MÔ TẢ: 7 chuyên đề trọng tâm Giải tích 1 & Đại số tuyến tính (COMP1800).
          - Mỗi mục lý thuyết tích hợp ngay 1 bài Checkpoint thực hành tại chỗ.
          - Mỗi chương gồm 5 bài tập tự luận có lời giải chia bước theo Barem
            chấm điểm đại học + cảnh báo lỗi mất điểm trình bày.
   ========================================================================== */

const DEFAULT_TOPICS = [
  // =========================================================================
  // CHƯƠNG 1: GIẢI TÍCH 1 - GIỚI HẠN VÀ LIÊN TỤC CỦA HÀM SỐ
  // =========================================================================
  {
    id: "gt1-c1",
    code: "GT1 • CHƯƠNG 1",
    subject: "Giải tích 1",
    level: "Cơ bản",
    title: "Giới hạn và Liên tục của hàm số",
    summary:
      "Ánh xạ (đơn ánh, toàn ánh, song ánh), giới hạn dãy số & hàm số, vô cùng bé tương đương, phân loại điểm gián đoạn và định lý Bolzano-Cauchy.",
    previewFormula:
      "$$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1, \\quad 1 - \\cos x \\sim \\frac{x^2}{2}$$",
    bannerGradient: "linear-gradient(135deg, #1d4ed8 0%, #0284c7 100%)",
    theory: [
      {
        heading: "1. Ánh xạ, Song ánh & Ánh xạ ngược",
        content:
          "Cho ánh xạ $f: X \\to Y$. $f$ là <b>đơn ánh</b> nếu $\\forall x_1, x_2 \\in X: f(x_1)=f(x_2) \\Rightarrow x_1=x_2$; là <b>toàn ánh</b> nếu $\\forall y \\in Y, \\exists x \\in X: f(x)=y$; là <b>song ánh</b> nếu vừa đơn ánh vừa toàn ánh (khi đó tồn tại ánh xạ ngược $f^{-1}: Y \\to X$).",
        checkpoint: {
          question:
            "Cho ánh xạ $f: \\mathbb{R} \\setminus \\{-2\\} \\to \\mathbb{R} \\setminus \\{3\\}$ xác định bởi $f(x) = \\frac{3x - 1}{x + 2}$. Chứng minh $f$ là song ánh và tìm ánh xạ ngược $f^{-1}(y)$.",
          rubric: [
            {
              step: "Bước 1 • Chứng minh đơn ánh (0.5đ)",
              detail:
                "Giả sử $f(x_1) = f(x_2) \\iff \\frac{3x_1-1}{x_1+2} = \\frac{3x_2-1}{x_2+2} \\iff 3x_1x_2 + 6x_1 - x_2 - 2 = 3x_1x_2 + 6x_2 - x_1 - 2 \\iff 7x_1 = 7x_2 \\iff x_1 = x_2$. Vậy $f$ đơn ánh.",
            },
            {
              step: "Bước 2 • Chứng minh toàn ánh & Rút x theo y (0.5đ)",
              detail:
                "Với mọi $y \\neq 3$, xét $y = \\frac{3x-1}{x+2} \\iff x(y - 3) = -2y - 1 \\iff x = \\frac{2y + 1}{3 - y} \\neq -2$ (vì $2y+1 = -6+2y \\iff 1 = -6$ vô lý). Vậy $f$ song ánh và $f^{-1}(y) = \\frac{2y+1}{3-y}$.",
            },
          ],
          trap: "Quen tay trắc nghiệm chỉ giải tìm $x$ theo $y$ mà quên kiểm tra điều kiện $x$ tìm được phải thuộc tập nguồn $X = \\mathbb{R} \\setminus \\{-2\\}$ sẽ bị trừ 0.25đ.",
        },
      },
      {
        heading: "2. Giới hạn dãy số & Định lý Weierstrass",
        content:
          "Dãy $(x_n)$ hội tụ về $a$ theo định nghĩa $\\varepsilon - N$: $\\forall \\varepsilon > 0, \\exists N \\in \\mathbb{N}^*: n > N \\Rightarrow |x_n - a| < \\varepsilon$. <b>Định lý Weierstrass:</b> Dãy đơn điệu tăng và bị chặn trên (hoặc giảm và bị chặn dưới) thì hội tụ.",
        checkpoint: {
          question:
            "Tính giới hạn dãy số: $L = \\lim_{n \\to \\infty} \\frac{3 \\cdot 2^{n+1} - 5^n}{2^n + 3 \\cdot 5^{n-1}}$",
          rubric: [
            {
              step: "Bước 1 • Nhận diện cơ số trội (0.25đ)",
              detail:
                "Ta có $5^n$ tăng nhanh nhất khi $n \\to \\infty$. Biến đổi $3 \\cdot 2^{n+1} = 6 \\cdot 2^n$ và $3 \\cdot 5^{n-1} = \\frac{3}{5} \\cdot 5^n$.",
            },
            {
              step: "Bước 2 • Chia tử và mẫu cho 5ⁿ (0.5đ)",
              detail:
                "$L = \\lim_{n \\to \\infty} \\frac{6(2/5)^n - 1}{(2/5)^n + 3/5}$. Vì $|2/5| < 1$ nên $\\lim (2/5)^n = 0$.",
            },
            {
              step: "Bước 3 • Kết luận (0.25đ)",
              detail: "$L = \\frac{0 - 1}{0 + 3/5} = -\\frac{5}{3}$.",
            },
          ],
          trap: "Không được viết $\\frac{\\infty}{\\infty}$ trực tiếp trong bài làm tự luận; phải thực hiện phép chia cả tử và mẫu cho lũy thừa bậc cao nhất trước khi lấy giới hạn.",
        },
      },
      {
        heading: "3. Bảng Vô cùng bé (VCB) tương đương khi x → 0",
        content:
          "$$\\sin x \\sim x, \\quad \\tan x \\sim x, \\quad \\arcsin x \\sim x, \\quad \\arctan x \\sim x$$ $$e^x - 1 \\sim x, \\quad \\ln(1+x) \\sim x, \\quad 1 - \\cos x \\sim \\frac{x^2}{2}, \\quad (1+x)^\\alpha - 1 \\sim \\alpha x$$",
        checkpoint: {
          question:
            "Tính giới hạn: $I = \\lim_{x \\to 0} \\frac{\\ln(1 + 4x) \\cdot \\sin(2x)}{1 - \\cos(2x)}$",
          rubric: [
            {
              step: "Bước 1 • Thay thế VCB tương đương cho tích/thương (0.5đ)",
              detail:
                "Khi $x \\to 0$: $\\ln(1+4x) \\sim 4x$, $\\sin(2x) \\sim 2x$, và $1 - \\cos(2x) \\sim \\frac{(2x)^2}{2} = 2x^2$.",
            },
            {
              step: "Bước 2 • Rút gọn và tính giới hạn (0.5đ)",
              detail:
                "$I = \\lim_{x \\to 0} \\frac{4x \\cdot 2x}{2x^2} = \\lim_{x \\to 0} \\frac{8x^2}{2x^2} = 4$.",
            },
          ],
          trap: "Tuyệt đối KHÔNG thay VCB tương đương trong phép CỘNG hoặc TRỪ khi phần bậc nhất triệt tiêu nhau (ví dụ $\\tan x - \\sin x$ không được thay thành $x - x = 0$!).",
        },
      },
      {
        heading: "4. Hàm số liên tục & Định lý Bolzano-Cauchy",
        content:
          "$f$ liên tục tại $x_0 \\iff \\lim_{x \\to x_0^-} f(x) = \\lim_{x \\to x_0^+} f(x) = f(x_0)$. Nếu $f$ liên tục trên $[a,b]$ và $f(a)f(b) < 0$ thì tồn tại ít nhất một nghiệm $c \\in (a,b)$ sao cho $f(c) = 0$.",
        checkpoint: {
          question:
            "Chứng minh phương trình $x^5 + 3x - 2 = 0$ có ít nhất một nghiệm thực trong khoảng $(0, 1)$.",
          rubric: [
            {
              step: "Bước 1 • Xét hàm số và tính liên tục (0.5đ)",
              detail:
                "Xét $f(x) = x^5 + 3x - 2$. Vì $f(x)$ là hàm đa thức nên liên tục trên $\\mathbb{R}$, do đó liên tục trên đoạn $[0, 1]$.",
            },
            {
              step: "Bước 2 • Kiểm tra dấu tại hai đầu mút (0.5đ)",
              detail:
                "Ta có $f(0) = -2 < 0$ và $f(1) = 1 + 3 - 2 = 2 > 0 \\Rightarrow f(0) \\cdot f(1) = -4 < 0$. Theo định lý giá trị trung gian Bolzano-Cauchy, tồn tại $c \\in (0, 1)$ sao cho $f(c) = 0$.",
            },
          ],
          trap: "Bắt buộc phải ghi câu 'hàm số liên tục trên đoạn $[0, 1]$' trước khi áp dụng định lý, nếu thiếu câu này sẽ mất nửa số điểm câu chứng minh.",
        },
      },
    ],
    exercises: [
      {
        level: "Vừa",
        question:
          "Tính giới hạn dãy số: $B = \\lim_{n \\to \\infty} (\\sqrt{n^2 + 6n + 1} - n)$",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.25đ)</span> Nhân và chia cho biểu thức liên hợp $\\sqrt{n^2+6n+1} + n$:
            $$B = \\lim_{n \\to \\infty} \\frac{(n^2 + 6n + 1) - n^2}{\\sqrt{n^2 + 6n + 1} + n} = \\lim_{n \\to \\infty} \\frac{6n + 1}{\\sqrt{n^2 + 6n + 1} + n}$$</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Chia cả tử và mẫu cho $n > 0$ (với $\\sqrt{n^2} = n$ khi $n \\to +\\infty$):
            $$B = \\lim_{n \\to \\infty} \\frac{6 + \\frac{1}{n}}{\\sqrt{1 + \\frac{6}{n} + \\frac{1}{n^2}} + 1}$$</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 3 (0.25đ)</span> Vì $\\lim \\frac{1}{n} = 0, \\lim \\frac{1}{n^2} = 0$ nên $B = \\frac{6}{\\sqrt{1} + 1} = 3$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Nhiều bạn tách $\\lim \\sqrt{n^2+6n+1} - \\lim n = \\infty - \\infty$ rồi viết bằng $0$ là sai hoàn toàn bản chất dạng vô định!</div>
          </div>`,
      },
      {
        level: "Vừa",
        question:
          "Dùng vô cùng bé tương đương tính: $L = \\lim_{x \\to 0} \\frac{\\ln(1+3x) + \\sin^2(2x)}{e^{5x} - 1 + \\arctan x}$",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.5đ)</span> Phân tích bậc của từng VCB khi $x \\to 0$:
            $\\ln(1+3x) \\sim 3x$ (bậc 1), còn $\\sin^2(2x) \\sim 4x^2 = o(x)$ (VCB bậc cao hơn nên ngắt bỏ được trong tổng ở tử). Ở mẫu: $e^{5x} - 1 \\sim 5x$ và $\\arctan x \\sim x$ (cùng dấu nên cộng lại được thành $6x \\neq 0$).</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Thay vào giới hạn:
            $$L = \\lim_{x \\to 0} \\frac{3x}{5x + x} = \\lim_{x \\to 0} \\frac{3x}{6x} = \\frac{1}{2}$$</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Phải giải thích rõ lý do bỏ $\\sin^2(2x)$ là do nó là VCB bậc cao hơn $x$ (ký hiệu $o(x)$), không được tự ý gạch bỏ không giải thích.</div>
          </div>`,
      },
      {
        level: "Vừa",
        question:
          "Tính giới hạn dạng $1^\\infty$: $K = \\lim_{x \\to 0} (1 + \\sin 3x)^{\\frac{2}{x}}$",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.25đ)</span> Nhận dạng vô định $1^\\infty$ khi $x \\to 0$. Biến đổi về cơ số $e$:
            $$K = \\lim_{x \\to 0} \\left[(1 + \\sin 3x)^{\\frac{1}{\\sin 3x}}\\right]^{\\frac{2\\sin 3x}{x}}$$</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Tính giới hạn phần mũ: $\\lim_{x \\to 0} \\frac{2\\sin 3x}{x} = \\lim_{x \\to 0} \\frac{2 \\cdot 3x}{x} = 6$.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 3 (0.25đ)</span> Áp dụng $\\lim_{u \\to 0} (1+u)^{1/u} = e$, suy ra $K = e^6$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Thiếu bước biến đổi về giới hạn cơ bản $(1+u)^{1/u}$ hoặc thiếu $e^{\\lim(u \\cdot v)}$ mà ghi thẳng đáp án $e^6$ chỉ được 0.25đ.</div>
          </div>`,
      },
      {
        level: "Khó",
        question:
          "Tìm $a, b \\in \\mathbb{R}$ để hàm số $f(x) = \\begin{cases} \\frac{\\sin ax}{x}, & x < 0 \\\\ b, & x = 0 \\\\ \\frac{\\sqrt{1+4x}-1}{x}, & x > 0 \\end{cases}$ liên tục tại $x = 0$.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.25đ)</span> Tính giá trị hàm tại điểm xét: $f(0) = b$.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Tính hai giới hạn một bên khi $x \\to 0$:
            • $\\lim_{x \\to 0^-} f(x) = \\lim_{x \\to 0^-} \\frac{\\sin ax}{x} = a$.
            • $\\lim_{x \\to 0^+} f(x) = \\lim_{x \\to 0^+} \\frac{(1+4x)-1}{x(\\sqrt{1+4x}+1)} = \\lim_{x \\to 0^+} \\frac{4}{\\sqrt{1+4x}+1} = 2$.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 3 (0.25đ)</span> Hàm số liên tục tại $x=0 \\iff \\lim_{x \\to 0^-} f(x) = \\lim_{x \\to 0^+} f(x) = f(0) \\iff a = b = 2$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Bắt buộc ghi rõ phương trình điều kiện liên tục $\\lim_{x \\to 0^-} f(x) = \\lim_{x \\to 0^+} f(x) = f(0)$ trước khi suy ra $a = b = 2$.</div>
          </div>`,
      },
      {
        level: "Khó",
        question:
          "Xét tính liên tục và phân loại điểm gián đoạn (nếu có) của hàm số $h(x) = \\frac{x^2 - 4}{|x - 2|}$ tại $x_0 = 2$.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.25đ)</span> Tập xác định $D = \\mathbb{R} \\setminus \\{2\\}$. Tại $x_0 = 2$ hàm không xác định nên hàm gián đoạn tại $x_0 = 2$.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Tính giới hạn trái và phải tại $x_0 = 2$:
            • $\\lim_{x \\to 2^+} h(x) = \\lim_{x \\to 2^+} \\frac{(x-2)(x+2)}{x-2} = 4$.
            • $\\lim_{x \\to 2^-} h(x) = \\lim_{x \\to 2^-} \\frac{(x-2)(x+2)}{-(x-2)} = -4$.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 3 (0.25đ)</span> Hai giới hạn một bên hữu hạn nhưng khác nhau ($4 \\neq -4$) nên $x_0 = 2$ là <b>điểm gián đoạn loại 1 (bước nhảy)</b> với bước nhảy $\\sigma = 4 - (-4) = 8$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Quên xét dấu giá trị tuyệt đối $|x-2| = -(x-2)$ khi $x \\to 2^-$ dẫn đến tính sai giới hạn trái.</div>
          </div>`,
      },
    ],
    quiz: [
      {
        question:
          "Khi $x \\to 0$, vô cùng bé nào sau đây tương đương với $1 - \\cos(2x)$?",
        options: ["$2x^2$", "$x^2$", "$4x^2$", "$\\frac{x^2}{2}$"],
        answer: 0,
        explanation:
          "Áp dụng $1 - \\cos u \\sim \\frac{u^2}{2}$ với $u = 2x$, ta được $\\frac{(2x)^2}{2} = 2x^2$.",
      },
      {
        question:
          "Cho hàm số $g(x) = \\frac{|x|}{x}$. Điểm $x_0 = 0$ là điểm gián đoạn loại mấy?",
        options: [
          "Gián đoạn loại 1 (bước nhảy)",
          "Gián đoạn loại 1 (bỏ được)",
          "Gián đoạn loại 2",
          "Hàm liên tục tại $x_0 = 0$",
        ],
        answer: 0,
        explanation:
          "Vì $\\lim_{x \\to 0^-} g(x) = -1$ và $\\lim_{x \\to 0^+} g(x) = 1$ đều hữu hạn nhưng khác nhau nên là điểm gián đoạn bước nhảy (loại 1).",
      },
      {
        question:
          "Theo định lý Bolzano-Cauchy, điều kiện đủ để phương trình $f(x)=0$ có nghiệm trong $(a,b)$ là gì?",
        options: [
          "$f$ liên tục trên $[a,b]$ và $f(a)f(b) < 0$",
          "$f$ xác định trên $[a,b]$ và $f(a)f(b) > 0$",
          "$f$ đơn điệu trên $(a,b)$",
          "$f'(a)f'(b) < 0$",
        ],
        answer: 0,
        explanation:
          "Đồ thị hàm liên tục đi từ giá trị âm sang dương (hoặc ngược lại) bắt buộc cắt trục hoành ít nhất 1 lần.",
      },
    ],
  },

  // =========================================================================
  // CHƯƠNG 2: GIẢI TÍCH 1 - ĐẠO HÀM VÀ VI PHÂN HÀM MỘT BIẾN
  // =========================================================================
  {
    id: "gt1-c2",
    code: "GT1 • CHƯƠNG 2",
    subject: "Giải tích 1",
    level: "Trung bình",
    title: "Đạo hàm và Vi phân hàm một biến",
    summary:
      "Đạo hàm hàm hợp, tham số, hàm ẩn; công thức Leibniz cấp cao; định lý Rolle-Lagrange-Cauchy; quy tắc L'Hospital và khai triển Taylor-Maclaurin.",
    previewFormula:
      "$$f(x) = \\sum_{k=0}^{n} \\frac{f^{(k)}(x_0)}{k!}(x-x_0)^k + R_n(x)$$",
    bannerGradient: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
    theory: [
      {
        heading: "1. Đạo hàm hàm hợp, hàm tham số & hàm ẩn",
        content:
          "Hàm hợp: $[f(u(x))]' = f'(u)u'(x)$. Hàm tham số $\\begin{cases} x=x(t) \\\\ y=y(t) \\end{cases} \\Rightarrow y'_x = \\frac{y'(t)}{x'(t)}$. Hàm ẩn $F(x,y)=0 \\Rightarrow y' = -\\frac{F'_x}{F'_y}$.",
        checkpoint: {
          question:
            "Cho hàm số ẩn $y = y(x)$ xác định bởi phương trình $x^3 + y^3 - 3xy = 0$. Tính đạo hàm $y'(x)$.",
          rubric: [
            {
              step: "Bước 1 • Lấy đạo hàm hai vế theo biến x (coi y là hàm của x) (0.5đ)",
              detail: "$3x^2 + 3y^2 \\cdot y' - 3(y + x \\cdot y') = 0$.",
            },
            {
              step: "Bước 2 • Nhóm các số hạng chứa y' và rút gọn (0.5đ)",
              detail:
                "$(3y^2 - 3x)y' = 3y - 3x^2 \\iff y' = \\frac{y - x^2}{y^2 - x}$ (với $y^2 \\neq x$).",
            },
          ],
          trap: "Lỗi kinh điển: Đạo hàm $y^3$ ra $3y^2$ mà quên nhân thêm $y'$ theo quy tắc hàm hợp!",
        },
      },
      {
        heading: "2. Công thức Leibniz & Ứng dụng Vi phân",
        content:
          "Đạo hàm cấp $n$ của tích: $(fg)^{(n)} = \\sum_{k=0}^n \\binom{n}{k} f^{(k)} g^{(n-k)}$. Vi phân cấp một $dy = f'(x)dx$ dùng để tính gần đúng: $f(x_0 + \\Delta x) \\approx f(x_0) + f'(x_0)\\Delta x$.",
        checkpoint: {
          question:
            "Áp dụng công thức Leibniz tính đạo hàm cấp $10$ của hàm số $y = (x^2 + 1)e^{2x}$.",
          rubric: [
            {
              step: "Bước 1 • Đặt u = x² + 1 và v = e²ˣ (0.5đ)",
              detail:
                "Ta có $u' = 2x, u'' = 2, u^{(k)} = 0$ với mọi $k \\ge 3$. Còn $v^{(k)} = 2^k e^{2x}$.",
            },
            {
              step: "Bước 2 • Khai triển Leibniz tới k = 2 (0.5đ)",
              detail:
                "$y^{(10)} = \\binom{10}{0}(x^2+1)2^{10}e^{2x} + \\binom{10}{1}(2x)2^9e^{2x} + \\binom{10}{2}(2)2^8e^{2x} = 2^8 e^{2x}(4x^2 + 40x + 94)$.",
            },
          ],
          trap: "Luôn chọn đa thức làm $u$ để đạo hàm từ cấp $\\text{deg}(u)+1$ trở đi triệt tiêu bằng $0$.",
        },
      },
      {
        heading: "3. Định lý Lagrange & Quy tắc L'Hospital",
        content:
          "<b>Lagrange:</b> $\\exists c \\in (a,b): f'(c) = \\frac{f(b)-f(a)}{b-a}$. <b>Quy tắc L'Hospital:</b> Với dạng vô định $\\frac{0}{0}$ hoặc $\\frac{\\infty}{\\infty}$, nếu $\\lim \\frac{f'(x)}{g'(x)} = L$ thì $\\lim \\frac{f(x)}{g(x)} = L$.",
        checkpoint: {
          question:
            "Tính giới hạn: $M = \\lim_{x \\to 0} \\frac{e^x - 1 - x}{x^2}$",
          rubric: [
            {
              step: "Bước 1 • Kiểm tra dạng vô định 0/0 và áp dụng L'Hospital lần 1 (0.5đ)",
              detail:
                "Khi $x \\to 0$, tử và mẫu đều tiến về $0$. Áp dụng L'Hospital: $M = \\lim_{x \\to 0} \\frac{e^x - 1}{2x}$.",
            },
            {
              step: "Bước 2 • Áp dụng L'Hospital lần 2 và kết luận (0.5đ)",
              detail:
                "Tiếp tục có dạng $\\frac{0}{0}$: $M = \\lim_{x \\to 0} \\frac{e^x}{2} = \\frac{1}{2}$.",
            },
          ],
          trap: "Cấm dùng quy tắc đạo hàm thương $(f/g)'$ khi tính L'Hospital! Phải đạo hàm riêng tử và riêng mẫu.",
        },
      },
      {
        heading: "4. Khai triển Maclaurin cơ bản (x → 0)",
        content:
          "$$e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + o(x^3), \\quad \\sin x = x - \\frac{x^3}{3!} + o(x^3), \\quad \\ln(1+x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} + o(x^3)$$",
        checkpoint: {
          question:
            "Viết khai triển Maclaurin của hàm số $f(x) = e^{2x}$ đến số hạng chứa $x^3$ với phần dư Peano.",
          rubric: [
            {
              step: "Bước 1 • Thay u = 2x vào khai triển chuẩn của eᵘ (0.5đ)",
              detail:
                "$e^u = 1 + u + \\frac{u^2}{2!} + \\frac{u^3}{3!} + o(u^3)$.",
            },
            {
              step: "Bước 2 • Rút gọn hệ số (0.5đ)",
              detail: "$e^{2x} = 1 + 2x + 2x^2 + \\frac{4}{3}x^3 + o(x^3)$.",
            },
          ],
          trap: "Quên ghi phần dư Peano $+ o(x^3)$ ở cuối khai triển sẽ bị trừ 0.25đ vì dấu '=' không còn chính xác.",
        },
      },
    ],
    exercises: [
      {
        level: "Vừa",
        question: "Dùng vi phân cấp 1 tính gần đúng giá trị $\\sqrt[3]{28}$.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.25đ)</span> Chọn hàm số $f(x) = \\sqrt[3]{x} = x^{1/3}$, điểm gốc $x_0 = 27$ và số gia $\\Delta x = 1$.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Tính đạo hàm: $f'(x) = \\frac{1}{3\\sqrt[3]{x^2}} \\Rightarrow f'(27) = \\frac{1}{3 \\cdot 9} = \\frac{1}{27}$.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 3 (0.25đ)</span> Áp dụng công thức $f(x_0+\\Delta x) \\approx f(x_0) + f'(x_0)\\Delta x$:
            $$\\sqrt[3]{28} \\approx \\sqrt[3]{27} + \\frac{1}{27} \\cdot 1 = 3 + \\frac{1}{27} \\approx 3.0370$$</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Bắt buộc ghi rõ biểu thức hàm $f(x)$, giá trị $x_0$ và $\\Delta x$ trước khi bấm máy tính ra số thập phân.</div>
          </div>`,
      },
      {
        level: "Vừa",
        question:
          "Cho đường cong tham số $\\begin{cases} x = t - \\sin t \\\\ y = 1 - \\cos t \\end{cases}$ ($t \\in (0, 2\\pi)$). Tính $y'_x$ và $y''_{xx}$ tại $t = \\frac{\\pi}{2}$.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.5đ)</span> Tính đạo hàm cấp 1: $x'(t) = 1 - \\cos t$, $y'(t) = \\sin t \\Rightarrow y'_x = \\frac{\\sin t}{1 - \\cos t}$. Tại $t = \\frac{\\pi}{2}$, $y'_x = \\frac{1}{1 - 0} = 1$.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Tính đạo hàm cấp 2: $y''_{xx} = \\frac{(y'_x)'_t}{x'(t)} = \\frac{\\frac{\\cos t(1-\\cos t) - \\sin^2 t}{(1-\\cos t)^2}}{1 - \\cos t} = \\frac{\\cos t - 1}{(1-\\cos t)^3} = \\frac{-1}{(1-\\cos t)^2}$. Tại $t = \\frac{\\pi}{2}$, $y''_{xx} = -1$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Rất nhiều bạn nhầm $y''_{xx} = \\frac{y''(t)}{x''(t)}$ — công thức này SAI hoàn toàn! Phải chia $(y'_x)'_t$ cho $x'(t)$.</div>
          </div>`,
      },
      {
        level: "Vừa",
        question:
          "Áp dụng định lý Lagrange chứng minh bất đẳng thức: $\\sin x < x$ với mọi $x > 0$.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.25đ)</span> Xét hàm số $f(t) = \\sin t$ trên đoạn $[0, x]$ (với $x > 0$). Hàm liên tục trên $[0, x]$ và khả vi trên $(0, x)$.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Theo định lý Lagrange, tồn tại $c \\in (0, x)$ sao cho:
            $$\\frac{\\sin x - \\sin 0}{x - 0} = f'(c) = \\cos c$$</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 3 (0.25đ)</span> Vì $c > 0$ nên $\\cos c < 1$ (do $\\cos c = 1 \\iff c = k2\\pi$, và nếu $c \\ge 2\\pi$ thì hiển nhiên $\\sin x \\le 1 < 2\\pi \\le x$). Suy ra $\\frac{\\sin x}{x} < 1 \\iff \\sin x < x$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Khi dùng Lagrange bắt buộc phải chỉ rõ khoảng $(0, x)$ chứa điểm trung gian $c$.</div>
          </div>`,
      },
      {
        level: "Khó",
        question:
          "Dùng khai triển Maclaurin tính giới hạn: $L = \\lim_{x \\to 0} \\frac{e^x - e^{-x} - 2x}{x - \\sin x}$",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.5đ)</span> Khai triển Maclaurin tử và mẫu đến bậc 3 (bậc thấp nhất không triệt tiêu):
            • $e^x = 1 + x + \\frac{x^2}{2} + \\frac{x^3}{6} + o(x^3)$
            • $e^{-x} = 1 - x + \\frac{x^2}{2} - \\frac{x^3}{6} + o(x^3)$
            $\\Rightarrow e^x - e^{-x} - 2x = \\frac{x^3}{3} + o(x^3)$.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.25đ)</span> Ở mẫu: $x - \\sin x = x - \\left(x - \\frac{x^3}{6} + o(x^3)\\right) = \\frac{x^3}{6} + o(x^3)$.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 3 (0.25đ)</span> Chia tử và mẫu cho $x^3$:
            $$L = \\lim_{x \\to 0} \\frac{\\frac{1}{3} + \\frac{o(x^3)}{x^3}}{\\frac{1}{6} + \\frac{o(x^3)}{x^3}} = \\frac{1/3}{1/6} = 2$$</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Nếu chỉ khai triển đến bậc 2 thì tử và mẫu đều ra $0 + o(x^2)$ không tính được giới hạn. Phải khai triển tới bậc 3!</div>
          </div>`,
      },
      {
        level: "Khó",
        question:
          "Tính giới hạn dạng vô định $0^0$: $A = \\lim_{x \\to 0^+} x^{\\sin x}$",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.25đ)</span> Logarit hóa: đặt $y = x^{\\sin x} \\Rightarrow \\ln y = \\sin x \\cdot \\ln x = \\frac{\\ln x}{\\frac{1}{\\sin x}}$ (dạng $\\frac{-\\infty}{+\\infty}$ khi $x \\to 0^+$).</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Áp dụng quy tắc L'Hospital:
            $$\\lim_{x \\to 0^+} \\ln y = \\lim_{x \\to 0^+} \\frac{1/x}{-\\cos x / \\sin^2 x} = \\lim_{x \\to 0^+} \\left(-\\frac{\\sin x}{x} \\cdot \\frac{\\sin x}{\\cos x}\\right) = -1 \\cdot 0 = 0$$</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 3 (0.25đ)</span> Suy ra $A = \\lim_{x \\to 0^+} e^{\\ln y} = e^0 = 1$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Quên chuyển ngược từ $\\lim \\ln y = 0$ sang $A = e^0 = 1$ ở bước cuối cùng là lỗi cực kỳ phổ biến!</div>
          </div>`,
      },
    ],
    quiz: [
      {
        question:
          "Cho đường cong tham số $x = t^2, y = t^3$ ($t \\neq 0$). Đạo hàm $\\frac{dy}{dx}$ bằng:",
        options: [
          "$\\frac{3t}{2}$",
          "$\\frac{2}{3t}$",
          "$3t^2$",
          "$\\frac{3t^2}{2}$",
        ],
        answer: 0,
        explanation:
          "$\\frac{dy}{dx} = \\frac{y'(t)}{x'(t)} = \\frac{3t^2}{2t} = \\frac{3t}{2}$.",
      },
      {
        question:
          "Đa thức Maclaurin bậc 2 của hàm số $f(x) = e^x$ tại $x_0 = 0$ là:",
        options: [
          "$1 + x + \\frac{x^2}{2}$",
          "$1 + x + x^2$",
          "$1 - x + \\frac{x^2}{2}$",
          "$x + \\frac{x^2}{2}$",
        ],
        answer: 0,
        explanation:
          "Vì $f^{(k)}(0) = 1$ với mọi $k$, nên $P_2(x) = 1 + x + \\frac{x^2}{2!}$.",
      },
      {
        question:
          "Giới hạn $\\lim_{x \\to 0^+} x^x$ có giá trị bằng bao nhiêu?",
        options: ["$1$", "$0$", "$e$", "$+\\infty$"],
        answer: 0,
        explanation:
          "Viết $x^x = e^{x \\ln x}$. Dùng L'Hospital: $\\lim_{x \\to 0^+} x \\ln x = \\lim_{x \\to 0^+} \\frac{\\ln x}{1/x} = \\lim_{x \\to 0^+} (-x) = 0 \\Rightarrow e^0 = 1$.",
      },
    ],
  },

  // =========================================================================
  // CHƯƠNG 3: GIẢI TÍCH 1 - PHÉP TÍNH TÍCH PHÂN HÀM MỘT BIẾN
  // =========================================================================
  {
    id: "gt1-c3",
    code: "GT1 • CHƯƠNG 3",
    subject: "Giải tích 1",
    level: "Trung bình",
    title: "Phép tính tích phân hàm một biến",
    summary:
      "Đổi biến lượng giác, tích phân từng phần (LIATE), tích phân hàm hữu tỷ, công thức Newton-Leibniz, ứng dụng hình học và tích phân suy rộng.",
    previewFormula:
      "$$\\int_a^b f(x)\\,dx = F(b) - F(a), \\quad \\int u\\,dv = uv - \\int v\\,du$$",
    bannerGradient: "linear-gradient(135deg, #0284c7 0%, #0d9488 100%)",
    theory: [
      {
        heading: "1. Đổi biến số & Đổi biến lượng giác khử căn",
        content:
          "• Dạng $\\sqrt{a^2 - x^2}$: đặt $x = a\\sin t$ ($t \\in [-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$).<br>• Dạng $\\sqrt{a^2 + x^2}$: đặt $x = a\\tan t$ ($t \\in (-\\frac{\\pi}{2}, \\frac{\\pi}{2})$).<br>• Dạng $\\sqrt{x^2 - a^2}$: đặt $x = \\frac{a}{\\cos t}$.",
        checkpoint: {
          question:
            "Tính tích phân: $I = \\int_0^1 \\frac{dx}{x^2 + 1}$ bằng phép đổi biến lượng giác.",
          rubric: [
            {
              step: "Bước 1 • Đặt ẩn phụ và đổi cận (0.5đ)",
              detail:
                "Đặt $x = \\tan t \\Rightarrow dx = \\frac{dt}{\\cos^2 t} = (1 + \\tan^2 t)dt$. Đổi cận: $x=0 \\Rightarrow t=0$; $x=1 \\Rightarrow t=\\frac{\\pi}{4}$.",
            },
            {
              step: "Bước 2 • Thay vào tích phân và tính kết quả (0.5đ)",
              detail:
                "$I = \\int_0^{\\pi/4} \\frac{(1+\\tan^2 t)dt}{\\tan^2 t + 1} = \\int_0^{\\pi/4} dt = \\frac{\\pi}{4}$.",
            },
          ],
          trap: "Khi đổi biến trong tích phân xác định mà quên đổi cận (hoặc đổi cận rồi vẫn thay ngược lại biến $x$) sẽ bị trừ 0.25đ.",
        },
      },
      {
        heading: "2. Quy tắc LIATE trong Tích phân từng phần",
        content:
          "Công thức $\\int u\\,dv = uv - \\int v\\,du$. Thứ tự ưu tiên chọn $u$: <b>L</b>ogarit ($\\ln x$) $\\to$ <b>I</b>nverse trig ($\\arctan x, \\arcsin x$) $\\to$ <b>A</b>lgebraic (Đa thức $x^n$) $\\to$ <b>T</b>rig ($\\sin x, \\cos x$) $\\to$ <b>E</b>xponential ($e^{ax}$).",
        checkpoint: {
          question: "Tính nguyên hàm: $J = \\int \\ln x\\,dx$",
          rubric: [
            {
              step: "Bước 1 • Đặt u và dv theo LIATE (0.5đ)",
              detail:
                "Đặt $u = \\ln x \\Rightarrow du = \\frac{1}{x}dx$; $dv = dx \\Rightarrow v = x$.",
            },
            {
              step: "Bước 2 • Áp dụng công thức từng phần (0.5đ)",
              detail:
                "$J = x\\ln x - \\int x \\cdot \\frac{1}{x}dx = x\\ln x - x + C$.",
            },
          ],
          trap: "Tính nguyên hàm (tích phân bất định) mà quên cộng hằng số $+ C$ cuối bài là mất ngay 0.25đ!",
        },
      },
      {
        heading: "3. Ứng dụng Tích phân xác định",
        content:
          "Diện tích hình phẳng: $S = \\int_a^b |f(x)-g(x)|dx$. Thể tích khối tròn xoay quanh $Ox$: $V_x = \\pi \\int_a^b [f(x)]^2 dx$; quanh $Oy$ (phương pháp vỏ trụ): $V_y = 2\\pi \\int_a^b x f(x) dx$.",
        checkpoint: {
          question:
            "Tính thể tích khối tròn xoay khi quay miền phẳng giới hạn bởi $y = \\sqrt{x}$, $y = 0$, $x = 4$ quanh trục $Ox$.",
          rubric: [
            {
              step: "Bước 1 • Lập công thức tích phân thể tích (0.5đ)",
              detail:
                "$V_x = \\pi \\int_0^4 (\\sqrt{x})^2\\,dx = \\pi \\int_0^4 x\\,dx$.",
            },
            {
              step: "Bước 2 • Tính giá trị (0.5đ)",
              detail: "$V_x = \\pi \\left[\\frac{x^2}{2}\\right]_0^4 = 8\\pi$.",
            },
          ],
          trap: "Quên hệ số $\\pi$ phía trước tích phân thể tích tròn xoay!",
        },
      },
      {
        heading: "4. Tích phân suy rộng & Tiêu chuẩn p",
        content:
          "• Loại 1 (cận vô cực): $\\int_a^{+\\infty} \\frac{dx}{x^p}$ hội tụ $\\iff p > 1$.<br>• Loại 2 (hàm không bị chặn tại $a$): $\\int_a^b \\frac{dx}{(x-a)^p}$ hội tụ $\\iff p < 1$.",
        checkpoint: {
          question:
            "Tính tích phân suy rộng: $K = \\int_1^{+\\infty} \\frac{dx}{x^2}$",
          rubric: [
            {
              step: "Bước 1 • Chuyển về giới hạn theo định nghĩa (0.5đ)",
              detail:
                "$K = \\lim_{b \\to +\\infty} \\int_1^b x^{-2}\\,dx = \\lim_{b \\to +\\infty} \\left[-\\frac{1}{x}\\right]_1^b$.",
            },
            {
              step: "Bước 2 • Tính giới hạn và kết luận hội tụ (0.5đ)",
              detail:
                "$K = \\lim_{b \\to +\\infty} \\left(1 - \\frac{1}{b}\\right) = 1$. Vậy tích phân hội tụ về $1$.",
            },
          ],
          trap: "Không được thay trực tiếp cận $+\\infty$ vào ngoặc vuông $\\left[-\\frac{1}{x}\\right]_1^{+\\infty}$ mà phải viết ký hiệu $\\lim_{b \\to +\\infty}$.",
        },
      },
    ],
    exercises: [
      {
        level: "Vừa",
        question: "Tính tích phân từng phần: $I = \\int_0^1 x e^{2x}\\,dx$",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.25đ)</span> Chọn $u = x \\Rightarrow du = dx$; $dv = e^{2x}dx \\Rightarrow v = \\frac{1}{2}e^{2x}$ (theo thứ tự A trước E trong LIATE).</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Áp dụng công thức tích phân từng phần xác định:
            $$I = \\left[\\frac{x}{2}e^{2x}\\right]_0^1 - \\frac{1}{2}\\int_0^1 e^{2x}\\,dx = \\frac{e^2}{2} - \\left[\\frac{1}{4}e^{2x}\\right]_0^1$$</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 3 (0.25đ)</span> Thay cận: $I = \\frac{e^2}{2} - \\left(\\frac{e^2}{4} - \\frac{1}{4}\\right) = \\frac{e^2 + 1}{4}$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Hay quên đổi dấu trừ trước biểu thức thay cận dưới $-\\left(\\frac{e^2}{4} - \\frac{1}{4}\\right)$.</div>
          </div>`,
      },
      {
        level: "Vừa",
        question:
          "Tính tích phân hàm hữu tỷ: $J = \\int \\frac{3x + 5}{x^2 - 1}\\,dx$",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.5đ)</span> Phân tích thành tổng các phân thức đơn giản:
            $$\\frac{3x+5}{(x-1)(x+1)} = \\frac{A}{x-1} + \\frac{B}{x+1}$$
            Đồng nhất hệ số: $A(x+1) + B(x-1) = 3x+5$. Cho $x=1 \\Rightarrow A = 4$; cho $x=-1 \\Rightarrow B = -1$.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Lấy nguyên hàm từng thành phần:
            $$J = \\int \\left(\\frac{4}{x-1} - \\frac{1}{x+1}\\right)dx = 4\\ln|x-1| - \\ln|x+1| + C$$</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Thiếu dấu giá trị tuyệt đối $|x-1|$ trong $\\ln|x-1|$ và thiếu $+ C$.</div>
          </div>`,
      },
      {
        level: "Vừa",
        question:
          "Tính diện tích hình phẳng giới hạn bởi hai đường cong $y = 2x$ và $y = x^2$.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.25đ)</span> Tìm hoành độ giao điểm: $x^2 = 2x \\iff x(x-2) = 0 \\iff x = 0$ hoặc $x = 2$.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Trên đoạn $[0, 2]$, ta có $2x \\ge x^2$ nên phá dấu trị tuyệt đối:
            $$S = \\int_0^2 |2x - x^2|\\,dx = \\int_0^2 (2x - x^2)\\,dx$$</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 3 (0.25đ)</span> Tính tích phân: $S = \\left[x^2 - \\frac{x^3}{3}\\right]_0^2 = 4 - \\frac{8}{3} = \\frac{4}{3}$ (đvdt).</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Phải viết công thức có dấu giá trị tuyệt đối $|f(x)-g(x)|$ rồi mới xét dấu để bỏ trị tuyệt đối.</div>
          </div>`,
      },
      {
        level: "Khó",
        question:
          "Khảo sát sự hội tụ của tích phân suy rộng: $I = \\int_0^{+\\infty} \\frac{dx}{\\sqrt{x}(1+x)}$",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.25đ)</span> Tích phân có cả điểm bất thường $x=0$ và cận $+\\infty$. Tách tại $x=1$: $I = I_1 + I_2 = \\int_0^1 \\frac{dx}{\\sqrt{x}(1+x)} + \\int_1^{+\\infty} \\frac{dx}{\\sqrt{x}(1+x)}$.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Xét $I_1$ (loại 2 tại $0$): khi $x \\to 0^+$, $\\frac{1}{\\sqrt{x}(1+x)} \\sim \\frac{1}{x^{1/2}}$. Vì $p = \\frac{1}{2} < 1$ nên $I_1$ hội tụ.
            Xét $I_2$ (loại 1 tại $+\\infty$): khi $x \\to +\\infty$, $\\frac{1}{\\sqrt{x}(1+x)} \\sim \\frac{1}{x^{3/2}}$. Vì $p = \\frac{3}{2} > 1$ nên $I_2$ hội tụ.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 3 (0.25đ)</span> Cả $I_1$ và $I_2$ đều hội tụ nên tích phân $I$ <b>hội tụ</b>.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Quên tách đôi tích phân tại $x=1$ mà áp dụng thẳng 1 tiêu chuẩn cho cả $(0, +\\infty)$ là sai điều kiện định lý!</div>
          </div>`,
      },
      {
        level: "Khó",
        question:
          "Tính tích phân đổi biến lượng giác: $M = \\int_0^1 \\sqrt{1 - x^2}\\,dx$",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.25đ)</span> Đặt $x = \\sin t$ với $t \\in [0, \\frac{\\pi}{2}] \\Rightarrow dx = \\cos t\\,dt$ và $\\sqrt{1-x^2} = |\\cos t| = \\cos t$ (do $\\cos t \\ge 0$). Đổi cận: $x=0 \\Rightarrow t=0$; $x=1 \\Rightarrow t=\\frac{\\pi}{2}$.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Hạ bậc lượng giác:
            $$M = \\int_0^{\\pi/2} \\cos^2 t\\,dt = \\frac{1}{2}\\int_0^{\\pi/2} (1 + \\cos 2t)\\,dt = \\frac{1}{2}\\left[t + \\frac{\\sin 2t}{2}\\right]_0^{\\pi/2}$$</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 3 (0.25đ)</span> Thay cận thu được $M = \\frac{\\pi}{4}$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Khi khai căn $\\sqrt{\\cos^2 t} = |\\cos t|$, bắt buộc phải chỉ ra miền của $t$ để giải thích lý do bỏ dấu trị tuyệt đối.</div>
          </div>`,
      },
    ],
    quiz: [
      {
        question:
          "Khi tính $\\int x^2 \\ln x\\,dx$ bằng phương pháp từng phần, nên chọn $u$ là hàm nào theo quy tắc LIATE?",
        options: ["$u = \\ln x$", "$u = x^2$", "$u = x^2 \\ln x$", "$u = 1$"],
        answer: 0,
        explanation:
          "Logarithm (L) đứng đầu tiên trong thứ tự ưu tiên LIATE nên luôn chọn $u = \\ln x$.",
      },
      {
        question:
          "Tích phân suy rộng $\\int_1^{+\\infty} \\frac{dx}{x^p}$ hội tụ khi và chỉ khi:",
        options: ["$p > 1$", "$p < 1$", "$p \\ge 1$", "$p > 0$"],
        answer: 0,
        explanation:
          "Theo tiêu chuẩn $p$ ở vô cực, $\\int_1^{+\\infty} x^{-p}dx$ hội tụ khi $p > 1$ và phân kỳ khi $p \\le 1$.",
      },
      {
        question:
          "Tích phân suy rộng $\\int_1^{+\\infty} \\frac{\\sin x}{x}\\,dx$ có tính chất nào sau đây?",
        options: [
          "Hội tụ có điều kiện (theo tiêu chuẩn Dirichlet)",
          "Hội tụ tuyệt đối",
          "Phân kỳ ra $+\\infty$",
          "Không xác định",
        ],
        answer: 0,
        explanation:
          "Hội tụ theo tiêu chuẩn Dirichlet nhưng $\\int_1^{+\\infty} \\frac{|\\sin x|}{x}dx$ phân kỳ nên chỉ hội tụ có điều kiện.",
      },
    ],
  },

  // =========================================================================
  // CHƯƠNG 4: GIẢI TÍCH 1 - LÝ THUYẾT CHUỖI
  // =========================================================================
  {
    id: "gt1-c4",
    code: "GT1 • CHƯƠNG 4",
    subject: "Giải tích 1",
    level: "Nâng cao",
    title: "Lý thuyết Chuỗi (Chuỗi số & Chuỗi lũy thừa)",
    summary:
      "Chuỗi hình học, chuỗi p, tiêu chuẩn D'Alembert, Cauchy, tích phân; chuỗi đan dấu Leibniz; hội tụ đều và tìm miền hội tụ chuỗi lũy thừa.",
    previewFormula:
      "$$R = \\lim_{n \\to \\infty} \\left|\\frac{a_n}{a_{n+1}}\\right|, \\quad \\sum_{n=0}^{\\infty} aq^n = \\frac{a}{1-q} \\ (|q|<1)$$",
    bannerGradient: "linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)",
    theory: [
      {
        heading: "1. Điều kiện cần & Các chuỗi chuẩn",
        content:
          "Nếu $\\sum a_n$ hội tụ thì $\\lim_{n \\to \\infty} a_n = 0$ (chiều đảo sai, ví dụ chuỗi điều hòa $\\sum \\frac{1}{n}$ phân kỳ). Chuỗi hình học $\\sum_{n=0}^\\infty aq^n$ hội tụ $\\iff |q|<1$. Chuỗi $\\sum \\frac{1}{n^p}$ hội tụ $\\iff p > 1$.",
        checkpoint: {
          question:
            "Xét sự hội tụ của chuỗi số: $\\sum_{n=1}^{\\infty} \\frac{2n^2 + 1}{5n^2 - 3}$",
          rubric: [
            {
              step: "Bước 1 • Kiểm tra điều kiện cần hội tụ (0.5đ)",
              detail:
                "Tính giới hạn số hạng tổng quát: $\\lim_{n \\to \\infty} u_n = \\lim_{n \\to \\infty} \\frac{2n^2+1}{5n^2-3} = \\frac{2}{5} \\neq 0$.",
            },
            {
              step: "Bước 2 • Kết luận phân kỳ (0.5đ)",
              detail:
                "Vì $\\lim_{n \\to \\infty} u_n \\neq 0$ nên vi phạm điều kiện cần hội tụ $\\Rightarrow$ chuỗi đã cho <b>phân kỳ</b>.",
            },
          ],
          trap: "Luôn liếc kiểm tra $\\lim u_n$ đầu tiên! Nếu $\\lim u_n = 0$ thì CHƯA được kết luận hội tụ mà phải dùng các tiêu chuẩn tiếp theo.",
        },
      },
      {
        heading: "2. Tiêu chuẩn D'Alembert & Cauchy cho chuỗi dương",
        content:
          "• <b>D'Alembert:</b> $L = \\lim \\frac{a_{n+1}}{a_n}$. $L < 1$: hội tụ; $L > 1$: phân kỳ; $L = 1$: chưa kết luận.<br>• <b>Cauchy:</b> $L = \\lim \\sqrt[n]{a_n}$. Kết luận tương tự D'Alembert.",
        checkpoint: {
          question:
            "Dùng tiêu chuẩn Cauchy xét sự hội tụ của chuỗi số dương: $\\sum_{n=1}^{\\infty} \\left(\\frac{2n + 1}{3n + 4}\\right)^n$",
          rubric: [
            {
              step: "Bước 1 • Tính giới hạn căn bậc n (0.5đ)",
              detail:
                "Số hạng $u_n > 0$. Ta có $\\lim_{n \\to \\infty} \\sqrt[n]{u_n} = \\lim_{n \\to \\infty} \\frac{2n+1}{3n+4} = \\frac{2}{3}$.",
            },
            {
              step: "Bước 2 • So sánh với 1 và kết luận (0.5đ)",
              detail:
                "Vì $L = \\frac{2}{3} < 1$ nên theo tiêu chuẩn Cauchy, chuỗi đã cho <b>hội tụ</b>.",
            },
          ],
          trap: "Khi số hạng tổng quát chứa lũy thừa bậc $n$ thì ưu tiên dùng Cauchy; khi chứa giai thừa $n!$ hoặc tích thì ưu tiên dùng D'Alembert.",
        },
      },
      {
        heading: "3. Chuỗi đan dấu & Tiêu chuẩn Leibniz",
        content:
          "Nếu $(b_n)$ giảm về $0$ thì chuỗi $\\sum (-1)^{n-1}b_n$ hội tụ và sai số phần dư thỏa $|S - S_N| \\le b_{N+1}$.",
        checkpoint: {
          question:
            "Xét tính hội tụ tuyệt đối hay hội tụ có điều kiện của chuỗi: $\\sum_{n=1}^{\\infty} \\frac{(-1)^{n-1}}{n}$",
          rubric: [
            {
              step: "Bước 1 • Xét chuỗi trị tuyệt đối (0.5đ)",
              detail:
                "Chuỗi trị tuyệt đối $\\sum_{n=1}^\\infty \\frac{1}{n}$ là chuỗi điều hòa ($p = 1 \\le 1$) nên <b>phân kỳ</b>.",
            },
            {
              step: "Bước 2 • Xét tiêu chuẩn Leibniz cho chuỗi đan dấu (0.5đ)",
              detail:
                "Dãy $b_n = \\frac{1}{n} > 0$ đơn điệu giảm và $\\lim_{n \\to \\infty} \\frac{1}{n} = 0$ nên chuỗi hội tụ theo Leibniz. Vậy chuỗi <b>hội tụ có điều kiện</b>.",
            },
          ],
          trap: "Để dùng Leibniz bắt buộc phải nêu đủ cả 2 ý: dãy $(b_n)$ giảm VÀ $\\lim b_n = 0$.",
        },
      },
      {
        heading: "4. Chuỗi lũy thừa & Miền hội tụ",
        content:
          "Với chuỗi $\\sum a_n (x - x_0)^n$, bán kính hội tụ $R = 1/\\rho$ với $\\rho = \\lim |a_{n+1}/a_n|$. Chuỗi hội tụ tuyệt đối trên $(x_0 - R, x_0 + R)$ và phải xét riêng tại hai đầu mút $x = x_0 \\pm R$.",
        checkpoint: {
          question:
            "Tìm bán kính hội tụ $R$ của chuỗi lũy thừa: $\\sum_{n=1}^{\\infty} n! \\cdot x^n$",
          rubric: [
            {
              step: "Bước 1 • Tính tỉ số hệ số (0.5đ)",
              detail:
                "Ta có $a_n = n!$. Xét $\\rho = \\lim_{n \\to \\infty} \\left|\\frac{a_{n+1}}{a_n}\\right| = \\lim_{n \\to \\infty} \\frac{(n+1)!}{n!} = \\lim_{n \\to \\infty} (n+1) = +\\infty$.",
            },
            {
              step: "Bước 2 • Suy ra bán kính hội tụ R (0.5đ)",
              detail:
                "Bán kính hội tụ $R = \\frac{1}{\\rho} = 0$ (chuỗi chỉ hội tụ tại đúng tâm $x = 0$).",
            },
          ],
          trap: "Khi $\\rho = +\\infty$ thì $R = 0$; khi $\\rho = 0$ thì $R = +\\infty$ (miền hội tụ là toàn bộ $\\mathbb{R}$).",
        },
      },
    ],
    exercises: [
      {
        level: "Vừa",
        question:
          "Tính tổng chuỗi rút gọn: $S = \\sum_{n=1}^{\\infty} \\frac{2}{n(n+2)}$",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.25đ)</span> Phân tích số hạng tổng quát: $u_n = \\frac{2}{n(n+2)} = \\frac{1}{n} - \\frac{1}{n+2}$.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Lập tổng riêng thứ $N$:
            $$S_N = \\sum_{n=1}^N \\left(\\frac{1}{n} - \\frac{1}{n+2}\\right) = \\left(1 - \\frac{1}{3}\\right) + \\left(\\frac{1}{2} - \\frac{1}{4}\\right) + \\left(\\frac{1}{3} - \\frac{1}{5}\\right) + \\dots + \\left(\\frac{1}{N} - \\frac{1}{N+2}\\right)$$
            Triệt tiêu chéo còn lại: $S_N = 1 + \\frac{1}{2} - \\frac{1}{N+1} - \\frac{1}{N+2}$.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 3 (0.25đ)</span> Cho $N \\to \\infty \\Rightarrow S = \\lim_{N \\to \\infty} S_N = 1 + \\frac{1}{2} = \\frac{3}{2}$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Khoảng cách giữa $n$ và $n+2$ là $2$ đơn vị nên sau khi triệt tiêu sẽ dư lại 2 số hạng đầu ($1 + 1/2$) và 2 số hạng cuối, không phải 1 số hạng!</div>
          </div>`,
      },
      {
        level: "Vừa",
        question:
          "Xét sự hội tụ của chuỗi số dương: $\\sum_{n=1}^{\\infty} \\frac{3^n}{n!}$",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.25đ)</span> Các số hạng $a_n = \\frac{3^n}{n!} > 0, \\forall n \\ge 1$. Áp dụng tiêu chuẩn D'Alembert.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Tính tỉ số giới hạn:
            $$L = \\lim_{n \\to \\infty} \\frac{a_{n+1}}{a_n} = \\lim_{n \\to \\infty} \\frac{3^{n+1}}{(n+1)!} \\cdot \\frac{n!}{3^n} = \\lim_{n \\to \\infty} \\frac{3}{n+1} = 0$$</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 3 (0.25đ)</span> Vì $L = 0 < 1$ nên chuỗi đã cho <b>hội tụ</b>.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Nhớ khẳng định $a_n > 0$ (chuỗi số dương) trước khi dùng D'Alembert.</div>
          </div>`,
      },
      {
        level: "Vừa",
        question:
          "Dùng tiêu chuẩn so sánh xét sự hội tụ của chuỗi: $\\sum_{n=1}^{\\infty} \\frac{n + 1}{n^3 + 4n + 5}$",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.5đ)</span> Với mọi $n \\ge 1$, $a_n = \\frac{n+1}{n^3+4n+5} > 0$. Khi $n \\to \\infty$, ta có $a_n \\sim \\frac{n}{n^3} = \\frac{1}{n^2} = b_n$.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Vì $\\lim_{n \\to \\infty} \\frac{a_n}{b_n} = 1$ và chuỗi $\\sum_{n=1}^\\infty \\frac{1}{n^2}$ hội tụ (chuỗi $p$ với $p = 2 > 1$), theo tiêu chuẩn so sánh dạng giới hạn, chuỗi đã cho <b>hội tụ</b>.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Phải chỉ rõ giá trị $p = 2 > 1$ của chuỗi so sánh $\\sum 1/n^p$.</div>
          </div>`,
      },
      {
        level: "Khó",
        question:
          "Tìm miền hội tụ của chuỗi lũy thừa: $\\sum_{n=1}^{\\infty} \\frac{(x - 2)^n}{n}$",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.25đ)</span> Đặt $X = x - 2$, hệ số $a_n = \\frac{1}{n}$. Tìm bán kính hội tụ:
            $$\\rho = \\lim_{n \\to \\infty} \\left|\\frac{a_{n+1}}{a_n}\\right| = \\lim_{n \\to \\infty} \\frac{n}{n+1} = 1 \\Rightarrow R = 1$$
            Khoảng hội tụ là $|x - 2| < 1 \\iff 1 < x < 3$.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Xét tại hai đầu mút:
            • Tại $x = 1$: chuỗi trở thành $\\sum_{n=1}^\\infty \\frac{(-1)^n}{n}$ hội tụ theo tiêu chuẩn Leibniz.
            • Tại $x = 3$: chuỗi trở thành $\\sum_{n=1}^\\infty \\frac{1}{n}$ phân kỳ (chuỗi điều hòa $p=1$).</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 3 (0.25đ)</span> Kết luận miền hội tụ của chuỗi là nửa khoảng $[1, 3)$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Chỉ tìm ra khoảng $(1, 3)$ mà bỏ qua bước thay trực tiếp $x=1$ và $x=3$ để xét hai đầu mút sẽ mất 0.5đ!</div>
          </div>`,
      },
      {
        level: "Khó",
        question:
          "Tìm miền hội tụ của chuỗi lũy thừa: $\\sum_{n=1}^{\\infty} \\frac{(2x + 1)^n}{n \\cdot 3^n}$",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.5đ)</span> Đặt $X = 2x + 1$, hệ số $a_n = \\frac{1}{n \\cdot 3^n}$. Ta có $\\rho = \\lim_{n \\to \\infty} \\frac{n \\cdot 3^n}{(n+1)3^{n+1}} = \\frac{1}{3} \\Rightarrow R = 3$.
            Suy ra $|2x + 1| < 3 \\iff -3 < 2x + 1 < 3 \\iff -2 < x < 1$.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Xét hai biên:
            • Tại $x = -2 \\Rightarrow 2x+1 = -3$: chuỗi thành $\\sum \\frac{(-3)^n}{n \\cdot 3^n} = \\sum \\frac{(-1)^n}{n}$ hội tụ theo Leibniz.
            • Tại $x = 1 \\Rightarrow 2x+1 = 3$: chuỗi thành $\\sum \\frac{3^n}{n \\cdot 3^n} = \\sum \\frac{1}{n}$ phân kỳ.
            Vậy miền hội tụ là $[-2, 1)$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Cẩn thận khi giải bất phương trình $|2x+1| < 3$, đừng nhầm thành $|x+1| < 3$!</div>
          </div>`,
      },
    ],
    quiz: [
      {
        question:
          "Chuỗi $\\sum_{n=1}^{\\infty} \\frac{(-1)^{n-1}}{\\sqrt{n}}$ thuộc loại nào?",
        options: [
          "Hội tụ có điều kiện",
          "Hội tụ tuyệt đối",
          "Phân kỳ",
          "Chuỗi hình học",
        ],
        answer: 0,
        explanation:
          "Dãy $1/\\sqrt{n}$ giảm về $0$ nên hội tụ theo Leibniz, nhưng chuỗi trị tuyệt đối $\\sum n^{-1/2}$ ($p=1/2 \\le 1$) phân kỳ.",
      },
      {
        question:
          "Nếu tiêu chuẩn D'Alembert cho kết quả $L = \\lim_{n \\to \\infty} \\frac{a_{n+1}}{a_n} = 1$, ta kết luận gì?",
        options: [
          "Chưa thể kết luận, phải đổi tiêu chuẩn khác",
          "Chuỗi chắc chắn hội tụ",
          "Chuỗi chắc chắn phân kỳ",
          "Tổng chuỗi bằng 1",
        ],
        answer: 0,
        explanation:
          "Cả $\\sum 1/n$ (phân kỳ) và $\\sum 1/n^2$ (hội tụ) đều có tỉ số giới hạn bằng 1.",
      },
      {
        question:
          "Miền hội tụ của chuỗi $\\sum_{n=1}^{\\infty} \\frac{(x+1)^n}{n^2}$ là:",
        options: ["$[-2, 0]$", "$(-2, 0)$", "$[-2, 0)$", "$(-2, 0]$"],
        answer: 0,
        explanation:
          "Bán kính $R=1$, tâm $x_0 = -1$. Tại cả hai biên $x=-2$ và $x=0$, chuỗi trị tuyệt đối đều là $\\sum 1/n^2$ hội tụ nên lấy cả hai đầu mút.",
      },
    ],
  },

  // =========================================================================
  // CHƯƠNG 5: ĐẠI SỐ TUYẾN TÍNH (COMP1800) - MA TRẬN VÀ ĐỊNH THỨC
  // =========================================================================
  {
    id: "dstt-c5",
    code: "ĐSTT • CHƯƠNG 5",
    subject: "Đại số tuyến tính",
    level: "Cơ bản",
    title: "Ma trận và Định thức",
    summary:
      "Phép toán ma trận, chuyển vị; định thức cấp n (khai triển Laplace & khử Gauss); ma trận nghịch đảo bằng phần bù đại số & Gauss-Jordan; tìm hạng ma trận.",
    previewFormula:
      "$$A^{-1} = \\frac{1}{\\det A}\\text{adj}(A), \\quad [A \\mid I_n] \\sim [I_n \\mid A^{-1}]$$",
    bannerGradient: "linear-gradient(135deg, #0d9488 0%, #059669 100%)",
    theory: [
      {
        heading: "1. Phép toán Ma trận & Chuyển vị",
        content:
          "Nếu $A \\in M_{m \\times n}, B \\in M_{n \\times p}$ thì $AB \\in M_{m \\times p}$ với $(AB)_{ij} = \\sum_{k=1}^n a_{ik}b_{kj}$. Phép nhân ma trận <b>không giao hoán</b> ($AB \\neq BA$) và $(AB)^T = B^T A^T$.",
        checkpoint: {
          question:
            "Cho $A = \\begin{pmatrix} 1 & 2 \\\\ 0 & -1 \\end{pmatrix}$ và $B = \\begin{pmatrix} 2 & 0 \\\\ 1 & 3 \\end{pmatrix}$. Tính $AB$ và $BA$ để kiểm chứng $AB \\neq BA$.",
          rubric: [
            {
              step: "Bước 1 • Tính tích AB (0.5đ)",
              detail:
                "$AB = \\begin{pmatrix} 1\\cdot 2 + 2\\cdot 1 & 1\\cdot 0 + 2\\cdot 3 \\\\ 0\\cdot 2 + (-1)\\cdot 1 & 0\\cdot 0 + (-1)\\cdot 3 \\end{pmatrix} = \\begin{pmatrix} 4 & 6 \\\\ -1 & -3 \\end{pmatrix}$.",
            },
            {
              step: "Bước 2 • Tính tích BA và so sánh (0.5đ)",
              detail:
                "$BA = \\begin{pmatrix} 2\\cdot 1 + 0\\cdot 0 & 2\\cdot 2 + 0\\cdot (-1) \\\\ 1\\cdot 1 + 3\\cdot 0 & 1\\cdot 2 + 3\\cdot (-1) \\end{pmatrix} = \\begin{pmatrix} 2 & 4 \\\\ 1 & -1 \\end{pmatrix} \\neq AB$.",
            },
          ],
          trap: "Tuyệt đối không áp dụng hằng đẳng thức $(A+B)^2 = A^2 + 2AB + B^2$ cho ma trận; phải viết đúng $(A+B)^2 = A^2 + AB + BA + B^2$!",
        },
      },
      {
        heading: "2. Khai triển Laplace & Biến đổi sơ cấp định thức",
        content:
          "Định thức $\\det A = \\sum_{k=1}^n a_{ik} C_{ik}$ với $C_{ik} = (-1)^{i+k} M_{ik}$. Khi biến đổi sơ cấp dòng: đổi chỗ 2 hàng $\\det$ đổi dấu; nhân hàng với $\\lambda \\neq 0$ thì $\\det$ nhân $\\lambda$; cộng bội hàng này vào hàng khác $\\det$ <b>không đổi</b>.",
        checkpoint: {
          question:
            "Tính định thức cấp 4 bằng phép biến đổi sơ cấp dòng: $D = \\begin{vmatrix} 1 & 2 & 3 & 4 \\\\ 1 & 3 & 5 & 7 \\\\ 2 & 4 & 7 & 10 \\\\ 0 & 0 & 1 & 5 \\end{vmatrix}$",
          rubric: [
            {
              step: "Bước 1 • Khử các phần tử dưới phần tử trụ (1,1) (0.5đ)",
              detail:
                "Thực hiện $h_2 \\leftarrow h_2 - h_1$ và $h_3 \\leftarrow h_3 - 2h_1$ (định thức không đổi): $D = \\begin{vmatrix} 1 & 2 & 3 & 4 \\\\ 0 & 1 & 2 & 3 \\\\ 0 & 0 & 1 & 2 \\\\ 0 & 0 & 1 & 5 \\end{vmatrix}$.",
            },
            {
              step: "Bước 2 • Đưa về ma trận tam giác trên (0.5đ)",
              detail:
                "Tiếp tục $h_4 \\leftarrow h_4 - h_3$ được hàng 4 là $(0, 0, 0, 3)$. Định thức bằng tích đường chéo chính: $D = 1 \\cdot 1 \\cdot 1 \\cdot 3 = 3$.",
            },
          ],
          trap: "Khi trình bày tự luận, ghi rõ ký hiệu phép biến đổi sơ cấp ở bên cạnh (ví dụ $h_2 \\leftarrow h_2 - h_1$) để giảng viên theo dõi mạch tính.",
        },
      },
      {
        heading: "3. Điều kiện khả nghịch & Ma trận nghịch đảo",
        content:
          "Ma trận vuông $A$ cấp $n$ khả nghịch $\\iff \\det A \\neq 0 \\iff \\text{rank}(A) = n$.<br>• Cách 1: $A^{-1} = \\frac{1}{\\det A} C^T$.<br>• Cách 2 (Gauss-Jordan): $[A \\mid I_n] \\to [I_n \\mid A^{-1}]$.",
        checkpoint: {
          question:
            "Tìm ma trận nghịch đảo của $A = \\begin{pmatrix} 3 & 5 \\\\ 1 & 2 \\end{pmatrix}$.",
          rubric: [
            {
              step: "Bước 1 • Kiểm tra điều kiện khả nghịch (0.5đ)",
              detail:
                "Ta có $\\det A = 3 \\cdot 2 - 5 \\cdot 1 = 1 \\neq 0 \\Rightarrow A$ khả nghịch.",
            },
            {
              step: "Bước 2 • Áp dụng công thức nghịch đảo cấp 2 (0.5đ)",
              detail:
                "$A^{-1} = \\frac{1}{1}\\begin{pmatrix} 2 & -5 \\\\ -1 & 3 \\end{pmatrix} = \\begin{pmatrix} 2 & -5 \\\\ -1 & 3 \\end{pmatrix}$.",
            },
          ],
          trap: "Bắt buộc phải tính $\\det A$ và khẳng định $\\det A \\neq 0$ trước khi viết ký hiệu $A^{-1}$.",
        },
      },
      {
        heading: "4. Hạng của ma trận (Rank)",
        content:
          "Đưa ma trận $A$ về dạng bậc thang dòng bằng phép khử Gauss. Số hàng khác $0$ của ma trận bậc thang chính là $\\text{rank}(A)$.",
        checkpoint: {
          question:
            "Tìm hạng của ma trận $M = \\begin{pmatrix} 1 & 2 & 3 & 4 \\\\ 2 & 4 & 6 & 8 \\\\ 1 & 3 & 5 & 7 \\end{pmatrix}$.",
          rubric: [
            {
              step: "Bước 1 • Biến đổi sơ cấp dòng về dạng bậc thang (0.5đ)",
              detail:
                "Thực hiện $h_2 \\leftarrow h_2 - 2h_1$ và $h_3 \\leftarrow h_3 - h_1$: $M \\sim \\begin{pmatrix} 1 & 2 & 3 & 4 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 1 & 2 & 3 \\end{pmatrix} \\sim \\begin{pmatrix} 1 & 2 & 3 & 4 \\\\ 0 & 1 & 2 & 3 \\\\ 0 & 0 & 0 & 0 \\end{pmatrix}$.",
            },
            {
              step: "Bước 2 • Đếm số hàng khác 0 và kết luận (0.5đ)",
              detail:
                "Ma trận bậc thang có 2 hàng khác $0$, vậy $\\text{rank}(M) = 2$.",
            },
          ],
          trap: "Không được dùng dấu '=' giữa hai ma trận biến đổi sơ cấp dòng, phải dùng dấu tương đương '$\\sim$' hoặc mũi tên '$\\to$'!",
        },
      },
    ],
    exercises: [
      {
        level: "Vừa",
        question:
          "Cho $A, B$ là hai ma trận vuông cấp 3 có $\\det A = -2$, $\\det B = 3$. Tính $\\det(3A)$ và $\\det(A^T B^{-1})$.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.5đ)</span> Vì $A$ là ma trận vuông cấp $n = 3$, áp dụng tính chất $\\det(kA) = k^n \\det A$:
            $$\\det(3A) = 3^3 \\cdot \\det A = 27 \\cdot (-2) = -54$$</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Áp dụng $\\det(XY) = \\det X \\cdot \\det Y$, $\\det(A^T) = \\det A$ và $\\det(B^{-1}) = \\frac{1}{\\det B}$:
            $$\\det(A^T B^{-1}) = \\det(A^T) \\cdot \\det(B^{-1}) = (-2) \\cdot \\frac{1}{3} = -\\frac{2}{3}$$</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Rất nhiều bạn nhầm $\\det(3A) = 3 \\det A = -6$ do quên lũy thừa bậc $n=3$ (cấp của ma trận)!</div>
          </div>`,
      },
      {
        level: "Vừa",
        question:
          "Tìm $t \\in \\mathbb{R}$ để ma trận $A = \\begin{pmatrix} 1 & 2 & 3 \\\\ 2 & 5 & 8 \\\\ 0 & 1 & t \\end{pmatrix}$ khả nghịch.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.5đ)</span> Tính $\\det A$ bằng phép biến đổi sơ cấp dòng:
            $$\\det A = \\begin{vmatrix} 1 & 2 & 3 \\\\ 2 & 5 & 8 \\\\ 0 & 1 & t \\end{vmatrix} \\xrightarrow{h_2 \\leftarrow h_2 - 2h_1} \\begin{vmatrix} 1 & 2 & 3 \\\\ 0 & 1 & 2 \\\\ 0 & 1 & t \\end{vmatrix} \\xrightarrow{h_3 \\leftarrow h_3 - h_2} \\begin{vmatrix} 1 & 2 & 3 \\\\ 0 & 1 & 2 \\\\ 0 & 0 & t-2 \\end{vmatrix} = t - 2$$</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Ma trận vuông $A$ khả nghịch $\\iff \\det A \\neq 0 \\iff t - 2 \\neq 0 \\iff t \\neq 2$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Ghi rõ điều kiện tương đương '$A$ khả nghịch $\\iff \\det A \\neq 0$' để ăn trọn điểm lập luận.</div>
          </div>`,
      },
      {
        level: "Vừa",
        question:
          "Biện luận hạng của ma trận $A = \\begin{pmatrix} 1 & 2 & -1 \\\\ 2 & 4 & m \\\\ 3 & 6 & -3 \\end{pmatrix}$ theo tham số $m$.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.5đ)</span> Biến đổi sơ cấp dòng: $h_2 \\leftarrow h_2 - 2h_1$ và $h_3 \\leftarrow h_3 - 3h_1$:
            $$A \\sim \\begin{pmatrix} 1 & 2 & -1 \\\\ 0 & 0 & m+2 \\\\ 0 & 0 & 0 \\end{pmatrix}$$</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Biện luận theo $m$:
            • Nếu $m + 2 = 0 \\iff m = -2$: ma trận bậc thang có 1 hàng khác $0 \\Rightarrow \\text{rank}(A) = 1$.
            • Nếu $m \\neq -2$: ma trận bậc thang có 2 hàng khác $0 \\Rightarrow \\text{rank}(A) = 2$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Biện luận phải chia đầy đủ 2 trường hợp ($m = -2$ và $m \\neq -2$), không được bỏ sót trường hợp suy biến.</div>
          </div>`,
      },
      {
        level: "Khó",
        question:
          "Tìm ma trận nghịch đảo của $B = \\begin{pmatrix} 1 & 1 & 0 \\\\ 1 & 2 & 1 \\\\ 0 & 1 & 2 \\end{pmatrix}$ bằng phương pháp Gauss-Jordan.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.25đ)</span> Lập ma trận mở rộng $[B \\mid I_3]$:
            $$\\left(\\begin{array}{ccc|ccc} 1 & 1 & 0 & 1 & 0 & 0 \\\\ 1 & 2 & 1 & 0 & 1 & 0 \\\\ 0 & 1 & 2 & 0 & 0 & 1 \\end{array}\\right)$$</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Khử xuôi về tam giác trên ($h_2 \\leftarrow h_2 - h_1$, sau đó $h_3 \\leftarrow h_3 - h_2$):
            $$\\sim \\left(\\begin{array}{ccc|ccc} 1 & 1 & 0 & 1 & 0 & 0 \\\\ 0 & 1 & 1 & -1 & 1 & 0 \\\\ 0 & 0 & 1 & 1 & -1 & 1 \\end{array}\\right)$$
            Khử ngược từ dưới lên ($h_2 \\leftarrow h_2 - h_3$, sau đó $h_1 \\leftarrow h_1 - h_2$):
            $$\\sim \\left(\\begin{array}{ccc|ccc} 1 & 0 & 0 & 3 & -2 & 1 \\\\ 0 & 1 & 0 & -2 & 2 & -1 \\\\ 0 & 0 & 1 & 1 & -1 & 1 \\end{array}\\right)$$</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 3 (0.25đ)</span> Kết luận $B^{-1} = \\begin{pmatrix} 3 & -2 & 1 \\\\ -2 & 2 & -1 \\\\ 1 & -1 & 1 \\end{pmatrix}$ (thử lại $B \\cdot B^{-1} = I_3$).</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Chỉ được biến đổi sơ cấp theo DÒNG (tuyệt đối không biến đổi theo cột khi tìm $B^{-1}$ bằng Gauss-Jordan).</div>
          </div>`,
      },
      {
        level: "Khó",
        question:
          "Giải phương trình ma trận $AX = B$ với $A = \\begin{pmatrix} 2 & 1 \\\\ 5 & 3 \\end{pmatrix}$ và $B = \\begin{pmatrix} 1 & 4 \\\\ 2 & 9 \\end{pmatrix}$.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.25đ)</span> Tính $\\det A = 6 - 5 = 1 \\neq 0 \\Rightarrow A$ khả nghịch. Vì $AX = B$ nên nhân bên TRÁI hai vế với $A^{-1}$ ta được $X = A^{-1}B$.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Tìm $A^{-1} = \\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix}$.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 3 (0.25đ)</span> Tính tích $X = \\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix}\\begin{pmatrix} 1 & 4 \\\\ 2 & 9 \\end{pmatrix} = \\begin{pmatrix} 1 & 3 \\\\ -1 & -2 \\end{pmatrix}$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Phép nhân ma trận không giao hoán! Nếu nhân $B \\cdot A^{-1}$ là sai kết quả hoàn toàn.</div>
          </div>`,
      },
    ],
    quiz: [
      {
        question:
          "Cho $A$ là ma trận vuông cấp 4 có $\\det A = 5$. Giá trị của $\\det(2A)$ là:",
        options: ["$80$", "$10$", "$20$", "$40$"],
        answer: 0,
        explanation:
          "Áp dụng công thức $\\det(\\lambda A) = \\lambda^n \\det A$ với $\\lambda = 2, n = 4$: $2^4 \\cdot 5 = 16 \\cdot 5 = 80$.",
      },
      {
        question:
          "Nếu $A, B$ là hai ma trận vuông khả nghịch cùng cấp thì $(AB)^{-1}$ bằng:",
        options: [
          "$B^{-1} A^{-1}$",
          "$A^{-1} B^{-1}$",
          "$(BA)^{-1}$",
          "$A^T B^T$",
        ],
        answer: 0,
        explanation:
          "Nghịch đảo của tích đảo ngược thứ tự nhân: $(AB)(B^{-1}A^{-1}) = A I A^{-1} = I$.",
      },
      {
        question: "Phép biến đổi sơ cấp nào sau đây làm ĐỔI DẤU định thức?",
        options: [
          "Đổi chỗ hai hàng cho nhau",
          "Cộng $k$ lần hàng 1 vào hàng 2",
          "Chuyển vị ma trận",
          "Nhân một hàng với 1",
        ],
        answer: 0,
        explanation:
          "Đổi chỗ hai hàng (hoặc hai cột) làm định thức nhân với $-1$.",
      },
    ],
  },

  // =========================================================================
  // CHƯƠNG 6: ĐẠI SỐ TUYẾN TÍNH (COMP1800) - HỆ PHƯƠNG TRÌNH TUYẾN TÍNH
  // =========================================================================
  {
    id: "dstt-c6",
    code: "ĐSTT • CHƯƠNG 6",
    subject: "Đại số tuyến tính",
    level: "Trung bình",
    title: "Hệ phương trình tuyến tính",
    summary:
      "Ma trận mở rộng [A|b], thuật toán khử Gauss, định lý Kronecker-Capelli biện luận số nghiệm, hệ thuần nhất AX=0 và quy tắc Cramer.",
    previewFormula:
      "$$r(A) = r([A \\mid b]) = n \\iff \\text{Hệ có nghiệm duy nhất}$$",
    bannerGradient: "linear-gradient(135deg, #0f766e 0%, #0369a1 100%)",
    theory: [
      {
        heading: "1. Biểu diễn Ma trận mở rộng [A | b] & Khử Gauss",
        content:
          "Hệ $m$ phương trình, $n$ ẩn $AX = b$ được giải bằng cách đưa ma trận mở rộng $\\overline{A} = [A \\mid b]$ về dạng bậc thang dòng, sau đó thế ngược từ dưới lên để tìm nghiệm.",
        checkpoint: {
          question:
            "Giải hệ phương trình bằng phương pháp khử Gauss: $\\begin{cases} x + y + z = 6 \\\\ 2x - y + z = 3 \\\\ x + 2y - z = 2 \\end{cases}$",
          rubric: [
            {
              step: "Bước 1 • Lập [A|b] và khử về bậc thang (0.5đ)",
              detail:
                "$\\left(\\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\\\ 2 & -1 & 1 & 3 \\\\ 1 & 2 & -1 & 2 \\end{array}\\right) \\sim \\left(\\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\\\ 0 & -3 & -1 & -9 \\\\ 0 & 1 & -2 & -4 \\end{array}\\right) \\sim \\left(\\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\\\ 0 & 1 & -2 & -4 \\\\ 0 & 0 & -7 & -21 \\end{array}\\right)$.",
            },
            {
              step: "Bước 2 • Thế ngược tìm nghiệm (0.5đ)",
              detail:
                "Từ hàng 3: $-7z = -21 \\Rightarrow z = 3$. Thay lên hàng 2: $y - 6 = -4 \\Rightarrow y = 2$. Thay lên hàng 1: $x + 2 + 3 = 6 \\Rightarrow x = 1$. Nghiệm $(1, 2, 3)$.",
            },
          ],
          trap: "Khi đổi chỗ hai hàng trong ma trận mở rộng $[A|b]$, nhớ đổi chỗ cả phần tử ở cột vế phải $b$!",
        },
      },
      {
        heading: "2. Định lý Kronecker-Capelli (Biện luận số nghiệm)",
        content:
          "Đặt $r = \\text{rank}(A)$ và $\\bar{r} = \\text{rank}([A \\mid b])$:<br>• $r < \\bar{r}$: Hệ <b>vô nghiệm</b>.<br>• $r = \\bar{r} = n$: Hệ có <b>nghiệm duy nhất</b>.<br>• $r = \\bar{r} < n$: Hệ có <b>vô số nghiệm</b> phụ thuộc $n - r$ ẩn tự do.",
        checkpoint: {
          question:
            "Một hệ 3 phương trình, 4 ẩn sau khi khử Gauss cho ma trận mở rộng có $\\text{rank}(A) = \\text{rank}([A|b]) = 2$. Hãy kết luận số nghiệm và số ẩn tự do.",
          rubric: [
            {
              step: "Bước 1 • So sánh hạng và số ẩn (0.5đ)",
              detail: "Ta có $r(A) = r([A|b]) = 2 < n = 4$.",
            },
            {
              step: "Bước 2 • Kết luận theo Kronecker-Capelli (0.5đ)",
              detail:
                "Hệ có <b>vô số nghiệm</b> phụ thuộc vào $n - r = 4 - 2 = 2$ ẩn tự do.",
            },
          ],
          trap: "Số ẩn tự do bằng $n - r$ (số ẩn trừ đi hạng), KHÔNG phải số phương trình trừ đi hạng!",
        },
      },
      {
        heading: "3. Hệ phương trình thuần nhất AX = 0",
        content:
          "Hệ luôn có nghiệm tầm thường $X = 0$. Hệ có <b>nghiệm không tầm thường</b> $\\iff \\text{rank}(A) < n$ (nếu $A$ vuông cấp $n$ thì tương đương $\\det A = 0$).",
        checkpoint: {
          question:
            "Tìm $m$ để hệ thuần nhất $\\begin{cases} x + 2y = 0 \\\\ 3x + my = 0 \\end{cases}$ có nghiệm không tầm thường.",
          rubric: [
            {
              step: "Bước 1 • Nêu điều kiện tương đương (0.5đ)",
              detail:
                "Hệ thuần nhất vuông cấp 2 có nghiệm không tầm thường $\\iff \\det A = 0$.",
            },
            {
              step: "Bước 2 • Giải phương trình định thức (0.5đ)",
              detail:
                "$\\det A = \\begin{vmatrix} 1 & 2 \\\\ 3 & m \\end{vmatrix} = m - 6 = 0 \\iff m = 6$.",
            },
          ],
          trap: "Hệ thuần nhất không bao giờ vô nghiệm vì luôn có ít nhất nghiệm $(0,0)$.",
        },
      },
      {
        heading: "4. Quy tắc Cramer",
        content:
          "Áp dụng khi $m = n$ và $\\Delta = \\det A \\neq 0$. Nghiệm duy nhất là $x_i = \\frac{\\Delta_i}{\\Delta}$, trong đó $\\Delta_i$ là định thức thu được khi thay cột $i$ của $A$ bằng cột vế phải $b$.",
        checkpoint: {
          question:
            "Dùng quy tắc Cramer tìm $x$ của hệ $\\begin{cases} 3x + 2y = 7 \\\\ x - y = 4 \\end{cases}$.",
          rubric: [
            {
              step: "Bước 1 • Tính định thức Δ và Δ₁ (0.5đ)",
              detail:
                "$\\Delta = \\begin{vmatrix} 3 & 2 \\\\ 1 & -1 \\end{vmatrix} = -5 \\neq 0$; $\\Delta_1 = \\begin{vmatrix} 7 & 2 \\\\ 4 & -1 \\end{vmatrix} = -15$.",
            },
            {
              step: "Bước 2 • Tính x (0.5đ)",
              detail: "$x = \\frac{\\Delta_1}{\\Delta} = \\frac{-15}{-5} = 3$.",
            },
          ],
          trap: "Nếu $\\Delta = 0$ thì tuyệt đối không dùng công thức Cramer (chia cho $0$), phải chuyển sang khử Gauss!",
        },
      },
    ],
    exercises: [
      {
        level: "Vừa",
        question:
          "Giải hệ phương trình vô số nghiệm và viết nghiệm tổng quát: $\\begin{cases} x + 2y - z + 3t = 4 \\\\ 2x + 4y - z + 5t = 7 \\\\ x + 2y + 2z = 1 \\end{cases}$",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.5đ)</span> Lập ma trận mở rộng và khử Gauss ($h_2 \\leftarrow h_2 - 2h_1$, $h_3 \\leftarrow h_3 - h_1$):
            $$\\left(\\begin{array}{cccc|c} 1 & 2 & -1 & 3 & 4 \\\\ 0 & 0 & 1 & -1 & -1 \\\\ 0 & 0 & 3 & -3 & -3 \\end{array}\\right) \\xrightarrow{h_3 \\leftarrow h_3 - 3h_2} \\left(\\begin{array}{cccc|c} 1 & 2 & -1 & 3 & 4 \\\\ 0 & 0 & 1 & -1 & -1 \\\\ 0 & 0 & 0 & 0 & 0 \\end{array}\\right)$$</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.25đ)</span> Ta có $r(A) = r([A|b]) = 2 < 4$, hệ có vô số nghiệm phụ thuộc $4 - 2 = 2$ ẩn tự do. Các cột trụ là cột 1 ($x$) và cột 3 ($z$), nên chọn $y = \\alpha, t = \\beta$ ($\\alpha, \\beta \\in \\mathbb{R}$) làm ẩn tự do.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 3 (0.25đ)</span> Thế ngược: từ hàng 2 có $z - \\beta = -1 \\Rightarrow z = \\beta - 1$. Từ hàng 1 có $x + 2\\alpha - (\\beta - 1) + 3\\beta = 4 \\Rightarrow x = 3 - 2\\alpha - 2\\beta$.
            Vậy nghiệm tổng quát: $(x, y, z, t) = (3 - 2\\alpha - 2\\beta,\\; \\alpha,\\; \\beta - 1,\\; \\beta)$ với $\\alpha, \\beta \\in \\mathbb{R}$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Phải đặt tên tham số cho các ẩn tự do (ví dụ $\\alpha, \\beta \\in \\mathbb{R}$) và biểu diễn toàn bộ 4 thành phần nghiệm theo các tham số đó.</div>
          </div>`,
      },
      {
        level: "Vừa",
        question:
          "Tìm cơ sở và số chiều của không gian nghiệm của hệ thuần nhất: $\\begin{cases} x_1 + 2x_2 - x_3 + 2x_4 = 0 \\\\ 2x_1 + 4x_2 - x_3 + 3x_4 = 0 \\end{cases}$",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.5đ)</span> Khử Gauss ($h_2 \\leftarrow h_2 - 2h_1$): $\\begin{pmatrix} 1 & 2 & -1 & 2 \\\\ 0 & 0 & 1 & -1 \\end{pmatrix}$. Hạng $r = 2$, số ẩn $n = 4 \\Rightarrow \\dim N(A) = 4 - 2 = 2$.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Đặt $x_2 = a, x_4 = b$. Ta có $x_3 = b$ và $x_1 = -2a + b - 2b = -2a - b$.
            Viết nghiệm dưới dạng tổ hợp tuyến tính:
            $$X = \\begin{pmatrix} -2a - b \\\\ a \\\\ b \\\\ b \\end{pmatrix} = a\\begin{pmatrix} -2 \\\\ 1 \\\\ 0 \\\\ 0 \\end{pmatrix} + b\\begin{pmatrix} -1 \\\\ 0 \\\\ 1 \\\\ 1 \\end{pmatrix}$$
            Vậy cơ sở không gian nghiệm là $\\left\\{ \\begin{pmatrix} -2 \\\\ 1 \\\\ 0 \\\\ 0 \\end{pmatrix}, \\begin{pmatrix} -1 \\\\ 0 \\\\ 1 \\\\ 1 \\end{pmatrix} \\right\\}$ và $\\dim N(A) = 2$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Trình bày vector nghiệm theo cột dọc đúng chuẩn đại số tuyến tính để tách rõ từng vector cơ sở.</div>
          </div>`,
      },
      {
        level: "Vừa",
        question:
          "Kiểm tra tính có nghiệm của hệ: $\\begin{cases} x + y = 1 \\\\ 2x + 2y = 2 \\\\ x + y = 3 \\end{cases}$ bằng định lý Kronecker-Capelli.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.5đ)</span> Khử Gauss trên $[A|b]$ ($h_2 \\leftarrow h_2 - 2h_1, h_3 \\leftarrow h_3 - h_1$):
            $$\\left(\\begin{array}{cc|c} 1 & 1 & 1 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 2 \\end{array}\\right) \\sim \\left(\\begin{array}{cc|c} 1 & 1 & 1 \\\\ 0 & 0 & 2 \\\\ 0 & 0 & 0 \\end{array}\\right)$$</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Ta có $\\text{rank}(A) = 1 < \\text{rank}([A|b]) = 2$. Theo định lý Kronecker-Capelli, hệ phương trình <b>vô nghiệm</b>.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Phải chỉ rõ cả hai giá trị $\\text{rank}(A)$ và $\\text{rank}([A|b])$ rồi mới kết luận vô nghiệm.</div>
          </div>`,
      },
      {
        level: "Khó",
        question:
          "Biện luận theo tham số $m$ số nghiệm của hệ: $\\begin{cases} x + y + z = 1 \\\\ x + 2y + mz = 2 \\\\ 2x + 3y + (m+1)z = m + 1 \\end{cases}$",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.5đ)</span> Lập ma trận mở rộng và khử Gauss:
            $$\\left(\\begin{array}{ccc|c} 1 & 1 & 1 & 1 \\\\ 1 & 2 & m & 2 \\\\ 2 & 3 & m+1 & m+1 \\end{array}\\right) \\xrightarrow{\\substack{h_2 \\leftarrow h_2 - h_1 \\\\ h_3 \\leftarrow h_3 - 2h_1}} \\left(\\begin{array}{ccc|c} 1 & 1 & 1 & 1 \\\\ 0 & 1 & m-1 & 1 \\\\ 0 & 1 & m-1 & m-1 \\end{array}\\right) \\xrightarrow{h_3 \\leftarrow h_3 - h_2} \\left(\\begin{array}{ccc|c} 1 & 1 & 1 & 1 \\\\ 0 & 1 & m-1 & 1 \\\\ 0 & 0 & 0 & m-2 \\end{array}\\right)$$</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Biện luận theo hàng cuối cùng:
            • Nếu $m - 2 \\neq 0 \\iff m \\neq 2$: $r(A) = 2 < r([A|b]) = 3 \\Rightarrow$ Hệ <b>vô nghiệm</b>.
            • Nếu $m = 2$: $r(A) = r([A|b]) = 2 < 3 \\Rightarrow$ Hệ có <b>vô số nghiệm</b> phụ thuộc 1 ẩn tự do (với mọi $m$, hệ không bao giờ có nghiệm duy nhất).</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Khi hàng cuối là $(0, 0, 0 \\mid m-2)$, nhiều bạn vội kết luận $m \\neq 2$ có nghiệm duy nhất là sai vì cột 3 bên trái cũng đã bằng $0$ rồi!</div>
          </div>`,
      },
      {
        level: "Khó",
        question:
          "Tìm $m$ để hệ thuần nhất $\\begin{cases} x + y + z = 0 \\\\ 2x + my + 3z = 0 \\\\ x + 2y + mz = 0 \\end{cases}$ có nghiệm không tầm thường.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.5đ)</span> Hệ thuần nhất 3 phương trình, 3 ẩn có nghiệm không tầm thường $\\iff \\det A = 0$.
            Tính định thức:
            $$\\det A = \\begin{vmatrix} 1 & 1 & 1 \\\\ 2 & m & 3 \\\\ 1 & 2 & m \\end{vmatrix} \\xrightarrow{\\substack{h_2 \\leftarrow h_2 - 2h_1 \\\\ h_3 \\leftarrow h_3 - h_1}} \\begin{vmatrix} 1 & 1 & 1 \\\\ 0 & m-2 & 1 \\\\ 0 & 1 & m-1 \\end{vmatrix} = (m-2)(m-1) - 1 = m^2 - 3m + 1$$</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Giải phương trình $m^2 - 3m + 1 = 0 \\iff m = \\frac{3 \\pm \\sqrt{5}}{2}$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Khử Gauss đưa về định thức cấp 2 giúp hạn chế tối đa sai dấu so với quy tắc Sarrus.</div>
          </div>`,
      },
    ],
    quiz: [
      {
        question:
          "Một hệ phương trình tuyến tính 4 ẩn có $\\text{rank}(A) = \\text{rank}([A|b]) = 2$. Kết luận nào đúng?",
        options: [
          "Hệ có vô số nghiệm phụ thuộc 2 tham số tự do",
          "Hệ có nghiệm duy nhất",
          "Hệ vô nghiệm",
          "Hệ có vô số nghiệm phụ thuộc 4 tham số",
        ],
        answer: 0,
        explanation:
          "Vì $r = \\bar{r} = 2 < n = 4$ nên số ẩn tự do là $n - r = 4 - 2 = 2$.",
      },
      {
        question:
          "Điều kiện bắt buộc để áp dụng quy tắc Cramer giải hệ $AX = b$ là gì?",
        options: [
          "Ma trận hệ số $A$ vuông và $\\det A \\neq 0$",
          "Hệ có số ẩn nhiều hơn số phương trình",
          "$\\det A = 0$",
          "Vế phải $b = 0$",
        ],
        answer: 0,
        explanation:
          "Công thức $x_i = \\Delta_i / \\Delta$ đòi hỏi $A$ là ma trận vuông và mẫu số $\\Delta = \\det A \\neq 0$.",
      },
      {
        question:
          "Hệ phương trình thuần nhất $AX = 0$ gồm 3 phương trình và 5 ẩn luôn có tính chất gì?",
        options: [
          "Luôn có vô số nghiệm không tầm thường",
          "Luôn vô nghiệm",
          "Chỉ có nghiệm duy nhất $X = 0$",
          "Áp dụng được quy tắc Cramer",
        ],
        answer: 0,
        explanation:
          "Vì $\\text{rank}(A) \\le 3 < 5$ (số phương trình ít hơn số ẩn) nên luôn có ít nhất $5 - 3 = 2$ ẩn tự do.",
      },
    ],
  },

  // =========================================================================
  // CHƯƠNG 7: ĐẠI SỐ TUYẾN TÍNH (COMP1800) - KHÔNG GIAN VECTOR & EUCLIDE
  // =========================================================================
  {
    id: "dstt-c7",
    code: "ĐSTT • CHƯƠNG 7",
    subject: "Đại số tuyến tính",
    level: "Nâng cao",
    title: "Không gian Vector & Không gian Euclide",
    summary:
      "Không gian con (Rⁿ và đa thức P_n), tổ hợp tuyến tính, hệ sinh, độc lập tuyến tính, cơ sở & số chiều, ma trận đổi cơ sở và trực giao hóa Gram-Schmidt.",
    previewFormula:
      "$$[v]_C = P_{C \\leftarrow B}[v]_B, \\quad v_j = u_j - \\sum_{i=1}^{j-1} \\frac{\\langle u_j, v_i \\rangle}{\\langle v_i, v_i \\rangle} v_i$$",
    bannerGradient: "linear-gradient(135deg, #047857 0%, #1d4ed8 100%)",
    theory: [
      {
        heading: "1. Phương pháp chứng minh Không gian con (W ≤ V)",
        content:
          "Tập $W \\subset V$ là không gian con của $V$ khi và chỉ khi thỏa mãn 2 điều kiện:<br>1) $0_V \\in W$ (để chứng minh $W \\neq \\emptyset$).<br>2) $\\forall u, v \\in W, \\forall \\alpha, \\beta \\in \\mathbb{R} \\Rightarrow \\alpha u + \\beta v \\in W$ (đóng với tổ hợp tuyến tính).",
        checkpoint: {
          question:
            "Chứng minh tập $W = \\{p(x) \\in \\mathcal{P}_2[x] : p(1) = 0\\}$ là một không gian con của không gian đa thức $\\mathcal{P}_2[x]$.",
          rubric: [
            {
              step: "Bước 1 • Kiểm tra vector không (0.25đ)",
              detail:
                "Đa thức không $\\theta(x) = 0$ thỏa $\\theta(1) = 0$ nên $\\theta \\in W \\Rightarrow W \\neq \\emptyset$.",
            },
            {
              step: "Bước 2 • Kiểm tra tính đóng với tổ hợp tuyến tính (0.75đ)",
              detail:
                "Lấy bất kỳ $p(x), q(x) \\in W$ (suy ra $p(1)=0, q(1)=0$) và $\\alpha, \\beta \\in \\mathbb{R}$. Xét đa thức $h(x) = \\alpha p(x) + \\beta q(x) \\in \\mathcal{P}_2[x]$. Ta có $h(1) = \\alpha p(1) + \\beta q(1) = \\alpha \\cdot 0 + \\beta \\cdot 0 = 0 \\Rightarrow h \\in W$. Vậy $W$ là không gian con của $\\mathcal{P}_2[x]$.",
            },
          ],
          trap: "Tuyệt đối KHÔNG được bỏ qua bước chứng minh $0_V \\in W$! Thiếu bước này sẽ bị trừ 0.25đ ngay lập tức.",
        },
      },
      {
        heading: "2. Độc lập tuyến tính, Cơ sở & Số chiều (dim V)",
        content:
          "• Xếp các vector $v_1, \\dots, v_k \\in \\mathbb{R}^n$ thành <b>các cột dọc</b> lập thành ma trận $A$. Hệ độc lập tuyến tính $\\iff \\text{rank}(A) = k$.<br>• Cơ sở của $V$ là hệ vừa độc lập tuyến tính vừa sinh ra $V$. Số vector trong một cơ sở là số chiều $\\dim V$.",
        checkpoint: {
          question:
            "Xét tính độc lập tuyến tính của hệ 3 vector trong $\\mathbb{R}^3$: $v_1 = (1, 2, 1)^T$, $v_2 = (2, 5, 3)^T$, $v_3 = (1, 3, 3)^T$.",
          rubric: [
            {
              step: "Bước 1 • Xếp các vector thành cột dọc lập ma trận A (0.5đ)",
              detail:
                "$A = \\begin{pmatrix} 1 & 2 & 1 \\\\ 2 & 5 & 3 \\\\ 1 & 3 & 3 \\end{pmatrix} \\xrightarrow{\\substack{h_2 \\leftarrow h_2 - 2h_1 \\\\ h_3 \\leftarrow h_3 - h_1}} \\begin{pmatrix} 1 & 2 & 1 \\\\ 0 & 1 & 1 \\\\ 0 & 1 & 2 \\end{pmatrix} \\xrightarrow{h_3 \\leftarrow h_3 - h_2} \\begin{pmatrix} 1 & 2 & 1 \\\\ 0 & 1 & 1 \\\\ 0 & 0 & 1 \\end{pmatrix}$.",
            },
            {
              step: "Bước 2 • So sánh hạng với số vector (0.5đ)",
              detail:
                "Ta có $\\text{rank}(A) = 3$ bằng đúng số vector của hệ ($k = 3$), nên hệ $\\{v_1, v_2, v_3\\}$ <b>độc lập tuyến tính</b> (và tạo thành một cơ sở của $\\mathbb{R}^3$).",
            },
          ],
          trap: "Xếp vector thành CỘT DỌC theo chuẩn trình bày đại học (rất tiện khi sau đó tìm hệ độc lập tuyến tính cực đại bằng cách lấy các cột chứa phần tử trụ!).",
        },
      },
      {
        heading: "3. Tọa độ vector & Ma trận đổi cơ sở",
        content:
          "• Tọa độ của $v$ trong cơ sở $B = (u_1, \\dots, u_n)$ là cột $[v]_B = (c_1, \\dots, c_n)^T$ thỏa $v = \\sum_{i=1}^n c_i u_i$.<br>• Công thức đổi cơ sở từ $B$ sang $C$: $[v]_C = P_{C \\leftarrow B}[v]_B = P_C^{-1} P_B [v]_B$.",
        checkpoint: {
          question:
            "Trong $\\mathbb{R}^2$, cho cơ sở $B = (u_1, u_2)$ với $u_1 = (1, 1)^T, u_2 = (1, -1)^T$ và vector $v = (5, 1)^T$. Tìm tọa độ $[v]_B$.",
          rubric: [
            {
              step: "Bước 1 • Thiết lập phương trình tổ hợp tuyến tính (0.5đ)",
              detail:
                "Tìm $c_1, c_2 \\in \\mathbb{R}$ sao cho $c_1 u_1 + c_2 u_2 = v \\iff \\begin{cases} c_1 + c_2 = 5 \\\\ c_1 - c_2 = 1 \\end{cases}$.",
            },
            {
              step: "Bước 2 • Giải hệ và viết tọa độ dạng cột (0.5đ)",
              detail:
                "Giải được $c_1 = 3, c_2 = 2$. Vậy $[v]_B = \\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix}$.",
            },
          ],
          trap: "Tọa độ $[v]_B$ của vector trong một cơ sở luôn viết dưới dạng <b>vector cột</b> để nhân tương thích với ma trận đổi cơ sở.",
        },
      },
      {
        heading: "4. Không gian Euclide & Thuật toán Gram-Schmidt",
        content:
          "Tích vô hướng $\\langle u, v \\rangle$ sinh ra chuẩn $\\|u\\| = \\sqrt{\\langle u, u \\rangle}$ và góc $\\cos\\varphi = \\frac{\\langle u, v \\rangle}{\\|u\\|\\|v\\|}$. Thuật toán Gram-Schmidt biến cơ sở $\{u_1, \\dots, u_k\}$ thành cơ sở trực giao $\{v_1, \\dots, v_k\}$, sau đó chuẩn hóa $e_j = \\frac{v_j}{\\|v_j\\|}$.",
        checkpoint: {
          question:
            "Trong $\\mathbb{R}^3$ với tích vô hướng chính tắc, tính chuẩn $\\|u\\|$ và góc giữa $u = (1, 0, 1)^T$ và $v = (0, 1, 1)^T$.",
          rubric: [
            {
              step: "Bước 1 • Tính tích vô hướng và chuẩn của từng vector (0.5đ)",
              detail:
                "$\\langle u, v \\rangle = 1\\cdot 0 + 0\\cdot 1 + 1\\cdot 1 = 1$. Chuẩn $\\|u\\| = \\sqrt{1^2+0^2+1^2} = \\sqrt{2}$, $\\|v\\| = \\sqrt{2}$.",
            },
            {
              step: "Bước 2 • Tính cos φ và suy ra góc φ (0.5đ)",
              detail:
                "$\\cos\\varphi = \\frac{\\langle u, v \\rangle}{\\|u\\|\\|v\\|} = \\frac{1}{\\sqrt{2}\\cdot\\sqrt{2}} = \\frac{1}{2} \\Rightarrow \\varphi = \\frac{\\pi}{3}$ ($60^\\circ$).",
            },
          ],
          trap: "Nhớ lấy căn bậc hai khi tính chuẩn $\\|u\\| = \\sqrt{\\langle u, u \\rangle}$, tránh nhầm với $\\|u\\|^2 = \\langle u, u \\rangle$.",
        },
      },
    ],
    exercises: [
      {
        level: "Vừa",
        question:
          "Tìm cơ sở và số chiều của không gian con $W = \\{(x, y, z, t)^T \\in \\mathbb{R}^4 : x - y + 2z - t = 0,\\; 2x - y + 3z - t = 0\\}$.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.5đ)</span> Giải hệ phương trình thuần nhất xác định $W$ bằng khử Gauss ($h_2 \\leftarrow h_2 - 2h_1$):
            $$\\begin{pmatrix} 1 & -1 & 2 & -1 \\\\ 2 & -1 & 3 & -1 \\end{pmatrix} \\sim \\begin{pmatrix} 1 & -1 & 2 & -1 \\\\ 0 & 1 & -1 & 1 \\end{pmatrix}$$
            Có 2 ẩn tự do là $z = \\alpha, t = \\beta$ ($\\alpha, \\beta \\in \\mathbb{R}$). Thế ngược: $y = \\alpha - \\beta$, $x = y - 2\\alpha + \\beta = -\\alpha$.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.25đ)</span> Biểu diễn mọi vector $u \\in W$:
            $$u = \\begin{pmatrix} -\\alpha \\\\ \\alpha - \\beta \\\\ \\alpha \\\\ \\beta \\end{pmatrix} = \\alpha\\begin{pmatrix} -1 \\\\ 1 \\\\ 1 \\\\ 0 \\end{pmatrix} + \\beta\\begin{pmatrix} 0 \\\\ -1 \\\\ 0 \\\\ 1 \\end{pmatrix}$$</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 3 (0.25đ)</span> Hai vector $u_1 = (-1, 1, 1, 0)^T$ và $u_2 = (0, -1, 0, 1)^T$ không tỉ lệ nên độc lập tuyến tính và sinh ra $W$. Vậy cơ sở của $W$ là $\\{u_1, u_2\\}$ và $\\dim W = 2$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Phải chỉ ra hệ sinh ra $W$ VÀ độc lập tuyến tính rồi mới kết luận đó là cơ sở!</div>
          </div>`,
      },
      {
        level: "Vừa",
        question:
          "Cho tập hợp $M = \\{(x, y, z)^T \\in \\mathbb{R}^3 : x + 2y - z = 3\\}$. Hỏi $M$ có phải là không gian con của $\\mathbb{R}^3$ không? Giải thích chặt chẽ.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.5đ)</span> Xét vector không $\\theta = (0, 0, 0)^T \\in \\mathbb{R}^3$. Thay tọa độ vào điều kiện của $M$: $0 + 2(0) - 0 = 0 \\neq 3$.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Suy ra $\\theta \\notin M$. Do đó $M$ <b>không phải</b> là không gian con của $\\mathbb{R}^3$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Chỉ cần đưa ra một phản ví dụ cụ thể (nhanh nhất là kiểm tra vector không $\\theta \\notin M$) là đủ kết luận phủ định với điểm tối đa!</div>
          </div>`,
      },
      {
        level: "Vừa",
        question:
          "Trong không gian đa thức $\\mathcal{P}_2[x]$, xét tính độc lập tuyến tính của hệ $p_1(x) = 1 + x + x^2$, $p_2(x) = 2 + x - x^2$, $p_3(x) = 1 - 2x - 5x^2$.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.5đ)</span> Đưa về tọa độ trong cơ sở chính tắc $E = (1, x, x^2)$ dưới dạng các cột dọc:
            $$A = \\begin{pmatrix} 1 & 2 & 1 \\\\ 1 & 1 & -2 \\\\ 1 & -1 & -5 \\end{pmatrix} \\xrightarrow{\\substack{h_2 \\leftarrow h_2 - h_1 \\\\ h_3 \\leftarrow h_3 - h_1}} \\begin{pmatrix} 1 & 2 & 1 \\\\ 0 & -1 & -3 \\\\ 0 & -3 & -6 \\end{pmatrix} \\xrightarrow{h_3 \\leftarrow h_3 - 3h_2} \\begin{pmatrix} 1 & 2 & 1 \\\\ 0 & -1 & -3 \\\\ 0 & 0 & 3 \\end{pmatrix}$$</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Ma trận bậc thang có $\\text{rank}(A) = 3$ bằng số đa thức, nên hệ $\\{p_1, p_2, p_3\\}$ <b>độc lập tuyến tính</b> trong $\\mathcal{P}_2[x]$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Ghi rõ 'lấy tọa độ theo cơ sở chính tắc $E = (1, x, x^2)$' trước khi lập ma trận tọa độ.</div>
          </div>`,
      },
      {
        level: "Khó",
        question:
          "Trong $\\mathbb{R}^2$, cho hai cơ sở $B = (u_1, u_2)$ với $u_1 = (1, 2)^T, u_2 = (1, 3)^T$ và $C = (w_1, w_2)$ với $w_1 = (2, 1)^T, w_2 = (3, 2)^T$. Tìm ma trận đổi cơ sở $P_{C \\leftarrow B}$ và tính $[v]_C$ biết $[v]_B = (4, -1)^T$.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.25đ)</span> Lập ma trận chuyển từ cơ sở chính tắc sang $B$ và $C$:
            $$P_B = \\begin{pmatrix} 1 & 1 \\\\ 2 & 3 \\end{pmatrix}, \\quad P_C = \\begin{pmatrix} 2 & 3 \\\\ 1 & 2 \\end{pmatrix}$$</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Áp dụng công thức $P_{C \\leftarrow B} = P_C^{-1} P_B$. Vì $\\det P_C = 4 - 3 = 1$, ta có $P_C^{-1} = \\begin{pmatrix} 2 & -3 \\\\ -1 & 2 \\end{pmatrix}$.
            $$P_{C \\leftarrow B} = \\begin{pmatrix} 2 & -3 \\\\ -1 & 2 \\end{pmatrix}\\begin{pmatrix} 1 & 1 \\\\ 2 & 3 \\end{pmatrix} = \\begin{pmatrix} -4 & -7 \\\\ 3 & 5 \\end{pmatrix}$$</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 3 (0.25đ)</span> Tính tọa độ trong cơ sở mới $C$:
            $$[v]_C = P_{C \\leftarrow B}[v]_B = \\begin{pmatrix} -4 & -7 \\\\ 3 & 5 \\end{pmatrix}\\begin{pmatrix} 4 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} -9 \\\\ 7 \\end{pmatrix}$$</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Cực kỳ dễ nhầm thứ tự nghịch đảo giữa $P_B^{-1}P_C$ và $P_C^{-1}P_B$! Nhớ mẹo: mũi tên $C \\leftarrow B$ thì $P_C^{-1}$ đứng trước, $P_B$ đứng sau.</div>
          </div>`,
      },
      {
        level: "Khó",
        question:
          "Áp dụng thuật toán Gram-Schmidt trực chuẩn hóa hệ vector $u_1 = (1, 1, 0)^T$, $u_2 = (1, 0, 1)^T$ trong không gian Euclide $\\mathbb{R}^3$.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.25đ)</span> Trực giao hóa: đặt $v_1 = u_1 = (1, 1, 0)^T$. Tính $\\langle v_1, v_1 \\rangle = 1^2 + 1^2 + 0^2 = 2$.</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Tìm $v_2$: tính $\\langle u_2, v_1 \\rangle = 1\\cdot 1 + 0\\cdot 1 + 1\\cdot 0 = 1$.
            $$v_2 = u_2 - \\frac{\\langle u_2, v_1 \\rangle}{\\langle v_1, v_1 \\rangle} v_1 = \\begin{pmatrix} 1 \\\\ 0 \\\\ 1 \\end{pmatrix} - \\frac{1}{2}\\begin{pmatrix} 1 \\\\ 1 \\\\ 0 \\end{pmatrix} = \\begin{pmatrix} 1/2 \\\\ -1/2 \\\\ 1 \\end{pmatrix}$$
            (Có thể chọn vector cùng phương nguyên hóa $\\tilde{v}_2 = 2v_2 = (1, -1, 2)^T$ để tính chuẩn cho gọn).</div>
            <div class="rubric-step"><span class="rubric-tag">Bước 3 (0.25đ)</span> Chuẩn hóa chia cho độ dài: $\\|v_1\\| = \\sqrt{2}$, $\\|\\tilde{v}_2\\| = \\sqrt{1+1+4} = \\sqrt{6}$.
            Vậy hệ trực chuẩn là $e_1 = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 \\\\ 1 \\\\ 0 \\end{pmatrix}$ và $e_2 = \\frac{1}{\\sqrt{6}}\\begin{pmatrix} 1 \\\\ -1 \\\\ 2 \\end{pmatrix}$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Đọc kỹ đề hỏi <b>trực giao hóa</b> (dừng ở $v_1, v_2$) hay <b>trực chuẩn hóa</b> (phải chia thêm cho chuẩn $\\|v_i\\|$ ở bước cuối)!</div>
          </div>`,
      },
    ],
    quiz: [
      {
        question:
          "Tập hợp nào sau đây KHÔNG phải là không gian con của $\\mathbb{R}^3$?",
        options: [
          "$W_1 = \\{(x,y,z)^T : x + y + z = 1\\}$",
          "$W_2 = \\{(x,y,z)^T : x - 2y + z = 0\\}$",
          "$W_3 = \\{(t, 2t, -t)^T : t \\in \\mathbb{R}\\}$",
          "$W_4 = \\{(0,0,0)^T\\}$",
        ],
        answer: 0,
        explanation:
          "$W_1$ không chứa vector không $(0,0,0)^T$ vì $0 + 0 + 0 = 0 \\neq 1$ nên vi phạm điều kiện không gian con.",
      },
      {
        question:
          "Cho ma trận $A$ cỡ $3 \\times 5$ có $\\text{rank}(A) = 3$. Số chiều của không gian nghiệm $\\dim N(A)$ bằng:",
        options: ["$2$", "$3$", "$0$", "$5$"],
        answer: 0,
        explanation:
          "Theo định lý Rank-Nullity: $\\dim N(A) = n - \\text{rank}(A) = 5 - 3 = 2$.",
      },
      {
        question:
          "Hai vector $u = (1, m, 2)^T$ và $v = (2, -1, 1)^T$ trong $\\mathbb{R}^3$ trực giao khi $m$ bằng:",
        options: ["$4$", "$-4$", "$2$", "$0$"],
        answer: 0,
        explanation:
          "$u \\perp v \\iff \\langle u, v \\rangle = 1\\cdot 2 + m(-1) + 2\\cdot 1 = 4 - m = 0 \\iff m = 4$.",
      },
    ],
  },
];
