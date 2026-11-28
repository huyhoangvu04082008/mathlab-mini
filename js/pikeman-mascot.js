/* =========================================================================
   MATHLAB MINI — LINH VẬT PIKE (js/pikeman-mascot.js)
   Chức năng:
   1. Đồng bộ Favicon + Avatar Pike Man (#pikeman-ai-fab & .pm-ai-header)
   2. Linh vật Pike dạo chơi tự nhiên (chu kỳ bước chân tay đánh đồng bộ, dừng nghỉ
      vẫy tay, đi đường cong ease-in-out) + kéo thả có quán tính lắc lư (GPU translate3d)
   3. Trạm Trợ Lý Pike (#pm-lab-station) lấp khoảng trống dưới #calc-output + biểu cảm suy nghĩ
   4. Biểu cảm: normal • thinking • happy • celebrate (giải đúng) • surprised (có lỗi)
      API: window.PikeMascot.react('celebrate' | 'surprised' | 'thinking' | 'happy', ms)
   ========================================================================= */

(function () {
  "use strict";

  const ROAM_STORAGE_KEY = "mathlab_mascot_roam_v1";
  const POS_STORAGE_KEY = "mathlab_mascot_pos_v1";

  let globalMood = "normal";
  let reactTimer = 0;
  let labMoodHook = null;
  let roamMoodHook = null;

  const LAB_TIPS = [
    {
      tag: "GT1 • VCB Tương Đương",
      text: "Chỉ thay $u \\sim v$ trong phép <b>nhân/chia</b>; gặp hiệu triệt tiêu như $\\tan x - \\sin x$ phải dùng Taylor bậc 3 ($= \\frac{x^3}{2} + o(x^3)$).",
    },
    {
      tag: "GT1 • Tham Số Cấp 2",
      text: "Đạo hàm cấp 2 hàm tham số là $y''_{xx} = \\frac{1}{x'_t}\\left(\\frac{y'_t}{x'_t}\\right)'_t$, tuyệt đối không tính bằng $y''_t / x''_t$.",
    },
    {
      tag: "GT1 • Từng Phần LIATE",
      text: "Chọn $u$ theo thứ tự <b>L</b>og $\\to$ <b>I</b>nv trig $\\to$ <b>A</b>lgebra $\\to$ <b>T</b>rig $\\to$ <b>E</b>xp. Gặp $\\ln x$ hay $\\arctan x$ đứng riêng thì đặt $dv = 1\\,dx$.",
    },
    {
      tag: "GT1 • Đổi Biến Có Cận",
      text: "Trong tích phân xác định $\\int_a^b f(x)\\,dx$, hễ đặt $t = \\varphi(x)$ là <b>phải đổi cận ngay</b>; tận dụng hàm chẵn/lẻ nếu cận đối xứng $[-a, a]$.",
    },
    {
      tag: "GT1 • Tích Phân Suy Rộng",
      text: "$\\int_1^{+\\infty} \\frac{dx}{x^p}$ hội tụ $\\iff p > 1$; ngược lại gần điểm kỳ dị $\\int_0^1 \\frac{dx}{x^p}$ hội tụ $\\iff p < 1$. Đừng bỏ sót kỳ dị giữa đoạn!",
    },
    {
      tag: "LAB • Tổng Riemann",
      text: "Khi tăng số đoạn chia $N$, sai số của Tổng Trung điểm &amp; Hình thang giảm bậc $O(1/N^2)$ — hội tụ nhanh hơn nhiều so với Trái/Phải $O(1/N)$.",
    },
    {
      tag: "GT1 • Chuỗi Lũy Thừa",
      text: "Tìm bán kính $R$ xong bắt buộc <b>thử riêng hai đầu mút</b> $x_0 - R$ và $x_0 + R$ để chốt đúng ngoặc vuông `[` hay tròn `(`.",
    },
    {
      tag: "GT1 • Khai Triển Maclaurin",
      text: "Nhớ phân biệt mẫu số: $e^x, \\sin x, \\cos x$ <b>có giai thừa</b> $n!$; còn $\\ln(1+x)$ và $\\arctan x$ mẫu số <b>không có giai thừa</b>.",
    },
    {
      tag: "ĐSTT • Định Thức & Gauss",
      text: "Đổi chỗ 2 hàng làm định thức đổi dấu $(-1)$; và nhớ $\\det(\\lambda A) = \\lambda^n \\det A$ với ma trận vuông $A$ cấp $n$.",
    },
    {
      tag: "ĐSTT • Kronecker–Capelli",
      text: "Hệ $AX = b$ ($n$ ẩn) có nghiệm $\\iff \\operatorname{rank} A = \\operatorname{rank}[A \\mid b]$; nếu vô số nghiệm thì số ẩn tự do đúng bằng $n - r$.",
    },
    {
      tag: "ĐSTT • Đổi Cơ Sở",
      text: "Mẹo nhớ không bao giờ lộn: $P_{C \\leftarrow B} = P_C^{-1} P_B$ (chữ đứng trước mũi tên bị nghịch đảo đứng bên trái), và $[v]_C = P_{C \\leftarrow B}[v]_B$.",
    },
    {
      tag: "ĐSTT • Gram–Schmidt",
      text: "Công thức hình chiếu $\\operatorname{proj}_W(v) = \\sum \\langle v, e_i \\rangle e_i$ chỉ đúng khi cơ sở $(e_i)$ của $W$ đã được <b>trực chuẩn hóa</b> ($\\|e_i\\| = 1$).",
    },
  ];

  /* ---------- Biểu cảm: normal • thinking • happy • celebrate • surprised ---------- */
  const MOOD_ALIASES = {
    normal: "normal",
    idle: "normal",
    default: "normal",
    thinking: "thinking",
    think: "thinking",
    ask: "thinking",
    loading: "thinking",
    happy: "happy",
    ok: "happy",
    hello: "happy",
    celebrate: "celebrate",
    correct: "celebrate",
    success: "celebrate",
    right: "celebrate",
    check: "celebrate",
    win: "celebrate",
    surprised: "surprised",
    wrong: "surprised",
    error: "surprised",
    oops: "surprised",
    fail: "surprised",
  };

  function normalizeMood(m) {
    return MOOD_ALIASES[String(m || "normal").toLowerCase()] || "normal";
  }

  function getMascotSVG({
    width = 52,
    height = 52,
    mood = "normal",
    headOnly = false,
    round = false,
    withSymbols = false,
    animateWave = true,
    uid = "pm",
  } = {}) {
    mood = normalizeMood(mood);
    const hOnly = headOnly || round;
    const gFront = `${uid}_front`;
    const gTop = `${uid}_top`;
    const gSide = `${uid}_side`;
    const gBg = `${uid}_bg`;

    const viewBox = round
      ? "17 -1 96 96"
      : headOnly
        ? "24 5 84 82"
        : withSymbols
          ? "0 0 140 150"
          : "20 6 100 140";

    /* ----- Khuôn mặt theo biểu cảm ----- */
    let faceSvg = "";
    if (mood === "thinking") {
      faceSvg = `
        <g class="pm-face-group">
          <path d="M47 47.6 L56.4 46.6" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
          <path d="M67.6 46.4 Q72.4 43.6 77.4 46.6" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
          <ellipse cx="52.8" cy="54.2" rx="3.7" ry="4.6" fill="#38bdf8"/>
          <circle cx="54.2" cy="52" r="1.5" fill="#ffffff"/>
          <ellipse cx="72.8" cy="54.2" rx="3.7" ry="4.6" fill="#38bdf8"/>
          <circle cx="74.2" cy="52" r="1.5" fill="#ffffff"/>
          <path d="M57.5 65.6 Q60 63.4 62.6 65.4 T68 64.6" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round"/>
        </g>
      `;
    } else if (mood === "happy") {
      faceSvg = `
        <g class="pm-face-group">
          <path d="M47.5 56 Q52 50 56.5 56" fill="none" stroke="#38bdf8" stroke-width="2.8" stroke-linecap="round"/>
          <path d="M67.5 56 Q72 50 76.5 56" fill="none" stroke="#38bdf8" stroke-width="2.8" stroke-linecap="round"/>
          <ellipse cx="48.5" cy="64.2" rx="3.6" ry="1.9" fill="#fb7185" fill-opacity="0.72"/>
          <ellipse cx="75.5" cy="64.2" rx="3.6" ry="1.9" fill="#fb7185" fill-opacity="0.72"/>
          <path d="M55.5 63.2 Q62 69.5 68.5 63.2" fill="none" stroke="#38bdf8" stroke-width="2.4" stroke-linecap="round"/>
        </g>
      `;
    } else if (mood === "celebrate") {
      faceSvg = `
        <g class="pm-face-group">
          <path d="M47 57.5 Q52 49 57 57.5" fill="none" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
          <path d="M67 57.5 Q72 49 77 57.5" fill="none" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/>
          <ellipse cx="48" cy="64.6" rx="3.8" ry="2" fill="#fb7185" fill-opacity="0.82"/>
          <ellipse cx="76" cy="64.6" rx="3.8" ry="2" fill="#fb7185" fill-opacity="0.82"/>
          <path d="M54.5 62.6 Q62 75 69.5 62.6 Z" fill="#38bdf8" stroke="#38bdf8" stroke-width="1.2" stroke-linejoin="round"/>
          <ellipse cx="62" cy="67.4" rx="3.3" ry="1.5" fill="#fb7185"/>
        </g>
      `;
    } else if (mood === "surprised") {
      faceSvg = `
        <g class="pm-face-group">
          <path d="M47 46.8 Q52 43.2 57 46.8" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
          <path d="M67 46.8 Q72 43.2 77 46.8" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
          <circle cx="52" cy="55.4" r="4.7" fill="none" stroke="#38bdf8" stroke-width="1.8"/>
          <circle cx="52.2" cy="56" r="1.9" fill="#38bdf8"/>
          <circle cx="72" cy="55.4" r="4.7" fill="none" stroke="#38bdf8" stroke-width="1.8"/>
          <circle cx="72.2" cy="56" r="1.9" fill="#38bdf8"/>
          <ellipse cx="62" cy="67.4" rx="2.8" ry="3.5" fill="#0b1222" stroke="#38bdf8" stroke-width="2"/>
          <path class="pm-sweat" d="M79.4 50 Q81.2 53 79.4 54.6 Q77.6 53 79.4 50 Z" fill="#7dd3fc"/>
        </g>
      `;
    } else {
      faceSvg = `
        <g class="pm-face-group">
          <g class="pm-eye-blink">
            <ellipse cx="52" cy="55" rx="3.9" ry="5" fill="#38bdf8"/>
            <circle cx="53.1" cy="53" r="1.55" fill="#ffffff"/>
            <ellipse cx="72" cy="55" rx="3.9" ry="5" fill="#38bdf8"/>
            <circle cx="73.1" cy="53" r="1.55" fill="#ffffff"/>
          </g>
          <ellipse cx="48.5" cy="64.5" rx="3.6" ry="1.9" fill="#fb7185" fill-opacity="0.65"/>
          <ellipse cx="75.5" cy="64.5" rx="3.6" ry="1.9" fill="#fb7185" fill-opacity="0.65"/>
          <path d="M56.5 63.8 Q62 69 67.5 63.8" fill="none" stroke="#38bdf8" stroke-width="2.3" stroke-linecap="round"/>
        </g>
      `;
    }

    /* ----- Phụ kiện theo biểu cảm (chỉ khi vẽ cả người) ----- */
    let extrasSvg = "";
    if (!hOnly) {
      if (mood === "thinking") {
        extrasSvg = `
          <g class="pm-think-bubble">
            <circle cx="102" cy="27" r="1.4" fill="#7dd3fc"/>
            <circle cx="104.2" cy="23.2" r="1.9" fill="#7dd3fc"/>
            <circle cx="109" cy="14.5" r="7.5" fill="#0f172a" stroke="#38bdf8" stroke-width="1.6"/>
            <text x="109" y="18.2" text-anchor="middle" fill="#7dd3fc" font-family="Georgia,serif" font-weight="700" font-size="10.5">?</text>
          </g>
        `;
      } else if (mood === "celebrate") {
        extrasSvg = `
          <circle cx="109" cy="14.5" r="7.5" fill="#10b981" stroke="#09152b" stroke-width="1.8"/>
          <path d="M105.2 14.8 L108 17.6 L113 11.6" stroke="#ffffff" stroke-width="2.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <path class="pm-confetti" d="M27 18.4 L28 21 L30.6 22 L28 23 L27 25.6 L26 23 L23.4 22 L26 21 Z" fill="#fbbf24"/>
          <rect class="pm-confetti" style="animation-delay:.25s" x="29.3" y="7" width="3.4" height="3.4" fill="#34d399" transform="rotate(35 31 8.7)"/>
          <circle class="pm-confetti" style="animation-delay:.5s" cx="114" cy="36" r="1.9" fill="#fb7185"/>
          <circle class="pm-confetti" style="animation-delay:.75s" cx="115" cy="50" r="1.8" fill="#38bdf8"/>
        `;
      } else if (mood === "surprised") {
        extrasSvg = `
          <circle cx="109" cy="14.5" r="7.5" fill="#f59e0b" stroke="#09152b" stroke-width="1.8"/>
          <path d="M109 10.2 L109 15.6" stroke="#09152b" stroke-width="2.4" stroke-linecap="round"/>
          <circle cx="109" cy="19" r="1.35" fill="#09152b"/>
        `;
      }
    }

    const symbolsSvg = withSymbols
      ? `
        <g class="pm-math-symbols">
          <text x="17" y="42" text-anchor="middle" fill="#06b6d4" font-family="Georgia,serif" font-style="italic" font-size="20" transform="rotate(-7 17 42)">∫</text>
          <text x="16" y="96" text-anchor="middle" fill="#10b981" font-family="Georgia,serif" font-weight="700" font-size="16">∞</text>
          ${
            extrasSvg
              ? ""
              : '<path d="M121 15 L123.3 21.7 L130 24 L123.3 26.3 L121 33 L118.7 26.3 L112 24 L118.7 21.7 Z" fill="#fbbf24"/>'
          }
          <text x="124" y="64" text-anchor="middle" fill="#f59e0b" font-family="Georgia,serif" font-weight="700" font-size="18">∑</text>
          <text x="122" y="125" text-anchor="middle" fill="#38bdf8" font-family="Georgia,serif" font-style="italic" font-weight="700" font-size="13">x²</text>
        </g>
      `
      : "";

    const rightArmClass = !animateWave
      ? ""
      : mood === "celebrate"
        ? "pm-cheer-arm-r"
        : mood === "thinking" || mood === "surprised"
          ? ""
          : "pm-wave-arm";

    const leftArmSvg =
      mood === "celebrate"
        ? `
        <g class="pm-arm-l ${animateWave ? "pm-cheer-arm-l" : ""}">
          <path d="M46 98 Q31 95 29.5 81" stroke="#09152b" stroke-width="8.5" stroke-linecap="round" fill="none"/>
          <path d="M46 98 Q31 95 29.5 81" stroke="#38bdf8" stroke-width="4.2" stroke-linecap="round" fill="none"/>
          <circle cx="29" cy="78.8" r="5.3" fill="#bae6fd" stroke="#09152b" stroke-width="2.3"/>
        </g>
      `
        : `
        <g class="pm-arm-l">
          <path d="M46 98 Q33 102 33 114" stroke="#09152b" stroke-width="8.5" stroke-linecap="round" fill="none"/>
          <path d="M46 98 Q33 102 33 114" stroke="#38bdf8" stroke-width="4.2" stroke-linecap="round" fill="none"/>
          <circle cx="32.5" cy="116" r="5.3" fill="#bae6fd" stroke="#09152b" stroke-width="2.3"/>
        </g>
      `;

    /* Tay phải: vừa có tư thế vẫy chào (idle), vừa có tư thế buông xuôi đánh tay khi đi bộ (walk/drag) */
    const rightArmSvg =
      mood === "celebrate"
        ? `
        <g class="pm-arm-r ${rightArmClass}">
          <path d="M86 98 Q102 96 105 81" stroke="#09152b" stroke-width="8.5" stroke-linecap="round" fill="none"/>
          <path d="M86 98 Q102 96 105 81" stroke="#38bdf8" stroke-width="4.2" stroke-linecap="round" fill="none"/>
          <circle cx="105.5" cy="79" r="5.3" fill="#bae6fd" stroke="#09152b" stroke-width="2.3"/>
        </g>
      `
        : `
        <g class="pm-arm-r pm-arm-r-idle ${rightArmClass}">
          <path d="M86 98 Q102 96 105 81" stroke="#09152b" stroke-width="8.5" stroke-linecap="round" fill="none"/>
          <path d="M86 98 Q102 96 105 81" stroke="#38bdf8" stroke-width="4.2" stroke-linecap="round" fill="none"/>
          <circle cx="105.5" cy="79" r="5.3" fill="#bae6fd" stroke="#09152b" stroke-width="2.3"/>
        </g>
        <g class="pm-arm-r pm-arm-r-walk">
          <path d="M86 98 Q98 102 98 114" stroke="#09152b" stroke-width="8.5" stroke-linecap="round" fill="none"/>
          <path d="M86 98 Q98 102 98 114" stroke="#38bdf8" stroke-width="4.2" stroke-linecap="round" fill="none"/>
          <circle cx="98.5" cy="116" r="5.3" fill="#bae6fd" stroke="#09152b" stroke-width="2.3"/>
        </g>
      `;

    const bodySvg = hOnly
      ? ""
      : `
        <!-- Đổ bóng chân -->
        <ellipse class="pm-shadow" cx="70" cy="139" rx="33" ry="5" fill="#38bdf8" fill-opacity="0.24"/>
        <!-- Chân trái + giày (nối cao tới y=114 để xoay khớp háng không bị hở) -->
        <g class="pm-leg-l">
          <rect x="53" y="114" width="9.5" height="14" fill="#1e3a8a" stroke="#09152b" stroke-width="2.3"/>
          <rect x="46.5" y="126" width="18.5" height="10" rx="5" fill="#0ea5e9" stroke="#09152b" stroke-width="2.3"/>
        </g>
        <!-- Chân phải + giày -->
        <g class="pm-leg-r">
          <rect x="70.5" y="114" width="9.5" height="14" fill="#1e3a8a" stroke="#09152b" stroke-width="2.3"/>
          <rect x="68" y="126" width="18.5" height="10" rx="5" fill="#0ea5e9" stroke="#09152b" stroke-width="2.3"/>
        </g>
        <!-- Tay trái -->
        ${leftArmSvg}
        <!-- Tay phải -->
        ${rightArmSvg}
        <!-- Phần thân trên (nhún nhịp theo bước đi) -->
        <g class="pm-upper-body">
          <polygon points="45,90 55,82 93,82 83,90" fill="url(#${gTop})" stroke="#09152b" stroke-width="2.4" stroke-linejoin="round"/>
          <polygon points="83,90 93,82 93,109 83,118" fill="url(#${gSide})" stroke="#09152b" stroke-width="2.4" stroke-linejoin="round"/>
          <rect x="45" y="90" width="38" height="28" rx="3" fill="url(#${gFront})" stroke="#09152b" stroke-width="2.4" stroke-linejoin="round"/>
          <circle cx="64" cy="104" r="8.8" fill="#09152b" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="64" y="107.8" text-anchor="middle" fill="#e0f2fe" font-family="Georgia,serif" font-style="italic" font-weight="700" font-size="11.5">π</text>
        </g>
      `;

    const headBlock = `
      <g class="pm-head-group">
        <rect x="29.5" y="53" width="6.5" height="14" rx="3.2" fill="#0ea5e9" stroke="#09152b" stroke-width="2.3"/>
        <polygon points="36,34 49,23 100,23 88,34" fill="url(#${gTop})" stroke="#09152b" stroke-width="2.5" stroke-linejoin="round"/>
        <polygon points="88,34 100,23 100,72 88,84" fill="url(#${gSide})" stroke="#09152b" stroke-width="2.5" stroke-linejoin="round"/>
        <rect x="36" y="34" width="52" height="50" rx="4.5" fill="url(#${gFront})" stroke="#09152b" stroke-width="2.5" stroke-linejoin="round"/>
        <polygon points="56,35 86,35 86,52" fill="#ffffff" fill-opacity="0.12"/>
        <rect x="91.5" y="45" width="6.5" height="14" rx="3.2" fill="#0ea5e9" stroke="#09152b" stroke-width="2.3"/>
        <rect x="42" y="41" width="40" height="35" rx="8" fill="#0b1222" stroke="#38bdf8" stroke-width="1.8"/>
        ${faceSvg}
        <!-- Mũ cử nhân + tua vàng lắc lư -->
        <path d="M51 23 L51 28 Q67 33 83 28 L83 23 Z" fill="#172554" stroke="#09152b" stroke-width="2.2" stroke-linejoin="round"/>
        <polygon points="67,10 92,19 67,26 42,19" fill="#1e293b" stroke="#09152b" stroke-width="2.3" stroke-linejoin="round"/>
        <g class="pm-tassel">
          <path d="M67 18.5 L85 20.5 L86 29" fill="none" stroke="#fbbf24" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>
          <rect x="83.8" y="28" width="4.4" height="6.5" rx="1.8" fill="#fbbf24" stroke="#b45309" stroke-width="0.8"/>
        </g>
        <circle cx="67" cy="18.5" r="2.2" fill="#fbbf24" stroke="#b45309" stroke-width="0.8"/>
      </g>
    `;

    const characterSvg = `
      <g class="pm-char pm-char-${mood}">
        ${bodySvg}
        ${headBlock}
      </g>
    `;

    const bgSvg = round
      ? `<circle cx="65" cy="47" r="45.5" fill="url(#${gBg})" stroke="#38bdf8" stroke-width="2"/>`
      : "";
    const sceneSvg = round
      ? `<g transform="translate(65 47) scale(0.9) translate(-65 -47)">${characterSvg}</g>`
      : `${symbolsSvg}${characterSvg}${extrasSvg}`;

    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${viewBox}" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="${gFront}" x1="36" y1="34" x2="88" y2="118" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#38bdf8"/>
            <stop offset="55%" stop-color="#2563eb"/>
            <stop offset="100%" stop-color="#1d4ed8"/>
          </linearGradient>
          <linearGradient id="${gTop}" x1="36" y1="23" x2="100" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#bae6fd"/>
            <stop offset="100%" stop-color="#38bdf8"/>
          </linearGradient>
          <linearGradient id="${gSide}" x1="88" y1="23" x2="100" y2="118" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#1e40af"/>
            <stop offset="100%" stop-color="#0f172a"/>
          </linearGradient>
          <radialGradient id="${gBg}" cx="50%" cy="38%" r="75%">
            <stop offset="0%" stop-color="#1e40af"/>
            <stop offset="100%" stop-color="#0b1222"/>
          </radialGradient>
        </defs>
        ${bgSvg}
        ${sceneSvg}
      </svg>
    `;
  }

  function injectMascotStyles() {
    if (document.getElementById("pm-mascot-styles")) return;
    const style = document.createElement("style");
    style.id = "pm-mascot-styles";
    style.textContent = `
      #pikeman-ai-fab {
        padding: 7px 15px 7px 9px !important;
        gap: 7px !important;
      }
      .pm-fab-avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        flex-shrink: 0;
      }
      .pm-header-brand {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .pm-header-avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: rgba(15, 23, 42, 0.55);
        border: 1px solid rgba(56, 189, 248, 0.4);
        cursor: pointer;
        flex-shrink: 0;
      }

      /* Mặc định (trong FAB / Trạm Lab): ẩn tay đi bộ, hiện tay vẫy */
      .pm-arm-r-walk {
        display: none;
      }

      /* Linh vật dạo chơi & kéo thả tự do quanh web */
      #pm-roaming-bot {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 945;
        width: 52px;
        height: 74px;
        cursor: grab;
        user-select: none;
        -webkit-user-select: none;
        touch-action: none;
        will-change: transform;
        transition: opacity 0.22s ease;
      }
      #pm-roaming-bot.pm-dragging {
        cursor: grabbing !important;
        z-index: 1050;
      }
      #pm-roaming-bot.pm-hidden {
        display: none !important;
      }
      .pm-roam-flip {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        will-change: transform;
        transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
      }
      #pm-roaming-bot.pm-dragging .pm-roam-flip {
        transition: none;
      }

      /* Chuyển đổi tay khi đi bộ / bị bế vs khi đứng nghỉ */
      #pm-roaming-bot.pm-state-walk .pm-arm-r-idle,
      #pm-roaming-bot.pm-state-drag .pm-arm-r-idle {
        display: none;
      }
      #pm-roaming-bot.pm-state-walk .pm-arm-r-walk,
      #pm-roaming-bot.pm-state-drag .pm-arm-r-walk {
        display: inline;
      }

      /* ---- CHU KỲ BƯỚC CHÂN & ĐÁNH TAY TỰ NHIÊN KHI ĐI BỘ ---- */
      @keyframes pmStrideLeft {
        0%, 100% { transform: translateY(0px) rotate(13deg); }
        25% { transform: translateY(-2.4px) rotate(-2deg); }
        50% { transform: translateY(-0.5px) rotate(-15deg); }
        75% { transform: translateY(0.8px) rotate(1deg); }
      }
      @keyframes pmStrideRight {
        0%, 100% { transform: translateY(-0.5px) rotate(-15deg); }
        25% { transform: translateY(0.8px) rotate(1deg); }
        50% { transform: translateY(0px) rotate(13deg); }
        75% { transform: translateY(-2.4px) rotate(-2deg); }
      }
      @keyframes pmArmSwingLeft {
        0%, 100% { transform: rotate(-14deg); }
        50% { transform: rotate(15deg); }
      }
      @keyframes pmArmSwingRight {
        0%, 100% { transform: rotate(15deg); }
        50% { transform: rotate(-14deg); }
      }
      @keyframes pmWalkBodyBob {
        0%, 50%, 100% { transform: translateY(0.8px) rotate(2.5deg); }
        25%, 75% { transform: translateY(-1.8px) rotate(1deg); }
      }
      @keyframes pmWalkHeadNod {
        0%, 50%, 100% { transform: translateY(1px) rotate(1.8deg); }
        25%, 75% { transform: translateY(-2.1px) rotate(-0.6deg); }
      }
      @keyframes pmWalkShadow {
        0%, 50%, 100% { transform: scaleX(1.04); opacity: 0.28; }
        25%, 75% { transform: scaleX(0.86); opacity: 0.17; }
      }
      @keyframes pmTasselSway {
        0%, 100% { transform: rotate(-6deg); }
        50% { transform: rotate(9deg); }
      }

      #pm-roaming-bot.pm-state-walk .pm-leg-l {
        transform-box: fill-box;
        transform-origin: 55% 10%;
        animation: pmStrideLeft 0.56s linear infinite;
      }
      #pm-roaming-bot.pm-state-walk .pm-leg-r {
        transform-box: fill-box;
        transform-origin: 45% 10%;
        animation: pmStrideRight 0.56s linear infinite;
      }
      #pm-roaming-bot.pm-state-walk .pm-arm-l {
        transform-box: fill-box;
        transform-origin: 85% 12%;
        animation: pmArmSwingLeft 0.56s ease-in-out infinite;
      }
      #pm-roaming-bot.pm-state-walk .pm-arm-r-walk {
        transform-box: fill-box;
        transform-origin: 15% 12%;
        animation: pmArmSwingRight 0.56s ease-in-out infinite;
      }
      #pm-roaming-bot.pm-state-walk .pm-upper-body {
        transform-box: fill-box;
        transform-origin: 50% 80%;
        animation: pmWalkBodyBob 0.56s ease-in-out infinite;
      }
      #pm-roaming-bot.pm-state-walk .pm-head-group {
        transform-box: fill-box;
        transform-origin: 50% 90%;
        animation: pmWalkHeadNod 0.56s ease-in-out infinite;
      }
      #pm-roaming-bot.pm-state-walk .pm-shadow {
        transform-box: fill-box;
        transform-origin: center;
        animation: pmWalkShadow 0.56s ease-in-out infinite;
      }
      #pm-roaming-bot.pm-state-walk .pm-tassel {
        transform-box: fill-box;
        transform-origin: 8% 8%;
        animation: pmTasselSway 0.56s ease-in-out infinite;
      }

      /* ---- ĐỨNG NGHỈ (IDLE): THỞ NHẸ + VẪY TAY CHÀO ---- */
      @keyframes pmIdleBreathe {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-2.2px); }
      }
      #pm-roaming-bot.pm-state-idle .pm-upper-body,
      #pm-roaming-bot.pm-state-idle .pm-head-group {
        animation: pmIdleBreathe 2.8s ease-in-out infinite;
      }

      /* ---- KHI BỊ BẾ LÊN (DRAG): ĐẠP CHÂN LƠ LỬNG + MẤT BÓNG ĐẤT ---- */
      @keyframes pmDangleL {
        0%, 100% { transform: rotate(-16deg); }
        50% { transform: rotate(12deg); }
      }
      @keyframes pmDangleR {
        0%, 100% { transform: rotate(14deg); }
        50% { transform: rotate(-14deg); }
      }
      @keyframes pmFlailArmL {
        0%, 100% { transform: rotate(22deg); }
        50% { transform: rotate(42deg); }
      }
      @keyframes pmFlailArmR {
        0%, 100% { transform: rotate(-22deg); }
        50% { transform: rotate(-42deg); }
      }
      #pm-roaming-bot.pm-state-drag .pm-leg-l {
        transform-box: fill-box;
        transform-origin: 55% 10%;
        animation: pmDangleL 0.36s ease-in-out infinite;
      }
      #pm-roaming-bot.pm-state-drag .pm-leg-r {
        transform-box: fill-box;
        transform-origin: 45% 10%;
        animation: pmDangleR 0.36s ease-in-out infinite;
      }
      #pm-roaming-bot.pm-state-drag .pm-arm-l {
        transform-box: fill-box;
        transform-origin: 85% 12%;
        animation: pmFlailArmL 0.32s ease-in-out infinite;
      }
      #pm-roaming-bot.pm-state-drag .pm-arm-r-walk {
        transform-box: fill-box;
        transform-origin: 15% 12%;
        animation: pmFlailArmR 0.32s ease-in-out infinite;
      }
      #pm-roaming-bot.pm-state-drag .pm-shadow {
        opacity: 0 !important;
      }

      /* ---- NHÚN ĐÁP ĐẤT SAU KHI THẢ TAY ---- */
      @keyframes pmLandSquash {
        0% { transform: translateY(-6px) scaleY(1.06) scaleX(0.95); }
        45% { transform: translateY(2px) scaleY(0.88) scaleX(1.1); }
        75% { transform: translateY(-2px) scaleY(1.03) scaleX(0.98); }
        100% { transform: translateY(0) scaleY(1) scaleX(1); }
      }
      #pm-roaming-bot.pm-landing .pm-char {
        transform-box: fill-box;
        transform-origin: 50% 95%;
        animation: pmLandSquash 0.45s cubic-bezier(0.22, 1, 0.36, 1) 1;
      }

      .pm-roam-dismiss {
        position: absolute;
        top: -4px;
        right: -6px;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 1px solid rgba(148, 163, 184, 0.5);
        background: rgba(15, 23, 42, 0.9);
        color: #e2e8f0;
        font-size: 11px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        cursor: pointer;
        transition: opacity 0.18s ease;
      }
      #pm-roaming-bot:hover .pm-roam-dismiss {
        opacity: 1;
      }
      .pm-roam-bubble {
        position: absolute;
        bottom: 76px;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        padding: 4px 10px;
        border-radius: 8px;
        background: #0f172a;
        color: #e0f2fe;
        border: 1px solid rgba(56, 189, 248, 0.45);
        font-family: var(--font-mono, monospace);
        font-size: 11px;
        font-weight: 700;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.18s ease;
      }
      #pm-roaming-bot.pm-bubble-below .pm-roam-bubble {
        bottom: auto;
        top: 76px;
      }
      #pm-roaming-bot:hover .pm-roam-bubble,
      #pm-roaming-bot.pm-dragging .pm-roam-bubble {
        opacity: 1;
      }

      /* Trạm Trợ Lý Pike (dưới #calc-output) */
      #pm-lab-station {
        margin-top: 16px;
        padding: 16px 18px;
        border-radius: 16px;
        background: var(--bg-surface-alt, #f1f5f9);
        border: 1px solid var(--border-color, #cbd5e1);
        border-left: 4px solid var(--primary, #2563eb);
        box-shadow: var(--shadow-sm, 0 4px 12px rgba(15, 23, 42, 0.06));
      }
      html[data-theme="dark"] #pm-lab-station {
        background: rgba(11, 18, 34, 0.92);
        border-color: rgba(56, 189, 248, 0.26);
        border-left-color: #38bdf8;
      }
      .pm-station-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 12px;
        padding-bottom: 10px;
        border-bottom: 1px dashed rgba(148, 163, 184, 0.35);
      }
      .pm-station-grid {
        display: grid;
        grid-template-columns: 205px minmax(0, 1fr);
        gap: 16px;
        align-items: center;
      }
      .pm-station-scene {
        position: relative;
        border-radius: 12px;
        padding: 10px;
        background: linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%);
        border: 1px solid rgba(37, 99, 235, 0.28);
        cursor: pointer;
        overflow: hidden;
      }
      html[data-theme="dark"] .pm-station-scene {
        background: #080f1f;
        border-color: rgba(56, 189, 248, 0.32);
      }
      .pm-station-scene:hover {
        border-color: #38bdf8;
      }
      .pm-station-tip-box {
        background: var(--bg-surface, #ffffff);
        border: 1px solid var(--border-color, #cbd5e1);
        border-radius: 12px;
        padding: 12px 14px;
        font-size: 0.9rem;
        line-height: 1.65;
        color: var(--text-primary, #0f172a);
      }
      html[data-theme="dark"] .pm-station-tip-box {
        background: rgba(15, 25, 46, 0.92);
        border-color: rgba(56, 189, 248, 0.22);
        color: #e2e8f0;
      }
      .pm-station-tip-tag {
        display: inline-block;
        font-family: var(--font-mono, monospace);
        font-size: 0.74rem;
        font-weight: 800;
        padding: 2px 9px;
        border-radius: 6px;
        background: var(--primary-soft, rgba(37, 99, 235, 0.12));
        color: var(--primary, #2563eb);
        margin-bottom: 6px;
      }
      .pm-station-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 10px;
      }

      /* Hoạt ảnh nhấp nhô, chớp mắt & vẫy tay chung */
      @keyframes pmHoverBob {
        0%, 100% { transform: translate3d(0, 0, 0); }
        50% { transform: translate3d(0, -4px, 0); }
      }
      @keyframes pmWaveArm {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-10deg); }
        55% { transform: rotate(8deg); }
        80% { transform: rotate(-6deg); }
      }
      @keyframes pmEyeBlink {
        0%, 91%, 99%, 100% { transform: scaleY(1); }
        95% { transform: scaleY(0.12); }
      }
      .pm-lab-bot-float {
        animation: pmHoverBob 3.2s ease-in-out infinite;
      }
      .pm-wave-arm {
        transform-box: fill-box;
        transform-origin: 10% 85%;
        animation: pmWaveArm 3.4s ease-in-out infinite;
      }
      .pm-eye-blink {
        transform-box: fill-box;
        transform-origin: center;
        animation: pmEyeBlink 4.6s ease-in-out infinite;
      }
      @keyframes pmHop {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
      }
      @keyframes pmShake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-1.6px); }
        40% { transform: translateX(1.6px); }
        60% { transform: translateX(-1.1px); }
        80% { transform: translateX(1.1px); }
      }
      @keyframes pmCheerL {
        0%, 100% { transform: rotate(8deg); }
        50% { transform: rotate(-10deg); }
      }
      @keyframes pmCheerR {
        0%, 100% { transform: rotate(-8deg); }
        50% { transform: rotate(10deg); }
      }
      @keyframes pmTwinkle {
        0%, 100% { opacity: 0.25; }
        50% { opacity: 1; }
      }
      @keyframes pmThink {
        0%, 100% { opacity: 0.6; transform: translateY(0); }
        50% { opacity: 1; transform: translateY(-1.5px); }
      }
      @keyframes pmSweat {
        0% { transform: translateY(0); opacity: 1; }
        100% { transform: translateY(4px); opacity: 0; }
      }
      .pm-char-celebrate {
        animation: pmHop 0.62s ease-in-out infinite;
      }
      .pm-char-surprised {
        animation: pmShake 0.5s ease-in-out 3;
      }
      .pm-cheer-arm-l {
        transform-box: fill-box;
        transform-origin: 85% 88%;
        animation: pmCheerL 0.5s ease-in-out infinite;
      }
      .pm-cheer-arm-r {
        transform-box: fill-box;
        transform-origin: 5% 88%;
        animation: pmCheerR 0.5s ease-in-out infinite;
      }
      .pm-confetti {
        animation: pmTwinkle 1s ease-in-out infinite;
      }
      .pm-think-bubble {
        animation: pmThink 1.6s ease-in-out infinite;
      }
      .pm-sweat {
        animation: pmSweat 1.2s ease-in infinite;
      }
      .pm-paused .pm-lab-bot-float,
      .pm-paused .pm-wave-arm,
      .pm-paused .pm-eye-blink,
      .pm-paused .pm-char,
      .pm-paused .pm-cheer-arm-l,
      .pm-paused .pm-cheer-arm-r,
      .pm-paused .pm-confetti,
      .pm-paused .pm-think-bubble,
      .pm-paused .pm-sweat {
        animation-play-state: paused !important;
      }

      @media (max-width: 640px) {
        .pm-station-grid {
          grid-template-columns: 1fr;
        }
        #pm-roaming-bot {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function applyMascotFavicon() {
    const iconSvg = getMascotSVG({
      width: 64,
      height: 64,
      mood: "normal",
      round: true,
      withSymbols: false,
      animateWave: false,
      uid: "fav",
    })
      .replace(/\s+/g, " ")
      .trim();
    const encoded = `data:image/svg+xml,${encodeURIComponent(iconSvg)}`;
    let link = document.querySelector('link[rel="icon"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/svg+xml";
      document.head.appendChild(link);
    }
    link.type = "image/svg+xml";
    link.href = encoded;
  }

  function enhancePikeManUI() {
    const fab = document.getElementById("pikeman-ai-fab");
    if (fab && !fab.dataset.mascotApplied) {
      fab.dataset.mascotApplied = "1";
      fab.innerHTML = `<span class="pm-fab-avatar">${getMascotSVG({
        width: 30,
        height: 30,
        mood: "normal",
        round: true,
        withSymbols: false,
        animateWave: false,
        uid: "fab",
      })}</span><span>Pike Man</span>`;
    }

    const header = document.querySelector("#pikeman-ai-drawer .pm-ai-header");
    const firstBlock = header?.firstElementChild;
    if (header && firstBlock && !header.dataset.mascotApplied) {
      header.dataset.mascotApplied = "1";
      const wrap = document.createElement("div");
      wrap.className = "pm-header-brand";

      const avatarBtn = document.createElement("button");
      avatarBtn.type = "button";
      avatarBtn.className = "pm-header-avatar";
      avatarBtn.title = "Bật / Tắt linh vật Pike dạo chơi quanh web";
      avatarBtn.innerHTML = getMascotSVG({
        width: 30,
        height: 30,
        mood: "normal",
        round: true,
        withSymbols: false,
        animateWave: false,
        uid: "hdr",
      });
      avatarBtn.addEventListener("click", () => {
        const cur = localStorage.getItem(ROAM_STORAGE_KEY) !== "0";
        const next = !cur;
        localStorage.setItem(ROAM_STORAGE_KEY, next ? "1" : "0");
        if (typeof window.__pmSyncRoamState === "function") {
          window.__pmSyncRoamState(next);
        }
        window.showToast?.(
          next
            ? "Đã bật linh vật Pike dạo chơi quanh web (có thể nắm kéo đi chỗ khác)!"
            : "Đã ẩn linh vật Pike (bấm lại avatar để bật).",
          "info",
        );
      });

      header.insertBefore(wrap, firstBlock);
      wrap.appendChild(avatarBtn);
      wrap.appendChild(firstBlock);
    }
  }

  function initRoamingMascot() {
    if (!document.body || document.getElementById("pm-roaming-bot")) return;

    const BOT_W = 52;
    const BOT_H = 74;

    const bot = document.createElement("div");
    bot.id = "pm-roaming-bot";
    bot.className = "pm-state-idle";
    bot.setAttribute("role", "button");
    bot.setAttribute(
      "aria-label",
      "Linh vật Pike — Kéo để di chuyển hoặc bấm để mở Pike Man",
    );
    bot.innerHTML = `
      <div class="pm-roam-bubble" id="pm-roam-bubble">Kéo hoặc bấm mở Pike Man</div>
      <button type="button" class="pm-roam-dismiss" title="Ẩn linh vật Pike" aria-label="Ẩn linh vật">&times;</button>
      <div class="pm-roam-flip" id="pm-roam-flip">${getMascotSVG({
        width: BOT_W,
        height: BOT_H,
        mood: "normal",
        headOnly: false,
        withSymbols: false,
        animateWave: true,
        uid: "roam",
      })}</div>
    `;
    document.body.appendChild(bot);

    const flipEl = document.getElementById("pm-roam-flip");
    const bubbleEl = document.getElementById("pm-roam-bubble");
    const dismissBtn = bot.querySelector(".pm-roam-dismiss");

    let roamEnabled = localStorage.getItem(ROAM_STORAGE_KEY) !== "0";
    let winW = window.innerWidth;
    let winH = window.innerHeight;
    let hasDock = !!document.getElementById("ml-chapter-dock");

    let minX = 16;
    let maxX = Math.max(120, winW - BOT_W - 16);
    let minY = 74;
    let maxY = Math.max(140, winH - BOT_H - 18);

    // Khôi phục vị trí đã kéo nếu có, mặc định góc trái phía dưới
    let posX = minX + 24;
    let posY = Math.max(minY, maxY - 14);
    try {
      const saved = JSON.parse(localStorage.getItem(POS_STORAGE_KEY) || "null");
      if (saved && typeof saved.rx === "number" && typeof saved.ry === "number") {
        posX = saved.rx * winW;
        posY = saved.ry * winH;
      }
    } catch (_) {
      /* bỏ qua */
    }

    // Trạng thái AI: "idle" (đứng nghỉ vẫy tay) | "walk" (đi bộ có bước chân) | "drag" (bị bế)
    let aiState = "idle";
    let faceDir = 1; // 1 = nhìn phải, -1 = nhìn trái

    // Tham số quỹ đạo đường cong mượt cho một chặng đi bộ
    let walkStartX = posX;
    let walkStartY = posY;
    let walkEndX = posX;
    let walkEndY = posY;
    let walkPerpX = 0;
    let walkPerpY = 0;
    let walkArc = 0;
    let walkElapsed = 0;
    let walkDuration = 2.5;

    let isHovered = false;
    let isDragging = false;
    let hasDragged = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let lastDragX = 0;
    let dragTilt = 0;

    let modalOpen = false;
    let rafId = 0;
    let lastTime = 0;
    let idleTimer = 0;
    let peekTimer = 0;
    let currentRenderedMood = "normal";

    const setBotStateClass = (state) => {
      aiState = state;
      bot.classList.toggle("pm-state-walk", state === "walk");
      bot.classList.toggle("pm-state-idle", state === "idle");
      bot.classList.toggle("pm-state-drag", state === "drag");
    };

    const setFlipTransform = (dir, extraTilt = 0, extraScale = 1) => {
      faceDir = dir;
      if (!flipEl) return;
      flipEl.style.transform = `scaleX(${dir}) rotate(${extraTilt.toFixed(1)}deg) scale(${extraScale})`;
    };

    const updateBubblePlacement = () => {
      bot.classList.toggle("pm-bubble-below", posY < 118);
    };

    const isInsideFabZone = (x, y) => {
      const fabGuardW = 185;
      const fabGuardH = hasDock ? 130 : 84;
      return x > winW - fabGuardW && y > winH - fabGuardH;
    };

    const clampAndAvoidFab = () => {
      posX = Math.max(minX, Math.min(maxX, posX));
      posY = Math.max(minY, Math.min(maxY, posY));
      if (isInsideFabZone(posX, posY)) {
        const fabGuardH = hasDock ? 130 : 84;
        posY = Math.max(minY, winH - fabGuardH);
      }
    };

    const paintPosition = () => {
      bot.style.transform = `translate3d(${posX.toFixed(2)}px, ${posY.toFixed(2)}px, 0)`;
      updateBubblePlacement();
    };

    const savePosition = () => {
      try {
        localStorage.setItem(
          POS_STORAGE_KEY,
          JSON.stringify({
            rx: +(posX / Math.max(1, winW)).toFixed(4),
            ry: +(posY / Math.max(1, winH)).toFixed(4),
          }),
        );
      } catch (_) {
        /* bỏ qua */
      }
    };

    const recalcBounds = () => {
      winW = window.innerWidth;
      winH = window.innerHeight;
      hasDock = !!document.getElementById("ml-chapter-dock");
      if (winW < 520 || !roamEnabled) {
        bot.classList.add("pm-hidden");
        clearTimeout(idleTimer);
        clearTimeout(peekTimer);
        return;
      }
      bot.classList.remove("pm-hidden");
      minX = 14;
      maxX = Math.max(minX + 40, winW - BOT_W - 14);
      minY = 72;
      maxY = Math.max(minY + 40, winH - BOT_H - (hasDock ? 68 : 16));
      clampAndAvoidFab();
      paintPosition();
    };

    const setExpression = (mood) => {
      const m = normalizeMood(mood);
      if (!flipEl || currentRenderedMood === m) return;
      currentRenderedMood = m;
      flipEl.innerHTML = getMascotSVG({
        width: BOT_W,
        height: BOT_H,
        mood: m,
        headOnly: false,
        withSymbols: false,
        animateWave: true,
        uid: "roam",
      });
    };

    roamMoodHook = (mood) => {
      if (isDragging) return;
      setExpression(isHovered && mood === "normal" ? "happy" : mood);
    };

    const canRun = () =>
      roamEnabled &&
      winW >= 520 &&
      !document.hidden &&
      !modalOpen &&
      !isHovered &&
      !isDragging;

    /* Chọn điểm đến mới gần đó (95px - 320px) để đi bộ tự nhiên */
    const pickNextWaypoint = () => {
      let tx = posX;
      let ty = posY;
      for (let attempt = 0; attempt < 12; attempt++) {
        const dist = 95 + Math.random() * 225;
        const theta = Math.random() * Math.PI * 2;
        const candX = Math.max(minX, Math.min(maxX, posX + Math.cos(theta) * dist));
        const candY = Math.max(minY, Math.min(maxY, posY + Math.sin(theta) * dist));
        if (!isInsideFabZone(candX, candY) && Math.hypot(candX - posX, candY - posY) > 65) {
          tx = candX;
          ty = candY;
          break;
        }
      }

      walkStartX = posX;
      walkStartY = posY;
      walkEndX = tx;
      walkEndY = ty;

      const dx = walkEndX - walkStartX;
      const dy = walkEndY - walkStartY;
      const len = Math.max(1, Math.hypot(dx, dy));

      // Vector pháp tuyến tạo đường cong nhẹ tự nhiên
      walkPerpX = -dy / len;
      walkPerpY = dx / len;
      walkArc = (Math.random() - 0.5) * Math.min(36, len * 0.22);

      // Tốc độ trung bình ~44 px/s
      walkDuration = Math.max(1.6, Math.min(6.2, len / 44));
      walkElapsed = 0;

      if (Math.abs(dx) > 6) {
        setFlipTransform(dx < 0 ? -1 : 1, 0, 1);
      }
      setBotStateClass("walk");
    };

    /* Dừng chân nghỉ ngơi, vẫy tay & ngó nghiêng */
    const enterIdleRest = (customDelayMs) => {
      clearTimeout(idleTimer);
      clearTimeout(peekTimer);
      setBotStateClass("idle");
      setFlipTransform(faceDir, 0, 1);

      const restMs = customDelayMs ?? 2400 + Math.random() * 2400;

      // Giữa lúc nghỉ, quay đầu ngó sang bên kia một cái cho sinh động
      peekTimer = setTimeout(() => {
        if (!canRun() || aiState !== "idle") return;
        const lookCenter = posX < winW * 0.5 ? 1 : -1;
        setFlipTransform(lookCenter, 0, 1);
      }, restMs * 0.48);

      idleTimer = setTimeout(() => {
        idleTimer = 0;
        if (!canRun()) return;
        pickNextWaypoint();
        startWalkLoop();
      }, restMs);
    };

    const startWalkLoop = () => {
      if (!rafId && canRun() && aiState === "walk") {
        lastTime = 0;
        rafId = requestAnimationFrame(stepWalk);
      }
    };

    // Hàm easing mượt (tăng tốc nhẹ lúc khởi hành, giảm tốc êm lúc dừng)
    const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

    function stepWalk(now = 0) {
      rafId = 0;
      if (!canRun() || aiState !== "walk") {
        return;
      }

      if (lastTime) {
        const dt = Math.min(0.06, (now - lastTime) / 1000);
        walkElapsed += dt;

        const rawT = Math.min(1, walkElapsed / walkDuration);
        const eased = easeInOutSine(rawT);
        const curve = Math.sin(Math.PI * rawT) * walkArc;

        posX = walkStartX + (walkEndX - walkStartX) * eased + walkPerpX * curve;
        posY = walkStartY + (walkEndY - walkStartY) * eased + walkPerpY * curve;
        clampAndAvoidFab();
        paintPosition();

        if (rawT >= 1) {
          lastTime = 0;
          enterIdleRest();
          return;
        }
      }
      lastTime = now;
      rafId = requestAnimationFrame(stepWalk);
    }

    const checkModals = () => {
      modalOpen = !!document.querySelector(
        ".modal-backdrop.open, #ml-cmd-backdrop.open, #pikeman-ai-drawer.open",
      );
      bot.style.opacity = modalOpen ? "0" : "1";
      bot.style.pointerEvents = modalOpen ? "none" : "auto";
      if (!modalOpen && canRun()) {
        if (aiState === "walk") startWalkLoop();
        else enterIdleRest(1200);
      }
    };

    window.__pmSyncRoamState = (nextEnabled) => {
      roamEnabled = !!nextEnabled;
      recalcBounds();
      if (roamEnabled && canRun()) {
        enterIdleRest(800);
      }
    };

    /* ----- Kéo thả (Drag & Drop) có quán tính nghiêng người ----- */
    bot.addEventListener("pointerdown", (e) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      if (e.target && e.target.closest(".pm-roam-dismiss")) return;

      clearTimeout(idleTimer);
      clearTimeout(peekTimer);
      isDragging = true;
      hasDragged = false;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      lastDragX = e.clientX;
      dragTilt = 0;
      dragOffsetX = e.clientX - posX;
      dragOffsetY = e.clientY - posY;
      try {
        bot.setPointerCapture(e.pointerId);
      } catch (_) {
        /* bỏ qua */
      }
    });

    bot.addEventListener("pointermove", (e) => {
      if (!isDragging) return;
      const dist = Math.hypot(e.clientX - dragStartX, e.clientY - dragStartY);
      if (!hasDragged && dist > 6) {
        hasDragged = true;
        bot.classList.add("pm-dragging");
        setBotStateClass("drag");
        if (bubbleEl) bubbleEl.textContent = "Đang bế Pike...";
        setExpression("surprised");
      }
      if (hasDragged) {
        const vxPointer = e.clientX - lastDragX;
        lastDragX = e.clientX;
        // Quán tính nghiêng nhẹ ngược chiều kéo
        const targetTilt = Math.max(-15, Math.min(15, -vxPointer * 0.75));
        dragTilt = dragTilt * 0.65 + targetTilt * 0.35;

        posX = Math.max(minX, Math.min(maxX, e.clientX - dragOffsetX));
        posY = Math.max(minY, Math.min(maxY, e.clientY - dragOffsetY));
        paintPosition();
        setFlipTransform(faceDir, dragTilt, 1.06);
      }
    });

    const finishDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      bot.classList.remove("pm-dragging");
      try {
        if (e && typeof e.pointerId === "number") {
          bot.releasePointerCapture(e.pointerId);
        }
      } catch (_) {
        /* bỏ qua */
      }

      if (hasDragged) {
        clampAndAvoidFab();
        paintPosition();
        savePosition();
        setBotStateClass("idle");
        setFlipTransform(faceDir, 0, 1);

        // Hiệu ứng nhún đáp đất
        bot.classList.remove("pm-landing");
        void bot.offsetWidth;
        bot.classList.add("pm-landing");
        setTimeout(() => bot.classList.remove("pm-landing"), 500);

        if (bubbleEl) bubbleEl.textContent = "Kéo hoặc bấm mở Pike Man";
        setExpression("happy");
        setTimeout(() => {
          if (!isDragging) {
            setExpression(isHovered ? "happy" : globalMood);
            if (canRun()) enterIdleRest(1800);
          }
        }, 900);
      } else if (canRun()) {
        enterIdleRest(1500);
      }
    };

    bot.addEventListener("pointerup", finishDrag);
    bot.addEventListener("pointercancel", finishDrag);

    bot.addEventListener("pointerenter", () => {
      if (isDragging) return;
      isHovered = true;
      clearTimeout(idleTimer);
      clearTimeout(peekTimer);
      setBotStateClass("idle");
      setFlipTransform(1, 0, 1);
      setExpression("happy");
    });

    bot.addEventListener("pointerleave", () => {
      if (isDragging) return;
      isHovered = false;
      setExpression(globalMood);
      if (canRun()) enterIdleRest(1400);
    });

    window.addEventListener("blur", () => {
      isHovered = false;
      isDragging = false;
      bot.classList.remove("pm-dragging");
      clearTimeout(idleTimer);
      clearTimeout(peekTimer);
    });
    window.addEventListener("focus", () => {
      if (canRun()) {
        if (aiState === "walk") startWalkLoop();
        else enterIdleRest(1000);
      }
    });

    dismissBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      localStorage.setItem(ROAM_STORAGE_KEY, "0");
      roamEnabled = false;
      recalcBounds();
      window.showToast?.(
        "Đã ẩn linh vật Pike (bấm vào avatar trong khung Pike Man để bật lại).",
        "info",
      );
    });

    bot.addEventListener("click", () => {
      if (hasDragged) {
        hasDragged = false;
        return;
      }
      window.MathLabSound?.soft?.();
      const drawer = document.getElementById("pikeman-ai-drawer");
      const fab = document.getElementById("pikeman-ai-fab");
      if (drawer && !drawer.classList.contains("open")) {
        fab?.click();
      } else if (fab) {
        fab.click();
      }
    });

    window.addEventListener("resize", recalcBounds, { passive: true });
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && canRun()) {
        if (aiState === "walk") startWalkLoop();
        else enterIdleRest(1000);
      }
    });

    const observed = new WeakSet();
    const mObs = new MutationObserver(checkModals);
    const bindModals = () => {
      document
        .querySelectorAll(
          ".modal-backdrop, #ml-cmd-backdrop, #pikeman-ai-drawer",
        )
        .forEach((el) => {
          if (observed.has(el)) return;
          observed.add(el);
          mObs.observe(el, { attributes: true, attributeFilter: ["class"] });
        });
      hasDock = !!document.getElementById("ml-chapter-dock");
      recalcBounds();
    };

    recalcBounds();
    bindModals();
    setTimeout(bindModals, 120);

    // Khởi đầu: vẫy tay chào 0.9s rồi bắt đầu dạo chơi ngay để thấy chuyển động
    if (canRun()) {
      enterIdleRest(900);
    }
  }

  function initLabMascotStation() {
    const calcOut = document.getElementById("calc-output");
    if (!calcOut || document.getElementById("pm-lab-station")) return;

    const station = document.createElement("div");
    station.id = "pm-lab-station";

    let tipIndex = Math.floor(Math.random() * LAB_TIPS.length);
    let moodTimer = null;

    const buildSceneSVG = (mood = "normal") => `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:6px;">
        <div class="pm-lab-bot-float" style="flex-shrink:0;">
          ${getMascotSVG({
            width: 88,
            height: 94,
            mood,
            headOnly: false,
            withSymbols: true,
            animateWave: true,
            uid: "lab",
          })}
        </div>
        <svg width="88" height="88" viewBox="0 0 92 92" fill="none" aria-hidden="true" style="flex-shrink:0;">
          <rect x="4" y="8" width="84" height="66" rx="8" fill="#050b17" stroke="#1e3a8a" stroke-width="1.2"/>
          <line x1="4" y1="44" x2="88" y2="44" stroke="#334155" stroke-width="1"/>
          <line x1="42" y1="8" x2="42" y2="74" stroke="#334155" stroke-width="1"/>
          <rect x="42" y="34" width="8" height="10" fill="#10b981" fill-opacity="0.32" stroke="#10b981" stroke-width="0.9"/>
          <rect x="50" y="26" width="8" height="18" fill="#10b981" fill-opacity="0.32" stroke="#10b981" stroke-width="0.9"/>
          <rect x="58" y="20" width="8" height="24" fill="#10b981" fill-opacity="0.32" stroke="#10b981" stroke-width="0.9"/>
          <rect x="66" y="29" width="8" height="15" fill="#10b981" fill-opacity="0.32" stroke="#10b981" stroke-width="0.9"/>
          <path d="M10 62 Q30 48 48 30 T82 22" stroke="#38bdf8" stroke-width="2" fill="none" stroke-linecap="round"/>
          <line x1="20" y1="54" x2="76" y2="14" stroke="#f59e0b" stroke-width="1.4" stroke-dasharray="3 2"/>
          <circle cx="48" cy="30" r="3.2" fill="#10b981" stroke="#ffffff" stroke-width="1.2"/>
          <text x="10" y="20" fill="#7dd3fc" font-family="monospace" font-size="7.5" font-weight="700">∫f(x)dx</text>
          <text x="46" y="86" text-anchor="middle" fill="#64748b" font-family="monospace" font-size="7">PIKE LAB HUD</text>
        </svg>
      </div>
    `;

    station.innerHTML = `
      <div class="pm-station-head">
        <div style="display:flex; align-items:center; gap:8px;">
          <strong style="font-size:0.92rem; color:var(--primary);">Trạm Trợ Lý Pike</strong>
          <span class="badge badge-calc">Bẫy &amp; Mẹo Giải Toán</span>
        </div>
        <span style="font-family:var(--font-mono); font-size:0.74rem; color:var(--text-muted);">Bấm vào Pike để đổi mẹo</span>
      </div>
      <div class="pm-station-grid">
        <div class="pm-station-scene" id="pm-station-scene-btn" title="Bấm vào Pike để xem mẹo khác">
          ${buildSceneSVG("normal")}
        </div>
        <div>
          <div class="pm-station-tip-box" id="pm-station-tip-box"></div>
          <div class="pm-station-actions">
            <button type="button" class="btn btn-sm btn-outline" id="pm-tip-next-btn">Đổi mẹo khác</button>
            <button type="button" class="btn btn-sm btn-secondary" id="pm-tip-ask-btn">Hỏi Pike Man về hàm này</button>
          </div>
        </div>
      </div>
    `;

    calcOut.insertAdjacentElement("afterend", station);

    const tipBox = document.getElementById("pm-station-tip-box");
    const sceneBtn = document.getElementById("pm-station-scene-btn");

    const setLabMood = (mood, durationMs = 0) => {
      if (moodTimer) {
        clearTimeout(moodTimer);
        moodTimer = null;
      }
      if (sceneBtn) {
        sceneBtn.innerHTML = buildSceneSVG(mood);
      }
      if (durationMs > 0) {
        moodTimer = setTimeout(() => {
          moodTimer = null;
          if (sceneBtn) sceneBtn.innerHTML = buildSceneSVG("normal");
        }, durationMs);
      }
    };

    labMoodHook = setLabMood;

    const renderCurrentTip = (flashHappy = false) => {
      const tip = LAB_TIPS[tipIndex % LAB_TIPS.length];
      if (tipBox) {
        tipBox.innerHTML = `
          <div class="pm-station-tip-tag">${tip.tag}</div>
          <div>${tip.text}</div>
        `;
        if (typeof window.renderMath === "function") {
          window.renderMath(tipBox);
        } else if (typeof window.renderMathInElement === "function") {
          window.renderMathInElement(tipBox, {
            delimiters: [
              { left: "$$", right: "$$", display: true },
              { left: "$", right: "$", display: false },
            ],
            throwOnError: false,
          });
        }
      }
      if (flashHappy) {
        setLabMood("happy", 750);
      }
    };

    const nextTip = () => {
      tipIndex = (tipIndex + 1) % LAB_TIPS.length;
      window.MathLabSound?.soft?.();
      renderCurrentTip(true);
    };

    sceneBtn?.addEventListener("click", nextTip);
    document
      .getElementById("pm-tip-next-btn")
      ?.addEventListener("click", nextTip);

    document.getElementById("pm-tip-ask-btn")?.addEventListener("click", () => {
      pikeReact("thinking", 2800);
      const fnExpr =
        document.getElementById("calc-func")?.value.trim() || "x^3 - 3*x";
      const x0Val = document.getElementById("calc-x0")?.value ?? "1";
      const aVal = document.getElementById("calc-a")?.value ?? "0";
      const bVal = document.getElementById("calc-b")?.value ?? "2";
      if (typeof window.askPikeMan === "function") {
        window.askPikeMan(
          `Trong Phòng Lab tôi đang khảo sát hàm $f(x) = ${fnExpr}$ tại $x_0 = ${x0Val}$ và xét tích phân trên đoạn $[${aVal}, ${bVal}]$. Hãy giúp tôi tính nhanh đạo hàm tại $x_0$, phương trình tiếp tuyến và gợi ý cách tính $\\int_{${aVal}}^{${bVal}} f(x)\\,dx$ chi tiết từng bước!`,
        );
      }
    });

    const syncLabStationPause = () => {
      const labCalcPanel = document.getElementById("lab-calc");
      const panelInactive =
        labCalcPanel && !labCalcPanel.classList.contains("active");
      const anyModalOpen = !!document.querySelector(
        ".modal-backdrop.open, #ml-cmd-backdrop.open",
      );
      station.classList.toggle(
        "pm-paused",
        document.hidden || panelInactive || anyModalOpen,
      );
    };

    document.addEventListener("visibilitychange", syncLabStationPause);
    document.querySelectorAll(".lab-tab").forEach((t) => {
      t.addEventListener("click", () => setTimeout(syncLabStationPause, 20));
    });
    const stObs = new MutationObserver(syncLabStationPause);
    document
      .querySelectorAll(".modal-backdrop, #ml-cmd-backdrop")
      .forEach((el) => {
        stObs.observe(el, { attributes: true, attributeFilter: ["class"] });
      });

    renderCurrentTip(false);
    syncLabStationPause();
  }

  /* =====================  BIỂU CẢM TOÀN CỤC  ===================== */
  function setFabMood(mood) {
    const av = document.querySelector("#pikeman-ai-fab .pm-fab-avatar");
    if (!av) return;
    av.innerHTML = getMascotSVG({
      width: 30,
      height: 30,
      mood,
      round: true,
      animateWave: false,
      uid: "fab",
    });
  }

  function applyMoodEverywhere(mood) {
    globalMood = mood;
    if (typeof roamMoodHook === "function") roamMoodHook(mood);
    setFabMood(mood);
  }

  function pikeReact(mood = "happy", durationMs = 2600) {
    const m = normalizeMood(mood);
    clearTimeout(reactTimer);
    reactTimer = 0;
    applyMoodEverywhere(m);
    if (typeof labMoodHook === "function") {
      labMoodHook(m, m === "normal" ? 0 : durationMs);
    }
    if (m !== "normal" && durationMs > 0) {
      reactTimer = setTimeout(() => {
        reactTimer = 0;
        applyMoodEverywhere("normal");
      }, durationMs);
    }
  }

  window.PikeMascot = {
    moods: ["normal", "thinking", "happy", "celebrate", "surprised"],
    react: pikeReact,
    correct: (ms = 3000) => pikeReact("celebrate", ms),
    wrong: (ms = 3000) => pikeReact("surprised", ms),
    thinking: (ms = 3000) => pikeReact("thinking", ms),
    happy: (ms = 2000) => pikeReact("happy", ms),
    reset: () => pikeReact("normal", 0),
    demo: () => {
      ["thinking", "celebrate", "surprised", "happy"].forEach((m, i) =>
        setTimeout(() => pikeReact(m, 2000), i * 2300),
      );
    },
    getSVG: getMascotSVG,
  };
  window.setPikeMascotMood = (mood, ms = 2600) => pikeReact(mood, ms);
  document.addEventListener("pike:mood", (e) => {
    const d = e.detail || {};
    pikeReact(d.mood, d.duration ?? 2600);
  });

  // Tự nhận biết lỗi ở #calc-output -> Pike ngạc nhiên
  function watchCalcErrors() {
    const out = document.getElementById("calc-output");
    if (!out || out.dataset.pmErrWatch) return;
    out.dataset.pmErrWatch = "1";

    const ERR_SEL =
      ".error, .calc-error, .error-msg, .text-danger, .text-error, .alert-danger, [data-error], [role='alert']";
    const ERR_RE =
      /(⚠|❌|lỗi\s*[:：!]|lỗi\s+cú\s*pháp|syntax\s*error|không\s+(thể\s+)?(tính|phân\s*tích|đọc))/i;

    let wasError = false;
    let debounce = 0;
    const check = () => {
      const isErr =
        !!out.querySelector(ERR_SEL) || ERR_RE.test(out.textContent || "");
      if (isErr && !wasError) pikeReact("surprised", 3200);
      wasError = isErr;
    };
    new MutationObserver(() => {
      clearTimeout(debounce);
      debounce = setTimeout(check, 120);
    }).observe(out, { childList: true, subtree: true, characterData: true });
  }

  // Mỗi lần gọi askPikeMan() -> Pike suy nghĩ
  function hookAskPikeMan() {
    try {
      if (window.__pmAskHooked || typeof window.askPikeMan !== "function") return;
      const orig = window.askPikeMan;
      window.askPikeMan = function (...args) {
        pikeReact("thinking", 3000);
        return orig.apply(this, args);
      };
      window.__pmAskHooked = true;
    } catch (_) {
      /* bỏ qua */
    }
  }

  function bootPikeManMascot() {
    injectMascotStyles();
    applyMascotFavicon();
    enhancePikeManUI();
    initRoamingMascot();
    initLabMascotStation();
    watchCalcErrors();
    setTimeout(enhancePikeManUI, 60);
    setTimeout(watchCalcErrors, 1200);
    setTimeout(hookAskPikeMan, 300);
    setTimeout(hookAskPikeMan, 1800);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootPikeManMascot);
  } else {
    bootPikeManMascot();
  }
})();
