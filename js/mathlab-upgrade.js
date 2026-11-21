(function () {
  const STORAGE_KEYS = {
    SECTIONS: "mathlab_completed_sections_v1",
  };

  function typesetMath(el) {
    if (!el) return;
    if (typeof window.renderMathInElement === "function") {
      window.renderMathInElement(el, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
        ],
        throwOnError: false,
      });
    }
  }

  /* =========================================================
     A. NÂNG CẤP KHUNG DIỄN ĐÀN & BỘ GÕ LATEX TRỰC QUAN
     ========================================================= */
  const LATEX_GROUPS = {
    "Giải tích 1": [
      { label: "lim", code: "\\lim_{x \\to 0} " },
      { label: "a/b", code: "\\frac{a}{b}" },
      { label: "∫", code: "\\int_{a}^{b} f(x)\\,dx" },
      { label: "∑", code: "\\sum_{n=1}^{\\infty} " },
      { label: "√", code: "\\sqrt{x}" },
      { label: "∞", code: "\\infty" },
      { label: "≈ / ~", code: "\\sim " },
      { label: "∂", code: "\\frac{\\partial f}{\\partial x}" },
    ],
    "Đại số tuyến tính": [
      {
        label: "Ma trận 2×2",
        code: "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}",
      },
      {
        label: "Ma trận 3×3",
        code: "\\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}",
      },
      { label: "det(A)", code: "\\det(A)" },
      { label: "rank(A)", code: "\\text{rank}(A)" },
      { label: "ℝⁿ", code: "\\mathbb{R}^n" },
      { label: "span", code: "\\text{span}\\{v_1, v_2\\}" },
      { label: "∈", code: "\\in " },
      { label: "⊥", code: "\\perp " },
    ],
    "Toán rời rạc": [
      { label: "¬ (Phủ định)", code: "\\neg " },
      { label: "∧ (Hội)", code: "\\land " },
      { label: "∨ (Tuyển)", code: "\\lor " },
      { label: "→ (Kéo theo)", code: "\\to " },
      { label: "↔ (Tương đương)", code: "\\leftrightarrow " },
      { label: "≡ (Logic)", code: "\\equiv " },
      { label: "∀ (Với mọi)", code: "\\forall " },
      { label: "∃ (Tồn tại)", code: "\\exists " },
      { label: "∪ / ∩", code: "\\cup " },
      { label: "∅", code: "\\emptyset" },
    ],
  };

  function enhanceForumComposer() {
    const forumTextarea = document.getElementById("forum-post-content");
    if (!forumTextarea || forumTextarea.dataset.latexEnhanced === "1") return;

    forumTextarea.dataset.latexEnhanced = "1";
    forumTextarea.classList.add("forum-textarea-full");
    forumTextarea.placeholder =
      "Nhập nội dung thảo luận hoặc công thức Toán học (dùng $...$ cho công thức cùng dòng, $$...$$ cho công thức khối)...";

    const parentForm =
      forumTextarea.closest("form") || forumTextarea.parentElement;
    if (parentForm) {
      parentForm.classList.add("forum-composer-upgraded");
      const submitBtn = parentForm.querySelector(
        "button[type='submit'], button",
      );
      if (submitBtn) submitBtn.classList.add("forum-submit-full");
    }

    const tagSelect = document.getElementById("forum-post-tag");
    if (tagSelect) {
      const hasDiscrete = Array.from(tagSelect.options).some((o) =>
        o.text.includes("Toán rời rạc"),
      );
      if (!hasDiscrete) {
        const opt = document.createElement("option");
        opt.value = "Toán rời rạc";
        opt.textContent = "Toán rời rạc";
        tagSelect.appendChild(opt);
      }
    }

    const toolbar = document.createElement("div");
    toolbar.className = "latex-toolbar";

    const tabsRow = document.createElement("div");
    tabsRow.className = "latex-toolbar-tabs";

    const gridRow = document.createElement("div");
    gridRow.className = "latex-symbols-grid";

    let activeGroup = "Giải tích 1";

    function insertLatexSnippet(code) {
      const start = forumTextarea.selectionStart || 0;
      const end = forumTextarea.selectionEnd || 0;
      const val = forumTextarea.value;
      const before = val.slice(0, start);
      const dollarCount = (before.match(/\$/g) || []).length;
      const wrapped = dollarCount % 2 === 1 ? code : `$${code}$`;

      forumTextarea.value = val.slice(0, start) + wrapped + val.slice(end);
      const cursorPos = start + wrapped.length;
      forumTextarea.focus();
      forumTextarea.setSelectionRange(cursorPos, cursorPos);
      forumTextarea.dispatchEvent(new Event("input", { bubbles: true }));
    }

    function renderGroupButtons() {
      gridRow.innerHTML = "";
      (LATEX_GROUPS[activeGroup] || []).forEach((item) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "latex-sym-btn";
        btn.textContent = item.label;
        btn.title = item.code;
        btn.addEventListener("click", () => insertLatexSnippet(item.code));
        gridRow.appendChild(btn);
      });
    }

    Object.keys(LATEX_GROUPS).forEach((groupName) => {
      const tab = document.createElement("button");
      tab.type = "button";
      tab.className =
        "latex-tab-btn" + (groupName === activeGroup ? " active" : "");
      tab.textContent = groupName;
      tab.addEventListener("click", () => {
        activeGroup = groupName;
        tabsRow
          .querySelectorAll(".latex-tab-btn")
          .forEach((b) => b.classList.remove("active"));
        tab.classList.add("active");
        renderGroupButtons();
      });
      tabsRow.appendChild(tab);
    });

    renderGroupButtons();
    toolbar.appendChild(tabsRow);
    toolbar.appendChild(gridRow);

    const previewWrap = document.createElement("div");
    previewWrap.className = "latex-live-preview";
    previewWrap.innerHTML = `
      <div class="latex-live-preview-label">Xem trước hiển thị LaTeX trực tiếp</div>
      <div class="latex-live-preview-content" style="color:var(--text-muted);">Gõ công thức dạng <code>$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$</code> để xem trước tại đây...</div>
    `;

    const previewContent = previewWrap.querySelector(
      ".latex-live-preview-content",
    );

    forumTextarea.parentNode.insertBefore(toolbar, forumTextarea);
    forumTextarea.insertAdjacentElement("afterend", previewWrap);

    forumTextarea.addEventListener("input", () => {
      const raw = forumTextarea.value.trim();
      if (!raw) {
        previewContent.style.color = "var(--text-muted)";
        previewContent.innerHTML =
          "Gõ công thức dạng <code>$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$</code> để xem trước tại đây...";
        return;
      }
      previewContent.style.color = "var(--text-primary)";
      previewContent.textContent = raw;
      typesetMath(previewContent);
    });
  }

  /* =========================================================
     B. THANH TIẾN TRÌNH HỌC TẬP (%) TRÊN THẺ BÀI HỌC & MODAL
     ========================================================= */
  function getCompletedSections() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.SECTIONS) || "{}");
    } catch {
      return {};
    }
  }

  function setSectionCompleted(sectionKey, isDone) {
    const map = getCompletedSections();
    const wasDone = !!map[sectionKey];
    if (isDone) {
      map[sectionKey] = true;
      if (!wasDone && typeof window.addXP === "function") {
        window.addXP(5, "Hoàn thành mục lý thuyết");
      }
    } else {
      delete map[sectionKey];
    }
    localStorage.setItem(STORAGE_KEYS.SECTIONS, JSON.stringify(map));
    injectProgressBarsOnCards();
  }

  function injectProgressBarsOnCards() {
    const completedMap = getCompletedSections();
    const buttons = Array.from(document.querySelectorAll("button, a")).filter(
      (el) => (el.textContent || "").includes("Học bài & Thực hành"),
    );

    buttons.forEach((btn, idx) => {
      const card =
        btn.closest(
          ".topic-card, .course-card, .chapter-card, .product-card, .card, article",
        ) || btn.parentElement?.parentElement;
      if (!card) return;

      const codeEl = card.querySelector(".topic-code, .badge, span");
      const titleEl = card.querySelector("h2, h3, h4, .card-title");
      const rawTitle = titleEl
        ? titleEl.textContent.trim()
        : `Chương ${idx + 1}`;
      const codeText = codeEl ? codeEl.textContent.trim() : "";
      const displayTitle =
        codeText && codeText.length < 30 && !rawTitle.includes(codeText)
          ? `${codeText} — ${rawTitle}`
          : rawTitle;

      const badgeEl = Array.from(card.querySelectorAll("span, div")).find(
        (el) => /\d+\s*phần Lý thuyết/i.test(el.textContent || ""),
      );
      const totalPartsMatch = badgeEl
        ? badgeEl.textContent.match(/(\d+)\s*phần/i)
        : null;
      const totalParts = totalPartsMatch ? parseInt(totalPartsMatch[1], 10) : 5;

      const prefix = `chap_${rawTitle}::`;
      let doneCount = Object.keys(completedMap).filter((k) =>
        k.startsWith(prefix),
      ).length;
      if (doneCount > totalParts) doneCount = totalParts;

      const percent = Math.round((doneCount / totalParts) * 100);

      let progressBox = card.querySelector(".chapter-progress-box");
      if (!progressBox) {
        progressBox = document.createElement("div");
        progressBox.className = "chapter-progress-box";
        const actionRow = btn.parentElement;
        if (actionRow && actionRow.parentElement === card) {
          card.insertBefore(progressBox, actionRow);
        } else {
          btn.parentElement.insertAdjacentElement("beforebegin", progressBox);
        }
      }

      progressBox.dataset.chapterTitle = displayTitle;
      progressBox.dataset.percent = String(percent);
      progressBox.dataset.doneCount = String(doneCount);
      progressBox.dataset.totalParts = String(totalParts);

      progressBox.innerHTML = `
        <div class="chapter-progress-header">
          <span>Tiến độ học tập (${doneCount}/${totalParts} phần)</span>
          <span class="chapter-progress-percent ${percent === 100 ? "completed" : ""}">${percent}%</span>
        </div>
        <div class="chapter-progress-track">
          <div class="chapter-progress-fill ${percent === 100 ? "completed" : ""}" style="width: ${percent}%;"></div>
        </div>
      `;
    });
  }

  function observeStudyModal() {
    const studyModal = document.getElementById("study-modal");
    if (!studyModal) return;

    const attachSectionButtons = () => {
      const modalHeadings = Array.from(
        studyModal.querySelectorAll(".unit-header, h2, h3, h4"),
      ).filter((h) => /^\d+\.\s+/.test((h.textContent || "").trim()));

      modalHeadings.forEach((heading) => {
        const sectionBox =
          heading.closest(".unit-block") || heading.parentElement;
        if (!sectionBox || sectionBox.dataset.hasCompleteBtn === "1") return;

        sectionBox.dataset.hasCompleteBtn = "1";
        const modalTitleEl = studyModal.querySelector(
          "#study-modal-title, h2, h3",
        );
        const chapName = modalTitleEl
          ? modalTitleEl.textContent.trim()
          : "General";
        const secName = heading.textContent.trim();
        const key = `chap_${chapName}::${secName}`;

        const completedMap = getCompletedSections();
        const isDone = !!completedMap[key];

        const toggleBtn = document.createElement("button");
        toggleBtn.type = "button";
        toggleBtn.className = "section-complete-btn" + (isDone ? " done" : "");
        toggleBtn.innerHTML = isDone
          ? "✓ Đã hoàn thành phần này"
          : "○ Đánh dấu đã học xong phần này (+5 XP)";

        toggleBtn.addEventListener("click", () => {
          const current = !!getCompletedSections()[key];
          const next = !current;
          setSectionCompleted(key, next);
          toggleBtn.classList.toggle("done", next);
          toggleBtn.innerHTML = next
            ? "✓ Đã hoàn thành phần này"
            : "○ Đánh dấu đã học xong phần này (+5 XP)";
        });

        sectionBox.appendChild(toggleBtn);
      });
    };

    const observer = new MutationObserver(attachSectionButtons);
    observer.observe(studyModal, { childList: true, subtree: true });
  }

  function observeDynamicGrids() {
    const targets = ["topics-grid", "featured-topics", "community-hub"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    targets.forEach((el) => {
      const obs = new MutationObserver(() => {
        injectProgressBarsOnCards();
        enhanceForumComposer();
      });
      obs.observe(el, { childList: true, subtree: false });
    });
  }

  window.MathLabUpgrades = {
    injectProgressBarsOnCards,
    getCompletedSections,
    enhanceForumComposer,
  };

  function initMathLabUpgrades() {
    enhanceForumComposer();
    injectProgressBarsOnCards();
    observeStudyModal();
    observeDynamicGrids();
    window.refreshMathLabProgress = injectProgressBarsOnCards;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMathLabUpgrades);
  } else {
    initMathLabUpgrades();
  }
})();
