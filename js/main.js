/* ==========================================================================
   FILE: js/main.js (PHIÊN BẢN V2 - NÂNG CẤP TOÀN DIỆN)
   TÍNH NĂNG MỚI:
   1. Sửa triệt để lỗi render công thức Toán KaTeX trong Quiz & bài tập động
   2. Kho Tài liệu học tập theo từng chương + Phân quyền 2 Admin (Hoàng & Khoa)
   3. Bộ sinh bài tập tự luận đổi mới liên tục (gọi từ math-tools.js)
   4. Hệ thống XP Kinh nghiệm tích lũy & Thống kê Đúng/Sai điều chỉnh ôn tập
   ========================================================================== */

const STORAGE_KEYS = {
  TOPICS: "mathlab_topics_v3",
  USERS: "mathlab_users_v2",
  CURRENT_USER: "mathlab_current_user_v2",
  THEME: "mathlab_theme_v1",
  QUIZ_SCORES: "mathlab_quiz_scores_v1",
  FEEDBACKS: "mathlab_feedbacks_v1",
  DOCS: "mathlab_documents_v1",
  PROGRESS: "mathlab_progress_v1",
};

// Danh sách 2 tài khoản Admin duy nhất được quyền Upload / Xóa tài liệu
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

// Tài liệu học tập mặc định đi kèm từng chương (có thể xem/tải ngay)
const DEFAULT_DOCUMENTS = {
  "gt1-c1": [
    {
      id: "doc-1",
      title: "GT1_Chuong1_GioiHan_LienTuc_LyThuyet.pdf",
      uploader: "Vũ Huy Hoàng",
      date: "2026-10-15",
      size: "1.4 MB",
      type: "PDF",
      content:
        "TÓM TẮT CHƯƠNG 1 - GIẢI TÍCH 1\n1. Ánh xạ: Đơn ánh, toàn ánh, song ánh.\n2. Giới hạn dãy số & Hàm số: Tiêu chuẩn kẹp, Weierstrass.\n3. Bảng VCB tương đương khi x -> 0: sin(x)~x, ln(1+x)~x, e^x-1~x, 1-cos(x)~x^2/2.\n4. Định lý Bolzano-Cauchy về giá trị trung gian.",
    },
  ],
  "gt1-c2": [
    {
      id: "doc-2",
      title: "GT1_Chuong2_DaoHam_KhaiTrien_Taylor.pdf",
      uploader: "Hồ Đắc Anh Khoa",
      date: "2026-10-22",
      size: "1.8 MB",
      type: "PDF",
      content:
        "TÓM TẮT CHƯƠNG 2 - ĐẠO HÀM & VI PHÂN\n1. Đạo hàm hàm hợp, hàm tham số y'_x = y'(t)/x'(t), hàm ẩn y' = -F'_x / F'_y.\n2. Công thức Leibniz tính đạo hàm cấp cao.\n3. Quy tắc L'Hospital khử dạng vô định 0/0 và oo/oo.\n4. Công thức khai triển Taylor - Maclaurin.",
    },
  ],
  "gt1-c3": [
    {
      id: "doc-3",
      title: "GT1_Chuong3_TichPhan_QuyTac_LIATE.pdf",
      uploader: "Vũ Huy Hoàng",
      date: "2026-11-01",
      size: "2.1 MB",
      type: "PDF",
      content:
        "TÓM TẮT CHƯƠNG 3 - PHÉP TÍNH TÍCH PHÂN\n1. Quy tắc LIATE chọn u trong tích phân từng phần.\n2. Đổi biến lượng giác khử căn.\n3. Tích phân suy rộng loại 1 & loại 2, tiêu chuẩn p và tiêu chuẩn so sánh.",
    },
  ],
  "gt1-c4": [
    {
      id: "doc-4",
      title: "GT1_Chuong4_ChuoiSo_ChuoiLuyThua.pdf",
      uploader: "Hồ Đắc Anh Khoa",
      date: "2026-11-08",
      size: "1.6 MB",
      type: "PDF",
      content:
        "TÓM TẮT CHƯƠNG 4 - LÝ THUYẾT CHUỖI\n1. Tiêu chuẩn D'Alembert và Cauchy cho chuỗi dương.\n2. Chuỗi đan dấu & Tiêu chuẩn Leibniz.\n3. Bán kính hội tụ R và miền hội tụ chuỗi lũy thừa.",
    },
  ],
  "dstt-c5": [
    {
      id: "doc-5",
      title: "COMP1800_Chuong5_MaTran_DinhThuc.pdf",
      uploader: "Vũ Huy Hoàng",
      date: "2026-11-10",
      size: "1.9 MB",
      type: "PDF",
      content:
        "TÓM TẮT CHƯƠNG 5 - MA TRẬN & ĐỊNH THỨC\n1. Phép biến đổi sơ cấp dòng tính định thức.\n2. Điều kiện khả nghịch det(A) != 0.\n3. Tìm ma trận nghịch đảo bằng Gauss-Jordan [A | I] -> [I | A^-1].",
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
        "TÓM TẮT CHƯƠNG 6 - HỆ PHƯƠNG TRÌNH TUYẾN TÍNH\n1. Định lý Kronecker-Capelli biện luận số nghiệm qua rank(A) và rank([A|b]).\n2. Hệ thuần nhất AX = 0 và không gian nghiệm.\n3. Quy tắc Cramer giải hệ vuông.",
    },
  ],
  "dstt-c7": [
    {
      id: "doc-7",
      title: "COMP1800_Chuong7_KhongGianVector_Euclide.pdf",
      uploader: "Vũ Huy Hoàng",
      date: "2026-11-18",
      size: "2.3 MB",
      type: "PDF",
      content:
        "TÓM TẮT CHƯƠNG 7 - KHÔNG GIAN VECTOR & EUCLIDE\n1. Không gian con, độc lập tuyến tính, cơ sở và số chiều.\n2. Ma trận đổi cơ sở & Định lý Rank-Nullity.\n3. Thuật toán trực giao hóa Gram-Schmidt.",
    },
  ],
};

/* ==========================================================================
   1. TIỆN ÍCH CHUNG (TOAST, KATEX RENDER, THEME, NAVIGATION)
   ========================================================================== */
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

// SỬA LỖI RENDER CÔNG THỨC TOÁN: Gọi KaTeX ngay lập tức hoặc chờ thư viện tải xong
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
    }
  };
  doRender();
  setTimeout(doRender, 150);
}

function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  const themeBtn = document.getElementById("theme-toggle-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem(STORAGE_KEYS.THEME, next);
      updateThemeIcon(next);
    });
  }
}

function updateThemeIcon(theme) {
  const btn = document.getElementById("theme-toggle-btn");
  if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
}

function initNavigation() {
  const hamburger = document.getElementById("hamburger-btn");
  const navLinks = document.getElementById("nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  const user = getCurrentUser();
  const authNavBtn = document.getElementById("nav-auth-btn");
  if (authNavBtn) {
    if (user) {
      const roleIcon = isAdminUser(user) ? "👑" : "👤";
      authNavBtn.textContent = `${roleIcon} ${user.name.split(" ").pop()}`;
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
   2. HỆ THỐNG XP KINH NGHIỆM & THỐNG KÊ ĐÚNG/SAI (ADAPTIVE LEARNING)
   ========================================================================== */
function getProgress() {
  const raw = localStorage.getItem(STORAGE_KEYS.PROGRESS);
  if (!raw) {
    return { xp: 0, solvedExercises: 0, questionStats: {}, topicStats: {} };
  }
  try {
    return JSON.parse(raw);
  } catch {
    return { xp: 0, solvedExercises: 0, questionStats: {}, topicStats: {} };
  }
}

function saveProgress(prog) {
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(prog));
  renderXPWidget();
}

function getLevelInfo(xp) {
  const levels = [
    { level: 1, title: "Tân binh Giải tích", min: 0, max: 100 },
    { level: 2, title: "Người giải mã Ma trận", min: 100, max: 250 },
    { level: 3, title: "Cao thủ Vi tích phân", min: 250, max: 500 },
    { level: 4, title: "Bậc thầy Tuyến tính", min: 500, max: 900 },
    { level: 5, title: "Chiến thần Toán học HCMUE", min: 900, max: 2000 },
  ];
  let current = levels[0];
  for (const lv of levels) {
    if (xp >= lv.min) current = lv;
  }
  const percent = Math.min(
    100,
    Math.round(((xp - current.min) / (current.max - current.min)) * 100),
  );
  return { ...current, percent };
}

function addXP(amount, reason = "") {
  const prog = getProgress();
  const oldLv = getLevelInfo(prog.xp).level;
  prog.xp += amount;
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

// Render thanh XP & Thống kê quá trình học tập trên trang products.html & auth.html
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

  // Đếm số câu đang ở trạng thái "hay sai" cần ôn lại
  const weakCount = Object.values(prog.questionStats || {}).filter(
    (q) => (q.wrong || 0) > (q.correct || 0),
  ).length;

  container.innerHTML = `
    <div style="display:flex; align-items:center; gap:14px;">
      <div style="width:46px; height:46px; border-radius:12px; background:linear-gradient(135deg, var(--primary), var(--secondary)); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:1.1rem;">
        Lv.${info.level}
      </div>
      <div>
        <div style="font-weight:800; font-size:1rem;">${info.title} <span style="color:var(--primary); font-family:var(--font-mono);">(${prog.xp} XP)</span></div>
        <div style="display:flex; align-items:center; gap:10px; margin-top:4px;">
          <div class="xp-bar-track"><div class="xp-bar-fill" style="width:${info.percent}%;"></div></div>
          <span style="font-size:0.78rem; color:var(--text-muted);">${prog.xp}/${info.max} XP</span>
        </div>
      </div>
    </div>

    <div style="display:flex; flex-wrap:wrap; align-items:center; gap:14px;">
      <div style="font-size:0.86rem;">
        ✅ Đúng: <strong style="color:var(--success);">${totalCorrect}</strong> • 
        ❌ Sai: <strong style="color:var(--danger);">${totalWrong}</strong> • 
        🎯 Chính xác: <strong>${accuracy}%</strong>
      </div>
      ${
        weakCount > 0
          ? `<button class="btn btn-sm btn-danger" onclick="openAdaptiveReviewModal()">🔥 Ôn tập ${weakCount} câu hay sai</button>`
          : `<span class="badge badge-easy">✨ Phong độ ổn định</span>`
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
              <div class="doc-title" title="${doc.title}">${doc.title}</div>
              <div class="doc-meta">Đăng bởi: <strong>${doc.uploader}</strong> • ${doc.date} • ${doc.size || doc.type}</div>
            </div>
          </div>
          <div style="display:flex; gap:6px; flex-shrink:0;">
            <button class="btn btn-sm btn-outline" onclick="downloadOrViewDocument('${topicId}', '${doc.id}')">⬇️ Xem / Tải</button>
            ${
              admin
                ? `<button class="btn btn-sm btn-danger" onclick="deleteChapterDocument('${topicId}', '${doc.id}')" title="Admin xóa tài liệu">🗑️</button>`
                : ""
            }
          </div>
        </div>
      `,
          )
          .join("");

  // Chỉ hiển thị Form Upload nếu đang đăng nhập tài khoản Admin (Hoàng hoặc Khoa)
  const uploadFormHTML = admin
    ? `
      <div class="admin-upload-box">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;">
          <strong style="color:var(--primary); font-size:0.92rem;">👑 Bảng điều khiển Admin: Cập nhật tài liệu chương này</strong>
          <span class="badge badge-admin">Admin: ${getCurrentUser().name}</span>
        </div>
        <form onsubmit="handleUploadDocument(event, '${topicId}')">
          <div class="grid-2" style="gap:10px; margin-bottom:10px;">
            <input type="text" id="doc-upload-title" class="input-control" placeholder="Tên tài liệu (VD: De_Cuong_On_Tap.pdf)" required>
            <input type="file" id="doc-upload-file" class="input-control" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.png,.jpg">
          </div>
          <div style="display:flex; gap:10px; align-items:center;">
            <input type="url" id="doc-upload-url" class="input-control" placeholder="Hoặc dán link Google Drive / OneDrive (nếu file > 2MB)..." style="flex:1;">
            <button type="submit" class="btn btn-sm btn-primary">📤 Đăng tài liệu</button>
          </div>
        </form>
      </div>
    `
    : `
      <div style="margin-top:12px; font-size:0.82rem; color:var(--text-muted);">
        🔒 <em>Chỉ tài khoản Admin (Vũ Huy Hoàng &amp; Hồ Đắc Anh Khoa) mới có quyền tải lên hoặc cập nhật tài liệu mới.</em>
      </div>
    `;

  return `
    <div class="doc-section">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h4 style="font-size:1.05rem;">📂 Tài liệu học tập &amp; Handout (${list.length})</h4>
      </div>
      ${itemsHTML}
      ${uploadFormHTML}
    </div>
  `;
}

function handleUploadDocument(event, topicId) {
  event.preventDefault();
  if (!isAdminUser()) {
    showToast("Bạn không có quyền Admin để thực hiện thao tác này!", "error");
    return;
  }

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
    switchStudyTab("theory");
  };

  if (file) {
    if (file.size > 2.5 * 1024 * 1024) {
      showToast(
        "File lớn hơn 2.5MB! Hãy up lên Google Drive rồi dán link vào ô bên cạnh nhé.",
        "error",
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      saveNewDoc({
        id: "doc-" + Date.now(),
        title: titleInput || file.name,
        uploader: user.name,
        date: today,
        size: (file.size / 1024).toFixed(1) + " KB",
        type: file.name.split(".").pop().toUpperCase(),
        dataUrl: e.target.result,
      });
    };
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

  // Với các tài liệu tóm tắt mặc định, tạo file tải xuống ngay lập tức
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
  if (!isAdminUser()) return;
  if (!confirm("Admin xác nhận xóa tài liệu này?")) return;
  const docsMap = getAllDocuments();
  docsMap[topicId] = (docsMap[topicId] || []).filter((d) => d.id !== docId);
  saveAllDocuments(docsMap);
  showToast("Đã xóa tài liệu.", "info");
  switchStudyTab("theory");
}

/* ==========================================================================
   4. QUẢN LÝ CHUYÊN ĐỀ TOÁN HỌC (CRUD + SEARCH + FILTER + SORT)
   ========================================================================== */
function getTopics() {
  const raw = localStorage.getItem(STORAGE_KEYS.TOPICS);
  if (!raw) {
    localStorage.setItem(STORAGE_KEYS.TOPICS, JSON.stringify(DEFAULT_TOPICS));
    return [...DEFAULT_TOPICS];
  }
  try {
    return JSON.parse(raw);
  } catch {
    return [...DEFAULT_TOPICS];
  }
}

function saveTopics(topics) {
  localStorage.setItem(STORAGE_KEYS.TOPICS, JSON.stringify(topics));
}

function resetDefaultTopics() {
  if (
    confirm("Khôi phục lại 7 chuyên đề gốc của giáo trình Giải tích 1 & ĐSTT?")
  ) {
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
    if ((tStat.wrong || 0) > (tStat.correct || 0)) {
      statusBadge = `<span class="badge badge-weak">⚠️ Cần ôn lại</span>`;
    } else if ((tStat.correct || 0) > 0) {
      statusBadge = `<span class="badge badge-easy">✅ Đã nắm vững</span>`;
    }
  }

  const adminBtns = showAdminControls
    ? `
      <div style="display:flex; gap:6px;">
        <button class="btn btn-sm btn-outline" onclick="openTopicFormModal('${topic.id}')" title="Sửa chuyên đề">✏️</button>
        <button class="btn btn-sm btn-danger" onclick="deleteTopic('${topic.id}')" title="Xóa chuyên đề">🗑️</button>
      </div>
    `
    : "";

  return `
    <article class="topic-card">
      <div class="topic-banner" style="background: ${topic.bannerGradient || "linear-gradient(135deg, #2563eb, #0d9488)"};">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="topic-code">${topic.code}</span>
          ${statusBadge}
        </div>
        <div style="font-size:0.84rem; opacity:0.92; font-weight:600;">
          ${topic.theory.length} mục lý thuyết • Bài tập sinh vô hạn • Quiz thích ứng
        </div>
      </div>
      <div class="topic-body">
        <div class="topic-meta">
          <span class="badge ${subjectBadge}">${topic.subject}</span>
          <span class="badge ${getLevelBadgeClass(topic.level)}">${topic.level}</span>
        </div>
        <h3 class="topic-title">${topic.title}</h3>
        <p class="topic-summary">${topic.summary}</p>
        <div class="topic-formula-preview">${topic.previewFormula}</div>
      </div>
      <div class="topic-footer">
        <button class="btn btn-sm btn-primary" onclick="openStudyModal('${topic.id}', 'theory')">📖 Học &amp; Luyện tập</button>
        ${adminBtns}
      </div>
    </article>
  `;
}

function renderFeaturedTopics() {
  const container = document.getElementById("featured-topics-grid");
  if (!container) return;
  const topics = getTopics();
  const featured = [topics[0], topics[2], topics[6]].filter(Boolean);
  container.innerHTML = featured
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
    container.innerHTML = `
      <div class="card" style="grid-column: 1 / -1; text-align:center; padding: 48px 20px;">
        <h3>Không tìm thấy chuyên đề phù hợp</h3>
        <button class="btn btn-outline" style="margin-top:12px;" onclick="clearTopicFilters()">Xóa bộ lọc</button>
      </div>
    `;
    return;
  }

  container.innerHTML = topics
    .map((t) => createTopicCardHTML(t, true))
    .join("");
  renderMath(container);
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
        topic.previewFormula;
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
}

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
          heading: "Kiến thức trọng tâm",
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
}

/* ==========================================================================
   5. MODAL HỌC TẬP: LÝ THUYẾT + TÀI LIỆU, BÀI TẬP ĐỘNG & QUIZ THÍCH ỨNG
   ========================================================================== */
let activeStudyTopicId = null;
let currentDynamicExercises = [];

function openStudyModal(topicId, tab = "theory") {
  const topic = getTopics().find((t) => t.id === topicId);
  const modal = document.getElementById("study-modal");
  if (!topic || !modal) return;

  activeStudyTopicId = topicId;
  currentDynamicExercises = [];
  document.getElementById("study-modal-code").textContent =
    `${topic.code} • ${topic.subject}`;
  document.getElementById("study-modal-title").textContent = topic.title;

  switchStudyTab(tab);
  modal.classList.add("open");
}

function regenerateExercisesNow() {
  if (typeof generateDynamicExercises === "function" && activeStudyTopicId) {
    currentDynamicExercises = generateDynamicExercises(activeStudyTopicId);
    switchStudyTab("exercises");
    showToast("🔄 Đã sinh bộ bài tập với số liệu mới!", "info");
  }
}

function markExerciseSolved(btn) {
  if (btn.disabled) return;
  btn.disabled = true;
  btn.textContent = "✅ Đã nhận +15 XP";
  btn.classList.remove("btn-primary");
  btn.classList.add("btn-outline");
  const prog = getProgress();
  prog.solvedExercises = (prog.solvedExercises || 0) + 1;
  saveProgress(prog);
  addXP(15, "Hoàn thành bài tập tự luận");
}

function markCheckpointDone(btn) {
  if (btn.disabled) return;
  btn.disabled = true;
  btn.textContent = "✅ Đã hoàn thành (+10 XP)";
  btn.classList.remove("btn-secondary");
  btn.classList.add("btn-outline");
  addXP(10, "Hoàn thành thực hành mục lý thuyết");
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

  if (tab === "theory") {
    const theoryHTML = topic.theory
      .map(
        (item) => `
        <div class="formula-card">
          <h4 style="margin-bottom:6px; color:var(--primary);">${item.heading}</h4>
          <div>${item.content}</div>
        </div>
      `,
      )
      .join("");

    // Gắn thêm kho Tài liệu học tập + Khung Upload của Admin ngay bên dưới Lý thuyết
    body.innerHTML = theoryHTML + renderChapterDocumentsHTML(topic.id);
  } else if (tab === "exercises") {
    const exList =
      currentDynamicExercises.length > 0
        ? currentDynamicExercises
        : topic.exercises;
    body.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:16px; padding:12px 16px; background:var(--bg-surface-alt); border-radius:12px;">
        <span style="font-size:0.9rem; font-weight:600;">💡 Luyện thêm đề mới với số liệu biến thiên tự động:</span>
        <button class="btn btn-sm btn-secondary" onclick="regenerateExercisesNow()">🔄 Đổi bộ bài tập mới</button>
      </div>
      ${exList
        .map(
          (ex, idx) => `
          <div class="exercise-item">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <strong>Bài tập ${idx + 1}</strong>
              <span class="badge ${ex.level.includes("Khó") ? "badge-hard" : "badge-medium"}">${ex.level}</span>
            </div>
            <p style="margin-bottom:12px;">${ex.question}</p>
            <div style="display:flex; flex-wrap:wrap; gap:8px;">
              <button class="btn btn-sm btn-outline" onclick="toggleSolution('sol-${idx}')">👁️ Xem / Ẩn lời giải</button>
              <button class="btn btn-sm btn-primary" onclick="markExerciseSolved(this)">✔️ Đã tự giải xong (+15 XP)</button>
            </div>
            <div class="solution-box" id="sol-${idx}">
              <strong>Hướng dẫn giải chi tiết:</strong> ${ex.solution}
            </div>
          </div>
        `,
        )
        .join("")}
    `;
  } else if (tab === "quiz") {
    const prog = getProgress();
    // Sắp xếp ưu tiên các câu user từng làm sai lên trước (Adaptive Quiz)
    const indexedQuiz = topic.quiz.map((q, origIdx) => {
      const qKey = `${topic.id}_q${origIdx}`;
      const stat = (prog.questionStats || {})[qKey] || { correct: 0, wrong: 0 };
      const priority = (stat.wrong || 0) - (stat.correct || 0);
      return { ...q, origIdx, qKey, stat, priority };
    });
    indexedQuiz.sort((a, b) => b.priority - a.priority);

    body.innerHTML = `
      <div style="margin-bottom:14px; font-size:0.88rem; color:var(--text-secondary);">
        🧠 <strong>Chế độ Quiz Thích ứng:</strong> Hệ thống tự động ưu tiên đưa các câu bạn từng sai lên đầu để củng cố kiến thức và cộng dồn điểm XP.
      </div>
      <form id="quiz-form" onsubmit="submitTopicQuiz(event)">
        ${indexedQuiz
          .map(
            (q, displayIdx) => `
            <div class="exercise-item" id="quiz-block-${q.origIdx}">
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
    `;
  }

  renderMath(body);
}

function toggleSolution(elId) {
  const el = document.getElementById(elId);
  if (el) {
    el.classList.toggle("open");
    renderMath(el);
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
      earnedXP += wasWeak ? 40 : 25; // Thưởng 40 XP nếu khắc phục được câu từng sai
      prog.questionStats[qKey].correct++;
      prog.topicStats[topic.id].correct++;
    } else {
      earnedXP += 5; // Điểm khuyến khích
      prog.questionStats[qKey].wrong++;
      prog.topicStats[topic.id].wrong++;
    }

    const expEl = document.getElementById(`quiz-exp-${origIdx}`);
    expEl.style.display = "block";
    expEl.innerHTML = `💡 <strong>Giải thích:</strong> ${q.explanation}`;
    // SỬA LỖI RENDER CÔNG THỨC TOÁN Ở ĐÂY: Gọi KaTeX ngay cho khung giải thích vừa mở!
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

// Chế độ Ôn tập tổng hợp riêng những câu user hay làm sai trên toàn bộ 7 chương
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
   6. QUẢN LÝ TÀI KHOẢN & PHÂN QUYỀN ADMIN (HOÀNG & KHOA)
   ========================================================================== */
function getUsers() {
  const raw = localStorage.getItem(STORAGE_KEYS.USERS);
  let users = raw ? JSON.parse(raw) : [];
  // Đảm bảo 2 tài khoản Admin của Hoàng và Khoa luôn tồn tại sẵn trong hệ thống
  ADMIN_ACCOUNTS.forEach((adm) => {
    if (!users.some((u) => u.studentId === adm.studentId)) {
      users.push({ ...adm });
    }
  });
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  return users;
}

function getCurrentUser() {
  const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return raw ? JSON.parse(raw) : null;
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
  // Cho phép đăng nhập bằng Email HOẶC Mã số sinh viên (52.01.104.124 / 52.01.104.042)
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
   7. FORM LIÊN HỆ & FAQ
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

/* ==========================================================================
   8. KHỞI CHẠY TOÀN BỘ ỨNG DỤNG
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  getUsers(); // Khởi tạo sẵn 2 tài khoản Admin của Hoàng & Khoa
  initTheme();
  initNavigation();
  initScrollReveal();
  renderXPWidget();
  renderFeaturedTopics();
  renderTopicsGrid();
  initAuthPage();
  renderMath(document.body);
});
