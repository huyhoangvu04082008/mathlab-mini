/* ==========================================================================
   FILE: js/main.js (PHIÊN BẢN V4.3 — TỰ VÁ CACHE CHƯƠNG 4 & KHÔI PHỤC THANH XP)
   1. Gộp Lý thuyết -> Ví dụ minh họa -> Bài tập thực hành cùng 1 luồng học
   2. Kho Tài liệu từng chương + Phân quyền 2 Admin (Hoàng & Khoa)
   3. Bảng xếp hạng XP (Leaderboard) & Diễn đàn thảo luận bài học (Forum)
   4. Hệ thống XP tích lũy, Quiz Thích ứng, Phòng Thi Bấm Giờ & AI Vision
   ========================================================================== */

const STORAGE_KEYS = {
  TOPICS: "mathlab_topics_v5",
  USERS: "mathlab_users_v2",
  CURRENT_USER: "mathlab_current_user_v2",
  THEME: "mathlab_theme_v1",
  FEEDBACKS: "mathlab_feedbacks_v1",
  DOCS: "mathlab_documents_v1",
  PROGRESS: "mathlab_progress_v1",
  FORUM: "mathlab_forum_v1",
  COMMUNITY_NOTES: "mathlab_community_notes_v1",
  GEMINI_KEY: "mathlab_gemini_api_key",
  GEMINI_KEY_LEGACY: "mathlab_gemini_api_key_v1",
};

const ADMIN_ACCOUNTS = [
  {
    name: "Vũ Huy Hoàng",
    studentId: "52.01.104.124",
    email: "52.01.104.124@student.hcmue.edu.vn",
    password: "hoang123",
    role: "admin",
  },
  {
    name: "Hồ Đắc Anh Khoa",
    studentId: "52.01.104.042",
    email: "52.01.104.042@student.hcmue.edu.vn",
    password: "khoa123",
    role: "admin",
  },
];

const DEFAULT_DOCUMENTS = {
  "gt-c1": [
    {
      id: "doc-1",
      title: "GT1_Chuong1_GioiHan_LienTuc_VCB_TiemCan.pdf",
      uploader: "Vũ Huy Hoàng",
      date: "2026-10-15",
      size: "1.6 MB",
      type: "PDF",
      content:
        "TÓM TẮT CHƯƠNG 1 - GIẢI TÍCH 1: GIỚI HẠN & LIÊN TỤC\n1. Giới hạn một bên & 7 dạng vô định.\n2. Bảng VCB & VCL tương đương khi x -> 0, x -> ∞.\n3. Giới hạn cơ bản & Dạng 1^∞.\n4. Phân loại điểm gián đoạn (khử được, loại 1, loại 2).\n5. Tiệm cận đứng, ngang, xiên & Định lý Bolzano-Cauchy.",
    },
  ],
  "gt-c2": [
    {
      id: "doc-2",
      title: "GT1_Chuong2_DaoHam_ViPhan_Taylor_LHospital.pdf",
      uploader: "Hồ Đắc Anh Khoa",
      date: "2026-10-22",
      size: "1.9 MB",
      type: "PDF",
      content:
        "TÓM TẮT CHƯƠNG 2 - ĐẠO HÀM, VI PHÂN & ỨNG DỤNG\n1. Đạo hàm hàm hợp, hàm ngược, hàm tham số, hàm ẩn.\n2. Vi phân cấp 1 & xấp xỉ tuyến tính.\n3. Đạo hàm cấp cao & Công thức Leibniz.\n4. Quy tắc L'Hospital & Khai triển Taylor - Maclaurin.\n5. Cực trị, GTLN-GTNN, tính lồi-lõm & điểm uốn.",
    },
  ],
  "gt-c3": [
    {
      id: "doc-3",
      title: "GT1_Chuong3_NguyenHam_TichPhanXacDinh_LIATE.pdf",
      uploader: "Vũ Huy Hoàng",
      date: "2026-11-01",
      size: "2.1 MB",
      type: "PDF",
      content:
        "TÓM TẮT CHƯƠNG 3 - NGUYÊN HÀM & TÍCH PHÂN XÁC ĐỊNH\n1. Bảng nguyên hàm cơ bản & đổi biến loại 1, loại 2.\n2. Tích phân từng phần theo quy tắc LIATE.\n3. Tích phân phân thức hữu tỷ (tách phân thức đơn giản).\n4. Tích phân hàm lượng giác & vô tỷ.\n5. Công thức Newton-Leibniz & Đạo hàm hàm tích phân cận biến.",
    },
  ],
  "gt-c4": [
    {
      id: "doc-4",
      title: "GT1_Chuong4_ChuoiSo_ChuoiLuyThua_Taylor.pdf",
      uploader: "Hồ Đắc Anh Khoa",
      date: "2026-11-08",
      size: "1.8 MB",
      type: "PDF",
      content:
        "TÓM TẮT CHƯƠNG 4 - CHUỖI SỐ & CHUỖI LŨY THỪA\n1. Điều kiện cần & chuỗi hình học, chuỗi Riemann p-series.\n2. Tiêu chuẩn so sánh, D'Alembert, Cauchy & Leibniz.\n3. Hội tụ tuyệt đối & bán hội tụ.\n4. Chuỗi hàm & tiêu chuẩn hội tụ đều Weierstrass.\n5. Bán kính hội tụ chuỗi lũy thừa & khai triển Taylor-Maclaurin.",
    },
  ],
  "dstt-c5": [
    {
      id: "doc-5",
      title: "COMP1800_Chuong5_MaTran_DinhThuc_GaussJordan.pdf",
      uploader: "Vũ Huy Hoàng",
      date: "2026-11-10",
      size: "1.9 MB",
      type: "PDF",
      content:
        "TÓM TẮT CHƯƠNG 5 - MA TRẬN & ĐỊNH THỨC\n1. Các phép toán ma trận & ma trận chuyển vị.\n2. Định thức cấp 2, cấp 3 (Sarrus) & khai triển Laplace.\n3. Tính chất định thức & tính định thức bằng biến đổi sơ cấp.\n4. Ma trận nghịch đảo (phần phụ đại số & Gauss-Jordan).\n5. Hạng ma trận bằng khử Gauss.",
    },
  ],
  "dstt-c6": [
    {
      id: "doc-6",
      title: "COMP1800_Chuong6_HePhuongTrinhTuyenTinh.pdf",
      uploader: "Hồ Đắc Anh Khoa",
      date: "2026-11-14",
      size: "1.5 MB",
      type: "PDF",
      content:
        "TÓM TẮT CHƯƠNG 6 - HỆ PHƯƠNG TRÌNH TUYẾN TÍNH\n1. Hệ Cramer & công thức nghiệm duy nhất.\n2. Phương pháp khử Gauss & Gauss-Jordan.\n3. Định lý Kronecker-Capelli biện luận nghiệm.\n4. Hệ phương trình tuyến tính thuần nhất & không gian nghiệm.\n5. Cấu trúc nghiệm tổng quát của hệ không thuần nhất.",
    },
  ],
  "dstt-c7": [
    {
      id: "doc-7",
      title: "COMP1800_Chuong7_KhongGianVector_AXTT_Euclide.pdf",
      uploader: "Vũ Huy Hoàng",
      date: "2026-11-18",
      size: "2.3 MB",
      type: "PDF",
      content:
        "TÓM TẮT CHƯƠNG 7 - KHÔNG GIAN VECTOR, ÁNH XẠ TUYẾN TÍNH & EUCLIDE\n1. Không gian vector & tiêu chuẩn chứng minh không gian con.\n2. Tổ hợp tuyến tính, ĐLTT, PTTT, hệ sinh.\n3. Cơ sở, số chiều, tọa độ & ma trận đổi cơ sở.\n4. Ánh xạ tuyến tính, Ker(f), Im(f), định lý số chiều.\n5. Tích vô hướng & trực giao hóa Gram-Schmidt.",
    },
  ],
};

const DEFAULT_FORUM_POSTS = [
  {
    id: "post-1",
    author: "Vũ Huy Hoàng",
    role: "admin",
    topicTag: "GT1 • Chương 1",
    title: "Lưu ý khi thay vô cùng bé tương đương trong phép cộng/trừ!",
    content:
      "Anh em chú ý khi tính $\\lim_{x \\to 0} \\frac{\\tan x - \\sin x}{x^3}$ tuyệt đối không được thay $\\tan x \\sim x$ và $\\sin x \\sim x$ rồi trừ ra $0$ nha, phải khai triển Taylor tới bậc 3 mới đúng!",
    time: "Hôm nay, 21:15",
    likes: 14,
    replies: [
      {
        author: "Hồ Đắc Anh Khoa",
        role: "admin",
        text: "Chuẩn luôn, bài này dùng Taylor $\\tan x = x + \\frac{x^3}{3} + o(x^3)$ và $\\sin x = x - \\frac{x^3}{6} + o(x^3)$ ra ngay đáp án $\\frac{1}{2}$.",
      },
    ],
  },
  {
    id: "post-2",
    author: "Hồ Đắc Anh Khoa",
    role: "admin",
    topicTag: "ĐSTT • Chương 7",
    title: "Mẹo nhớ thứ tự nhân ma trận đổi cơ sở $P_{C \\leftarrow B}$",
    content:
      "Nhiều bạn hay bị lộn giữa $P_B^{-1}P_C$ với $P_C^{-1}P_B$. Cứ nhìn mũi tên $C \\leftarrow B$ thì thằng đứng trước dấu mũi tên ($C$) sẽ bị nghịch đảo đứng trước: $P_{C \\leftarrow B} = P_C^{-1}P_B$.",
    time: "Hôm nay, 22:05",
    likes: 11,
    replies: [],
  },
];

/* ==========================================================================
   1. TIỆN ÍCH CHUNG (TOAST, ESCAPE HTML, KATEX RENDER, THEME, NAV)
   ========================================================================== */
function escapeHTML(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function showToast(message, type = "info") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

function renderMath(targetEl = document.body) {
  if (!targetEl) return;
  const doRender = () => {
    if (typeof renderMathInElement === "function") {
      renderMathInElement(targetEl, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
        ],
        throwOnError: false,
      });
      return true;
    }
    return false;
  };
  if (!doRender()) setTimeout(doRender, 150);
}

function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  const btn = document.getElementById("theme-toggle-btn");
  if (btn) {
    btn.textContent = savedTheme === "dark" ? "☀️" : "🌙";
    btn.addEventListener("click", () => {
      const next =
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "light"
          : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem(STORAGE_KEYS.THEME, next);
      btn.textContent = next === "dark" ? "☀️" : "🌙";
      if (typeof runCalculusLab === "function") runCalculusLab();
      if (typeof drawMathGraph === "function") drawMathGraph();
    });
  }
}

function initNavigation() {
  const hamburger = document.getElementById("hamburger-btn");
  const navLinks = document.getElementById("nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () =>
      navLinks.classList.toggle("open"),
    );
  }

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) link.classList.add("active");
  });

  const user = getCurrentUser();
  const authNavBtn = document.getElementById("nav-auth-btn");
  if (authNavBtn) {
    if (user) {
      authNavBtn.textContent = `${isAdminUser(user) ? "👑" : "👤"} ${user.name.split(" ").pop()}`;
      authNavBtn.classList.remove("btn-primary");
      authNavBtn.classList.add("btn-outline");
    } else {
      authNavBtn.textContent = "Đăng nhập";
    }
  }
}

function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );
  reveals.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   2. HỆ THỐNG XP KINH NGHIỆM & THỐNG KÊ ĐÚNG/SAI
   ========================================================================== */
function getProgress() {
  const fallback = {
    xp: 0,
    solvedExercises: 0,
    questionStats: {},
    topicStats: {},
  };
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROGRESS));
    if (!parsed || typeof parsed !== "object") return fallback;
    return {
      xp: Number(parsed.xp) || 0,
      solvedExercises: Number(parsed.solvedExercises) || 0,
      questionStats:
        parsed.questionStats && typeof parsed.questionStats === "object"
          ? parsed.questionStats
          : {},
      topicStats:
        parsed.topicStats && typeof parsed.topicStats === "object"
          ? parsed.topicStats
          : {},
    };
  } catch {
    return fallback;
  }
}

function saveProgress(prog) {
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(prog));
  renderXPWidget();
  renderCommunityHub();
}

function getLevelInfo(xp) {
  const safeXp = Number(xp) || 0;
  const levels = [
    { level: 1, title: "Tân binh Giải tích", min: 0, max: 100 },
    { level: 2, title: "Người giải mã Ma trận", min: 100, max: 250 },
    { level: 3, title: "Cao thủ Vi tích phân", min: 250, max: 500 },
    { level: 4, title: "Bậc thầy Tuyến tính", min: 500, max: 900 },
    { level: 5, title: "Chiến thần Toán học HCMUE", min: 900, max: 2000 },
  ];
  let current = levels[0];
  for (const lv of levels) if (safeXp >= lv.min) current = lv;
  const percent = Math.min(
    100,
    Math.max(
      0,
      Math.round(((safeXp - current.min) / (current.max - current.min)) * 100),
    ),
  );
  return { ...current, percent };
}

function addXP(amount, reason = "") {
  const prog = getProgress();
  const oldLv = getLevelInfo(prog.xp).level;
  prog.xp = (Number(prog.xp) || 0) + amount;
  const newInfo = getLevelInfo(prog.xp);
  saveProgress(prog);

  if (newInfo.level > oldLv) {
    showToast(
      `🎉 THĂNG CẤP ${newInfo.level}: ${newInfo.title}! (+${amount} XP)`,
      "success",
    );
  } else if (reason) {
    showToast(`+${amount} XP (${reason})`, "success");
  }
}

function renderXPWidget() {
  const container = document.getElementById("xp-progress-banner");
  if (!container) return;

  const prog = getProgress();
  const info = getLevelInfo(prog.xp);
  let totalCorrect = 0;
  let totalWrong = 0;
  Object.values(prog.topicStats || {}).forEach((st) => {
    totalCorrect += st.correct || 0;
    totalWrong += st.wrong || 0;
  });

  const totalAttempts = totalCorrect + totalWrong;
  const accuracy =
    totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
  const weakCount = Object.values(prog.questionStats || {}).filter(
    (q) => (q.wrong || 0) > (q.correct || 0),
  ).length;

  container.style.display = "flex";
  container.style.flexWrap = "wrap";
  container.style.alignItems = "center";
  container.style.justifyContent = "space-between";
  container.style.gap = "16px";
  container.style.padding = "16px 20px";
  container.style.marginBottom = "20px";
  container.style.borderRadius = "16px";
  container.style.background = "var(--bg-surface)";
  container.style.border = "1px solid var(--border-color)";
  container.style.boxShadow = "var(--shadow-sm)";

  container.innerHTML = `
    <div style="display:flex; align-items:center; gap:14px;">
      <div style="width:46px; height:46px; border-radius:12px; background:linear-gradient(135deg, var(--primary), var(--secondary)); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:1.1rem; flex-shrink:0;">
        Lv.${info.level}
      </div>
      <div>
        <div style="font-weight:800; font-size:1rem;">${info.title} <span style="color:var(--primary); font-family:var(--font-mono);">(${prog.xp} XP)</span></div>
        <div style="display:flex; align-items:center; gap:10px; margin-top:4px;">
          <div class="xp-bar-track" style="width:150px; height:8px; border-radius:999px; background:var(--bg-surface-alt); overflow:hidden;">
            <div class="xp-bar-fill" style="width:${info.percent}%; height:100%; background:linear-gradient(90deg, var(--primary), var(--secondary)); border-radius:999px;"></div>
          </div>
          <span style="font-size:0.78rem; color:var(--text-muted);">${prog.xp}/${info.max} XP</span>
        </div>
      </div>
    </div>

    <div style="display:flex; flex-wrap:wrap; align-items:center; gap:12px;">
      <div style="font-size:0.86rem;">
        ✅ Đúng: <strong style="color:var(--success);">${totalCorrect}</strong> •
        ❌ Sai: <strong style="color:var(--danger);">${totalWrong}</strong> •
        🎯 Chính xác: <strong>${accuracy}%</strong>
      </div>
      <a href="products.html#community-hub" class="btn btn-sm btn-outline">🏆 BXH &amp; Diễn đàn</a>
      ${
        weakCount > 0
          ? `<button class="btn btn-sm btn-danger" onclick="openAdaptiveReviewModal()">🔥 Ôn ${weakCount} câu hay sai</button>`
          : `<span class="badge badge-easy">✨ Phong độ tốt</span>`
      }
    </div>
  `;
}

/* ==========================================================================
   3. KHO TÀI LIỆU TỪNG CHƯƠNG & PHÂN QUYỀN ADMIN (HOÀNG & KHOA)
   ========================================================================== */
function isAdminUser(user = getCurrentUser()) {
  if (!user) return false;
  const adminMSSVs = ["52.01.104.124", "52.01.104.042"];
  const adminEmails = [
    "52.01.104.124@student.hcmue.edu.vn",
    "52.01.104.042@student.hcmue.edu.vn",
  ];
  return (
    user.role === "admin" ||
    adminMSSVs.includes((user.studentId || "").trim()) ||
    adminEmails.includes((user.email || "").trim().toLowerCase())
  );
}

function getAllDocuments() {
  const raw = localStorage.getItem(STORAGE_KEYS.DOCS);
  if (!raw) {
    localStorage.setItem(STORAGE_KEYS.DOCS, JSON.stringify(DEFAULT_DOCUMENTS));
    return JSON.parse(JSON.stringify(DEFAULT_DOCUMENTS));
  }
  try {
    return JSON.parse(raw);
  } catch {
    return JSON.parse(JSON.stringify(DEFAULT_DOCUMENTS));
  }
}

function saveAllDocuments(docsMap) {
  localStorage.setItem(STORAGE_KEYS.DOCS, JSON.stringify(docsMap));
}

function renderChapterDocumentsHTML(topicId) {
  const docsMap = getAllDocuments();
  const list = docsMap[topicId] || [];
  const admin = isAdminUser();

  const itemsHTML =
    list.length === 0
      ? `<p style="font-size:0.9rem; color:var(--text-muted);">Chưa có tài liệu đính kèm cho chương này.</p>`
      : list
          .map(
            (doc) => `
        <div class="doc-item">
          <div class="doc-info">
            <div class="doc-icon">📄</div>
            <div style="min-width:0;">
              <div class="doc-title" title="${escapeHTML(doc.title)}">${escapeHTML(doc.title)}</div>
              <div class="doc-meta">Đăng bởi: <strong>${escapeHTML(doc.uploader)}</strong> • ${doc.date} • ${doc.size || doc.type}</div>
            </div>
          </div>
          <div style="display:flex; gap:6px; flex-shrink:0;">
            <button class="btn btn-sm btn-outline" onclick="downloadOrViewDocument('${topicId}', '${doc.id}')">⬇️ Xem / Tải</button>
            ${admin ? `<button class="btn btn-sm btn-danger" onclick="deleteChapterDocument('${topicId}', '${doc.id}')">🗑️</button>` : ""}
          </div>
        </div>
      `,
          )
          .join("");

  const uploadFormHTML = admin
    ? `
      <div class="admin-upload-box">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; flex-wrap:wrap; gap:6px;">
          <strong style="color:var(--primary); font-size:0.92rem;">👑 Bảng điều khiển Admin: Cập nhật tài liệu chương này</strong>
          <span class="badge badge-admin">Admin: ${escapeHTML(getCurrentUser().name)}</span>
        </div>
        <form onsubmit="handleUploadDocument(event, '${topicId}')">
          <div class="grid-2" style="gap:10px; margin-bottom:10px;">
            <input type="text" id="doc-upload-title" class="input-control" placeholder="Tên tài liệu (VD: De_Cuong_On_Tap.pdf)" required>
            <input type="file" id="doc-upload-file" class="input-control" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.png,.jpg">
          </div>
          <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
            <input type="url" id="doc-upload-url" class="input-control" placeholder="Hoặc dán link Google Drive / OneDrive (nếu file > 2MB)..." style="flex:1; min-width:220px;">
            <button type="submit" class="btn btn-sm btn-primary">📤 Đăng tài liệu</button>
          </div>
        </form>
      </div>
    `
    : `<div style="margin-top:12px; font-size:0.82rem; color:var(--text-muted);">🔒 <em>Chỉ tài khoản Admin (Vũ Huy Hoàng &amp; Hồ Đắc Anh Khoa) mới có quyền tải lên hoặc cập nhật tài liệu mới.</em></div>`;

  return `
    <div class="doc-section" id="unit-docs">
      <h4 style="font-size:1.05rem; margin-bottom:12px;">📂 Tài liệu học tập &amp; Handout (${list.length})</h4>
      ${itemsHTML}
      ${uploadFormHTML}
    </div>
  `;
}

function handleUploadDocument(event, topicId) {
  event.preventDefault();
  if (!isAdminUser()) return;
  const titleInput = document.getElementById("doc-upload-title").value.trim();
  const fileInput = document.getElementById("doc-upload-file");
  const urlInput = document.getElementById("doc-upload-url").value.trim();
  const file = fileInput.files[0];

  if (!file && !urlInput) {
    showToast(
      "Vui lòng chọn file từ máy tính hoặc dán link tài liệu!",
      "error",
    );
    return;
  }

  const user = getCurrentUser();
  const today = new Date().toLocaleDateString("vi-VN");
  const saveNewDoc = (docObj) => {
    const docsMap = getAllDocuments();
    if (!docsMap[topicId]) docsMap[topicId] = [];
    docsMap[topicId].unshift(docObj);
    saveAllDocuments(docsMap);
    showToast("Đã tải lên tài liệu mới thành công!", "success");
    switchStudyTab("lesson");
  };

  if (file) {
    if (file.size > 2.5 * 1024 * 1024) {
      showToast(
        "File > 2.5MB! Hãy up lên Google Drive rồi dán link vào ô bên cạnh nhé.",
        "error",
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) =>
      saveNewDoc({
        id: "doc-" + Date.now(),
        title: titleInput || file.name,
        uploader: user.name,
        date: today,
        size: (file.size / 1024).toFixed(1) + " KB",
        type: file.name.split(".").pop().toUpperCase(),
        dataUrl: e.target.result,
      });
    reader.readAsDataURL(file);
  } else {
    saveNewDoc({
      id: "doc-" + Date.now(),
      title: titleInput,
      uploader: user.name,
      date: today,
      size: "Link ngoài",
      type: "URL",
      externalUrl: urlInput,
    });
  }
}

function downloadOrViewDocument(topicId, docId) {
  const docsMap = getAllDocuments();
  const doc = (docsMap[topicId] || []).find((d) => d.id === docId);
  if (!doc) return;
  if (doc.externalUrl) {
    window.open(doc.externalUrl, "_blank");
    return;
  }
  if (doc.dataUrl) {
    const a = document.createElement("a");
    a.href = doc.dataUrl;
    a.download = doc.title;
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast(`Đang tải xuống: ${doc.title}`, "success");
    return;
  }
  const blob = new Blob([doc.content || doc.title], {
    type: "text/plain;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = doc.title.replace(".pdf", "_TomTat.txt");
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  showToast(`Đã tải bản tóm tắt: ${doc.title}`, "success");
}

function deleteChapterDocument(topicId, docId) {
  if (!isAdminUser() || !confirm("Admin xác nhận xóa tài liệu này?")) return;
  const docsMap = getAllDocuments();
  docsMap[topicId] = (docsMap[topicId] || []).filter((d) => d.id !== docId);
  saveAllDocuments(docsMap);
  showToast("Đã xóa tài liệu.", "info");
  switchStudyTab("lesson");
}

/* ==========================================================================
   4. QUẢN LÝ CHUYÊN ĐỀ TOÁN HỌC (CRUD + SEARCH + FILTER + SORT + AI SYNC)
   ========================================================================== */
function getTopics() {
  [
    "mathlab_topics_v1",
    "mathlab_topics_v2",
    "mathlab_topics_v3",
    "mathlab_topics_v4",
  ].forEach((oldKey) => {
    if (localStorage.getItem(oldKey)) localStorage.removeItem(oldKey);
  });

  const defaultMap = new Map(
    (typeof DEFAULT_TOPICS !== "undefined" ? DEFAULT_TOPICS : []).map((dt) => [
      dt.id,
      dt,
    ]),
  );

  let topics;
  let needsCacheHeal = false;
  const raw = localStorage.getItem(STORAGE_KEYS.TOPICS);
  if (!raw) {
    topics = JSON.parse(JSON.stringify(DEFAULT_TOPICS));
    localStorage.setItem(STORAGE_KEYS.TOPICS, JSON.stringify(topics));
  } else {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        topics = parsed.map((t) => {
          const def = defaultMap.get(t.id);
          const merged = def ? { ...def, ...t } : { ...t };
          merged.subject =
            merged.subject === "Giải tích" ? "Giải tích 1" : merged.subject;
          if (def && (!t.previewFormula || t.previewFormula === "undefined")) {
            merged.previewFormula = def.previewFormula;
            needsCacheHeal = true;
          }
          if (def && (!t.bannerGradient || t.bannerGradient === "undefined")) {
            merged.bannerGradient = def.bannerGradient;
            needsCacheHeal = true;
          }
          if (
            def &&
            (!Array.isArray(t.keySummary) || t.keySummary.length === 0)
          ) {
            merged.keySummary = def.keySummary;
            needsCacheHeal = true;
          }
          // Đồng bộ các mục Lý thuyết, Bài tự luận, Quiz mới được AI/cộng đồng nạp vào DEFAULT_TOPICS
          if (def) {
            const syncUnique = (baseList, defList, keyFn) => {
              const res = Array.isArray(baseList) ? [...baseList] : [];
              const seen = new Set(res.map((x) => keyFn(x).trim()));
              (defList || []).forEach((item) => {
                const k = keyFn(item).trim();
                if (k && !seen.has(k)) {
                  seen.add(k);
                  res.push(item);
                }
              });
              return res;
            };
            merged.theory = syncUnique(
              merged.theory,
              def.theory,
              (x) => x.heading || "",
            );
            merged.exercises = syncUnique(
              merged.exercises,
              def.exercises,
              (x) => x.question || "",
            );
            merged.quiz = syncUnique(
              merged.quiz,
              def.quiz,
              (x) => x.question || "",
            );
          }
          return merged;
        });
        if (needsCacheHeal) {
          localStorage.setItem(STORAGE_KEYS.TOPICS, JSON.stringify(topics));
        }
      } else {
        topics = JSON.parse(JSON.stringify(DEFAULT_TOPICS));
      }
    } catch {
      topics = JSON.parse(JSON.stringify(DEFAULT_TOPICS));
    }
  }

  // Đồng bộ thêm các chương do Pike Man AI biên soạn vào danh sách hiển thị
  try {
    const aiCustom = JSON.parse(
      localStorage.getItem("mathlab_ai_custom_topics_v8") || "[]",
    );
    aiCustom.forEach((ct) => {
      if (!topics.some((t) => t.id === ct.id)) {
        topics.push(ct);
      }
    });
  } catch (_) {}

  return topics;
}

function saveTopics(topics) {
  localStorage.setItem(STORAGE_KEYS.TOPICS, JSON.stringify(topics));
}

function resetDefaultTopics() {
  if (
    confirm("Khôi phục lại 7 chuyên đề gốc của giáo trình Giải tích 1 & ĐSTT?")
  ) {
    localStorage.removeItem("mathlab_ai_custom_topics_v8");
    localStorage.removeItem("mathlab_ai_patched_topics_v8");
    localStorage.setItem(STORAGE_KEYS.TOPICS, JSON.stringify(DEFAULT_TOPICS));
    renderTopicsGrid();
    renderFeaturedTopics();
    showToast("Đã khôi phục dữ liệu 7 chuyên đề chuẩn!", "success");
  }
}

function getLevelBadgeClass(level) {
  if (level === "Cơ bản") return "badge-easy";
  if (level === "Trung bình") return "badge-medium";
  return "badge-hard";
}

function createTopicCardHTML(topic, showAdminControls = true) {
  const subjectBadge =
    topic.subject === "Giải tích 1" ? "badge-calc" : "badge-linalg";
  const prog = getProgress();
  const tStat = (prog.topicStats || {})[topic.id];
  let statusBadge = "";
  if (tStat) {
    statusBadge =
      (tStat.wrong || 0) > (tStat.correct || 0)
        ? `<span class="badge badge-weak">⚠️ Cần ôn lại</span>`
        : (tStat.correct || 0) > 0
          ? `<span class="badge badge-easy">✅ Đã nắm vững</span>`
          : "";
  }

  const safeFormula =
    topic.previewFormula && topic.previewFormula !== "undefined"
      ? topic.previewFormula
      : "$$f(x)$$";

  const adminBtns = showAdminControls
    ? `<div style="display:flex; gap:6px;">
        <button class="btn btn-sm btn-outline" onclick="openTopicFormModal('${topic.id}')" title="Sửa chuyên đề">✏️</button>
        <button class="btn btn-sm btn-danger" onclick="deleteTopic('${topic.id}')" title="Xóa chuyên đề">🗑️</button>
       </div>`
    : "";

  return `
    <article class="topic-card">
      <div class="topic-banner" style="background: ${topic.bannerGradient || "linear-gradient(135deg, #2563eb, #0d9488)"};">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="topic-code">${topic.code}</span>
          ${statusBadge}
        </div>
        <div style="font-size:0.84rem; opacity:0.92; font-weight:600;">
          ${(topic.theory || []).length} phần Lý thuyết • Ví dụ mẫu • Bài tập liền kề
        </div>
      </div>
      <div class="topic-body">
        <div class="topic-meta">
          <span class="badge ${subjectBadge}">${topic.subject}</span>
          <span class="badge ${getLevelBadgeClass(topic.level)}">${topic.level}</span>
        </div>
        <h3 class="topic-title">${topic.title}</h3>
        <p class="topic-summary">${topic.summary}</p>
        <div class="topic-formula-preview">${safeFormula}</div>
      </div>
      <div class="topic-footer">
        <button class="btn btn-sm btn-primary" onclick="openStudyModal('${topic.id}', 'lesson')">📖 Học bài &amp; Thực hành</button>
        ${adminBtns}
      </div>
    </article>
  `;
}

function renderFeaturedTopics() {
  const container =
    document.getElementById("featured-topics") ||
    document.getElementById("featured-topics-grid");
  if (!container) return;
  const topics = getTopics();
  container.innerHTML = [topics[0], topics[1], topics[4]]
    .filter(Boolean)
    .map((t) => createTopicCardHTML(t, false))
    .join("");
  renderMath(container);
}

function renderTopicsGrid() {
  const container = document.getElementById("topics-grid");
  if (!container) return;

  const searchVal = (document.getElementById("search-topic")?.value || "")
    .toLowerCase()
    .trim();
  const subjectVal = document.getElementById("filter-subject")?.value || "all";
  const levelVal = document.getElementById("filter-level")?.value || "all";
  const sortVal = document.getElementById("sort-topic")?.value || "default";

  let topics = getTopics();
  if (searchVal) {
    topics = topics.filter(
      (t) =>
        t.title.toLowerCase().includes(searchVal) ||
        t.summary.toLowerCase().includes(searchVal) ||
        t.code.toLowerCase().includes(searchVal),
    );
  }
  if (subjectVal !== "all")
    topics = topics.filter((t) => t.subject === subjectVal);
  if (levelVal !== "all") topics = topics.filter((t) => t.level === levelVal);
  if (sortVal === "title-asc")
    topics.sort((a, b) => a.title.localeCompare(b.title, "vi"));
  if (sortVal === "title-desc")
    topics.sort((a, b) => b.title.localeCompare(a.title, "vi"));

  const countEl = document.getElementById("topic-count-label");
  if (countEl) countEl.textContent = `Hiển thị ${topics.length} chuyên đề`;

  if (topics.length === 0) {
    container.innerHTML = `<div class="card" style="grid-column: 1 / -1; text-align:center; padding: 48px 20px;"><h3>Không tìm thấy chuyên đề phù hợp</h3><button class="btn btn-outline" style="margin-top:12px;" onclick="clearTopicFilters()">Xóa bộ lọc</button></div>`;
    return;
  }

  container.innerHTML = topics
    .map((t) => createTopicCardHTML(t, true))
    .join("");
  renderMath(container);
  if (typeof window.refreshMathLabProgress === "function") {
    window.refreshMathLabProgress();
  }
}

function clearTopicFilters() {
  if (document.getElementById("search-topic"))
    document.getElementById("search-topic").value = "";
  if (document.getElementById("filter-subject"))
    document.getElementById("filter-subject").value = "all";
  if (document.getElementById("filter-level"))
    document.getElementById("filter-level").value = "all";
  if (document.getElementById("sort-topic"))
    document.getElementById("sort-topic").value = "default";
  renderTopicsGrid();
}

function deleteTopic(id) {
  if (!confirm("Bạn có chắc muốn xóa chuyên đề này?")) return;
  saveTopics(getTopics().filter((t) => t.id !== id));
  renderTopicsGrid();
  renderFeaturedTopics();
  showToast("Đã xóa chuyên đề.", "info");
}

function openTopicFormModal(editId = null) {
  const modal = document.getElementById("topic-form-modal");
  if (!modal) return;
  document.getElementById("topic-crud-form").reset();
  document.getElementById("edit-topic-id").value = editId || "";

  if (editId) {
    const topic = getTopics().find((t) => t.id === editId);
    if (topic) {
      document.getElementById("topic-form-title").textContent =
        "Chỉnh sửa Chuyên đề Toán";
      document.getElementById("input-topic-code").value = topic.code;
      document.getElementById("input-topic-subject").value = topic.subject;
      document.getElementById("input-topic-level").value = topic.level;
      document.getElementById("input-topic-title").value = topic.title;
      document.getElementById("input-topic-summary").value = topic.summary;
      document.getElementById("input-topic-formula").value =
        topic.previewFormula || "";
    }
  } else {
    document.getElementById("topic-form-title").textContent =
      "Thêm Chuyên đề Toán Mới";
  }
  modal.classList.add("open");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("open");
  if (activeExamTimer) {
    clearInterval(activeExamTimer);
    activeExamTimer = null;
  }
  if (!document.querySelector(".modal-backdrop.open")) {
    document.body.style.overflow = "";
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-backdrop.open").forEach((m) => {
      m.classList.remove("open");
    });
    if (activeExamTimer) {
      clearInterval(activeExamTimer);
      activeExamTimer = null;
    }
    document.body.style.overflow = "";
  }
});

function handleSaveTopic(event) {
  event.preventDefault();
  const editId = document.getElementById("edit-topic-id").value;
  const code =
    document.getElementById("input-topic-code").value.trim() || "CHƯƠNG MỚI";
  const subject = document.getElementById("input-topic-subject").value;
  const level = document.getElementById("input-topic-level").value;
  const title = document.getElementById("input-topic-title").value.trim();
  const summary = document.getElementById("input-topic-summary").value.trim();
  const previewFormula =
    document.getElementById("input-topic-formula").value.trim() ||
    "$$f(x) = \\int_a^b g(t)\\,dt$$";

  const topics = getTopics();
  const gradient =
    subject === "Giải tích 1"
      ? "linear-gradient(135deg, #2563eb 0%, #0284c7 100%)"
      : "linear-gradient(135deg, #0d9488 0%, #059669 100%)";

  if (editId) {
    const idx = topics.findIndex((t) => t.id === editId);
    if (idx !== -1)
      topics[idx] = {
        ...topics[idx],
        code,
        subject,
        level,
        title,
        summary,
        previewFormula,
        bannerGradient: gradient,
      };
    showToast("Đã cập nhật chuyên đề!", "success");
  } else {
    topics.unshift({
      id: "custom-" + Date.now(),
      code,
      subject,
      level,
      title,
      summary,
      previewFormula,
      bannerGradient: gradient,
      theory: [
        {
          heading: "1. Kiến thức trọng tâm",
          content: summary + "<br><br>" + previewFormula,
        },
      ],
      exercises: [
        {
          level: "Vừa",
          question: `Vận dụng ${previewFormula} để giải bài tập thuộc "${title}".`,
          solution: "Áp dụng trực tiếp định lý trong phần lý thuyết.",
        },
      ],
      quiz: [
        {
          question: `Chuyên đề "${title}" thuộc học phần nào?`,
          options: [subject, "Vật lý đại cương", "Triết học", "Kinh tế học"],
          answer: 0,
          explanation: `Thuộc học phần ${subject}.`,
        },
      ],
    });
    showToast("Đã thêm chuyên đề mới!", "success");
  }

  saveTopics(topics);
  closeModal("topic-form-modal");
  renderTopicsGrid();
  renderFeaturedTopics();
}

/* ==========================================================================
   5. MODAL HỌC TẬP HỢP NHẤT: LÝ THUYẾT -> VÍ DỤ MẪU -> BÀI TẬP CÙNG 1 CHỖ
   ========================================================================== */
let activeStudyTopicId = null;

function toggleStudyWideMode() {
  const modal = document.getElementById("study-modal");
  const btn = document.getElementById("study-wide-toggle-btn");
  if (!modal) return;
  const isWide = modal.classList.toggle("study-ultra-wide");
  if (btn) {
    btn.innerHTML = isWide ? "📖 Khung đọc chuẩn" : "🖥️ Mở rộng tối đa";
  }
}

function scrollStudyModalTop() {
  const wrapper =
    document.getElementById("study-modal-body-wrapper") ||
    document.querySelector("#study-modal .modal-body");
  if (wrapper) wrapper.scrollTo({ top: 0, behavior: "smooth" });
}

function openStudyModal(topicId, tab = "lesson") {
  const topic = getTopics().find((t) => t.id === topicId);
  const modal = document.getElementById("study-modal");
  if (!topic || !modal) return;

  activeStudyTopicId = topicId;
  if (typeof EXAM_BANK !== "undefined" && EXAM_BANK[topicId]) {
    activeExamId = topicId;
  }
  document.getElementById("study-modal-code").textContent =
    `${topic.code} • ${topic.subject} • ${topic.level}`;
  document.getElementById("study-modal-title").textContent = topic.title;

  const tabBtns = document.querySelectorAll("[data-study-tab]");
  if (tabBtns.length >= 2) {
    tabBtns[0].setAttribute("data-study-tab", "lesson");
    tabBtns[0].textContent = "📖 Lý thuyết, Ví dụ & Bài tập";
    tabBtns[1].setAttribute("data-study-tab", "quiz");
    tabBtns[1].textContent = "🎯 Quiz Thích ứng & XP";
    if (tabBtns[2]) {
      tabBtns[2].style.display = "";
      tabBtns[2].setAttribute("data-study-tab", "exam");
      tabBtns[2].textContent = "⏱️ Phòng Thi & AI Chấm Ảnh";
    }
  }

  switchStudyTab(tab === "quiz" ? "quiz" : tab === "exam" ? "exam" : "lesson");
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  const wrapper =
    document.getElementById("study-modal-body-wrapper") ||
    document.querySelector("#study-modal .modal-body");
  if (wrapper) wrapper.scrollTop = 0;
}

function regenerateSingleSectionExercise(secIdx) {
  if (typeof generateSectionExercise !== "function" || !activeStudyTopicId)
    return;
  const newEx = generateSectionExercise(activeStudyTopicId, secIdx);
  const qBox = document.getElementById(`sec-ex-q-${secIdx}`);
  const solBox = document.getElementById(`sec-ex-sol-${secIdx}`);
  if (qBox && solBox && newEx) {
    const stepsHTML = (newEx.rubric || [])
      .map(
        (r) =>
          `<div class="rubric-step"><span class="rubric-tag">${r.step}</span> ${r.detail}</div>`,
      )
      .join("");
    const trapHTML = newEx.trap
      ? `<div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> ${newEx.trap}</div>`
      : "";
    qBox.innerHTML = newEx.question;
    solBox.innerHTML = `<div class="rubric-box">${stepsHTML}${trapHTML}</div>`;
    renderMath(qBox);
    renderMath(solBox);
    showToast(`🔄 Đã đổi bài tập mới cho Phần ${secIdx + 1}!`, "info");
  }
}

function markExerciseSolved(btn, topicId = activeStudyTopicId, secIdx = null) {
  if (btn.disabled) return;
  btn.disabled = true;
  btn.textContent = "✅ Đã hoàn thành (+15 XP)";
  btn.classList.remove("btn-primary");
  btn.classList.add("btn-outline");

  // 1. Lưu vĩnh viễn trạng thái vào mathlab_completed_sections_v1
  const topic = getTopics().find(
    (t) => t.id === (topicId || activeStudyTopicId),
  );
  if (topic && secIdx !== null) {
    const secKey =
      typeof secIdx === "string" && secIdx.startsWith("extra-")
        ? `chap_${topic.title}::${secIdx}`
        : `chap_${topic.title}::unit-sec-${secIdx}`;

    try {
      const completedSections = JSON.parse(
        localStorage.getItem("mathlab_completed_sections_v1") || "{}",
      );
      completedSections[secKey] = true;

      if (typeof secIdx === "string" && secIdx.startsWith("extra-")) {
        const extraTotal = Math.max(
          0,
          (topic.exercises?.length || 0) - (topic.theory?.length || 0),
        );
        let allExtraDone = extraTotal > 0;
        for (let k = 0; k < extraTotal; k++) {
          if (!completedSections[`chap_${topic.title}::extra-${k}`]) {
            allExtraDone = false;
            break;
          }
        }
        if (allExtraDone) {
          completedSections[`chap_${topic.title}::unit-extra`] = true;
          const extraPill = document.querySelector(
            `.ml-sec-pill[data-target-id="unit-extra"]`,
          );
          if (extraPill) extraPill.classList.add("is-done");
        }
      }

      localStorage.setItem(
        "mathlab_completed_sections_v1",
        JSON.stringify(completedSections),
      );
    } catch (_) {}

    // 2. Đồng bộ ngay ra thanh tiến độ (%) trên thẻ Card ngoài trang chủ
    if (typeof window.refreshMathLabProgress === "function") {
      window.refreshMathLabProgress();
    } else if (window.MathLabUpgrades?.injectProgressBarsOnCards) {
      window.MathLabUpgrades.injectProgressBarsOnCards();
    }

    // 3. Cập nhật ngay ô số mục lục bên phải modal chuyển màu xanh
    const pill = document.querySelector(
      `.ml-sec-pill[data-target-id="unit-sec-${secIdx}"]`,
    );
    if (pill) pill.classList.add("is-done");
    const badge = document.getElementById("ml-sidebar-progress-badge");
    if (badge) {
      const totalPills = document.querySelectorAll(".ml-sec-pill").length;
      const donePills = document.querySelectorAll(
        ".ml-sec-pill.is-done",
      ).length;
      badge.textContent = `${donePills}/${totalPills} xong`;
    }
  }

  // 4. Cộng XP và lưu hồ sơ người dùng
  const prog = getProgress();
  prog.solvedExercises = (prog.solvedExercises || 0) + 1;
  saveProgress(prog);
  addXP(15, "Hoàn thành bài tập tự luận");
}

function switchStudyTab(tab) {
  const topic = getTopics().find((t) => t.id === activeStudyTopicId);
  const body = document.getElementById("study-modal-body");
  if (!topic || !body) return;

  document.querySelectorAll("[data-study-tab]").forEach((btn) => {
    const isMatch = btn.getAttribute("data-study-tab") === tab;
    btn.classList.toggle("btn-primary", isMatch);
    btn.classList.toggle("btn-outline", !isMatch);
  });

  if (tab === "lesson") {
    const jumpPills = topic.theory
      .map(
        (item, idx) =>
          `<button type="button" class="btn btn-sm btn-outline" onclick="document.getElementById('unit-sec-${idx}').scrollIntoView({behavior:'smooth'})">Phần ${idx + 1}</button>`,
      )
      .join("");

    const unitsHTML = topic.theory
      .map((item, idx) => {
        let exampleHTML = "";
        if (item.checkpoint) {
          const exSteps = (item.checkpoint.rubric || [])
            .map(
              (r) =>
                `<div class="rubric-step"><span class="rubric-tag">${r.step}</span> ${r.detail}</div>`,
            )
            .join("");
          const exTrap = item.checkpoint.trap
            ? `<div class="rubric-trap">⚠️ <b>Lưu ý trình bày tự luận:</b> ${item.checkpoint.trap}</div>`
            : "";

          exampleHTML = `
            <div class="sub-block-example">
              <div class="sub-label" style="color:#d97706;">💡 II. Ví dụ minh họa mẫu (Chuẩn giáo trình)</div>
              <p style="font-weight:600; margin-bottom:8px;">${item.checkpoint.question}</p>
              <button type="button" class="btn btn-sm btn-outline" onclick="toggleSolution('ex-demo-${idx}')">📖 Xem / Ẩn lời giải mẫu</button>
              <div class="solution-box open" id="ex-demo-${idx}">
                <div class="rubric-box">${exSteps}${exTrap}</div>
              </div>
            </div>
          `;
        }

        const pairedEx = topic.exercises[idx] || topic.exercises[0];
        // Đọc trạng thái đã giải trước đó từ storage
        let isDone = false;
        try {
          const savedMap = JSON.parse(
            localStorage.getItem("mathlab_completed_sections_v1") || "{}",
          );
          isDone = !!savedMap[`chap_${topic.title}::unit-sec-${idx}`];
        } catch (_) {}

        const practiceHTML = pairedEx
          ? `
            <div class="sub-block-practice">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
                <span class="sub-label" style="color:var(--secondary); margin-bottom:0;">✍️ III. Bài tập thực hành Phần ${idx + 1}</span>
                <div style="display:flex; gap:6px; align-items:center;">
                  <span class="badge ${pairedEx.level === "Khó" ? "badge-hard" : "badge-medium"}">${pairedEx.level}</span>
                  <button type="button" class="btn btn-sm btn-outline" onclick="regenerateSingleSectionExercise(${idx})">🔄 Đổi số liệu</button>
                </div>
              </div>
              <p id="sec-ex-q-${idx}" style="font-weight:600; margin-bottom:10px;">${pairedEx.question}</p>
              <div style="display:flex; flex-wrap:wrap; gap:8px;">
                <button type="button" class="btn btn-sm btn-outline" onclick="toggleSolution('sec-ex-sol-${idx}')">👁️ Xem Barem chấm tự luận</button>
                ${
                  isDone
                    ? `<button type="button" class="btn btn-sm btn-outline" disabled>✅ Đã hoàn thành (+15 XP)</button>`
                    : `<button type="button" class="btn btn-sm btn-primary" onclick="markExerciseSolved(this, '${topic.id}', ${idx})">✔️ Đã tự giải xong (+15 XP)</button>`
                }
              </div>
              <div class="solution-box" id="sec-ex-sol-${idx}">
                ${pairedEx.solution}
              </div>
            </div>
          `
          : "";

        return `
          <div class="unit-block" id="unit-sec-${idx}">
            <div class="unit-header">${item.heading}</div>
            <div class="sub-block-theory">
              <div class="sub-label" style="color:var(--primary);">📘 I. Lý thuyết &amp; Công thức trọng tâm</div>
              <div>${item.content}</div>
            </div>
            ${exampleHTML}
            ${practiceHTML}
          </div>
        `;
      })
      .join("");

    const extraExercises = topic.exercises.slice(topic.theory.length);
    let savedExtraMap = {};
    try {
      savedExtraMap = JSON.parse(
        localStorage.getItem("mathlab_completed_sections_v1") || "{}",
      );
    } catch (_) {}

    const extraHTML =
      extraExercises.length > 0
        ? `
          <div class="unit-block" id="unit-extra">
            <div class="unit-header">🏆 Bài tập tổng hợp nâng cao cuối chương</div>
            ${extraExercises
              .map((ex, eIdx) => {
                const isExtraDone =
                  !!savedExtraMap[`chap_${topic.title}::extra-${eIdx}`];
                return `
              <div class="sub-block-practice" style="margin-bottom:12px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                  <strong>Bài tổng hợp ${eIdx + 1}</strong>
                  <span class="badge badge-hard">${ex.level}</span>
                </div>
                <p style="font-weight:600; margin-bottom:10px;">${ex.question}</p>
                <div style="display:flex; flex-wrap:wrap; gap:8px;">
                  <button type="button" class="btn btn-sm btn-outline" onclick="toggleSolution('extra-sol-${eIdx}')">👁️ Xem Barem chấm tự luận</button>
                  ${
                    isExtraDone
                      ? `<button type="button" class="btn btn-sm btn-outline" disabled>✅ Đã hoàn thành (+15 XP)</button>`
                      : `<button type="button" class="btn btn-sm btn-primary" onclick="markExerciseSolved(this, '${topic.id}', 'extra-${eIdx}')">✔️ Đã tự giải xong (+15 XP)</button>`
                  }
                </div>
                <div class="solution-box" id="extra-sol-${eIdx}">${ex.solution}</div>
              </div>
            `;
              })
              .join("")}
          </div>
        `
        : "";

    body.innerHTML = `<div class="study-reading-container">
      <div class="section-jump-bar">
        <span style="font-size:0.84rem; font-weight:700; align-self:center;">Đi nhanh tới:</span>
        ${jumpPills}
        ${topic.exercises.length > topic.theory.length ? `<button type="button" class="btn btn-sm btn-outline" onclick="document.getElementById('unit-extra').scrollIntoView({behavior:'smooth'})">🏆 Bài tổng hợp</button>` : ""}
        <button type="button" class="btn btn-sm btn-outline" onclick="document.getElementById('unit-docs').scrollIntoView({behavior:'smooth'})">📂 Tài liệu</button>
      </div>
      ${unitsHTML}
      ${extraHTML}
      ${renderChapterDocumentsHTML(topic.id)}
    </div>`;
  } else if (tab === "quiz") {
    const prog = getProgress();
    const indexedQuiz = topic.quiz.map((q, origIdx) => {
      const qKey = `${topic.id}_q${origIdx}`;
      const stat = (prog.questionStats || {})[qKey] || { correct: 0, wrong: 0 };
      const priority = (stat.wrong || 0) - (stat.correct || 0);
      return { ...q, origIdx, qKey, stat, priority };
    });
    indexedQuiz.sort((a, b) => b.priority - a.priority);

    body.innerHTML = `<div class="study-reading-container">
      <div style="margin-bottom:14px; font-size:0.95rem; color:var(--text-secondary);">
        🧠 <strong>Chế độ Quiz Thích ứng:</strong> Các câu bạn từng làm sai được tự động đẩy lên đầu để ưu tiên ôn tập và cộng thưởng +40 XP khi sửa đúng.
      </div>
      <form id="quiz-form" onsubmit="submitTopicQuiz(event)">
        ${indexedQuiz
          .map(
            (q, displayIdx) => `
          <div class="exercise-item">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-weight:700;">Câu ${displayIdx + 1}:</span>
              ${
                q.priority > 0
                  ? `<span class="badge badge-weak">🔥 Hay sai (${q.stat.wrong} lần) — Ưu tiên ôn lại</span>`
                  : `<span class="badge badge-calc">Đúng ${q.stat.correct} / Sai ${q.stat.wrong}</span>`
              }
            </div>
            <p style="font-weight:600; margin-bottom:10px;">${q.question}</p>
            ${q.options
              .map(
                (opt, oIdx) => `
              <label class="quiz-option" id="opt-${q.origIdx}-${oIdx}">
                <input type="radio" name="q_${q.origIdx}" value="${oIdx}" required>
                <span>${opt}</span>
              </label>
            `,
              )
              .join("")}
            <div id="quiz-exp-${q.origIdx}" style="display:none; margin-top:10px; padding:10px 12px; border-radius:8px; background:var(--bg-surface-alt); font-size:0.9rem;"></div>
          </div>
        `,
          )
          .join("")}
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:16px; flex-wrap:wrap; gap:10px;">
          <div id="quiz-result-summary" style="font-weight:700;"></div>
          <button type="submit" class="btn btn-primary">✅ Nộp bài &amp; Tích lũy XP</button>
        </div>
      </form>
    </div>`;
  }

  renderMath(body);
}

function toggleSolution(elId) {
  const el = document.getElementById(elId);
  if (el) {
    const isOpening = el.classList.toggle("open");
    if (isOpening && el.dataset.mathRendered !== "1") {
      el.dataset.mathRendered = "1";
      renderMath(el);
    }
  }
}

function submitTopicQuiz(event) {
  event.preventDefault();
  const topic = getTopics().find((t) => t.id === activeStudyTopicId);
  if (!topic) return;

  const prog = getProgress();
  if (!prog.questionStats) prog.questionStats = {};
  if (!prog.topicStats) prog.topicStats = {};
  if (!prog.topicStats[topic.id])
    prog.topicStats[topic.id] = { correct: 0, wrong: 0 };

  let correctCount = 0;
  let earnedXP = 0;

  topic.quiz.forEach((q, origIdx) => {
    const selected = document.querySelector(
      `input[name="q_${origIdx}"]:checked`,
    );
    const chosenVal = selected ? parseInt(selected.value, 10) : -1;
    const qKey = `${topic.id}_q${origIdx}`;
    if (!prog.questionStats[qKey])
      prog.questionStats[qKey] = { correct: 0, wrong: 0 };

    q.options.forEach((_, oIdx) => {
      const label = document.getElementById(`opt-${origIdx}-${oIdx}`);
      label.classList.remove("correct", "wrong");
      if (oIdx === q.answer) label.classList.add("correct");
      else if (oIdx === chosenVal && chosenVal !== q.answer)
        label.classList.add("wrong");
    });

    if (chosenVal === q.answer) {
      correctCount++;
      const wasWeak =
        prog.questionStats[qKey].wrong > prog.questionStats[qKey].correct;
      earnedXP += wasWeak ? 40 : 25;
      prog.questionStats[qKey].correct++;
      prog.topicStats[topic.id].correct++;
    } else {
      earnedXP += 5;
      prog.questionStats[qKey].wrong++;
      prog.topicStats[topic.id].wrong++;
    }

    const expEl = document.getElementById(`quiz-exp-${origIdx}`);
    expEl.style.display = "block";
    expEl.innerHTML = `💡 <strong>Giải thích:</strong> ${q.explanation}`;
    renderMath(expEl);
  });

  saveProgress(prog);
  addXP(
    earnedXP,
    `Hoàn thành Quiz (${correctCount}/${topic.quiz.length} câu đúng)`,
  );
  document.getElementById("quiz-result-summary").innerHTML =
    `Kết quả: <span style="color:var(--primary); font-size:1.05rem;">${correctCount}/${topic.quiz.length} đúng (+${earnedXP} XP)</span>`;
  renderTopicsGrid();
  renderFeaturedTopics();
}

function openAdaptiveReviewModal() {
  const prog = getProgress();
  const topics = getTopics();
  const weakTopicIds = Object.keys(prog.topicStats || {}).filter(
    (tid) =>
      (prog.topicStats[tid].wrong || 0) > (prog.topicStats[tid].correct || 0),
  );
  const targetId = weakTopicIds[0] || topics[0]?.id;
  if (targetId) {
    openStudyModal(targetId, "quiz");
    showToast("Đã mở chương có nhiều câu sai nhất để bạn ôn tập!", "info");
  }
}

/* ==========================================================================
   6. BẢNG XẾP HẠNG XP (LEADERBOARD) & DIỄN ĐÀN THẢO LUẬN BÀI HỌC (FORUM)
   ========================================================================== */
function getForumPosts() {
  const raw = localStorage.getItem(STORAGE_KEYS.FORUM);
  if (!raw) {
    localStorage.setItem(
      STORAGE_KEYS.FORUM,
      JSON.stringify(DEFAULT_FORUM_POSTS),
    );
    return JSON.parse(JSON.stringify(DEFAULT_FORUM_POSTS));
  }
  try {
    return JSON.parse(raw);
  } catch {
    return JSON.parse(JSON.stringify(DEFAULT_FORUM_POSTS));
  }
}

function saveForumPosts(posts) {
  localStorage.setItem(STORAGE_KEYS.FORUM, JSON.stringify(posts));
}

function renderCommunityHub() {
  const hub = document.getElementById("community-hub");
  if (!hub) return;

  const currentUser = getCurrentUser();
  const prog = getProgress();
  const myName = currentUser ? currentUser.name : "Bạn (Khách)";

  const baseBoard = [
    { name: "Vũ Huy Hoàng", role: "admin", xp: 680, solved: 24 },
    { name: "Hồ Đắc Anh Khoa", role: "admin", xp: 640, solved: 22 },
    { name: "Nguyễn Minh Thư", role: "student", xp: 410, solved: 15 },
    { name: "Trần Quốc Bảo", role: "student", xp: 290, solved: 11 },
    { name: "Lê Hoàng Nam", role: "student", xp: 185, solved: 7 },
  ];

  const existingIdx = baseBoard.findIndex((item) => item.name === myName);
  if (existingIdx !== -1) {
    baseBoard[existingIdx].xp = Math.max(baseBoard[existingIdx].xp, prog.xp);
    baseBoard[existingIdx].solved = Math.max(
      baseBoard[existingIdx].solved,
      prog.solvedExercises || 0,
    );
  } else {
    baseBoard.push({
      name: myName,
      role: isAdminUser(currentUser) ? "admin" : "student",
      xp: prog.xp,
      solved: prog.solvedExercises || 0,
    });
  }

  baseBoard.sort((a, b) => b.xp - a.xp);

  const leaderboardHTML = baseBoard
    .map((entry, idx) => {
      const rank = idx + 1;
      const medalClass =
        rank === 1
          ? "rank-1"
          : rank === 2
            ? "rank-2"
            : rank === 3
              ? "rank-3"
              : "";
      const medalIcon =
        rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `#${rank}`;
      const isMe = entry.name === myName;
      const lv = getLevelInfo(entry.xp);

      return `
        <div class="leaderboard-row ${isMe ? "is-me" : ""}">
          <div style="display:flex; align-items:center; gap:12px; min-width:0;">
            <div class="rank-medal ${medalClass}">${medalIcon}</div>
            <div style="min-width:0;">
              <div style="font-weight:800; font-size:0.95rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                ${escapeHTML(entry.name)} ${entry.role === "admin" ? '<span class="badge badge-admin">Admin</span>' : ""} ${isMe ? "(Bạn)" : ""}
              </div>
              <div style="font-size:0.78rem; color:var(--text-muted);">Lv.${lv.level} • ${lv.title} • ${entry.solved} bài tự luận</div>
            </div>
          </div>
          <div style="font-family:var(--font-mono); font-weight:800; color:var(--primary); flex-shrink:0;">
            ${entry.xp} XP
          </div>
        </div>
      `;
    })
    .join("");

  const filterTag = document.getElementById("forum-filter-tag")?.value || "all";
  let posts = getForumPosts();
  if (filterTag !== "all") {
    posts = posts.filter((p) => p.topicTag === filterTag);
  }

  const postsHTML = posts
    .map(
      (p) => `
      <div class="forum-post">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
          <div>
            <strong>${escapeHTML(p.author)}</strong> ${p.role === "admin" ? '<span class="badge badge-admin">👑 Admin</span>' : ""}
            <span style="font-size:0.8rem; color:var(--text-muted);"> • ${escapeHTML(p.time)}</span>
          </div>
          <span class="badge badge-calc">${escapeHTML(p.topicTag)}</span>
        </div>
        <h4 style="margin-bottom:6px; font-size:1.02rem;">${escapeHTML(p.title)}</h4>
        <p style="font-size:0.93rem; color:var(--text-secondary); margin-bottom:12px;">${escapeHTML(p.content)}</p>
        <div style="display:flex; gap:10px; align-items:center;">
          <button type="button" class="btn btn-sm btn-outline" onclick="likeForumPost('${p.id}')">👍 Hữu ích (${p.likes})</button>
          <span style="font-size:0.84rem; color:var(--text-muted);">💬 ${p.replies.length} phản hồi</span>
        </div>

        <div class="forum-reply-list">
          ${p.replies
            .map(
              (rep) => `
            <div class="forum-reply-item">
              <strong>${escapeHTML(rep.author)}</strong> ${rep.role === "admin" ? '<span class="badge badge-admin">👑 Admin</span>' : ""}: ${escapeHTML(rep.text)}
            </div>
          `,
            )
            .join("")}
          <form onsubmit="addForumReply(event, '${p.id}')" style="display:flex; gap:8px; margin-top:8px;">
            <input type="text" id="reply-input-${p.id}" class="input-control" placeholder="Viết bình luận hoặc công thức $\\LaTeX$..." required style="padding:7px 12px; font-size:0.86rem;">
            <button type="submit" class="btn btn-sm btn-secondary">Gửi</button>
          </form>
        </div>
      </div>
    `,
    )
    .join("");

  hub.innerHTML = `
    <div style="margin-bottom:24px;">
      <span class="badge badge-calc" style="margin-bottom:8px;">CỘNG ĐỒNG HỌC TẬP HCMUE</span>
      <h2 style="font-size:1.75rem;">Bảng xếp hạng &amp; Diễn đàn Thảo luận</h2>
      <p style="color:var(--text-secondary);">Thi đua tích lũy điểm XP và trao đổi lời giải bài tập Giải tích 1 – Đại số tuyến tính.</p>
    </div>

    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:24px; align-items:start;">
      <!-- Cột trái: Bảng xếp hạng -->
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <h3 style="font-size:1.15rem;">🏆 Bảng xếp hạng Cao thủ XP</h3>
          <span class="badge badge-easy">Live</span>
        </div>
        ${leaderboardHTML}
      </div>

      <!-- Cột phải: Diễn đàn thảo luận -->
      <div>
        <div class="card" style="margin-bottom:18px;">
          <h3 style="font-size:1.12rem; margin-bottom:12px;">✍️ Đặt câu hỏi / Chia sẻ mẹo giải Toán</h3>
          <form onsubmit="createForumPost(event)">
            <div class="grid-2" style="gap:10px; margin-bottom:10px;">
              <input type="text" id="forum-post-title" class="input-control" placeholder="Tiêu đề câu hỏi (VD: Cách tìm cơ sở không gian nghiệm)..." required>
              <select id="forum-post-tag" class="select-control">
                <option value="GT1 • Chương 1">GT1 • Chương 1</option>
                <option value="GT1 • Chương 2">GT1 • Chương 2</option>
                <option value="GT1 • Chương 3">GT1 • Chương 3</option>
                <option value="GT1 • Chương 4">GT1 • Chương 4</option>
                <option value="ĐSTT • Chương 5">ĐSTT • Chương 5</option>
                <option value="ĐSTT • Chương 6">ĐSTT • Chương 6</option>
                <option value="ĐSTT • Chương 7">ĐSTT • Chương 7</option>
              </select>
            </div>
            <textarea id="forum-post-content" class="textarea-control" rows="2" placeholder="Nhập nội dung thảo luận (hỗ trợ gõ công thức Toán giữa cặp dấu $...$)..." required style="margin-bottom:10px;"></textarea>
            <button type="submit" class="btn btn-sm btn-primary">📤 Đăng bài thảo luận (+10 XP)</button>
          </form>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <strong>💬 Thảo luận mới nhất (${posts.length})</strong>
          <select id="forum-filter-tag" class="select-control" style="max-width:200px;" onchange="renderCommunityHub()">
            <option value="all" ${filterTag === "all" ? "selected" : ""}>Tất cả chuyên đề</option>
            <option value="GT1 • Chương 1" ${filterTag === "GT1 • Chương 1" ? "selected" : ""}>GT1 • Chương 1</option>
            <option value="GT1 • Chương 2" ${filterTag === "GT1 • Chương 2" ? "selected" : ""}>GT1 • Chương 2</option>
            <option value="GT1 • Chương 3" ${filterTag === "GT1 • Chương 3" ? "selected" : ""}>GT1 • Chương 3</option>
            <option value="GT1 • Chương 4" ${filterTag === "GT1 • Chương 4" ? "selected" : ""}>GT1 • Chương 4</option>
            <option value="ĐSTT • Chương 5" ${filterTag === "ĐSTT • Chương 5" ? "selected" : ""}>ĐSTT • Chương 5</option>
            <option value="ĐSTT • Chương 6" ${filterTag === "ĐSTT • Chương 6" ? "selected" : ""}>ĐSTT • Chương 6</option>
            <option value="ĐSTT • Chương 7" ${filterTag === "ĐSTT • Chương 7" ? "selected" : ""}>ĐSTT • Chương 7</option>
          </select>
        </div>

        ${postsHTML}
      </div>
    </div>
  `;

  renderMath(hub);
}

function createForumPost(event) {
  event.preventDefault();
  const title = document.getElementById("forum-post-title").value.trim();
  const topicTag = document.getElementById("forum-post-tag").value;
  const content = document.getElementById("forum-post-content").value.trim();
  if (!title || !content) return;

  const user = getCurrentUser();
  const posts = getForumPosts();
  posts.unshift({
    id: "post-" + Date.now(),
    author: user ? user.name : "Sinh viên HCMUE",
    role: isAdminUser(user) ? "admin" : "student",
    topicTag,
    title,
    content,
    time: "Vừa xong",
    likes: 1,
    replies: [],
  });
  saveForumPosts(posts);
  addXP(10, "Đăng bài thảo luận diễn đàn");
  renderCommunityHub();
}

function likeForumPost(postId) {
  const posts = getForumPosts();
  const p = posts.find((x) => x.id === postId);
  if (p) {
    p.likes++;
    saveForumPosts(posts);
    renderCommunityHub();
  }
}

function addForumReply(event, postId) {
  event.preventDefault();
  const inp = document.getElementById(`reply-input-${postId}`);
  const text = inp?.value.trim();
  if (!text) return;

  const user = getCurrentUser();
  const posts = getForumPosts();
  const p = posts.find((x) => x.id === postId);
  if (p) {
    p.replies.push({
      author: user ? user.name : "Sinh viên HCMUE",
      role: isAdminUser(user) ? "admin" : "student",
      text,
    });
    saveForumPosts(posts);
    addXP(5, "Tham gia trả lời thảo luận");
    renderCommunityHub();
  }
}

/* ==========================================================================
   7. QUẢN LÝ TÀI KHOẢN & PHÂN QUYỀN ADMIN (HOÀNG & KHOA)
   ========================================================================== */
function getUsers() {
  const raw = localStorage.getItem(STORAGE_KEYS.USERS);
  let users = [];
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) users = parsed;
    } catch {
      users = [];
    }
  }
  ADMIN_ACCOUNTS.forEach((adm) => {
    if (!users.some((u) => u.studentId === adm.studentId))
      users.push({ ...adm });
  });
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  return users;
}

function getCurrentUser() {
  const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function handleRegister(event) {
  event.preventDefault();
  const name = document.getElementById("reg-name").value.trim();
  const studentId = document.getElementById("reg-student-id").value.trim();
  const email = document.getElementById("reg-email").value.trim().toLowerCase();
  const password = document.getElementById("reg-password").value;
  const confirm = document.getElementById("reg-confirm").value;

  if (password.length < 6 || password !== confirm) {
    showToast("Mật khẩu phải từ 6 ký tự và trùng khớp xác nhận!", "error");
    return;
  }

  const users = getUsers();
  if (users.some((u) => u.email === email)) {
    showToast("Email này đã tồn tại!", "error");
    return;
  }

  const isAdmin = ["52.01.104.124", "52.01.104.042"].includes(studentId);
  const newUser = {
    name,
    studentId: studentId || "SV-HCMUE",
    email,
    password,
    role: isAdmin ? "admin" : "student",
  };
  users.push(newUser);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));

  showToast("Đăng ký tài khoản thành công!", "success");
  setTimeout(() => window.location.reload(), 600);
}

function handleLogin(event) {
  event.preventDefault();
  const identifier = document
    .getElementById("login-email")
    .value.trim()
    .toLowerCase();
  const password = document.getElementById("login-password").value;

  const users = getUsers();
  const found = users.find(
    (u) =>
      (u.email.toLowerCase() === identifier ||
        (u.studentId || "").toLowerCase() === identifier) &&
      u.password === password,
  );

  if (!found) {
    showToast("Sai Email/MSSV hoặc Mật khẩu!", "error");
    return;
  }

  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(found));
  showToast(
    `Chào mừng ${found.name} (${isAdminUser(found) ? "Admin" : "Sinh viên"})!`,
    "success",
  );
  setTimeout(() => window.location.reload(), 600);
}

function handleChangePassword(event) {
  event.preventDefault();
  const user = getCurrentUser();
  if (!user) return;
  const oldPass = document.getElementById("old-password").value;
  const newPass = document.getElementById("new-password").value;
  const confirmNew = document.getElementById("confirm-new-password").value;

  if (
    oldPass !== user.password ||
    newPass.length < 6 ||
    newPass !== confirmNew
  ) {
    showToast("Kiểm tra lại mật khẩu cũ và mật khẩu mới (≥ 6 ký tự)!", "error");
    return;
  }

  const users = getUsers();
  const idx = users.findIndex((u) => u.email === user.email);
  if (idx !== -1) {
    users[idx].password = newPass;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }
  user.password = newPass;
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  event.target.reset();
  showToast("Đổi mật khẩu thành công!", "success");
}

function handleLogout() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  showToast("Đã đăng xuất.", "info");
  setTimeout(() => window.location.reload(), 500);
}

function initAuthPage() {
  const guestView = document.getElementById("auth-guest-view");
  const profileView = document.getElementById("auth-profile-view");
  if (!guestView || !profileView) return;

  const user = getCurrentUser();
  if (user) {
    guestView.style.display = "none";
    profileView.style.display = "block";
    const roleLabel = isAdminUser(user)
      ? " 👑 (Quản trị viên - Quyền Upload Tài liệu)"
      : " 🎓 (Sinh viên)";
    document.getElementById("profile-name").textContent = user.name + roleLabel;
    document.getElementById("profile-email").textContent = user.email;
    document.getElementById("profile-student-id").textContent = user.studentId;
  } else {
    guestView.style.display = "grid";
    profileView.style.display = "none";
  }
}

/* ==========================================================================
   8. FORM LIÊN HỆ & FAQ
   ========================================================================== */
function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("contact-name").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const topic = document.getElementById("contact-topic").value;
  const message = document.getElementById("contact-message").value.trim();

  if (!name || !email.includes("@") || message.length < 10) {
    showToast("Vui lòng nhập đầy đủ thông tin (nội dung ≥ 10 ký tự)!", "error");
    return;
  }

  const feedbacks = JSON.parse(
    localStorage.getItem(STORAGE_KEYS.FEEDBACKS) || "[]",
  );
  feedbacks.unshift({
    name,
    email,
    topic,
    message,
    createdAt: new Date().toLocaleString("vi-VN"),
  });
  localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(feedbacks));
  event.target.reset();
  showToast("Cảm ơn bạn! Phản hồi đã được ghi nhận.", "success");
}

function toggleFaq(btn) {
  const item = btn.closest(".faq-item");
  if (item) item.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", () => {
  getUsers();
  initTheme();
  initNavigation();
  initScrollReveal();
  renderXPWidget();
  renderFeaturedTopics();
  renderTopicsGrid();
  initAuthPage();
  renderMath(document.body);
});

/* ==========================================================================
   NÂNG CẤP V6: TỔNG HỢP CUỐI CHƯƠNG + PHÒNG THI BẤM GIỜ + AI CHẤM ẢNH + ĐÓNG GÓP
   ========================================================================== */

let activeExamTimer = null;
let activeExamSecondsLeft = 0;
let activeExamId = "midterm-1";
let activeExamPhotoBase64 = "";
let activeExamPhotoMime = "image/jpeg";

const _baseSwitchStudyTab = switchStudyTab;
switchStudyTab = function (tab) {
  if (activeExamTimer && tab !== "exam") {
    clearInterval(activeExamTimer);
    activeExamTimer = null;
  }

  if (tab === "exam") {
    const body = document.getElementById("study-modal-body");
    if (!body) return;

    document.querySelectorAll("[data-study-tab]").forEach((btn) => {
      const isMatch = btn.getAttribute("data-study-tab") === "exam";
      btn.classList.toggle("btn-primary", isMatch);
      btn.classList.toggle("btn-outline", !isMatch);
    });

    renderExamRoom(body);
    return;
  }

  _baseSwitchStudyTab(tab);

  if (tab === "lesson") {
    const topic = getTopics().find((t) => t.id === activeStudyTopicId);
    const container = document.querySelector(
      "#study-modal-body .study-reading-container",
    );
    const docsBlock = document.getElementById("unit-docs");
    if (!topic || !container) return;

    const summaries =
      topic.keySummary ||
      (typeof CHAPTER_KEY_SUMMARIES !== "undefined"
        ? CHAPTER_KEY_SUMMARIES[topic.id]
        : []) ||
      [];
    const notesMap = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.COMMUNITY_NOTES) || "{}",
    );
    const extraNotes = notesMap[topic.id] || [];

    if (summaries.length > 0 || extraNotes.length > 0) {
      const summarySection = document.createElement("div");
      summarySection.className = "chapter-summary-box";
      summarySection.id = "unit-key-summary";
      summarySection.innerHTML = `
        <div class="chapter-summary-header">
          <h3>📌 TỔNG HỢP KIẾN THỨC &amp; CÔNG THỨC TRỌNG TÂM CUỐI CHƯƠNG</h3>
          <span class="badge badge-calc">Chốt kiến thức ôn thi</span>
        </div>
        <div class="summary-grid-cards">
          ${summaries
            .map(
              (s) => `
            <div class="summary-mini-card">
              <h4>${s.title}</h4>
              <div>${s.body}</div>
            </div>
          `,
            )
            .join("")}
        </div>
        ${
          extraNotes.length > 0
            ? `
          <div style="margin-top:16px; padding-top:14px; border-top:1px dashed var(--border-color);">
            <strong style="color:var(--secondary); font-size:0.94rem;">✨ Kiến thức &amp; Công thức cộng đồng đóng góp tự động (${extraNotes.length}):</strong>
            <div style="display:grid; gap:10px; margin-top:10px;">
              ${extraNotes
                .map(
                  (n) => `
                <div class="summary-mini-card" style="border-left:4px solid var(--secondary);">
                  <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:4px;">
                    Đóng góp bởi <strong>${escapeHTML(n.author)}</strong> • ${escapeHTML(n.date)}
                  </div>
                  <div>${n.text}</div>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>
        `
            : ""
        }
      `;

      if (docsBlock) {
        container.insertBefore(summarySection, docsBlock);
      } else {
        container.appendChild(summarySection);
      }
      renderMath(summarySection);
    }
  }
};

function openExamHubModal(examId = "midterm-1") {
  activeExamId = examId || activeStudyTopicId || "midterm-1";
  const modal = document.getElementById("study-modal");
  const examData = EXAM_BANK[activeExamId] || EXAM_BANK["midterm-1"];
  if (!modal) {
    window.location.href = `products.html?exam=${encodeURIComponent(activeExamId)}`;
    return;
  }

  const tabBtns = document.querySelectorAll("[data-study-tab]");
  if (tabBtns[2]) {
    tabBtns[2].style.display = "";
  }

  document.getElementById("study-modal-code").textContent =
    "PHÒNG THI THỬ HCMUE • CÓ BẤM GIỜ & AI CHẤM ẢNH";
  document.getElementById("study-modal-title").textContent = examData.title;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  switchStudyTab("exam");
}

function renderExamRoom(bodyEl) {
  if (!EXAM_BANK[activeExamId]) {
    activeExamId = EXAM_BANK[activeStudyTopicId]
      ? activeStudyTopicId
      : "midterm-1";
  }
  const exam = EXAM_BANK[activeExamId];
  document.getElementById("study-modal-code").textContent =
    "PHÒNG THI BẤM GIỜ & AI VISION GRADER";
  document.getElementById("study-modal-title").textContent = exam.title;

  activeExamSecondsLeft = exam.durationMinutes * 60;
  activeExamPhotoBase64 = "";

  const savedApiKey =
    localStorage.getItem(STORAGE_KEYS.GEMINI_KEY) ||
    localStorage.getItem(STORAGE_KEYS.GEMINI_KEY_LEGACY) ||
    "";

  bodyEl.innerHTML = `
    <div class="study-reading-container">
      <div class="exam-timer-bar">
        <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap; flex:1; min-width:240px;">
          <label for="exam-selector" style="font-weight:800; font-size:0.88rem;">Chọn đề thi:</label>
          <select id="exam-selector" class="select-control" style="max-width:380px;" onchange="changeExamSelection(this.value)">
            <optgroup label="Đề Thi Giữa Kỳ &amp; Cuối Kỳ Tổng Hợp">
              <option value="midterm-1" ${activeExamId === "midterm-1" ? "selected" : ""}>Đề Giữa Kỳ 1: Giải tích 1 (Chương 1–2 • 60 phút)</option>
              <option value="midterm-2" ${activeExamId === "midterm-2" ? "selected" : ""}>Đề Giữa Kỳ 2: Cơ sở Toán CNTT (Chương 5–6 • 60 phút)</option>
              <option value="final-all" ${activeExamId === "final-all" ? "selected" : ""}>Đề Cuối Kỳ Tổng Hợp (Chương 1–7 • 90 phút)</option>
            </optgroup>
            <optgroup label="Đề Kiểm Tra Từng Chương (35 phút)">
              <option value="gt-c1" ${activeExamId === "gt-c1" ? "selected" : ""}>Chương 1: Giới hạn &amp; Liên tục (35 phút)</option>
              <option value="gt-c2" ${activeExamId === "gt-c2" ? "selected" : ""}>Chương 2: Đạo hàm, Vi phân &amp; Taylor (35 phút)</option>
              <option value="gt-c3" ${activeExamId === "gt-c3" ? "selected" : ""}>Chương 3: Tích phân &amp; Tích phân suy rộng (35 phút)</option>
              <option value="gt-c4" ${activeExamId === "gt-c4" ? "selected" : ""}>Chương 4: Chuỗi số &amp; Chuỗi lũy thừa (35 phút)</option>
              <option value="dstt-c5" ${activeExamId === "dstt-c5" ? "selected" : ""}>Chương 5: Ma trận &amp; Định thức (35 phút)</option>
              <option value="dstt-c6" ${activeExamId === "dstt-c6" ? "selected" : ""}>Chương 6: Hệ Phương trình tuyến tính (35 phút)</option>
              <option value="dstt-c7" ${activeExamId === "dstt-c7" ? "selected" : ""}>Chương 7: Không gian Vector &amp; Euclide (35 phút)</option>
            </optgroup>
          </select>
        </div>

        <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
          <div class="exam-timer-clock" id="exam-clock-display">${formatExamTime(activeExamSecondsLeft)}</div>
          <button type="button" class="btn btn-sm btn-secondary" id="exam-start-btn" onclick="startExamCountdown()">▶️ Bắt đầu tính giờ</button>
          <button type="button" class="btn btn-sm btn-primary" onclick="submitTimedExam()">✅ Nộp bài thi</button>
        </div>
      </div>

      <div class="unit-block">
        <div class="unit-header">Phần I. Trắc nghiệm khách quan (${exam.mcqs.length} câu — Chấm điểm tự động)</div>
        <form id="timed-exam-form">
          ${exam.mcqs
            .map(
              (q, idx) => `
            <div class="exercise-item">
              <p style="font-weight:700; margin-bottom:10px;">Câu ${idx + 1}: ${q.question}</p>
              ${q.options
                .map(
                  (opt, oIdx) => `
                <label class="quiz-option" id="exam-opt-${idx}-${oIdx}">
                  <input type="radio" name="exam_q_${idx}" value="${oIdx}">
                  <span>${opt}</span>
                </label>
              `,
                )
                .join("")}
              <div id="exam-exp-${idx}" style="display:none; margin-top:10px; padding:10px 12px; border-radius:8px; background:var(--bg-surface-alt); font-size:0.9rem;"></div>
            </div>
          `,
            )
            .join("")}
        </form>
        <div id="exam-mcq-score-box" style="font-weight:800; color:var(--primary); margin-top:10px;"></div>
      </div>

      <div class="unit-block">
        <div class="unit-header">Phần II. Tự luận &amp; AI Chấm Bài Giải Qua Ảnh Chụp</div>
        <div style="white-space:pre-line; font-weight:600; background:var(--bg-surface-alt); padding:16px; border-radius:12px; margin-bottom:16px; border-left:4px solid var(--primary);">
          ${exam.essay.prompt}
        </div>

        <div class="ai-grader-card">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
            <strong style="color:var(--secondary); font-size:1rem;">📸 Nộp ảnh bài làm viết tay để AI chấm điểm &amp; sửa lỗi từng bước</strong>
            <span class="badge badge-linalg">Gemini Vision AI</span>
          </div>
          <p style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:12px;">
            Giải bài ra giấy, chụp ảnh rõ nét rồi tải lên bên dưới. AI sẽ đọc bài viết tay của bạn, đối chiếu với đề thi và barem chuẩn để chấm điểm chi tiết.
          </p>

          <div class="grid-2" style="gap:12px; margin-bottom:12px;">
            <div>
              <label for="exam-photo-input" style="display:block; font-size:0.82rem; font-weight:700; margin-bottom:4px;">1. Chọn hoặc chụp ảnh bài làm:</label>
              <input type="file" id="exam-photo-input" accept="image/*" capture="environment" class="input-control" style="width:100%;" onchange="handleExamPhotoUpload(event)">
            </div>
            <div>
              <label for="gemini-api-key-input" style="display:block; font-size:0.82rem; font-weight:700; margin-bottom:4px;">2. Gemini API Key (đồng bộ với Pike Man):</label>
              <input type="password" id="gemini-api-key-input" class="input-control" style="width:100%;" placeholder="AIzaSy... (bỏ trống nếu dùng Barem tự chấm)" value="${escapeHTML(savedApiKey)}" onchange="syncSharedGeminiKey(this.value)">
            </div>
          </div>

          <div id="exam-photo-preview-wrap"></div>

          <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:12px;">
            <button type="button" class="btn btn-secondary" id="ai-grade-btn" onclick="gradeEssayPhotoWithAI()">
              🤖 Chấm bài qua ảnh bằng AI
            </button>
            <button type="button" class="btn btn-outline" onclick="toggleSolution('exam-official-rubric')">
              📋 Xem Barem &amp; Lời giải chuẩn để tự đối chiếu
            </button>
          </div>

          <div class="solution-box" id="exam-official-rubric" style="margin-top:12px;">
            <div class="rubric-box" style="white-space:pre-line;">
              <strong>📋 Barem chấm điểm chuẩn HCMUE:</strong><br>${exam.essay.rubric}
            </div>
          </div>

          <div id="ai-grade-result-box"></div>
        </div>
      </div>
    </div>
  `;

  renderMath(bodyEl);
}

function syncSharedGeminiKey(rawVal) {
  const clean = (rawVal || "").trim();
  localStorage.setItem(STORAGE_KEYS.GEMINI_KEY, clean);
  localStorage.setItem(STORAGE_KEYS.GEMINI_KEY_LEGACY, clean);
  const pmInput = document.getElementById("pm-api-key-input");
  if (pmInput && pmInput.value !== clean) pmInput.value = clean;
}

function formatExamTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function changeExamSelection(newExamId) {
  if (activeExamTimer) {
    clearInterval(activeExamTimer);
    activeExamTimer = null;
  }
  activeExamId = newExamId;
  const body = document.getElementById("study-modal-body");
  if (body) renderExamRoom(body);
}

function startExamCountdown() {
  if (activeExamTimer) return;
  const clockEl = document.getElementById("exam-clock-display");
  const btn = document.getElementById("exam-start-btn");
  if (btn) btn.textContent = "⏳ Đang làm bài...";
  showToast("Đã bắt đầu tính giờ làm bài thi!", "info");

  activeExamTimer = setInterval(() => {
    activeExamSecondsLeft--;
    if (clockEl) {
      clockEl.textContent = formatExamTime(Math.max(0, activeExamSecondsLeft));
      if (activeExamSecondsLeft <= 180) clockEl.classList.add("warning");
    }
    if (activeExamSecondsLeft <= 0) {
      clearInterval(activeExamTimer);
      activeExamTimer = null;
      showToast("⏰ Đã hết giờ làm bài! Hệ thống tự động nộp bài.", "error");
      submitTimedExam();
    }
  }, 1000);
}

function submitTimedExam() {
  if (activeExamTimer) {
    clearInterval(activeExamTimer);
    activeExamTimer = null;
  }
  const exam = EXAM_BANK[activeExamId];
  if (!exam) return;

  let correct = 0;
  exam.mcqs.forEach((q, idx) => {
    const chosen = document.querySelector(
      `input[name="exam_q_${idx}"]:checked`,
    );
    const val = chosen ? parseInt(chosen.value, 10) : -1;
    q.options.forEach((_, oIdx) => {
      const lbl = document.getElementById(`exam-opt-${idx}-${oIdx}`);
      if (!lbl) return;
      lbl.classList.remove("correct", "wrong");
      if (oIdx === q.answer) lbl.classList.add("correct");
      else if (oIdx === val && val !== q.answer) lbl.classList.add("wrong");
    });
    if (val === q.answer) correct++;

    const exp = document.getElementById(`exam-exp-${idx}`);
    if (exp) {
      exp.style.display = "block";
      exp.innerHTML = `💡 <strong>Giải thích:</strong> ${q.explanation}`;
      renderMath(exp);
    }
  });

  const mcqPoints = ((correct / exam.mcqs.length) * 6).toFixed(2);
  const scoreBox = document.getElementById("exam-mcq-score-box");
  if (scoreBox) {
    scoreBox.innerHTML = `🎯 Kết quả Phần Trắc nghiệm: ${correct}/${exam.mcqs.length} câu đúng — Đạt ${mcqPoints}/6.0 điểm (+${correct * 20} XP)`;
  }
  addXP(correct * 20 + 15, `Hoàn thành đề thi ${exam.title}`);
}

function handleExamPhotoUpload(event) {
  const file = event.target.files?.[0];
  const previewWrap = document.getElementById("exam-photo-preview-wrap");
  if (!file || !previewWrap) return;

  activeExamPhotoMime = file.type || "image/jpeg";
  const reader = new FileReader();
  reader.onload = function (e) {
    const dataUrl = e.target.result;
    activeExamPhotoBase64 = dataUrl.split(",")[1] || "";
    previewWrap.innerHTML = `
      <div class="photo-preview-box">
        <img src="${dataUrl}" alt="Ảnh bài làm tự luận của sinh viên">
      </div>
    `;
  };
  reader.readAsDataURL(file);
}

async function gradeEssayPhotoWithAI() {
  const resultBox = document.getElementById("ai-grade-result-box");
  const btn = document.getElementById("ai-grade-btn");
  const exam = EXAM_BANK[activeExamId];
  if (!resultBox || !exam) return;

  const apiKey = (
    document.getElementById("gemini-api-key-input")?.value ||
    window.PikeManAI?.getApiKey?.() ||
    ""
  ).trim();

  if (!activeExamPhotoBase64) {
    showToast("Vui lòng chọn hoặc chụp ảnh bài làm tự luận trước!", "error");
    return;
  }

  if (!apiKey) {
    document.getElementById("exam-official-rubric")?.classList.add("open");
    renderMath(document.getElementById("exam-official-rubric"));
    resultBox.innerHTML = `
      <div class="ai-feedback-result">
        <strong>ℹ️ Chưa nhập Gemini API Key:</strong> Hệ thống đã mở sẵn <strong>Barem &amp; Lời giải chuẩn</strong> ở trên để bạn tự đối chiếu từng bước với ảnh bài làm của mình. Nếu muốn AI tự đọc chữ viết tay và chấm điểm tự động, hãy dán Gemini API Key vào ô bên trên rồi bấm lại nút Chấm bài nhé!
      </div>
    `;
    return;
  }

  syncSharedGeminiKey(apiKey);
  if (btn) {
    btn.disabled = true;
    btn.textContent = "⏳ AI đang đọc bài viết tay & chấm điểm...";
  }

  try {
    const promptText = `Bạn là giảng viên Toán Cao Cấp tại Trường ĐH Sư phạm TP.HCM (HCMUE). Hãy đọc ảnh bài giải tự luận viết tay của sinh viên, đối chiếu với đề bài và barem chấm điểm dưới đây, sau đó nhận xét chi tiết bằng tiếng Việt (luôn bọc công thức toán bằng $...$ hoặc $$...$$):
1. Tóm tắt các bước sinh viên đã làm được trong ảnh.
2. Chỉ rõ từng lỗi sai biến đổi, thiếu điều kiện hoặc nhầm dấu (nếu có).
3. Chấm điểm từng ý theo barem và tổng kết điểm số phần tự luận.

ĐỀ BÀI:
${exam.essay.prompt}

BAREM CHUẨN:
${exam.essay.rubric}`;

    let aiReply = "";
    let modelUsed = "gemini-3.8-flash";

    if (window.PikeManAI && typeof window.PikeManAI.generate === "function") {
      const res = await window.PikeManAI.generate({
        prompt: promptText,
        images: [
          {
            mimeType: activeExamPhotoMime,
            base64: activeExamPhotoBase64,
          },
        ],
        temperature: 0.2,
        onStatus: (activeModel, idx) => {
          if (btn) {
            btn.textContent =
              idx === 0
                ? `⏳ AI (${activeModel}) đang đọc bài viết tay...`
                : `⏳ Model bận, tự chuyển sang ${activeModel}...`;
          }
        },
      });
      aiReply = res.text;
      modelUsed = res.modelUsed || modelUsed;
    } else {
      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelUsed}:generateContent?key=${encodeURIComponent(apiKey)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: promptText },
                  {
                    inline_data: {
                      mime_type: activeExamPhotoMime,
                      data: activeExamPhotoBase64,
                    },
                  },
                ],
              },
            ],
          }),
        },
      );

      const json = await resp.json();
      if (!resp.ok) {
        throw new Error(json?.error?.message || "Lỗi kết nối Gemini API");
      }

      aiReply =
        json?.candidates?.[0]?.content?.parts
          ?.map((p) => p.text || "")
          .join("") || "";
    }

    if (!aiReply) {
      aiReply =
        "AI không trích xuất được nội dung từ ảnh, vui lòng chụp rõ nét hơn.";
    }

    const formattedReply = escapeHTML(aiReply)
      .replace(/\\\[([\s\S]*?)\\\]/g, (_, m) => `$$${m}$$`)
      .replace(/\\\(([\s\S]*?)\\\)/g, (_, m) => `$${m}$`)
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    resultBox.innerHTML = `
      <div class="ai-feedback-result">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
          <span style="font-weight:800; color:var(--secondary);">🤖 Kết quả chấm tự luận từ AI Vision:</span>
          <span style="font-size:0.78rem; color:var(--text-muted); font-family:var(--font-mono);">Model: ${escapeHTML(modelUsed)}</span>
        </div>
        <div style="white-space:pre-line;">${formattedReply}</div>
      </div>
    `;
    renderMath(resultBox);
    addXP(30, "Nộp ảnh tự luận cho AI chấm điểm");
  } catch (err) {
    resultBox.innerHTML = `
      <div class="ai-feedback-result" style="border-left-color:var(--danger);">
        <strong>⚠️ Không thể gọi AI Vision:</strong> ${escapeHTML(err.message)}. Hệ thống đã mở sẵn Barem chuẩn ở trên để bạn đối chiếu trực tiếp.
      </div>
    `;
    document.getElementById("exam-official-rubric")?.classList.add("open");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = "🤖 Chấm bài qua ảnh bằng AI";
    }
  }
}

function renderContributeHub() {
  const container = document.getElementById("community-contribute-hub");
  if (!container) return;

  const docsMap = getAllDocuments();
  const notesMap = JSON.parse(
    localStorage.getItem(STORAGE_KEYS.COMMUNITY_NOTES) || "{}",
  );
  const totalDocs = Object.values(docsMap).reduce(
    (sum, arr) => sum + arr.length,
    0,
  );
  const aiStats = window.MathLabDataManager
    ? window.MathLabDataManager.getStats()
    : { totalExercises: 0, totalQuizzes: 0, totalTheories: 0 };
  const totalExpanded =
    Object.values(notesMap).reduce((sum, arr) => sum + arr.length, 0) +
    aiStats.totalExercises +
    aiStats.totalQuizzes +
    aiStats.totalTheories;

  const savedApiKey =
    localStorage.getItem(STORAGE_KEYS.GEMINI_KEY) ||
    localStorage.getItem(STORAGE_KEYS.GEMINI_KEY_LEGACY) ||
    "";

  const topicOptions = getTopics()
    .map(
      (t) =>
        `<option value="${t.id}">${escapeHTML(t.code)} • ${escapeHTML(t.title)}</option>`,
    )
    .join("");

  container.innerHTML = `
    <div class="contrib-hub-card">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:14px; margin-bottom:20px;">
        <div>
          <span class="badge badge-linalg" style="margin-bottom:8px;">AI AUTO-UPGRADE KNOWLEDGE HUB</span>
          <h2 style="font-size:1.6rem;">🤝 Đóng Góp &amp; AI Tự Động Nâng Cấp Nguồn Học Liệu</h2>
          <p style="color:var(--text-secondary); font-size:0.95rem;">
            Tải lên <strong>PDF đề thi/giáo trình, ảnh chụp đề bài, file .txt/.md</strong> hoặc nhập công thức mới: <strong>Pike Man AI</strong> sẽ đọc tài liệu, tự phân loại đúng chương, giải chi tiết chuẩn $\\LaTeX$ và nạp câu hỏi Trắc nghiệm + Tự luận thẳng vào kho đề của web.
          </p>
        </div>
        <div style="display:flex; gap:10px;">
          <div style="padding:10px 16px; border-radius:12px; background:var(--primary-soft); text-align:center;">
            <div style="font-family:var(--font-mono); font-weight:800; font-size:1.25rem; color:var(--primary);">${totalDocs}</div>
            <div style="font-size:0.78rem; font-weight:700;">Tài liệu kho</div>
          </div>
          <div style="padding:10px 16px; border-radius:12px; background:var(--secondary-soft); text-align:center;">
            <div style="font-family:var(--font-mono); font-weight:800; font-size:1.25rem; color:var(--secondary);">${totalExpanded}</div>
            <div style="font-size:0.78rem; font-weight:700;">Câu hỏi &amp; Mục mở rộng</div>
          </div>
        </div>
      </div>

      <form id="community-contrib-form" onsubmit="handleCommunityContribute(event)">
        <div class="grid-3" style="gap:14px; margin-bottom:14px;">
          <div class="form-group" style="margin-bottom:0;">
            <label for="contrib-topic-id">Chương đích tự động cập nhật:</label>
            <select id="contrib-topic-id" class="select-control" style="width:100%;">
              <option value="auto" selected>🤖 AI tự nhận diện &amp; phân loại đúng chương</option>
              ${topicOptions}
            </select>
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label for="contrib-title">Tên tài liệu / Nguồn đề đóng góp:</label>
            <input type="text" id="contrib-title" class="input-control" style="width:100%;" placeholder="VD: Đề thi Giữa kỳ 1 Giải tích HCMUE" required>
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label for="contrib-file">Đính kèm PDF, Ảnh chụp đề, TXT/MD:</label>
            <input type="file" id="contrib-file" class="input-control" style="width:100%;" accept=".pdf,image/*,.txt,.md,.tex" multiple>
          </div>
        </div>

        <div class="form-group" style="margin-bottom:12px;">
          <label for="contrib-note">Nội dung đề bài, ghi chú hoặc công thức $\\LaTeX$ (có thể để trống nếu đã đính kèm file PDF/Ảnh):</label>
          <textarea id="contrib-note" class="textarea-control" rows="3" style="width:100%;" placeholder="VD: Dán đề bài trắc nghiệm/tự luận hoặc ghi chú định lý tại đây để AI bóc tách &amp; tạo barem lời giải..."></textarea>
        </div>

        <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:12px; padding:12px 14px; border-radius:12px; background:var(--bg-surface-alt); border:1px solid var(--border-color); margin-bottom:14px;">
          <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-weight:700; font-size:0.9rem; margin:0;">
            <input type="checkbox" id="contrib-use-ai" checked>
            <span>🤖 Dùng Pike Man AI đọc tài liệu &amp; tự động tạo câu hỏi Trắc nghiệm + Tự luận có barem</span>
          </label>
          <div style="display:flex; align-items:center; gap:8px; min-width:240px; flex:1; max-width:340px;">
            <input type="password" id="contrib-api-key" class="input-control" style="width:100%; padding:7px 10px; font-size:0.84rem;" placeholder="Gemini API Key (AIzaSy...)" value="${escapeHTML(savedApiKey)}" onchange="syncSharedGeminiKey(this.value)">
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <span id="contrib-status-text" style="font-size:0.85rem; color:var(--text-muted); font-weight:600;">
            ⚡ AI tự động bóc tách câu hỏi, chuẩn hóa KaTeX và gộp vào ngân hàng đề của từng chương.
          </span>
          <button type="submit" id="contrib-submit-btn" class="btn btn-primary">
            🚀 Đóng góp &amp; Tự động nâng cấp học liệu (+50 XP)
          </button>
        </div>
      </form>

      <div id="contrib-ai-result-panel" style="margin-top:16px;"></div>
    </div>
  `;

  renderMath(container);
}

async function handleCommunityContribute(event) {
  event.preventDefault();
  const topicId = document.getElementById("contrib-topic-id").value;
  const title = document.getElementById("contrib-title").value.trim();
  const noteText = document.getElementById("contrib-note").value.trim();
  const fileInput = document.getElementById("contrib-file");
  const files = Array.from(fileInput?.files || []);
  const useAI = document.getElementById("contrib-use-ai")?.checked;
  const apiKey = (
    document.getElementById("contrib-api-key")?.value || ""
  ).trim();
  const submitBtn = document.getElementById("contrib-submit-btn");
  const statusEl = document.getElementById("contrib-status-text");
  const resultPanel = document.getElementById("contrib-ai-result-panel");

  if (!files.length && !noteText) {
    showToast(
      "Vui lòng đính kèm file (PDF/Ảnh/TXT) hoặc nhập nội dung đóng góp!",
      "error",
    );
    return;
  }

  if (apiKey) syncSharedGeminiKey(apiKey);

  const user = getCurrentUser();
  const authorName = user ? user.name : "Sinh viên HCMUE";
  const today = new Date().toISOString().slice(0, 10);
  const fallbackTopicId = topicId === "auto" ? "gt-c1" : topicId;

  const saveDocAndNote = (targetTid, summaryText) => {
    const docsMap = getAllDocuments();
    if (!docsMap[targetTid]) docsMap[targetTid] = [];
    docsMap[targetTid].unshift({
      id: "doc-contrib-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
      title: files.length
        ? `${title} (${files.map((f) => f.name).join(", ")})`
        : `${title}.txt`,
      uploader: authorName,
      date: today,
      size: files.length
        ? `${Math.max(1, Math.round(files.reduce((s, f) => s + f.size, 0) / 1024))} KB`
        : "Ghi chú nhanh",
      type: files.length
        ? (files[0].name.split(".").pop() || "FILE").toUpperCase()
        : "NOTE",
      content: summaryText,
    });
    saveAllDocuments(docsMap);

    const notesMap = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.COMMUNITY_NOTES) || "{}",
    );
    if (!notesMap[targetTid]) notesMap[targetTid] = [];
    notesMap[targetTid].unshift({
      author: authorName,
      date: today,
      text: `<strong>${escapeHTML(title)}:</strong> ${escapeHTML(summaryText)}`,
    });
    localStorage.setItem(
      STORAGE_KEYS.COMMUNITY_NOTES,
      JSON.stringify(notesMap),
    );
  };

  // Chế độ AI tự động đọc tài liệu & nâng cấp ngân hàng câu hỏi
  if (useAI && apiKey && window.PikeManAI) {
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "⏳ Pike Man AI đang đọc tài liệu...";
    }
    if (statusEl) {
      statusEl.style.color = "var(--primary)";
      statusEl.textContent =
        "⏳ AI đang phân tích file/nội dung, giải chi tiết và chuẩn hóa KaTeX...";
    }

    try {
      const extracted = await window.PikeManAI.ingestContributedResource({
        files,
        rawText: noteText,
        targetTopicId: topicId,
        sourceTitle: title,
        onStatus: (mod, idx) => {
          if (statusEl) {
            statusEl.textContent =
              idx === 0
                ? `⏳ Pike Man (${mod}) đang đọc tài liệu & trích xuất câu hỏi...`
                : `⏳ Đang chuyển sang model dự phòng (${mod})...`;
          }
        },
      });

      const summary = window.PikeManAI.commitExtractedBundles(
        extracted.bundles,
      );
      const affectedTopicIds = Array.from(
        new Set(
          (extracted.bundles || []).map((b) => b.topicId).filter(Boolean),
        ),
      );
      const targetList = affectedTopicIds.length
        ? affectedTopicIds
        : [fallbackTopicId];

      targetList.forEach((tid) => {
        saveDocAndNote(
          tid,
          noteText ||
            `Tài liệu "${extracted.sourceTitle}" đã được AI bóc tách tự động (+${summary.totalTheory} lý thuyết, +${summary.totalExercise} tự luận, +${summary.totalQuiz} trắc nghiệm).`,
        );
      });

      renderTopicsGrid();
      renderFeaturedTopics();
      addXP(50, `AI nâng cấp học liệu từ "${extracted.sourceTitle}"`);

      event.target.reset();
      const restoredKey =
        localStorage.getItem(STORAGE_KEYS.GEMINI_KEY) || apiKey;
      const keyInputAfter = document.getElementById("contrib-api-key");
      if (keyInputAfter) keyInputAfter.value = restoredKey;

      const topicsMap = new Map(getTopics().map((t) => [t.id, t]));
      const chapterButtonsHTML = targetList
        .map((tid) => {
          const tp = topicsMap.get(tid);
          const label = tp ? `${tp.code}: ${tp.title}` : tid;
          return `
            <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px; padding:8px 12px; border-radius:10px; background:var(--bg-surface); border:1px solid var(--border-color);">
              <strong style="font-size:0.88rem;">📘 ${escapeHTML(label)}</strong>
              <div style="display:flex; gap:6px;">
                <button type="button" class="btn btn-sm btn-outline" onclick="openStudyModal('${tid}', 'lesson')">📖 Xem lý thuyết &amp; tự luận</button>
                <button type="button" class="btn btn-sm btn-primary" onclick="openStudyModal('${tid}', 'quiz')">🎯 Làm Quiz mới nạp</button>
              </div>
            </div>
          `;
        })
        .join("");

      if (resultPanel) {
        resultPanel.innerHTML = `
          <div style="padding:16px; border-radius:14px; background:var(--secondary-soft); border:1px solid var(--secondary);">
            <div style="font-weight:800; color:var(--secondary); font-size:1rem; margin-bottom:6px;">
              🎉 Pike Man AI (${escapeHTML(extracted.modelUsed)}) đã tự động nâng cấp học liệu thành công!
            </div>
            <p style="font-size:0.9rem; margin-bottom:10px;">
              Nguồn <strong>"${escapeHTML(extracted.sourceTitle)}"</strong> đã được nạp vào ngân hàng web:
              <strong>+${summary.totalTheory} mục lý thuyết</strong> •
              <strong>+${summary.totalExercise} bài tự luận có barem</strong> •
              <strong>+${summary.totalQuiz} câu trắc nghiệm</strong>.
            </p>
            <div style="display:grid; gap:8px;">
              ${chapterButtonsHTML}
            </div>
          </div>
        `;
        renderMath(resultPanel);
      }

      if (statusEl) {
        statusEl.style.color = "var(--success)";
        statusEl.textContent =
          "✅ Hoàn tất! Toàn bộ câu hỏi mới đã sẵn sàng trong Phòng học & Quiz.";
      }
      showToast(
        `🎉 AI đã nạp +${summary.totalExercise} tự luận & +${summary.totalQuiz} câu trắc nghiệm vào web!`,
        "success",
      );
    } catch (err) {
      if (statusEl) {
        statusEl.style.color = "var(--danger)";
        statusEl.textContent = `⚠️ Lỗi AI: ${err.message}`;
      }
      showToast(`Lỗi khi AI đọc tài liệu: ${err.message}`, "error");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent =
          "🚀 Đóng góp & Tự động nâng cấp học liệu (+50 XP)";
      }
    }
    return;
  }

  // Fallback lưu nhanh tài liệu & công thức nếu chưa nhập API key hoặc tắt AI
  saveDocAndNote(
    fallbackTopicId,
    noteText || `Tài liệu đính kèm: ${files.map((f) => f.name).join(", ")}`,
  );
  addXP(30, `Đóng góp học liệu: ${title}`);
  event.target.reset();
  renderContributeHub();
  showToast(
    useAI && !apiKey
      ? "✅ Đã lưu tài liệu vào chương! (Nhập thêm Gemini API Key để AI tự động sinh câu hỏi từ file nhé)"
      : "✅ Đã tự động cập nhật tài liệu & kiến thức mới vào chương!",
    "success",
  );
}

document.addEventListener("DOMContentLoaded", () => {
  renderContributeHub();
  const params = new URLSearchParams(window.location.search);
  const examParam = params.get("exam");
  if (examParam) {
    openExamHubModal(examParam);
  }
});
