/* ==========================================================================
   FILE: js/math-tools.js (PHIÊN BẢN V5.4 — PHÒNG LAB ĐỒ THỊ KIỂU GEOGEBRA & BỘ GÕ LATEX)
   1. Đồ thị Hàm số tương tác (Pan/Zoom/Crosshair/Kéo tiếp điểm x0), Bộ gõ LaTeX & Taylor-Maclaurin
   2. Phân tích Ma trận vuông & chữ nhật m × n (det, rank, REF, adj(A), A^-1, A^T, tr, A^2)
   3. Giải Hệ PTTT tổng quát m × n (Khử Gauss, Kronecker-Capelli, nghiệm tham số & Cramer)
   4. Bộ sinh bài tập tự luận đổi mới theo từng mục
   ========================================================================== */

let taylorAnimTimer = null;

// Trạng thái hệ quy chiếu tương tác kiểu GeoGebra cho Canvas Giải tích
const calcViewport = {
  scale: 42,
  offsetX: 0,
  offsetY: 0,
  hoverPx: null,
  hoverPy: null,
  isPanning: false,
  isDraggingX0: false,
  dragStartX: 0,
  dragStartY: 0,
  startOffsetX: 0,
  startOffsetY: 0,
};

// --- HỖ TRỢ SỐ PHỨC ĐỂ TÍNH ĐẠO HÀM CẤP CAO TAYLOR ---
const CMath = {
  add: (a, b) => ({ re: a.re + b.re, im: a.im + b.im }),
  sub: (a, b) => ({ re: a.re - b.re, im: a.im - b.im }),
  mul: (a, b) => ({
    re: a.re * b.re - a.im * b.im,
    im: a.re * b.im + a.im * b.re,
  }),
  div: (a, b) => {
    const d = b.re * b.re + b.im * b.im || 1e-18;
    return {
      re: (a.re * b.re + a.im * b.im) / d,
      im: (a.im * b.re - a.re * b.im) / d,
    };
  },
  exp: (z) => {
    const r = Math.exp(z.re);
    return { re: r * Math.cos(z.im), im: r * Math.sin(z.im) };
  },
  sin: (z) => ({
    re: Math.sin(z.re) * Math.cosh(z.im),
    im: Math.cos(z.re) * Math.sinh(z.im),
  }),
  cos: (z) => ({
    re: Math.cos(z.re) * Math.cosh(z.im),
    im: -Math.sin(z.re) * Math.sinh(z.im),
  }),
  log: (z) => ({
    re: 0.5 * Math.log(z.re * z.re + z.im * z.im || 1e-18),
    im: Math.atan2(z.im, z.re),
  }),
  sqrt: (z) => {
    const r = Math.hypot(z.re, z.im);
    const phi = Math.atan2(z.im, z.re) * 0.5;
    const sr = Math.sqrt(r);
    return { re: sr * Math.cos(phi), im: sr * Math.sin(phi) };
  },
  pow: (z, w) => {
    if (z.re === 0 && z.im === 0) {
      return w.re > 0 ? { re: 0, im: 0 } : { re: NaN, im: NaN };
    }
    return CMath.exp(CMath.mul(w, CMath.log(z)));
  },
  tan: (z) => CMath.div(CMath.sin(z), CMath.cos(z)),
  cot: (z) => CMath.div(CMath.cos(z), CMath.sin(z)),
  sinh: (z) => ({
    re: Math.sinh(z.re) * Math.cos(z.im),
    im: Math.cosh(z.re) * Math.sin(z.im),
  }),
  cosh: (z) => ({
    re: Math.cosh(z.re) * Math.cos(z.im),
    im: Math.sinh(z.re) * Math.sin(z.im),
  }),
  tanh: (z) => CMath.div(CMath.sinh(z), CMath.cosh(z)),
  atan: (z) => {
    const iz = { re: -z.im, im: z.re };
    const num = CMath.sub({ re: 1, im: 0 }, iz);
    const den = CMath.add({ re: 1, im: 0 }, iz);
    const lg = CMath.log(CMath.div(num, den));
    return { re: -0.5 * lg.im, im: 0.5 * lg.re };
  },
};

const _compiledComplexCache = new Map();

function compileComplexMathFn(expr) {
  const key = String(expr || "");
  if (_compiledComplexCache.has(key)) return _compiledComplexCache.get(key);

  const clean = latexToMathExpr(expr)
    .replace(/(\d)\s*(?!(?:e[+-]?\d))([a-zA-Z(])/g, "$1*$2")
    .replace(/(\))\s*([a-zA-Z0-9(])/g, "$1*$2")
    .replace(/\b(pi|e|x)\s+(?=[a-zA-Z(])/gi, "$1*")
    .replace(
      /\bx\s*(?=(?:sin|cos|tan|cot|atan|sinh|cosh|tanh|ln|log|exp|sqrt|\())/g,
      "x*",
    )
    .replace(/\^/g, "**")
    .replace(/\*\*\s*([+-][a-zA-Z0-9_.]+)/g, "**($1)")
    .replace(/\bpi\b/gi, "Math.PI")
    .replace(/\be\b/g, "Math.E");

  const tokens =
    clean.match(
      /\d+(?:\.\d+)?(?:e[+-]?\d+)?|Math\.PI|Math\.E|[a-zA-Z_]\w*|\*\*|[()+\-*/]/g,
    ) || [];

  let pos = 0;
  const peek = () => tokens[pos];
  const next = () => tokens[pos++];

  function parseExpr() {
    let node = parseTerm();
    while (peek() === "+" || peek() === "-") {
      const op = next();
      const right = parseTerm();
      node = op === "+" ? CMath.add(node, right) : CMath.sub(node, right);
    }
    return node;
  }

  function parseTerm() {
    let node = parsePower();
    while (peek() === "*" || peek() === "/") {
      const op = next();
      const right = parsePower();
      node = op === "*" ? CMath.mul(node, right) : CMath.div(node, right);
    }
    return node;
  }

  function parsePower() {
    let base = parseUnary();
    if (peek() === "**") {
      next();
      const expNode = parsePower();
      base = CMath.pow(base, expNode);
    }
    return base;
  }

  function parseUnary() {
    if (peek() === "+") {
      next();
      return parseUnary();
    }
    if (peek() === "-") {
      next();
      const v = parseUnary();
      return { re: -v.re, im: -v.im };
    }
    return parsePrimary();
  }

  function parsePrimary() {
    const tok = next();
    if (!tok) return { re: NaN, im: NaN };
    if (tok === "(") {
      const inner = parseExpr();
      if (peek() === ")") next();
      return inner;
    }
    if (tok === "x") return currentZ;
    if (tok === "Math.PI") return { re: Math.PI, im: 0 };
    if (tok === "Math.E") return { re: Math.E, im: 0 };
    if (/^\d/.test(tok)) return { re: parseFloat(tok), im: 0 };
    if (peek() === "(") {
      next();
      const arg = parseExpr();
      if (peek() === ")") next();
      if (tok === "sin") return CMath.sin(arg);
      if (tok === "cos") return CMath.cos(arg);
      if (tok === "tan") return CMath.tan(arg);
      if (tok === "cot") return CMath.cot(arg);
      if (tok === "atan") return CMath.atan(arg);
      if (tok === "sinh") return CMath.sinh(arg);
      if (tok === "cosh") return CMath.cosh(arg);
      if (tok === "tanh") return CMath.tanh(arg);
      if (tok === "exp") return CMath.exp(arg);
      if (tok === "ln") return CMath.log(arg);
      if (tok === "log") {
        const lg = CMath.log(arg);
        const invLn10 = 1 / Math.LN10;
        return { re: lg.re * invLn10, im: lg.im * invLn10 };
      }
      if (tok === "sqrt") return CMath.sqrt(arg);
    }
    return { re: NaN, im: NaN };
  }

  let currentZ = { re: 0, im: 0 };
  const fn = (z) => {
    pos = 0;
    currentZ = z;
    const res = parseExpr();
    return pos === tokens.length ? res : { re: NaN, im: NaN };
  };

  if (_compiledComplexCache.size > 30) _compiledComplexCache.clear();
  _compiledComplexCache.set(key, fn);
  return fn;
}

function computeTaylorCoeffsCauchy(expr, x0, maxDegree) {
  const cFn = compileComplexMathFn(expr);
  const radii = [0.35, 0.16, 0.07];
  const M = 64;

  for (const r of radii) {
    const samples = [];
    let valid = true;
    for (let j = 0; j < M; j++) {
      const theta = (2 * Math.PI * j) / M;
      const z = { re: x0 + r * Math.cos(theta), im: r * Math.sin(theta) };
      const fz = cFn(z);
      if (!Number.isFinite(fz.re) || !Number.isFinite(fz.im)) {
        valid = false;
        break;
      }
      samples.push({ fz, theta });
    }
    if (!valid) continue;

    const coeffs = [];
    let rPow = 1;
    for (let k = 0; k <= maxDegree; k++) {
      let sumRe = 0;
      for (let j = 0; j < M; j++) {
        const { fz, theta } = samples[j];
        const ang = -k * theta;
        sumRe += fz.re * Math.cos(ang) - fz.im * Math.sin(ang);
      }
      const ck = sumRe / (M * rPow);
      coeffs.push(Math.abs(ck) < 1e-12 ? 0 : ck);
      rPow *= r;
    }
    return coeffs;
  }
  return null;
}

function formatCoeffFractionLatex(val) {
  const absV = Math.abs(val);
  if (Math.abs(absV - Math.round(absV)) < 1e-7) {
    return String(Math.round(absV));
  }
  const commonDens = [
    2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16, 20, 24, 30, 32, 36, 40, 48, 60, 64, 72,
    120, 720, 5040,
  ];
  for (const d of commonDens) {
    const n = Math.round(absV * d);
    if (n > 0 && Math.abs(absV - n / d) < 1e-7) {
      return `\\frac{${n}}{${d}}`;
    }
  }
  return Number(absV.toFixed(4)).toString();
}

function formatTaylorPolyLatex(coeffs, x0, deg) {
  const terms = [];
  const xBase =
    Math.abs(x0) < 1e-9
      ? "x"
      : x0 > 0
        ? `(x - ${formatNum(x0)})`
        : `(x + ${formatNum(Math.abs(x0))})`;

  for (let k = 0; k <= deg && k < coeffs.length; k++) {
    const c = coeffs[k];
    if (!Number.isFinite(c) || Math.abs(c) < 1e-9) continue;
    const sign = c < 0 ? "-" : "+";
    const magStr = formatCoeffFractionLatex(c);
    const varPart = k === 0 ? "" : k === 1 ? xBase : `${xBase}^{${k}}`;
    const body = varPart && magStr === "1" ? varPart : `${magStr}${varPart}`;

    if (terms.length === 0) {
      terms.push(c < 0 ? `-${body}` : body);
    } else {
      terms.push(`${sign} ${body}`);
    }
  }

  const rhs = terms.length > 0 ? terms.join(" ") : "0";
  return `P_{${deg}}(x) = ${rhs}`;
}

// --- BỘ CHUYỂN ĐỔI CÚ PHÁP LATEX & TOÁN HỌC SANG BIỂU THỨC JS ---
function extractBraceGroup(str, openBraceIdx) {
  if (str[openBraceIdx] !== "{") return null;
  let depth = 0;
  for (let i = openBraceIdx; i < str.length; i++) {
    if (str[i] === "{") depth++;
    else if (str[i] === "}") {
      depth--;
      if (depth === 0) {
        return {
          content: str.slice(openBraceIdx + 1, i),
          endIdx: i,
        };
      }
    }
  }
  return null;
}

function replaceLatexCommandWithBraces(str, cmd, replacer) {
  let out = str;
  let guard = 0;
  while (out.includes(cmd) && guard++ < 30) {
    const idx = out.indexOf(cmd);
    let cursor = idx + cmd.length;
    while (cursor < out.length && /\s/.test(out[cursor])) cursor++;
    const g1 = extractBraceGroup(out, cursor);
    if (!g1) break;
    if (replacer.length === 2) {
      let cursor2 = g1.endIdx + 1;
      while (cursor2 < out.length && /\s/.test(out[cursor2])) cursor2++;
      const g2 = extractBraceGroup(out, cursor2);
      if (!g2) break;
      out =
        out.slice(0, idx) +
        replacer(g1.content, g2.content) +
        out.slice(g2.endIdx + 1);
    } else {
      out = out.slice(0, idx) + replacer(g1.content) + out.slice(g1.endIdx + 1);
    }
  }
  return out;
}

function normalizeJsMathPrefixes(raw) {
  return String(raw || "")
    .replace(/\bMath\.log10\s*\(/g, "log(")
    .replace(/\bMath\.log\s*\(/g, "ln(")
    .replace(/\bMath\.PI\b/g, "pi")
    .replace(/\bMath\.E\b/g, "e")
    .replace(/\bMath\./g, "");
}

function latexToMathExpr(raw) {
  let s = normalizeJsMathPrefixes(raw)
    // Chuẩn hóa khoảng trắng ẩn & dấu trừ/nhân Unicode khi copy từ web/PDF/chat
    .replace(/[\u00A0\u200B-\u200D\uFEFF]/g, " ")
    .replace(/[\u2212\u2013\u2014]/g, "-")
    .replace(/[\u00D7\u22C5]/g, "*")
    .replace(/[（]/g, "(")
    .replace(/[）]/g, ")")
    .trim();

  // Bỏ dấu $ bao ngoài nếu người dùng dán từ công thức KaTeX
  s = s
    .replace(/^\$\$|\$\$$/g, "")
    .replace(/^\$|\$$/g, "")
    .trim();
  // Bỏ tiền tố y = hoặc f(x) = nếu có
  s = s.replace(/^(?:y|f\s*\(\s*x\s*\))\s*=\s*/i, "");

  // Chuẩn hóa ngoặc và toán tử nhân LaTeX
  s = s
    .replace(/\\left\s*\(/g, "(")
    .replace(/\\right\s*\)/g, ")")
    .replace(/\\left\s*\[/g, "(")
    .replace(/\\right\s*\]/g, ")")
    .replace(/\\left\s*\|/g, "|")
    .replace(/\\right\s*\|/g, "|")
    .replace(/\\cdot|\\times/g, "*");

  // Chuyển \frac{a}{b} và \dfrac{a}{b} (hỗ trợ lồng nhau)
  s = replaceLatexCommandWithBraces(s, "\\dfrac", (a, b) => `((${a})/(${b}))`);
  s = replaceLatexCommandWithBraces(s, "\\frac", (a, b) => `((${a})/(${b}))`);

  // Chuyển \sqrt[n]{x} và \sqrt{x}
  s = s.replace(/\\sqrt\s*\[([^\]]+)\]\s*\{([^{}]+)\}/g, "((($2))**(1/($1)))");
  s = replaceLatexCommandWithBraces(s, "\\sqrt", (a) => `sqrt(${a})`);

  // Chuyển lũy thừa dạng LaTeX ^{...} -> **(...)
  let guardPow = 0;
  while (s.includes("^{") && guardPow++ < 30) {
    const pIdx = s.indexOf("^{");
    const grp = extractBraceGroup(s, pIdx + 1);
    if (!grp) break;
    s = s.slice(0, pIdx) + `**(${grp.content})` + s.slice(grp.endIdx + 1);
  }

  // Hỗ trợ \log_e(...) hoặc \log_{e}(...) -> ln(...)
  s = s.replace(/\\?log\s*_\s*\{?\s*e\s*\}?\s*/gi, "ln");

  // Chuyển các lệnh hàm lượng giác, log, mũ LaTeX
  s = s
    .replace(/\\arcsin\b/g, "asin")
    .replace(/\\arccos\b/g, "acos")
    .replace(/\\arctan\b/g, "atan")
    .replace(/\\sinh\b/g, "sinh")
    .replace(/\\cosh\b/g, "cosh")
    .replace(/\\tanh\b/g, "tanh")
    .replace(/\\sin\b/g, "sin")
    .replace(/\\cos\b/g, "cos")
    .replace(/\\tan\b/g, "tan")
    .replace(/\\cot\b/g, "cot")
    .replace(/\\ln\b/g, "ln")
    .replace(/\\log\b/g, "log")
    .replace(/\\exp\b/g, "exp")
    .replace(/\\abs\b/g, "abs")
    .replace(/\\pi\b/gi, "pi");

  // Hỗ trợ viết tắt không ngoặc kiểu LaTeX: \sin x -> sin(x), \ln x -> ln(x)
  s = s.replace(
    /\b(sin|cos|tan|cot|ln|log|exp|sqrt)\s+([0-9.]*x(?:\^[0-9.]+)?|[0-9.]+|pi)\b/g,
    "$1($2)",
  );

  // Chuyển cặp dấu trị tuyệt đối |...| thành (abs(...)) để hoạt động cả trong \ln|1+x|
  s = s.replace(/\|([^|]+)\|/g, "(abs($1))");

  // Hỗ trợ lũy thừa hàm lượng giác / log dạng sin^2(x), \ln^2(1+x)
  s = s.replace(
    /\b(sin|cos|tan|cot|asin|acos|atan|sinh|cosh|tanh|ln|log|exp)\s*\*\*\s*(\([^()]+\)|[0-9.]+)\s*\(([^()]+)\)/g,
    "(($1($3))**($2))",
  );

  // Chuyển ngoặc nhọn và ngoặc vuông nhóm biểu thức thành ngoặc tròn
  s = s
    .replace(/\{/g, "(")
    .replace(/\}/g, ")")
    .replace(/\[/g, "(")
    .replace(/\]/g, ")");

  return s;
}

const _compiledFnCache = new Map();

function compileMathFn(expr) {
  const cacheKey = String(expr || "");
  if (_compiledFnCache.has(cacheKey)) {
    return _compiledFnCache.get(cacheKey);
  }

  const clean = latexToMathExpr(expr)
    // Hỗ trợ nhân tắt kể cả có dấu cách: 2x, 2 sin(x), (x+1)(x-1), x e^x, pi x
    .replace(/(\d)\s*(?!(?:e[+-]?\d))([a-zA-Z(])/g, "$1*$2")
    .replace(/(\))\s*([a-zA-Z0-9(])/g, "$1*$2")
    .replace(/\b(pi|e|x)\s+(?=[a-zA-Z(])/gi, "$1*")
    .replace(
      /\bx\s*(?=(?:sin|cos|tan|cot|asin|acos|atan|sinh|cosh|tanh|ln|log|exp|sqrt|abs|\())/g,
      "x*",
    )
    .replace(/\^/g, "**")
    // Bọc ngoặc nếu số mũ có dấu âm/dương đứng ngay sau ** (tránh SyntaxError JS như e**-x)
    .replace(/\*\*\s*([+-][a-zA-Z0-9_.]+)/g, "**($1)")
    .replace(/(?<!Math\.)\basin\s*\(/g, "Math.asin(")
    .replace(/(?<!Math\.)\bacos\s*\(/g, "Math.acos(")
    .replace(/(?<!Math\.)\batan\s*\(/g, "Math.atan(")
    .replace(/(?<!Math\.)\bsinh\s*\(/g, "Math.sinh(")
    .replace(/(?<!Math\.)\bcosh\s*\(/g, "Math.cosh(")
    .replace(/(?<!Math\.)\btanh\s*\(/g, "Math.tanh(")
    .replace(/(?<!Math\.)\bsin\s*\(/g, "Math.sin(")
    .replace(/(?<!Math\.)\bcos\s*\(/g, "Math.cos(")
    .replace(/(?<!Math\.)\btan\s*\(/g, "Math.tan(")
    .replace(/(?<!Math\.)\bcot\s*\(/g, "cot(")
    .replace(/(?<!Math\.)\bexp\s*\(/g, "Math.exp(")
    .replace(/(?<!Math\.)\bln\s*\(/g, "Math.log(")
    .replace(/(?<!Math\.)\blog\s*\(/g, "Math.log10(")
    .replace(/(?<!Math\.)\bsqrt\s*\(/g, "Math.sqrt(")
    .replace(/(?<!Math\.)\babs\s*\(/g, "Math.abs(")
    .replace(/(?<!Math\.)\bpi\b/gi, "Math.PI")
    .replace(/(?<!Math\.)\be\b/g, "Math.E");

  const cotFn = (v) => 1 / Math.tan(v);
  const rawFn = new Function("x", "cot", `return ${clean};`);
  const wrappedFn = (x) => rawFn(x, cotFn);

  if (_compiledFnCache.size > 40) _compiledFnCache.clear();
  _compiledFnCache.set(cacheKey, wrappedFn);
  return wrappedFn;
}

function evalRealFn(expr, x) {
  try {
    const fn = compileMathFn(expr);
    const v = fn(x);
    return Number.isFinite(v) ? v : NaN;
  } catch {
    return NaN;
  }
}

function exprToPrettyLatex(raw) {
  let s = normalizeJsMathPrefixes(raw)
    .replace(/[\u00A0\u200B-\u200D\uFEFF]/g, " ")
    .replace(/[\u2212\u2013\u2014]/g, "-")
    .trim();
  if (!s) return "f(x)";
  s = s
    .replace(/^\$\$|\$\$$/g, "")
    .replace(/^\$|\$$/g, "")
    .trim();
  if (!/^(?:y|f\s*\(\s*x\s*\))\s*=/.test(s)) {
    s = "y = " + s;
  }
  s = s
    .replace(/(\d)\s*\*\s*([a-zA-Z\\(])/g, "$1$2")
    .replace(/\*/g, " \\cdot ")
    .replace(/(^|[^\\])\b(sin|cos|tan|cot|ln|log|exp|sqrt)\b/g, "$1\\$2");
  return s;
}

let _lastCalcPreviewRaw = null;

function updateCalcLatexPreview() {
  const input = document.getElementById("calc-func");
  const preview = document.getElementById("calc-latex-preview");
  if (!input || !preview) return;
  if (_lastCalcPreviewRaw === input.value && preview.innerHTML.trim() !== "") {
    return;
  }
  _lastCalcPreviewRaw = input.value;
  const latexStr = exprToPrettyLatex(input.value);
  if (window.katex && typeof window.katex.render === "function") {
    try {
      window.katex.render(latexStr, preview, {
        throwOnError: false,
        displayMode: false,
      });
      return;
    } catch {
      // fallback bên dưới
    }
  }
  preview.textContent = `$${latexStr}$`;
  if (typeof window.renderMathInElement === "function") {
    window.renderMathInElement(preview, {
      delimiters: [{ left: "$", right: "$", display: false }],
      throwOnError: false,
    });
  }
}

function insertCalcLatex(snippet, cursorBackOffset = 0) {
  const input = document.getElementById("calc-func");
  if (!input) return;
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? input.value.length;
  const val = input.value;
  input.value = val.slice(0, start) + snippet + val.slice(end);
  const pos = Math.max(0, start + snippet.length - cursorBackOffset);
  input.focus();
  input.setSelectionRange(pos, pos);
  onCalcFuncInput();
}

let _calcInputDebounceTimer = null;

function onCalcFuncInput() {
  updateCalcLatexPreview();
  if (_calcInputDebounceTimer) {
    clearTimeout(_calcInputDebounceTimer);
  }
  _calcInputDebounceTimer = setTimeout(() => {
    _calcInputDebounceTimer = null;
    runCalculusLab();
  }, 260);
}

function formatNum(val) {
  if (Math.abs(val) < 1e-9) return "0";
  if (Math.abs(val - Math.round(val)) < 1e-7) return String(Math.round(val));
  return Number(val.toFixed(3)).toString();
}

function formatTickLabel(val) {
  if (Math.abs(val) < 1e-9) return "0";
  const rounded = Math.round(val * 10000) / 10000;
  return String(rounded);
}

function getNiceGridStep(scale) {
  const targetPx = 64;
  const rawStep = targetPx / Math.max(scale, 1e-6);
  const pow10 = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const norm = rawStep / pow10;
  let nice = 1;
  if (norm >= 5) nice = 5;
  else if (norm >= 2) nice = 2;
  return nice * pow10;
}

function formatMatrixText(M) {
  return M.map(
    (row) =>
      "[ " + row.map((v) => formatNum(v).padStart(6, " ")).join(" ") + " ]",
  ).join("\n");
}

function parseDims(val, defR = 3, defC = 3) {
  if (!val) return [defR, defC];
  if (String(val).includes("x")) {
    const parts = String(val)
      .split("x")
      .map((n) => parseInt(n, 10));
    return [parts[0] || defR, parts[1] || defC];
  }
  const n = parseInt(val, 10) || defR;
  return [n, n];
}

/* ==========================================================================
   1. ĐỒ THỊ HÀM SỐ TƯƠNG TÁC KIỂU GEOGEBRA, TIẾP TUYẾN, TÍCH PHÂN & TAYLOR
   ========================================================================== */
function computeTaylorCoeffs(presetType, customExpr, x0, maxDegree) {
  const normalized = latexToMathExpr(customExpr).replace(/\s+/g, "");
  let mode = presetType;
  if (mode === "custom") {
    if (normalized === "ln(1+x)" || normalized === "ln(x+1)") mode = "ln1px";
    else if (normalized === "sin(x)") mode = "sin";
    else if (normalized === "cos(x)") mode = "cos";
    else if (normalized === "e**(x)" || normalized === "exp(x)") mode = "exp";
    else if (normalized === "((1)/(1-x))" || normalized === "1/(1-x)")
      mode = "inv1mx";
  }

  const coeffs = [];
  let fact = 1;

  if (mode === "sin") {
    for (let k = 0; k <= maxDegree; k++) {
      if (k > 0) fact *= k;
      const mod = k % 4;
      const deriv =
        mod === 0
          ? Math.sin(x0)
          : mod === 1
            ? Math.cos(x0)
            : mod === 2
              ? -Math.sin(x0)
              : -Math.cos(x0);
      coeffs.push(deriv / fact);
    }
    return coeffs;
  }

  if (mode === "cos") {
    for (let k = 0; k <= maxDegree; k++) {
      if (k > 0) fact *= k;
      const mod = k % 4;
      const deriv =
        mod === 0
          ? Math.cos(x0)
          : mod === 1
            ? -Math.sin(x0)
            : mod === 2
              ? -Math.cos(x0)
              : Math.sin(x0);
      coeffs.push(deriv / fact);
    }
    return coeffs;
  }

  if (mode === "exp") {
    const ex0 = Math.exp(x0);
    for (let k = 0; k <= maxDegree; k++) {
      if (k > 0) fact *= k;
      coeffs.push(ex0 / fact);
    }
    return coeffs;
  }

  if (mode === "ln1px") {
    const u = 1 + x0;
    if (u <= 0) return Array(maxDegree + 1).fill(NaN);
    coeffs.push(Math.log(u));
    let powU = u;
    for (let k = 1; k <= maxDegree; k++) {
      const sign = k % 2 === 1 ? 1 : -1;
      coeffs.push(sign / (k * powU));
      powU *= u;
    }
    return coeffs;
  }

  if (mode === "inv1mx") {
    const u = 1 - x0;
    if (Math.abs(u) < 1e-12) return Array(maxDegree + 1).fill(NaN);
    let powU = u;
    for (let k = 0; k <= maxDegree; k++) {
      coeffs.push(1 / powU);
      powU *= u;
    }
    return coeffs;
  }

  const cauchyCoeffs = computeTaylorCoeffsCauchy(customExpr, x0, maxDegree);
  if (cauchyCoeffs) return cauchyCoeffs;

  const comb = (n, i) => {
    let res = 1;
    for (let j = 1; j <= i; j++) res = (res * (n - j + 1)) / j;
    return res;
  };
  const factorial = (n) => {
    let res = 1;
    for (let j = 2; j <= n; j++) res *= j;
    return res;
  };
  for (let k = 0; k <= maxDegree; k++) {
    const h = k <= 3 ? 0.04 : k <= 5 ? 0.12 : 0.22;
    let diffSum = 0;
    for (let i = 0; i <= k; i++) {
      const sign = i % 2 === 0 ? 1 : -1;
      const xi = x0 + (k / 2 - i) * h;
      diffSum += sign * comb(k, i) * evalRealFn(customExpr, xi);
    }
    const ck = diffSum / (Math.pow(h, k) * factorial(k));
    coeffs.push(Number.isFinite(ck) ? ck : 0);
  }
  return coeffs;
}

function evalTaylorPoly(coeffs, x0, x) {
  let sum = 0;
  let dxPow = 1;
  for (let k = 0; k < coeffs.length; k++) {
    sum += coeffs[k] * dxPow;
    dxPow *= x - x0;
  }
  return sum;
}

function updateZoomBadge() {
  const badge = document.getElementById("calc-zoom-badge");
  if (badge) {
    const pct = Math.round((calcViewport.scale / 42) * 100);
    badge.textContent = `Zoom: ${pct}%`;
  }
}

function zoomCalculusLab(factor, centerPx = null, centerPy = null) {
  const canvas = document.getElementById("calc-canvas");
  if (!canvas) return;
  const width = canvas.width || 640;
  const height = canvas.height || 390;

  const oldScale = calcViewport.scale;
  const newScale = Math.max(8, Math.min(450, oldScale * factor));
  if (Math.abs(newScale - oldScale) < 1e-6) return;

  const cx = centerPx !== null ? centerPx : width / 2;
  const cy = centerPy !== null ? centerPy : height / 2;

  const oldOriginX = width / 2 + calcViewport.offsetX;
  const oldOriginY = height / 2 + calcViewport.offsetY;

  const wx = (cx - oldOriginX) / oldScale;
  const wy = (oldOriginY - cy) / oldScale;

  const newOriginX = cx - wx * newScale;
  const newOriginY = cy + wy * newScale;

  calcViewport.scale = newScale;
  calcViewport.offsetX = newOriginX - width / 2;
  calcViewport.offsetY = newOriginY - height / 2;

  updateZoomBadge();
  runCalculusLab();
}

function resetCalculusViewport() {
  calcViewport.scale = 42;
  calcViewport.offsetX = 0;
  calcViewport.offsetY = 0;
  updateZoomBadge();
  runCalculusLab();
}

function exportCalculusPNG() {
  const canvas = document.getElementById("calc-canvas");
  if (!canvas) return;
  const link = document.createElement("a");
  link.download = "do-thi-mathlab-geogebra.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function switchCalcViewMode(mode) {
  const canvasWrap = document.getElementById("calc-canvas-wrapper");
  const ggbWrap = document.getElementById("geogebra-embed-wrapper");
  const ggbControls = document.getElementById("canvas-geogebra-controls");
  const btnCanvas = document.getElementById("btn-mode-canvas");
  const btnGgb = document.getElementById("btn-mode-geogebra");
  const iframe = document.getElementById("geogebra-iframe");

  if (!canvasWrap || !ggbWrap) return;

  if (mode === "geogebra") {
    canvasWrap.style.display = "none";
    ggbWrap.style.display = "block";
    if (ggbControls) ggbControls.style.display = "none";
    if (btnGgb) {
      btnGgb.classList.remove("btn-outline");
      btnGgb.classList.add("btn-primary");
    }
    if (btnCanvas) {
      btnCanvas.classList.remove("btn-primary");
      btnCanvas.classList.add("btn-outline");
    }
    if (iframe && !iframe.src && iframe.dataset.src) {
      iframe.src = iframe.dataset.src;
    }
  } else {
    ggbWrap.style.display = "none";
    canvasWrap.style.display = "block";
    if (ggbControls) ggbControls.style.display = "flex";
    if (btnCanvas) {
      btnCanvas.classList.remove("btn-outline");
      btnCanvas.classList.add("btn-primary");
    }
    if (btnGgb) {
      btnGgb.classList.remove("btn-primary");
      btnGgb.classList.add("btn-outline");
    }
    runCalculusLab();
  }
}

function getCanvasPointerCoords(canvas, clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / Math.max(rect.width, 1);
  const scaleY = canvas.height / Math.max(rect.height, 1);
  return {
    px: (clientX - rect.left) * scaleX,
    py: (clientY - rect.top) * scaleY,
  };
}

function isNearTangentHandle(px, py) {
  const canvas = document.getElementById("calc-canvas");
  if (!canvas || !canvas._tangentHandle) return false;
  const dx = px - canvas._tangentHandle.px;
  const dy = py - canvas._tangentHandle.py;
  return dx * dx + dy * dy <= 15 * 15;
}

let _calcRafPending = false;

function scheduleCalculusRender() {
  if (_calcRafPending) return;
  _calcRafPending = true;
  requestAnimationFrame(() => {
    _calcRafPending = false;
    runCalculusLab();
  });
}

function bindCalculusCanvasInteractions(canvas) {
  if (!canvas || canvas.dataset.ggbBound === "1") return;
  canvas.dataset.ggbBound = "1";

  canvas.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      const { px, py } = getCanvasPointerCoords(canvas, e.clientX, e.clientY);
      const factor = e.deltaY < 0 ? 1.15 : 0.87;
      zoomCalculusLab(factor, px, py);
    },
    { passive: false },
  );

  canvas.addEventListener("mousedown", (e) => {
    const { px, py } = getCanvasPointerCoords(canvas, e.clientX, e.clientY);
    if (isNearTangentHandle(px, py)) {
      calcViewport.isDraggingX0 = true;
      canvas.style.cursor = "ew-resize";
    } else {
      calcViewport.isPanning = true;
      calcViewport.dragStartX = px;
      calcViewport.dragStartY = py;
      calcViewport.startOffsetX = calcViewport.offsetX;
      calcViewport.startOffsetY = calcViewport.offsetY;
      canvas.style.cursor = "grabbing";
    }
  });

  window.addEventListener("mousemove", (e) => {
    if (!calcViewport.isPanning && !calcViewport.isDraggingX0) return;
    const { px, py } = getCanvasPointerCoords(canvas, e.clientX, e.clientY);
    if (calcViewport.isDraggingX0) {
      const vp = canvas._mathViewport;
      if (vp) {
        const newX0 = Math.round(((px - vp.originX) / vp.scale) * 100) / 100;
        const x0Input = document.getElementById("calc-x0");
        if (x0Input) x0Input.value = String(newX0);
        calcViewport.hoverPx = px;
        calcViewport.hoverPy = py;
        scheduleCalculusRender();
      }
    } else if (calcViewport.isPanning) {
      calcViewport.offsetX =
        calcViewport.startOffsetX + (px - calcViewport.dragStartX);
      calcViewport.offsetY =
        calcViewport.startOffsetY + (py - calcViewport.dragStartY);
      scheduleCalculusRender();
    }
  });

  window.addEventListener("mouseup", () => {
    if (calcViewport.isPanning || calcViewport.isDraggingX0) {
      calcViewport.isPanning = false;
      calcViewport.isDraggingX0 = false;
      canvas.style.cursor = "grab";
    }
  });

  canvas.addEventListener("mousemove", (e) => {
    if (calcViewport.isPanning || calcViewport.isDraggingX0) return;
    const { px, py } = getCanvasPointerCoords(canvas, e.clientX, e.clientY);
    calcViewport.hoverPx = px;
    calcViewport.hoverPy = py;
    canvas.style.cursor = isNearTangentHandle(px, py) ? "ew-resize" : "grab";
    scheduleCalculusRender();
  });

  canvas.addEventListener("mouseleave", () => {
    calcViewport.hoverPx = null;
    calcViewport.hoverPy = null;
    if (!calcViewport.isPanning && !calcViewport.isDraggingX0) {
      scheduleCalculusRender();
    }
  });

  canvas.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      const { px, py } = getCanvasPointerCoords(canvas, t.clientX, t.clientY);
      if (isNearTangentHandle(px, py)) {
        calcViewport.isDraggingX0 = true;
      } else {
        calcViewport.isPanning = true;
        calcViewport.dragStartX = px;
        calcViewport.dragStartY = py;
        calcViewport.startOffsetX = calcViewport.offsetX;
        calcViewport.startOffsetY = calcViewport.offsetY;
      }
    },
    { passive: true },
  );

  canvas.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches.length !== 1) return;
      if (!calcViewport.isPanning && !calcViewport.isDraggingX0) return;
      e.preventDefault();
      const t = e.touches[0];
      const { px, py } = getCanvasPointerCoords(canvas, t.clientX, t.clientY);
      if (calcViewport.isDraggingX0) {
        const vp = canvas._mathViewport;
        if (vp) {
          const newX0 = Math.round(((px - vp.originX) / vp.scale) * 100) / 100;
          const x0Input = document.getElementById("calc-x0");
          if (x0Input) x0Input.value = String(newX0);
          scheduleCalculusRender();
        }
      } else if (calcViewport.isPanning) {
        calcViewport.offsetX =
          calcViewport.startOffsetX + (px - calcViewport.dragStartX);
        calcViewport.offsetY =
          calcViewport.startOffsetY + (py - calcViewport.dragStartY);
        scheduleCalculusRender();
      }
    },
    { passive: false },
  );

  canvas.addEventListener("touchend", () => {
    calcViewport.isPanning = false;
    calcViewport.isDraggingX0 = false;
  });
}

let _lastTaylorTickDeg = null;

function onTaylorDegreeInput(autoEnable = true) {
  const slider = document.getElementById("taylor-degree");
  const toggle = document.getElementById("toggle-taylor-overlay");
  if (!slider) return;

  const deg = parseInt(slider.value, 10) || 0;
  if (autoEnable && toggle && !toggle.checked) {
    toggle.checked = true;
  }
  if (_lastTaylorTickDeg !== deg) {
    _lastTaylorTickDeg = deg;
    window.MathLabSound?.tick?.();
  }
  runCalculusLab();
}

function stepTaylorDegree(delta) {
  const slider = document.getElementById("taylor-degree");
  if (!slider) return;
  const min = parseInt(slider.min || "0", 10);
  const max = parseInt(slider.max || "12", 10);
  const cur = parseInt(slider.value || "0", 10);
  const next = Math.max(min, Math.min(max, cur + delta));
  slider.value = String(next);
  onTaylorDegreeInput(true);
}

function initGraphLabUI() {
  const slot = document.getElementById("taylor-controls-slot");
  if (
    slot &&
    !document.getElementById("taylor-visual-panel") &&
    slot.innerHTML.trim() === ""
  ) {
    slot.innerHTML = `
      <div id="taylor-visual-panel" style="margin-top:10px; padding:14px; border-radius:12px; background:var(--bg-surface-alt); border:1px solid var(--border-color);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
          <strong style="color:var(--primary); font-size:0.9rem;">Taylor Step Scrubber Pₙ(x)</strong>
          <label style="display:flex; align-items:center; gap:6px; font-size:0.82rem; font-weight:700; cursor:pointer;">
            <input type="checkbox" id="toggle-taylor-overlay" onchange="runCalculusLab()">
            <span>Bật đường cam Pₙ(x)</span>
          </label>
        </div>
        <div class="taylor-controls-stack">
          <div>
            <label for="taylor-preset" style="display:block; font-size:0.8rem; font-weight:700; margin-bottom:4px;">Hàm khai triển:</label>
            <select id="taylor-preset" class="select-control" style="width:100%;" onchange="onTaylorPresetChange()">
              <option value="custom" selected>Hàm đang nhập ở trên</option>
              <option value="sin">sin(x)</option>
              <option value="cos">cos(x)</option>
              <option value="exp">eˣ</option>
              <option value="ln1px">ln(1 + x)</option>
              <option value="inv1mx">1 / (1 - x)</option>
            </select>
          </div>
          <div>
            <label for="taylor-degree" style="display:block; font-size:0.8rem; font-weight:700; margin-bottom:4px;">
              Bậc khai triển n = <span id="taylor-deg-label" style="color:var(--primary); font-family:var(--font-mono);">3</span> <span style="color:var(--text-muted); font-weight:500;">(0 → 12)</span>:
            </label>
            <div class="taylor-slider-row" style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
              <button type="button" class="btn btn-sm btn-outline" title="Giảm bậc n (-1)" onclick="stepTaylorDegree(-1)" style="padding:4px 9px; font-family:var(--font-mono);">◀</button>
              <input type="range" id="taylor-degree" min="0" max="12" value="3" oninput="onTaylorDegreeInput(true)" style="flex:1; min-width:110px;">
              <button type="button" class="btn btn-sm btn-outline" title="Tăng bậc n (+1)" onclick="stepTaylorDegree(1)" style="padding:4px 9px; font-family:var(--font-mono);">▶</button>
              <button type="button" class="btn btn-sm btn-secondary" id="taylor-play-btn" onclick="toggleTaylorAnimation()">▶ Tua bậc n</button>
            </div>
          </div>
        </div>
        <div id="taylor-formula-box" style="margin-top:10px; padding:8px 10px; border-radius:8px; background:var(--bg-body); border:1px dashed rgba(249,115,22,0.45); font-size:0.84rem; overflow-x:auto; display:none;"></div>
      </div>
    `;
  }
  if (slot && !document.getElementById("riemann-visual-panel")) {
    const riemannPanel = document.createElement("div");
    riemannPanel.id = "riemann-visual-panel";
    riemannPanel.style.cssText =
      "margin-top:10px; padding:14px; border-radius:12px; background:var(--bg-surface-alt); border:1px solid var(--border-color);";
    riemannPanel.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
        <strong style="color:#10b981; font-size:0.9rem;">Chia Tổng Riemann &amp; Quy tắc Hình thang</strong>
        <label style="display:flex; align-items:center; gap:6px; font-size:0.82rem; font-weight:700; cursor:pointer;">
          <input type="checkbox" id="toggle-riemann-overlay" onchange="runCalculusLab()">
          <span>Bật chia cột trên [a, b]</span>
        </label>
      </div>
      <div class="taylor-controls-stack">
        <div>
          <label for="riemann-method" style="display:block; font-size:0.8rem; font-weight:700; margin-bottom:4px;">Phương pháp xấp xỉ:</label>
          <select id="riemann-method" class="select-control" style="width:100%;" onchange="onRiemannInput(true, false)">
            <option value="midpoint" selected>Tổng Riemann Trung điểm (Midpoint)</option>
            <option value="left">Tổng Riemann Trái (Left)</option>
            <option value="right">Tổng Riemann Phải (Right)</option>
            <option value="trapezoid">Quy tắc Hình thang (Trapezoidal)</option>
            <option value="upper">Tổng Darboux Trên (Upper Sum)</option>
            <option value="lower">Tổng Darboux Dưới (Lower Sum)</option>
          </select>
        </div>
        <div>
          <label for="riemann-n" style="display:block; font-size:0.8rem; font-weight:700; margin-bottom:4px;">
            Số đoạn chia N = <span id="riemann-n-label" style="color:#10b981; font-family:var(--font-mono);">8</span> <span style="color:var(--text-muted); font-weight:500;">(1 → 60)</span>:
          </label>
          <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
            <button type="button" class="btn btn-sm btn-outline" title="Giảm N (-1)" onclick="stepRiemannN(-1)" style="padding:4px 9px; font-family:var(--font-mono);">◀</button>
            <input type="range" id="riemann-n" min="1" max="60" value="8" oninput="onRiemannInput(true, true)" style="flex:1; min-width:110px;">
            <button type="button" class="btn btn-sm btn-outline" title="Tăng N (+1)" onclick="stepRiemannN(1)" style="padding:4px 9px; font-family:var(--font-mono);">▶</button>
            <button type="button" class="btn btn-sm btn-secondary" id="riemann-play-btn" onclick="toggleRiemannAnimation()">▶ Chia mịn dần</button>
          </div>
        </div>
      </div>
      <div id="riemann-readout-box" style="margin-top:10px; padding:8px 10px; border-radius:8px; background:var(--bg-body); border:1px dashed rgba(16,185,129,0.45); font-family:var(--font-mono); font-size:0.79rem; color:var(--text-secondary); display:none;"></div>
    `;
    slot.appendChild(riemannPanel);
  }
  const canvas = document.getElementById("calc-canvas");
  if (canvas) bindCalculusCanvasInteractions(canvas);
  updateCalcLatexPreview();
  updateZoomBadge();
  runCalculusLab();
}

let riemannAnimTimer = null;
let _lastRiemannTickN = null;

function onRiemannInput(autoEnable = true, stopAnim = false) {
  if (stopAnim && riemannAnimTimer) {
    clearInterval(riemannAnimTimer);
    riemannAnimTimer = null;
    const btn = document.getElementById("riemann-play-btn");
    if (btn) btn.textContent = "▶ Chia mịn dần";
  }
  const slider = document.getElementById("riemann-n");
  const toggle = document.getElementById("toggle-riemann-overlay");
  if (!slider) return;

  const nVal = parseInt(slider.value, 10) || 1;
  if (autoEnable && toggle && !toggle.checked) {
    toggle.checked = true;
  }
  if (_lastRiemannTickN !== nVal) {
    _lastRiemannTickN = nVal;
    window.MathLabSound?.tick?.();
  }
  runCalculusLab();
}

function stepRiemannN(delta) {
  const slider = document.getElementById("riemann-n");
  if (!slider) return;
  const min = parseInt(slider.min || "1", 10);
  const max = parseInt(slider.max || "60", 10);
  const cur = parseInt(slider.value || "8", 10);
  slider.value = String(Math.max(min, Math.min(max, cur + delta)));
  onRiemannInput(true, true);
}

function toggleRiemannAnimation() {
  const btn = document.getElementById("riemann-play-btn");
  const slider = document.getElementById("riemann-n");
  const toggle = document.getElementById("toggle-riemann-overlay");
  if (!slider) return;

  if (riemannAnimTimer) {
    clearInterval(riemannAnimTimer);
    riemannAnimTimer = null;
    if (btn) btn.textContent = "▶ Chia mịn dần";
    return;
  }

  if (toggle) toggle.checked = true;
  if (parseInt(slider.value, 10) >= 40) slider.value = "2";
  if (btn) btn.textContent = "❚❚ Dừng";

  riemannAnimTimer = setInterval(() => {
    const cur = parseInt(slider.value, 10) || 2;
    const step = cur < 12 ? 1 : cur < 24 ? 2 : 4;
    const next = cur + step;
    if (next > 44) {
      clearInterval(riemannAnimTimer);
      riemannAnimTimer = null;
      if (btn) btn.textContent = "▶ Chia mịn dần";
      return;
    }
    slider.value = String(next);
    onRiemannInput(true, false);
  }, 360);
}

function onTaylorPresetChange() {
  const preset = document.getElementById("taylor-preset")?.value;
  const fnInput = document.getElementById("calc-func");
  const toggle = document.getElementById("toggle-taylor-overlay");
  const map = {
    sin: "\\sin(x)",
    cos: "\\cos(x)",
    exp: "e^{x}",
    ln1px: "\\ln(1 + x)",
    inv1mx: "\\frac{1}{1 - x}",
  };
  if (fnInput && map[preset]) {
    fnInput.value = map[preset];
    if (toggle) toggle.checked = true;
    updateCalcLatexPreview();
  }
  window.MathLabSound?.soft?.();
  runCalculusLab();
}

function toggleTaylorAnimation() {
  const btn = document.getElementById("taylor-play-btn");
  const slider = document.getElementById("taylor-degree");
  const toggle = document.getElementById("toggle-taylor-overlay");
  if (!slider) return;

  if (taylorAnimTimer) {
    clearInterval(taylorAnimTimer);
    taylorAnimTimer = null;
    if (btn) btn.textContent = "▶ Tua bậc n";
    return;
  }

  const maxDeg = parseInt(slider.max || "12", 10);
  if (toggle) toggle.checked = true;
  if (btn) btn.textContent = "❚❚ Dừng";
  taylorAnimTimer = setInterval(() => {
    let nextVal = (parseInt(slider.value, 10) + 1) % (maxDeg + 1);
    slider.value = String(nextVal);
    onTaylorDegreeInput(true);
  }, 620);
}

function setCalcPreset(expr, x0, a, b) {
  const fnEl = document.getElementById("calc-func");
  const x0El = document.getElementById("calc-x0");
  const aEl = document.getElementById("calc-a");
  const bEl = document.getElementById("calc-b");
  const presetEl = document.getElementById("taylor-preset");
  if (fnEl) fnEl.value = expr;
  if (x0El) x0El.value = x0;
  if (aEl) aEl.value = a;
  if (bEl) bEl.value = b;
  if (presetEl) presetEl.value = "custom";
  updateCalcLatexPreview();
  runCalculusLab();
}

function runCalculusLab() {
  if (_calcInputDebounceTimer) {
    clearTimeout(_calcInputDebounceTimer);
    _calcInputDebounceTimer = null;
  }
  const canvas = document.getElementById("calc-canvas");
  const out = document.getElementById("calc-output");
  if (!canvas) return;

  bindCalculusCanvasInteractions(canvas);
  // Đồng bộ khung hiển thị LaTeX ngay cả khi script khác gán giá trị vào #calc-func bằng JS
  updateCalcLatexPreview();

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const parentW = canvas.parentElement ? canvas.parentElement.clientWidth : 0;
  const targetW = parentW > 60 ? Math.max(300, parentW - 24) : 640;
  const targetH = 390;

  if (canvas.width !== targetW) canvas.width = targetW;
  if (canvas.height !== targetH) canvas.height = targetH;

  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);

  const scale = calcViewport.scale;
  const originX = width / 2 + calcViewport.offsetX;
  const originY = height / 2 + calcViewport.offsetY;

  canvas._mathViewport = { scale, originX, originY, width, height };

  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  ctx.fillStyle = isDark ? "#0f172a" : "#ffffff";
  ctx.fillRect(0, 0, width, height);

  // Lưới tọa độ thích ứng kiểu GeoGebra (lưới phụ + lưới chính)
  const majorStep = getNiceGridStep(scale);
  const minorStep = majorStep / 5;

  const xMinWorld = -originX / scale;
  const xMaxWorld = (width - originX) / scale;
  const yMinWorld = (originY - height) / scale;
  const yMaxWorld = originY / scale;

  // Lưới phụ mờ
  ctx.strokeStyle = isDark
    ? "rgba(30, 41, 59, 0.55)"
    : "rgba(226, 232, 240, 0.65)";
  ctx.lineWidth = 0.8;
  const startMinorX = Math.floor(xMinWorld / minorStep) * minorStep;
  for (let gx = startMinorX; gx <= xMaxWorld; gx += minorStep) {
    const px = originX + gx * scale;
    ctx.beginPath();
    ctx.moveTo(px, 0);
    ctx.lineTo(px, height);
    ctx.stroke();
  }
  const startMinorY = Math.floor(yMinWorld / minorStep) * minorStep;
  for (let gy = startMinorY; gy <= yMaxWorld; gy += minorStep) {
    const py = originY - gy * scale;
    ctx.beginPath();
    ctx.moveTo(0, py);
    ctx.lineTo(width, py);
    ctx.stroke();
  }

  // Lưới chính đậm hơn
  ctx.strokeStyle = isDark ? "#1e293b" : "#cbd5e1";
  ctx.lineWidth = 1.1;
  const startMajorX = Math.floor(xMinWorld / majorStep) * majorStep;
  for (let gx = startMajorX; gx <= xMaxWorld; gx += majorStep) {
    const px = originX + gx * scale;
    ctx.beginPath();
    ctx.moveTo(px, 0);
    ctx.lineTo(px, height);
    ctx.stroke();
  }
  const startMajorY = Math.floor(yMinWorld / majorStep) * majorStep;
  for (let gy = startMajorY; gy <= yMaxWorld; gy += majorStep) {
    const py = originY - gy * scale;
    ctx.beginPath();
    ctx.moveTo(0, py);
    ctx.lineTo(width, py);
    ctx.stroke();
  }

  // Trục Ox, Oy
  ctx.strokeStyle = isDark ? "#64748b" : "#334155";
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  if (originY >= 0 && originY <= height) {
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
  }
  if (originX >= 0 && originX <= width) {
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
  }
  ctx.stroke();

  // Nhãn số chia vạch thích ứng
  ctx.fillStyle = isDark ? "#94a3b8" : "#475569";
  ctx.font = "11px monospace";
  const labelYPos = Math.min(height - 8, Math.max(14, originY + 14));
  for (let gx = startMajorX; gx <= xMaxWorld; gx += majorStep) {
    if (Math.abs(gx) < majorStep * 0.25) continue;
    const px = originX + gx * scale;
    ctx.fillText(formatTickLabel(gx), px - 6, labelYPos);
  }
  const labelXPos = Math.min(width - 34, Math.max(6, originX + 7));
  for (let gy = startMajorY; gy <= yMaxWorld; gy += majorStep) {
    if (Math.abs(gy) < majorStep * 0.25) continue;
    const py = originY - gy * scale;
    ctx.fillText(formatTickLabel(gy), labelXPos, py + 4);
  }
  if (originX >= 0 && originX <= width && originY >= 0 && originY <= height) {
    ctx.fillText("O", originX - 13, originY + 14);
  }

  const expr = document.getElementById("calc-func")?.value || "x^3 - 3*x";
  let compiledFn = null;
  let compileError = null;
  let runtimeError = null;
  try {
    compiledFn = compileMathFn(expr);
    // Kiểm tra thử 1 điểm để bắt sớm lỗi runtime (như biến lạ hoặc sai tên hàm)
    compiledFn(0.5);
  } catch (err) {
    compileError = err.message || "Cú pháp biểu thức chưa hợp lệ";
  }

  const safeEval = (xVal) => {
    if (!compiledFn) return NaN;
    try {
      const v = compiledFn(xVal);
      return Number.isFinite(v) ? v : NaN;
    } catch (err) {
      if (!runtimeError) runtimeError = err.message;
      return NaN;
    }
  };

  if (compileError) {
    if (out) {
      out.innerHTML = `<div style="color:var(--danger); font-weight:700;">Lỗi cú pháp hàm số: <code>${compileError}</code> — Hãy kiểm tra lại dấu ngoặc hoặc ký hiệu hàm (VD: <code>ln(1+x)</code> hoặc <code>\\ln(1+x)</code>).</div>`;
    }
    return;
  }

  const x0Raw = parseFloat(document.getElementById("calc-x0")?.value ?? "1");
  const x0 = Number.isFinite(x0Raw) ? x0Raw : 0;
  const aRaw = parseFloat(document.getElementById("calc-a")?.value ?? "0");
  const bRaw = parseFloat(document.getElementById("calc-b")?.value ?? "2");
  const a = Number.isFinite(aRaw) ? aRaw : 0;
  const b = Number.isFinite(bRaw) ? bRaw : 0;

  // 1. Tô miền tích phân từ a đến b (hoặc vẽ chia cột Tổng Riemann / Quy tắc Hình thang)
  const showRiemann =
    document.getElementById("toggle-riemann-overlay")?.checked ?? false;
  const riemannMethod =
    document.getElementById("riemann-method")?.value || "midpoint";
  const riemannN = Math.max(
    1,
    Math.min(
      60,
      parseInt(document.getElementById("riemann-n")?.value || "8", 10),
    ),
  );
  const riemannNLabel = document.getElementById("riemann-n-label");
  if (riemannNLabel) riemannNLabel.textContent = String(riemannN);

  let riemannApproxSum = NaN;

  if (Number.isFinite(a) && Number.isFinite(b) && a !== b) {
    const lo = Math.min(a, b);
    const hi = Math.max(a, b);
    const dirSign = b >= a ? 1 : -1;

    if (showRiemann) {
      const dxSub = (hi - lo) / riemannN;
      let sumAcc = 0;
      let validBars = 0;

      for (let i = 0; i < riemannN; i++) {
        const xL = lo + i * dxSub;
        const xR = xL + dxSub;
        const pxL = originX + xL * scale;
        const pxR = originX + xR * scale;

        if (riemannMethod === "trapezoid") {
          const yL = safeEval(xL);
          const yR = safeEval(xR);
          if (!Number.isFinite(yL) || !Number.isFinite(yR)) continue;
          validBars++;
          sumAcc += 0.5 * (yL + yR) * dxSub * dirSign;

          const pyL = Math.max(
            -height,
            Math.min(height * 2, originY - yL * scale),
          );
          const pyR = Math.max(
            -height,
            Math.min(height * 2, originY - yR * scale),
          );
          const isNeg = yL + yR < 0;

          ctx.fillStyle = isNeg
            ? "rgba(244, 63, 94, 0.2)"
            : "rgba(16, 185, 129, 0.22)";
          ctx.strokeStyle = isNeg
            ? "rgba(244, 63, 94, 0.78)"
            : "rgba(16, 185, 129, 0.82)";
          ctx.lineWidth = riemannN <= 30 ? 1.2 : 0.8;

          ctx.beginPath();
          ctx.moveTo(pxL, originY);
          ctx.lineTo(pxL, pyL);
          ctx.lineTo(pxR, pyR);
          ctx.lineTo(pxR, originY);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        } else {
          let xSample = (xL + xR) * 0.5;
          let ySample = NaN;

          if (riemannMethod === "left") {
            xSample = xL;
            ySample = safeEval(xL);
          } else if (riemannMethod === "right") {
            xSample = xR;
            ySample = safeEval(xR);
          } else if (riemannMethod === "upper" || riemannMethod === "lower") {
            let bestY = riemannMethod === "upper" ? -Infinity : Infinity;
            let bestX = xSample;
            for (let s = 0; s <= 12; s++) {
              const xs = xL + (s / 12) * dxSub;
              const ys = safeEval(xs);
              if (!Number.isFinite(ys)) continue;
              if (
                (riemannMethod === "upper" && ys > bestY) ||
                (riemannMethod === "lower" && ys < bestY)
              ) {
                bestY = ys;
                bestX = xs;
              }
            }
            if (Number.isFinite(bestY)) {
              ySample = bestY;
              xSample = bestX;
            }
          } else {
            ySample = safeEval(xSample);
          }

          if (!Number.isFinite(ySample)) continue;
          validBars++;
          sumAcc += ySample * dxSub * dirSign;

          const pyTop = Math.max(
            -height,
            Math.min(height * 2, originY - ySample * scale),
          );
          const rectY = Math.min(originY, pyTop);
          const rectH = Math.abs(originY - pyTop);
          const rectW = Math.max(1, pxR - pxL);

          ctx.fillStyle =
            ySample < 0 ? "rgba(244, 63, 94, 0.2)" : "rgba(16, 185, 129, 0.22)";
          ctx.strokeStyle =
            ySample < 0
              ? "rgba(244, 63, 94, 0.78)"
              : "rgba(16, 185, 129, 0.82)";
          ctx.lineWidth = riemannN <= 30 ? 1.2 : 0.75;

          ctx.fillRect(pxL, rectY, rectW, rectH);
          ctx.strokeRect(pxL, rectY, rectW, rectH);

          // Vẽ chấm tròn đánh dấu điểm lấy mẫu f(x_i*) trên đỉnh cột
          if (riemannN <= 32) {
            const pxDot = originX + xSample * scale;
            ctx.fillStyle = ySample < 0 ? "#f43f5e" : "#10b981";
            ctx.beginPath();
            ctx.arc(pxDot, pyTop, 2.7, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      if (validBars > 0) riemannApproxSum = sumAcc;
    } else {
      const steps = 160;
      const dxInt = (hi - lo) / steps;
      ctx.fillStyle = "rgba(59, 130, 246, 0.18)";
      ctx.beginPath();
      let areaStarted = false;
      let firstValidX = lo;
      let lastValidX = hi;
      for (let i = 0; i <= steps; i++) {
        const x = lo + i * dxInt;
        const y = safeEval(x);
        if (Number.isFinite(y)) {
          const clampedPy = Math.max(
            -height,
            Math.min(height * 2, originY - y * scale),
          );
          if (!areaStarted) {
            firstValidX = x;
            ctx.moveTo(originX + firstValidX * scale, originY);
            areaStarted = true;
          }
          lastValidX = x;
          ctx.lineTo(originX + x * scale, clampedPy);
        }
      }
      if (areaStarted) {
        ctx.lineTo(originX + lastValidX * scale, originY);
        ctx.closePath();
        ctx.fill();
      }
    }
  }

  // Hàm phụ tìm điểm sát biên miền xác định bằng chia đôi (giúp ln(1+x), sqrt(4-x^2) nối liền tới biên)
  const findDomainEdgePoint = (invalidPx, validPx) => {
    let lo = invalidPx;
    let hi = validPx;
    let bestPx = validPx;
    let bestY = safeEval((validPx - originX) / scale);
    for (let step = 0; step < 16; step++) {
      const mid = (lo + hi) * 0.5;
      const midY = safeEval((mid - originX) / scale);
      if (Number.isFinite(midY) && Math.abs(midY) < 1e4) {
        bestPx = mid;
        bestY = midY;
        hi = mid;
      } else {
        lo = mid;
      }
    }
    return {
      px: bestPx,
      py: Math.max(-height * 2, Math.min(height * 3, originY - bestY * scale)),
    };
  };

  // 2. Vẽ đồ thị y = f(x) màu xanh dương
  ctx.strokeStyle = "#3b82f6";
  ctx.lineWidth = 2.8;
  ctx.beginPath();
  let started = false;
  let prevPy = null;
  let prevPx = null;
  let prevValid = false;
  let plottedCount = 0;

  for (let px = 0; px <= width; px += 1.5) {
    const x = (px - originX) / scale;
    const y = safeEval(x);
    if (!Number.isFinite(y)) {
      if (started && prevValid && prevPx !== null) {
        const edge = findDomainEdgePoint(px, prevPx);
        ctx.lineTo(edge.px, edge.py);
      }
      started = false;
      prevPy = null;
      prevValid = false;
      prevPx = px;
      continue;
    }
    plottedCount++;
    const py = originY - y * scale;
    // Ngắt nét nếu gặp tiệm cận đứng nhảy vọt
    if (
      py < -height * 2 ||
      py > height * 3 ||
      (prevPy !== null && Math.abs(py - prevPy) > height * 1.4)
    ) {
      started = false;
      prevPy = null;
      prevValid = false;
      prevPx = px;
      continue;
    }
    if (!started) {
      if (!prevValid && prevPx !== null) {
        const edge = findDomainEdgePoint(prevPx, px);
        ctx.moveTo(edge.px, edge.py);
        ctx.lineTo(px, py);
      } else {
        ctx.moveTo(px, py);
      }
      started = true;
    } else {
      ctx.lineTo(px, py);
    }
    prevPy = py;
    prevPx = px;
    prevValid = true;
  }
  ctx.stroke();

  // 3. Vẽ tiếp tuyến tại x0 màu xanh ngọc + tay nắm kéo thả kiểu GeoGebra
  const h = 1e-5;
  const y0 = safeEval(x0);
  const yPlus = safeEval(x0 + h);
  const yMinus = safeEval(x0 - h);
  let slope = NaN;
  if (Number.isFinite(yPlus) && Number.isFinite(yMinus)) {
    slope = (yPlus - yMinus) / (2 * h);
  } else if (Number.isFinite(yPlus) && Number.isFinite(y0)) {
    slope = (yPlus - y0) / h;
  } else if (Number.isFinite(yMinus) && Number.isFinite(y0)) {
    slope = (y0 - yMinus) / h;
  }

  canvas._tangentHandle = null;
  if (Number.isFinite(y0) && Number.isFinite(slope)) {
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(0, originY - (y0 + slope * (xMinWorld - x0)) * scale);
    ctx.lineTo(width, originY - (y0 + slope * (xMaxWorld - x0)) * scale);
    ctx.stroke();
    ctx.setLineDash([]);

    const handlePx = originX + x0 * scale;
    const handlePy = originY - y0 * scale;
    canvas._tangentHandle = { px: handlePx, py: handlePy };

    ctx.fillStyle = "rgba(16, 185, 129, 0.25)";
    ctx.beginPath();
    ctx.arc(handlePx, handlePy, 11, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.arc(handlePx, handlePy, 5.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.6;
    ctx.stroke();
  }

  // 4. Vẽ đa thức Taylor P_n(x) (chỉ chạy bản dự phòng nếu chưa nạp TaylorEngine từ gemini-ai.js)
  const hasAdvancedTaylor = typeof window.renderTaylorOverlay === "function";
  const showTaylor =
    !hasAdvancedTaylor &&
    document.getElementById("toggle-taylor-overlay")?.checked;
  const preset = document.getElementById("taylor-preset")?.value || "custom";
  const deg = parseInt(
    document.getElementById("taylor-degree")?.value || "3",
    10,
  );
  const degLabel = document.getElementById("taylor-deg-label");
  if (degLabel) degLabel.textContent = deg;

  let taylorInfoHtml = "";
  const formulaBox = document.getElementById("taylor-formula-box");
  if (showTaylor) {
    const coeffs = computeTaylorCoeffs(preset, expr, x0, deg);

    // Tô bóng dải sai số |f(x) - P_n(x)| giữa hai đường cong để quan sát độ hội tụ trực quan
    ctx.fillStyle = "rgba(249, 115, 22, 0.13)";
    let segPts = [];
    const flushErrorRibbon = () => {
      if (segPts.length >= 2) {
        ctx.beginPath();
        ctx.moveTo(segPts[0].px, segPts[0].pyF);
        for (let i = 1; i < segPts.length; i++) {
          ctx.lineTo(segPts[i].px, segPts[i].pyF);
        }
        for (let i = segPts.length - 1; i >= 0; i--) {
          ctx.lineTo(segPts[i].px, segPts[i].pyT);
        }
        ctx.closePath();
        ctx.fill();
      }
      segPts = [];
    };

    for (let px = 0; px <= width; px += 4) {
      const x = (px - originX) / scale;
      const yf = safeEval(x);
      const yt = evalTaylorPoly(coeffs, x0, x);
      const pyF = originY - yf * scale;
      const pyT = originY - yt * scale;
      if (
        Number.isFinite(yf) &&
        Number.isFinite(yt) &&
        Math.abs(pyF - pyT) < height * 1.1 &&
        pyF >= -height &&
        pyF <= height * 2 &&
        pyT >= -height &&
        pyT <= height * 2
      ) {
        segPts.push({ px, pyF, pyT });
      } else {
        flushErrorRibbon();
      }
    }
    flushErrorRibbon();

    // Vẽ đường đa thức Taylor P_n(x)
    ctx.strokeStyle = "#f97316";
    ctx.lineWidth = 2.5;
    ctx.setLineDash([7, 4]);
    ctx.beginPath();
    let tStart = false;
    for (let px = 0; px <= width; px += 2) {
      const x = (px - originX) / scale;
      const y = evalTaylorPoly(coeffs, x0, x);
      const py = originY - y * scale;
      if (!Number.isFinite(y) || py < -height * 2 || py > height * 3) {
        tStart = false;
        continue;
      }
      if (!tStart) {
        ctx.moveTo(px, py);
        tStart = true;
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Tính sai số tại điểm chuột (hoặc tại x0 + 0.5)
    const probeX =
      calcViewport.hoverPx !== null
        ? (calcViewport.hoverPx - originX) / scale
        : x0 + 0.5;
    const fProbe = safeEval(probeX);
    const pProbe = evalTaylorPoly(coeffs, x0, probeX);
    const remErr =
      Number.isFinite(fProbe) && Number.isFinite(pProbe)
        ? Math.abs(fProbe - pProbe)
        : NaN;
    const remStr = Number.isFinite(remErr)
      ? remErr < 1e-4 && remErr > 0
        ? remErr.toExponential(2)
        : remErr.toFixed(5)
      : "N/A";

    if (formulaBox) {
      formulaBox.style.display = "block";
      const fCacheKey = `${preset}|${expr}|${x0}|${deg}`;
      if (formulaBox.dataset.fKey !== fCacheKey) {
        formulaBox.dataset.fKey = fCacheKey;
        const polyLatex = formatTaylorPolyLatex(coeffs, x0, deg);
        formulaBox.innerHTML = `<div id="taylor-katex-line" style="color:#f97316; font-weight:700;"></div><div id="taylor-err-line" style="margin-top:4px; font-family:var(--font-mono); font-size:0.78rem; color:var(--text-secondary);"></div>`;
        const kLine = document.getElementById("taylor-katex-line");
        if (kLine && window.katex?.render) {
          window.katex.render(polyLatex, kLine, {
            throwOnError: false,
            displayMode: false,
          });
        } else if (kLine) {
          kLine.textContent = `$${polyLatex}$`;
        }
      }
      const errLine = document.getElementById("taylor-err-line");
      if (errLine) {
        errLine.textContent = `Sai số |f(${formatNum(probeX)}) - P${deg}(${formatNum(probeX)})| ≈ ${remStr}`;
      }
    }

    taylorInfoHtml = `<div style="color:#f97316; margin-top:4px;">• <strong>Đa thức Taylor bậc ${deg} tại x₀ = ${x0}:</strong> Sai số tại <code>x = ${formatNum(probeX)}</code> là <code>|Rₙ(x)| ≈ ${remStr}</code>.</div>`;
  } else if (formulaBox) {
    formulaBox.style.display = "none";
  }

  // 5. Con trỏ thông minh GeoGebra (Crosshair & Tọa độ trực tiếp trên đường cong khi di chuột)
  if (calcViewport.hoverPx !== null && calcViewport.hoverPy !== null) {
    const hx = (calcViewport.hoverPx - originX) / scale;
    const hy = safeEval(hx);
    if (Number.isFinite(hy)) {
      const snapPy = originY - hy * scale;
      const hSlope = (safeEval(hx + h) - safeEval(hx - h)) / (2 * h);

      ctx.strokeStyle = isDark
        ? "rgba(56, 189, 248, 0.45)"
        : "rgba(2, 132, 199, 0.45)";
      ctx.lineWidth = 1.2;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(calcViewport.hoverPx, snapPy);
      ctx.lineTo(calcViewport.hoverPx, originY);
      ctx.moveTo(calcViewport.hoverPx, snapPy);
      ctx.lineTo(originX, snapPy);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(calcViewport.hoverPx, snapPy, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const hudText = `P(${formatNum(hx)}, ${formatNum(hy)})${Number.isFinite(hSlope) ? `  |  f'(x) ≈ ${formatNum(hSlope)}` : ""}`;
      ctx.font = "bold 12px monospace";
      const textW = ctx.measureText(hudText).width;
      ctx.fillStyle = isDark
        ? "rgba(15, 23, 42, 0.9)"
        : "rgba(255, 255, 255, 0.92)";
      ctx.fillRect(10, height - 34, textW + 18, 24);
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1;
      ctx.strokeRect(10, height - 34, textW + 18, 24);
      ctx.fillStyle = isDark ? "#38bdf8" : "#0369a1";
      ctx.fillText(hudText, 19, height - 18);
    }
  }

  // 6. Tính tích phân xác định bằng quy tắc Simpson (chỉ cập nhật DOM khi tham số/miền nhìn đổi)
  if (out) {
    const outCacheKey = `${expr}|${x0}|${a}|${b}|${plottedCount > 0 ? 1 : 0}|${runtimeError || ""}|${showTaylor ? deg + "_" + preset : 0}|${showRiemann ? riemannN + "_" + riemannMethod : 0}`;
    if (out.dataset.cacheKey !== outCacheKey) {
      out.dataset.cacheKey = outCacheKey;
      const n = 200;
      const eps = (b - a) * 1e-6;
      const safeA = Number.isFinite(safeEval(a)) ? a : a + eps;
      const safeB = Number.isFinite(safeEval(b)) ? b : b - eps;
      const step = (safeB - safeA) / n;
      let sum = safeEval(safeA) + safeEval(safeB);
      for (let i = 1; i < n; i++) {
        sum += (i % 2 === 0 ? 2 : 4) * safeEval(safeA + i * step);
      }
      const integral = (step / 3) * sum;

      const riemannBox = document.getElementById("riemann-readout-box");
      let riemannInfoHtml = "";
      if (showRiemann) {
        const dxVal = Math.abs(b - a) / riemannN;
        const absErr =
          Number.isFinite(integral) && Number.isFinite(riemannApproxSum)
            ? Math.abs(integral - riemannApproxSum)
            : NaN;
        const symLabel =
          riemannMethod === "trapezoid" ? `T_${riemannN}` : `S_${riemannN}`;
        const approxStr = Number.isFinite(riemannApproxSum)
          ? riemannApproxSum.toFixed(5)
          : "Không xác định";
        const errStr = Number.isFinite(absErr) ? absErr.toFixed(5) : "N/A";

        if (riemannBox) {
          riemannBox.style.display = "block";
          riemannBox.innerHTML = `Δx = ${formatNum(dxVal)} &nbsp;|&nbsp; <strong style="color:#10b981;">${symLabel} ≈ ${approxStr}</strong> &nbsp;|&nbsp; Sai số |I - ${symLabel}| ≈ <strong>${errStr}</strong>`;
        }
        riemannInfoHtml = `<div style="color:#10b981; margin-top:4px;">• <strong>Tổng xấp xỉ (${riemannMethod}, N = ${riemannN}):</strong> <code>${symLabel} ≈ ${approxStr}</code> (Sai số so với Simpson: <code>${errStr}</code>).</div>`;
      } else if (riemannBox) {
        riemannBox.style.display = "none";
      }

      const intercept = y0 - slope * x0;
      const signStr =
        intercept >= 0
          ? `+ ${formatNum(intercept)}`
          : `- ${formatNum(Math.abs(intercept))}`;
      const domainWarn = runtimeError
        ? `<div style="color:var(--danger); margin-bottom:6px;">Lỗi thực thi hàm số: <code>${runtimeError}</code></div>`
        : plottedCount === 0
          ? `<div style="color:#f59e0b; margin-bottom:6px;">Hàm số không có điểm xác định nào trong vùng nhìn hiện tại (thử bấm <strong>Về gốc O</strong> hoặc kéo khung nhìn sang miền xác định).</div>`
          : "";
      out.innerHTML = `
        ${domainWarn}
        <div style="margin-bottom:6px;">• <strong>Giá trị hàm tại x₀ = ${x0}:</strong> <code>f(${x0}) = ${Number.isFinite(y0) ? formatNum(y0) : "Không xác định"}</code></div>
        <div style="margin-bottom:6px;">• <strong>Đạo hàm &amp; Tiếp tuyến tại x₀:</strong> <code>f'(${x0}) ≈ ${Number.isFinite(slope) ? formatNum(slope) : "N/A"}</code> &nbsp;|&nbsp; Phương trình: <code>y = ${Number.isFinite(slope) ? formatNum(slope) + "x " + signStr : "N/A"}</code></div>
        <div>• <strong>Tích phân xác định ∫<sub>${a}</sub><sup>${b}</sup> f(x)dx (Simpson):</strong> <code>≈ ${Number.isFinite(integral) ? integral.toFixed(5) : "Không xác định"}</code></div>
        ${riemannInfoHtml}
        ${taylorInfoHtml}
      `;
    }
  }

  // 7. Vẽ lớp phủ đa thức Taylor-Maclaurin (n -> ∞) trực tiếp lên frame hiện tại
  if (hasAdvancedTaylor) {
    window.renderTaylorOverlay(ctx, {
      scale,
      originX,
      originY,
      width,
      height,
      expr,
      x0,
    });
  }
}

/* ==========================================================================
   2. PHÂN TÍCH MA TRẬN VUÔNG & CHỮ NHẬT m × n + SÂN KHẤU BIẾN HÌNH 2D
   ========================================================================== */
const mat2DStageState = {
  t: 1,
  animRaf: null,
  lastTickStep: -1,
  hoverWorld: null,
  matrix: [
    [2, 1],
    [0, 1.5],
  ],
};

function ensure2x2MatrixOption() {
  const sizeSelect = document.getElementById("matrix-size");
  if (!sizeSelect) return;
  const has2x2 = Array.from(sizeSelect.options).some(
    (opt) => opt.value === "2x2" || opt.value === "2",
  );
  if (!has2x2) {
    const opt = document.createElement("option");
    opt.value = "2x2";
    opt.textContent = "2 × 2 (Biến đổi 2D & Vector riêng)";
    sizeSelect.insertBefore(opt, sizeSelect.firstChild);
  }
}

function apply2DTransformPreset(type) {
  ensure2x2MatrixOption();
  const sizeSelect = document.getElementById("matrix-size");
  if (sizeSelect) {
    const opt2 = Array.from(sizeSelect.options).find(
      (o) => o.value === "2x2" || o.value === "2",
    );
    if (opt2) sizeSelect.value = opt2.value;
  }
  renderMatrixGrid();

  const presets = {
    stretch: [
      [2, 1],
      [0, 1.5],
    ],
    rotate: [
      [0.707, -0.707],
      [0.707, 0.707],
    ],
    reflect: [
      [0.6, 0.8],
      [0.8, -0.6],
    ],
    singular: [
      [1, 2],
      [0.5, 1],
    ],
  };
  const chosen = presets[type] || presets.stretch;
  document.querySelectorAll(".mat-cell").forEach((inp) => {
    const r = parseInt(inp.dataset.r, 10);
    const c = parseInt(inp.dataset.c, 10);
    if (chosen[r] && chosen[r][c] !== undefined) {
      inp.value = chosen[r][c];
    }
  });

  window.MathLabSound?.soft?.();
  analyzeMatrix();
  play2DMatrixMorph();
}

function on2DMorphSliderInput(val) {
  if (mat2DStageState.animRaf) {
    cancelAnimationFrame(mat2DStageState.animRaf);
    mat2DStageState.animRaf = null;
    const playBtn = document.getElementById("mat2d-play-btn");
    if (playBtn) playBtn.textContent = "▶ Biến hình";
  }
  const pct = Math.max(0, Math.min(100, parseInt(val, 10) || 0));
  mat2DStageState.t = pct / 100;
  const step = Math.floor(pct / 5);
  if (step !== mat2DStageState.lastTickStep) {
    mat2DStageState.lastTickStep = step;
    window.MathLabSound?.tick?.();
  }
  render2DMatrixTransformCanvas();
}

function play2DMatrixMorph() {
  const slider = document.getElementById("mat2d-morph-slider");
  const playBtn = document.getElementById("mat2d-play-btn");
  if (mat2DStageState.animRaf) {
    cancelAnimationFrame(mat2DStageState.animRaf);
    mat2DStageState.animRaf = null;
    if (playBtn) playBtn.textContent = "▶ Biến hình";
    return;
  }

  if (playBtn) playBtn.textContent = "❚❚ Dừng";
  const duration = 1350;
  const startTime = performance.now();

  const stepAnim = (now) => {
    const rawP = Math.min(1, (now - startTime) / duration);
    // Ease-in-out cubic mượt mà
    const eased =
      rawP < 0.5 ? 4 * rawP * rawP * rawP : 1 - Math.pow(-2 * rawP + 2, 3) / 2;
    mat2DStageState.t = eased;
    if (slider) slider.value = String(Math.round(eased * 100));
    render2DMatrixTransformCanvas();

    if (rawP < 1) {
      mat2DStageState.animRaf = requestAnimationFrame(stepAnim);
    } else {
      mat2DStageState.animRaf = null;
      if (playBtn) playBtn.textContent = "▶ Biến hình";
    }
  };
  mat2DStageState.animRaf = requestAnimationFrame(stepAnim);
}

function compute2DEigenData(A) {
  const a = A[0][0],
    b = A[0][1],
    c = A[1][0],
    d = A[1][1];
  const trace = a + d;
  const det = a * d - b * c;
  const disc = trace * trace - 4 * det;

  if (disc < -1e-7) {
    return {
      isReal: false,
      re: trace * 0.5,
      im: Math.sqrt(-disc) * 0.5,
      det,
      trace,
    };
  }

  const sqrtD = Math.sqrt(Math.max(0, disc));
  const l1 = (trace + sqrtD) * 0.5;
  const l2 = (trace - sqrtD) * 0.5;

  const findVec = (lam, fallbackIdx) => {
    const v1x = -b,
      v1y = a - lam;
    const v2x = d - lam,
      v2y = -c;
    const n1 = Math.hypot(v1x, v1y);
    const n2 = Math.hypot(v2x, v2y);
    if (n1 >= n2 && n1 > 1e-7) return { x: v1x / n1, y: v1y / n1 };
    if (n2 > 1e-7) return { x: v2x / n2, y: v2y / n2 };
    return fallbackIdx === 0 ? { x: 1, y: 0 } : { x: 0, y: 1 };
  };

  const pairs = [{ lambda: l1, vec: findVec(l1, 0) }];
  if (Math.abs(l1 - l2) > 1e-6 || (Math.abs(b) < 1e-7 && Math.abs(c) < 1e-7)) {
    pairs.push({ lambda: l2, vec: findVec(l2, 1) });
  }

  return { isReal: true, pairs, det, trace };
}

function render2DMatrixTransformCanvas() {
  const canvas = document.getElementById("mat2d-transform-canvas");
  const infoBar = document.getElementById("mat2d-eigen-readout");
  if (!canvas) return;

  const parentW = canvas.parentElement ? canvas.parentElement.clientWidth : 0;
  const targetW = parentW > 80 ? Math.max(280, parentW - 2) : 520;
  const targetH = 290;
  if (canvas.width !== targetW) canvas.width = targetW;
  if (canvas.height !== targetH) canvas.height = targetH;

  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";

  ctx.fillStyle = isDark ? "#080f1e" : "#f8fafc";
  ctx.fillRect(0, 0, w, h);

  const A = mat2DStageState.matrix;
  const t = mat2DStageState.t;
  const pctLabel = document.getElementById("mat2d-t-label");
  if (pctLabel) pctLabel.textContent = `${Math.round(t * 100)}%`;

  // Nội suy M(t) = (1 - t)I + tA
  const m11 = 1 - t + t * A[0][0];
  const m12 = t * A[0][1];
  const m21 = t * A[1][0];
  const m22 = 1 - t + t * A[1][1];

  const maxCoord = Math.max(
    2.4,
    Math.abs(A[0][0]) + Math.abs(A[0][1]),
    Math.abs(A[1][0]) + Math.abs(A[1][1]),
  );
  const unit = Math.min(54, Math.max(24, Math.min(w, h) / (maxCoord * 2.35)));
  const cx = w * 0.5;
  const cy = h * 0.52;

  const toScreen = (wx, wy) => [cx + wx * unit, cy - wy * unit];
  const mapVec = (gx, gy) => [m11 * gx + m12 * gy, m21 * gx + m22 * gy];

  // 1. Lưới tham chiếu gốc mờ (I)
  const gRange = Math.ceil(Math.max(w, h) / unit) + 2;
  ctx.strokeStyle = isDark
    ? "rgba(71, 85, 105, 0.25)"
    : "rgba(148, 163, 184, 0.35)";
  ctx.lineWidth = 1;
  for (let i = -gRange; i <= gRange; i++) {
    const [x1, y1] = toScreen(i, -gRange);
    const [x2, y2] = toScreen(i, gRange);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    const [x3, y3] = toScreen(-gRange, i);
    const [x4, y4] = toScreen(gRange, i);
    ctx.beginPath();
    ctx.moveTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.stroke();
  }

  // 2. Lưới không gian sau biến đổi M(t)
  ctx.strokeStyle = isDark
    ? "rgba(56, 189, 248, 0.28)"
    : "rgba(37, 99, 235, 0.24)";
  ctx.lineWidth = 1.2;
  const tRange = 7;
  for (let i = -tRange; i <= tRange; i++) {
    const [p1x, p1y] = toScreen(...mapVec(i, -tRange));
    const [p2x, p2y] = toScreen(...mapVec(i, tRange));
    ctx.beginPath();
    ctx.moveTo(p1x, p1y);
    ctx.lineTo(p2x, p2y);
    ctx.stroke();

    const [p3x, p3y] = toScreen(...mapVec(-tRange, i));
    const [p4x, p4y] = toScreen(...mapVec(tRange, i));
    ctx.beginPath();
    ctx.moveTo(p3x, p3y);
    ctx.lineTo(p4x, p4y);
    ctx.stroke();
  }

  // Trục tọa độ chính
  ctx.strokeStyle = isDark
    ? "rgba(148, 163, 184, 0.55)"
    : "rgba(71, 85, 105, 0.5)";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(0, cy);
  ctx.lineTo(w, cy);
  ctx.moveTo(cx, 0);
  ctx.lineTo(cx, h);
  ctx.stroke();

  // 3. Hình bình hành diện tích |det(M(t))|
  const detCur = m11 * m22 - m12 * m21;
  const [oX, oY] = toScreen(0, 0);
  const [e1X, e1Y] = toScreen(...mapVec(1, 0));
  const [e12X, e12Y] = toScreen(...mapVec(1, 1));
  const [e2X, e2Y] = toScreen(...mapVec(0, 1));

  ctx.fillStyle =
    Math.abs(detCur) < 1e-4
      ? "rgba(245, 158, 11, 0.35)"
      : detCur < 0
        ? "rgba(239, 68, 68, 0.24)"
        : "rgba(16, 185, 129, 0.22)";
  ctx.strokeStyle =
    detCur < 0 ? "rgba(239, 68, 68, 0.7)" : "rgba(16, 185, 129, 0.7)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(oX, oY);
  ctx.lineTo(e1X, e1Y);
  ctx.lineTo(e12X, e12Y);
  ctx.lineTo(e2X, e2Y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // 4. Đường tròn đơn vị biến hình thành Elip
  const showCircle =
    document.getElementById("mat2d-show-circle")?.checked ?? true;
  if (showCircle) {
    ctx.strokeStyle = isDark
      ? "rgba(168, 85, 247, 0.8)"
      : "rgba(124, 58, 237, 0.75)";
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    for (let k = 0; k <= 64; k++) {
      const ang = (k / 64) * Math.PI * 2;
      const [sx, sy] = toScreen(...mapVec(Math.cos(ang), Math.sin(ang)));
      if (k === 0) ctx.moveTo(sx, sy);
      else ctx.lineTo(sx, sy);
    }
    ctx.closePath();
    ctx.stroke();
  }

  // 5. Đường phương & Vector riêng (Eigenvectors) bất biến của A
  const eigen = compute2DEigenData(A);
  if (eigen.isReal) {
    eigen.pairs.forEach((pair, idx) => {
      const { x: vx, y: vy } = pair.vec;
      const color = idx === 0 ? "#f59e0b" : "#ec4899";

      // Đường thẳng phương bất biến (Eigenspan)
      const [lx1, ly1] = toScreen(-vx * 12, -vy * 12);
      const [lx2, ly2] = toScreen(vx * 12, vy * 12);
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.45;
      ctx.lineWidth = 1.4;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(lx1, ly1);
      ctx.lineTo(lx2, ly2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;

      // Mũi tên vector riêng sau biến đổi M(t)v
      const scaleCur = 1 - t + t * pair.lambda;
      const [ex, ey] = toScreen(vx * scaleCur, vy * scaleCur);
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(oX, oY);
      ctx.lineTo(ex, ey);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(ex, ey, 4, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // 6. Cặp vector cơ sở T(e1) và T(e2)
  const drawArrow = (tx, ty, color, label) => {
    const ang = Math.atan2(ty - oY, tx - oX);
    const headLen = 9;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2.8;
    ctx.beginPath();
    ctx.moveTo(oX, oY);
    ctx.lineTo(tx, ty);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(
      tx - headLen * Math.cos(ang - Math.PI / 6),
      ty - headLen * Math.sin(ang - Math.PI / 6),
    );
    ctx.lineTo(
      tx - headLen * Math.cos(ang + Math.PI / 6),
      ty - headLen * Math.sin(ang + Math.PI / 6),
    );
    ctx.closePath();
    ctx.fill();

    ctx.font = "bold 11px monospace";
    ctx.fillText(label, tx + 6, ty - 6);
  };

  drawArrow(e1X, e1Y, "#10b981", "T(e₁)");
  drawArrow(e2X, e2Y, "#38bdf8", "T(e₂)");

  // 7. Điểm dò tọa độ khi rê chuột (v -> Av)
  if (mat2DStageState.hoverWorld) {
    const { wx, wy } = mat2DStageState.hoverWorld;
    const [hx, hy] = toScreen(wx, wy);
    const [mx, my] = mapVec(wx, wy);
    const [tx, ty] = toScreen(mx, my);

    ctx.strokeStyle = "rgba(148, 163, 184, 0.65)";
    ctx.lineWidth = 1.2;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(hx, hy);
    ctx.lineTo(tx, ty);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#94a3b8";
    ctx.beginPath();
    ctx.arc(hx, hy, 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.arc(tx, ty, 4.5, 0, Math.PI * 2);
    ctx.fill();

    const hud = `v(${formatNum(wx)}, ${formatNum(wy)}) ↦ (${formatNum(mx)}, ${formatNum(my)})`;
    ctx.font = "bold 11px monospace";
    const tw = ctx.measureText(hud).width;
    ctx.fillStyle = isDark ? "rgba(15,23,42,0.88)" : "rgba(255,255,255,0.92)";
    ctx.fillRect(8, h - 28, tw + 14, 20);
    ctx.fillStyle = isDark ? "#7dd3fc" : "#0369a1";
    ctx.fillText(hud, 15, h - 14);
  }

  if (infoBar) {
    const detStatus =
      Math.abs(eigen.det) < 1e-6
        ? `<span style="color:#f59e0b; font-weight:700;">det(A) = 0 (Suy biến — ép phẳng chiều)</span>`
        : eigen.det < 0
          ? `<span style="color:#ef4444; font-weight:700;">det(A) = ${formatNum(eigen.det)} (Đảo chiều mặt phẳng)</span>`
          : `<span style="color:#10b981; font-weight:700;">det(A) = ${formatNum(eigen.det)} (Diện tích gấp ${formatNum(Math.abs(eigen.det))}×)</span>`;

    const eigenHtml = eigen.isReal
      ? eigen.pairs
          .map(
            (p, idx) =>
              `<span style="color:${idx === 0 ? "#f59e0b" : "#ec4899"}; font-weight:700;">λ${idx + 1} = ${formatNum(p.lambda)}</span> <code>v${idx + 1}≈(${formatNum(p.vec.x)}, ${formatNum(p.vec.y)})</code>`,
          )
          .join(" &nbsp;|&nbsp; ")
      : `<span style="color:#a855f7; font-weight:700;">Trị riêng phức λ = ${formatNum(eigen.re)} ± ${formatNum(eigen.im)}i (Phép quay — không có phương bất biến thực)</span>`;

    infoBar.innerHTML = `<div style="margin-bottom:3px;">${detStatus}</div><div>${eigenHtml}</div>`;
  }
}

function update2DMatrixStage(rows, cols, A) {
  const out = document.getElementById("matrix-output");
  if (!out || !out.parentElement) return;

  let box = document.getElementById("mat2d-stage-box");
  if (!box) {
    box = document.createElement("div");
    box.id = "mat2d-stage-box";
    box.style.cssText =
      "margin-bottom:14px; padding:12px; border-radius:12px; background:var(--bg-surface-alt); border:1px solid var(--border-color);";
    box.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px; margin-bottom:8px;">
        <strong style="color:var(--primary); font-size:0.9rem;">Sân khấu Biến đổi Tuyến tính &amp; Vector riêng 2D</strong>
        <div style="display:flex; gap:4px; flex-wrap:wrap;">
          <button type="button" class="btn btn-sm btn-outline" style="padding:2px 7px; font-size:0.74rem;" onclick="apply2DTransformPreset('stretch')">Kéo giãn</button>
          <button type="button" class="btn btn-sm btn-outline" style="padding:2px 7px; font-size:0.74rem;" onclick="apply2DTransformPreset('rotate')">Quay 45°</button>
          <button type="button" class="btn btn-sm btn-outline" style="padding:2px 7px; font-size:0.74rem;" onclick="apply2DTransformPreset('reflect')">Phản xạ</button>
          <button type="button" class="btn btn-sm btn-outline" style="padding:2px 7px; font-size:0.74rem;" onclick="apply2DTransformPreset('singular')">Suy biến</button>
        </div>
      </div>
      <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:8px; font-size:0.8rem;">
        <span style="font-weight:700; font-family:var(--font-mono);">t = <span id="mat2d-t-label" style="color:var(--primary);">100%</span></span>
        <input type="range" id="mat2d-morph-slider" min="0" max="100" value="100" oninput="on2DMorphSliderInput(this.value)" style="flex:1; min-width:110px;">
        <button type="button" class="btn btn-sm btn-secondary" id="mat2d-play-btn" onclick="play2DMatrixMorph()" style="padding:3px 9px;">▶ Biến hình</button>
        <label style="display:flex; align-items:center; gap:4px; cursor:pointer;">
          <input type="checkbox" id="mat2d-show-circle" checked onchange="render2DMatrixTransformCanvas()">
          <span>Đường tròn đơn vị</span>
        </label>
      </div>
      <div style="border-radius:10px; overflow:hidden; border:1px solid var(--border-color);">
        <canvas id="mat2d-transform-canvas" style="display:block; width:100%; height:290px; cursor:crosshair;"></canvas>
      </div>
      <div id="mat2d-eigen-readout" style="margin-top:8px; font-size:0.82rem; line-height:1.5;"></div>
    `;
    out.parentElement.insertBefore(box, out);

    const cvs = document.getElementById("mat2d-transform-canvas");
    if (cvs) {
      cvs.addEventListener("mousemove", (e) => {
        const rect = cvs.getBoundingClientRect();
        const px =
          ((e.clientX - rect.left) / Math.max(1, rect.width)) * cvs.width;
        const py =
          ((e.clientY - rect.top) / Math.max(1, rect.height)) * cvs.height;
        const m = mat2DStageState.matrix;
        const maxC = Math.max(
          2.4,
          Math.abs(m[0][0]) + Math.abs(m[0][1]),
          Math.abs(m[1][0]) + Math.abs(m[1][1]),
        );
        const unit = Math.min(
          54,
          Math.max(24, Math.min(cvs.width, cvs.height) / (maxC * 2.35)),
        );
        mat2DStageState.hoverWorld = {
          wx: (px - cvs.width * 0.5) / unit,
          wy: (cvs.height * 0.52 - py) / unit,
        };
        render2DMatrixTransformCanvas();
      });
      cvs.addEventListener("mouseleave", () => {
        mat2DStageState.hoverWorld = null;
        render2DMatrixTransformCanvas();
      });
    }
  }

  if (rows === 2 && cols === 2) {
    box.style.display = "block";
    mat2DStageState.matrix = [
      [A[0][0], A[0][1]],
      [A[1][0], A[1][1]],
    ];
    render2DMatrixTransformCanvas();
  } else {
    box.style.display = "none";
  }
}

function initMatrixLabUI() {
  const sizeSelect = document.getElementById("matrix-size");
  const gridContainer = document.getElementById("matrix-input-grid");
  const ctrlSlot = document.getElementById("matrix-custom-controls");
  if (!sizeSelect || !gridContainer) return;

  ensure2x2MatrixOption();

  if (ctrlSlot && !document.getElementById("opt-mat-det")) {
    ctrlSlot.innerHTML = `
      <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:12px;">
        <button type="button" class="btn btn-sm btn-primary" onclick="apply2DTransformPreset('stretch')">Mẫu 2×2 (Biến hình)</button>
        <button type="button" class="btn btn-sm btn-outline" onclick="fillMatrixPreset('sample')">Mẫu giáo trình</button>
        <button type="button" class="btn btn-sm btn-outline" onclick="fillMatrixPreset('random')">Ngẫu nhiên</button>
        <button type="button" class="btn btn-sm btn-outline" onclick="fillMatrixPreset('identity')">Đơn vị / Bậc thang</button>
        <button type="button" class="btn btn-sm btn-outline" onclick="fillMatrixPreset('clear')">Xóa về 0</button>
      </div>
      <div style="padding:10px 12px; margin-bottom:12px; border-radius:10px; background:var(--bg-surface-alt); border:1px solid var(--border-color); font-size:0.84rem;">
        <div style="font-weight:700; margin-bottom:6px;">Tùy chọn kết quả hiển thị:</div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
          <label style="display:flex; align-items:center; gap:6px;"><input type="checkbox" id="opt-mat-det" checked onchange="analyzeMatrix()"> Định thức det(A)</label>
          <label style="display:flex; align-items:center; gap:6px;"><input type="checkbox" id="opt-mat-rank" checked onchange="analyzeMatrix()"> Hạng &amp; Bậc thang REF</label>
          <label style="display:flex; align-items:center; gap:6px;"><input type="checkbox" id="opt-mat-inv" checked onchange="analyzeMatrix()"> Nghịch đảo A⁻¹ &amp; adj(A)</label>
          <label style="display:flex; align-items:center; gap:6px;"><input type="checkbox" id="opt-mat-extra" checked onchange="analyzeMatrix()"> Chuyển vị Aᵀ, Trace &amp; A²</label>
        </div>
      </div>
    `;
  }

  if (gridContainer.dataset.liveBound !== "1") {
    gridContainer.dataset.liveBound = "1";
    gridContainer.addEventListener("input", () => analyzeMatrix());
  }

  renderMatrixGrid();
  analyzeMatrix();
}

function renderMatrixGrid() {
  const val = document.getElementById("matrix-size")?.value || "3x3";
  const [rows, cols] = parseDims(val, 3, 3);
  const container = document.getElementById("matrix-input-grid");
  if (!container) return;

  const sample3x3 = [
    [1, 1, 0],
    [1, 2, 1],
    [0, 1, 2],
  ];
  const sample3x4 = [
    [1, 2, -1, 3],
    [2, 4, 1, 9],
    [3, 6, 0, 12],
  ];

  container.style.display = "grid";
  container.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
  container.style.gap = "8px";

  let html = "";
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let defVal = i === j ? 1 : i < j ? 2 : 0;
      if (rows === 3 && cols === 3) defVal = sample3x3[i][j];
      else if (rows === 3 && cols === 4) defVal = sample3x4[i][j];
      html += `<input type="number" step="any" class="input-control mat-cell" data-r="${i}" data-c="${j}" value="${defVal}" style="text-align:center; padding:8px 4px; font-family:var(--font-mono);">`;
    }
  }
  container.innerHTML = html;
}

function fillMatrixPreset(type) {
  if (type === "sample") {
    renderMatrixGrid();
    analyzeMatrix();
    return;
  }
  document.querySelectorAll(".mat-cell").forEach((inp) => {
    const r = parseInt(inp.dataset.r, 10);
    const c = parseInt(inp.dataset.c, 10);
    if (type === "random") inp.value = Math.floor(Math.random() * 9) - 3;
    else if (type === "identity") inp.value = r === c ? 1 : 0;
    else inp.value = 0;
  });
  analyzeMatrix();
}

function computeDetSquare(M) {
  const n = M.length;
  if (n === 0) return 1;
  if (n === 1) return M[0][0];
  if (n === 2) return M[0][0] * M[1][1] - M[0][1] * M[1][0];
  const U = M.map((r) => [...r]);
  let sign = 1;
  for (let col = 0; col < n; col++) {
    let maxR = col;
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(U[r][col]) > Math.abs(U[maxR][col])) maxR = r;
    }
    if (Math.abs(U[maxR][col]) < 1e-10) return 0;
    if (maxR !== col) {
      [U[col], U[maxR]] = [U[maxR], U[col]];
      sign *= -1;
    }
    for (let r = col + 1; r < n; r++) {
      const f = U[r][col] / U[col][col];
      for (let c = col; c < n; c++) U[r][c] -= f * U[col][c];
    }
  }
  let det = sign;
  for (let i = 0; i < n; i++) det *= U[i][i];
  return Math.abs(det) < 1e-9 ? 0 : det;
}

function computeAdjugate(A) {
  const n = A.length;
  if (n === 1) return [[1]];
  const adj = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const minor = A.filter((_, r) => r !== i).map((row) =>
        row.filter((_, c) => c !== j),
      );
      const cofactor = ((i + j) % 2 === 0 ? 1 : -1) * computeDetSquare(minor);
      adj[j][i] = Math.abs(cofactor) < 1e-9 ? 0 : cofactor;
    }
  }
  return adj;
}

function analyzeMatrix() {
  const val = document.getElementById("matrix-size")?.value || "3x3";
  const [rows, cols] = parseDims(val, 3, 3);
  const out = document.getElementById("matrix-output");
  if (!out) return;

  const cells = document.querySelectorAll(".mat-cell");
  if (cells.length === 0) {
    renderMatrixGrid();
  }

  const A = Array.from({ length: rows }, () => Array(cols).fill(0));
  document.querySelectorAll(".mat-cell").forEach((inp) => {
    const r = parseInt(inp.dataset.r, 10);
    const c = parseInt(inp.dataset.c, 10);
    if (r < rows && c < cols) A[r][c] = parseFloat(inp.value) || 0;
  });

  const isSquare = rows === cols;

  // Khử Gauss đưa A về dạng bậc thang dòng (REF)
  const U = A.map((row) => [...row]);
  let detSign = 1;
  let rank = 0;
  let pivotRow = 0;
  const steps = [];

  for (let col = 0; col < cols && pivotRow < rows; col++) {
    let maxR = pivotRow;
    for (let r = pivotRow + 1; r < rows; r++) {
      if (Math.abs(U[r][col]) > Math.abs(U[maxR][col])) maxR = r;
    }
    if (Math.abs(U[maxR][col]) < 1e-9) continue;

    if (maxR !== pivotRow) {
      [U[pivotRow], U[maxR]] = [U[maxR], U[pivotRow]];
      detSign *= -1;
      steps.push(`d${pivotRow + 1} ↔ d${maxR + 1}`);
    }
    for (let r = pivotRow + 1; r < rows; r++) {
      if (Math.abs(U[r][col]) < 1e-9) continue;
      const factor = U[r][col] / U[pivotRow][col];
      for (let c = col; c < cols; c++) {
        U[r][c] -= factor * U[pivotRow][c];
      }
      steps.push(
        `d${r + 1} → d${r + 1} - (${formatNum(factor)})d${pivotRow + 1}`,
      );
    }
    rank++;
    pivotRow++;
  }

  let det = null;
  if (isSquare) {
    det = detSign;
    for (let i = 0; i < rows; i++) det *= U[i][i];
    if (Math.abs(det) < 1e-9) det = 0;
  }

  const showDet = document.getElementById("opt-mat-det")?.checked ?? true;
  const showRank = document.getElementById("opt-mat-rank")?.checked ?? true;
  const showInv = document.getElementById("opt-mat-inv")?.checked ?? true;
  const showExtra = document.getElementById("opt-mat-extra")?.checked ?? true;

  let html = "";

  if (showDet) {
    if (isSquare) {
      html += `<div style="margin-bottom:8px;">• <strong>Định thức:</strong> <code>det(A) = ${formatNum(det)}</code> ${
        Math.abs(det) < 1e-9
          ? '<span class="badge badge-hard">Suy biến (Không khả nghịch)</span>'
          : '<span class="badge badge-easy">Khả nghịch</span>'
      }</div>`;
    } else {
      html += `<div style="margin-bottom:8px;">• <strong>Định thức:</strong> <span style="color:var(--text-muted);">Không xác định vì A là ma trận chữ nhật (${rows} × ${cols}).</span></div>`;
    }
  }

  if (showRank) {
    html += `<div style="margin-bottom:8px;">• <strong>Hạng ma trận:</strong> <code>rank(A) = ${rank}</code> (kích thước ${rows} × ${cols})</div>`;
    if (steps.length > 0) {
      html += `<div style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:6px;"><em>Biến đổi sơ cấp dòng:</em> ${steps.join(" ; ")}</div>`;
    }
    html += `<div style="margin-bottom:12px;">• <strong>Ma trận bậc thang dòng (REF):</strong><pre style="margin-top:6px; padding:10px; border-radius:8px; background:var(--bg-body); overflow-x:auto;">${formatMatrixText(U)}</pre></div>`;
  }

  if (showInv) {
    if (!isSquare) {
      html += `<div style="margin-bottom:12px;">• <strong>Ma trận nghịch đảo A⁻¹:</strong> <span style="color:var(--text-muted);">Chỉ tồn tại cho ma trận vuông khả nghịch.</span></div>`;
    } else if (Math.abs(det) < 1e-9) {
      html += `<div style="margin-bottom:12px;">• <strong>Ma trận nghịch đảo A⁻¹:</strong> <span style="color:var(--danger); font-weight:600;">Không tồn tại vì det(A) = 0.</span></div>`;
    } else {
      const n = rows;
      const aug = A.map((row, i) => [
        ...row,
        ...Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
      ]);
      for (let i = 0; i < n; i++) {
        let maxR = i;
        for (let r = i + 1; r < n; r++) {
          if (Math.abs(aug[r][i]) > Math.abs(aug[maxR][i])) maxR = r;
        }
        [aug[i], aug[maxR]] = [aug[maxR], aug[i]];
        const piv = aug[i][i];
        for (let c = 0; c < 2 * n; c++) aug[i][c] /= piv;
        for (let r = 0; r < n; r++) {
          if (r === i) continue;
          const f = aug[r][i];
          for (let c = 0; c < 2 * n; c++) aug[r][c] -= f * aug[i][c];
        }
      }
      const invMatrix = aug.map((row) => row.slice(n));
      html += `<div style="margin-bottom:12px;">• <strong>Ma trận nghịch đảo A⁻¹ (Gauss-Jordan):</strong><pre style="margin-top:6px; padding:10px; border-radius:8px; background:var(--bg-body); overflow-x:auto;">${formatMatrixText(invMatrix)}</pre>`;

      if (n <= 4) {
        const adj = computeAdjugate(A);
        html += `<div style="margin-top:8px;">• <strong>Ma trận phụ hợp adj(A) = Cᵀ</strong> (kiểm chứng $A^{-1} = \\frac{1}{${formatNum(det)}}\\text{adj}(A)$):<pre style="margin-top:6px; padding:10px; border-radius:8px; background:var(--bg-body); overflow-x:auto;">${formatMatrixText(adj)}</pre></div>`;
      }
      html += `</div>`;
    }
  }

  if (showExtra) {
    const AT = Array.from({ length: cols }, (_, i) =>
      Array.from({ length: rows }, (_, j) => A[j][i]),
    );
    html += `<div style="margin-bottom:12px;">• <strong>Ma trận chuyển vị Aᵀ (${cols} × ${rows}):</strong><pre style="margin-top:6px; padding:10px; border-radius:8px; background:var(--bg-body); overflow-x:auto;">${formatMatrixText(AT)}</pre></div>`;

    if (isSquare) {
      const n = rows;
      const trace = A.reduce((acc, row, i) => acc + row[i], 0);
      const A2 = Array.from({ length: n }, (_, i) =>
        Array.from({ length: n }, (_, j) =>
          A[i].reduce((acc, _, k) => acc + A[i][k] * A[k][j], 0),
        ),
      );
      html += `
        <div style="margin-bottom:8px;">• <strong>Vết ma trận:</strong> <code>tr(A) = ${formatNum(trace)}</code></div>
        <div>• <strong>Bình phương ma trận A²:</strong><pre style="margin-top:6px; padding:10px; border-radius:8px; background:var(--bg-body); overflow-x:auto;">${formatMatrixText(A2)}</pre></div>
      `;
    }
  }

  if (rows !== 2 || cols !== 2) {
    html =
      `<div style="padding:7px 10px; margin-bottom:10px; border-radius:8px; background:var(--bg-body); border:1px dashed var(--border-color); font-size:0.82rem; color:var(--text-secondary);">Gợi ý: Chọn kích thước <strong>2 × 2</strong> (hoặc bấm <strong>Mẫu 2×2</strong>) để mở <em>Sân khấu Biến đổi Tuyến tính &amp; Vector riêng 2D</em> trực quan.</div>` +
      html;
  }

  update2DMatrixStage(rows, cols, A);
  out.innerHTML =
    html || "<p>Hãy tick chọn ít nhất 1 phép tính ở bảng bên trái.</p>";
  if (typeof renderMath === "function") renderMath(out);
}

/* ==========================================================================
   3. GIẢI HỆ PHƯƠNG TRÌNH TUYẾN TÍNH TỔNG QUÁT m PT × n ẨN (AX = b)
   ========================================================================== */
const gaussStepperState = {
  steps: [],
  currentIdx: 0,
  timer: null,
};

function renderGaussStepView() {
  const host = document.getElementById("gauss-stepper-host");
  if (!host || gaussStepperState.steps.length === 0) return;

  const total = gaussStepperState.steps.length - 1;
  const idx = Math.max(0, Math.min(total, gaussStepperState.currentIdx));
  gaussStepperState.currentIdx = idx;
  const snap = gaussStepperState.steps[idx];

  const badgeEl = document.getElementById("gauss-step-badge");
  const opEl = document.getElementById("gauss-step-op");
  const sliderEl = document.getElementById("gauss-step-slider");
  const tableEl = document.getElementById("gauss-step-matrix");

  if (badgeEl) {
    badgeEl.textContent =
      idx === 0
        ? `Bước 0 / ${total} (Ban đầu)`
        : idx === total
          ? `Bước ${idx} / ${total} (RREF hoàn tất)`
          : `Bước ${idx} / ${total}`;
  }
  if (sliderEl) {
    sliderEl.max = String(total);
    sliderEl.value = String(idx);
  }
  if (opEl) {
    opEl.innerHTML = snap.opHtml;
  }

  if (tableEl) {
    const M = snap.matrix;
    const m = M.length;
    const nCols = M[0]?.length || 0;
    const nVars = nCols - 1;

    let rowsHtml = "";
    for (let r = 0; r < m; r++) {
      const isTarget = snap.targetRow === r;
      const isPivotRow = snap.pivot && snap.pivot.r === r;
      const rowBg = isTarget
        ? "background:rgba(245, 158, 11, 0.14);"
        : isPivotRow
          ? "background:rgba(56, 189, 248, 0.08);"
          : "";

      let cellsHtml = `<td style="padding:5px 7px; font-size:0.74rem; color:var(--text-muted); font-family:var(--font-mono); user-select:none;">d<sub>${r + 1}</sub></td>`;
      for (let c = 0; c < nCols; c++) {
        const isAugCol = c === nVars;
        const isPivotCell =
          snap.pivot && snap.pivot.r === r && snap.pivot.c === c;
        const dividerStyle = isAugCol
          ? "border-left:2px dashed var(--primary); padding-left:12px;"
          : "";
        const pivotStyle = isPivotCell
          ? "background:rgba(14, 165, 233, 0.24); color:var(--primary); font-weight:800; border-radius:6px; box-shadow:inset 0 0 0 1.5px var(--primary);"
          : isAugCol
            ? "font-weight:700;"
            : "";

        cellsHtml += `<td style="padding:5px 9px; text-align:right; font-family:var(--font-mono); font-size:0.86rem; ${dividerStyle} ${pivotStyle}">${formatNum(M[r][c])}</td>`;
      }
      rowsHtml += `<tr style="${rowBg} transition:background 0.18s ease;">${cellsHtml}</tr>`;
    }

    tableEl.innerHTML = `
      <div style="display:inline-block; padding:6px 10px; border-left:2.5px solid var(--text-primary); border-right:2.5px solid var(--text-primary); border-radius:8px; background:var(--bg-surface);">
        <table style="border-collapse:separate; border-spacing:2px 3px;">
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>
    `;
  }
}

function goToGaussStep(idx, playSound = true) {
  if (gaussStepperState.steps.length === 0) return;
  const total = gaussStepperState.steps.length - 1;
  const clamped = Math.max(0, Math.min(total, parseInt(idx, 10) || 0));
  if (clamped !== gaussStepperState.currentIdx && playSound) {
    window.MathLabSound?.tick?.();
  }
  gaussStepperState.currentIdx = clamped;
  renderGaussStepView();
}

function stepGaussElim(delta) {
  if (gaussStepperState.timer) {
    clearInterval(gaussStepperState.timer);
    gaussStepperState.timer = null;
    const btn = document.getElementById("gauss-auto-btn");
    if (btn) btn.textContent = "▶ Tự động tua";
  }
  goToGaussStep(gaussStepperState.currentIdx + delta, true);
}

function toggleGaussAutoPlay() {
  const btn = document.getElementById("gauss-auto-btn");
  if (gaussStepperState.timer) {
    clearInterval(gaussStepperState.timer);
    gaussStepperState.timer = null;
    if (btn) btn.textContent = "▶ Tự động tua";
    return;
  }

  const total = gaussStepperState.steps.length - 1;
  if (total <= 0) return;
  if (gaussStepperState.currentIdx >= total) {
    gaussStepperState.currentIdx = 0;
    renderGaussStepView();
  }

  if (btn) btn.textContent = "❚❚ Dừng tua";
  gaussStepperState.timer = setInterval(() => {
    if (gaussStepperState.currentIdx >= total) {
      clearInterval(gaussStepperState.timer);
      gaussStepperState.timer = null;
      if (btn) btn.textContent = "▶ Tự động tua";
      return;
    }
    goToGaussStep(gaussStepperState.currentIdx + 1, true);
  }, 750);
}

function initSystemLabUI() {
  const sysSelect = document.getElementById("sys-size");
  const gridContainer = document.getElementById("sys-input-grid");
  const presetSlot = document.getElementById("sys-preset-controls");
  if (!sysSelect || !gridContainer) return;

  if (presetSlot && !document.getElementById("sys-presets-bar")) {
    presetSlot.innerHTML = `
      <div id="sys-presets-bar" style="display:flex; flex-wrap:wrap; gap:6px;">
        <button type="button" class="btn btn-sm btn-outline" onclick="loadSystemPreset('unique')">Nghiệm duy nhất</button>
        <button type="button" class="btn btn-sm btn-outline" onclick="loadSystemPreset('infinite')">Vô số nghiệm</button>
        <button type="button" class="btn btn-sm btn-outline" onclick="loadSystemPreset('inconsistent')">Vô nghiệm</button>
        <button type="button" class="btn btn-sm btn-outline" onclick="loadSystemPreset('homogeneous')">Thuần nhất AX = 0</button>
      </div>
    `;
  }

  if (gridContainer.dataset.liveBound !== "1") {
    gridContainer.dataset.liveBound = "1";
    gridContainer.addEventListener("input", () => solveLinearSystem());
  }

  renderSystemGrid();
  solveLinearSystem();
}

function loadSystemPreset(type) {
  const sizeSel = document.getElementById("sys-size");
  if (!sizeSel) return;

  if (type === "unique") {
    sizeSel.value = "3x3";
    renderSystemGrid([
      [1, 1, 1, 6],
      [2, -1, 1, 3],
      [1, 2, -1, 2],
    ]);
  } else if (type === "infinite") {
    sizeSel.value = "3x4";
    renderSystemGrid([
      [1, 2, -1, 1, 4],
      [2, 4, -1, 3, 9],
      [3, 6, -2, 4, 13],
    ]);
  } else if (type === "inconsistent") {
    sizeSel.value = "3x3";
    renderSystemGrid([
      [1, -2, 1, 2],
      [2, -4, 2, 5],
      [1, 1, -1, 1],
    ]);
  } else if (type === "homogeneous") {
    sizeSel.value = "3x4";
    renderSystemGrid([
      [1, -1, 2, -3, 0],
      [2, -2, 5, -4, 0],
      [3, -3, 7, -7, 0],
    ]);
  }
  solveLinearSystem();
}

function renderSystemGrid(customMatrix = null) {
  const val = document.getElementById("sys-size")?.value || "3x3";
  const [m, n] = parseDims(val, 3, 3);
  const container = document.getElementById("sys-input-grid");
  if (!container) return;

  const sample3x3 = [
    [1, 1, 1, 6],
    [2, -1, 1, 3],
    [1, 2, -1, 2],
  ];

  container.style.display = "grid";
  container.style.gridTemplateColumns = `repeat(${n + 1}, minmax(0, 1fr))`;
  container.style.gap = "8px";

  let html = "";
  for (let j = 0; j < n; j++) {
    html += `<div style="text-align:center; font-size:0.78rem; font-weight:700; color:var(--text-secondary);">x<sub>${j + 1}</sub></div>`;
  }
  html += `<div style="text-align:center; font-size:0.78rem; font-weight:800; color:var(--primary);">b</div>`;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j <= n; j++) {
      let cellVal = j === n ? i + 1 : i === j ? 2 : 1;
      if (customMatrix && customMatrix[i] && customMatrix[i][j] !== undefined) {
        cellVal = customMatrix[i][j];
      } else if (!customMatrix && m === 3 && n === 3) {
        cellVal = sample3x3[i][j];
      }
      const borderStyle =
        j === n
          ? "border-left: 3px solid var(--primary); font-weight:700;"
          : "";
      html += `<input type="number" step="any" class="input-control sys-cell" data-r="${i}" data-c="${j}" value="${cellVal}" style="text-align:center; padding:8px 4px; font-family:var(--font-mono); ${borderStyle}">`;
    }
  }
  container.innerHTML = html;
}

function solveLinearSystem() {
  const val = document.getElementById("sys-size")?.value || "3x3";
  const [m, n] = parseDims(val, 3, 3);
  const out = document.getElementById("sys-output");
  if (!out) return;

  if (document.querySelectorAll(".sys-cell").length === 0) {
    renderSystemGrid();
  }

  const orig = Array.from({ length: m }, () => Array(n + 1).fill(0));
  document.querySelectorAll(".sys-cell").forEach((inp) => {
    const r = parseInt(inp.dataset.r, 10);
    const c = parseInt(inp.dataset.c, 10);
    if (r < m && c <= n) orig[r][c] = parseFloat(inp.value) || 0;
  });

  if (gaussStepperState.timer) {
    clearInterval(gaussStepperState.timer);
    gaussStepperState.timer = null;
  }

  // Đưa [A | b] về dạng bậc thang rút gọn (RREF) bằng Gauss-Jordan và lưu từng bước
  const M = orig.map((row) => [...row]);
  const snapshots = [
    {
      matrix: M.map((r) => [...r]),
      opHtml: `<span style="color:var(--text-secondary);">Ma trận mở rộng ban đầu <code>[A | b]</code> trước khi khử</span>`,
      pivot: null,
      targetRow: -1,
    },
  ];

  let row = 0;
  const pivotCols = [];

  for (let col = 0; col < n && row < m; col++) {
    let maxR = row;
    for (let r = row + 1; r < m; r++) {
      if (Math.abs(M[r][col]) > Math.abs(M[maxR][col])) maxR = r;
    }
    if (Math.abs(M[maxR][col]) < 1e-9) continue;

    if (maxR !== row) {
      [M[row], M[maxR]] = [M[maxR], M[row]];
      snapshots.push({
        matrix: M.map((r) => [...r]),
        opHtml: `Đổi chỗ hai hàng: <code>d<sub>${row + 1}</sub> ↔ d<sub>${maxR + 1}</sub></code> (đưa phần tử trụ lên vị trí <code>(${row + 1}, ${col + 1})</code>)`,
        pivot: { r: row, c: col },
        targetRow: row,
      });
    }
    const piv = M[row][col];
    if (Math.abs(piv - 1) > 1e-9) {
      for (let c = col; c <= n; c++) M[row][c] /= piv;
      snapshots.push({
        matrix: M.map((r) => [...r]),
        opHtml: `Chuẩn hóa phần tử trụ về 1: <code>d<sub>${row + 1}</sub> → (1 / ${formatNum(piv)}) · d<sub>${row + 1}</sub></code>`,
        pivot: { r: row, c: col },
        targetRow: row,
      });
    }
    for (let r = 0; r < m; r++) {
      if (r === row || Math.abs(M[r][col]) < 1e-9) continue;
      const f = M[r][col];
      for (let c = col; c <= n; c++) M[r][c] -= f * M[row][c];
      const signOp = f >= 0 ? "-" : "+";
      snapshots.push({
        matrix: M.map((rItem) => [...rItem]),
        opHtml: `Khử cột ${col + 1}: <code>d<sub>${r + 1}</sub> → d<sub>${r + 1}</sub> ${signOp} (${formatNum(Math.abs(f))}) · d<sub>${row + 1}</sub></code>`,
        pivot: { r: row, c: col },
        targetRow: r,
      });
    }
    pivotCols.push(col);
    row++;
  }

  gaussStepperState.steps = snapshots;
  gaussStepperState.currentIdx = snapshots.length - 1;

  const rankA = pivotCols.length;
  let rankAb = rankA;
  for (let r = rankA; r < m; r++) {
    if (Math.abs(M[r][n]) > 1e-7) {
      rankAb = rankA + 1;
      break;
    }
  }

  let html = `
    <div style="margin-bottom:8px;">• <strong>Biện luận hạng (Kronecker–Capelli):</strong> <code>rank(A) = ${rankA}</code>, <code>rank([A|b]) = ${rankAb}</code>, số ẩn <code>n = ${n}</code></div>
  `;

  if (rankA < rankAb) {
    html += `<div style="color:var(--danger); font-weight:700; margin-bottom:10px;">Kết luận: Hệ VÔ NGHIỆM vì rank(A) &lt; rank([A|b]) (xuất hiện phương trình mâu thuẫn 0 = c ≠ 0).</div>`;
  } else if (rankA === n) {
    const solParts = pivotCols.map(
      (col, idx) =>
        `<code>x<sub>${col + 1}</sub> = ${formatNum(M[idx][n])}</code>`,
    );
    html += `
      <div style="color:var(--success); font-weight:700; margin-bottom:6px;">Kết luận: Hệ có NGHIỆM DUY NHẤT (rank(A) = rank([A|b]) = ${n}):</div>
      <div style="font-size:1.02rem; margin-bottom:10px;">${solParts.join(" &nbsp;•&nbsp; ")}</div>
    `;

    if (m === n && n <= 4) {
      const Aonly = orig.map((r) => r.slice(0, n));
      const bCol = orig.map((r) => r[n]);
      const delta = computeDetSquare(Aonly);
      const deltas = [];
      for (let j = 0; j < n; j++) {
        const Aj = Aonly.map((r, ri) =>
          r.map((val, ci) => (ci === j ? bCol[ri] : val)),
        );
        deltas.push(
          `Δ<sub>${j + 1}</sub> = ${formatNum(computeDetSquare(Aj))}`,
        );
      }
      html += `<div style="font-size:0.85rem; padding:8px 10px; border-radius:8px; background:var(--bg-body); margin-bottom:10px;"><strong>Kiểm chứng Cramer:</strong> <code>Δ = ${formatNum(delta)} ≠ 0</code> ; ${deltas.join(", ")}</div>`;
    }
  } else {
    const freeCount = n - rankA;
    const freeCols = [];
    for (let c = 0; c < n; c++) {
      if (!pivotCols.includes(c)) freeCols.push(c);
    }
    const paramNames = freeCols.map((_, idx) =>
      freeCount === 1 ? "t" : `t_${idx + 1}`,
    );

    const formulas = Array(n).fill("");
    freeCols.forEach((col, idx) => {
      formulas[col] =
        `<code>x<sub>${col + 1}</sub> = ${paramNames[idx]}</code> (ẩn tự do)`;
    });

    pivotCols.forEach((pCol, rIdx) => {
      let exprStr = formatNum(M[rIdx][n]);
      let hasTerm = Math.abs(M[rIdx][n]) >= 1e-9;
      freeCols.forEach((fCol, fIdx) => {
        const coeff = -M[rIdx][fCol];
        if (Math.abs(coeff) < 1e-9) return;
        const absC = formatNum(Math.abs(coeff));
        const coefLabel = absC === "1" ? "" : absC;
        if (!hasTerm) {
          exprStr = `${coeff < 0 ? "-" : ""}${coefLabel}${paramNames[fIdx]}`;
          hasTerm = true;
        } else {
          exprStr += ` ${coeff >= 0 ? "+" : "-"} ${coefLabel}${paramNames[fIdx]}`;
        }
      });
      if (!hasTerm) exprStr = "0";
      formulas[pCol] = `<code>x<sub>${pCol + 1}</sub> = ${exprStr}</code>`;
    });

    html += `
      <div style="color:#f59e0b; font-weight:700; margin-bottom:6px;">Kết luận: Hệ có VÔ SỐ NGHIỆM phụ thuộc ${freeCount} ẩn tự do (${paramNames.join(", ")} ∈ ℝ):</div>
      <div style="padding:10px; border-radius:8px; background:var(--bg-body); margin-bottom:10px; line-height:1.7;">
        ${formulas.join("<br>")}
      </div>
    `;
  }

  html += `
    <div id="gauss-stepper-host" style="margin-top:10px; padding:12px; border-radius:12px; background:var(--bg-body); border:1px solid var(--border-color);">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px; margin-bottom:8px;">
        <strong style="color:var(--primary); font-size:0.88rem;">Máy tua Khử Gauss–Jordan từng bước</strong>
        <span id="gauss-step-badge" style="padding:2px 8px; border-radius:6px; background:rgba(14,165,233,0.14); color:var(--primary); font-family:var(--font-mono); font-size:0.76rem; font-weight:700;"></span>
      </div>
      <div style="display:flex; align-items:center; gap:5px; flex-wrap:wrap; margin-bottom:8px;">
        <button type="button" class="btn btn-sm btn-outline" title="Về ma trận ban đầu" onclick="goToGaussStep(0)" style="padding:3px 8px; font-family:var(--font-mono);">|◀</button>
        <button type="button" class="btn btn-sm btn-outline" title="Lùi 1 bước" onclick="stepGaussElim(-1)" style="padding:3px 9px; font-family:var(--font-mono);">◀ Lùi</button>
        <input type="range" id="gauss-step-slider" min="0" max="0" value="0" oninput="goToGaussStep(this.value)" style="flex:1; min-width:90px;">
        <button type="button" class="btn btn-sm btn-outline" title="Tiến 1 bước" onclick="stepGaussElim(1)" style="padding:3px 9px; font-family:var(--font-mono);">Tiến ▶</button>
        <button type="button" class="btn btn-sm btn-outline" title="Đến bước cuối RREF" onclick="goToGaussStep(999)" style="padding:3px 8px; font-family:var(--font-mono);">▶|</button>
        <button type="button" class="btn btn-sm btn-secondary" id="gauss-auto-btn" onclick="toggleGaussAutoPlay()" style="padding:3px 9px;">▶ Tự động tua</button>
      </div>
      <div id="gauss-step-op" style="margin-bottom:8px; padding:6px 10px; border-radius:8px; background:var(--bg-surface-alt); font-size:0.82rem;"></div>
      <div id="gauss-step-matrix" style="overflow-x:auto;"></div>
    </div>
  `;
  out.innerHTML = html;
  renderGaussStepView();
}

/* ==========================================================================
   4. BỘ SINH BÀI TẬP NGẪU NHIÊN THEO TỪNG MỤC LÝ THUYẾT
   ========================================================================== */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSectionExercise(topicId, secIdx) {
  const a = randInt(2, 7);
  const b = randInt(2, 8);
  const k = randInt(2, 6);
  const m = randInt(1, 5);

  const generators = {
    "gt-c1": [
      () => ({
        question: `Tính giới hạn $L = \\lim_{x \\to -\\infty} \\left(\\sqrt{${a * a}x^2 + ${2 * a * b}x - 3} + ${a}x\\right)$.`,
        rubric: [
          {
            step: "Bước 1 (0.4đ)",
            detail: `Nhân liên hợp: $L = \\lim_{x \\to -\\infty} \\frac{${2 * a * b}x - 3}{\\sqrt{${a * a}x^2 + ${2 * a * b}x - 3} - ${a}x}$.`,
          },
          {
            step: "Bước 2 (0.6đ)",
            detail: `Vì $x \\to -\\infty \\Rightarrow \\sqrt{x^2} = -x$, chia tử và mẫu cho $x$: $L = \\frac{${2 * a * b}}{-${a} - ${a}} = -${b}$.`,
          },
        ],
        trap: `Khi $x \\to -\\infty$ thì $\\sqrt{${a * a}x^2} = ${a}|x| = -${a}x$, tuyệt đối không bỏ trị tuyệt đối thành $+${a}x$.`,
      }),
      () => ({
        question: `Dùng vô cùng bé tương đương tính giới hạn: $I = \\lim_{x \\to 0} \\frac{\\ln(1 + ${a * b}x) \\cdot \\sin(${k}x)}{e^{${b}x^2} - 1}$.`,
        rubric: [
          {
            step: "Bước 1 (0.5đ)",
            detail: `Khi $x \\to 0$: $\\ln(1+${a * b}x) \\sim ${a * b}x$, $\\sin(${k}x) \\sim ${k}x$, và $e^{${b}x^2} - 1 \\sim ${b}x^2$.`,
          },
          {
            step: "Bước 2 (0.5đ)",
            detail: `Thay vào tích/thương: $I = \\lim_{x \\to 0} \\frac{${a * b}x \\cdot ${k}x}{${b}x^2} = ${a * k}$.`,
          },
        ],
        trap: "Chỉ thay VCB tương đương trong phép nhân/chia, không thay trong tổng/hiệu.",
      }),
      () => ({
        question: `Tính giới hạn dạng $1^\\infty$: $L = \\lim_{x \\to \\infty} \\left(\\frac{x + ${a}}{x - ${b}}\\right)^{${k}x + 1}$.`,
        rubric: [
          {
            step: "Bước 1 (0.5đ)",
            detail: `Biến đổi: $L = \\lim_{x \\to \\infty} \\left(1 + \\frac{${a + b}}{x - ${b}}\\right)^{\\frac{x-${b}}{${a + b}} \\cdot \\frac{${a + b}(${k}x+1)}{x-${b}}}$.`,
          },
          {
            step: "Bước 2 (0.5đ)",
            detail: `Tính số mũ giới hạn: $\\lim_{x \\to \\infty} \\frac{${(a + b) * k}x + ${a + b}}{x - ${b}} = ${(a + b) * k} \\Rightarrow L = e^{${(a + b) * k}}$.`,
          },
        ],
        trap: "Phải đưa đúng về dạng $(1 + u(x))^{1/u(x)}$ với $u(x) \\to 0$.",
      }),
      () => ({
        question: `Tìm $m$ để hàm số $f(x) = \\begin{cases} \\frac{1 - \\cos(${a}x)}{x^2}, & x \\neq 0 \\\\ ${b}m - 1, & x = 0 \\end{cases}$ liên tục tại $x = 0$.`,
        rubric: [
          {
            step: "Bước 1 (0.5đ)",
            detail: `$\\lim_{x \\to 0} f(x) = \\lim_{x \\to 0} \\frac{\\frac{1}{2}(${a}x)^2}{x^2} = \\frac{${a * a}}{2}$.`,
          },
          {
            step: "Bước 2 (0.5đ)",
            detail: `Liên tục tại $0 \\iff ${b}m - 1 = \\frac{${a * a}}{2} \\iff m = \\frac{${a * a + 2}}{${2 * b}}$.`,
          },
        ],
        trap: "Nhớ $1 - \\cos u \\sim \\frac{u^2}{2}$ chứ không phải $u^2$.",
      }),
      () => ({
        question: `Tìm các đường tiệm cận của đồ thị hàm số $y = \\frac{${a}x^2 - ${b}x + 1}{x - ${m}}$.`,
        rubric: [
          {
            step: "Bước 1 (0.4đ)",
            detail: `TCĐ: $x = ${m}$ vì $\\lim_{x \\to ${m}^\\pm} y = \\pm\\infty$.`,
          },
          {
            step: "Bước 2 (0.6đ)",
            detail: `Chia đa thức: $y = ${a}x + ${a * m - b} + \\frac{${a * m * m - b * m + 1}}{x - ${m}} \\Rightarrow$ TCX: $y = ${a}x ${a * m - b >= 0 ? "+" : ""} ${a * m - b}$.`,
          },
        ],
        trap: "Bậc tử lớn hơn bậc mẫu 1 đơn vị thì không có TCN mà có tiệm cận xiên.",
      }),
    ],
    "gt-c2": [
      () => ({
        question: `Tính đạo hàm cấp 1 của hàm hợp $y = \\ln\\left(x + \\sqrt{x^2 + ${a * a}}\\right)$ tại $x = 0$.`,
        rubric: [
          {
            step: "Bước 1 (0.6đ)",
            detail: `$y' = \\frac{1 + \\frac{x}{\\sqrt{x^2 + ${a * a}}}}{x + \\sqrt{x^2 + ${a * a}}} = \\frac{1}{\\sqrt{x^2 + ${a * a}}}$.`,
          },
          {
            step: "Bước 2 (0.4đ)",
            detail: `Thay $x = 0 \\Rightarrow y'(0) = \\frac{1}{${a}}$.`,
          },
        ],
        trap: "Nhớ nhân thêm $u'(x)$ khi lấy đạo hàm hàm hợp $\\ln(u(x))$.",
      }),
      () => ({
        question: `Cho hàm ẩn $x^2 + ${a}xy + y^3 = ${a + 2}$ xác định $y = y(x)$ quanh điểm $M(1, 1)$. Tính $y'(1)$.`,
        rubric: [
          {
            step: "Bước 1 (0.6đ)",
            detail: `Đạo hàm hai vế theo $x$: $2x + ${a}y + ${a}xy' + 3y^2y' = 0$.`,
          },
          {
            step: "Bước 2 (0.4đ)",
            detail: `Thay $x=1, y=1$: $2 + ${a} + (${a}+3)y'(1) = 0 \\Rightarrow y'(1) = -\\frac{${a + 2}}{${a + 3}}$.`,
          },
        ],
        trap: "Đạo hàm của $xy$ theo $x$ phải dùng quy tắc tích: $y + x y'$.",
      }),
      () => ({
        question: `Dùng quy tắc L'Hospital tính giới hạn: $L = \\lim_{x \\to 0} \\frac{e^{${a}x} - 1 - ${a}x}{x^2}$.`,
        rubric: [
          {
            step: "Bước 1 (0.5đ)",
            detail: `Dạng $\\frac{0}{0}$, áp dụng L'Hospital lần 1: $L = \\lim_{x \\to 0} \\frac{${a}e^{${a}x} - ${a}}{2x}$.`,
          },
          {
            step: "Bước 2 (0.5đ)",
            detail: `Vẫn dạng $\\frac{0}{0}$, L'Hospital lần 2: $L = \\lim_{x \\to 0} \\frac{${a * a}e^{${a}x}}{2} = \\frac{${a * a}}{2}$.`,
          },
        ],
        trap: "Kiểm tra điều kiện dạng vô định trước mỗi lần lấy đạo hàm tử và mẫu.",
      }),
      () => ({
        question: `Viết khai triển Maclaurin đến cấp $3$ của hàm số $f(x) = e^{${a}x} - \\sin(${b}x)$.`,
        rubric: [
          {
            step: "Bước 1 (0.5đ)",
            detail: `$e^{${a}x} = 1 + ${a}x + \\frac{${a * a}}{2}x^2 + \\frac{${a ** 3}}{6}x^3 + o(x^3)$ và $\\sin(${b}x) = ${b}x - \\frac{${b ** 3}}{6}x^3 + o(x^3)$.`,
          },
          {
            step: "Bước 2 (0.5đ)",
            detail: `Trừ hai khai triển: $f(x) = 1 + (${a - b})x + \\frac{${a * a}}{2}x^2 + \\frac{${a ** 3 + b ** 3}}{6}x^3 + o(x^3)$.`,
          },
        ],
        trap: "Đừng quên phần dư Peano $+ o(x^3)$ ở cuối khai triển.",
      }),
      () => ({
        question: `Tìm giá trị lớn nhất và nhỏ nhất của $f(x) = x^3 - ${3 * a * a}x + ${b}$ trên đoạn $[0, ${2 * a}]$.`,
        rubric: [
          {
            step: "Bước 1 (0.5đ)",
            detail: `$f'(x) = 3x^2 - ${3 * a * a} = 0 \\iff x = \\pm ${a}$. Trên $[0, ${2 * a}]$ chọn $x = ${a}$.`,
          },
          {
            step: "Bước 2 (0.5đ)",
            detail: `Tính $f(0) = ${b}$, $f(${a}) = ${b - 2 * a ** 3}$, $f(${2 * a}) = ${b + 2 * a ** 3} \\Rightarrow \\max = ${b + 2 * a ** 3},\\; \\min = ${b - 2 * a ** 3}$.`,
          },
        ],
        trap: "Loại nghiệm tới hạn nằm ngoài đoạn đang xét trước khi so sánh.",
      }),
    ],
    "gt-c3": [
      () => ({
        question: `Tính tích phân bằng phương pháp đổi biến: $I = \\int_0^1 x\\sqrt{x^2 + ${a}}\\,dx$.`,
        rubric: [
          {
            step: "Bước 1 (0.5đ)",
            detail: `Đặt $t = x^2 + ${a} \\Rightarrow dt = 2x\\,dx \\Rightarrow x\\,dx = \\frac{1}{2}dt$. Đổi cận: $x=0 \\Rightarrow t=${a}$, $x=1 \\Rightarrow t=${a + 1}$.`,
          },
          {
            step: "Bước 2 (0.5đ)",
            detail: `$I = \\frac{1}{2}\\int_{${a}}^{${a + 1}} t^{1/2}\\,dt = \\frac{1}{3}\\left(${a + 1}\\sqrt{${a + 1}} - ${a}\\sqrt{${a}}\\right)$.`,
          },
        ],
        trap: "Đổi biến trong tích phân xác định bắt buộc phải đổi cận tương ứng.",
      }),
      () => ({
        question: `Tính tích phân từng phần: $I = \\int_0^1 (${a}x + 1)e^{${b}x}\\,dx$.`,
        rubric: [
          {
            step: "Bước 1 (0.5đ)",
            detail: `Đặt $u = ${a}x + 1 \\Rightarrow du = ${a}\\,dx$; $dv = e^{${b}x}\\,dx \\Rightarrow v = \\frac{1}{${b}}e^{${b}x}$.`,
          },
          {
            step: "Bước 2 (0.5đ)",
            detail: `$I = \\left.\\frac{${a}x+1}{${b}}e^{${b}x}\\right|_0^1 - \\frac{${a}}{${b}}\\int_0^1 e^{${b}x}\\,dx = \\frac{${(a + 1) * b - a}e^{${b}} - ${b - a}}{${b * b}}$.`,
          },
        ],
        trap: "Theo thứ tự LIATE, đặt đa thức làm $u$ và hàm mũ làm $dv$.",
      }),
      () => ({
        question: `Tính tích phân phân thức hữu tỷ: $I = \\int_0^1 \\frac{${a + b}x + ${2 * a + b}}{(x + 1)(x + 2)}\\,dx$.`,
        rubric: [
          {
            step: "Bước 1 (0.5đ)",
            detail: `Phân tích: $\\frac{${a + b}x + ${2 * a + b}}{(x + 1)(x + 2)} = \\frac{${a}}{x + 1} + \\frac{${b}}{x + 2}$.`,
          },
          {
            step: "Bước 2 (0.5đ)",
            detail: `$I = \\Big[${a}\\ln|x+1| + ${b}\\ln|x+2|\\Big]_0^1 = ${a}\\ln 2 + ${b}\\ln\\frac{3}{2}$.`,
          },
        ],
        trap: "Kiểm tra bậc tử nhỏ hơn bậc mẫu trước khi tách phân thức đơn giản.",
      }),
      () => ({
        question: `Tính tích phân lượng giác: $I = \\int_0^{\\pi/2} \\sin^3 x \\cos^{${a}} x\\,dx$.`,
        rubric: [
          {
            step: "Bước 1 (0.5đ)",
            detail: `Tách $\\sin^3 x = (1 - \\cos^2 x)\\sin x$, đặt $t = \\cos x \\Rightarrow dt = -\\sin x\\,dx$. Đổi cận: $0 \\to 1$, $\\pi/2 \\to 0$.`,
          },
          {
            step: "Bước 2 (0.5đ)",
            detail: `$I = \\int_0^1 (1 - t^2)t^{${a}}\\,dt = \\frac{1}{${a + 1}} - \\frac{1}{${a + 3}} = \\frac{2}{${(a + 1) * (a + 3)}}$.`,
          },
        ],
        trap: "Đừng quên dấu trừ của $dt = -\\sin x\\,dx$ khi đảo cận tích phân.",
      }),
      () => ({
        question: `Tính đạo hàm của hàm tích phân cận biến: $F(x) = \\int_1^{x^2} \\frac{\\sin(${a}t)}{t}\\,dt$ ($x > 0$).`,
        rubric: [
          {
            step: "Bước 1 (0.5đ)",
            detail: `Áp dụng công thức Leibniz: $\\left(\\int_a^{u(x)} f(t)\\,dt\\right)' = f(u(x))\\cdot u'(x)$.`,
          },
          {
            step: "Bước 2 (0.5đ)",
            detail: `$F'(x) = \\frac{\\sin(${a}x^2)}{x^2} \\cdot 2x = \\frac{2\\sin(${a}x^2)}{x}$.`,
          },
        ],
        trap: "Rất hay quên nhân thêm đạo hàm của cận trên $(x^2)' = 2x$.",
      }),
    ],
    "gt-c4": [
      () => ({
        question: `Tính tích phân suy rộng loại 1: $I = \\int_0^{+\\infty} ${a}x e^{-${b}x}\\,dx$.`,
        rubric: [
          {
            step: "Bước 1 (0.5đ)",
            detail: `Viết giới hạn $I = \\lim_{A \\to +\\infty} \\int_0^A ${a}x e^{-${b}x}\\,dx$. Tích phân từng phần được $\\left[-\\frac{${a}x}{${b}}e^{-${b}x} - \\frac{${a}}{${b * b}}e^{-${b}x}\\right]_0^A$.`,
          },
          {
            step: "Bước 2 (0.5đ)",
            detail: `Cho $A \\to +\\infty$, các số hạng chứa $A e^{-${b}A} \\to 0 \\Rightarrow I = \\frac{${a}}{${b * b}}$ (hội tụ).`,
          },
        ],
        trap: "Phải trình bày qua $\\lim_{A \\to +\\infty}$, không thay trực tiếp $+\\infty$ vào nguyên hàm.",
      }),
      () => ({
        question: `Khảo sát sự hội tụ của tích phân suy rộng: $J = \\int_1^{+\\infty} \\frac{x + ${a}}{x^{${k}} + ${b}x + 1}\\,dx$ ($k=${k}$).`,
        rubric: [
          {
            step: "Bước 1 (0.5đ)",
            detail: `Khi $x \\to +\\infty$, hàm dưới dấu tích phân $f(x) \\sim \\frac{x}{x^{${k}}} = \\frac{1}{x^{${k - 1}}}$.`,
          },
          {
            step: "Bước 2 (0.5đ)",
            detail: `Vì $\\int_1^{+\\infty} \\frac{dx}{x^{${k - 1}}}$ có $\\alpha = ${k - 1} > 1$ nên tích phân $J$ hội tụ.`,
          },
        ],
        trap: "Phải chỉ rõ hàm $f(x) > 0$ trên $[1, +\\infty)$ trước khi dùng tiêu chuẩn so sánh.",
      }),
      () => ({
        question: `Tính tích phân suy rộng loại 2: $K = \\int_0^{${a}} \\frac{dx}{\\sqrt{${a} - x}}$.`,
        rubric: [
          {
            step: "Bước 1 (0.5đ)",
            detail: `Điểm bất thường tại $x = ${a}$: $K = \\lim_{\\varepsilon \\to 0^+} \\int_0^{${a}-\\varepsilon} (${a}-x)^{-1/2}\\,dx$.`,
          },
          {
            step: "Bước 2 (0.5đ)",
            detail: `$K = \\lim_{\\varepsilon \\to 0^+} \\left[-2\\sqrt{${a}-x}\\right]_0^{${a}-\\varepsilon} = 2\\sqrt{${a}}$ (hội tụ).`,
          },
        ],
        trap: "Nhận diện đúng điểm gián đoạn vô cực tại cận trên $x = ${a}$.",
      }),
      () => ({
        question: `Tính diện tích hình phẳng giới hạn bởi $y = x^2$ và đường thẳng $y = ${a}x$.`,
        rubric: [
          {
            step: "Bước 1 (0.4đ)",
            detail: `Hoành độ giao điểm: $x^2 = ${a}x \\iff x = 0$ hoặc $x = ${a}$.`,
          },
          {
            step: "Bước 2 (0.6đ)",
            detail: `$S = \\int_0^{${a}} (${a}x - x^2)\\,dx = \\left[\\frac{${a}x^2}{2} - \\frac{x^3}{3}\\right]_0^{${a}} = \\frac{${a ** 3}}{6}$.`,
          },
        ],
        trap: "Diện tích luôn không âm, nhớ đặt trị tuyệt đối $|f(x) - g(x)|$.",
      }),
      () => ({
        question: `Tính thể tích vật thể tròn xoay khi quay miền $y = \\sqrt{${a}x}$, $y = 0$, $x = ${b}$ quanh trục $Ox$.`,
        rubric: [
          {
            step: "Bước 1 (0.4đ)",
            detail: `Áp dụng công thức đĩa tròn: $V_x = \\pi \\int_0^{${b}} [f(x)]^2\\,dx$.`,
          },
          {
            step: "Bước 2 (0.6đ)",
            detail: `$V_x = \\pi \\int_0^{${b}} ${a}x\\,dx = \\pi \\left.\\frac{${a}x^2}{2}\\right|_0^{${b}} = \\frac{${a * b * b}\\pi}{2}$.`,
          },
        ],
        trap: "Rất nhiều sinh viên quên nhân hệ số $\\pi$ trước tích phân thể tích.",
      }),
    ],
    "dstt-c5": [
      () => ({
        question: `Cho $A = \\begin{pmatrix} 1 & ${a} \\\\ -1 & 2 \\end{pmatrix}$ và $B = \\begin{pmatrix} ${b} & 0 \\\\ 1 & -2 \\end{pmatrix}$. Tính $AB - BA$.`,
        rubric: [
          {
            step: "Bước 1 (0.5đ)",
            detail: `$AB = \\begin{pmatrix} ${b + a} & ${-2 * a} \\\\ ${-b + 2} & -4 \\end{pmatrix}$ và $BA = \\begin{pmatrix} ${b} & ${a * b} \\\\ 3 & ${a - 4} \\end{pmatrix}$.`,
          },
          {
            step: "Bước 2 (0.5đ)",
            detail: `$AB - BA = \\begin{pmatrix} ${a} & ${-2 * a - a * b} \\\\ ${-b - 1} & ${-a} \\end{pmatrix}$.`,
          },
        ],
        trap: "Phép nhân ma trận không có tính giao hoán ($AB \\neq BA$).",
      }),
      () => ({
        question: `Tính định thức cấp 3: $D = \\begin{vmatrix} 1 & 2 & ${a} \\\\ 0 & ${b} & 1 \\\\ 2 & 4 & ${2 * a + 3} \\end{vmatrix}$.`,
        rubric: [
          {
            step: "Bước 1 (0.5đ)",
            detail: `Biến đổi hàng $h_3 \\leftarrow h_3 - 2h_1$: $D = \\begin{vmatrix} 1 & 2 & ${a} \\\\ 0 & ${b} & 1 \\\\ 0 & 0 & 3 \\end{vmatrix}$.`,
          },
          {
            step: "Bước 2 (0.5đ)",
            detail: `Ma trận tam giác trên nên $D = 1 \\cdot ${b} \\cdot 3 = ${3 * b}$.`,
          },
        ],
        trap: "Phép cộng bội một hàng vào hàng khác không làm đổi giá trị định thức.",
      }),
      () => ({
        question: `Tìm $m$ để ma trận $A = \\begin{pmatrix} 1 & 2 & 3 \\\\ 2 & m & 6 \\\\ -1 & 1 & ${a} \\end{pmatrix}$ khả nghịch.`,
        rubric: [
          {
            step: "Bước 1 (0.6đ)",
            detail: `Biến đổi $h_2 \\leftarrow h_2 - 2h_1, h_3 \\leftarrow h_3 + h_1$: $\\det(A) = \\begin{vmatrix} 1 & 2 & 3 \\\\ 0 & m-4 & 0 \\\\ 0 & 3 & ${a + 3} \\end{vmatrix} = (m - 4)(${a + 3})$.`,
          },
          {
            step: "Bước 2 (0.4đ)",
            detail: `$A$ khả nghịch $\\iff \\det(A) \\neq 0 \\iff m \\neq 4$.`,
          },
        ],
        trap: "Ma trận vuông khả nghịch khi và chỉ khi định thức của nó khác $0$.",
      }),
      () => ({
        question: `Tìm ma trận nghịch đảo của $A = \\begin{pmatrix} ${a} & ${a - 1} \\\\ 1 & 1 \\end{pmatrix}$.`,
        rubric: [
          {
            step: "Bước 1 (0.4đ)",
            detail: `$\\det(A) = ${a}\\cdot 1 - (${a - 1})\\cdot 1 = 1 \\neq 0 \\Rightarrow A$ khả nghịch.`,
          },
          {
            step: "Bước 2 (0.6đ)",
            detail: `$A^{-1} = \\frac{1}{\\det A}\\begin{pmatrix} 1 & -${a - 1} \\\\ -1 & ${a} \\end{pmatrix} = \\begin{pmatrix} 1 & ${1 - a} \\\\ -1 & ${a} \\end{pmatrix}$.`,
          },
        ],
        trap: "Đổi chỗ hai phần tử đường chéo chính và đổi dấu đường chéo phụ.",
      }),
      () => ({
        question: `Tìm hạng của ma trận $A = \\begin{pmatrix} 1 & 2 & -1 & ${a} \\\\ 2 & 4 & -2 & ${2 * a} \\\\ 1 & 3 & 0 & ${a + 1} \\end{pmatrix}$.`,
        rubric: [
          {
            step: "Bước 1 (0.6đ)",
            detail: `Khử Gauss: $h_2 \\leftarrow h_2 - 2h_1$ (ra hàng $0$), $h_3 \\leftarrow h_3 - h_1 = (0, 1, 1, 1)$.`,
          },
          {
            step: "Bước 2 (0.4đ)",
            detail: `Dạng bậc thang có $2$ hàng khác không $\\Rightarrow \\text{rank}(A) = 2$.`,
          },
        ],
        trap: "Phải đưa về dạng bậc thang chuẩn trước khi đếm số hàng khác không.",
      }),
    ],
    "dstt-c6": [
      () => ({
        question: `Giải hệ Cramer: $\\begin{cases} ${a}x + y = ${2 * a + 1} \\\\ x + 2y = 4 \\end{cases}$.`,
        rubric: [
          {
            step: "Bước 1 (0.5đ)",
            detail: `$D = \\begin{vmatrix} ${a} & 1 \\\\ 1 & 2 \\end{vmatrix} = ${2 * a - 1} \\neq 0$; $D_x = \\begin{vmatrix} ${2 * a + 1} & 1 \\\\ 4 & 2 \\end{vmatrix} = ${4 * a - 2}$; $D_y = \\begin{vmatrix} ${a} & ${2 * a + 1} \\\\ 1 & 4 \\end{vmatrix} = ${2 * a - 1}$.`,
          },
          {
            step: "Bước 2 (0.5đ)",
            detail: `$x = \\frac{D_x}{D} = 2,\\; y = \\frac{D_y}{D} = 1$.`,
          },
        ],
        trap: "Quy tắc Cramer chỉ dùng khi hệ vuông và $D \\neq 0$.",
      }),
      () => ({
        question: `Giải hệ phương trình bằng khử Gauss: $\\begin{cases} x + y + z = ${a + 3} \\\\ 2x + 3y + z = ${2 * a + 5} \\\\ x + 2y + 2z = ${2 * a + 4} \\end{cases}$.`,
        rubric: [
          {
            step: "Bước 1 (0.5đ)",
            detail: `Khử cột 1: $h_2 \\leftarrow h_2 - 2h_1$, $h_3 \\leftarrow h_3 - h_1$ thu được hệ tam giác với $y - z = -1$ và $y + z = ${a + 1}$.`,
          },
          {
            step: "Bước 2 (0.5đ)",
            detail: `Thế ngược từ dưới lên: $z = ${a / 2 === Math.floor(a / 2) ? a / 2 + 1 : `\\frac{${a + 2}}{2}`}$, tìm được nghiệm duy nhất $(x, y, z)$.`,
          },
        ],
        trap: "Biến đổi trên toàn bộ hàng của ma trận mở rộng $[A \\mid b]$.",
      }),
      () => ({
        question: `Tìm $m$ để hệ sau có vô số nghiệm: $\\begin{cases} x + 2y - z = 1 \\\\ 2x + 4y + (m - 3)z = 2 \\end{cases}$.`,
        rubric: [
          {
            step: "Bước 1 (0.5đ)",
            detail: `Lấy $h_2 \\leftarrow h_2 - 2h_1$ được phương trình $(m - 1)z = 0$.`,
          },
          {
            step: "Bước 2 (0.5đ)",
            detail: `Với mọi $m \\neq 1$ thì $z = 0$, $y = t \\in \\mathbb{R}$, $x = 1 - 2t$ (hệ luôn có vô số nghiệm 1 tham số; nếu $m=1$ có vô số nghiệm 2 tham số).`,
          },
        ],
        trap: "So sánh $\\text{rank}(A)$ và $\\text{rank}(\\overline{A})$ theo định lý Kronecker-Capelli.",
      }),
      () => ({
        question: `Tìm số chiều và một cơ sở của không gian nghiệm hệ thuần nhất: $\\begin{cases} x_1 + ${a}x_2 - x_3 + 2x_4 = 0 \\\\ 2x_1 + ${2 * a}x_2 - x_3 + 5x_4 = 0 \\end{cases}$.`,
        rubric: [
          {
            step: "Bước 1 (0.5đ)",
            detail: `Lấy $h_2 \\leftarrow h_2 - 2h_1 \\Rightarrow x_3 + x_4 = 0 \\iff x_3 = -x_4$. Đặt ẩn tự do $x_2 = s, x_4 = t$.`,
          },
          {
            step: "Bước 2 (0.5đ)",
            detail: `$x_1 = -${a}s - 3t \\Rightarrow \\dim W = 2$, cơ sở $\\{(-${a}, 1, 0, 0), (-3, 0, -1, 1)\\}$.`,
          },
        ],
        trap: "Số chiều không gian nghiệm thuần nhất bằng $n - \\text{rank}(A)$.",
      }),
      () => ({
        question: `Cho hệ $AX = b$ có $3$ phương trình, $4$ ẩn và $\\text{rank}(A) = \\text{rank}(\\overline{A}) = 3$. Hỏi nghiệm tổng quát phụ thuộc bao nhiêu tham số tự do?`,
        rubric: [
          {
            step: "Bước 1 (0.5đ)",
            detail: `Vì $\\text{rank}(A) = \\text{rank}(\\overline{A}) = 3 < 4$ nên hệ có vô số nghiệm.`,
          },
          {
            step: "Bước 2 (0.5đ)",
            detail: `Số ẩn tự do là $n - r = 4 - 3 = 1$ tham số tự do.`,
          },
        ],
        trap: "Nhớ phân biệt $n$ (số cột của $A$) với $m$ (số hàng).",
      }),
    ],
    "dstt-c7": [
      () => ({
        question: `Trong $\\mathbb{R}^3$, xét tập $W = \\{(x, y, z) \\in \\mathbb{R}^3 : x - ${a}y + ${b}z = 0\\}$. Chứng minh $W$ là không gian con của $\\mathbb{R}^3$ và tìm $\\dim W$.`,
        rubric: [
          {
            step: "Bước 1 (0.6đ)",
            detail: `Kiểm tra $\\vec{0} \\in W$ ($0 - 0 + 0 = 0$) và $\\forall u, v \\in W, \\alpha, \\beta \\in \\mathbb{R} \\Rightarrow \\alpha u + \\beta v \\in W$.`,
          },
          {
            step: "Bước 2 (0.4đ)",
            detail: `$x = ${a}y - ${b}z \\Rightarrow W = \\text{span}\\{(${a}, 1, 0), (-${b}, 0, 1)\\} \\Rightarrow \\dim W = 2$.`,
          },
        ],
        trap: "Nếu vế phải khác $0$ (VD $= 1$) thì không chứa $\\vec{0}$ nên không là không gian con.",
      }),
      () => ({
        question: `Tìm $m$ để hệ vector $u_1 = (1, 2, -1)$, $u_2 = (2, 5, 0)$, $u_3 = (3, 7, m)$ độc lập tuyến tính trong $\\mathbb{R}^3$.`,
        rubric: [
          {
            step: "Bước 1 (0.6đ)",
            detail: `Lập định thức ma trận tạo bởi 3 vector: $D = \\begin{vmatrix} 1 & 2 & -1 \\\\ 2 & 5 & 0 \\\\ 3 & 7 & m \\end{vmatrix} = m + 1$.`,
          },
          {
            step: "Bước 2 (0.4đ)",
            detail: `Hệ ĐLTT $\\iff D \\neq 0 \\iff m \\neq -1$.`,
          },
        ],
        trap: "$n$ vector trong $\\mathbb{R}^n$ ĐLTT khi và chỉ khi định thức của chúng khác $0$.",
      }),
      () => ({
        question: `Trong $\\mathbb{R}^2$, tìm tọa độ của vector $v = (${a + 2}, ${b + 1})$ đối với cơ sở $B = \\{u_1 = (1, 1), u_2 = (2, 1)\\}$.`,
        rubric: [
          {
            step: "Bước 1 (0.5đ)",
            detail: `Giải $x_1(1, 1) + x_2(2, 1) = (${a + 2}, ${b + 1}) \\iff \\begin{cases} x_1 + 2x_2 = ${a + 2} \\\\ x_1 + x_2 = ${b + 1} \\end{cases}$.`,
          },
          {
            step: "Bước 2 (0.5đ)",
            detail: `Trừ hai phương trình: $x_2 = ${a - b + 1},\\; x_1 = ${2 * b - a} \\Rightarrow [v]_B = \\begin{pmatrix} ${2 * b - a} \\\\ ${a - b + 1} \\end{pmatrix}$.`,
          },
        ],
        trap: "Tọa độ của vector phải viết theo đúng thứ tự các vector trong cơ sở $B$.",
      }),
      () => ({
        question: `Cho ánh xạ tuyến tính $f: \\mathbb{R}^3 \\to \\mathbb{R}^2$ xác định bởi $f(x, y, z) = (x + ${a}y - z,\\; 2x + ${2 * a}y - 2z)$. Tìm $\\dim(\\ker f)$ và $\\dim(\\text{Im } f)$.`,
        rubric: [
          {
            step: "Bước 1 (0.5đ)",
            detail: `Ma trận chính tắc $A = \\begin{pmatrix} 1 & ${a} & -1 \\\\ 2 & ${2 * a} & -2 \\end{pmatrix}$ có $\\text{rank}(A) = 1 \\Rightarrow \\dim(\\text{Im } f) = 1$.`,
          },
          {
            step: "Bước 2 (0.5đ)",
            detail: `Theo định lý số chiều: $\\dim(\\ker f) = 3 - \\dim(\\text{Im } f) = 3 - 1 = 2$.`,
          },
        ],
        trap: "Luôn nhớ công thức $\\dim(\\ker f) + \\dim(\\text{Im } f) = \\dim V$.",
      }),
      () => ({
        question: `Trong không gian Euclide $\\mathbb{R}^3$ với tích vô hướng chính tắc, trực giao hóa Gram-Schmidt hai vector $u_1 = (1, 1, 0)$ và $u_2 = (${a}, 0, ${b})$.`,
        rubric: [
          {
            step: "Bước 1 (0.4đ)",
            detail: `Chọn $v_1 = u_1 = (1, 1, 0)$, có $\\|v_1\\|^2 = 2$.`,
          },
          {
            step: "Bước 2 (0.6đ)",
            detail: `$v_2 = u_2 - \\frac{\\langle u_2, v_1 \\rangle}{\\|v_1\\|^2}v_1 = (${a}, 0, ${b}) - \\frac{${a}}{2}(1, 1, 0) = \\left(\\frac{${a}}{2}, -\\frac{${a}}{2}, ${b}\\right)$.`,
          },
        ],
        trap: "Kiểm tra lại $\\langle v_1, v_2 \\rangle = 0$ sau khi tính xong.",
      }),
    ],
  };

  const chapterList = generators[topicId];
  if (chapterList && chapterList.length > 0) {
    return chapterList[secIdx % chapterList.length]();
  }

  return {
    question: `Bài luyện tập mở rộng (Mục ${secIdx + 1}): Cho tham số $a = ${a}, b = ${b}$. Hãy thiết lập biểu thức chuẩn và giải bài toán biến thiên tương ứng với nội dung Mục ${secIdx + 1}.`,
    rubric: [
      {
        step: "Bước 1 (0.5đ)",
        detail: `Thay $a = ${a}, b = ${b}$ vào công thức định nghĩa của Mục ${secIdx + 1} và kiểm tra điều kiện xác định.`,
      },
      {
        step: "Bước 2 (0.5đ)",
        detail: `Biến đổi tương đương theo quy tắc chuẩn giáo trình và kết luận.`,
      },
    ],
    trap: "Trình bày đầy đủ điều kiện xác định trước khi biến đổi.",
  };
}

function exposeMathLabGlobals() {
  if (!window.evalRealFn) window.evalRealFn = evalRealFn;
  if (!window.runCalculusLab) window.runCalculusLab = runCalculusLab;
  window.setCalcPreset = setCalcPreset;
  window.onCalcFuncInput = onCalcFuncInput;
  window.onTaylorPresetChange = onTaylorPresetChange;
  window.toggleTaylorAnimation = toggleTaylorAnimation;
  window.insertCalcLatex = insertCalcLatex;
  window.zoomCalculusLab = zoomCalculusLab;
  window.resetCalculusViewport = resetCalculusViewport;
  window.exportCalculusPNG = exportCalculusPNG;
  window.switchCalcViewMode = switchCalcViewMode;
  window.initGraphLabUI = initGraphLabUI;
  window.apply2DTransformPreset = apply2DTransformPreset;
  window.on2DMorphSliderInput = on2DMorphSliderInput;
  window.play2DMatrixMorph = play2DMatrixMorph;
  window.render2DMatrixTransformCanvas = render2DMatrixTransformCanvas;
  window.goToGaussStep = goToGaussStep;
  window.stepGaussElim = stepGaussElim;
  window.toggleGaussAutoPlay = toggleGaussAutoPlay;
  window.onRiemannInput = onRiemannInput;
  window.stepRiemannN = stepRiemannN;
  window.toggleRiemannAnimation = toggleRiemannAnimation;
}

exposeMathLabGlobals();

document.addEventListener("DOMContentLoaded", () => {
  exposeMathLabGlobals();
  initGraphLabUI();
  initMatrixLabUI();
  initSystemLabUI();

  const canvas = document.getElementById("calc-canvas");
  if (canvas && typeof ResizeObserver !== "undefined" && canvas.parentElement) {
    const ro = new ResizeObserver(() => {
      if (canvas.offsetParent !== null) {
        runCalculusLab();
      }
    });
    ro.observe(canvas.parentElement);
  }
});

window.addEventListener("load", () => {
  exposeMathLabGlobals();
  initGraphLabUI();
  runCalculusLab();
});
