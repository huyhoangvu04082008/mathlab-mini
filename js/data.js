// =========================================================================
// MATHLAB MINI — BỘ GỘP DỮ LIỆU CHUYÊN ĐỀ & NGÂN HÀNG ĐỀ THI
// Yêu cầu nạp trước: js/data-gt1.js, js/data-dstt.js, js/data-trr.js
// =========================================================================

const DEFAULT_TOPICS = [
  ...(typeof DATA_GT1 !== "undefined" ? DATA_GT1 : []),
  ...(typeof DATA_DSTT !== "undefined" ? DATA_DSTT : []),
  ...(typeof DATA_TRR !== "undefined" ? DATA_TRR : []),
];

const CHAPTER_4_SERIES_TOPIC = {
  id: "gt-c4",
  code: "GIẢI TÍCH • CHƯƠNG 4",
  subject: "Giải tích 1",
  level: "Nâng cao",
  title: "Chuỗi số, Chuỗi hàm, Chuỗi lũy thừa & Taylor",
  bannerGradient: "linear-gradient(135deg, #7c3aed, #2563eb)",
  summary:
    "Khảo sát sự hội tụ của chuỗi số dương, chuỗi đan dấu (Leibniz), hội tụ đều của chuỗi hàm (Weierstrass), bán kính hội tụ chuỗi lũy thừa và khai triển Taylor–Maclaurin.",
  previewFormula:
    "$$R = \\lim_{n\\to\\infty}\\left|\\frac{a_n}{a_{n+1}}\\right|, \\quad f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(x_0)}{n!}(x-x_0)^n$$",
  theory: [
    {
      heading: "1. Chuỗi số, Tổng riêng, Chuỗi hình học & Điều kiện cần",
      content: `
        <p>• <strong>Định nghĩa:</strong> Với dãy $(a_n)$, biểu thức $\\sum_{n=1}^{\\infty} a_n$ là chuỗi số có tổng riêng thứ $N$ là $S_N = \\sum_{n=1}^{N} a_n$. Chuỗi hội tụ về $S$ nếu $\\lim_{N\\to\\infty} S_N = S$.</p>
        <p>• <strong>Chuỗi hình học:</strong> $\\sum_{n=0}^{\\infty} a q^n$ ($a \\neq 0$) hội tụ $\\iff |q| < 1$, và khi đó tổng $S = \\frac{a}{1-q}$.</p>
        <p>• <strong>Điều kiện cần:</strong> Nếu $\\sum a_n$ hội tụ thì $\\lim_{n\\to\\infty} a_n = 0$. Hệ quả: nếu $\\lim_{n\\to\\infty} a_n \\neq 0$ thì chuỗi chắc chắn <strong>phân kỳ</strong> (lưu ý: chiều ngược lại không đúng, ví dụ chuỗi điều hòa $\\sum \\frac{1}{n}$ phân kỳ dù $\\frac{1}{n}\\to 0$).</p>
      `,
      checkpoint: {
        question:
          "Tính tổng của chuỗi rút gọn (telescoping) $S = \\sum_{n=1}^{\\infty} \\frac{1}{n(n+1)}$ và xét sự hội tụ của chuỗi $\\sum_{n=1}^{\\infty} \\frac{2n+1}{3n+5}$.",
        rubric: [
          {
            step: "Bước 1 (0.5đ)",
            detail:
              "Tách $\\frac{1}{n(n+1)} = \\frac{1}{n} - \\frac{1}{n+1} \\Rightarrow S_N = 1 - \\frac{1}{N+1} \\xrightarrow{N\\to\\infty} 1$. Vậy chuỗi đầu hội tụ và có tổng $S = 1$.",
          },
          {
            step: "Bước 2 (0.5đ)",
            detail:
              "Với chuỗi thứ hai, $\\lim_{n\\to\\infty} \\frac{2n+1}{3n+5} = \\frac{2}{3} \\neq 0 \\Rightarrow$ vi phạm điều kiện cần nên chuỗi phân kỳ.",
          },
        ],
        trap: "Không bao giờ kết luận chuỗi hội tụ chỉ vì thấy $\\lim a_n = 0$.",
      },
    },
    {
      heading:
        "2. Chuỗi số dương & Các tiêu chuẩn hội tụ (So sánh, D'Alembert, Cauchy)",
      content: `
        <p>• <strong>Chuỗi Riemann ($p$-series):</strong> $\\sum_{n=1}^{\\infty} \\frac{1}{n^p}$ hội tụ $\\iff p > 1$ (phân kỳ khi $p \\le 1$).</p>
        <p>• <strong>Tiêu chuẩn so sánh giới hạn:</strong> Với $a_n, b_n > 0$, nếu $\\lim_{n\\to\\infty} \\frac{a_n}{b_n} = L \\in (0, +\\infty)$ thì $\\sum a_n$ và $\\sum b_n$ cùng tính hội tụ.</p>
        <p>• <strong>Tiêu chuẩn D'Alembert (tỉ số):</strong> Đặt $L = \\lim_{n\\to\\infty} \\frac{a_{n+1}}{a_n}$ (dùng khi có $n!$, $a^n$).<br>
        • <strong>Tiêu chuẩn Cauchy (căn bậc $n$):</strong> Đặt $L = \\lim_{n\\to\\infty} \\sqrt[n]{a_n}$ (dùng khi có dạng $(\\dots)^n$).<br>
        Trong cả hai tiêu chuẩn: $L < 1 \\Rightarrow$ hội tụ; $L > 1 \\Rightarrow$ phân kỳ; $L = 1 \\Rightarrow$ chưa kết luận được.</p>
      `,
      checkpoint: {
        question:
          "Khảo sát sự hội tụ của hai chuỗi số dương: (a) $\\sum_{n=1}^{\\infty} \\frac{3^n}{n!}$ và (b) $\\sum_{n=1}^{\\infty} \\left(\\frac{2n+1}{3n+2}\\right)^n$.",
        rubric: [
          {
            step: "Bước 1 (0.5đ)",
            detail:
              "(a) Dùng D'Alembert: $L = \\lim_{n\\to\\infty} \\frac{3^{n+1}/(n+1)!}{3^n/n!} = \\lim_{n\\to\\infty} \\frac{3}{n+1} = 0 < 1 \\Rightarrow$ chuỗi hội tụ.",
          },
          {
            step: "Bước 2 (0.5đ)",
            detail:
              "(b) Dùng Cauchy: $L = \\lim_{n\\to\\infty} \\sqrt[n]{a_n} = \\lim_{n\\to\\infty} \\frac{2n+1}{3n+2} = \\frac{2}{3} < 1 \\Rightarrow$ chuỗi hội tụ.",
          },
        ],
        trap: "Với chuỗi phân thức đa thức như $\\sum \\frac{n+1}{n^3+2}$, D'Alembert và Cauchy đều ra $L=1$, phải dùng tiêu chuẩn so sánh với $\\sum \\frac{1}{n^2}$.",
      },
    },
    {
      heading: "3. Chuỗi đan dấu (Leibniz), Hội tụ tuyệt đối & Bán hội tụ",
      content: `
        <p>• <strong>Tiêu chuẩn Leibniz:</strong> Xét chuỗi đan dấu $\\sum_{n=1}^{\\infty} (-1)^{n-1} b_n$ ($b_n > 0$). Nếu $(b_n)$ đơn điệu giảm ($b_{n+1} \\le b_n$) và $\\lim_{n\\to\\infty} b_n = 0$ thì chuỗi hội tụ, đồng thời sai số phần dư thỏa $|S - S_N| \\le b_{N+1}$.</p>
        <p>• <strong>Phân loại hội tụ:</strong><br>
        1) $\\sum u_n$ <strong>hội tụ tuyệt đối</strong> nếu $\\sum |u_n|$ hội tụ (khi đó $\\sum u_n$ cũng hội tụ).<br>
        2) $\\sum u_n$ <strong>bán hội tụ (hội tụ có điều kiện)</strong> nếu $\\sum u_n$ hội tụ nhưng $\\sum |u_n|$ phân kỳ.</p>
      `,
      checkpoint: {
        question:
          "Xét tính hội tụ tuyệt đối hay bán hội tụ của chuỗi đan dấu $\\sum_{n=1}^{\\infty} \\frac{(-1)^{n-1}}{\\sqrt{n}}$.",
        rubric: [
          {
            step: "Bước 1 (0.5đ)",
            detail:
              "Xét chuỗi trị tuyệt đối $\\sum_{n=1}^{\\infty} \\frac{1}{n^{1/2}}$: đây là chuỗi Riemann có $p = \\frac{1}{2} \\le 1$ nên phân kỳ $\\Rightarrow$ không hội tụ tuyệt đối.",
          },
          {
            step: "Bước 2 (0.5đ)",
            detail:
              "Xét $b_n = \\frac{1}{\\sqrt{n}} > 0$: dãy giảm và $\\lim_{n\\to\\infty} \\frac{1}{\\sqrt{n}} = 0$. Theo tiêu chuẩn Leibniz, chuỗi đã cho hội tụ $\\Rightarrow$ kết luận chuỗi <strong>bán hội tụ</strong>.",
          },
        ],
        trap: "Luôn xét chuỗi trị tuyệt đối $\\sum |u_n|$ trước; nếu nó đã hội tụ thì kết luận ngay hội tụ tuyệt đối mà không cần kiểm tra Leibniz nữa.",
      },
    },
    {
      heading: "4. Chuỗi hàm & Tiêu chuẩn hội tụ đều Weierstrass (M-test)",
      content: `
        <p>• <strong>Miền hội tụ:</strong> Tập các $x \\in D$ sao cho chuỗi số $\\sum_{n=1}^{\\infty} u_n(x)$ hội tụ gọi là miền hội tụ của chuỗi hàm.</p>
        <p>• <strong>Tiêu chuẩn Weierstrass (M-test):</strong> Nếu tồn tại chuỗi số dương $\\sum_{n=1}^{\\infty} M_n$ hội tụ sao cho $|u_n(x)| \\le M_n, \\forall x \\in D$, thì chuỗi hàm $\\sum_{n=1}^{\\infty} u_n(x)$ <strong>hội tụ đều</strong> (và hội tụ tuyệt đối) trên $D$.</p>
        <p>• <strong>Tính chất bảo toàn:</strong> Khi các $u_n(x)$ liên tục và chuỗi hội tụ đều trên $[a,b]$ thì hàm tổng $S(x)$ liên tục, đồng thời có thể lấy tích phân và đạo hàm từng số hạng.</p>
      `,
      checkpoint: {
        question:
          "Chứng minh chuỗi hàm $\\sum_{n=1}^{\\infty} \\frac{\\cos(nx)}{n^2 + 1}$ hội tụ đều trên toàn bộ $\\mathbb{R}$.",
        rubric: [
          {
            step: "Bước 1 (0.5đ)",
            detail:
              "Với mọi $x \\in \\mathbb{R}$ và $n \\ge 1$, ta có $\\left|\\frac{\\cos(nx)}{n^2+1}\\right| \\le \\frac{1}{n^2+1} < \\frac{1}{n^2} = M_n$.",
          },
          {
            step: "Bước 2 (0.5đ)",
            detail:
              "Chuỗi số dương $\\sum_{n=1}^{\\infty} \\frac{1}{n^2}$ hội tụ ($p = 2 > 1$). Theo tiêu chuẩn Weierstrass, chuỗi hàm hội tụ đều trên $\\mathbb{R}$.",
          },
        ],
        trap: "Hằng số chặn trên $M_n$ chỉ được phụ thuộc vào $n$, tuyệt đối không được chứa biến $x$.",
      },
    },
    {
      heading: "5. Chuỗi lũy thừa, Bán kính hội tụ & Chuỗi Taylor–Maclaurin",
      content: `
        <p>• <strong>Định lý Abel & Bán kính hội tụ $R$:</strong> Chuỗi lũy thừa $\\sum_{n=0}^{\\infty} a_n(x-x_0)^n$ hội tụ tuyệt đối trong khoảng $(x_0 - R, x_0 + R)$ với $R = \\lim_{n\\to\\infty} \\left|\\frac{a_n}{a_{n+1}}\\right|$ hoặc $R = \\frac{1}{\\lim_{n\\to\\infty} \\sqrt[n]{|a_n|}}$.</p>
        <p>• <strong>Quy trình tìm miền hội tụ:</strong> Tìm $R \\Rightarrow$ viết khoảng $(x_0-R, x_0+R) \\Rightarrow$ thay lần lượt $x = x_0 - R$ và $x = x_0 + R$ để xét hội tụ chuỗi số tại hai đầu mút.</p>
        <p>• <strong>Khai triển Taylor tại $x_0$:</strong> $f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(x_0)}{n!}(x-x_0)^n$ (khi $x_0 = 0$ gọi là chuỗi Maclaurin).</p>
      `,
      checkpoint: {
        question:
          "Tìm bán kính hội tụ $R$ và miền hội tụ của chuỗi lũy thừa $\\sum_{n=1}^{\\infty} \\frac{(x-2)^n}{n \\cdot 3^n}$.",
        rubric: [
          {
            step: "Bước 1 (0.4đ)",
            detail:
              "Đặt $t = x - 2$, hệ số $a_n = \\frac{1}{n \\cdot 3^n}$. Tính $R = \\lim_{n\\to\\infty} \\left|\\frac{a_n}{a_{n+1}}\\right| = \\lim_{n\\to\\infty} \\frac{(n+1)3^{n+1}}{n \\cdot 3^n} = 3$. Khoảng hội tụ: $-3 < x - 2 < 3 \\iff -1 < x < 5$.",
          },
          {
            step: "Bước 2 (0.3đ)",
            detail:
              "Tại $x = -1$ ($t = -3$): chuỗi trở thành $\\sum_{n=1}^{\\infty} \\frac{(-1)^n}{n}$, hội tụ theo tiêu chuẩn Leibniz.",
          },
          {
            step: "Bước 3 (0.3đ)",
            detail:
              "Tại $x = 5$ ($t = 3$): chuỗi trở thành $\\sum_{n=1}^{\\infty} \\frac{1}{n}$ (chuỗi điều hòa), phân kỳ. Vậy miền hội tụ là $D = [-1, 5)$.",
          },
        ],
        trap: "Luôn kiểm tra riêng hai đầu mút $x = x_0 \\pm R$ vì chuỗi có thể hội tụ ở một đầu, cả hai đầu, hoặc không đầu nào.",
      },
    },
  ],
  exercises: [
    {
      level: "Trung bình",
      question:
        "Tính tổng của chuỗi số $S = \\sum_{n=1}^{\\infty} \\left(\\frac{1}{2^n} + \\frac{1}{n(n+2)}\\right)$.",
      solution: `<div class="rubric-box"><div class="rubric-step"><span class="rubric-tag">Bước 1 (0.5đ)</span> $\\sum_{n=1}^{\\infty} \\frac{1}{2^n} = \\frac{1/2}{1 - 1/2} = 1$.</div><div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> $\\frac{1}{n(n+2)} = \\frac{1}{2}\\left(\\frac{1}{n} - \\frac{1}{n+2}\\right) \\Rightarrow S_N = \\frac{1}{2}\\left(1 + \\frac{1}{2} - \\frac{1}{N+1} - \\frac{1}{N+2}\\right) \\to \\frac{3}{4}$. Tổng $S = 1 + \\frac{3}{4} = \\frac{7}{4}$.</div></div>`,
    },
    {
      level: "Trung bình",
      question:
        "Khảo sát sự hội tụ của chuỗi số dương $\\sum_{n=1}^{\\infty} \\frac{n^2 \\cdot 2^n}{n!}$.",
      solution: `<div class="rubric-box"><div class="rubric-step"><span class="rubric-tag">Bước 1 (0.6đ)</span> Áp dụng tiêu chuẩn D'Alembert: $\\frac{a_{n+1}}{a_n} = \\frac{(n+1)^2 2^{n+1}}{(n+1)!} \\cdot \\frac{n!}{n^2 2^n} = \\frac{2(n+1)}{n^2}$.</div><div class="rubric-step"><span class="rubric-tag">Bước 2 (0.4đ)</span> $L = \\lim_{n\\to\\infty} \\frac{2(n+1)}{n^2} = 0 < 1 \\Rightarrow$ chuỗi hội tụ.</div></div>`,
    },
    {
      level: "Khó",
      question:
        "Xét tính hội tụ tuyệt đối và bán hội tụ của chuỗi $\\sum_{n=2}^{\\infty} \\frac{(-1)^n}{n \\ln n}$.",
      solution: `<div class="rubric-box"><div class="rubric-step"><span class="rubric-tag">Bước 1 (0.5đ)</span> Xét chuỗi trị tuyệt đối $\\sum_{n=2}^{\\infty} \\frac{1}{n \\ln n}$: dùng tiêu chuẩn tích phân $\\int_2^{+\\infty} \\frac{dx}{x \\ln x} = \\ln(\\ln x)\\big|_2^{+\\infty} = +\\infty \\Rightarrow$ phân kỳ.</div><div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Dãy $b_n = \\frac{1}{n \\ln n}$ dương, giảm và $\\lim b_n = 0 \\Rightarrow$ hội tụ theo Leibniz. Vậy chuỗi bán hội tụ.</div></div>`,
    },
    {
      level: "Trung bình",
      question:
        "Chứng minh chuỗi hàm $\\sum_{n=1}^{\\infty} \\frac{\\sin(2^n x)}{3^n}$ hội tụ đều trên $\\mathbb{R}$.",
      solution: `<div class="rubric-box"><div class="rubric-step"><span class="rubric-tag">Bước 1 (0.5đ)</span> $|u_n(x)| = \\left|\\frac{\\sin(2^n x)}{3^n}\\right| \\le \\frac{1}{3^n} = M_n, \\forall x \\in \\mathbb{R}$.</div><div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> $\\sum_{n=1}^{\\infty} \\frac{1}{3^n}$ là chuỗi hình học có $q = \\frac{1}{3} < 1$ nên hội tụ $\\Rightarrow$ chuỗi hàm hội tụ đều trên $\\mathbb{R}$ theo Weierstrass.</div></div>`,
    },
    {
      level: "Khó",
      question:
        "Tìm bán kính và miền hội tụ của chuỗi lũy thừa $\\sum_{n=1}^{\\infty} \\frac{(x+1)^n}{\\sqrt{n} \\cdot 2^n}$.",
      solution: `<div class="rubric-box"><div class="rubric-step"><span class="rubric-tag">Bước 1 (0.5đ)</span> $R = \\lim_{n\\to\\infty} \\frac{\\sqrt{n+1}\\cdot 2^{n+1}}{\\sqrt{n}\\cdot 2^n} = 2 \\Rightarrow |x+1| < 2 \\iff -3 < x < 1$.</div><div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Tại $x = -3$: $\\sum \\frac{(-1)^n}{\\sqrt{n}}$ hội tụ (Leibniz). Tại $x = 1$: $\\sum \\frac{1}{\\sqrt{n}}$ phân kỳ ($p = 1/2 \\le 1$). Miền hội tụ: $[-3, 1)$.</div></div>`,
    },
  ],
  quiz: [
    {
      question:
        "Chuỗi Riemann $\\sum_{n=1}^{\\infty} \\frac{1}{n^p}$ hội tụ khi và chỉ khi:",
      options: ["$p > 1$", "$p \\ge 1$", "$p < 1$", "$p > 0$"],
      answer: 0,
      explanation:
        "Theo tiêu chuẩn tích phân, chuỗi $\\sum \\frac{1}{n^p}$ hội tụ khi và chỉ khi $p > 1$.",
    },
    {
      question:
        "Tổng của chuỗi hình học $\\sum_{n=0}^{\\infty} 3 \\cdot \\left(-\\frac{1}{2}\\right)^n$ bằng:",
      options: ["$2$", "$6$", "$\\frac{3}{2}$", "Phân kỳ"],
      answer: 0,
      explanation:
        "Với $a = 3, q = -\\frac{1}{2}$ ($|q| < 1$), $S = \\frac{a}{1-q} = \\frac{3}{1 - (-1/2)} = 2$.",
    },
    {
      question:
        "Chuỗi số $\\sum_{n=1}^{\\infty} \\frac{n}{2n+1}$ có tính chất nào sau đây?",
      options: [
        "Phân kỳ vì $\\lim_{n\\to\\infty} a_n = \\frac{1}{2} \\neq 0$",
        "Hội tụ theo tiêu chuẩn D'Alembert",
        "Hội tụ về $\\frac{1}{2}$",
        "Bán hội tụ",
      ],
      answer: 0,
      explanation:
        "Số hạng tổng quát tiến tới $\\frac{1}{2} \\neq 0$, vi phạm điều kiện cần để chuỗi hội tụ.",
    },
    {
      question:
        "Bán kính hội tụ $R$ của chuỗi lũy thừa $\\sum_{n=1}^{\\infty} n! x^n$ là:",
      options: ["$R = 0$", "$R = +\\infty$", "$R = 1$", "$R = e$"],
      answer: 0,
      explanation:
        "$R = \\lim_{n\\to\\infty} \\frac{n!}{(n+1)!} = \\lim_{n\\to\\infty} \\frac{1}{n+1} = 0$ (chỉ hội tụ tại $x = 0$).",
    },
    {
      question:
        "Chuỗi đan dấu $\\sum_{n=1}^{\\infty} \\frac{(-1)^{n-1}}{n}$ thuộc loại nào?",
      options: [
        "Bán hội tụ (hội tụ có điều kiện)",
        "Hội tụ tuyệt đối",
        "Phân kỳ",
        "Hội tụ đều trên $\\mathbb{R}$",
      ],
      answer: 0,
      explanation:
        "Chuỗi hội tụ theo tiêu chuẩn Leibniz nhưng chuỗi trị tuyệt đối $\\sum \\frac{1}{n}$ phân kỳ nên nó bán hội tụ.",
    },
  ],
};

// Cập nhật ngay vào DEFAULT_TOPICS
(function enrichDefaultTopics() {
  // Đã có Chương 4 đầy đủ trong data-gt1.js nên không ghi đè bản cũ nữa
  // const c4Idx = DEFAULT_TOPICS.findIndex((t) => t.id === "gt-c4");
  // if (c4Idx !== -1) {
  //   DEFAULT_TOPICS[c4Idx] = CHAPTER_4_SERIES_TOPIC;
  // }

  const c3 = DEFAULT_TOPICS.find((t) => t.id === "gt-c3");
  if (c3 && !c3.theory.some((u) => u.heading.includes("suy rộng"))) {
    c3.title = "Phép tính tích phân hàm một biến & Tích phân suy rộng";
    c3.theory.push({
      heading: "6. Ứng dụng hình học & Tích phân suy rộng loại 1, loại 2",
      content: `
        <p>• <strong>Ứng dụng hình học:</strong> Diện tích $S = \\int_a^b |f(x)-g(x)|\\,dx$; Thể tích tròn xoay quanh $Ox$: $V_x = \\pi \\int_a^b f^2(x)\\,dx$; Vỏ trụ quanh $Oy$: $V_y = 2\\pi \\int_a^b x|f(x)|\\,dx$; Độ dài cung $L = \\int_a^b \\sqrt{1+[f'(x)]^2}\\,dx$.</p>
        <p>• <strong>Tích phân suy rộng loại 1 (cận vô cùng):</strong> $\\int_a^{+\\infty} f(x)\\,dx = \\lim_{b\\to +\\infty} \\int_a^b f(x)\\,dx$. Mốc chuẩn $\\int_a^{+\\infty} \\frac{dx}{x^p}$ ($a>0$) hội tụ $\\iff p > 1$.</p>
        <p>• <strong>Tích phân suy rộng loại 2 (hàm không bị chặn tại $x=a$):</strong> $\\int_a^b f(x)\\,dx = \\lim_{\\varepsilon\\to 0^+} \\int_{a+\\varepsilon}^b f(x)\\,dx$. Mốc chuẩn $\\int_a^b \\frac{dx}{(x-a)^p}$ hội tụ $\\iff p < 1$.</p>
      `,
      checkpoint: {
        question:
          "Tính giá trị tích phân suy rộng $I = \\int_0^{+\\infty} x e^{-2x}\\,dx$ và xét sự hội tụ của $J = \\int_1^{+\\infty} \\frac{dx}{x^2 + \\sqrt{x}}$.",
        rubric: [
          {
            step: "Bước 1 (0.6đ)",
            detail:
              "Tích phân từng phần: $\\int_0^b x e^{-2x}\\,dx = \\left[-\\frac{x}{2}e^{-2x} - \\frac{1}{4}e^{-2x}\\right]_0^b = \\frac{1}{4} - \\frac{2b+1}{4e^{2b}} \\xrightarrow{b\\to+\\infty} \\frac{1}{4}$.",
          },
          {
            step: "Bước 2 (0.4đ)",
            detail:
              "Với $x \\ge 1$: $0 < \\frac{1}{x^2+\\sqrt{x}} < \\frac{1}{x^2}$. Mà $\\int_1^{+\\infty} \\frac{dx}{x^2}$ hội tụ ($p=2>1$) nên $J$ hội tụ theo tiêu chuẩn so sánh.",
          },
        ],
        trap: "Luôn viết dưới dạng $\\lim_{b\\to+\\infty}$ khi trình bày tự luận tích phân suy rộng.",
      },
    });
  }

  if (typeof CHAPTER_KEY_SUMMARIES !== "undefined") {
    DEFAULT_TOPICS.forEach((topic) => {
      if (CHAPTER_KEY_SUMMARIES[topic.id]) {
        topic.keySummary = CHAPTER_KEY_SUMMARIES[topic.id];
      }
    });
  }
})();

/* ==========================================================================
   NGÂN HÀNG ĐỀ THI BẤM GIỜ (THEO CHƯƠNG 1–7, GIỮA KỲ 1, GIỮA KỲ 2, CUỐI KỲ)
   ========================================================================== */
const EXAM_BANK = {
  "gt-c1": {
    id: "gt-c1",
    title: "Đề Kiểm Tra Chương 1: Giới hạn & Liên tục",
    durationMinutes: 35,
    mcqs: [
      {
        question:
          "Giới hạn $\\lim_{x\\to 0} \\frac{\\ln(1 + 3x) - 3x}{x^2}$ bằng:",
        options: ["$-\\frac{9}{2}$", "$0$", "$\\frac{9}{2}$", "$-3$"],
        answer: 0,
        explanation:
          "Dùng Maclaurin $\\ln(1+3x) = 3x - \\frac{9x^2}{2} + o(x^2) \\Rightarrow \\lim = -\\frac{9}{2}$.",
      },
      {
        question:
          "Giá trị của $\\lim_{x\\to +\\infty} \\left(\\frac{x+2}{x-1}\\right)^{2x}$ là:",
        options: ["$e^6$", "$e^3$", "$e^2$", "$1$"],
        answer: 0,
        explanation:
          "Dạng $1^\\infty$: $\\exp\\left(\\lim_{x\\to+\\infty} \\frac{3}{x-1}\\cdot 2x\\right) = e^6$.",
      },
      {
        question:
          "Cho $f(x) = \\frac{\\sin(mx)}{x}$ khi $x \\neq 0$ và $f(0) = 5$. Hàm số liên tục tại $x=0$ khi:",
        options: ["$m = 5$", "$m = 1$", "$m = 0$", "$m = -5$"],
        answer: 0,
        explanation: "$\\lim_{x\\to 0} \\frac{\\sin(mx)}{x} = m = f(0) = 5$.",
      },
      {
        question:
          "Ánh xạ $f: \\mathbb{R} \\to \\mathbb{R}, f(x) = x^2 + 1$ là:",
        options: [
          "Không đơn ánh, không toàn ánh",
          "Đơn ánh nhưng không toàn ánh",
          "Toàn ánh nhưng không đơn ánh",
          "Song ánh",
        ],
        answer: 0,
        explanation:
          "$f(1)=f(-1)=2$ (không đơn ánh) và $f(x) \\ge 1 > 0$ (không toàn ánh).",
      },
    ],
    essay: {
      prompt:
        "Câu Tự luận (4.0 điểm): Tìm hằng số $a \\in \\mathbb{R}$ để hàm số $f(x) = \\begin{cases} \\frac{1 - \\cos 2x}{x \\sin x}, & x \\neq 0 \\\\ 2a - 1, & x = 0 \\end{cases}$ liên tục tại $x_0 = 0$. Sau đó chứng minh phương trình $x^5 + 2x - 1 = 0$ có ít nhất một nghiệm trong khoảng $(0, 1)$.",
      rubric:
        "• Ý 1 (2.0đ): Tính $\\lim_{x\\to 0} \\frac{1-\\cos 2x}{x\\sin x} = \\lim_{x\\to 0} \\frac{(2x)^2/2}{x \\cdot x} = \\frac{2x^2}{x^2} = 2$. Để $f$ liên tục tại $0$: $2a - 1 = 2 \\iff a = \\frac{3}{2}$.\n• Ý 2 (2.0đ): Xét $g(x) = x^5 + 2x - 1$ liên tục trên $[0,1]$. Có $g(0) = -1 < 0$, $g(1) = 2 > 0 \\Rightarrow g(0)g(1) < 0$. Theo định lý Bolzano–Cauchy, tồn tại $c \\in (0,1)$ sao cho $g(c) = 0$.",
    },
  },
  "gt-c2": {
    id: "gt-c2",
    title: "Đề Kiểm Tra Chương 2: Đạo hàm, Vi phân & Taylor",
    durationMinutes: 35,
    mcqs: [
      {
        question:
          "Đạo hàm của hàm ẩn xác định bởi $x^2 + xy + y^2 = 7$ tại điểm $(1, 2)$ bằng:",
        options: [
          "$-\\frac{4}{5}$",
          "$\\frac{4}{5}$",
          "$-\\frac{5}{4}$",
          "$-1$",
        ],
        answer: 0,
        explanation:
          "$2x + y + xy' + 2yy' = 0 \\Rightarrow y'(1,2) = -\\frac{2(1)+2}{1+2(2)} = -\\frac{4}{5}$.",
      },
      {
        question: "Khai triển Maclaurin của $f(x) = e^{2x}$ đến bậc 3 là:",
        options: [
          "$1 + 2x + 2x^2 + \\frac{4}{3}x^3 + o(x^3)$",
          "$1 + 2x + 4x^2 + 8x^3 + o(x^3)$",
          "$1 + x + \\frac{x^2}{2} + \\frac{x^3}{6} + o(x^3)$",
          "$1 - 2x + 2x^2 - \\frac{4}{3}x^3 + o(x^3)$",
        ],
        answer: 0,
        explanation:
          "Thay $u = 2x$ vào $1 + u + \\frac{u^2}{2!} + \\frac{u^3}{3!}$ được $1 + 2x + 2x^2 + \\frac{4}{3}x^3$.",
      },
      {
        question:
          "Giới hạn $\\lim_{x\\to 0} \\frac{e^x - e^{-x} - 2x}{x - \\sin x}$ bằng:",
        options: ["$2$", "$1$", "$0$", "$6$"],
        answer: 0,
        explanation:
          "Dùng L'Hôpital 3 lần hoặc Taylor: tử $\\approx \\frac{x^3}{3}$, mẫu $\\approx \\frac{x^3}{6} \\Rightarrow \\lim = 2$.",
      },
      {
        question: "Đạo hàm cấp 10 của $y = x e^x$ là:",
        options: ["$(x + 10)e^x$", "$(x + 9)e^x$", "$10x e^x$", "$x e^x$"],
        answer: 0,
        explanation:
          "Theo công thức Leibniz: $y^{(10)} = x(e^x)^{(10)} + 10(x)'(e^x)^{(9)} = (x+10)e^x$.",
      },
    ],
    essay: {
      prompt:
        "Câu Tự luận (4.0 điểm): Khai triển Maclaurin hàm số $f(x) = \\ln(1 + 2x)$ đến bậc 4 tại $x_0 = 0$, sau đó áp dụng để tính gần đúng $\\ln(1.2)$ và đánh giá sai số.",
      rubric:
        "• Ý 1 (2.5đ): $\\ln(1+u) = u - \\frac{u^2}{2} + \\frac{u^3}{3} - \\frac{u^4}{4} + o(u^4)$. Thay $u = 2x$: $f(x) = 2x - 2x^2 + \\frac{8}{3}x^3 - 4x^4 + o(x^4)$.\n• Ý 2 (1.5đ): Với $1 + 2x = 1.2 \\Rightarrow x = 0.1$. Thay $x = 0.1$: $\\ln(1.2) \\approx 0.2 - 0.02 + 0.00267 - 0.0004 = 0.18227$ (sai số $< 32\\cdot (0.1)^5/5 = 6.4\\times 10^{-5}$).",
    },
  },
  "gt-c3": {
    id: "gt-c3",
    title: "Đề Kiểm Tra Chương 3: Tích phân & Tích phân suy rộng",
    durationMinutes: 35,
    mcqs: [
      {
        question:
          "Tích phân suy rộng $\\int_1^{+\\infty} \\frac{dx}{x^p}$ hội tụ khi và chỉ khi:",
        options: ["$p > 1$", "$p < 1$", "$p \\ge 1$", "$p > 0$"],
        answer: 0,
        explanation:
          "Theo tiêu chuẩn mốc $p$ ở vô cực, $\\int_1^{+\\infty} x^{-p}dx$ hội tụ $\\iff p > 1$.",
      },
      {
        question:
          "Đạo hàm của hàm tích phân $F(x) = \\int_1^{x^2} \\sin(t^2)\\,dt$ là:",
        options: [
          "$2x \\sin(x^4)$",
          "$\\sin(x^4)$",
          "$2x \\sin(x^2)$",
          "$\\cos(x^4)$",
        ],
        answer: 0,
        explanation: "$F'(x) = \\sin((x^2)^2) \\cdot (x^2)' = 2x \\sin(x^4)$.",
      },
      {
        question:
          "Khi tính $\\int x^2 \\ln x\\,dx$ bằng phương pháp từng phần (LIATE), ta đặt:",
        options: [
          "$u = \\ln x, dv = x^2 dx$",
          "$u = x^2, dv = \\ln x\\,dx$",
          "$u = x, dv = x\\ln x\\,dx$",
          "$u = x^2\\ln x, dv = dx$",
        ],
        answer: 0,
        explanation:
          "Theo LIATE, Logarithm (L) đứng trước Algebraic (A) nên đặt $u = \\ln x$.",
      },
      {
        question:
          "Giá trị của tích phân $\\int_{-2}^2 \\frac{x^3 \\cos x}{1 + x^2}\\,dx$ bằng:",
        options: ["$0$", "$2$", "$4$", "$-2$"],
        answer: 0,
        explanation:
          "Hàm dưới dấu tích phân là hàm lẻ trên đoạn đối xứng $[-2, 2]$ nên tích phân bằng $0$.",
      },
    ],
    essay: {
      prompt:
        "Câu Tự luận (4.0 điểm): (a) Tính tích phân xác định $I = \\int_0^1 x e^x\\,dx$. (b) Xét sự hội tụ và tính giá trị tích phân suy rộng $J = \\int_0^{+\\infty} \\frac{dx}{x^2 + 4}$.",
      rubric:
        "• Ý (a) (2.0đ): Đặt $u = x \\Rightarrow du = dx$; $dv = e^x dx \\Rightarrow v = e^x$. $I = xe^x\\big|_0^1 - \\int_0^1 e^x dx = e - (e - 1) = 1$.\n• Ý (b) (2.0đ): $J = \\lim_{b\\to+\\infty} \\int_0^b \\frac{dx}{x^2+2^2} = \\lim_{b\\to+\\infty} \\frac{1}{2}\\arctan\\frac{x}{2}\\Big|_0^b = \\frac{1}{2}\\cdot\\frac{\\pi}{2} = \\frac{\\pi}{4}$ (hội tụ).",
    },
  },
  "gt-c4": {
    id: "gt-c4",
    title: "Đề Kiểm Tra Chương 4: Chuỗi số & Chuỗi lũy thừa",
    durationMinutes: 35,
    mcqs: [
      {
        question:
          "Bán kính hội tụ $R$ của chuỗi lũy thừa $\\sum_{n=1}^{\\infty} \\frac{x^n}{n \\cdot 5^n}$ là:",
        options: ["$5$", "$\\frac{1}{5}$", "$1$", "$+\\infty$"],
        answer: 0,
        explanation:
          "$R = \\lim_{n\\to\\infty} \\frac{(n+1)5^{n+1}}{n \\cdot 5^n} = 5$.",
      },
      {
        question:
          "Tổng của chuỗi số $\\sum_{n=1}^{\\infty} \\frac{2}{3^n}$ bằng:",
        options: ["$1$", "$3$", "$\\frac{2}{3}$", "$2$"],
        answer: 0,
        explanation:
          "Số hạng đầu $a = \\frac{2}{3}$, công bội $q = \\frac{1}{3} \\Rightarrow S = \\frac{2/3}{1 - 1/3} = 1$.",
      },
      {
        question:
          "Chuỗi số dương $\\sum_{n=1}^{\\infty} \\frac{n+1}{n^3 + 5}$ có tính chất:",
        options: [
          "Hội tụ vì tương đương với chuỗi $\\sum \\frac{1}{n^2}$ ($p = 2 > 1$)",
          "Phân kỳ vì tử tiến ra vô cùng",
          "Phân kỳ theo tiêu chuẩn so sánh với $\\sum \\frac{1}{n}$",
          "Chưa kết luận được",
        ],
        answer: 0,
        explanation:
          "$\\frac{n+1}{n^3+5} \\sim \\frac{1}{n^2}$ khi $n\\to\\infty$, mà $\\sum \\frac{1}{n^2}$ hội tụ nên chuỗi hội tụ.",
      },
      {
        question:
          "Chuỗi $\\sum_{n=1}^{\\infty} \\frac{(-1)^n}{n^2 + 1}$ là chuỗi:",
        options: [
          "Hội tụ tuyệt đối",
          "Bán hội tụ",
          "Phân kỳ",
          "Không thỏa điều kiện cần",
        ],
        answer: 0,
        explanation:
          "$\\sum |u_n| = \\sum \\frac{1}{n^2+1}$ hội tụ nên chuỗi hội tụ tuyệt đối.",
      },
    ],
    essay: {
      prompt:
        "Câu Tự luận (4.0 điểm): Tìm bán kính hội tụ và miền hội tụ đầy đủ (xét cả hai đầu mút) của chuỗi lũy thừa $\\sum_{n=1}^{\\infty} \\frac{(x - 3)^n}{n \\cdot 2^n}$.",
      rubric:
        "• Bước 1 (1.5đ): $R = \\lim_{n\\to\\infty} \\frac{(n+1)2^{n+1}}{n \\cdot 2^n} = 2 \\Rightarrow |x-3| < 2 \\iff 1 < x < 5$.\n• Bước 2 (1.25đ): Tại $x = 1$: chuỗi trở thành $\\sum_{n=1}^{\\infty} \\frac{(-1)^n}{n}$, hội tụ theo tiêu chuẩn Leibniz.\n• Bước 3 (1.25đ): Tại $x = 5$: chuỗi trở thành $\\sum_{n=1}^{\\infty} \\frac{1}{n}$ (chuỗi điều hòa), phân kỳ. Kết luận miền hội tụ $D = [1, 5)$.",
    },
  },
  "dstt-c5": {
    id: "dstt-c5",
    title: "Đề Kiểm Tra Chương 5: Ma trận & Định thức",
    durationMinutes: 35,
    mcqs: [
      {
        question:
          "Cho $A$ là ma trận vuông cấp 3 có $\\det(A) = 4$. Giá trị của $\\det(2A^T)$ bằng:",
        options: ["$32$", "$8$", "$16$", "$24$"],
        answer: 0,
        explanation: "$\\det(2A^T) = 2^3 \\det(A^T) = 8 \\cdot 4 = 32$.",
      },
      {
        question:
          "Ma trận $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & m \\end{pmatrix}$ khả nghịch khi và chỉ khi:",
        options: ["$m \\neq 6$", "$m = 6$", "$m \\neq -6$", "$m \\neq 0$"],
        answer: 0,
        explanation: "$\\det(A) = m - 6 \\neq 0 \\iff m \\neq 6$.",
      },
      {
        question:
          "Cho $A$ cỡ $3\\times 4$, $B$ cỡ $4\\times 2$, $C$ cỡ $3\\times 2$. Phép toán nào sau đây xác định?",
        options: ["$AB + C$", "$BA + C$", "$A + B$", "$AC^T + B$"],
        answer: 0,
        explanation:
          "$AB$ có cỡ $3\\times 2$, cùng kích thước với $C$ nên cộng được.",
      },
      {
        question: "Nếu $A, B$ vuông cùng cấp khả nghịch thì $(AB)^{-1}$ bằng:",
        options: [
          "$B^{-1}A^{-1}$",
          "$A^{-1}B^{-1}$",
          "$(BA)^{-1}$",
          "$A^T B^T$",
        ],
        answer: 0,
        explanation:
          "Nghịch đảo của tích bằng tích các nghịch đảo theo thứ tự ngược lại.",
      },
    ],
    essay: {
      prompt:
        "Câu Tự luận (4.0 điểm): Cho ma trận $A = \\begin{pmatrix} 1 & 2 & 1 \\\\ 2 & 5 & 3 \\\\ 1 & 3 & 3 \\end{pmatrix}$. Tính $\\det(A)$ và tìm ma trận nghịch đảo $A^{-1}$ bằng phương pháp Gauss–Jordan hoặc phần phụ đại số.",
      rubric:
        "• Ý 1 (1.5đ): Khử Gauss tính $\\det(A) = 1 \\neq 0 \\Rightarrow A$ khả nghịch.\n• Ý 2 (2.5đ): Biến đổi $[A \\mid I_3] \\to [I_3 \\mid A^{-1}]$, thu được $A^{-1} = \\begin{pmatrix} 6 & -3 & 1 \\\\ -3 & 2 & -1 \\\\ 1 & -1 & 1 \\end{pmatrix}$ (kiểm tra $AA^{-1}=I_3$).",
    },
  },
  "dstt-c6": {
    id: "dstt-c6",
    title: "Đề Kiểm Tra Chương 6: Hệ Phương Trình Tuyến Tính",
    durationMinutes: 35,
    mcqs: [
      {
        question:
          "Hệ $AX = b$ gồm 4 phương trình, 5 ẩn có $\\operatorname{rank}(A) = \\operatorname{rank}[A\\mid b] = 3$. Kết luận đúng là:",
        options: [
          "Hệ có vô số nghiệm phụ thuộc 2 ẩn tự do",
          "Hệ có nghiệm duy nhất",
          "Hệ vô nghiệm",
          "Hệ có vô số nghiệm phụ thuộc 1 ẩn tự do",
        ],
        answer: 0,
        explanation:
          "$r = \\bar{r} = 3 < n = 5 \\Rightarrow$ vô số nghiệm phụ thuộc $5 - 3 = 2$ ẩn tự do.",
      },
      {
        question:
          "Hệ thuần nhất $AX = 0$ với $A$ vuông cấp 4 có nghiệm không tầm thường khi và chỉ khi:",
        options: [
          "$\\det(A) = 0$",
          "$\\det(A) \\neq 0$",
          "$\\operatorname{rank}(A) = 4$",
          "Luôn luôn có nghiệm không tầm thường",
        ],
        answer: 0,
        explanation:
          "Hệ vuông thuần nhất có nghiệm không tầm thường $\\iff \\operatorname{rank}(A) < 4 \\iff \\det(A) = 0$.",
      },
      {
        question:
          "Cho $X_1, X_2$ là hai nghiệm riêng của hệ không thuần nhất $AX = b$. Khi đó $X_1 - X_2$ là nghiệm của:",
        options: [
          "Hệ thuần nhất $AX = 0$",
          "Hệ $AX = b$",
          "Hệ $AX = 2b$",
          "Không là nghiệm hệ nào",
        ],
        answer: 0,
        explanation: "$A(X_1 - X_2) = AX_1 - AX_2 = b - b = 0$.",
      },
      {
        question:
          "Trong quy tắc Cramer, nếu $\\Delta = 0$ và có $\\Delta_1 \\neq 0$ thì hệ phương trình:",
        options: [
          "Vô nghiệm",
          "Vô số nghiệm",
          "Có nghiệm duy nhất $x_1 = 0$",
          "Chưa kết luận được",
        ],
        answer: 0,
        explanation:
          "Vì $\\Delta \\cdot x_1 = \\Delta_1 \\iff 0 \\cdot x_1 = \\Delta_1 \\neq 0$ (mâu thuẫn) nên hệ vô nghiệm.",
      },
    ],
    essay: {
      prompt:
        "Câu Tự luận (4.0 điểm): Giải và biện luận theo tham số $m$ hệ phương trình tuyến tính: $\\begin{cases} x + y + z = 1 \\\\ 2x + 3y + 2z = 3 \\\\ x + 2y + mz = 2 \\end{cases}$.",
      rubric:
        "• Bước 1 (1.5đ): Lập ma trận mở rộng và khử Gauss: $h_2 \\leftarrow h_2 - 2h_1$, $h_3 \\leftarrow h_3 - h_1$, rồi $h_3 \\leftarrow h_3 - h_2$ thu được hàng cuối $(0, 0, m - 1 \\mid 0)$.\n• Bước 2 (1.25đ): Nếu $m \\neq 1$: $r = \\bar{r} = 3$, nghiệm duy nhất $(x, y, z) = (0, 1, 0)$.\n• Bước 3 (1.25đ): Nếu $m = 1$: $r = \\bar{r} = 2 < 3$, vô số nghiệm $(x, y, z) = (-t, 1, t)$ với $t \\in \\mathbb{R}$.",
    },
  },
  "dstt-c7": {
    id: "dstt-c7",
    title: "Đề Kiểm Tra Chương 7: Không gian Vector & Euclide",
    durationMinutes: 35,
    mcqs: [
      {
        question: "Trong $\\mathbb{R}^4$, mọi hệ gồm 5 vectơ bất kỳ luôn:",
        options: [
          "Phụ thuộc tuyến tính",
          "Độc lập tuyến tính",
          "Là một cơ sở của $\\mathbb{R}^4$",
          "Trực giao đôi một",
        ],
        answer: 0,
        explanation:
          "Trong không gian $n$ chiều, mọi hệ nhiều hơn $n$ vectơ đều phụ thuộc tuyến tính.",
      },
      {
        question:
          "Ma trận chuyển cơ sở từ $B$ sang $C$ được tính theo công thức:",
        options: [
          "$P_{C\\leftarrow B} = P_C^{-1} P_B$",
          "$P_{C\\leftarrow B} = P_B^{-1} P_C$",
          "$P_{C\\leftarrow B} = P_C P_B$",
          "$P_{C\\leftarrow B} = P_B P_C^{-1}$",
        ],
        answer: 0,
        explanation:
          "Từ $P_B[v]_B = P_C[v]_C \\Rightarrow [v]_C = P_C^{-1}P_B[v]_B$.",
      },
      {
        question:
          "Cho không gian nghiệm $N(A) = \\{x \\in \\mathbb{R}^5 : Ax = 0\\}$ với $\\operatorname{rank}(A) = 2$. Khi đó $\\dim N(A)$ bằng:",
        options: ["$3$", "$2$", "$5$", "$1$"],
        answer: 0,
        explanation: "Theo định lý Rank-Nullity: $\\dim N(A) = 5 - 2 = 3$.",
      },
      {
        question:
          "Trong $\\mathbb{R}^3$ với tích vô hướng chính tắc, chuẩn $\\|u\\|$ của $u = (2, -1, 2)$ bằng:",
        options: ["$3$", "$9$", "$\\sqrt{5}$", "$5$"],
        answer: 0,
        explanation: "$\\|u\\| = \\sqrt{2^2 + (-1)^2 + 2^2} = \\sqrt{9} = 3$.",
      },
    ],
    essay: {
      prompt:
        "Câu Tự luận (4.0 điểm): Trong không gian Euclide $\\mathbb{R}^3$ với tích vô hướng chính tắc, áp dụng thuật toán Gram–Schmidt trực giao hóa và trực chuẩn hóa hệ hai vectơ $u_1 = (1, 1, 0)$ và $u_2 = (1, 0, 1)$.",
      rubric:
        "• Bước 1 (1.5đ): Đặt $v_1 = u_1 = (1, 1, 0)$, có $\\langle v_1, v_1 \\rangle = 2$.\n• Bước 2 (1.5đ): $v_2 = u_2 - \\frac{\\langle u_2, v_1 \\rangle}{\\langle v_1, v_1 \\rangle}v_1 = (1, 0, 1) - \\frac{1}{2}(1, 1, 0) = \\left(\\frac{1}{2}, -\\frac{1}{2}, 1\\right)$.\n• Bước 3 (1.0đ): Chuẩn hóa: $e_1 = \\frac{1}{\\sqrt{2}}(1, 1, 0)$, $e_2 = \\frac{1}{\\sqrt{6}}(1, -1, 2)$.",
    },
  },
  "midterm-1": {
    id: "midterm-1",
    title: "Đề Thi Giữa Kỳ 1: Giải Tích 1 (Chương 1 & Chương 2)",
    durationMinutes: 60,
    mcqs: [
      {
        question:
          "Giới hạn $\\lim_{x\\to 0} \\frac{\\tan x - \\sin x}{x^3}$ bằng:",
        options: ["$\\frac{1}{2}$", "$0$", "$1$", "$-\\frac{1}{2}$"],
        answer: 0,
        explanation:
          "$\\tan x - \\sin x = \\left(x + \\frac{x^3}{3}\\right) - \\left(x - \\frac{x^3}{6}\\right) + o(x^3) = \\frac{x^3}{2} + o(x^3)$.",
      },
      {
        question:
          "Đạo hàm cấp 2 của hàm tham số $x = t^2 + 1, y = t^3 - 3t$ tại $t = 1$ là:",
        options: ["$\\frac{3}{2}$", "$3$", "$0$", "$\\frac{3}{4}$"],
        answer: 0,
        explanation:
          "$y'_x = \\frac{3t^2-3}{2t} = \\frac{3}{2}(t - t^{-1}) \\Rightarrow y''_{xx} = \\frac{\\frac{3}{2}(1+t^{-2})}{2t} \\xrightarrow{t=1} \\frac{3}{2}$.",
      },
      {
        question:
          "Tìm $m$ để $f(x) = \\begin{cases} \\frac{e^{2x}-1}{x}, & x > 0 \\\\ m + 1, & x \\le 0 \\end{cases}$ liên tục trên $\\mathbb{R}$:",
        options: ["$m = 1$", "$m = 2$", "$m = 0$", "$m = -1$"],
        answer: 0,
        explanation:
          "$\\lim_{x\\to 0^+} \\frac{e^{2x}-1}{x} = 2 = m + 1 \\iff m = 1$.",
      },
      {
        question:
          "Số điểm gián đoạn của hàm số $f(x) = \\frac{x-1}{x^2 - 1}$ là:",
        options: [
          "$2$ (tại $x=1$ khử được và $x=-1$ loại 2)",
          "$1$",
          "$0$",
          "$3$",
        ],
        answer: 0,
        explanation:
          "Hàm không xác định tại $x = \\pm 1$: tại $x=1$ giới hạn hữu hạn $1/2$ (khử được), tại $x=-1$ giới hạn vô cực (loại 2).",
      },
      {
        question: "Khai triển Maclaurin của $\\cos(2x)$ đến bậc 4 là:",
        options: [
          "$1 - 2x^2 + \\frac{2}{3}x^4 + o(x^4)$",
          "$1 - 4x^2 + 16x^4 + o(x^4)$",
          "$1 - 2x^2 + \\frac{4}{3}x^4 + o(x^4)$",
          "$2x - \\frac{4}{3}x^3 + o(x^4)$",
        ],
        answer: 0,
        explanation:
          "$\\cos u = 1 - \\frac{u^2}{2!} + \\frac{u^4}{4!} + o(u^4)$ với $u = 2x$.",
      },
    ],
    essay: {
      prompt:
        "Phần Tự Luận Giữa Kỳ 1 (5.0 điểm):\nBài 1 (2.5đ): Tính giới hạn $L = \\lim_{x\\to 0} \\frac{e^x - 1 - x - \\frac{x^2}{2}}{x - \\sin x}$ bằng khai triển Taylor–Maclaurin.\nBài 2 (2.5đ): Chứng minh rằng với mọi $a, b \\in \\mathbb{R}$, ta có bất đẳng thức $|\\sin b - \\sin a| \\le |b - a|$.",
      rubric:
        "• Bài 1 (2.5đ): Tử $= \\left(1 + x + \\frac{x^2}{2} + \\frac{x^3}{6} + o(x^3)\\right) - 1 - x - \\frac{x^2}{2} = \\frac{x^3}{6} + o(x^3)$. Mẫu $= x - \\left(x - \\frac{x^3}{6} + o(x^3)\\right) = \\frac{x^3}{6} + o(x^3)$. Vậy $L = \\frac{1/6}{1/6} = 1$.\n• Bài 2 (2.5đ): Nếu $a = b$ hiển nhiên đúng. Nếu $a \\neq b$, áp dụng định lý Lagrange cho $f(x) = \\sin x$ trên đoạn nối $a$ và $b$: tồn tại $c$ ở giữa sao cho $\\sin b - \\sin a = \\cos(c)(b - a)$. Lấy trị tuyệt đối: $|\\sin b - \\sin a| = |\\cos c|\\cdot|b - a| \\le |b - a|$.",
    },
  },
  "midterm-2": {
    id: "midterm-2",
    title: "Đề Thi Giữa Kỳ 2: Cơ Sở Toán CNTT (Chương 5 & Chương 6)",
    durationMinutes: 60,
    mcqs: [
      {
        question:
          "Tính định thức cấp 3: $\\det \\begin{pmatrix} 1 & 2 & 3 \\\\ 0 & 4 & 5 \\\\ 0 & 0 & -2 \\end{pmatrix}$:",
        options: ["$-8$", "$8$", "$0$", "$12$"],
        answer: 0,
        explanation:
          "Ma trận tam giác trên có định thức bằng tích các phần tử đường chéo chính: $1 \\cdot 4 \\cdot (-2) = -8$.",
      },
      {
        question:
          "Hạng của ma trận $A = \\begin{pmatrix} 1 & 2 & 3 & 4 \\\\ 2 & 4 & 6 & 8 \\\\ 1 & 1 & 1 & 1 \\end{pmatrix}$ bằng:",
        options: ["$2$", "$3$", "$1$", "$4$"],
        answer: 0,
        explanation:
          "Hàng 2 gấp đôi hàng 1 nên khử về 0; hàng 1 và hàng 3 không tỉ lệ $\\Rightarrow \\operatorname{rank}(A) = 2$.",
      },
      {
        question:
          "Cho $A$ vuông cấp 3 thỏa $A^2 - 3A + 2I_3 = O$. Ma trận nghịch đảo $A^{-1}$ bằng:",
        options: [
          "$\\frac{1}{2}(3I_3 - A)$",
          "$3I_3 - A$",
          "$\\frac{1}{2}(A - 3I_3)$",
          "$A - 2I_3$",
        ],
        answer: 0,
        explanation:
          "$A(3I_3 - A) = 2I_3 \\iff A \\cdot \\frac{1}{2}(3I_3 - A) = I_3$.",
      },
      {
        question:
          "Hệ thuần nhất 3 phương trình, 4 ẩn có $\\operatorname{rank}(A) = 2$. Số nghiệm cơ bản của hệ là:",
        options: ["$2$", "$1$", "$3$", "$4$"],
        answer: 0,
        explanation: "Số ẩn tự do $= n - \\operatorname{rank}(A) = 4 - 2 = 2$.",
      },
    ],
    essay: {
      prompt:
        "Phần Tự Luận Giữa Kỳ 2 (5.0 điểm):\nBài 1 (2.5đ): Tìm ma trận $X$ thỏa mãn phương trình $AX = B$ với $A = \\begin{pmatrix} 2 & 1 \\\\ 5 & 3 \\end{pmatrix}$ và $B = \\begin{pmatrix} 1 & 4 \\\\ 2 & 9 \\end{pmatrix}$.\nBài 2 (2.5đ): Giải hệ phương trình tuyến tính thuần nhất $\\begin{cases} x_1 + 2x_2 - x_3 + 3x_4 = 0 \\\\ 2x_1 + 4x_2 - x_3 + 5x_4 = 0 \\end{cases}$ và chỉ ra một hệ nghiệm cơ bản.",
      rubric:
        "• Bài 1 (2.5đ): $\\det A = 6 - 5 = 1 \\Rightarrow A^{-1} = \\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix}$. Tính $X = A^{-1}B = \\begin{pmatrix} 1 & 3 \\\\ -1 & -2 \\end{pmatrix}$.\n• Bài 2 (2.5đ): Khử Gauss $h_2 \\leftarrow h_2 - 2h_1 \\Rightarrow x_3 - x_4 = 0 \\iff x_3 = x_4$. Đặt $x_2 = s, x_4 = t \\Rightarrow x_3 = t, x_1 = -2s - 2t$. Hệ nghiệm cơ bản: $v_1 = (-2, 1, 0, 0)^T, v_2 = (-2, 0, 1, 1)^T$.",
    },
  },
  "final-all": {
    id: "final-all",
    title:
      "Đề Thi Cuối Kỳ Tổng Hợp: Giải Tích 1 & Đại Số Tuyến Tính (Chương 1–7)",
    durationMinutes: 90,
    mcqs: [
      {
        question:
          "Chuỗi số $\\sum_{n=1}^{\\infty} \\frac{2^n + 3^n}{6^n}$ hội tụ về tổng bằng:",
        options: ["$\\frac{3}{2}$", "$1$", "$\\frac{5}{6}$", "$2$"],
        answer: 0,
        explanation:
          "$\\sum (1/3)^n + \\sum (1/2)^n = \\frac{1/3}{2/3} + \\frac{1/2}{1/2} = \\frac{1}{2} + 1 = \\frac{3}{2}$.",
      },
      {
        question:
          "Tích phân suy rộng $\\int_0^1 \\frac{dx}{\\sqrt{1 - x^2}}$ có giá trị bằng:",
        options: ["$\\frac{\\pi}{2}$", "$\\pi$", "$1$", "Phân kỳ"],
        answer: 0,
        explanation:
          "$\\lim_{b\\to 1^-} \\arcsin x\\big|_0^b = \\frac{\\pi}{2}$.",
      },
      {
        question:
          "Cho ánh xạ tuyến tính $f: \\mathbb{R}^4 \\to \\mathbb{R}^3$ có $\\dim(\\operatorname{Im} f) = 3$. Khi đó $\\dim(\\ker f)$ bằng:",
        options: ["$1$", "$0$", "$3$", "$4$"],
        answer: 0,
        explanation: "$\\dim(\\ker f) = 4 - 3 = 1$.",
      },
      {
        question:
          "Trong không gian đa thức $\\mathcal{P}_2$, hệ vectơ $\\{1, 1+x, 1+x+x^2\\}$ có tính chất:",
        options: [
          "Là một cơ sở của $\\mathcal{P}_2$",
          "Phụ thuộc tuyến tính",
          "Không sinh được $\\mathcal{P}_2$",
          "Có số chiều bằng 2",
        ],
        answer: 0,
        explanation:
          "Ma trận tọa độ theo cơ sở chính tắc là tam giác trên có định thức bằng $1 \\neq 0$ nên là cơ sở của $\\mathcal{P}_2$.",
      },
      {
        question: "Giới hạn $\\lim_{x\\to 0} \\frac{\\ln(\\cos x)}{x^2}$ bằng:",
        options: ["$-\\frac{1}{2}$", "$\\frac{1}{2}$", "$0$", "$-1$"],
        answer: 0,
        explanation:
          "$\\ln(\\cos x) = \\ln(1 - (1-\\cos x)) \\sim -(1-\\cos x) \\sim -\\frac{x^2}{2}$.",
      },
    ],
    essay: {
      prompt:
        "Phần Tự Luận Cuối Kỳ (5.0 điểm):\nCâu 1 (2.5đ - Giải tích): Tìm bán kính và miền hội tụ của chuỗi lũy thừa $\\sum_{n=1}^{\\infty} \\frac{(-1)^n (x+2)^n}{n \\cdot 4^n}$.\nCâu 2 (2.5đ - ĐSTT): Trong $\\mathbb{R}^3$, cho hai cơ sở $B = \\{(1,0,0), (1,1,0), (1,1,1)\\}$ và cơ sở chính tắc $E$. Tìm tọa độ của vectơ $v = (5, 3, 1)^T$ trong cơ sở $B$.",
      rubric:
        "• Câu 1 (2.5đ): $R = 4 \\Rightarrow |x+2| < 4 \\iff -6 < x < 2$. Tại $x = -6$: $\\sum \\frac{(-1)^n (-4)^n}{n \\cdot 4^n} = \\sum \\frac{1}{n}$ (phân kỳ). Tại $x = 2$: $\\sum \\frac{(-1)^n}{n}$ (hội tụ theo Leibniz). Miền hội tụ: $(-6, 2]$.\n• Câu 2 (2.5đ): $P_B = \\begin{pmatrix} 1 & 1 & 1 \\\\ 0 & 1 & 1 \\\\ 0 & 0 & 1 \\end{pmatrix}$. Giải $P_B [v]_B = (5, 3, 1)^T \\Rightarrow c_3 = 1, c_2 = 2, c_1 = 2$. Vậy $[v]_B = (2, 2, 1)^T$.",
    },
  },
};

const AI_LESSON_BLUEPRINT = {
  universityStandard: "HCMUE — Giải tích 1 & Đại số tuyến tính (COMP1800)",
  defaultModel: "gemini-3.8-flash",
  supportedSubjects: [
    "Giải tích 1",
    "Đại số tuyến tính",
    "Toán rời rạc",
    "Ôn thi THPTQG / ĐGNL",
  ],
  gradingRules: [
    "Bắt buộc kiểm tra điều kiện xác định, tính liên tục trước khi áp dụng định lý.",
    "Tích phân đổi biến phải đổi cận; nguyên hàm phải có hằng số + C.",
    "Biến đổi sơ cấp ma trận dùng dấu tương đương (~), tuyệt đối không dùng dấu bằng (=).",
    "Chứng minh không gian con bắt buộc chỉ ra vector không thuộc tập con trước.",
  ],
};

/* ==========================================================================
   BỘ QUẢN LÝ & NÂNG CẤP NGÂN HÀNG HỌC LIỆU TỪ TÀI LIỆU ĐÓNG GÓP (AI CURATOR)
   ========================================================================== */
const MathLabDataManager = (function () {
  const STORAGE_KEY = "mathlab_ai_contributed_bank_v1";

  function normalizeText(str) {
    return String(str || "")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function loadAll() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn("[MathLabDataManager] Lỗi đọc localStorage:", e);
      return [];
    }
  }

  function saveAll(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error("[MathLabDataManager] Lỗi lưu localStorage:", e);
    }
  }

  // Chuẩn hóa khung lời giải tự luận theo đúng style .rubric-box của gt-c1
  function buildRubricHtml(item) {
    if (item.solution && String(item.solution).includes("rubric-box")) {
      return item.solution;
    }
    const steps = Array.isArray(item.steps) ? item.steps : [];
    let html = '<div class="rubric-box">';
    if (steps.length > 0) {
      steps.forEach((st, idx) => {
        const tag = st.tag || `Bước ${idx + 1}`;
        const detail = st.detail || "";
        html += `<div class="rubric-step"><span class="rubric-tag">${tag}</span> ${detail}</div>`;
      });
    } else if (item.solution) {
      html += `<div class="rubric-step"><span class="rubric-tag">Lời giải chi tiết</span> ${item.solution}</div>`;
    }
    if (item.trap) {
      html += `<div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> ${item.trap}</div>`;
    }
    html += "</div>";
    return html;
  }

  // Tự động gộp dữ liệu AI đóng góp vào DEFAULT_TOPICS và EXAM_BANK khi tải trang
  function mergeIntoRuntime() {
    const items = loadAll();
    if (!items.length || typeof DEFAULT_TOPICS === "undefined") return;

    items.forEach((entry) => {
      const topic = DEFAULT_TOPICS.find((t) => t.id === entry.topicId);
      if (!topic) return;

      const sourceBadge = entry.sourceTitle
        ? ` <span style="font-size:0.75rem;opacity:0.75;">(Nguồn đóng góp: ${entry.sourceTitle})</span>`
        : "";

      if (entry.type === "theory" && entry.data) {
        topic.theory = topic.theory || [];
        const normHead = normalizeText(entry.data.heading);
        const exists = topic.theory.some(
          (u) => normalizeText(u.heading) === normHead,
        );
        if (!exists && normHead) {
          topic.theory.push({
            heading: entry.data.heading,
            content: (entry.data.content || "") + sourceBadge,
            checkpoint: entry.data.checkpoint || null,
            _aiContributedId: entry.id,
          });
        }
      } else if (entry.type === "exercise" && entry.data) {
        topic.exercises = topic.exercises || [];
        const normQ = normalizeText(entry.data.question);
        const exists = topic.exercises.some(
          (ex) => normalizeText(ex.question) === normQ,
        );
        if (!exists && normQ) {
          topic.exercises.push({
            level: entry.data.level || "Vừa",
            question: entry.data.question + sourceBadge,
            solution: buildRubricHtml(entry.data),
            _aiContributedId: entry.id,
          });
        }
      } else if (entry.type === "quiz" && entry.data) {
        topic.quiz = topic.quiz || [];
        const normQ = normalizeText(entry.data.question);
        const exists = topic.quiz.some(
          (qz) => normalizeText(qz.question) === normQ,
        );
        if (!exists && normQ && Array.isArray(entry.data.options)) {
          const quizObj = {
            question: entry.data.question,
            options: entry.data.options.slice(0, 4),
            answer:
              typeof entry.data.answer === "number" ? entry.data.answer : 0,
            explanation:
              (entry.data.explanation || "") +
              (entry.sourceTitle ? ` [Nguồn: ${entry.sourceTitle}]` : ""),
            _aiContributedId: entry.id,
          };
          topic.quiz.push(quizObj);

          // Đồng bộ luôn vào Phòng Thi Bấm Giờ (EXAM_BANK) nếu chương có đề thi
          if (typeof EXAM_BANK !== "undefined" && EXAM_BANK[entry.topicId]) {
            const examExists = EXAM_BANK[entry.topicId].mcqs.some(
              (m) => normalizeText(m.question) === normQ,
            );
            if (!examExists) {
              EXAM_BANK[entry.topicId].mcqs.push(quizObj);
            }
          }
        }
      }
    });
  }

  // Nhận gói dữ liệu AI vừa đọc từ tài liệu đóng góp và lưu + merge nóng
  function addContributedBundle(bundle) {
    if (!bundle || !bundle.topicId) {
      return { addedTheory: 0, addedExercise: 0, addedQuiz: 0, skipped: 0 };
    }

    const current = loadAll();
    const topicId = bundle.topicId;
    const sourceTitle = (bundle.sourceTitle || "Tài liệu cộng đồng").trim();
    const now = Date.now();
    let addedTheory = 0;
    let addedExercise = 0;
    let addedQuiz = 0;
    let skipped = 0;

    const topic =
      typeof DEFAULT_TOPICS !== "undefined"
        ? DEFAULT_TOPICS.find((t) => t.id === topicId)
        : null;

    // 1. Bổ sung mục lý thuyết mới (nếu tài liệu có kiến thức/mẹo hay)
    if (Array.isArray(bundle.theories)) {
      bundle.theories.forEach((th, idx) => {
        const norm = normalizeText(th.heading);
        if (!norm) return;
        const dupInStore = current.some(
          (c) =>
            c.topicId === topicId &&
            c.type === "theory" &&
            normalizeText(c.data?.heading) === norm,
        );
        const dupInTopic = topic?.theory?.some(
          (u) => normalizeText(u.heading) === norm,
        );
        if (dupInStore || dupInTopic) {
          skipped++;
          return;
        }
        current.push({
          id: `ai_th_${now}_${idx}`,
          topicId,
          type: "theory",
          sourceTitle,
          createdAt: now,
          data: th,
        });
        addedTheory++;
      });
    }

    // 2. Bổ sung bài tập tự luận
    if (Array.isArray(bundle.exercises)) {
      bundle.exercises.forEach((ex, idx) => {
        const norm = normalizeText(ex.question);
        if (!norm) return;
        const dupInStore = current.some(
          (c) =>
            c.topicId === topicId &&
            c.type === "exercise" &&
            normalizeText(c.data?.question) === norm,
        );
        const dupInTopic = topic?.exercises?.some(
          (e) => normalizeText(e.question) === norm,
        );
        if (dupInStore || dupInTopic) {
          skipped++;
          return;
        }
        current.push({
          id: `ai_ex_${now}_${idx}`,
          topicId,
          type: "exercise",
          sourceTitle,
          createdAt: now,
          data: {
            level: ex.level || "Vừa",
            question: ex.question,
            solution: buildRubricHtml(ex),
          },
        });
        addedExercise++;
      });
    }

    // 3. Bổ sung câu hỏi trắc nghiệm
    if (Array.isArray(bundle.quizzes)) {
      bundle.quizzes.forEach((qz, idx) => {
        const norm = normalizeText(qz.question);
        if (!norm || !Array.isArray(qz.options) || qz.options.length < 2)
          return;
        const dupInStore = current.some(
          (c) =>
            c.topicId === topicId &&
            c.type === "quiz" &&
            normalizeText(c.data?.question) === norm,
        );
        const dupInTopic = topic?.quiz?.some(
          (q) => normalizeText(q.question) === norm,
        );
        if (dupInStore || dupInTopic) {
          skipped++;
          return;
        }
        current.push({
          id: `ai_qz_${now}_${idx}`,
          topicId,
          type: "quiz",
          sourceTitle,
          createdAt: now,
          data: {
            question: qz.question,
            options: qz.options.slice(0, 4),
            answer: typeof qz.answer === "number" ? qz.answer : 0,
            explanation: qz.explanation || "",
          },
        });
        addedQuiz++;
      });
    }

    saveAll(current);
    mergeIntoRuntime();

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("mathlab:data-updated", {
          detail: { topicId, addedTheory, addedExercise, addedQuiz, skipped },
        }),
      );
    }

    return { addedTheory, addedExercise, addedQuiz, skipped };
  }

  // Xuất code JS chuẩn KaTeX (tự escape dấu \\) để dán vĩnh viễn vào data-gt1.js / data-dstt.js
  function exportJSCode(filterTopicId = "") {
    const items = loadAll().filter(
      (x) => !filterTopicId || x.topicId === filterTopicId,
    );
    if (!items.length) {
      return "// Chưa có dữ liệu AI đóng góp nào được lưu.";
    }

    const theories = items
      .filter((x) => x.type === "theory")
      .map((x) => x.data);
    const exercises = items
      .filter((x) => x.type === "exercise")
      .map((x) => x.data);
    const quizzes = items.filter((x) => x.type === "quiz").map((x) => x.data);

    let out = `// === DỮ LIỆU BỔ SUNG TỪ TÀI LIỆU ĐÓNG GÓP (${filterTopicId || "TẤT CẢ CHƯƠNG"}) ===\n`;
    if (theories.length) {
      out += `// 1. Dán thêm vào mảng theory: [...]\n${JSON.stringify(theories, null, 2).slice(1, -1)},\n\n`;
    }
    if (exercises.length) {
      out += `// 2. Dán thêm vào mảng exercises: [...]\n${JSON.stringify(exercises, null, 2).slice(1, -1)},\n\n`;
    }
    if (quizzes.length) {
      out += `// 3. Dán thêm vào mảng quiz: [...]\n${JSON.stringify(quizzes, null, 2).slice(1, -1)},\n`;
    }
    return out;
  }

  function removeItem(itemId) {
    const filtered = loadAll().filter((x) => x.id !== itemId);
    saveAll(filtered);
  }

  function clearAll() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function getStats() {
    const items = loadAll();
    const theory = items.filter((x) => x.type === "theory").length;
    const exercise = items.filter((x) => x.type === "exercise").length;
    const quiz = items.filter((x) => x.type === "quiz").length;
    return {
      total: items.length,
      theory,
      exercise,
      quiz,
      totalTheories: theory,
      totalExercises: exercise,
      totalQuizzes: quiz,
      items,
    };
  }

  return {
    loadAll,
    mergeIntoRuntime,
    addContributedBundle,
    exportJSCode,
    removeItem,
    clearAll,
    getStats,
  };
})();

// Tự động gộp ngay dữ liệu đóng góp đã lưu vào kho học liệu khi mở web
MathLabDataManager.mergeIntoRuntime();

if (typeof window !== "undefined") {
  window.MathLabDataManager = MathLabDataManager;
}

const DATA_SCHEMA_VERSION = "mathlab_topics_v6_ai";
