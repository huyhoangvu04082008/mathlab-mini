/* ==========================================================================
   FILE: js/math-tools.js
   MÔ TẢ: Công cụ tính toán & trực quan hóa Toán cao cấp tương tác:
          1. Vẽ đồ thị hàm số f(x), tiếp tuyến tại x0 và tính tích phân [a, b]
          2. Phân tích Ma trận (Định thức, Hạng, Chuyển vị, Nghịch đảo)
          3. Giải Hệ phương trình tuyến tính AX = b theo định lý Kronecker-Capelli
   ========================================================================== */

/**
 * Hàm phân tích và tính giá trị biểu thức toán học f(x) an toàn
 * Hỗ trợ các hàm quen thuộc: sin, cos, tan, sqrt, abs, ln, log, exp, pi, e, lũy thừa ^
 */
function evalMathExpr(expr, xVal) {
  try {
    let cleaned = expr
      .toLowerCase()
      .replace(/\s+/g, "")
      // Chuyển ký hiệu lũy thừa ^ thành ** của JavaScript
      .replace(/\^/g, "**")
      // Hỗ trợ nhân tắt kiểu 2x -> 2*x hoặc 3(x+1) -> 3*(x+1)
      .replace(/(\d)(x)/g, "$1*$2")
      .replace(/(\d)\(/g, "$1*(")
      .replace(/\)\(/g, ")*(")
      // Ánh xạ các hàm toán học sang đối tượng Math của JS
      .replace(/\bsin\b/g, "Math.sin")
      .replace(/\bcos\b/g, "Math.cos")
      .replace(/\btan\b/g, "Math.tan")
      .replace(/\bsqrt\b/g, "Math.sqrt")
      .replace(/\babs\b/g, "Math.abs")
      .replace(/\bln\b/g, "Math.log")
      .replace(/\blog\b/g, "Math.log10")
      .replace(/\bexp\b/g, "Math.exp")
      .replace(/\bpi\b/g, "Math.PI")
      .replace(/\be\b/g, "Math.E");

    // Tạo hàm thực thi động với tham số đầu vào là x
    const fn = new Function("x", `return ${cleaned};`);
    const result = fn(xVal);
    return Number.isFinite(result) ? result : NaN;
  } catch (err) {
    return NaN;
  }
}

/* ==========================================================================
   CÔNG CỤ 1: VẼ ĐỒ THỊ HÀM SỐ, TIẾP TUYẾN & TÍNH TÍCH PHÂN XÁC ĐỊNH (CANVAS)
   ========================================================================== */
function setCalcPreset(expr, x0, a, b) {
  const fInput = document.getElementById("calc-func");
  const x0Input = document.getElementById("calc-x0");
  const aInput = document.getElementById("calc-a");
  const bInput = document.getElementById("calc-b");
  if (!fInput) return;

  fInput.value = expr;
  x0Input.value = x0;
  aInput.value = a;
  bInput.value = b;
  runCalculusLab();
}

function runCalculusLab() {
  const canvas = document.getElementById("calc-canvas");
  const output = document.getElementById("calc-output");
  if (!canvas || !output) return;

  const expr = document.getElementById("calc-func").value.trim() || "x^3 - 3*x";
  const x0 = parseFloat(document.getElementById("calc-x0").value) || 0;
  const a = parseFloat(document.getElementById("calc-a").value) || 0;
  const b = parseFloat(document.getElementById("calc-b").value) || 2;

  // Kiểm tra tính hợp lệ của biểu thức tại x0
  const y0 = evalMathExpr(expr, x0);
  if (Number.isNaN(y0)) {
    output.innerHTML = `<span style="color: var(--danger); font-weight: 700;">Lỗi cú pháp hàm số!</span> Hãy thử nhập dạng: <code>x^3 - 3*x</code>, <code>sin(x) + 0.5*x</code>, <code>exp(-0.3*x)*cos(2*x)</code>.`;
    return;
  }

  // 1. Tính đạo hàm gần đúng bằng sai phân trung tâm: f'(x0) ≈ [f(x0+h) - f(x0-h)] / (2h)
  const h = 1e-5;
  const dfx0 =
    (evalMathExpr(expr, x0 + h) - evalMathExpr(expr, x0 - h)) / (2 * h);
  const intercept = y0 - dfx0 * x0; // Hệ số tự do b của tiếp tuyến y = k*x + b

  // 2. Tính tích phân xác định trên [a, b] bằng quy tắc Simpson mở rộng (n = 200 đoạn)
  const n = 200;
  const step = (b - a) / n;
  let sum = evalMathExpr(expr, a) + evalMathExpr(expr, b);
  for (let i = 1; i < n; i++) {
    const xi = a + i * step;
    const yi = evalMathExpr(expr, xi);
    if (!Number.isNaN(yi)) {
      sum += (i % 2 === 0 ? 2 : 4) * yi;
    }
  }
  const integralVal = (step / 3) * sum;

  // 3. Vẽ đồ thị lên thẻ <canvas>
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  // Nền tối chuẩn phòng thí nghiệm
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, W, H);

  // Hệ tọa độ toán học: x ∈ [-5, 5], y ∈ [-4, 4]
  const xMin = -5,
    xMax = 5;
  const yMin = -4,
    yMax = 4;
  const toCanvasX = (x) => ((x - xMin) / (xMax - xMin)) * W;
  const toCanvasY = (y) => H - ((y - yMin) / (yMax - yMin)) * H;

  // Vẽ lưới tọa độ
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 1;
  for (let gx = Math.ceil(xMin); gx <= xMax; gx++) {
    const px = toCanvasX(gx);
    ctx.beginPath();
    ctx.moveTo(px, 0);
    ctx.lineTo(px, H);
    ctx.stroke();
  }
  for (let gy = Math.ceil(yMin); gy <= yMax; gy++) {
    const py = toCanvasY(gy);
    ctx.beginPath();
    ctx.moveTo(0, py);
    ctx.lineTo(W, py);
    ctx.stroke();
  }

  // Vẽ trục Ox và Oy
  const originX = toCanvasX(0);
  const originY = toCanvasY(0);
  ctx.strokeStyle = "#64748b";
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(0, originY);
  ctx.lineTo(W, originY);
  ctx.moveTo(originX, 0);
  ctx.lineTo(originX, H);
  ctx.stroke();

  // Tô màu miền tích phân xác định từ a đến b
  const leftBound = Math.max(xMin, Math.min(a, b));
  const rightBound = Math.min(xMax, Math.max(a, b));
  if (rightBound > leftBound) {
    ctx.fillStyle = "rgba(56, 189, 248, 0.25)";
    ctx.beginPath();
    ctx.moveTo(toCanvasX(leftBound), originY);
    for (let x = leftBound; x <= rightBound; x += 0.03) {
      const y = evalMathExpr(expr, x);
      if (!Number.isNaN(y)) {
        ctx.lineTo(toCanvasX(x), toCanvasY(y));
      }
    }
    ctx.lineTo(toCanvasX(rightBound), originY);
    ctx.closePath();
    ctx.fill();
  }

  // Vẽ đường cong hàm số y = f(x)
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 3;
  ctx.beginPath();
  let penDown = false;
  for (let px = 0; px <= W; px += 2) {
    const x = xMin + (px / W) * (xMax - xMin);
    const y = evalMathExpr(expr, x);
    if (Number.isNaN(y) || Math.abs(y) > 25) {
      penDown = false;
      continue;
    }
    const py = toCanvasY(y);
    if (!penDown) {
      ctx.moveTo(px, py);
      penDown = true;
    } else {
      ctx.lineTo(px, py);
    }
  }
  ctx.stroke();

  // Vẽ đường tiếp tuyến tại x0 (màu vàng nét đứt)
  if (Number.isFinite(dfx0)) {
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    const yStart = dfx0 * xMin + intercept;
    const yEnd = dfx0 * xMax + intercept;
    ctx.moveTo(toCanvasX(xMin), toCanvasY(yStart));
    ctx.lineTo(toCanvasX(xMax), toCanvasY(yEnd));
    ctx.stroke();
    ctx.setLineDash([]);

    // Chấm tròn đánh dấu tiếp điểm (x0, f(x0))
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    ctx.arc(toCanvasX(x0), toCanvasY(y0), 6, 0, Math.PI * 2);
    ctx.fill();
  }

  // Hiển thị kết quả tính toán ra bảng bên cạnh
  const signStr =
    intercept >= 0
      ? `+ ${intercept.toFixed(3)}`
      : `- ${Math.abs(intercept).toFixed(3)}`;
  output.innerHTML = `
    <p><strong>Hàm số khảo sát:</strong> <code>f(x) = ${expr}</code></p>
    <p>• <strong>Giá trị tại x₀ = ${x0}:</strong> <code>f(${x0}) = ${y0.toFixed(4)}</code></p>
    <p>• <strong>Đạo hàm tại x₀ = ${x0}:</strong> <code>f'(${x0}) ≈ ${dfx0.toFixed(4)}</code></p>
    <p>• <strong>Phương trình tiếp tuyến (đường vàng):</strong> <code>y = ${dfx0.toFixed(3)}x ${signStr}</code></p>
    <p>• <strong>Tích phân xác định trên [${a}, ${b}] (vùng tô xanh):</strong> <code>∫ f(x)dx ≈ ${integralVal.toFixed(5)}</code></p>
  `;
}

/* ==========================================================================
   CÔNG CỤ 2: MÁY TÍNH MA TRẬN (CHƯƠNG 5 - ĐỊNH THỨC, HẠNG, NGHỊCH ĐẢO)
   ========================================================================== */
function renderMatrixGrid() {
  const sizeSelect = document.getElementById("matrix-size");
  const container = document.getElementById("matrix-input-grid");
  if (!sizeSelect || !container) return;

  const n = parseInt(sizeSelect.value, 10);
  // Ma trận mẫu mặc định lấy từ bài tập giáo trình
  const sample3 = [
    [1, 1, 0],
    [1, 2, 1],
    [0, 1, 2],
  ];
  const sample2 = [
    [2, 1],
    [1, -1],
  ];

  container.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
  let html = "";
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const val = n === 3 ? sample3[i][j] : sample2[i][j];
      html += `<input type="number" step="any" class="matrix-cell" id="mat-${i}-${j}" value="${val}" aria-label="Phần tử hàng ${i + 1} cột ${j + 1}">`;
    }
  }
  container.innerHTML = html;
}

function formatMatrixText(M) {
  return M.map(
    (row) =>
      "[ " +
      row
        .map((val) => {
          const clean = Math.abs(val) < 1e-9 ? 0 : val;
          return Number.isInteger(clean)
            ? String(clean).padStart(5, " ")
            : clean.toFixed(3).padStart(7, " ");
        })
        .join(" ") +
      " ]",
  ).join("\n");
}

function analyzeMatrix() {
  const sizeSelect = document.getElementById("matrix-size");
  const output = document.getElementById("matrix-output");
  if (!sizeSelect || !output) return;

  const n = parseInt(sizeSelect.value, 10);
  const A = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      row.push(parseFloat(document.getElementById(`mat-${i}-${j}`).value) || 0);
    }
    A.push(row);
  }

  // Tính chuyển vị A^T
  const AT = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (__, j) => A[j][i]),
  );

  // Khử Gauss-Jordan trên ma trận ghép [A | I_n] để tìm det(A), rank(A) và A^(-1)
  const aug = A.map((row, i) => [
    ...row,
    ...Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
  ]);

  let det = 1;
  let rank = 0;
  let pivotRow = 0;

  for (let col = 0; col < n && pivotRow < n; col++) {
    // Tìm phần tử trụ khác 0 lớn nhất ở cột hiện tại
    let maxRow = pivotRow;
    for (let r = pivotRow + 1; r < n; r++) {
      if (Math.abs(aug[r][col]) > Math.abs(aug[maxRow][col])) {
        maxRow = r;
      }
    }

    if (Math.abs(aug[maxRow][col]) < 1e-9) {
      det = 0;
      continue;
    }

    // Đổi chỗ 2 hàng (đổi dấu định thức)
    if (maxRow !== pivotRow) {
      [aug[pivotRow], aug[maxRow]] = [aug[maxRow], aug[pivotRow]];
      det *= -1;
    }

    const pivotVal = aug[pivotRow][col];
    det *= pivotVal;

    // Chuẩn hóa hàng trụ
    for (let c = 0; c < 2 * n; c++) {
      aug[pivotRow][c] /= pivotVal;
    }

    // Khử các phần tử khác trên cùng cột
    for (let r = 0; r < n; r++) {
      if (r !== pivotRow) {
        const factor = aug[r][col];
        for (let c = 0; c < 2 * n; c++) {
          aug[r][c] -= factor * aug[pivotRow][c];
        }
      }
    }

    pivotRow++;
    rank++;
  }

  if (rank < n) det = 0;
  const detClean = Math.abs(det) < 1e-9 ? 0 : det;

  let inverseHtml = "";
  if (detClean !== 0) {
    const inv = aug.map((row) => row.slice(n));
    inverseHtml = `<p><strong>• Ma trận nghịch đảo A⁻¹ (Gauss-Jordan):</strong></p><pre>${formatMatrixText(inv)}</pre>`;
  } else {
    inverseHtml = `<p style="color: var(--danger);"><strong>• Ma trận suy biến (det A = 0):</strong> Không tồn tại ma trận nghịch đảo A⁻¹.</p>`;
  }

  output.innerHTML = `
    <p>• <strong>Định thức:</strong> <code>det(A) = ${Number.isInteger(detClean) ? detClean : detClean.toFixed(4)}</code></p>
    <p>• <strong>Hạng của ma trận:</strong> <code>rank(A) = ${rank}</code> (cấp ${n})</p>
    <p><strong>• Ma trận chuyển vị Aᵀ:</strong></p>
    <pre>${formatMatrixText(AT)}</pre>
    ${inverseHtml}
  `;
}

/* ==========================================================================
   CÔNG CỤ 3: GIẢI HỆ PHƯƠNG TRÌNH TUYẾN TÍNH AX = b (ĐỊNH LÝ KRONECKER-CAPELLI)
   ========================================================================== */
function renderSystemGrid() {
  const sizeSelect = document.getElementById("sys-size");
  const container = document.getElementById("sys-input-grid");
  if (!sizeSelect || !container) return;

  const n = parseInt(sizeSelect.value, 10);
  const sample3 = [
    [1, 1, 1, 6],
    [2, -1, 1, 3],
    [1, 2, -1, 2],
  ];
  const sample2 = [
    [2, 1, 5],
    [1, -1, 1],
  ];

  container.style.gridTemplateColumns = `repeat(${n + 1}, 1fr)`;
  let html = "";
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= n; j++) {
      const val = n === 3 ? sample3[i][j] : sample2[i][j];
      const borderStyle =
        j === n ? "border-left: 3px solid var(--secondary);" : "";
      const label = j === n ? `b${i + 1}` : `a${i + 1}${j + 1}`;
      html += `<input type="number" step="any" class="matrix-cell" style="${borderStyle}" id="sys-${i}-${j}" value="${val}" title="${label}">`;
    }
  }
  container.innerHTML = html;
}

function solveLinearSystem() {
  const sizeSelect = document.getElementById("sys-size");
  const output = document.getElementById("sys-output");
  if (!sizeSelect || !output) return;

  const n = parseInt(sizeSelect.value, 10);
  const M = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j <= n; j++) {
      row.push(parseFloat(document.getElementById(`sys-${i}-${j}`).value) || 0);
    }
    M.push(row);
  }

  // Khử Gauss đưa ma trận mở rộng [A|b] về dạng bậc thang
  let pivotRow = 0;
  const pivotCols = [];

  for (let col = 0; col < n && pivotRow < n; col++) {
    let maxRow = pivotRow;
    for (let r = pivotRow + 1; r < n; r++) {
      if (Math.abs(M[r][col]) > Math.abs(M[maxRow][col])) maxRow = r;
    }
    if (Math.abs(M[maxRow][col]) < 1e-9) continue;

    [M[pivotRow], M[maxRow]] = [M[maxRow], M[pivotRow]];
    const pivotVal = M[pivotRow][col];
    for (let c = col; c <= n; c++) M[pivotRow][c] /= pivotVal;

    for (let r = 0; r < n; r++) {
      if (r !== pivotRow) {
        const factor = M[r][col];
        for (let c = col; c <= n; c++) M[r][c] -= factor * M[pivotRow][c];
      }
    }

    pivotCols.push(col);
    pivotRow++;
  }

  // Tính hạng r = rank(A) và r_bar = rank([A|b])
  let rankA = 0;
  let rankAug = 0;
  for (let i = 0; i < n; i++) {
    const hasLeftNonZero = M[i].slice(0, n).some((v) => Math.abs(v) > 1e-9);
    const hasAnyNonZero = M[i].some((v) => Math.abs(v) > 1e-9);
    if (hasLeftNonZero) rankA++;
    if (hasAnyNonZero) rankAug++;
  }

  let conclusion = "";
  const varNames = ["x", "y", "z"];

  if (rankA < rankAug) {
    conclusion = `<p style="color: var(--danger); font-weight: 700;">• Kết luận (Kronecker-Capelli): r(A) = ${rankA} &lt; r([A|b]) = ${rankAug} ⇒ Hệ phương trình VÔ NGHIỆM.</p>`;
  } else if (rankA === n) {
    const solParts = [];
    for (let i = 0; i < n; i++) {
      const val = Math.abs(M[i][n]) < 1e-9 ? 0 : M[i][n];
      solParts.push(
        `${varNames[i]} = ${Number.isInteger(val) ? val : val.toFixed(4)}`,
      );
    }
    conclusion = `
      <p style="color: var(--success); font-weight: 700;">• Kết luận (Kronecker-Capelli): r(A) = r([A|b]) = ${n} ⇒ Hệ có NGHIỆM DUY NHẤT.</p>
      <p>• <strong>Bộ nghiệm:</strong> <code>(${solParts.join(", ")})</code></p>
    `;
  } else {
    const freeCount = n - rankA;
    conclusion = `
      <p style="color: var(--primary); font-weight: 700;">• Kết luận (Kronecker-Capelli): r(A) = r([A|b]) = ${rankA} &lt; ${n} ⇒ Hệ có VÔ SỐ NGHIỆM phụ thuộc ${freeCount} ẩn tự do.</p>
      <p>• <strong>Số chiều không gian nghiệm thuần nhất:</strong> <code>dim N(A) = ${n} - ${rankA} = ${freeCount}</code></p>
    `;
  }

  output.innerHTML = `
    <p><strong>• Ma trận bậc thang rút gọn [A | b]:</strong></p>
    <pre>${formatMatrixText(M)}</pre>
    ${conclusion}
  `;
}

// Tự động khởi chạy các công cụ nếu đang ở trang có chứa Phòng thí nghiệm Toán
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("calc-canvas")) {
    runCalculusLab();
  }
  if (document.getElementById("matrix-input-grid")) {
    renderMatrixGrid();
    analyzeMatrix();
  }
  if (document.getElementById("sys-input-grid")) {
    renderSystemGrid();
    solveLinearSystem();
  }
});

/* ==========================================================================
   CÔNG CỤ 4: BỘ SINH BÀI TẬP TỰ LUẬN ĐỔI MỚI LIÊN TỤC (7 CHƯƠNG)
   ========================================================================== */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDynamicExercises(topicId) {
  // 1. GIẢI TÍCH 1 - CHƯƠNG 1: GIỚI HẠN & LIÊN TỤC
  if (topicId === "gt1-c1") {
    const k = randInt(2, 9);
    const a = randInt(2, 7);
    const b = randInt(2, 6);
    const c = randInt(1, 5);
    const m = randInt(3, 8);
    return [
      {
        level: "Sinh ngẫu nhiên • Vừa",
        question: `Tính giới hạn dãy số: $L_1 = \\lim_{n \\to \\infty} (\\sqrt{n^2 + ${2 * k}n + 5} - n)$`,
        solution: `Nhân lượng liên hợp: $L_1 = \\lim_{n \\to \\infty} \\frac{${2 * k}n + 5}{\\sqrt{n^2 + ${2 * k}n + 5} + n}$. Chia tử và mẫu cho $n$: $L_1 = \\frac{${2 * k}}{1 + 1} = ${k}$.`,
      },
      {
        level: "Sinh ngẫu nhiên • Vừa",
        question: `Sử dụng vô cùng bé tương đương tính: $L_2 = \\lim_{x \\to 0} \\frac{\\ln(1 + ${a}x) + 1 - \\cos x}{e^{${b}x} - 1 + \\sin(${c}x)}$`,
        solution: `Khi $x \\to 0$: $\\ln(1+${a}x) \\sim ${a}x$, $1-\\cos x \\sim \\frac{x^2}{2} = o(x)$ (bỏ qua VCB bậc cao), $e^{${b}x}-1 \\sim ${b}x$, $\\sin(${c}x) \\sim ${c}x$. Vậy $L_2 = \\frac{${a}}{${b} + ${c}} = \\frac{${a}}{${b + c}}$.`,
      },
      {
        level: "Sinh ngẫu nhiên • Khó",
        question: `Tìm $A$ để hàm số $f(x) = \\begin{cases} \\frac{\\sin(${m}x)}{x}, & x \\neq 0 \\\\ 2A - 1, & x = 0 \\end{cases}$ liên tục tại $x = 0$.`,
        solution: `Ta có $\\lim_{x \\to 0} f(x) = \\lim_{x \\to 0} \\frac{\\sin(${m}x)}{x} = ${m}$. Để hàm liên tục tại $x=0$ thì $2A - 1 = ${m} \\iff A = \\frac{${m + 1}}{2}$.`,
      },
    ];
  }

  // 2. GIẢI TÍCH 1 - CHƯƠNG 2: ĐẠO HÀM & VI PHÂN
  if (topicId === "gt1-c2") {
    const base = randInt(3, 8);
    const delta = randInt(1, 2);
    const k = randInt(2, 6);
    const p = randInt(2, 5);
    const q = randInt(3, 7);
    return [
      {
        level: "Sinh ngẫu nhiên • Vừa",
        question: `Dùng vi phân cấp 1 tính gần đúng giá trị $\\sqrt{${base * base + delta}}$.`,
        solution: `Xét $f(x) = \\sqrt{x}$ tại $x_0 = ${base * base}$, $\\Delta x = ${delta}$. Ta có $f'(x) = \\frac{1}{2\\sqrt{x}} \\Rightarrow f'(${base * base}) = \\frac{1}{${2 * base}}$. Vậy $\\sqrt{${base * base + delta}} \\approx ${base} + \\frac{${delta}}{${2 * base}} = ${(base + delta / (2 * base)).toFixed(4)}$.`,
      },
      {
        level: "Sinh ngẫu nhiên • Vừa",
        question: `Áp dụng quy tắc L'Hospital tính: $I = \\lim_{x \\to 0} \\frac{e^{${k}x} - 1 - ${k}x}{x^2}$`,
        solution: `Dạng $\\frac{0}{0}$, dùng L'Hospital 2 lần: $I = \\lim_{x \\to 0} \\frac{${k}e^{${k}x} - ${k}}{2x} = \\lim_{x \\to 0} \\frac{${k * k}e^{${k}x}}{2} = \\frac{${k * k}}{2}$.`,
      },
      {
        level: "Sinh ngẫu nhiên • Khó",
        question: `Cho đường cong tham số $\\begin{cases} x = ${p}t^2 + 1 \\\\ y = ${q}t^3 - t \\end{cases}$. Tính đạo hàm $y'_x$ tại $t = 1$.`,
        solution: `Ta có $x'(t) = ${2 * p}t$, $y'(t) = ${3 * q}t^2 - 1$. Tại $t = 1$: $y'_x(1) = \\frac{y'(1)}{x'(1)} = \\frac{${3 * q - 1}}{${2 * p}}$.`,
      },
    ];
  }

  // 3. GIẢI TÍCH 1 - CHƯƠNG 3: TÍCH PHÂN
  if (topicId === "gt1-c3") {
    const a = randInt(1, 3);
    const c1 = randInt(1, 4) * 3;
    const c2 = randInt(1, 5) * 2;
    const k = randInt(2, 5);
    const p = randInt(1, 5);
    const q = randInt(2, 4);
    const isConv = p > q;
    return [
      {
        level: "Sinh ngẫu nhiên • Vừa",
        question: `Tính tích phân xác định: $I = \\int_0^{${a}} (${c1}x^2 + ${c2}x)\\,dx$`,
        solution: `$I = \\left[ ${c1 / 3}x^3 + ${c2 / 2}x^2 \\right]_0^{${a}} = ${(c1 / 3) * a ** 3 + (c2 / 2) * a ** 2}$.`,
      },
      {
        level: "Sinh ngẫu nhiên • Vừa",
        question: `Tính tích phân từng phần: $J = \\int_0^1 x e^{${k}x}\\,dx$`,
        solution: `Đặt $u = x \\Rightarrow du = dx$; $dv = e^{${k}x}dx \\Rightarrow v = \\frac{1}{${k}}e^{${k}x}$. Khi đó $J = \\left[\\frac{x}{${k}}e^{${k}x}\\right]_0^1 - \\frac{1}{${k}}\\int_0^1 e^{${k}x}dx = \\frac{${k - 1}e^{${k}} + 1}{${k * k}}$.`,
      },
      {
        level: "Sinh ngẫu nhiên • Khó",
        question: `Xét sự hội tụ của tích phân suy rộng: $K = \\int_1^{+\\infty} \\frac{dx}{x^{${p}/${q}}}$`,
        solution: `Đây là tích phân suy rộng loại 1 dạng $\\int_1^{+\\infty} \\frac{dx}{x^\\alpha}$ với $\\alpha = \\frac{${p}}{${q}}$. Vì $\\alpha ${isConv ? "> 1" : "\\le 1"}$ nên tích phân $K$ <b>${isConv ? "hội tụ" : "phân kỳ"}</b>.`,
      },
    ];
  }

  // 4. GIẢI TÍCH 1 - CHƯƠNG 4: LÝ THUYẾT CHUỖI
  if (topicId === "gt1-c4") {
    const k = randInt(2, 9);
    const a = randInt(2, 6);
    const q = randInt(2, 5);
    const rBase = randInt(2, 7);
    const x0 = randInt(-3, 4);
    return [
      {
        level: "Sinh ngẫu nhiên • Vừa",
        question: `Tính tổng của chuỗi số rút gọn: $S = \\sum_{n=1}^{\\infty} \\frac{${k}}{n(n+1)}$`,
        solution: `Phân tích $\\frac{${k}}{n(n+1)} = ${k}\\left(\\frac{1}{n} - \\frac{1}{n+1}\\right)$. Tổng riêng $S_N = ${k}\\left(1 - \\frac{1}{N+1}\\right) \\xrightarrow{N \\to \\infty} ${k}$.`,
      },
      {
        level: "Sinh ngẫu nhiên • Vừa",
        question: `Tính tổng chuỗi hình học: $S = \\sum_{n=0}^{\\infty} \\frac{${a}}{${q}^n}$`,
        solution: `Chuỗi hình học có số hạng đầu $u_0 = ${a}$ và công bội $q = \\frac{1}{${q}}$ ($|q| < 1$). Tổng $S = \\frac{${a}}{1 - 1/${q}} = \\frac{${a * q}}{${q - 1}}$.`,
      },
      {
        level: "Sinh ngẫu nhiên • Khó",
        question: `Tìm bán kính hội tụ $R$ của chuỗi lũy thừa: $\\sum_{n=1}^{\\infty} \\frac{${rBase}^n (x - (${x0}))^n}{n + 1}$`,
        solution: `Ta có $\\rho = \\lim_{n \\to \\infty} \\left|\\frac{a_{n+1}}{a_n}\\right| = \\lim_{n \\to \\infty} \\frac{${rBase}^{n+1}/(n+2)}{${rBase}^n/(n+1)} = ${rBase}$. Suy ra bán kính hội tụ $R = \\frac{1}{${rBase}}$.`,
      },
    ];
  }

  // 5. ĐSTT - CHƯƠNG 5: MA TRẬN & ĐỊNH THỨC
  if (topicId === "dstt-c5") {
    const detA = randInt(-4, 5) || 2;
    const detB = randInt(2, 6);
    const k = randInt(2, 4);
    const x = randInt(1, 4);
    const y = randInt(1, 3);
    const z = randInt(1, 3);
    const w = x * z + 1; // Đảm bảo det = x*w - y*z = 1
    const t0 = randInt(2, 7);
    return [
      {
        level: "Sinh ngẫu nhiên • Vừa",
        question: `Cho $A, B$ là hai ma trận vuông cấp 3 có $\\det A = ${detA}$ và $\\det B = ${detB}$. Tính $\\det(${k}A \\cdot B^T)$.`,
        solution: `Vì $A$ cấp 3 nên $\\det(${k}A \\cdot B^T) = ${k}^3 \\cdot \\det A \\cdot \\det(B^T) = ${k ** 3} \\cdot (${detA}) \\cdot ${detB} = ${k ** 3 * detA * detB}$.`,
      },
      {
        level: "Sinh ngẫu nhiên • Vừa",
        question: `Tìm ma trận nghịch đảo của $M = \\begin{pmatrix} ${x} & ${y} \\\\ ${z} & ${w} \\end{pmatrix}$.`,
        solution: `Ta có $\\det M = ${x}\\cdot${w} - ${y}\\cdot${z} = 1 \\neq 0$. Áp dụng công thức ma trận cấp 2: $M^{-1} = \\begin{pmatrix} ${w} & ${-y} \\\\ ${-z} & ${x} \\end{pmatrix}$.`,
      },
      {
        level: "Sinh ngẫu nhiên • Khó",
        question: `Tìm điều kiện của $m$ để ma trận $C = \\begin{pmatrix} 1 & 2 & -1 \\\\ 0 & 3 & 4 \\\\ 0 & 0 & m - ${t0} \\end{pmatrix}$ khả nghịch.`,
        solution: `Vì $C$ là ma trận tam giác trên nên $\\det C = 1 \\cdot 3 \\cdot (m - ${t0}) = 3(m - ${t0})$. Để $C$ khả nghịch $\\iff \\det C \\neq 0 \\iff m \\neq ${t0}$.`,
      },
    ];
  }

  // 6. ĐSTT - CHƯƠNG 6: HỆ PHƯƠNG TRÌNH TUYẾN TÍNH
  if (topicId === "dstt-c6") {
    const x0 = randInt(-3, 4);
    const y0 = randInt(-3, 4);
    const b1 = 2 * x0 + y0;
    const b2 = x0 - 2 * y0;
    const m = randInt(2, 6);
    return [
      {
        level: "Sinh ngẫu nhiên • Vừa",
        question: `Giải hệ phương trình bằng quy tắc Cramer: $\\begin{cases} 2x + y = ${b1} \\\\ x - 2y = ${b2} \\end{cases}$`,
        solution: `$\\Delta = \\det\\begin{pmatrix} 2 & 1 \\\\ 1 & -2 \\end{pmatrix} = -5 \\neq 0$; $\\Delta_x = ${-2 * b1 - b2} = ${-5 * x0}$; $\\Delta_y = ${2 * b2 - b1} = ${-5 * y0}$. Nghiệm duy nhất $(x, y) = (${x0}, ${y0})$.`,
      },
      {
        level: "Sinh ngẫu nhiên • Vừa",
        question: `Cho hệ thuần nhất $AX = 0$ gồm 4 phương trình và 6 ẩn có $\\text{rank}(A) = ${randInt(2, 3)}$. Hỏi hệ có bao nhiêu ẩn tự do?`,
        solution: `Số ẩn $n = 6$. Theo định lý Kronecker-Capelli, số ẩn tự do bằng $n - \\text{rank}(A)$ (giúp sinh ra không gian nghiệm $N(A)$).`,
      },
      {
        level: "Sinh ngẫu nhiên • Khó",
        question: `Tìm $k$ để hệ $\\begin{cases} x + y = 2 \\\\ ${m}x + ${m}y = k \\end{cases}$ có vô số nghiệm.`,
        solution: `Nhân phương trình (1) với $${m}$ được $${m}x + ${m}y = ${2 * m}$. Để $\\text{rank}(A) = \\text{rank}([A|b]) = 1 < 2$ thì $k = ${2 * m}$.`,
      },
    ];
  }

  // 7. ĐSTT - CHƯƠNG 7: KHÔNG GIAN VECTOR & EUCLIDE
  const a1 = randInt(1, 4);
  const a2 = randInt(2, 5);
  const c1 = randInt(-2, 3) || 2;
  const c2 = randInt(1, 4);
  const v1 = c1 + c2;
  const v2 = c1 - c2;
  return [
    {
      level: "Sinh ngẫu nhiên • Vừa",
      question: `Trong $\\mathbb{R}^3$ với tích vô hướng chính tắc, tìm $m$ để $u = (${a1}, m, -1)$ và $v = (2, 1, ${a2})$ trực giao.`,
      solution: `$u \\perp v \\iff \\langle u, v \\rangle = 2(${a1}) + m - ${a2} = 0 \\iff m = ${a2 - 2 * a1}$.`,
    },
    {
      level: "Sinh ngẫu nhiên • Vừa",
      question: `Trong $\\mathbb{R}^2$, tìm tọa độ của vector $w = (${v1}, ${v2})$ đối với cơ sở $B = ((1, 1), (1, -1))$.`,
      solution: `Giải hệ $c_1(1,1) + c_2(1,-1) = (${v1}, ${v2}) \\Rightarrow c_1 = ${c1}, c_2 = ${c2}$. Vậy $[w]_B = \\begin{pmatrix} ${c1} \\\\ ${c2} \\end{pmatrix}$.`,
    },
    {
      level: "Sinh ngẫu nhiên • Khó",
      question: `Cho ma trận $A$ cỡ $4 \\times 7$ có $\\text{rank}(A) = ${randInt(2, 4)}$. Tính số chiều không gian nghiệm $\\dim N(A)$.`,
      solution: `Áp dụng định lý Rank-Nullity: $\\dim N(A) = n - \\text{rank}(A) = 7 - \\text{rank}(A)$.`,
    },
  ];
}
