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

      // Chuẩn hóa tên để đối soát không sợ lệch mã môn (GT1.1, ĐSTT, Chương...)
      const cleanCardTitle = rawTitle
        .toLowerCase()
        .replace(
          /^(chương\s*\d+|gt\d+[-_.]?\d*|đstt[-_.]?\d*|trr[-_.]?\d*)\s*[:—–-]?\s*/i,
          "",
        )
        .replace(/[^a-z0-9\u00C0-\u024F\u1EA0-\u1EF9]/gi, "");

      let doneCount = Object.keys(completedMap).filter((k) => {
        if (!completedMap[k]) return false;
        const keyChap = (k.split("::")[0] || "")
          .replace(/^chap_/, "")
          .toLowerCase()
          .replace(
            /^(chương\s*\d+|gt\d+[-_.]?\d*|đstt[-_.]?\d*|trr[-_.]?\d*)\s*[:—–-]?\s*/i,
            "",
          )
          .replace(/[^a-z0-9\u00C0-\u024F\u1EA0-\u1EF9]/gi, "");
        return (
          cleanCardTitle &&
          (keyChap.includes(cleanCardTitle) || cleanCardTitle.includes(keyChap))
        );
      }).length;
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
        // Dùng sectionBox.id (unit-sec-0, unit-sec-1...) để khớp tuyệt đối với mục lục
        const secId = sectionBox.id || heading.textContent.trim();
        const key = `chap_${chapName}::${secId}`;

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

    let secRaf = false;
    const observer = new MutationObserver(() => {
      if (secRaf) return;
      secRaf = true;
      requestAnimationFrame(() => {
        secRaf = false;
        observer.disconnect();
        attachSectionButtons();
        observer.observe(studyModal, { childList: true, subtree: true });
      });
    });
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

  /* =========================================================
     C. INSTANT THEME SYNC, ZERO-FLASH CURTAIN & FAST KATEX ENGINE
     ========================================================= */
  // 1. Đồng bộ Dark/Light Theme NGAY LẬP TỨC từ localStorage trước khi vẽ trang
  (function syncThemeImmediately() {
    try {
      let saved =
        localStorage.getItem("mathlab_theme_v1") ||
        localStorage.getItem("mathlab_theme") ||
        localStorage.getItem("theme");
      if (!saved) {
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.toLowerCase().includes("theme")) {
            saved = localStorage.getItem(k);
            break;
          }
        }
      }
      if (saved === "dark" || saved === "light") {
        document.documentElement.setAttribute("data-theme", saved);
        document.documentElement.style.backgroundColor =
          saved === "dark" ? "#070b14" : "#e6ecf5";
      }
    } catch (_) {}
  })();

  function ensurePageCurtain(startActive = false) {
    if (!document.body) return null;
    let curtain = document.getElementById("ml-page-curtain");
    if (!curtain) {
      curtain = document.createElement("div");
      curtain.id = "ml-page-curtain";
      curtain.innerHTML = `
        <div class="ml-curtain-badge">
          <span class="ml-curtain-dot"></span>
          <span>∫∑x MATHLAB HCMUE</span>
        </div>
      `;
      if (startActive) curtain.classList.add("active");
      document.body.appendChild(curtain);
    } else if (startActive) {
      curtain.classList.add("active");
    }
    return curtain;
  }

  const isIncomingTransition =
    sessionStorage.getItem("ml_nav_transition") === "1";
  if (isIncomingTransition && document.body) {
    ensurePageCurtain(true);
  }

  // 2. Tối ưu siêu tốc cho máy yếu: Dịch KaTeX bất đồng bộ qua requestAnimationFrame & Idle Scheduler (0% giật lag)
  function installProgressiveKatex() {
    let attempts = 0;
    const patchTimer = setInterval(() => {
      attempts++;
      if (typeof window.renderMathInElement === "function") {
        clearInterval(patchTimer);
        if (window.renderMathInElement.__mlPatched) return;

        const origRender = window.renderMathInElement;
        const wrappedRender = function (elem, options) {
          if (!elem) return;

          const sections = elem.querySelectorAll
            ? Array.from(elem.querySelectorAll(".unit-block"))
            : [];

          // Nếu chương dài (> 4 phần), chỉ render ngay phần đầu tiên, phần còn lại rải đều qua các frame
          if (sections.length > 4) {
            const immediateBlock = sections[0];
            const deferredBlocks = sections.slice(1);

            Array.from(elem.children).forEach((child) => {
              if (!child.classList?.contains("unit-block")) {
                origRender(child, options);
              }
            });
            if (immediateBlock) origRender(immediateBlock, options);

            let idx = 0;
            const renderNextBatch = () => {
              const batch = deferredBlocks.slice(idx, idx + 2); // Mỗi frame chỉ dịch 2 phần, cực kỳ nhẹ cho máy yếu
              if (!batch.length) return;
              batch.forEach((sec) => {
                if (document.body.contains(sec)) origRender(sec, options);
              });
              idx += 2;
              if (idx < deferredBlocks.length) {
                requestAnimationFrame(renderNextBatch);
              }
            };
            requestAnimationFrame(() => setTimeout(renderNextBatch, 12));
            return;
          }

          return origRender(elem, options);
        };
        wrappedRender.__mlPatched = true;
        window.renderMathInElement = wrappedRender;
      } else if (attempts > 40) {
        clearInterval(patchTimer);
      }
    }, 50);
  }
  installProgressiveKatex();

  function initSmoothPageTransitions() {
    if (!document.getElementById("ml-top-progress")) {
      const bar = document.createElement("div");
      bar.id = "ml-top-progress";
      document.body.appendChild(bar);
    }

    const curtain = ensurePageCurtain(isIncomingTransition);

    if (isIncomingTransition) {
      sessionStorage.removeItem("ml_nav_transition");
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (curtain) curtain.classList.remove("active");
        }, 210);
      });
    }

    window.addEventListener("pageshow", () => {
      sessionStorage.removeItem("ml_nav_transition");
      if (curtain) curtain.classList.remove("active");
      const bar = document.getElementById("ml-top-progress");
      if (bar) {
        bar.style.opacity = "0";
        bar.style.width = "0%";
      }
    });

    const prefetched = new Set();
    document.addEventListener("mouseover", (e) => {
      const link = e.target.closest("a[href]");
      if (!link) return;
      const href = link.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("javascript:") ||
        href.startsWith("http") ||
        prefetched.has(href)
      ) {
        return;
      }
      prefetched.add(href);
      const pf = document.createElement("link");
      pf.rel = "prefetch";
      pf.href = href;
      document.head.appendChild(pf);
    });

    document.addEventListener("click", (e) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey
      ) {
        return;
      }
      const link = e.target.closest("a[href]");
      if (!link || link.target === "_blank" || link.hasAttribute("download"))
        return;

      const rawHref = link.getAttribute("href");
      if (
        !rawHref ||
        rawHref.startsWith("#") ||
        rawHref.startsWith("javascript:") ||
        rawHref.startsWith("mailto:") ||
        rawHref.startsWith("tel:")
      ) {
        return;
      }

      const targetUrl = new URL(link.href, window.location.href);
      if (targetUrl.origin !== window.location.origin) return;
      if (
        targetUrl.pathname === window.location.pathname &&
        targetUrl.search === window.location.search &&
        targetUrl.hash
      ) {
        return;
      }

      e.preventDefault();
      // Lưu lại theme hiện tại vào storage để trang mới nhận diện tức thì
      const curTheme =
        document.documentElement.getAttribute("data-theme") || "light";
      try {
        localStorage.setItem("mathlab_theme_v1", curTheme);
        localStorage.setItem("mathlab_theme", curTheme);
      } catch (_) {}
      sessionStorage.setItem("ml_nav_transition", "1");

      const bar = document.getElementById("ml-top-progress");
      if (bar) {
        bar.style.opacity = "1";
        bar.style.width = "78%";
      }
      if (curtain) curtain.classList.add("active");

      setTimeout(() => {
        if (bar) bar.style.width = "100%";
        window.location.href = targetUrl.href;
      }, 260);
    });
  }

  function initScrollChoreography() {
    const navbar = document.querySelector(".navbar");
    let scrollLine = document.getElementById("ml-scroll-indicator");
    if (navbar && !scrollLine) {
      scrollLine = document.createElement("div");
      scrollLine.id = "ml-scroll-indicator";
      navbar.appendChild(scrollLine);
    }

    let cachedMaxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight,
    );
    const refreshMaxScroll = () => {
      cachedMaxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
    };
    window.addEventListener("resize", refreshMaxScroll, { passive: true });
    window.addEventListener("load", refreshMaxScroll, { passive: true });
    if (typeof ResizeObserver !== "undefined" && document.body) {
      const bodyResizeObs = new ResizeObserver(refreshMaxScroll);
      bodyResizeObs.observe(document.body);
    }

    let scrollRaf = false;
    const updateScrollEffects = (forcedY) => {
      scrollRaf = false;
      const y =
        typeof forcedY === "number"
          ? forcedY
          : window.scrollY || window.pageYOffset;
      const pct =
        cachedMaxScroll > 0 ? Math.min(1, Math.max(0, y / cachedMaxScroll)) : 0;

      if (navbar) navbar.classList.toggle("ml-scrolled", y > 16);
      if (scrollLine) {
        scrollLine.style.width = "100%";
        scrollLine.style.transformOrigin = "left center";
        scrollLine.style.transform = `scaleX(${pct.toFixed(4)})`;
      }
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!scrollRaf) {
          scrollRaf = true;
          requestAnimationFrame(() => updateScrollEffects());
        }
      },
      { passive: true },
    );
    updateScrollEffects();

    // Cuộn quán tính mượt chuẩn (không giật ngược khi lướt qua <pre>, <select>, vùng cuộn ngang)
    (function setupSilkyScroll() {
      document.documentElement.style.scrollBehavior = "auto";
      if (document.body) document.body.style.scrollBehavior = "auto";

      let currentY = window.scrollY;
      let targetY = window.scrollY;
      let isAnimating = false;
      let lastTime = 0;
      let lastWrittenY = null;

      const canScrollVertically = (el, deltaY) => {
        if (!el || el.nodeType !== 1) return false;
        const cs = window.getComputedStyle(el);
        const ovY = cs.overflowY;
        if (ovY !== "auto" && ovY !== "scroll" && ovY !== "overlay") {
          return false;
        }
        if (el.scrollHeight <= el.clientHeight + 2) return false;
        if (deltaY === 0) return true;
        if (deltaY < 0) return el.scrollTop > 0;
        const prevTop = el.scrollTop;
        if (prevTop + el.clientHeight >= el.scrollHeight - 1) return false;
        el.scrollTop = prevTop + 1;
        const didMove = el.scrollTop !== prevTop;
        if (didMove) el.scrollTop = prevTop;
        return didMove;
      };

      const OVERLAY_SELECTOR =
        ".modal-backdrop.open, #pm-ai-drawer.open, #pikeman-ai-drawer.open, .pm-ai-drawer.open, .pikeman-ai-drawer.open, #ml-cmd-backdrop.open";

      const findOpenOverlay = (target) => {
        const startEl =
          target && target.nodeType === 1 ? target : target?.parentElement;
        return startEl?.closest ? startEl.closest(OVERLAY_SELECTOR) : null;
      };

      const isInsideScrollableBox = (
        target,
        deltaY = 0,
        boundaryEl = document.body,
      ) => {
        let el =
          target && target.nodeType === 1 ? target : target?.parentElement;
        while (
          el &&
          el !== boundaryEl &&
          el !== document.body &&
          el !== document.documentElement
        ) {
          if (el.tagName === "TEXTAREA") {
            if (canScrollVertically(el, deltaY)) {
              el.style.overscrollBehavior = "contain";
              return true;
            }
          } else if (el.tagName === "SELECT") {
            if (
              (el.multiple || el.size > 1) &&
              canScrollVertically(el, deltaY)
            ) {
              el.style.overscrollBehavior = "contain";
              return true;
            }
          } else if (canScrollVertically(el, deltaY)) {
            el.style.overscrollBehavior = "contain";
            return true;
          }
          el = el.parentElement;
        }
        return false;
      };

      const syncFromNative = () => {
        isAnimating = false;
        lastTime = 0;
        lastWrittenY = null;
        currentY = window.scrollY;
        targetY = window.scrollY;
      };

      const renderScroll = (now) => {
        if (!isAnimating) return;
        const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.025) : 0.016;
        lastTime = now;

        refreshMaxScroll();
        targetY = Math.max(0, Math.min(cachedMaxScroll, targetY));

        const diff = targetY - currentY;
        if (Math.abs(diff) < 0.4) {
          currentY = targetY;
          const finalY = Math.max(
            0,
            Math.min(cachedMaxScroll, Math.round(currentY)),
          );
          lastWrittenY = finalY;
          window.scrollTo(window.scrollX, finalY);
          updateScrollEffects(finalY);
          isAnimating = false;
          lastTime = 0;
          lastWrittenY = null;
          return;
        }

        const ease = 1 - Math.exp(-11 * dt);
        currentY += diff * ease;
        const nextY = Math.max(
          0,
          Math.min(cachedMaxScroll, Math.round(currentY)),
        );
        lastWrittenY = nextY;
        window.scrollTo(window.scrollX, nextY);
        updateScrollEffects(nextY);
        requestAnimationFrame(renderScroll);
      };

      window.addEventListener(
        "pointerdown",
        (e) => {
          if (e.clientX >= document.documentElement.clientWidth - 22) {
            syncFromNative();
          }
        },
        { passive: true },
      );
      window.addEventListener("touchstart", syncFromNative, { passive: true });
      window.addEventListener(
        "keydown",
        (e) => {
          if (
            [
              "ArrowUp",
              "ArrowDown",
              "PageUp",
              "PageDown",
              "Home",
              "End",
              " ",
            ].includes(e.key)
          ) {
            syncFromNative();
          }
        },
        { passive: true },
      );
      window.addEventListener(
        "scroll",
        () => {
          if (!isAnimating) {
            currentY = window.scrollY;
            targetY = window.scrollY;
          } else if (
            lastWrittenY !== null &&
            Math.abs(window.scrollY - lastWrittenY) > 12
          ) {
            syncFromNative();
          }
        },
        { passive: true },
      );

      window.addEventListener(
        "wheel",
        (e) => {
          if (e.ctrlKey || e.metaKey) return;
          if (e.defaultPrevented) {
            syncFromNative();
            return;
          }

          if (
            e.shiftKey ||
            (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaY) < 2)
          ) {
            syncFromNative();
            return;
          }

          const rawDelta =
            e.deltaMode === 1
              ? e.deltaY * 34
              : e.deltaMode === 2
                ? e.deltaY * window.innerHeight
                : e.deltaY;

          const activeOverlay = findOpenOverlay(e.target);
          if (activeOverlay) {
            if (!isInsideScrollableBox(e.target, rawDelta, activeOverlay)) {
              e.preventDefault();
            }
            syncFromNative();
            return;
          }

          if (isInsideScrollableBox(e.target, rawDelta)) {
            syncFromNative();
            return;
          }

          e.preventDefault();
          refreshMaxScroll();

          const clampedDelta = Math.max(-320, Math.min(320, rawDelta));

          if (!isAnimating) {
            currentY = window.scrollY;
            targetY = window.scrollY;
            lastTime = 0;
            lastWrittenY = null;
          }
          targetY += clampedDelta * 0.95;
          if (!isAnimating) {
            isAnimating = true;
            requestAnimationFrame(renderScroll);
          }
        },
        { passive: false },
      );

      document.addEventListener("click", (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;
        const hash = anchor.getAttribute("href");
        if (!hash || hash.length < 2) return;
        const dest = document.querySelector(hash);
        if (!dest) return;

        e.preventDefault();
        refreshMaxScroll();
        const navH = document.querySelector(".navbar")?.offsetHeight || 72;
        const destTop =
          dest.getBoundingClientRect().top + window.scrollY - navH - 12;
        if (!isAnimating) {
          currentY = window.scrollY;
          lastTime = 0;
          lastWrittenY = null;
        }
        targetY = destTop;
        isAnimating = true;
        requestAnimationFrame(renderScroll);
      });
    })();

    // Bi-directional Scroll Reveal (Giữ ổn định các khối lớn như Phòng Lab #math-lab)
    const revealSelector =
      ".topic-card, .stat-item, .contrib-hub-card, .forum-post, .xp-banner, .card, .lab-wrapper, .section-header";

    const observer = new IntersectionObserver(
      (entries) => {
        let batchIdx = 0;
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.style.setProperty(
              "--ml-delay",
              `${Math.min(batchIdx * 45, 220)}ms`,
            );
            el.classList.add("ml-in-view");
            batchIdx++;
          } else {
            if (
              el.classList.contains("lab-wrapper") ||
              el.offsetHeight > window.innerHeight * 0.75
            ) {
              return;
            }
            el.style.setProperty("--ml-delay", "0ms");
            const exitDir = entry.boundingClientRect.top < 0 ? "-22px" : "28px";
            el.style.setProperty("--ml-dir", exitDir);
            el.classList.remove("ml-in-view");
          }
        });
      },
      { threshold: 0.01 },
    );

    const scanRevealTargets = () => {
      document.querySelectorAll(revealSelector).forEach((el) => {
        if (el.closest(".modal-backdrop")) return;
        if (el.dataset.mlRevealBound === "1") return;
        el.dataset.mlRevealBound = "1";
        el.classList.remove("reveal");
        el.classList.add("ml-scroll-item");
        observer.observe(el);
      });
      refreshMaxScroll();
    };

    scanRevealTargets();
    let revealTimer = null;
    const domObs = new MutationObserver(() => {
      if (revealTimer) return;
      revealTimer = setTimeout(() => {
        revealTimer = null;
        scanRevealTargets();
      }, 150);
    });
    domObs.observe(document.body, { childList: true, subtree: true });
  }

  function init3DBorderGlow() {
    let activeCard = null;
    let cachedRect = null;
    let lastRectScrollY = window.scrollY;
    let glowRaf = false;
    let lastClientX = 0;
    let lastClientY = 0;
    const cardSelector =
      ".topic-card, .stat-item, .contrib-hub-card, .card, .xp-banner, .forum-post";

    document.addEventListener(
      "pointerover",
      (e) => {
        const card = e.target.closest(cardSelector);
        if (card && card !== activeCard) {
          activeCard = card;
          cachedRect = card.getBoundingClientRect();
          lastRectScrollY = window.scrollY;
        } else if (!card && activeCard && !activeCard.contains(e.target)) {
          activeCard = null;
          cachedRect = null;
        }
      },
      { passive: true },
    );

    document.addEventListener(
      "pointermove",
      (e) => {
        if (!activeCard) return;
        lastClientX = e.clientX;
        lastClientY = e.clientY;
        if (glowRaf) return;
        glowRaf = true;
        requestAnimationFrame(() => {
          glowRaf = false;
          if (!activeCard) return;
          if (!cachedRect || lastRectScrollY !== window.scrollY) {
            cachedRect = activeCard.getBoundingClientRect();
            lastRectScrollY = window.scrollY;
          }
          activeCard.style.setProperty(
            "--spot-x",
            `${lastClientX - cachedRect.left}px`,
          );
          activeCard.style.setProperty(
            "--spot-y",
            `${lastClientY - cachedRect.top}px`,
          );
        });
      },
      { passive: true },
    );
  }

  /* =========================================================
     D. GLOBAL INTERACTIVE MATH MESH & CURSOR SPOTLIGHT CANVAS
     ========================================================= */
  function initHeroMathCanvas() {
    if (!document.body || document.getElementById("ml-global-math-canvas"))
      return;

    // 1. Quầng sáng Spotlight GPU phần cứng (Chạy độc lập trên Compositor — Không nghẽn Canvas)
    let spotlight = document.getElementById("ml-cursor-spotlight");
    if (!spotlight) {
      spotlight = document.createElement("div");
      spotlight.id = "ml-cursor-spotlight";
      spotlight.style.cssText =
        "position:fixed; width:580px; height:580px; top:-290px; left:-290px; border-radius:50%; pointer-events:none; z-index:0; opacity:0; will-change:transform; transition:opacity 0.28s ease; mix-blend-mode:screen;";
      document.body.prepend(spotlight);
    }

    const canvas = document.createElement("canvas");
    canvas.id = "ml-global-math-canvas";
    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");
    const SYMBOLS = ["∫", "∑", "lim", "∂", "det", "∇", "∀", "∞", "ℝⁿ", "π"];

    let width = 0;
    let height = 0;
    let particles = [];
    const pointer = { x: -9999, y: -9999, active: false };

    function syncSpotlightTheme() {
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      spotlight.style.background = isDark
        ? "radial-gradient(circle, rgba(56, 189, 248, 0.26) 0%, rgba(99, 102, 241, 0.14) 42%, transparent 70%)"
        : "radial-gradient(circle, rgba(37, 99, 235, 0.18) 0%, rgba(14, 165, 233, 0.08) 42%, transparent 70%)";
    }
    syncSpotlightTheme();

    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", () =>
        setTimeout(syncSpotlightTheme, 60),
      );
    }

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 768 ? 22 : 36;
      particles = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.38,
        radius: Math.random() * 1.6 + 1.2,
        symbol: i % 3 === 0 ? SYMBOLS[i % SYMBOLS.length] : null,
      }));
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    let spotRaf = false;
    let isHoveringLab = false;
    window.addEventListener(
      "pointermove",
      (e) => {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        pointer.active = true;
        isHoveringLab = !!e.target.closest?.(".lab-wrapper");
        if (!spotRaf) {
          spotRaf = true;
          requestAnimationFrame(() => {
            spotRaf = false;
            if (isHoveringLab) {
              if (spotlight.style.opacity !== "0")
                spotlight.style.opacity = "0";
              return;
            }
            spotlight.style.opacity = "1";
            spotlight.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
          });
        }
      },
      { passive: true },
    );

    document.addEventListener(
      "pointerleave",
      () => {
        pointer.active = false;
        isHoveringLab = false;
        spotlight.style.opacity = "0";
      },
      { passive: true },
    );

    let cachedModalOpen = false;
    let lastModalCheck = 0;

    function renderLoop(now = 0) {
      requestAnimationFrame(renderLoop);

      if (now - lastModalCheck > 180) {
        lastModalCheck = now;
        cachedModalOpen = !!document.querySelector(
          ".modal-backdrop.open, #study-modal.open, #topic-form-modal.open, #ml-cmd-backdrop.open",
        );
      }

      if (
        document.hidden ||
        width === 0 ||
        height === 0 ||
        cachedModalOpen ||
        isHoveringLab
      ) {
        if (spotlight.style.opacity !== "0") spotlight.style.opacity = "0";
        return;
      }

      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      ctx.clearRect(0, 0, width, height);

      ctx.font = '700 14px "JetBrains Mono", monospace';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const lineRgb = isDark ? "56, 189, 248" : "37, 99, 235";
      const pointerLineRgb = isDark ? "125, 211, 252" : "2, 132, 199";
      const symbolColor = isDark
        ? "rgba(125, 211, 252, 0.7)"
        : "rgba(37, 99, 235, 0.55)";
      const dotColor = isDark
        ? "rgba(56, 189, 248, 0.85)"
        : "rgba(37, 99, 235, 0.7)";

      const pLen = particles.length;
      for (let i = 0; i < pLen; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Bounding-box pre-filter: Loại trừ nhanh các hạt ở xa trước khi tính căn bậc hai (Tối ưu 120 FPS)
        for (let j = i + 1; j < pLen; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          if (Math.abs(dx) > 140 || Math.abs(dy) > 140) continue;
          const dist = Math.hypot(dx, dy);
          if (dist < 140) {
            const alpha = (1 - dist / 140) * (isDark ? 0.35 : 0.22);
            ctx.strokeStyle = `rgba(${lineRgb}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        // Tia laser bắt dính vào con trỏ chuột
        if (pointer.active) {
          const mdx = p.x - pointer.x;
          const mdy = p.y - pointer.y;
          if (Math.abs(mdx) < 185 && Math.abs(mdy) < 185) {
            const mDist = Math.hypot(mdx, mdy);
            if (mDist < 185) {
              const mAlpha = (1 - mDist / 185) * (isDark ? 0.72 : 0.52);
              ctx.strokeStyle = `rgba(${pointerLineRgb}, ${mAlpha.toFixed(3)})`;
              ctx.lineWidth = 1.4;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(pointer.x, pointer.y);
              ctx.stroke();
            }
          }
        }

        // Vẽ ký hiệu Toán học hoặc hạt nano
        if (p.symbol) {
          ctx.fillStyle = symbolColor;
          ctx.fillText(p.symbol, p.x, p.y);
        } else {
          ctx.fillStyle = dotColor;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius + 0.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    renderLoop();
  }

  /* =========================================================
     E. BƯỚC 2/6: COMMAND PALETTE (CTRL + K) TÌM NHANH TOÀN WEB
     ========================================================= */
  function normalizeSearchText(str) {
    return String(str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d");
  }

  function initCommandPalette() {
    if (document.getElementById("ml-cmd-backdrop")) return;

    const navActions = document.querySelector(".nav-actions");
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (navActions && !document.getElementById("ml-cmd-nav-btn")) {
      const trigger = document.createElement("button");
      trigger.type = "button";
      trigger.id = "ml-cmd-nav-btn";
      trigger.className = "ml-cmd-trigger";
      trigger.title = "Tìm nhanh định lý, chương học, phòng thi (Ctrl + K)";
      trigger.innerHTML = `
        <span>🔍</span>
        <span class="ml-cmd-trigger-label">Tìm nhanh...</span>
        <kbd class="ml-cmd-kbd">Ctrl K</kbd>
      `;
      trigger.addEventListener("click", () => openPalette());
      if (themeBtn) {
        navActions.insertBefore(trigger, themeBtn);
      } else {
        navActions.prepend(trigger);
      }
    }

    const backdrop = document.createElement("div");
    backdrop.id = "ml-cmd-backdrop";
    backdrop.innerHTML = `
      <div class="ml-cmd-dialog" role="dialog" aria-modal="true" aria-label="Bảng lệnh tìm kiếm nhanh">
        <div class="ml-cmd-input-wrap">
          <span style="font-size:1.1rem;">⚡</span>
          <input type="text" id="ml-cmd-input" class="ml-cmd-input" placeholder="Gõ tên định lý, chương học (VD: Taylor, Gauss, Chuỗi, Đề thi)..." autocomplete="off" />
          <button type="button" id="ml-cmd-close" class="ml-cmd-kbd" style="cursor:pointer;">ESC</button>
        </div>
        <div class="ml-cmd-list" id="ml-cmd-list"></div>
        <div class="ml-cmd-footer">
          <span>↑↓ Di chuyển • ↵ Mở mục chọn • ESC Đóng</span>
          <span style="font-family:var(--font-mono); font-weight:700;">MathLab Quick Jump</span>
        </div>
      </div>
    `;
    document.body.appendChild(backdrop);

    const inputEl = document.getElementById("ml-cmd-input");
    const listEl = document.getElementById("ml-cmd-list");
    let filteredItems = [];
    let selectedIndex = 0;

    function navigateOrOpenStudy(topicId, sectionIdx = null) {
      if (
        typeof window.openStudyModal === "function" &&
        document.getElementById("study-modal")
      ) {
        window.openStudyModal(topicId, "lesson");
        if (sectionIdx !== null) {
          setTimeout(() => {
            document
              .getElementById(`unit-sec-${sectionIdx}`)
              ?.scrollIntoView({ behavior: "smooth" });
          }, 120);
        }
      } else {
        const hash = sectionIdx !== null ? `&sec=${sectionIdx}` : "";
        window.location.href = `products.html?study=${encodeURIComponent(topicId)}${hash}`;
      }
    }

    function buildCommandItems() {
      const items = [];
      const topics =
        typeof window.getTopics === "function"
          ? window.getTopics()
          : typeof DEFAULT_TOPICS !== "undefined"
            ? DEFAULT_TOPICS
            : [];

      topics.forEach((t) => {
        items.push({
          group: "Chuyên đề & Giáo trình",
          icon: "📘",
          title: `${t.code}: ${t.title}`,
          sub: `${t.subject} • ${t.level} — ${t.summary}`,
          keywords: `${t.code} ${t.title} ${t.subject} ${t.summary}`,
          action: () => navigateOrOpenStudy(t.id),
        });

        (t.theory || []).forEach((sec, idx) => {
          const cleanHeading = String(sec.heading || "").replace(
            /<[^>]+>/g,
            "",
          );
          items.push({
            group: "Định lý & Mục kiến thức",
            icon: "📐",
            title: cleanHeading,
            sub: `${t.code} • ${t.title}`,
            keywords: `${cleanHeading} ${t.title} ${t.code}`,
            action: () => navigateOrOpenStudy(t.id, idx),
          });
        });
      });

      items.push(
        {
          group: "Phòng thi & AI",
          icon: "⏱️",
          title: "Phòng Thi Giữa Kỳ 1 (Giải tích 1 — 60 phút)",
          sub: "Bấm giờ tự động + AI Vision chấm bài viết tay",
          keywords: "thi giua ky 1 giai tich phong thi bam gio",
          action: () =>
            typeof window.openExamHubModal === "function"
              ? window.openExamHubModal("midterm-1")
              : (window.location.href = "products.html?exam=midterm-1"),
        },
        {
          group: "Phòng thi & AI",
          icon: "⏱️",
          title: "Phòng Thi Giữa Kỳ 2 (Đại số tuyến tính — 60 phút)",
          sub: "Ma trận, Định thức, Hệ PTTT + AI chấm ảnh",
          keywords: "thi giua ky 2 dai so tuyen tinh ma tran",
          action: () =>
            typeof window.openExamHubModal === "function"
              ? window.openExamHubModal("midterm-2")
              : (window.location.href = "products.html?exam=midterm-2"),
        },
        {
          group: "Phòng thi & AI",
          icon: "🏆",
          title: "Phòng Thi Cuối Kỳ Tổng Hợp (Chương 1–7 — 90 phút)",
          sub: "Đề tổng hợp toàn học phần HCMUE",
          keywords: "thi cuoi ky tong hop 90 phut",
          action: () =>
            typeof window.openExamHubModal === "function"
              ? window.openExamHubModal("final-all")
              : (window.location.href = "products.html?exam=final-all"),
        },
        {
          group: "Phòng thi & AI",
          icon: "🤖",
          title: "Mở Trợ lý Pike Man AI (Hỏi bài / Lộ trình / Nạp đề PDF)",
          sub: "Trợ lý Toán học & Quản lý ngân hàng đề thông minh",
          keywords: "pike man ai tro ly hoi bai nap pdf",
          action: () => {
            const fab = document.getElementById("pikeman-ai-fab");
            const drawer = document.getElementById("pikeman-ai-drawer");
            if (drawer) drawer.classList.add("open");
            else if (fab) fab.click();
          },
        },
        {
          group: "Điều hướng nhanh",
          icon: "🧪",
          title: "Phòng Lab Đồ thị, Taylor & Ma trận n×n",
          sub: "Công cụ trực quan hóa hàm số và tính toán ma trận",
          keywords: "phong lab do thi taylor maclaurin ma tran",
          action: () => (window.location.href = "products.html#math-lab"),
        },
        {
          group: "Điều hướng nhanh",
          icon: "🌗",
          title: "Chuyển đổi Giao diện Sáng / Tối (Dark Mode)",
          sub: "Đổi màu nền bảo vệ mắt khi cày bài ban đêm",
          keywords: "theme dark light sang toi giao dien",
          action: () => document.getElementById("theme-toggle-btn")?.click(),
        },
      );

      return items;
    }

    function renderResults(query = "") {
      const q = normalizeSearchText(query).trim();
      const allItems = buildCommandItems();

      if (!q) {
        filteredItems = allItems
          .filter((it) => it.group !== "Định lý & Mục kiến thức")
          .slice(0, 12);
      } else {
        const tokens = q.split(/\s+/);
        filteredItems = allItems
          .filter((it) => {
            const hay = normalizeSearchText(
              `${it.title} ${it.sub} ${it.keywords}`,
            );
            return tokens.every((tk) => hay.includes(tk));
          })
          .slice(0, 16);
      }

      selectedIndex = 0;

      if (!filteredItems.length) {
        listEl.innerHTML = `<div style="padding:28px 16px; text-align:center; color:var(--text-muted); font-size:0.9rem;">Không tìm thấy mục nào khớp với "<strong>${escapeHTML(query)}</strong>".</div>`;
        return;
      }

      let lastGroup = "";
      listEl.innerHTML = filteredItems
        .map((it, idx) => {
          const groupHeader =
            it.group !== lastGroup
              ? `<div class="ml-cmd-group-label">${escapeHTML(it.group)}</div>`
              : "";
          lastGroup = it.group;
          return `
            ${groupHeader}
            <div class="ml-cmd-item ${idx === 0 ? "active" : ""}" data-cmd-idx="${idx}">
              <div class="ml-cmd-item-left">
                <div class="ml-cmd-item-icon">${it.icon}</div>
                <div style="min-width:0;">
                  <div class="ml-cmd-item-title">${escapeHTML(it.title)}</div>
                  <div class="ml-cmd-item-sub">${escapeHTML(it.sub)}</div>
                </div>
              </div>
              <span style="font-size:0.75rem; color:var(--text-muted); flex-shrink:0;">↵</span>
            </div>
          `;
        })
        .join("");

      listEl.querySelectorAll(".ml-cmd-item").forEach((row) => {
        row.addEventListener("click", () => {
          const idx = parseInt(row.dataset.cmdIdx, 10);
          executeItem(idx);
        });
      });
    }

    function updateSelection(newIdx) {
      if (!filteredItems.length) return;
      selectedIndex = (newIdx + filteredItems.length) % filteredItems.length;
      const rows = listEl.querySelectorAll(".ml-cmd-item");
      rows.forEach((r, i) => {
        r.classList.toggle("active", i === selectedIndex);
        if (i === selectedIndex) r.scrollIntoView({ block: "nearest" });
      });
    }

    function executeItem(idx) {
      const target = filteredItems[idx];
      if (!target) return;
      closePalette();
      target.action();
    }

    function openPalette() {
      backdrop.classList.add("open");
      inputEl.value = "";
      renderResults("");
      setTimeout(() => inputEl.focus(), 30);
    }

    function closePalette() {
      backdrop.classList.remove("open");
    }

    inputEl.addEventListener("input", () => renderResults(inputEl.value));
    inputEl.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        updateSelection(selectedIndex + 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        updateSelection(selectedIndex - 1);
      } else if (e.key === "Enter") {
        e.preventDefault();
        executeItem(selectedIndex);
      } else if (e.key === "Escape") {
        e.preventDefault();
        closePalette();
      }
    });

    document
      .getElementById("ml-cmd-close")
      ?.addEventListener("click", closePalette);
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closePalette();
    });

    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (backdrop.classList.contains("open")) closePalette();
        else openPalette();
      } else if (e.key === "Escape" && backdrop.classList.contains("open")) {
        closePalette();
      }
    });

    const params = new URLSearchParams(window.location.search);
    const studyParam = params.get("study");
    const secParam = params.get("sec");
    if (studyParam && typeof window.openStudyModal === "function") {
      setTimeout(() => {
        window.openStudyModal(studyParam, "lesson");
        if (secParam !== null) {
          setTimeout(() => {
            document
              .getElementById(`unit-sec-${secParam}`)
              ?.scrollIntoView({ behavior: "smooth" });
          }, 150);
        }
      }, 150);
    }
  }

  /* =========================================================
     F. BƯỚC 3/6: BỐ CỤC 2 CỘT + MỤC LỤC Ô SỐ GHIM BÊN PHẢI & ZEN FOCUS
     ========================================================= */
  function initStudyScrollSpyAndZen() {
    const studyModal = document.getElementById("study-modal");
    const wrapper = document.getElementById("study-modal-body-wrapper");
    const modalBody = document.getElementById("study-modal-body");
    if (!studyModal || !wrapper || !modalBody) return;

    // Khóa cứng modal-box không cho cuộn ngoài ý muốn làm mất header
    const modalBox = studyModal.querySelector(".modal-box");
    if (modalBox) {
      modalBox.style.overflow = "hidden";
    }

    const header = studyModal.querySelector(".modal-header");
    let readBar = document.getElementById("ml-study-read-bar");
    if (header && !readBar) {
      readBar = document.createElement("div");
      readBar.id = "ml-study-read-bar";
      header.appendChild(readBar);
    }

    const wideBtn = document.getElementById("study-wide-toggle-btn");
    if (wideBtn && !document.getElementById("study-zen-toggle-btn")) {
      const zenBtn = document.createElement("button");
      zenBtn.type = "button";
      zenBtn.id = "study-zen-toggle-btn";
      zenBtn.className = "btn btn-sm btn-outline";
      zenBtn.title =
        "Làm dịu các phần xung quanh để tập trung vào 1 mục đang đọc";
      zenBtn.innerHTML = "🧘 Zen Focus";

      zenBtn.addEventListener("click", () => {
        const isZen = studyModal.classList.toggle("ml-zen-mode");
        zenBtn.classList.toggle("ml-zen-on", isZen);
        zenBtn.innerHTML = isZen ? "🧘 Đang bật Zen" : "🧘 Zen Focus";
        updateScrollSpy();
      });

      wideBtn.insertAdjacentElement("beforebegin", zenBtn);
    }

    function buildSideNavigatorLayout() {
      const container = modalBody.querySelector(".study-reading-container");
      const jumpBar = container?.querySelector(".section-jump-bar");
      if (!container || !jumpBar) return;

      // Chốt chặn: Nếu layout và sidebar đã dựng xong rồi thì chỉ cập nhật trạng thái, không đảo DOM nữa
      if (
        container.classList.contains("ml-has-sidebar") &&
        jumpBar.dataset.sidebarBuilt === "1"
      ) {
        syncSidebarDoneStates();
        return;
      }

      container.classList.add("ml-has-sidebar");
      jumpBar.classList.add("ml-lesson-sidebar");

      let mainCol = container.querySelector(".ml-lesson-main-col");
      if (!mainCol) {
        mainCol = document.createElement("div");
        mainCol.className = "ml-lesson-main-col";
        container.insertBefore(mainCol, jumpBar);
      }

      Array.from(container.children).forEach((child) => {
        if (child !== mainCol && child !== jumpBar) {
          mainCol.appendChild(child);
        }
      });

      if (jumpBar.dataset.sidebarBuilt !== "1") {
        jumpBar.dataset.sidebarBuilt = "1";
        const chapTitle =
          document.getElementById("study-modal-title")?.textContent.trim() ||
          "General";
        const completedMap = getCompletedSections();
        const unitSections = Array.from(
          mainCol.querySelectorAll('.unit-block[id^="unit-sec-"]'),
        );

        let doneCount = 0;
        const pillsHTML = unitSections
          .map((secEl, idx) => {
            const secId = secEl.id;
            const headingText =
              secEl.querySelector(".unit-header")?.textContent.trim() ||
              `Phần ${idx + 1}`;
            // Dùng secId đồng nhất với nút đánh dấu hoàn thành
            const key = `chap_${chapTitle}::${secId}`;
            const isDone = !!completedMap[key];
            if (isDone) doneCount++;
            return `<button type="button" class="ml-sec-pill ${isDone ? "is-done" : ""}" data-target-id="${secId}" data-sec-key="${escapeHTML(key)}" title="${escapeHTML(headingText)}">${idx + 1}</button>`;
          })
          .join("");

        const hasExtra = !!document.getElementById("unit-extra");
        const hasSummary = !!document.getElementById("unit-key-summary");
        const hasDocs = !!document.getElementById("unit-docs");

        jumpBar.innerHTML = `
          <div class="ml-sidebar-head">
            <span class="ml-sidebar-title">📑 Mục lục bài học</span>
            <span class="ml-sidebar-count" id="ml-sidebar-progress-badge">${doneCount}/${unitSections.length} xong</span>
          </div>
          <div class="ml-sidebar-legend">
            <span class="ml-legend-item"><i class="ml-legend-dot" style="background:#2563eb;"></i>Đang xem</span>
            <span class="ml-legend-item"><i class="ml-legend-dot" style="background:#10b981;"></i>Đã xong</span>
            <span class="ml-legend-item"><i class="ml-legend-dot" style="background:#94a3b8;"></i>Chưa học</span>
          </div>
          <div class="ml-sidebar-grid">
            ${pillsHTML}
          </div>
          <div class="ml-sidebar-extras">
            ${hasExtra ? `<button type="button" class="btn btn-sm btn-outline ml-sidebar-extra-btn" data-target-id="unit-extra">🏆 Bài tập tổng hợp nâng cao</button>` : ""}
            ${hasSummary ? `<button type="button" class="btn btn-sm btn-outline ml-sidebar-extra-btn" data-target-id="unit-key-summary">📌 Tổng hợp công thức cuối chương</button>` : ""}
            ${hasDocs ? `<button type="button" class="btn btn-sm btn-outline ml-sidebar-extra-btn" data-target-id="unit-docs">📂 Tài liệu &amp; Handout</button>` : ""}
          </div>
        `;

        jumpBar.querySelectorAll("[data-target-id]").forEach((btn) => {
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute("data-target-id");
            const target = document.getElementById(targetId);
            if (target && wrapper) {
              // Đo toạ độ tương đối giữa target và wrapper để cuộn nội bộ mượt mà
              const wrapRect = wrapper.getBoundingClientRect();
              const targetRect = target.getBoundingClientRect();
              const targetScrollTop =
                wrapper.scrollTop + (targetRect.top - wrapRect.top) - 14;

              wrapper.scrollTo({
                top: Math.max(0, targetScrollTop),
                behavior: "smooth",
              });
            }
          });
        });
      }

      syncSidebarDoneStates();
    }

    function syncSidebarDoneStates() {
      const completedMap = getCompletedSections();
      const pills = modalBody.querySelectorAll(".ml-sec-pill[data-sec-key]");
      if (!pills.length) return;
      let done = 0;
      pills.forEach((pill) => {
        const isDone = !!completedMap[pill.getAttribute("data-sec-key")];
        if (isDone) done++;
        pill.classList.toggle("is-done", isDone);
      });
      const badge = document.getElementById("ml-sidebar-progress-badge");
      if (badge) badge.textContent = `${done}/${pills.length} xong`;
    }

    let activeSpyObserver = null;
    let spyBlocks = [];

    function setActiveSpySection(activeId) {
      if (!activeId) return;
      spyBlocks.forEach((blk) => {
        blk.classList.toggle("ml-zen-focused", blk.id === activeId);
      });
      modalBody
        .querySelectorAll(".section-jump-bar [data-target-id]")
        .forEach((btn) => {
          btn.classList.toggle(
            "ml-spy-active",
            btn.getAttribute("data-target-id") === activeId,
          );
        });
    }

    function updateScrollSpy() {
      if (activeSpyObserver) {
        activeSpyObserver.disconnect();
        activeSpyObserver = null;
      }
      spyBlocks = Array.from(
        modalBody.querySelectorAll(
          ".unit-block[id], .chapter-summary-box[id], .doc-section[id]",
        ),
      );
      if (!spyBlocks.length) return;

      const currentFocused = spyBlocks.find((b) =>
        b.classList.contains("ml-zen-focused"),
      );
      setActiveSpySection((currentFocused || spyBlocks[0]).id);

      if ("IntersectionObserver" in window) {
        activeSpyObserver = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                setActiveSpySection(entry.target.id);
                break;
              }
            }
          },
          {
            root: wrapper,
            rootMargin: "-15% 0px -65% 0px",
            threshold: 0,
          },
        );
        spyBlocks.forEach((blk) => activeSpyObserver.observe(blk));
      }
    }

    // Thanh tiến độ đọc trên nóc modal (Chạy siêu nhẹ bằng scroll event đơn thuần không đo DOM)
    wrapper.addEventListener(
      "scroll",
      () => {
        const scrollTop = wrapper.scrollTop;
        const maxScroll = wrapper.scrollHeight - wrapper.clientHeight;
        const pct =
          maxScroll > 0
            ? Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100))
            : 0;
        if (readBar) readBar.style.width = `${pct}%`;
      },
      { passive: true },
    );

    modalBody.addEventListener("click", (e) => {
      if (e.target.closest(".section-complete-btn")) {
        setTimeout(syncSidebarDoneStates, 20);
      }
      const blk = e.target.closest(
        ".unit-block[id], .chapter-summary-box[id], .doc-section[id]",
      );
      if (!blk) return;
      modalBody
        .querySelectorAll(".ml-zen-focused")
        .forEach((el) => el.classList.remove("ml-zen-focused"));
      blk.classList.add("ml-zen-focused");
    });

    let layoutRaf = null;
    let isBuildingLayout = false;
    const bodyObs = new MutationObserver(() => {
      if (isBuildingLayout) return;
      if (layoutRaf) cancelAnimationFrame(layoutRaf);
      layoutRaf = requestAnimationFrame(() => {
        if (isBuildingLayout) return;
        isBuildingLayout = true;
        bodyObs.disconnect(); // Ngắt tạm thời để KaTeX và DOM không kích hoạt lại observer
        try {
          buildSideNavigatorLayout();
          updateScrollSpy();
        } finally {
          isBuildingLayout = false;
          // Kết nối lại sau khi DOM đã ổn định
          if (document.body.contains(modalBody)) {
            bodyObs.observe(modalBody, { childList: true });
          }
        }
      });
    });
    bodyObs.observe(modalBody, { childList: true });
  }

  /* =========================================================
     G. ĐỘ #1: HỆ THỐNG MICRO-SOUND (WEB AUDIO API — ZERO MP3)
     ========================================================= */
  function initMicroSoundSystem() {
    const SOUND_KEY = "mathlab_sound_enabled_v1";
    let enabled = localStorage.getItem(SOUND_KEY) !== "0";
    let audioCtx = null;
    let lastSoftTime = 0;

    const getCtx = () => {
      if (!audioCtx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        audioCtx = new AC();
      }
      if (audioCtx.state === "suspended") {
        audioCtx.resume().catch(() => {});
      }
      return audioCtx;
    };

    const playTone = ({
      freq = 520,
      endFreq = null,
      duration = 0.04,
      type = "sine",
      gain = 0.035,
      delay = 0,
    } = {}) => {
      if (!enabled) return;
      try {
        const ctx = getCtx();
        if (!ctx) return;
        const startAt = ctx.currentTime + delay;
        const osc = ctx.createOscillator();
        const amp = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, startAt);
        if (endFreq && endFreq > 0) {
          osc.frequency.exponentialRampToValueAtTime(
            endFreq,
            startAt + duration,
          );
        }

        amp.gain.setValueAtTime(0.0001, startAt);
        amp.gain.linearRampToValueAtTime(gain, startAt + 0.005);
        amp.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

        osc.connect(amp);
        amp.connect(ctx.destination);
        osc.start(startAt);
        osc.stop(startAt + duration + 0.02);
      } catch (_) {}
    };

    const Sound = {
      isEnabled: () => enabled,
      click() {
        const now = performance.now();
        if (now - lastSoftTime < 55) return;
        lastSoftTime = now;
        playTone({
          freq: 560,
          endFreq: 260,
          duration: 0.03,
          type: "triangle",
          gain: 0.15,
        });
      },
      soft() {
        const now = performance.now();
        if (now - lastSoftTime < 55) return;
        lastSoftTime = now;
        playTone({
          freq: 760,
          endFreq: 620,
          duration: 0.024,
          type: "sine",
          gain: 0.1,
        });
      },
      success() {
        playTone({ freq: 587.33, duration: 0.11, type: "sine", gain: 0.15 });
        playTone({
          freq: 880,
          duration: 0.16,
          type: "sine",
          gain: 0.16,
          delay: 0.065,
        });
      },
      levelUp() {
        [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
          playTone({
            freq: f,
            duration: 0.18,
            type: "sine",
            gain: 0.18,
            delay: idx * 0.065,
          });
        });
      },
      error() {
        playTone({
          freq: 210,
          endFreq: 130,
          duration: 0.11,
          type: "triangle",
          gain: 0.16,
        });
      },
      toggleOn() {
        playTone({
          freq: 440,
          endFreq: 660,
          duration: 0.07,
          type: "sine",
          gain: 0.14,
        });
      },
    };

    window.MathLabSound = Sound;

    const navActions = document.querySelector(".nav-actions");
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (navActions && !document.getElementById("ml-sound-toggle-btn")) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.id = "ml-sound-toggle-btn";
      btn.className = "icon-btn";

      const syncBtnUI = () => {
        btn.textContent = enabled ? "🔊" : "🔇";
        btn.title = enabled
          ? "Âm thanh tương tác: Đang BẬT (bấm để tắt)"
          : "Âm thanh tương tác: Đang TẮT (bấm để bật)";
        btn.setAttribute("aria-label", btn.title);
        btn.setAttribute("aria-pressed", enabled ? "true" : "false");
        btn.style.opacity = enabled ? "1" : "0.68";
      };

      syncBtnUI();
      btn.addEventListener("click", () => {
        enabled = !enabled;
        localStorage.setItem(SOUND_KEY, enabled ? "1" : "0");
        syncBtnUI();
        if (enabled) Sound.toggleOn();
      });

      if (themeBtn) navActions.insertBefore(btn, themeBtn);
      else navActions.prepend(btn);
    }

    document.addEventListener(
      "click",
      (e) => {
        if (!enabled || !e.isTrusted) return;
        if (e.target.closest("#ml-sound-toggle-btn")) return;

        const quizOpt = e.target.closest(".quiz-option");
        if (quizOpt) {
          Sound.soft();
          return;
        }

        const ctrl = e.target.closest(
          ".btn, .icon-btn, .lab-tab, .pm-ai-tab, .ml-sec-pill, .latex-sym-btn, .latex-tab-btn, .faq-question, .pm-inline-chip, .ml-cmd-trigger, .ml-cmd-item, .section-complete-btn, #pikeman-ai-fab",
        );
        if (!ctrl || ctrl.disabled) return;

        if (ctrl.classList.contains("section-complete-btn")) {
          if (ctrl.classList.contains("done")) Sound.soft();
          return;
        }
        if (ctrl.matches('button[type="submit"]')) return;
        Sound.click();
      },
      true,
    );

    document.addEventListener("keydown", (e) => {
      if (!enabled) return;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        Sound.soft();
      }
    });

    if (typeof window.addXP === "function" && !window.addXP._mlSoundHooked) {
      const origAddXP = window.addXP;
      const wrappedAddXP = function () {
        const beforeXp =
          typeof window.getProgress === "function"
            ? Number(window.getProgress()?.xp) || 0
            : null;
        const res = origAddXP.apply(this, arguments);
        const afterXp =
          typeof window.getProgress === "function"
            ? Number(window.getProgress()?.xp) || 0
            : null;
        if (
          beforeXp !== null &&
          afterXp !== null &&
          typeof window.getLevelInfo === "function" &&
          window.getLevelInfo(afterXp).level >
            window.getLevelInfo(beforeXp).level
        ) {
          Sound.levelUp();
        } else {
          Sound.success();
        }
        return res;
      };
      wrappedAddXP._mlSoundHooked = true;
      window.addXP = wrappedAddXP;
    }

    if (
      typeof window.showToast === "function" &&
      !window.showToast._mlSoundHooked
    ) {
      const origToast = window.showToast;
      const wrappedToast = function (message, type) {
        if (type === "error") Sound.error();
        return origToast.apply(this, arguments);
      };
      wrappedToast._mlSoundHooked = true;
      window.showToast = wrappedToast;
    }
  }

  function initMathLabUpgrades() {
    enhanceForumComposer();
    injectProgressBarsOnCards();
    observeStudyModal();
    observeDynamicGrids();
    initSmoothPageTransitions();
    initScrollChoreography();
    init3DBorderGlow();
    initHeroMathCanvas();
    initCommandPalette();
    initStudyScrollSpyAndZen();
    initMicroSoundSystem();
    window.refreshMathLabProgress = injectProgressBarsOnCards;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMathLabUpgrades);
  } else {
    initMathLabUpgrades();
  }
})();
