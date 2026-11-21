// =========================================================================
// MATHLAB MINI — DỮ LIỆU CHUYÊN ĐỀ CƠ SỞ TOÁN / ĐẠI SỐ TUYẾN TÍNH (DATA_DSTT)
// =========================================================================

const DATA_DSTT = [
  // =========================================================================
  // CHƯƠNG 5 & 6: ĐẠI SỐ TUYẾN TÍNH (COMP1800) - MA TRẬN, ĐỊNH THỨC & HỆ PTTT
  // =========================================================================
  {
    id: "dstt-c5",
    code: "ĐSTT • CHƯƠNG 5 & 6",
    subject: "Đại số tuyến tính",
    level: "Cơ bản",
    title: "Ma trận, Định thức và Hệ phương trình tuyến tính",
    summary:
      "Chương 5 (Ma trận, các dạng đặc biệt, phép toán ma trận, định thức cấp n, khai triển Laplace, khử Gauss về tam giác trên, ma trận nghịch đảo bằng phụ hợp & Gauss–Jordan, hạng ma trận) gộp cùng Chương 6 (Hệ PTTT tổng quát, biến đổi tương đương, khử Gauss, định lý Kronecker–Capelli, hệ thuần nhất và quy tắc Cramer).",
    previewFormula:
      "$$A^{-1} = \\frac{1}{\\det A}\\operatorname{adj}(A), \\quad [A \\mid I_n] \\sim [I_n \\mid A^{-1}], \\quad x_i = \\frac{\\Delta_i}{\\Delta}$$",
    bannerGradient: "linear-gradient(135deg, #0d9488 0%, #059669 100%)",
    theory: [
      {
        heading:
          "5.1. Định nghĩa ma trận, Các ma trận đặc biệt & Hai ma trận bằng nhau",
        content:
          "• <b>Định nghĩa (Slide 3):</b> Ma trận $A$ cỡ $m \\times n$ trên $\\mathbb{R}$ là bảng $m$ hàng, $n$ cột: $$A = (a_{ij})_{m \\times n} = \\begin{pmatrix} a_{11} & \\cdots & a_{1n} \\\\ \\vdots & & \\vdots \\\\ a_{m1} & \\cdots & a_{mn} \\end{pmatrix},$$ trong đó $a_{ij}$ là phần tử ở hàng $i$, cột $j$. <i>Ví dụ ($3 \\times 4$):</i> $A = \\begin{pmatrix} 1 & 0 & -2 & 3 \\\\ 4 & 5 & 1 & 0 \\\\ -1 & 2 & 6 & 7 \\end{pmatrix}$ có $a_{23} = 1, \\; a_{34} = 7$.<br>" +
          "• <b>Các ma trận đặc biệt (Slides 4 &amp; 5):</b><br>" +
          "- Ma trận hàng: $1 \\times n$ (vd $u = (2 \\; -1 \\; 0 \\; 5)$); ma trận cột: $m \\times 1$ (vd $v = (3, 0, -2)^T$).<br>" +
          "- Ma trận không $O_{m \\times n}$: mọi phần tử đều bằng $0$.<br>" +
          "- Ma trận vuông: $m = n$; đường chéo chính gồm $a_{11}, \\dots, a_{nn}$.<br>" +
          "- Ma trận đường chéo: $a_{ij} = 0$ nếu $i \\neq j$ (vd $D = \\operatorname{diag}(2, -1, 4)$).<br>" +
          "- Ma trận đơn vị $I_n$: các phần tử đường chéo chính bằng $1$ (ngoài đường chéo bằng $0$).<br>" +
          "- Ma trận tam giác trên (dưới): $a_{ij} = 0$ nếu $i > j$ (nếu $i < j$).<br>" +
          "- Ma trận đối xứng: $A^T = A$; phản đối xứng: $A^T = -A$.<br>" +
          "• <b>Hai ma trận bằng nhau (Slide 6):</b> $A = B$ khi và chỉ khi $A, B$ cùng kích thước và $a_{ij} = b_{ij}$ với mọi $i, j$.",
        checkpoint: {
          question:
            "Ví dụ (Slide 6): Cho hai ma trận $3 \\times 4$ là $A = \\begin{pmatrix} 1 & x & 0 & 2 \\\\ -1 & 3 & y & 4 \\\\ 0 & 5 & 2 & 1 \\end{pmatrix}$ và $B = \\begin{pmatrix} 1 & 2 & 0 & 2 \\\\ -1 & 3 & -3 & 4 \\\\ 0 & 5 & 2 & 1 \\end{pmatrix}$. Tìm $x, y$ để $A = B$.",
          rubric: [
            {
              step: "Bước 1 • Kiểm tra kích thước hai ma trận (0.4đ)",
              detail:
                "Cả $A$ và $B$ đều có cùng cỡ $3 \\times 4$, các vị trí còn lại đều đã bằng nhau.",
            },
            {
              step: "Bước 2 • Đồng nhất từng cặp phần tử tương ứng (0.6đ)",
              detail:
                "$A = B \\iff \\begin{cases} a_{12} = b_{12} \\\\ a_{23} = b_{23} \\end{cases} \\iff x = 2, \\; y = -3$.",
            },
          ],
          trap: "Hai ma trận có các phần tử giống nhau nhưng khác kích thước (ví dụ ma trận hàng $1 \\times 3$ và ma trận cột $3 \\times 1$) thì KHÔNG bao giờ bằng nhau!",
        },
      },
      {
        heading: "5.2. Ma trận chuyển vị, Phép cộng ma trận & Nhân với một số",
        content:
          "• <b>Ma trận chuyển vị (Slide 7):</b> Với $A = (a_{ij})_{m \\times n}$, ma trận chuyển vị $A^T$ có cỡ $n \\times m$ và $(A^T)_{ij} = a_{ji}$.<br>" +
          "<i>Ví dụ:</i> $A = \\begin{pmatrix} 1 & 2 & 0 & -1 \\\\ 3 & 4 & 5 & 2 \\\\ 0 & 6 & -2 & 7 \\end{pmatrix}_{3 \\times 4} \\Rightarrow A^T = \\begin{pmatrix} 1 & 3 & 0 \\\\ 2 & 4 & 6 \\\\ 0 & 5 & -2 \\\\ -1 & 2 & 7 \\end{pmatrix}_{4 \\times 3}$.<br>" +
          "<i>Tính chất:</i> $(A^T)^T = A, \\quad (A + B)^T = A^T + B^T, \\quad (AB)^T = B^T A^T$ (khi xác định).<br>" +
          "• <b>Cộng ma trận và nhân với một số (Slide 8):</b> Với $A, B \\in M_{m \\times n}, \\; \\lambda \\in \\mathbb{R}$: $$(A + B)_{ij} = a_{ij} + b_{ij}, \\qquad (\\lambda A)_{ij} = \\lambda a_{ij}.$$" +
          "• <b>Tính chất của phép cộng và nhân vô hướng (Slide 9):</b> Với các ma trận cùng cỡ $A, B, C$ và $\\lambda, \\mu \\in \\mathbb{R}$:<br>" +
          "1) $A + B = B + A$, $\\quad (A + B) + C = A + (B + C)$.<br>" +
          "2) $A + O = A$, $\\quad A + (-A) = O$ (vd $A_{3 \\times 3} + (-A_{3 \\times 3}) = O_3$).<br>" +
          "3) $\\lambda(A + B) = \\lambda A + \\lambda B$, $\\quad (\\lambda + \\mu)A = \\lambda A + \\mu A$.<br>" +
          "4) $\\lambda(\\mu A) = (\\lambda\\mu)A$, $\\quad 1A = A$.",
        checkpoint: {
          question:
            "Ví dụ (Slide 8): Cho $A = \\begin{pmatrix} 1 & 0 & 2 & -1 \\\\ 3 & 4 & 0 & 2 \\\\ -2 & 1 & 5 & 0 \\end{pmatrix}$ và $B = \\begin{pmatrix} 2 & 1 & 0 & 3 \\\\ -1 & 0 & 4 & 1 \\\\ 2 & 3 & -2 & 6 \\end{pmatrix}$. Hãy tính $A + B$ và $2A$.",
          rubric: [
            {
              step: "Bước 1 • Cộng từng phần tử tương ứng để tính A + B (0.5đ)",
              detail:
                "$$A + B = \\begin{pmatrix} 3 & 1 & 2 & 2 \\\\ 2 & 4 & 4 & 3 \\\\ 0 & 4 & 3 & 6 \\end{pmatrix}.$$",
            },
            {
              step: "Bước 2 • Nhân từng phần tử của A với 2 (0.5đ)",
              detail:
                "$$2A = \\begin{pmatrix} 2 & 0 & 4 & -2 \\\\ 6 & 8 & 0 & 4 \\\\ -4 & 2 & 10 & 0 \\end{pmatrix}.$$",
            },
          ],
          trap: "Khi chuyển vị tích hai ma trận, nhớ đảo ngược thứ tự: $(AB)^T = B^T A^T$ (không phải $A^T B^T$).",
        },
      },
      {
        heading: "5.3. Phép nhân hai ma trận & Tính chất phép nhân",
        content:
          "• <b>Định nghĩa nhân hai ma trận (Slide 10):</b> Nếu $A \\in M_{m \\times n}, \\; B \\in M_{n \\times p}$ thì $AB \\in M_{m \\times p}$ và: $$(AB)_{ij} = \\sum_{k=1}^{n} a_{ik}b_{kj}.$$ <i>Chú ý:</i> số cột của $A$ phải bằng số hàng của $B$.<br>" +
          "<i>Ví dụ:</i> Với $A = \\begin{pmatrix} 1 & 2 & 0 \\\\ 0 & -1 & 3 \\end{pmatrix}_{2 \\times 3}$ và $B = \\begin{pmatrix} 2 & 1 & 0 & 4 \\\\ 1 & 0 & -2 & 1 \\\\ 3 & 2 & 1 & 0 \\end{pmatrix}_{3 \\times 4}$ thì $AB = \\begin{pmatrix} 4 & 1 & -4 & 6 \\\\ 8 & 6 & 5 & -1 \\end{pmatrix}_{2 \\times 4}$.<br>" +
          "• <b>Tính chất phép nhân ma trận (Slide 12):</b> Khi các phép toán xác định:<br>" +
          "- $(AB)C = A(BC)$, $\\quad A(B + C) = AB + AC$, $\\quad (A + B)C = AC + BC$.<br>" +
          "- $\\lambda(AB) = (\\lambda A)B = A(\\lambda B)$, $\\quad I_m A = A$, $\\quad A I_n = A$ ($A \\in M_{m \\times n}$).<br>" +
          "- <b>Lưu ý:</b> Nói chung $AB \\neq BA$; từ $AB = AC$ không luôn suy ra $B = C$. <i>Ví dụ:</i> $A = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}, \\; B = \\begin{pmatrix} 1 & 0 \\\\ 1 & 1 \\end{pmatrix} \\Rightarrow AB = \\begin{pmatrix} 2 & 1 \\\\ 1 & 1 \\end{pmatrix} \\neq BA = \\begin{pmatrix} 1 & 1 \\\\ 1 & 2 \\end{pmatrix}$.",
        checkpoint: {
          question:
            "Ví dụ chữ nhật (Slide 11): Cho $A = \\begin{pmatrix} 1 & 0 & 2 & -1 \\\\ 2 & 1 & 0 & 3 \\\\ 0 & -2 & 1 & 1 \\end{pmatrix}_{3 \\times 4}$ và $B = \\begin{pmatrix} 1 & 2 & 0 & 1 & -1 \\\\ 0 & 1 & 3 & 0 & 2 \\\\ 2 & 0 & 1 & -1 & 1 \\\\ 1 & 1 & 0 & 2 & 0 \\end{pmatrix}_{4 \\times 5}$. Kiểm tra $(AB)_{11}, \\; (AB)_{25}$ và tính toàn bộ hàng thứ ba của $AB$.",
          rubric: [
            {
              step: "Bước 1 • Kiểm tra cỡ AB và tính (AB)₁₁, (AB)₂₅ (0.4đ)",
              detail:
                "$AB$ có cỡ $3 \\times 5$. Ta có $(AB)_{11} = 1 \\cdot 1 + 0 \\cdot 0 + 2 \\cdot 2 + (-1) \\cdot 1 = 4$ và $(AB)_{25} = 2(-1) + 1 \\cdot 2 + 0 \\cdot 1 + 3 \\cdot 0 = 0$.",
            },
            {
              step: "Bước 2 • Nhân hàng 3 của A lần lượt với 5 cột của B (0.6đ)",
              detail:
                "Hàng 3 của $A$ là $(0, -2, 1, 1)$:<br>" +
                "- $(AB)_{31} = 0(1) - 2(0) + 1(2) + 1(1) = 3$;<br>" +
                "- $(AB)_{32} = 0(2) - 2(1) + 1(0) + 1(1) = -1$;<br>" +
                "- $(AB)_{33} = 0(0) - 2(3) + 1(1) + 1(0) = -5$;<br>" +
                "- $(AB)_{34} = 0(1) - 2(0) + 1(-1) + 1(2) = 1$;<br>" +
                "- $(AB)_{35} = 0(-1) - 2(2) + 1(1) + 1(0) = -3$.<br>" +
                "Vậy hàng thứ ba của $AB$ là $(3, \\; -1, \\; -5, \\; 1, \\; -3)$.",
            },
          ],
          trap: "Luôn kiểm tra điều kiện số cột ma trận trái bằng số hàng ma trận phải trước khi nhân; kết quả tích có số hàng của ma trận trái và số cột của ma trận phải.",
        },
      },
      {
        heading:
          "5.4. Định thức: Khái niệm, Phần bù đại số & Khai triển Laplace",
        content:
          "• <b>Định thức các cấp đầu tiên (Slide 14):</b> Định thức chỉ định nghĩa cho ma trận vuông $A$ cấp $n$, ký hiệu $\\det A$ hoặc $|A|$ (không định nghĩa cho ma trận chữ nhật). Cấp 1: $\\det(a) = a$; Cấp 2: $\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc$ (vd $\\det\\begin{pmatrix} 3 & -2 \\\\ 4 & 1 \\end{pmatrix} = 11$).<br>" +
          "• <b>Ma trận con và phần bù đại số (Slide 15):</b> Với $A = (a_{ij})$ vuông cấp $n \\ge 2$: $A_{ij}$ là ma trận cấp $n - 1$ thu được bằng cách xóa hàng $i$, cột $j$; $M_{ij} = \\det A_{ij}$ là <b>định thức con</b>; $C_{ij} = (-1)^{i+j} M_{ij}$ là <b>phần bù đại số</b> của $a_{ij}$. Bảng dấu cấp 3: $\\begin{pmatrix} + & - & + \\\\ - & + & - \\\\ + & - & + \\end{pmatrix}$.<br>" +
          "• <b>Định nghĩa quy nạp theo hàng 1 (Slides 16 &amp; 17):</b> $\\det(a_{11}) = a_{11}$; với $n \\ge 2$: $$\\det A = \\sum_{j=1}^{n} (-1)^{1+j} a_{1j} \\det A_{1j}.$$" +
          "<i>Ví dụ 1:</i> $\\det\\begin{pmatrix} 1 & 2 & -1 \\\\ 0 & 3 & 4 \\\\ 2 & 1 & 0 \\end{pmatrix} = 1\\begin{vmatrix} 3 & 4 \\\\ 1 & 0 \\end{vmatrix} - 2\\begin{vmatrix} 0 & 4 \\\\ 2 & 0 \\end{vmatrix} + (-1)\\begin{vmatrix} 0 & 3 \\\\ 2 & 1 \\end{vmatrix} = 1(-4) - 2(-8) + (-1)(-6) = 18$.<br>" +
          "• <b>Định lý khai triển Laplace (Slide 18):</b> Với mọi hàng $i$ và mọi cột $j$: $$\\det A = \\sum_{k=1}^{n} a_{ik} C_{ik} = \\sum_{k=1}^{n} a_{kj} C_{kj}.$$" +
          "<i>Ví dụ:</i> $A = \\begin{pmatrix} 2 & 0 & 1 \\\\ 0 & 3 & 0 \\\\ 4 & 0 & -1 \\end{pmatrix}$, khai triển theo hàng 2: $\\det A = 3(-1)^{2+2}\\begin{vmatrix} 2 & 1 \\\\ 4 & -1 \\end{vmatrix} = -18$. <i>Kinh nghiệm:</i> chọn hàng/cột nhiều số $0$ nhất.",
        checkpoint: {
          question:
            "Ví dụ 2 (Slide 19): Tính định thức cấp 4 sau bằng khai triển Laplace theo cột có nhiều số $0$: $A = \\begin{pmatrix} 1 & 0 & 2 & 3 \\\\ 0 & 4 & 0 & 1 \\\\ 2 & 0 & 1 & 0 \\\\ 1 & 0 & -1 & 2 \\end{pmatrix}$.",
          rubric: [
            {
              step: "Bước 1 • Khai triển Laplace theo cột 2 (0.5đ)",
              detail:
                "Cột 2 chỉ có đúng một phần tử khác $0$ là $a_{22} = 4$ (dấu $(-1)^{2+2} = +1$): $$\\det A = 4 \\begin{vmatrix} 1 & 2 & 3 \\\\ 2 & 1 & 0 \\\\ 1 & -1 & 2 \\end{vmatrix}.$$",
            },
            {
              step: "Bước 2 • Khai triển định thức cấp 3 theo hàng đầu và kết luận (0.5đ)",
              detail:
                "$\\begin{vmatrix} 1 & 2 & 3 \\\\ 2 & 1 & 0 \\\\ 1 & -1 & 2 \\end{vmatrix} = 1(2) - 2(4) + 3(-3) = -15$. Vậy $\\det A = 4 \\cdot (-15) = -60$.",
            },
          ],
          trap: "Rất hay nhầm dấu $(-1)^{i+j}$ khi khai triển theo hàng chẵn hoặc cột chẵn (ví dụ phần tử $(2, 1)$ hay $(2, 3)$ phải có dấu trừ đứng trước!).",
        },
      },
      {
        heading:
          "5.5. Biến đổi sơ cấp, Tính chất đại số & Đưa về tam giác trên",
        content:
          "• <b>Ba phép biến đổi sơ cấp hàng và định thức (Slide 20):</b><br>" +
          "1) $R_i \\leftrightarrow R_j$: định thức <b>đổi dấu</b>.<br>" +
          "2) $R_i \\leftarrow \\lambda R_i \\; (\\lambda \\neq 0)$: định thức <b>nhân với $\\lambda$</b>.<br>" +
          "3) $R_i \\leftarrow R_i + \\lambda R_j \\; (i \\neq j)$: định thức <b>không đổi</b>.<br>" +
          "• <b>Hệ quả những định thức bằng $0$ (Slide 21):</b> Một hàng/cột toàn số $0$; có hai hàng/cột bằng nhau; có hai hàng/cột tỉ lệ; tổng quát là các hàng (hoặc cột) phụ thuộc tuyến tính $\\Rightarrow \\det A = 0$ (đúng cả cho cột vì $\\det A^T = \\det A$).<br>" +
          "• <b>Các tính chất đại số (Slide 22):</b> Với $A, B$ vuông cùng cấp $n$ và $\\lambda \\in \\mathbb{R}$: $$\\det A^T = \\det A, \\qquad \\det(AB) = \\det A \\cdot \\det B, \\qquad \\det(\\lambda A) = \\lambda^n \\det A.$$ Nếu $A$ tam giác trên hoặc dưới: $\\det A = a_{11}a_{22}\\cdots a_{nn}$. <i>Cảnh báo:</i> Nói chung $\\det(A + B) \\neq \\det A + \\det B$ (vd $A = B = I_2$ thì $\\det(A+B) = 4 \\neq 2$).<br>" +
          "• <b>Đưa về dạng tam giác trên (Slides 23–25):</b> Dùng $R_i \\leftarrow R_i + \\lambda R_j$ để tạo các số $0$ dưới đường chéo chính. Nếu $A \\to U$ (tam giác trên) qua $s$ lần đổi hàng và các hệ số nhân hàng tích lại bằng $p$ thì: $$\\det A = (-1)^s \\frac{\\det U}{p}.$$" +
          "<i>Ví dụ 3 &amp; 4:</i> $\\begin{pmatrix} 1 & 2 & 1 \\\\ 2 & 5 & 3 \\\\ 1 & 0 & 2 \\end{pmatrix} \\to \\begin{pmatrix} 1 & 2 & 1 \\\\ 0 & 1 & 1 \\\\ 0 & 0 & 3 \\end{pmatrix} \\Rightarrow \\det = 3$; $\\quad \\begin{pmatrix} 0 & 1 & 2 & 0 \\\\ 1 & 2 & 0 & 1 \\\\ 0 & 2 & 3 & 1 \\\\ 0 & 0 & 1 & 2 \\end{pmatrix} \\xrightarrow{R_1 \\leftrightarrow R_2} \\dots \\to \\begin{pmatrix} 1 & 2 & 0 & 1 \\\\ 0 & 1 & 2 & 0 \\\\ 0 & 0 & -1 & 1 \\\\ 0 & 0 & 0 & 3 \\end{pmatrix} \\Rightarrow \\det = -[1 \\cdot 1 \\cdot (-1) \\cdot 3] = 3$.",
        checkpoint: {
          question:
            "Bài tập trên lớp (Slide 26): Tính định thức $\\det \\begin{pmatrix} 1 & 0 & 2 \\\\ 2 & 3 & 1 \\\\ 0 & 1 & -1 \\end{pmatrix}$ bằng hai cách (Khai triển Laplace và Khử Gauss).",
          rubric: [
            {
              step: "Bước 1 • Cách 1: Khai triển Laplace theo hàng 1 (0.5đ)",
              detail:
                "$\\det A = 1\\begin{vmatrix} 3 & 1 \\\\ 1 & -1 \\end{vmatrix} - 0 + 2\\begin{vmatrix} 2 & 3 \\\\ 0 & 1 \\end{vmatrix} = 1(-3 - 1) + 2(2) = -4 + 4 = 0$.",
            },
            {
              step: "Bước 2 • Cách 2: Khử Gauss đưa về tam giác trên (0.5đ)",
              detail:
                "Thực hiện $R_2 \\leftarrow R_2 - 2R_1$: $\\begin{pmatrix} 1 & 0 & 2 \\\\ 0 & 3 & -3 \\\\ 0 & 1 & -1 \\end{pmatrix} \\xrightarrow{R_3 \\leftarrow R_3 - \\frac{1}{3}R_2} \\begin{pmatrix} 1 & 0 & 2 \\\\ 0 & 3 & -3 \\\\ 0 & 0 & 0 \\end{pmatrix}$. Do đó $\\det A = 1 \\cdot 3 \\cdot 0 = 0$.",
            },
          ],
          trap: "Khi thực hiện phép cộng bội hàng dạng $R_i \\leftarrow 3R_i - R_j$ (nhân thêm $3$ vào hàng đang biến đổi $R_i$), giá trị định thức đã bị nhân thêm $3$ nên kết quả phải chia lại cho $3$! Tốt nhất luôn giữ hệ số của $R_i$ bằng $1$: $R_i \\leftarrow R_i + \\lambda R_j$.",
        },
      },
      {
        heading:
          "5.6. Ma trận nghịch đảo: Định nghĩa, Tính duy nhất, Điều kiện & Tính chất",
        content:
          "• <b>Định nghĩa (Slide 27):</b> Ma trận vuông $A$ cấp $n$ gọi là <b>khả nghịch</b> nếu tồn tại ma trận vuông $B$ cùng cấp sao cho $AB = BA = I_n$. Khi đó $B$ là ma trận nghịch đảo của $A$, ký hiệu $A^{-1}$. <i>(Chú ý: chỉ xét nghịch đảo hai phía cho ma trận vuông).</i><br>" +
          "• <b>Tính duy nhất (Slide 28):</b> Nếu $A$ khả nghịch thì nghịch đảo của $A$ là duy nhất. <i>Chứng minh ngắn:</i> Nếu $B, C$ đều là nghịch đảo của $A$ thì $B = BI_n = B(AC) = (BA)C = I_n C = C$.<br>" +
          "• <b>Điều kiện tồn tại (Slide 29):</b> Với ma trận vuông $A$ cấp $n$, các điều kiện sau tương đương: $$A \\text{ khả nghịch} \\iff \\det A \\neq 0 \\iff \\operatorname{rank} A = n.$$" +
          "• <b>Các tính chất quan trọng (Slide 30):</b> Nếu $A, B$ vuông cùng cấp khả nghịch, $\\lambda \\neq 0$: $$(A^{-1})^{-1} = A, \\qquad (AB)^{-1} = B^{-1}A^{-1}, \\qquad (A^T)^{-1} = (A^{-1})^T,$$ $$(\\lambda A)^{-1} = \\lambda^{-1}A^{-1}, \\qquad \\det(A^{-1}) = \\frac{1}{\\det A}, \\qquad (A^k)^{-1} = (A^{-1})^k \\; (k \\ge 1).$$" +
          "<i>Lưu ý thứ tự:</i> $(AB)^{-1} = B^{-1}A^{-1}$, không phải $A^{-1}B^{-1}$.",
        checkpoint: {
          question:
            "Ví dụ (Slide 30): Cho ma trận $A = \\begin{pmatrix} 1 & 2 & 0 \\\\ 0 & 1 & 1 \\\\ 0 & 0 & 4 \\end{pmatrix}$. Tính $\\det(A^{-1})$ và $\\det((2A)^{-1})$.",
          rubric: [
            {
              step: "Bước 1 • Tính det A và det(A⁻¹) (0.5đ)",
              detail:
                "Vì $A$ là ma trận tam giác trên cấp $n = 3$ nên $\\det A = 1 \\cdot 1 \\cdot 4 = 4 \\neq 0$. Do đó $\\det(A^{-1}) = \\frac{1}{\\det A} = \\frac{1}{4}$.",
            },
            {
              step: "Bước 2 • Tính det((2A)⁻¹) (0.5đ)",
              detail:
                "Ta có $\\det(2A) = 2^3 \\det A = 8 \\cdot 4 = 32$, suy ra $\\det((2A)^{-1}) = \\frac{1}{\\det(2A)} = \\frac{1}{32}$.",
            },
          ],
          trap: "Đừng quên $A$ cấp $3$ nên $\\det(2A) = 2^3 \\det A = 8 \\det A$, dẫn đến $\\det((2A)^{-1}) = \\frac{1}{8}\\det(A^{-1}) = \\frac{1}{32}$.",
        },
      },
      {
        heading:
          "5.7. Hai phương pháp tìm ma trận nghịch đảo (Phụ hợp & Gauss–Jordan)",
        content:
          "• <b>Phương pháp 1 – Công thức định thức và phụ hợp (Slides 31–34):</b> Với $\\det A \\neq 0$, đặt $C_{ij} = (-1)^{i+j}\\det A_{ij}$, $C = (C_{ij})$, $\\operatorname{adj}(A) = C^T$: $$A^{-1} = \\frac{1}{\\det A}\\operatorname{adj}(A).$$" +
          "<i>Quy trình 4 bước:</i> (1) Tính $\\Delta = \\det A \\neq 0$; (2) Tính đủ $n^2$ phần bù đại số $C_{ij}$; (3) Chuyển vị $C$ lập $\\operatorname{adj}(A) = C^T$; (4) Chia cho $\\Delta$.<br>" +
          "<i>Ví dụ 1 (cấp 3):</i> $A = \\begin{pmatrix} 1 & 2 & 0 \\\\ 0 & 1 & 1 \\\\ 1 & 0 & 1 \\end{pmatrix}$ có $\\det A = 3$, ma trận phần bù $C = \\begin{pmatrix} 1 & 1 & -1 \\\\ -2 & 1 & 2 \\\\ 2 & -1 & 1 \\end{pmatrix} \\Rightarrow A^{-1} = \\frac{1}{3}\\begin{pmatrix} 1 & -2 & 2 \\\\ 1 & 1 & -1 \\\\ -1 & 2 & 1 \\end{pmatrix}$.<br>" +
          "• <b>Phương pháp 2 – Gauss–Jordan trên ma trận ghép (Slides 35–39):</b> Viết $[A \\mid I_n]$ và biến đổi sơ cấp <b>trên toàn bộ hàng</b>: $$[A \\mid I_n] \\sim [I_n \\mid A^{-1}].$$ Nếu khối trái xuất hiện hàng $0$ (không đưa được về $I_n$) thì $A$ suy biến, không khả nghịch (như $C = \\begin{pmatrix} 1 & 2 & 0 \\\\ 2 & 4 & 0 \\\\ 0 & 1 & 1 \\end{pmatrix}$ có $R_2 = 2R_1$).<br>" +
          "• <b>So sánh hai cách (Slide 40):</b> Định thức–phụ hợp minh họa tốt cấu trúc đại số; Gauss–Jordan không cần tính $n^2$ định thức con nên hiệu quả cho cấp lớn. Cả hai đều kiểm tra lại bằng $AA^{-1} = I_n$.",
        checkpoint: {
          question:
            "Ví dụ 2 (Slides 36–38): Tìm ma trận nghịch đảo của $B = \\begin{pmatrix} 1 & 1 & 0 \\\\ 1 & 2 & 1 \\\\ 0 & 1 & 2 \\end{pmatrix}$ bằng phương pháp Gauss–Jordan.",
          rubric: [
            {
              step: "Bước 1 • Khử xuôi đưa khối trái về tam giác trên (0.5đ)",
              detail:
                "$[B \\mid I_3] = \\left[\\begin{array}{ccc|ccc} 1 & 1 & 0 & 1 & 0 & 0 \\\\ 1 & 2 & 1 & 0 & 1 & 0 \\\\ 0 & 1 & 2 & 0 & 0 & 1 \\end{array}\\right] \\xrightarrow{R_2 \\leftarrow R_2 - R_1} \\left[\\begin{array}{ccc|ccc} 1 & 1 & 0 & 1 & 0 & 0 \\\\ 0 & 1 & 1 & -1 & 1 & 0 \\\\ 0 & 1 & 2 & 0 & 0 & 1 \\end{array}\\right] \\xrightarrow{R_3 \\leftarrow R_3 - R_2} \\left[\\begin{array}{ccc|ccc} 1 & 1 & 0 & 1 & 0 & 0 \\\\ 0 & 1 & 1 & -1 & 1 & 0 \\\\ 0 & 0 & 1 & 1 & -1 & 1 \\end{array}\\right]$.",
            },
            {
              step: "Bước 2 • Khử ngược đưa khối trái về I₃ và đọc B⁻¹ (0.5đ)",
              detail:
                "Tiếp tục $R_2 \\leftarrow R_2 - R_3$ rồi $R_1 \\leftarrow R_1 - R_2$: $$\\left[\\begin{array}{ccc|ccc} 1 & 0 & 0 & 3 & -2 & 1 \\\\ 0 & 1 & 0 & -2 & 2 & -1 \\\\ 0 & 0 & 1 & 1 & -1 & 1 \\end{array}\\right] \\Rightarrow B^{-1} = \\begin{pmatrix} 3 & -2 & 1 \\\\ -2 & 2 & -1 \\\\ 1 & -1 & 1 \\end{pmatrix}.$$",
            },
          ],
          trap: "Khi dùng Gauss–Jordan tìm $A^{-1}$, tuyệt đối chỉ biến đổi sơ cấp theo HÀNG (không dùng biến đổi cột) và luôn kiểm tra lại tích $AA^{-1} = I_n$.",
        },
      },
      {
        heading: "5.8. Hạng của ma trận & Ma trận dạng bậc thang dòng",
        content:
          "• <b>Định nghĩa hạng (Slide 41):</b> Ma trận con cấp $k$ của $A$ là ma trận vuông cấp $k$ chọn từ $k$ hàng, $k$ cột; định thức của nó gọi là định thức con cấp $k$. $$\\operatorname{rank} A = \\max\\{k : \\text{tồn tại định thức con cấp } k \\neq 0\\}.$$ Quy ước $\\operatorname{rank} O = 0$; luôn có $0 \\le \\operatorname{rank} A \\le \\min(m, n)$.<br>" +
          "• <b>Ma trận dạng bậc thang dòng (Slide 42):</b> (1) Các hàng bằng $0$ nằm dưới cùng; (2) Phần tử khác $0$ đầu tiên (<i>pivot</i>) của mỗi hàng khác $0$ nằm bên phải pivot của hàng phía trên. <i>(Dạng bậc thang rút gọn còn yêu cầu pivot bằng $1$ và là phần tử khác $0$ duy nhất trong cột pivot).</i><br>" +
          "• <b>Hai định lý cơ bản về hạng (Slide 43):</b> (1) Mọi ma trận trên $\\mathbb{R}$ đều đưa được về dạng bậc thang dòng sau hữu hạn phép biến đổi sơ cấp trên dòng; (2) Các phép biến đổi sơ cấp trên dòng không làm thay đổi hạng ma trận. <i>Hệ quả:</i> Hạng bằng số hàng khác $0$ của một dạng bậc thang dòng.",
        checkpoint: {
          question:
            "Ví dụ 4 × 5 (Slide 44): Tìm hạng của ma trận $A = \\begin{pmatrix} 1 & 2 & 0 & 1 & 3 \\\\ 2 & 4 & 1 & 3 & 7 \\\\ 0 & 1 & 1 & 0 & 2 \\\\ 1 & 3 & 1 & 1 & 5 \\end{pmatrix}$ bằng khử Gauss.",
          rubric: [
            {
              step: "Bước 1 • Khử cột 1 và đổi hàng đưa về dạng bậc thang (0.6đ)",
              detail:
                "Thực hiện $R_2 \\leftarrow R_2 - 2R_1$ và $R_4 \\leftarrow R_4 - R_1$: $\\begin{pmatrix} 1 & 2 & 0 & 1 & 3 \\\\ 0 & 0 & 1 & 1 & 1 \\\\ 0 & 1 & 1 & 0 & 2 \\\\ 0 & 1 & 1 & 0 & 2 \\end{pmatrix} \\xrightarrow{R_2 \\leftrightarrow R_3} \\begin{pmatrix} 1 & 2 & 0 & 1 & 3 \\\\ 0 & 1 & 1 & 0 & 2 \\\\ 0 & 0 & 1 & 1 & 1 \\\\ 0 & 1 & 1 & 0 & 2 \\end{pmatrix}$.",
            },
            {
              step: "Bước 2 • Khử tiếp hàng 4 và đếm số hàng khác 0 (0.4đ)",
              detail:
                "Thực hiện $R_4 \\leftarrow R_4 - R_2$: $\\begin{pmatrix} 1 & 2 & 0 & 1 & 3 \\\\ 0 & 1 & 1 & 0 & 2 \\\\ 0 & 0 & 1 & 1 & 1 \\\\ 0 & 0 & 0 & 0 & 0 \\end{pmatrix}$. Ma trận bậc thang có $3$ hàng khác $0$, vậy $\\operatorname{rank} A = 3$.",
            },
          ],
          trap: "Đừng quên đổi chỗ hai hàng (như $R_2 \\leftrightarrow R_3$) khi phần tử ở vị trí pivot bằng $0$ mà hàng dưới có phần tử khác $0$ đứng bên trái hơn!",
        },
      },
      {
        heading:
          "6.1. Hệ phương trình tuyến tính tổng quát & Biến đổi tương đương",
        content:
          "• <b>Hệ PTTT tổng quát (Slides 46 &amp; 47):</b> Hệ $m$ phương trình, $n$ ẩn viết dưới dạng ma trận là $$AX = b,$$ với $A = (a_{ij})_{m \\times n}$ (ma trận hệ số), $X = (x_1, \\dots, x_n)^T$, $b = (b_1, \\dots, b_m)^T$ (ma trận cột hệ số tự do), và $[A \\mid b]$ là <b>ma trận hệ số bổ sung (ma trận mở rộng)</b>.<br>" +
          "• <b>Nghiệm và các khả năng nghiệm (Slide 48):</b> Một nghiệm là bộ $X_0 \\in \\mathbb{R}^n$ thỏa $AX_0 = b$. Hệ luôn rơi vào đúng 1 trong 3 khả năng: <b>vô nghiệm</b> (vd $x+y=2, \\; 2x+2y=5$), <b>nghiệm duy nhất</b> (vd $x+y=2, \\; x-y=0$), hoặc <b>vô số nghiệm</b> (vd $x+y=2, \\; 2x+2y=4$).<br>" +
          "• <b>Biến đổi tương đương hệ phương trình (Slide 49):</b> Hai hệ tương đương nếu có cùng tập nghiệm. Ba phép biến đổi tương đương (đổi chỗ hai phương trình; nhân một phương trình với $\\lambda \\neq 0$; cộng vào một phương trình $\\lambda$ lần phương trình khác) tương ứng đúng với ba phép biến đổi sơ cấp hàng trên $[A \\mid b]$.",
        checkpoint: {
          question:
            "Ví dụ khử Gauss (Slide 50): Giải hệ $3$ phương trình, $3$ ẩn: $\\begin{cases} x + y + z = 6 \\\\ 2x + y - z = 1 \\\\ x - y + 2z = 5. \\end{cases}$",
          rubric: [
            {
              step: "Bước 1 • Lập ma trận bổ sung [A | b] và khử về bậc thang (0.6đ)",
              detail:
                "$\\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\\\ 2 & 1 & -1 & 1 \\\\ 1 & -1 & 2 & 5 \\end{array}\\right] \\xrightarrow{\\substack{R_2 \\leftarrow R_2 - 2R_1 \\\\ R_3 \\leftarrow R_3 - R_1}} \\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\\\ 0 & -1 & -3 & -11 \\\\ 0 & -2 & 1 & -1 \\end{array}\\right] \\xrightarrow{R_3 \\leftarrow R_3 - 2R_2} \\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 6 \\\\ 0 & -1 & -3 & -11 \\\\ 0 & 0 & 7 & 21 \\end{array}\\right]$.",
            },
            {
              step: "Bước 2 • Thế ngược từ dưới lên (0.4đ)",
              detail:
                "Từ hàng 3: $7z = 21 \\Rightarrow z = 3$. Từ hàng 2: $-y - 3(3) = -11 \\Rightarrow y = 2$. Từ hàng 1: $x + 2 + 3 = 6 \\Rightarrow x = 1$.",
            },
          ],
          trap: "Khi thực hiện phép biến đổi sơ cấp trên ma trận mở rộng $[A \\mid b]$, luôn phải biến đổi cả phần tử ở cột vế phải $b$ đi kèm!",
        },
      },
      {
        heading:
          "6.2. Định lý Kronecker–Capelli & Biện luận các trường hợp nghiệm",
        content:
          "• <b>Định lý Kronecker–Capelli (Slide 51):</b> Đặt $r = \\operatorname{rank} A$, $\\bar{r} = \\operatorname{rank}[A \\mid b]$, số ẩn là $n$. Hệ $AX = b$ có nghiệm $\\iff r = \\bar{r}$.<br>" +
          "- Nếu $r < \\bar{r}$: <b>vô nghiệm</b> (vd hệ $x+y=1, \\; 2x+2y=2, \\; x+y=3$ có $r = 1 < \\bar{r} = 2$).<br>" +
          "- Nếu $r = \\bar{r} = n$: <b>nghiệm duy nhất</b> (vd hệ 4 PT, 3 ẩn Slide 53 có $\\det A_0 = 4 \\neq 0$ và PT4 = $2\\times$PT1 nên $r = \\bar{r} = 3 = n$, nghiệm $(1, 1, 1)$).<br>" +
          "- Nếu $r = \\bar{r} < n$: <b>vô số nghiệm</b>, có $n - r$ ẩn tự do.",
        checkpoint: {
          question:
            "Ví dụ vô số nghiệm (Slide 54): Giải hệ $2$ phương trình, $4$ ẩn $\\begin{cases} x_1 + x_2 + x_3 + x_4 = 2, \\\\ 2x_1 + 2x_2 - x_3 + x_4 = 1. \\end{cases}$",
          rubric: [
            {
              step: "Bước 1 • Khử Gauss trên [A | b] và xác định số ẩn tự do (0.5đ)",
              detail:
                "$\\left[\\begin{array}{cccc|c} 1 & 1 & 1 & 1 & 2 \\\\ 2 & 2 & -1 & 1 & 1 \\end{array}\\right] \\xrightarrow{R_2 \\leftarrow R_2 - 2R_1} \\left[\\begin{array}{cccc|c} 1 & 1 & 1 & 1 & 2 \\\\ 0 & 0 & -3 & -1 & -3 \\end{array}\\right]$.<br>Có $\\operatorname{rank} A = \\operatorname{rank}[A \\mid b] = 2 < 4$, nên hệ có $4 - 2 = 2$ ẩn tự do.",
            },
            {
              step: "Bước 2 • Gán tham số s, t và giải nghiệm tổng quát (0.5đ)",
              detail:
                "Cột trụ là cột 1 ($x_1$) và cột 3 ($x_3$), nên đặt $x_2 = s, \\; x_4 = t$ ($s, t \\in \\mathbb{R}$). Suy ra: $$x_3 = 1 - \\frac{t}{3}, \\qquad x_1 = 1 - s - \\frac{2t}{3}, \\qquad s, t \\in \\mathbb{R}.$$",
            },
          ],
          trap: "Số ẩn tự do bằng $n - r$ (số ẩn trừ hạng), còn các ẩn cơ sở tương ứng với các CỘT CHỨA PIVOT chứ không phải lúc nào cũng là $r$ ẩn đầu tiên!",
        },
      },
      {
        heading: "6.3. Hệ phương trình tuyến tính thuần nhất AX = 0",
        content:
          "• <b>Khái niệm (Slide 55):</b> Hệ thuần nhất $AX = 0$ (mọi hệ số tự do bằng $0$) luôn có nghiệm <b>tầm thường</b> $X = 0$. Nghiệm $X \\neq 0$ gọi là nghiệm <b>không tầm thường</b>.<br>" +
          "• <b>Điều kiện cần và đủ:</b> Hệ thuần nhất $m$ phương trình, $n$ ẩn có nghiệm không tầm thường $\\iff \\operatorname{rank} A < n$.<br>" +
          "<i>Đặc biệt:</i> Nếu $m < n$ (ít phương trình hơn số ẩn) thì luôn có nghiệm không tầm thường; nếu $A$ vuông cấp $n$ thì điều kiện tương đương $\\det A = 0$.",
        checkpoint: {
          question:
            "Ví dụ (Slide 56): Giải và tìm một nghiệm không tầm thường của hệ $\\begin{cases} x + y + z = 0, \\\\ 2x + 2y + 2z = 0, \\end{cases}$ và đối chiếu với hệ $\\begin{cases} x + y = 0 \\\\ x - y = 0. \\end{cases}$",
          rubric: [
            {
              step: "Bước 1 • Giải hệ 2 phương trình, 3 ẩn (0.6đ)",
              detail:
                "Ma trận $A = \\begin{pmatrix} 1 & 1 & 1 \\\\ 2 & 2 & 2 \\end{pmatrix}$ có $\\operatorname{rank} A = 1 < 3$, nên tồn tại nghiệm không tầm thường. Đặt $y = s, \\; z = t \\; (s, t \\in \\mathbb{R}) \\Rightarrow x = -s - t$. Chẳng hạn $(x, y, z) = (-1, 1, 0)$ là một nghiệm không tầm thường.",
            },
            {
              step: "Bước 2 • Đối chiếu với hệ vuông 2 × 2 (0.4đ)",
              detail:
                "Hệ $\\begin{cases} x + y = 0 \\\\ x - y = 0 \\end{cases}$ có $\\det A = -2 \\neq 0$ ($\\operatorname{rank} A = 2 = n$), nên chỉ có nghiệm tầm thường $(0, 0)$.",
            },
          ],
          trap: "Hệ thuần nhất $AX = 0$ không bao giờ vô nghiệm; nên không cần xét hạng ma trận mở rộng $[A \\mid 0]$ vì luôn bằng hạng của $A$.",
        },
      },
      {
        heading: "6.4. Hệ Cramer, So sánh ba phương pháp & Tổng kết Chương 5–6",
        content:
          "• <b>Hệ Cramer (Slide 57):</b> Hệ $n$ phương trình, $n$ ẩn $AX = b$ gọi là <b>hệ Cramer</b> khi $\\det A \\neq 0$. Ký hiệu $\\Delta = \\det A$ và $\\Delta_i$ là định thức thay cột $i$ của $A$ bằng $b$: $$x_i = \\frac{\\Delta_i}{\\Delta}, \\qquad i = 1, \\dots, n.$$" +
          "<i>Ví dụ cấp 2:</i> $\\begin{cases} 2x + y = 5 \\\\ x - y = 1 \\end{cases} \\Rightarrow \\Delta = -3, \\; \\Delta_1 = -6, \\; \\Delta_2 = -3 \\Rightarrow (x, y) = (2, 1)$.<br>" +
          "<i>Lưu ý:</i> Nếu $\\Delta = 0$, không dùng được quy tắc Cramer để chia cho $\\Delta$; cần xét hạng để phân loại hệ.<br>" +
          "• <b>So sánh ba phương pháp giải hệ (Slide 59):</b><br>" +
          "1) <b>Gauss / Gauss–Jordan:</b> Hệ bất kỳ $m \\times n$ — tìm nghiệm, tham số và phát hiện mâu thuẫn.<br>" +
          "2) <b>Kronecker–Capelli:</b> Hệ bất kỳ $m \\times n$ — phân loại số nghiệm theo hạng.<br>" +
          "3) <b>Cramer:</b> $m = n, \\; \\det A \\neq 0$ — công thức tường minh từng ẩn (hệ $3$ PT, $5$ ẩn không dùng được Cramer).<br>" +
          "• <b>Tổng kết và lưu ý khi làm bài (Slide 61):</b> Kiểm tra kích thước trước khi cộng/nhân ma trận; ưu tiên tạo số $0$ bằng phép cộng bội hàng khi tính định thức; kiểm tra $\\det A \\neq 0$ và đối chiếu $AA^{-1} = I$ khi tìm nghịch đảo; đếm hàng khác $0$ dạng bậc thang khi tìm hạng; khử Gauss trên ma trận bổ sung và đối chiếu Capelli khi giải hệ.",
        checkpoint: {
          question:
            "Ví dụ hệ Cramer cấp 3 (Slide 58): Dùng quy tắc Cramer giải hệ $\\begin{cases} x + y + z = 6 \\\\ x + y - z = 0 \\\\ x - y + z = 2. \\end{cases}$",
          rubric: [
            {
              step: "Bước 1 • Tính Δ = det A và kiểm tra Δ ≠ 0 (0.4đ)",
              detail:
                "$A = \\begin{pmatrix} 1 & 1 & 1 \\\\ 1 & 1 & -1 \\\\ 1 & -1 & 1 \\end{pmatrix}$, $b = \\begin{pmatrix} 6 \\\\ 0 \\\\ 2 \\end{pmatrix}$. Tính được $\\Delta = \\det A = -4 \\neq 0$.",
            },
            {
              step: "Bước 2 • Tính Δ₁, Δ₂, Δ₃ và suy ra nghiệm (0.6đ)",
              detail:
                "$\\Delta_1 = \\begin{vmatrix} 6 & 1 & 1 \\\\ 0 & 1 & -1 \\\\ 2 & -1 & 1 \\end{vmatrix} = -4$, $\\Delta_2 = \\begin{vmatrix} 1 & 6 & 1 \\\\ 1 & 0 & -1 \\\\ 1 & 2 & 1 \\end{vmatrix} = -8$, $\\Delta_3 = \\begin{vmatrix} 1 & 1 & 6 \\\\ 1 & 1 & 0 \\\\ 1 & -1 & 2 \\end{vmatrix} = -12$.<br>" +
                "Theo Cramer: $x = \\frac{-4}{-4} = 1$, $y = \\frac{-8}{-4} = 2$, $z = \\frac{-12}{-4} = 3$.",
            },
          ],
          trap: "Khi lập $\\Delta_i$, nhớ thay cột $b$ vào ĐÚNG CỘT thứ $i$ của ma trận $A$ và giữ nguyên các cột còn lại!",
        },
      },
    ],
    exercises: [
      {
        level: "Cơ bản",
        question:
          "Bài tập nhanh – Ma trận (Slide 13):<br>1) Cho $A \\in M_{3 \\times 4}, \\; B \\in M_{4 \\times 5}$: xác định cỡ của $AB$ và $B^T A^T$.<br>2) Với $A = \\begin{pmatrix} 1 & -1 & 2 & 0 \\\\ 2 & 3 & 0 & 1 \\\\ -2 & 1 & 4 & 5 \\end{pmatrix}$, hãy tính $A^T$ và $2A - A$.<br>3) Cho $C = \\begin{pmatrix} 1 & 2 & 0 \\\\ 0 & 1 & 3 \\end{pmatrix}_{2 \\times 3}, \\; D = \\begin{pmatrix} 1 & 0 \\\\ 2 & 1 \\\\ 0 & -1 \\end{pmatrix}_{3 \\times 2}$; tính $CD$ và $DC$.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.25đ)</span> Vì số cột của $A$ ($4$) bằng số hàng của $B$ ($4$), $AB$ xác định và có cỡ $3 \\times 5$. Do $B^T \\in M_{5 \\times 4}$ và $A^T \\in M_{4 \\times 3}$ (hoặc dùng $B^T A^T = (AB)^T$), ma trận $B^T A^T$ có cỡ $5 \\times 3$.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.35đ)</span> Chuyển hàng thành cột: $A^T = \\begin{pmatrix} 1 & 2 & -2 \\\\ -1 & 3 & 1 \\\\ 2 & 0 & 4 \\\\ 0 & 1 & 5 \\end{pmatrix}_{4 \\times 3}$. Theo tính chất phép toán: $2A - A = A = \\begin{pmatrix} 1 & -1 & 2 & 0 \\\\ 2 & 3 & 0 & 1 \\\\ -2 & 1 & 4 & 5 \\end{pmatrix}$.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.4đ)</span> Tính $CD$ (cỡ $2 \\times 2$) và $DC$ (cỡ $3 \\times 3$):
            $$CD = \\begin{pmatrix} 1 \\cdot 1 + 2 \\cdot 2 + 0 \\cdot 0 & 1 \\cdot 0 + 2 \\cdot 1 + 0(-1) \\\\ 0 \\cdot 1 + 1 \\cdot 2 + 3 \\cdot 0 & 0 \\cdot 0 + 1 \\cdot 1 + 3(-1) \\end{pmatrix} = \\begin{pmatrix} 5 & 2 \\\\ 2 & -2 \\end{pmatrix},$$
            $$DC = \\begin{pmatrix} 1 & 2 & 0 \\\\ 2 & 5 & 3 \\\\ 0 & -1 & -3 \\end{pmatrix}.$$</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Chú ý $CD$ cỡ $2 \\times 2$ còn $DC$ cỡ $3 \\times 3$ — hai tích không chỉ khác giá trị mà còn khác cả kích thước!</div>
          </div>`,
      },
      {
        level: "Vừa",
        question:
          "Bài tập củng cố Chương 5 (Slides 40 &amp; 45):<br>1) Tính định thức $\\det \\begin{pmatrix} 2 & 1 & 0 \\\\ 4 & 3 & 1 \\\\ 0 & 2 & 5 \\end{pmatrix}$ bằng khử Gauss.<br>2) Tìm nghịch đảo (nếu tồn tại) của $A = \\begin{pmatrix} 1 & 0 & 1 \\\\ 0 & 1 & 1 \\\\ 0 & 0 & 2 \\end{pmatrix}$ bằng hai phương pháp (Định thức–phụ hợp và Gauss–Jordan).<br>3) Tính hạng của ma trận $B = \\begin{pmatrix} 1 & 0 & 2 & 1 & 3 \\\\ 2 & 0 & 4 & 2 & 6 \\\\ 0 & 1 & 1 & 0 & 2 \\end{pmatrix}_{3 \\times 5}$.<br>4) Giải thích tại sao phép cộng bội một hàng vào hàng khác bảo toàn hạng nhưng phép nhân một hàng với $0$ thì không.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.25đ)</span> Khử Gauss đưa về tam giác trên:
            $$\\begin{pmatrix} 2 & 1 & 0 \\\\ 4 & 3 & 1 \\\\ 0 & 2 & 5 \\end{pmatrix} \\xrightarrow{R_2 \\leftarrow R_2 - 2R_1} \\begin{pmatrix} 2 & 1 & 0 \\\\ 0 & 1 & 1 \\\\ 0 & 2 & 5 \\end{pmatrix} \\xrightarrow{R_3 \\leftarrow R_3 - 2R_2} \\begin{pmatrix} 2 & 1 & 0 \\\\ 0 & 1 & 1 \\\\ 0 & 0 & 3 \\end{pmatrix}.$$
            Vì chỉ dùng phép cộng bội hàng nên $\\det = 2 \\cdot 1 \\cdot 3 = 6$.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.35đ)</span> Có $\\det A = 1 \\cdot 1 \\cdot 2 = 2 \\neq 0 \\Rightarrow A$ khả nghịch.<br>
            • <i>Cách 1 (Phụ hợp):</i> $C_{11}=2, \\; C_{12}=0, \\; C_{13}=0$; $C_{21}=0, \\; C_{22}=2, \\; C_{23}=0$; $C_{31}=-1, \\; C_{32}=-1, \\; C_{33}=1$. Suy ra $\\operatorname{adj}(A) = C^T = \\begin{pmatrix} 2 & 0 & -1 \\\\ 0 & 2 & -1 \\\\ 0 & 0 & 1 \\end{pmatrix}$ và $A^{-1} = \\frac{1}{2}\\operatorname{adj}(A) = \\begin{pmatrix} 1 & 0 & -1/2 \\\\ 0 & 1 & -1/2 \\\\ 0 & 0 & 1/2 \\end{pmatrix}$.<br>
            • <i>Cách 2 (Gauss–Jordan):</i> $\\left[\\begin{array}{ccc|ccc} 1 & 0 & 1 & 1 & 0 & 0 \\\\ 0 & 1 & 1 & 0 & 1 & 0 \\\\ 0 & 0 & 2 & 0 & 0 & 1 \\end{array}\\right] \\xrightarrow{R_3 \\leftarrow \\frac{1}{2}R_3} \\left[\\begin{array}{ccc|ccc} 1 & 0 & 1 & 1 & 0 & 0 \\\\ 0 & 1 & 1 & 0 & 1 & 0 \\\\ 0 & 0 & 1 & 0 & 0 & 1/2 \\end{array}\\right] \\xrightarrow{\\substack{R_1 \\leftarrow R_1 - R_3 \\\\ R_2 \\leftarrow R_2 - R_3}} \\left[\\begin{array}{ccc|ccc} 1 & 0 & 0 & 1 & 0 & -1/2 \\\\ 0 & 1 & 0 & 0 & 1 & -1/2 \\\\ 0 & 0 & 1 & 0 & 0 & 1/2 \\end{array}\\right]$.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.2đ)</span> Thực hiện $R_2 \\leftarrow R_2 - 2R_1$ được hàng 2 toàn số $0$, sau đó đổi $R_2 \\leftrightarrow R_3$:
            $$B \\sim \\begin{pmatrix} 1 & 0 & 2 & 1 & 3 \\\\ 0 & 1 & 1 & 0 & 2 \\\\ 0 & 0 & 0 & 0 & 0 \\end{pmatrix} \\Rightarrow \\operatorname{rank}(B) = 2.$$</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.2đ)</span> Phép cộng bội $R_i \\leftarrow R_i + \\lambda R_j$ ($i \\neq j$) là phép biến đổi sơ cấp <b>khả nghịch</b> (có phép ngược $R_i \\leftarrow R_i - \\lambda R_j$), không làm mất đi mối quan hệ độc lập tuyến tính giữa các hàng nên bảo toàn hạng. Ngược lại, nhân một hàng với $0$ là phép biến đổi <b>không khả nghịch</b>, triệt tiêu hoàn toàn thông tin của hàng đó thành hàng $0$ nên có thể làm giảm hạng (ví dụ ma trận $I_2$ hạng $2$ sau khi nhân hàng 2 với $0$ chỉ còn hạng $1$).</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Ở câu 2) nhớ kiểm tra $A A^{-1} = I_3$ và đừng quên chuyển vị ma trận $C$ thành $C^T$ ở phương pháp phụ hợp!</div>
          </div>`,
      },
      {
        level: "Vừa",
        question:
          "Bài tập củng cố Chương 6 (Slide 60):<br>1) Phân loại và giải hệ $\\begin{cases} x + y + z = 2 \\\\ 2x + 2y + 2z = 4. \\end{cases}$<br>2) Biện luận theo $a$: $\\begin{cases} x + y = 1 \\\\ 2x + ay = 2. \\end{cases}$<br>3) Xác định điều kiện để hệ thuần nhất với $A = \\begin{pmatrix} 1 & 2 & 0 \\\\ 0 & a & 1 \\\\ 0 & 0 & a - 1 \\end{pmatrix}$ có nghiệm không tầm thường.<br>4) Dùng Cramer giải $\\begin{cases} x + y + z = 3 \\\\ 2x - y + z = 2 \\\\ x + 2y - z = 2. \\end{cases}$",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.25đ)</span> Thực hiện $R_2 \\leftarrow R_2 - 2R_1$: $\\left[\\begin{array}{ccc|c} 1 & 1 & 1 & 2 \\\\ 0 & 0 & 0 & 0 \\end{array}\\right]$. Có $r = \\bar{r} = 1 < n = 3 \\Rightarrow$ hệ có <b>vô số nghiệm</b> phụ thuộc $2$ ẩn tự do. Đặt $y = s, \\; z = t \\; (s, t \\in \\mathbb{R}) \\Rightarrow x = 2 - s - t$. Nghiệm: $(2 - s - t, \\; s, \\; t)$.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.25đ)</span> Khử Gauss $\\left[\\begin{array}{cc|c} 1 & 1 & 1 \\\\ 2 & a & 2 \\end{array}\\right] \\xrightarrow{R_2 \\leftarrow R_2 - 2R_1} \\left[\\begin{array}{cc|c} 1 & 1 & 1 \\\\ 0 & a - 2 & 0 \\end{array}\\right]$:<br>
            • Nếu $a \\neq 2$: $r = \\bar{r} = 2 = n \\Rightarrow$ hệ có <b>nghiệm duy nhất</b> $(x, y) = (1, 0)$.<br>
            • Nếu $a = 2$: $r = \\bar{r} = 1 < 2 \\Rightarrow$ hệ có <b>vô số nghiệm</b> $(x, y) = (1 - t, \\; t)$ ($t \\in \\mathbb{R}$).</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.25đ)</span> Vì $A$ vuông cấp $3$ dạng tam giác trên, hệ thuần nhất $AX = 0$ có nghiệm không tầm thường $\\iff \\det A = 0 \\iff 1 \\cdot a \\cdot (a - 1) = 0 \\iff a = 0$ hoặc $a = 1$.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.25đ)</span> Tính các định thức: $\\Delta = \\begin{vmatrix} 1 & 1 & 1 \\\\ 2 & -1 & 1 \\\\ 1 & 2 & -1 \\end{vmatrix} = 7 \\neq 0$, $\\Delta_1 = \\begin{vmatrix} 3 & 1 & 1 \\\\ 2 & -1 & 1 \\\\ 2 & 2 & -1 \\end{vmatrix} = 7$, $\\Delta_2 = \\begin{vmatrix} 1 & 3 & 1 \\\\ 2 & 2 & 1 \\\\ 1 & 2 & -1 \\end{vmatrix} = 7$, $\\Delta_3 = \\begin{vmatrix} 1 & 1 & 3 \\\\ 2 & -1 & 2 \\\\ 1 & 2 & 2 \\end{vmatrix} = 7$.<br>
            Theo quy tắc Cramer: $x = \\frac{7}{7} = 1, \\; y = \\frac{7}{7} = 1, \\; z = \\frac{7}{7} = 1$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Ở câu 3) rất hay bỏ sót nghiệm $a = 0$ nếu không phân tích kỹ $\\det A = a(a - 1) = 0$.</div>
          </div>`,
      },
    ],
    quiz: [
      {
        question:
          "Cho $A \\in M_{3 \\times 4}$ và $B \\in M_{4 \\times 5}$. Cỡ của ma trận $B^T A^T$ là:",
        options: [
          "$3 \\times 5$",
          "$5 \\times 3$",
          "$4 \\times 4$",
          "Không xác định",
        ],
        answer: 1,
        explanation:
          "$AB$ có cỡ $3 \\times 5$ và $B^T A^T = (AB)^T$ nên có cỡ $5 \\times 3$.",
      },
      {
        question:
          "Cho ma trận vuông $A$ cấp $3$ có $\\det A = 4$. Giá trị của $\\det((2A)^{-1})$ bằng:",
        options: [
          "$\\frac{1}{8}$",
          "$\\frac{1}{32}$",
          "$\\frac{1}{16}$",
          "$32$",
        ],
        answer: 1,
        explanation:
          "$\\det(2A) = 2^3 \\det A = 8 \\cdot 4 = 32$, suy ra $\\det((2A)^{-1}) = \\frac{1}{32}$.",
      },
      {
        question:
          "Phép biến đổi sơ cấp hàng $R_i \\leftarrow R_i + \\lambda R_j$ ($i \\neq j$) có tác dụng gì lên định thức?",
        options: [
          "Làm định thức đổi dấu",
          "Làm định thức nhân với $\\lambda$",
          "Không làm thay đổi định thức",
          "Làm định thức bằng $0$",
        ],
        answer: 2,
        explanation:
          "Cộng vào một hàng $\\lambda$ lần hàng khác không làm thay đổi giá trị định thức.",
      },
      {
        question:
          "Nếu $A, B$ là hai ma trận vuông khả nghịch cùng cấp thì $(AB)^{-1}$ bằng:",
        options: [
          "$A^{-1} B^{-1}$",
          "$B^{-1} A^{-1}$",
          "$(BA)^{-1}$",
          "$A^T B^T$",
        ],
        answer: 1,
        explanation:
          "Nghịch đảo của một tích làm đảo ngược thứ tự nhân: $(AB)^{-1} = B^{-1}A^{-1}$.",
      },
      {
        question:
          "Trong định lý Kronecker–Capelli, hệ $AX = b$ với $n$ ẩn có vô số nghiệm khi và chỉ khi:",
        options: [
          "$\\operatorname{rank} A < \\operatorname{rank}[A \\mid b]$",
          "$\\operatorname{rank} A = \\operatorname{rank}[A \\mid b] = n$",
          "$\\operatorname{rank} A = \\operatorname{rank}[A \\mid b] < n$",
          "$\\det A = 0$",
        ],
        answer: 2,
        explanation:
          "Hệ tương thích khi $r = \\bar{r}$, và có vô số nghiệm phụ thuộc $n - r$ ẩn tự do khi $r = \\bar{r} < n$.",
      },
      {
        question:
          "Hệ phương trình thuần nhất $AX = 0$ với ma trận $A = \\begin{pmatrix} 1 & 2 & 0 \\\\ 0 & a & 1 \\\\ 0 & 0 & a - 1 \\end{pmatrix}$ có nghiệm không tầm thường khi và chỉ khi:",
        options: [
          "$a = 1$",
          "$a = 0$",
          "$a = 0$ hoặc $a = 1$",
          "Mọi $a \\in \\mathbb{R}$",
        ],
        answer: 2,
        explanation:
          "Hệ vuông thuần nhất có nghiệm không tầm thường $\\iff \\det A = a(a - 1) = 0 \\iff a = 0$ hoặc $a = 1$.",
      },
      {
        question:
          "Hệ phương trình nào sau đây KHÔNG thể áp dụng trực tiếp quy tắc Cramer?",
        options: [
          "Hệ 3 phương trình, 3 ẩn có $\\det A = -4$",
          "Hệ 2 phương trình, 2 ẩn có $\\det A = -3$",
          "Hệ 3 phương trình, 5 ẩn",
          "Hệ 4 phương trình, 4 ẩn có $\\operatorname{rank} A = 4$",
        ],
        answer: 2,
        explanation:
          "Quy tắc Cramer chỉ áp dụng khi hệ vuông ($m = n$) và $\\det A \\neq 0$.",
      },
      {
        question: "Phép biến đổi nào sau đây KHÔNG bảo toàn hạng của ma trận?",
        options: [
          "Đổi chỗ hai hàng cho nhau",
          "Cộng $2$ lần hàng $1$ vào hàng $3$",
          "Nhân một hàng với số $0$",
          "Nhân một hàng với số $-5$",
        ],
        answer: 2,
        explanation:
          "Nhân một hàng với $0$ không phải là phép biến đổi sơ cấp khả nghịch và có thể làm giảm hạng của ma trận.",
      },
    ],
  },

  // =========================================================================
  // CHƯƠNG 7: ĐẠI SỐ TUYẾN TÍNH (COMP1800) - KHÔNG GIAN VECTƠ
  // =========================================================================
  {
    id: "dstt-c7",
    code: "ĐSTT • CHƯƠNG 7",
    subject: "Đại số tuyến tính",
    level: "Nâng cao",
    title: "Không gian vectơ",
    summary:
      "Không gian vectơ và 8 tiên đề; Không gian vectơ con (tiêu chuẩn, giao & tổng); Tổ hợp tuyến tính và hệ sinh (span); Độc lập & phụ thuộc tuyến tính; Cơ sở, số chiều & tọa độ vectơ; Không gian nghiệm N(A) & định lý Rank–Nullity; Hạng hệ vectơ; Đổi cơ sở & ma trận chuyển tọa độ; Không gian Euclide (tích vô hướng, chuẩn, Cauchy–Schwarz, góc, trực giao, phép chiếu & thuật toán Gram–Schmidt).",
    previewFormula:
      "$$\\dim N(A) + \\operatorname{rank}(A) = n, \\quad [v]_C = P_C^{-1}P_B[v]_B, \\quad v_j = u_j - \\sum_{i=1}^{j-1} \\frac{\\langle u_j, v_i \\rangle}{\\langle v_i, v_i \\rangle} v_i$$",
    bannerGradient: "linear-gradient(135deg, #047857 0%, #1d4ed8 100%)",
    theory: [
      {
        heading:
          "7.1. Khái niệm không gian vectơ, Tám tiên đề & Các không gian quen thuộc",
        content:
          "• <b>Kết nối từ Chương 5–6 sang Chương 7 (Slide 3):</b> Chương 5 thao tác trên ma trận và tính hạng; Chương 6 giải $Ax = b$ và $Ax = 0$; Chương 7 xem các nghiệm, cột ma trận và đa thức như <i>vectơ</i>, tìm cách mô tả chúng bằng ít vectơ nhất (như $(x, y, z) = x(1, 0, 0) + y(0, 1, 0) + z(0, 0, 1)$).<br>" +
          "• <b>Định nghĩa (Slide 4):</b> Cho $V \\neq \\varnothing$ với hai phép toán: cộng $u + v \\in V$ và nhân vô hướng $\\lambda u \\in V$ ($\\lambda \\in \\mathbb{R}$). $V$ là <b>không gian vectơ trên $\\mathbb{R}$</b> nếu thỏa mãn <b>tám tiên đề</b> với mọi $u, v, w \\in V$ và $\\lambda, \\mu \\in \\mathbb{R}$:<br>" +
          "1) $u + v = v + u$; $\\quad$ 2) $(u + v) + w = u + (v + w)$;<br>" +
          "3) tồn tại $0_V$: $u + 0_V = u$; $\\quad$ 4) với mọi $u$ tồn tại $-u$: $u + (-u) = 0_V$;<br>" +
          "5) $\\lambda(u + v) = \\lambda u + \\lambda v$; $\\quad$ 6) $(\\lambda + \\mu)u = \\lambda u + \\mu u$;<br>" +
          "7) $(\\lambda\\mu)u = \\lambda(\\mu u)$; $\\quad$ 8) $1u = u$.<br>" +
          "• <b>Các không gian vectơ quen thuộc (Slides 6 &amp; 7):</b> $\\mathbb{R}^n$ (vectơ không $0 = (0, \\dots, 0)$); $M_{m \\times n}(\\mathbb{R})$; $P_2$ (đa thức thực bậc $\\le 2$ kể cả đa thức $0$, vd $p(x)=1+2x, \\; q(x)=x-x^2 \\Rightarrow p+q=1+3x-x^2$); và không gian hàm số $C([0, 1])$ với vectơ không $f(x) \\equiv 0$.<br>" +
          "• <b>Tính chất suy ra từ tiên đề (Slide 9):</b> $0u = 0_V, \\; \\lambda 0_V = 0_V, \\; (-1)u = -u$; và $\\lambda u = 0_V \\Rightarrow \\lambda = 0$ hoặc $u = 0_V$ (vd $3u = 0_V \\Rightarrow u = 0_V$). <i>Giải thích:</i> $0u = (0+0)u = 0u + 0u \\Rightarrow 0u = 0_V$.",
        checkpoint: {
          question:
            "Phản ví dụ (Slide 8): Kiểm tra các tập $S = \\{(x, y) \\in \\mathbb{R}^2 : x \\ge 0, \\; y \\ge 0\\}$ và $T = \\{(x, y) : x + y = 1\\}$ (với các phép toán thông thường) có phải là không gian vectơ không?",
          rubric: [
            {
              step: "Bước 1 • Kiểm tra tập S (0.5đ)",
              detail:
                "Lấy $(1, 1) \\in S$ và $\\lambda = -1 \\in \\mathbb{R}$, ta có $(-1)(1, 1) = (-1, -1) \\notin S$. Vậy $S$ không đóng đối với phép nhân vô hướng nên $S$ <b>không</b> là không gian vectơ.",
            },
            {
              step: "Bước 2 • Kiểm tra tập T (0.5đ)",
              detail:
                "Vì $0 + 0 = 0 \\neq 1$ nên $(0, 0) \\notin T$ (vi phạm tiên đề tồn tại $0_V$). Vậy $T$ <b>không</b> là không gian vectơ.",
            },
          ],
          trap: "Vectơ không nhất thiết là mũi tên hình học — có thể là bộ số, ma trận, đa thức hay hàm số liên tục!",
        },
      },
      {
        heading: "7.2. Không gian vectơ con, Giao & Tổng hai không gian con",
        content:
          "• <b>Định nghĩa &amp; Tiêu chuẩn (Slide 10):</b> Tập $W \\subseteq V$ là <b>không gian con</b> nếu $W$ với các phép toán kế thừa từ $V$ là một không gian vectơ. Với $W \\neq \\varnothing$: $$W \\text{ là không gian con} \\iff (u, v \\in W, \\; \\lambda, \\mu \\in \\mathbb{R} \\Rightarrow \\lambda u + \\mu v \\in W).$$" +
          "• <b>Quy trình kiểm tra 3 bước (Slide 11):</b> (1) Kiểm tra $W \\neq \\varnothing$ (thường chứng minh $0_V \\in W$); (2) Lấy $u, v \\in W$ bất kỳ và $\\lambda, \\mu \\in \\mathbb{R}$; (3) Chứng minh $\\lambda u + \\mu v \\in W$.<br>" +
          "<i>Ví dụ:</i> $W = \\{(x, y, z) : x - 2y + z = 0\\} \\le \\mathbb{R}^3$; trong $M_{2 \\times 2}(\\mathbb{R})$: $W = \\left\\{\\begin{pmatrix} a & b \\\\ 0 & 0 \\end{pmatrix} : a, b \\in \\mathbb{R}\\right\\}$; trong $P_2$: $U = \\{p \\in P_2 : p(1) = 0\\}$ (vì $(\\lambda p + \\mu q)(1) = 0$, có thể viết $p(x) = (x - 1)(a + bx)$).<br>" +
          "• <b>Giao và tổng hai không gian con (Slide 14):</b> Nếu $U, W$ là không gian con của $V$ thì $U \\cap W$ và $U + W = \\{u + w : u \\in U, \\; w \\in W\\}$ đều là không gian con của $V$ (vd $U = \\{(x, y, 0)\\}, \\; W = \\{(0, y, z)\\} \\Rightarrow U \\cap W = \\{(0, y, 0)\\}, \\; U + W = \\mathbb{R}^3$). <i>Nhận xét:</i> Hợp $U \\cup W$ nói chung không là không gian con.",
        checkpoint: {
          question:
            "Phản ví dụ và bẫy thường gặp (Slide 12): Hai tập $W_1 = \\{(x, y) : x + y = 2\\}$ và $W_2 = \\{(x, y) : xy = 0\\}$ có phải không gian con của $\\mathbb{R}^2$ không?",
          rubric: [
            {
              step: "Bước 1 • Xét W₁ = {(x, y) : x + y = 2} (0.4đ)",
              detail:
                "Vì $0 + 0 = 0 \\neq 2$ nên $(0, 0) \\notin W_1$. Vậy $W_1$ <b>không</b> là không gian con.",
            },
            {
              step: "Bước 2 • Xét W₂ = {(x, y) : xy = 0} (0.6đ)",
              detail:
                "Ta có $(0, 0) \\in W_2$, $(1, 0) \\in W_2$ và $(0, 1) \\in W_2$, nhưng tổng $(1, 0) + (0, 1) = (1, 1) \\notin W_2$ (vì $1 \\cdot 1 = 1 \\neq 0$). Vậy $W_2$ không đóng đối với phép cộng nên <b>không</b> là không gian con.",
            },
          ],
          trap: "Ghi nhớ: Chứa vectơ không $0_V$ chỉ là điều kiện CẦN, chưa đủ! Điều kiện đồng nhất tuyến tính (vế phải bằng $0$) thường tạo ra không gian con.",
        },
      },
      {
        heading: "7.3. Tổ hợp tuyến tính, Hệ sinh & Không gian sinh (span)",
        content:
          "• <b>Tổ hợp tuyến tính (Slides 15 &amp; 16):</b> Vectơ $v$ là tổ hợp tuyến tính của $v_1, \\dots, v_k$ nếu tồn tại $c_1, \\dots, c_k \\in \\mathbb{R}$ sao cho $v = c_1 v_1 + \\dots + c_k v_k$ (vd $u=(1,0,1), \\; w=(0,1,1) \\Rightarrow 2u - 3w = (2, -3, -1)$). Để kiểm tra, lập hệ phương trình theo các hệ số $c_i$ (vd với $u=(1,1,0), \\; w=(1,0,1)$ thì $(3,1,2) = u + 2w$, còn $(1,0,0) \\notin \\operatorname{span}\\{u, w\\}$ vì hệ vô nghiệm).<br>" +
          "• <b>Hệ sinh và không gian sinh (Slide 17):</b> $$\\operatorname{span}\\{v_1, \\dots, v_k\\} = \\left\\{\\sum_{i=1}^k c_i v_i : c_i \\in \\mathbb{R}\\right\\}$$ là không gian con nhỏ nhất chứa $v_1, \\dots, v_k$ (vd $\\operatorname{span}\\{(1,0,0), (0,1,0)\\} = Oxy \\neq \\mathbb{R}^3$).<br>" +
          "• <b>Hệ sinh của $\\mathbb{R}^n$ và không gian đa thức (Slides 19 &amp; 20):</b> Các vectơ $v_1, \\dots, v_k \\in \\mathbb{R}^n$ sinh $\\mathbb{R}^n \\iff$ ma trận cột $A = [v_1 \\cdots v_k]$ có $\\operatorname{rank}(A) = n$ (vd $v_1=(1,0), \\; v_2=(1,1), \\; v_3=(2,1)$ có $\\operatorname{rank} A = 2$ nên sinh $\\mathbb{R}^2$, dù hệ sinh có thể có vectơ thừa $v_3 = v_1 + v_2$). Trong $P_2$, $\\operatorname{span}\\{1, x, 1+x^2\\} = P_2$ vì $a + bx + cx^2 = (a-c)\\cdot 1 + bx + c(1+x^2)$, còn $\\{1, x\\}$ không sinh $P_2$.",
        checkpoint: {
          question:
            "Ví dụ tìm một hệ sinh (Slide 18): Tìm một hệ sinh của không gian con $W = \\{(x, y, z) \\in \\mathbb{R}^3 : x + y - z = 0\\}$.",
          rubric: [
            {
              step: "Bước 1 • Giải điều kiện xác định theo biến tự do (0.5đ)",
              detail:
                "Từ $x + y - z = 0$ suy ra $z = x + y$, với $x, y \\in \\mathbb{R}$ là hai biến tự do.",
            },
            {
              step: "Bước 2 • Tách thành tổ hợp tuyến tính các vectơ cố định (0.5đ)",
              detail:
                "$(x, y, z) = (x, y, x + y) = x(1, 0, 1) + y(0, 1, 1)$. Vậy $W = \\operatorname{span}\\{(1, 0, 1), (0, 1, 1)\\}$.",
            },
          ],
          trap: "Khi xếp vectơ vào ma trận $A = [v_1 \\cdots v_k]$ để kiểm tra hệ sinh của $\\mathbb{R}^n$, bắt buộc xếp các vectơ thành CỘT DỌC và kiểm tra $\\operatorname{rank}(A) = n$.",
        },
      },
      {
        heading:
          "7.4. Độc lập tuyến tính, Phụ thuộc tuyến tính & Tiêu chuẩn hạng",
        content:
          "• <b>Định nghĩa (Slide 21):</b> Hệ $v_1, \\dots, v_k$ <b>độc lập tuyến tính (ĐLTT)</b> nếu $c_1 v_1 + \\dots + c_k v_k = 0_V \\Rightarrow c_1 = \\dots = c_k = 0$; ngược lại là <b>phụ thuộc tuyến tính (PTTT)</b>.<br>" +
          "• <b>Nhận biết nhanh &amp; Tính chất quan trọng (Slides 22 &amp; 23):</b> Hai vectơ khác $0$ PTTT $\\iff$ chúng tỉ lệ (vd $(1,2,3), (2,4,6)$ PTTT; $(1,2), (2,3)$ ĐLTT). Hệ chứa $0_V$ hoặc chứa hai vectơ tỉ lệ luôn PTTT; hệ con của hệ ĐLTT vẫn ĐLTT; hệ chứa một hệ PTTT thì PTTT; một vectơ là tổ hợp tuyến tính của các vectơ còn lại thì hệ PTTT.<br>" +
          "• <b>Tiêu chuẩn bằng hạng ma trận (Slides 24 &amp; 25):</b> Với $v_1, \\dots, v_k \\in \\mathbb{R}^n$, đặt $A = [v_1 \\cdots v_k]$: hệ ĐLTT $\\iff \\operatorname{rank}(A) = k$ (vd $(1,1,0), (1,0,1), (0,1,1)$ khử Gauss có $\\operatorname{rank} A = 3$ nên ĐLTT; còn $(1,1,0), (0,1,1), (1,2,1)$ có $\\operatorname{rank} A = 2 < 3$ nên PTTT).<br>" +
          "• <b>Hệ chắc chắn PTTT (Slide 26):</b> Trong $\\mathbb{R}^n$, mọi hệ có <b>hơn $n$ vectơ</b> đều PTTT (vd $4$ vectơ trong $\\mathbb{R}^3$ hay $4$ đa thức trong $P_2$). <i>Nhận xét:</i> Chiều ngược lại sai — có ít hơn $n$ vectơ vẫn có thể PTTT.",
        checkpoint: {
          question:
            "Bài toán tham số (Slide 27): Trong $\\mathbb{R}^3$, tìm điều kiện của $m$ để hệ $u = (1, 0, 1), \\; v = (0, 1, 1), \\; w = (1, 1, m)$ độc lập tuyến tính hay phụ thuộc tuyến tính.",
          rubric: [
            {
              step: "Bước 1 • Lập ma trận cột A = [u v w] và tính det A (0.5đ)",
              detail:
                "Đặt $A = \\begin{pmatrix} 1 & 0 & 1 \\\\ 0 & 1 & 1 \\\\ 1 & 1 & m \\end{pmatrix}$. Khai triển cho $\\det A = m - 2$.",
            },
            {
              step: "Bước 2 • Biện luận theo m (0.5đ)",
              detail:
                "• Nếu $m \\neq 2$: $\\det A \\neq 0$ ($\\operatorname{rank} A = 3$) $\\Rightarrow$ hệ <b>độc lập tuyến tính</b>.<br>" +
                "• Nếu $m = 2$: $w = u + v$ ($\det A = 0$) $\\Rightarrow$ hệ <b>phụ thuộc tuyến tính</b>.",
            },
          ],
          trap: "Chỉ dùng tiêu chuẩn $\\det A \\neq 0$ để xét ĐLTT khi số vectơ $k$ bằng đúng số chiều $n$ (ma trận vuông $n \\times n$); nếu $k \\neq n$ bắt buộc dùng $\\operatorname{rank}(A) = k$!",
        },
      },
      {
        heading: "7.5. Cơ sở, Số chiều (dim V) & Tọa độ của vectơ",
        content:
          "• <b>Cơ sở của không gian vectơ (Slides 28–30):</b> Hệ $B = (v_1, \\dots, v_n)$ là một <b>cơ sở</b> của $V$ nếu (1) $v_1, \\dots, v_n$ ĐLTT và (2) $\\operatorname{span}\\{v_1, \\dots, v_n\\} = V$. Với $n$ vectơ trong $\\mathbb{R}^n$: Cơ sở $\\iff$ ĐLTT $\\iff$ Sinh $\\mathbb{R}^n \\iff \\det[v_1 \\cdots v_n] \\neq 0$ (chỉ dùng $\\det$ khi ma trận vuông).<br>" +
          "• <b>Số chiều $\\dim V$ (Slides 31 &amp; 32):</b> Mọi cơ sở của $V$ hữu hạn chiều có cùng số vectơ, gọi là số chiều $\\dim V$ (vd $\\dim \\mathbb{R}^3 = 3, \\; \\dim P_2 = 3, \\; \\dim M_{2 \\times 3}(\\mathbb{R}) = 6$, $\\dim\\{0_V\\} = 0$ với cơ sở rỗng). Nếu $\\dim V = n$: mọi hệ ĐLTT có $\\le n$ vectơ; mọi hệ sinh có $\\ge n$ vectơ; hệ ĐLTT hoặc hệ sinh gồm đúng $n$ vectơ đều là cơ sở.<br>" +
          "• <b>Tọa độ vectơ &amp; Tính duy nhất (Slides 33, 35, 36):</b> Với cơ sở $B = (v_1, \\dots, v_n)$, mỗi $v \\in V$ viết <b>duy nhất</b> $v = c_1 v_1 + \\dots + c_n v_n$; vectơ cột $[v]_B = (c_1, \\dots, c_n)^T$ là tọa độ của $v$ trong $B$. <i>Ví dụ trong $P_2$:</i> $B = (1, x, 1 + x^2)$, $p(x) = 2 + 3x + 4x^2 = -2(1) + 3x + 4(1 + x^2) \\Rightarrow [p]_B = (-2, 3, 4)^T$.<br>" +
          "• <b>Bổ sung vectơ để được cơ sở (Slide 37):</b> Cho $u = (1, 1, 0), \\; v = (0, 1, 1)$ trong $\\mathbb{R}^3$, chọn $w = (0, 0, 1) \\notin \\operatorname{span}\\{u, v\\}$ được $\\det[u \\; v \\; w] = 1 \\neq 0$, nên $(u, v, w)$ là cơ sở của $\\mathbb{R}^3$.",
        checkpoint: {
          question:
            "Ví dụ tọa độ trong $\\mathbb{R}^3$ (Slide 34): Cho cơ sở $B = (v_1, v_2, v_3)$ với $v_1 = (1, 0, 0), \\; v_2 = (1, 1, 0), \\; v_3 = (1, 1, 1)$. Tìm tọa độ $[(4, 3, 2)]_B$.",
          rubric: [
            {
              step: "Bước 1 • Thiết lập hệ phương trình từ tổ hợp tuyến tính (0.5đ)",
              detail:
                "$c_1 v_1 + c_2 v_2 + c_3 v_3 = (4, 3, 2) \\iff \\begin{cases} c_1 + c_2 + c_3 = 4, \\\\ c_2 + c_3 = 3, \\\\ c_3 = 2. \\end{cases}$",
            },
            {
              step: "Bước 2 • Giải hệ và viết tọa độ dạng cột (0.5đ)",
              detail:
                "Suy ra $c_3 = 2, \\; c_2 = 1, \\; c_1 = 1$, nên $[(4, 3, 2)]_B = \\begin{pmatrix} 1 \\\\ 1 \\\\ 2 \\end{pmatrix}$.",
            },
          ],
          trap: "Tọa độ phụ thuộc vào thứ tự của cơ sở $B$ và luôn phải viết dưới dạng vectơ cột $[v]_B = (c_1, \\dots, c_n)^T$.",
        },
      },
      {
        heading:
          "7.6. Không gian nghiệm N(A) của hệ thuần nhất & Định lý Rank–Nullity",
        content:
          "• <b>Không gian nghiệm $N(A)$ (Slides 38–40):</b> Với $A \\in M_{m \\times n}(\\mathbb{R})$, đặt $N(A) = \\{x \\in \\mathbb{R}^n : Ax = 0\\}$. Định lý: $N(A)$ là không gian con của $\\mathbb{R}^n$, gọi là không gian nghiệm (không gian không) của $A$ (vì $A(\\lambda x + \\mu y) = \\lambda Ax + \\mu Ay = 0$).<br>" +
          "<i>Ví dụ:</i> $\\begin{cases} x+y+z=0 \\\\ 2x+2y+2z=0 \\end{cases}$ có cơ sở $N(A)$ là $\\{(-1,1,0), (-1,0,1)\\}$, $\\dim N(A) = 2$; còn $\\begin{cases} x+y+z=0 \\\\ x-y+z=0 \\end{cases}$ có $N(A) = \\operatorname{span}\\{(-1,0,1)\\}$, $\\dim N(A) = 1$.<br>" +
          "• <b>Định lý hạng – số chiều / rank–nullity (Slide 41):</b> Nếu $A \\in M_{m \\times n}(\\mathbb{R})$ thì: $$\\dim N(A) + \\operatorname{rank}(A) = n$$ (số chiều không gian nghiệm bằng <b>số cột $n$</b> trừ số biến trụ, không phải số hàng $m$). <i>Ví dụ:</i> $A = \\begin{pmatrix} 1 & 1 & 1 & 0 \\\\ 0 & 1 & 1 & 2 \\end{pmatrix}$ có $\\operatorname{rank}(A) = 2, \\; n = 4 \\Rightarrow \\dim N(A) = 2$.<br>" +
          "• <b>Liên hệ điều kiện nghiệm không tầm thường (Slide 43):</b> Hệ $Ax = 0$ ($n$ ẩn) có nghiệm không tầm thường $\\iff \\dim N(A) > 0 \\iff \\operatorname{rank}(A) < n$ (nếu $A$ vuông cấp $n$ thì $\\iff \\det A = 0$; tuyệt đối không dùng $\\det A$ khi $A$ không vuông).",
        checkpoint: {
          question:
            "Ví dụ tìm cơ sở nghiệm hệ bốn ẩn (Slide 42): Tìm một cơ sở và số chiều của $N(A)$ với hệ $\\begin{cases} x_1 + x_2 + x_3 = 0, \\\\ x_2 + x_3 + 2x_4 = 0. \\end{cases}$",
          rubric: [
            {
              step: "Bước 1 • Chọn ẩn tự do và biểu diễn các ẩn cơ sở (0.5đ)",
              detail:
                "Đặt $x_3 = s, \\; x_4 = t$ ($s, t \\in \\mathbb{R}$). Từ phương trình 2: $x_2 = -s - 2t$; thay lên phương trình 1: $x_1 = -x_2 - x_3 = s + 2t - s = 2t$.",
            },
            {
              step: "Bước 2 • Tách tham số tìm cơ sở và dim N(A) (0.5đ)",
              detail:
                "$x = s(0, -1, 1, 0) + t(2, -2, 0, 1)$. Hai vectơ này ĐLTT nên là một cơ sở của $N(A)$, và $\\dim N(A) = 2$.",
            },
          ],
          trap: "Khi dùng công thức Rank–Nullity $\\dim N(A) = n - \\operatorname{rank}(A)$, phải lấy SỐ CỘT (số ẩn) $n$ trừ đi $\\operatorname{rank}(A)$, không lấy số hàng $m$!",
        },
      },
      {
        heading: "7.7. Hạng của một hệ vectơ & Hệ con độc lập tối đại",
        content:
          "• <b>Định nghĩa (Slide 44):</b> Hạng của hệ $v_1, \\dots, v_k$ là số vectơ lớn nhất có thể chọn để được một hệ ĐLTT: $$\\operatorname{rank}(v_1, \\dots, v_k) = \\dim \\operatorname{span}\\{v_1, \\dots, v_k\\}.$$ Nếu $v_i \\in \\mathbb{R}^n$, hạng của hệ bằng hạng của ma trận có các cột là $v_i$ (vd $(1,0,0), (0,1,0), (1,1,0)$ có hạng $2$).<br>" +
          "• <b>Thuật toán tìm hạng và hệ con độc lập tối đại (Slide 45):</b><br>" +
          "1) Xếp các vectơ thành <b>cột</b> của ma trận $A$.<br>" +
          "2) Khử Gauss để tính $r = \\operatorname{rank}(A)$.<br>" +
          "3) Chọn các <b>cột trụ trong ma trận gốc</b>: các vectơ tương ứng tạo thành hệ ĐLTT gồm $r$ vectơ (vd $v_1=(1,0), \\; v_2=(0,1), \\; v_3=(2,3) \\Rightarrow \\{v_1, v_2\\}$ là hệ con ĐLTT tối đại).<br>" +
          "• <b>Liên hệ giữa hạng, độc lập và hệ sinh (Slide 47):</b> Cho $k$ vectơ $v_1, \\dots, v_k$ trong $\\mathbb{R}^n$, đặt $r = \\operatorname{rank}[v_1 \\cdots v_k]$:<br>" +
          "- Hệ ĐLTT $\\iff r = k$;<br>" +
          "- Hệ sinh $\\mathbb{R}^n \\iff r = n$;<br>" +
          "- Hệ là cơ sở của $\\mathbb{R}^n \\iff k = n = r$ (vd $3$ vectơ $(1,0),(0,1),(1,1)$ trong $\\mathbb{R}^2$ có $k=3, n=2, r=2$: sinh $\\mathbb{R}^2$ nhưng không ĐLTT nên không là cơ sở).",
        checkpoint: {
          question:
            "Ví dụ rút gọn một hệ sinh (Slide 46): Trong $\\mathbb{R}^3$, cho $v_1 = (1, 0, 1), \\; v_2 = (0, 1, 1), \\; v_3 = (1, 1, 2), \\; v_4 = (2, 1, 3)$. Tìm hạng của hệ và rút gọn thành một cơ sở của $\\operatorname{span}\\{v_1, v_2, v_3, v_4\\}$.",
          rubric: [
            {
              step: "Bước 1 • Xếp thành cột và khử Gauss tìm hạng (0.5đ)",
              detail:
                "$A = \\begin{pmatrix} 1 & 0 & 1 & 2 \\\\ 0 & 1 & 1 & 1 \\\\ 1 & 1 & 2 & 3 \\end{pmatrix} \\xrightarrow{R_3 \\leftarrow R_3 - R_1 - R_2} \\begin{pmatrix} 1 & 0 & 1 & 2 \\\\ 0 & 1 & 1 & 1 \\\\ 0 & 0 & 0 & 0 \\end{pmatrix}$. Hạng $r = 2$, hai cột trụ là cột 1 và cột 2.",
            },
            {
              step: "Bước 2 • Rút gọn hệ sinh bằng hai vectơ trụ (0.5đ)",
              detail:
                "Vì $v_3 = v_1 + v_2$ và $v_4 = 2v_1 + v_2$ nên $\\operatorname{span}\\{v_1, v_2, v_3, v_4\\} = \\operatorname{span}\\{v_1, v_2\\}$ với $v_1, v_2$ ĐLTT. Vậy hạng của hệ bằng $2$ và có thể loại $v_3, v_4$ mà không đổi không gian sinh.",
            },
          ],
          trap: "Khi chọn hệ con độc lập tối đại (hay cơ sở của không gian sinh), phải lấy các vectơ từ MA TRẬN GỐC ứng với cột trụ, không được lấy cột của ma trận đã biến đổi bậc thang!",
        },
      },
      {
        heading: "7.8. Đổi cơ sở và Ma trận chuyển tọa độ",
        content:
          "• <b>Chuyển từ cơ sở $B$ sang chính tắc $E$ (Slides 48–50):</b> Cho $B = (v_1, \\dots, v_n)$ là cơ sở của $\\mathbb{R}^n$, đặt $P_B = [v_1 \\cdots v_n]$ (xếp các vectơ cơ sở thành <b>cột</b>). Khi đó: $$[v]_E = P_B[v]_B, \\qquad [v]_B = P_B^{-1}[v]_E.$$" +
          "<i>Ví dụ:</i> $B = ((2,1), (1,1)), \\; v = (7,4) \\Rightarrow P_B = \\begin{pmatrix} 2 & 1 \\\\ 1 & 1 \\end{pmatrix}, \\; P_B^{-1} = \\begin{pmatrix} 1 & -1 \\\\ -1 & 2 \\end{pmatrix} \\Rightarrow [v]_B = P_B^{-1}\\begin{pmatrix} 7 \\\\ 4 \\end{pmatrix} = \\begin{pmatrix} 3 \\\\ 1 \\end{pmatrix}$.<br>" +
          "• <b>Đổi tọa độ giữa hai cơ sở bất kỳ (Slide 51):</b> Với hai cơ sở $B, C$ của $\\mathbb{R}^n$, vì $[v]_E = P_B[v]_B = P_C[v]_C$ nên: $$[v]_C = P_C^{-1}P_B[v]_B = P_{C \\leftarrow B}[v]_B, \\qquad P_{C \\leftarrow B} = P_C^{-1}P_B$$ (nhận tọa độ theo $B$ và trả về tọa độ theo $C$).<br>" +
          "• <b>Áp dụng trong $\\mathbb{R}^3$ và $P_2$ (Slides 54 &amp; 55):</b> Với $B = ((1,0,0), (1,1,0), (1,1,1))$, $P_B = \\begin{pmatrix} 1 & 1 & 1 \\\\ 0 & 1 & 1 \\\\ 0 & 0 & 1 \\end{pmatrix}$ và $[v]_B = (2,-1,3)^T \\Rightarrow [v]_E = (4,2,3)^T$. Trong $P_2$, dùng cơ sở chuẩn $E=(1, x, x^2)$ và $B=(1, x, 1+x^2)$ để lập $P_B = \\begin{pmatrix} 1 & 0 & 1 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}$.<br>" +
          "• <b>5 nhầm lẫn thường gặp (Slide 56):</b> (1) Xếp vectơ cơ sở thành cột, không phải hàng; (2) Chỉ rõ tọa độ xuất phát và đích; (3) $P_B$ đổi từ $B$ sang $E$; (4) Ngược chiều dùng $P_B^{-1}$; (5) $P_{C \\leftarrow B} = P_C^{-1} P_B$ (biết $[v]_B$ muốn tìm $[v]_E$ thì nhân $P_B[v]_B$, không nhân $P_B^{-1}$).",
        checkpoint: {
          question:
            "Ví dụ đổi cơ sở (Slides 52 &amp; 53): Trong $\\mathbb{R}^2$, cho $B = ((1, 1), (1, -1))$ và $C = ((1, 0), (1, 1))$. Tìm ma trận chuyển $P_{C \\leftarrow B}$ và tính $[v]_C$ khi biết $[v]_B = (3, 2)^T$.",
          rubric: [
            {
              step: "Bước 1 • Lập P_B, P_C và tính P_C⁻¹ (0.5đ)",
              detail:
                "$P_B = \\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}$, $P_C = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix} \\Rightarrow P_C^{-1} = \\begin{pmatrix} 1 & -1 \\\\ 0 & 1 \\end{pmatrix}$.",
            },
            {
              step: "Bước 2 • Tính P_{C ← B} = P_C⁻¹ P_B và [v]_C (0.5đ)",
              detail:
                "$P_{C \\leftarrow B} = \\begin{pmatrix} 1 & -1 \\\\ 0 & 1 \\end{pmatrix}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix} = \\begin{pmatrix} 0 & 2 \\\\ 1 & -1 \\end{pmatrix}$. Suy ra $[v]_C = \\begin{pmatrix} 0 & 2 \\\\ 1 & -1 \\end{pmatrix}\\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} 4 \\\\ 1 \\end{pmatrix}$ (kiểm tra: $4(1,0)+1(1,1)=(5,1)=3(1,1)+2(1,-1)$).",
            },
          ],
          trap: "Mẹo nhớ thứ tự công thức: $P_{C \\leftarrow B} = P_C^{-1} P_B$ (chữ đích $C$ đi với nghịch đảo ở bên trái, chữ xuất phát $B$ ở bên phải).",
        },
      },
      {
        heading:
          "7.9. Không gian Euclide, Tích vô hướng, Chuẩn, Góc & Cauchy–Schwarz",
        content:
          "• <b>Định nghĩa tích vô hướng thực (Slides 57 &amp; 58):</b> Là ánh xạ $\\langle \\cdot, \\cdot \\rangle : V \\times V \\to \\mathbb{R}$ thỏa mãn với mọi $u, v, w \\in V$ và $\\lambda \\in \\mathbb{R}$:<br>" +
          "1) $\\langle u, v \\rangle = \\langle v, u \\rangle$ (đối xứng); $\\quad$ 2) $\\langle u + v, w \\rangle = \\langle u, w \\rangle + \\langle v, w \\rangle$ (cộng tính);<br>" +
          "3) $\\langle \\lambda u, v \\rangle = \\lambda \\langle u, v \\rangle$ (thuần nhất); $\\quad$ 4) $\\langle u, u \\rangle \\ge 0$ và $\\langle u, u \\rangle = 0 \\iff u = 0_V$ (xác định dương).<br>" +
          "• <b>Các ví dụ &amp; Phản ví dụ (Slides 59–62):</b><br>" +
          "- Tích vô hướng chính tắc trên $\\mathbb{R}^n$: $\\langle u, v \\rangle = \\sum_{i=1}^n u_i v_i = u^T v$ (vd $\\langle (1,-2,3), (4,0,-1) \\rangle = 1$).<br>" +
          "- Tích vô hướng có trọng số dương: $\\langle u, v \\rangle_* = u_1 v_1 + 2u_2 v_2 + 3u_3 v_3$.<br>" +
          "- Trên $C[a, b]$: $\\langle f, g \\rangle = \\int_a^b f(t)g(t)\\,dt$.<br>" +
          "- <i>Phản ví dụ:</i> $[u, v] = u_1 v_1 - u_2 v_2$ (cho $[(0,1),(0,1)] = -1 < 0$) và $[u, v] = u_1 v_1$ (cho $[(0,1),(0,1)] = 0$ dù $(0,1) \\neq 0$) KHÔNG là tích vô hướng vì vi phạm tính xác định dương.<br>" +
          "• <b>Chuẩn (độ dài) &amp; Tính chất (Slides 63 &amp; 64):</b> $\\|u\\| = \\sqrt{\\langle u, u \\rangle}$ (chuẩn phụ thuộc tích vô hướng đã chọn; vd $\\|(2,-1,2)\\| = 3$, $\\|(1,2)\\|_* = \\sqrt{1 + 2\\cdot 4} = 3$). Tính chất: $\\|u\\| \\ge 0$ ($=0 \\iff u=0_V$); $\\|\\lambda u\\| = |\\lambda|\\|u\\|$; Bất đẳng thức tam giác $\\|u + v\\| \\le \\|u\\| + \\|v\\|$.<br>" +
          "• <b>Định lý Cauchy–Schwarz &amp; Góc (Slides 65–67):</b> $|\\langle u, v \\rangle| \\le \\|u\\|\\|v\\|$, dấu bằng xảy ra $\\iff u, v$ phụ thuộc tuyến tính (chứng minh từ $0 \\le \\|u - tv\\|^2 = \\|u\\|^2 - 2t\\langle u, v \\rangle + t^2\\|v\\|^2$ có biệt thức $\\le 0$). Với $u, v \\neq 0$, góc $\\varphi \\in [0, \\pi]$ xác định bởi $\\cos\\varphi = \\frac{\\langle u, v \\rangle}{\\|u\\|\\|v\\|}$ (vd $u=(1,0), \\; v=(1,1) \\Rightarrow \\varphi = 45^\\circ$).",
        checkpoint: {
          question:
            "Ví dụ (Slides 61 &amp; 65): (a) Trong $C[0, 1]$ với $\\langle f, g \\rangle = \\int_0^1 f(t)g(t)\\,dt$, tính $\\langle f, g \\rangle$ và $\\langle g, g \\rangle$ với $f(t) = 1, \\; g(t) = t$. (b) Kiểm tra bất đẳng thức Cauchy–Schwarz cho $u = (1, 2), \\; v = (2, 1)$.",
          rubric: [
            {
              step: "Bước 1 • Tính tích vô hướng trong C[0, 1] (0.5đ)",
              detail:
                "$\\langle f, g \\rangle = \\int_0^1 1 \\cdot t\\,dt = \\frac{1}{2}$, và $\\langle g, g \\rangle = \\int_0^1 t^2\\,dt = \\frac{1}{3}$.",
            },
            {
              step: "Bước 2 • Kiểm nghiệm Cauchy–Schwarz cho u, v (0.5đ)",
              detail:
                "$|\\langle u, v \\rangle| = |1 \\cdot 2 + 2 \\cdot 1| = 4$, còn $\\|u\\|\\|v\\| = \\sqrt{5}\\sqrt{5} = 5$. Rõ ràng $4 \\le 5$ (bất đẳng thức nghiệm).",
            },
          ],
          trap: "Không định nghĩa góc theo $\\cos\\varphi = \\frac{\\langle u, v \\rangle}{\\|u\\|\\|v\\|}$ nếu một trong hai vectơ bằng $0$.",
        },
      },
      {
        heading:
          "7.10. Trực giao, Hệ trực chuẩn, Định lý Pitago mở rộng & Phép chiếu trực giao",
        content:
          "• <b>Trực giao &amp; Hệ trực chuẩn (Slides 68–70):</b> Hai vectơ $u, v$ trực giao ($u \\perp v$) nếu $\\langle u, v \\rangle = 0$ (vd $(1,1,0) \\perp (1,-1,2)$ trong $\\mathbb{R}^3$; $t \\perp (t - \\frac{2}{3})$ trong $C[0,1]$). Hệ $(u_1, \\dots, u_k)$ là <b>trực giao</b> nếu $\\langle u_i, u_j \\rangle = 0$ ($i \\neq j$), và là <b>trực chuẩn</b> nếu còn thỏa $\\|u_i\\| = 1, \\; \\forall i$ (chuẩn hóa $e_i = u_i / \\|u_i\\|$).<br>" +
          "• <b>Định lý trực giao khác 0 $\\Rightarrow$ ĐLTT (Slide 71):</b> Một hệ hữu hạn các vectơ khác $0$ và đôi một trực giao thì ĐLTT (chứng minh: lấy tích vô hướng $\\sum c_i u_i = 0$ với $u_j$ được $c_j\\|u_j\\|^2 = 0 \\Rightarrow c_j = 0$).<br>" +
          "• <b>Định lý Pitago mở rộng (Slide 72):</b> Nếu $u_1, \\dots, u_k$ đôi một trực giao thì $\\left\\|\\sum_{i=1}^k u_i\\right\\|^2 = \\sum_{i=1}^k \\|u_i\\|^2$ (vd $u_1=(3,0,0), \\; u_2=(0,4,0), \\; u_3=(0,0,12) \\Rightarrow \\|u_1+u_2+u_3\\| = \\sqrt{3^2+4^2+12^2} = 13$).<br>" +
          "• <b>Phép chiếu trực giao (Slides 73 &amp; 74):</b><br>" +
          "- Chiếu $v$ lên đường thẳng $\\operatorname{span}\\{u\\}$ ($u \\neq 0$): $$\\operatorname{proj}_u(v) = \\frac{\\langle v, u \\rangle}{\\langle u, u \\rangle}u.$$" +
          "- Chiếu $v$ lên không gian con $W$ có cơ sở trực chuẩn $(e_1, \\dots, e_k)$: $$\\operatorname{proj}_W(v) = \\sum_{i=1}^k \\langle v, e_i \\rangle e_i$$ (vd $W = \\operatorname{span}\\{(1,0,0),(0,1,0)\\}, \\; v=(2,-1,5) \\Rightarrow \\operatorname{proj}_W(v) = (2,-1,0)$, phần dư $(0,0,5) \\perp W$).",
        checkpoint: {
          question:
            "Ví dụ phép chiếu trực giao (Slide 73): Với $u = (1, 1)$ và $v = (3, 1)$, hãy tính $\\operatorname{proj}_u(v)$ và kiểm tra phần dư $r = v - \\operatorname{proj}_u(v)$ trực giao với $u$.",
          rubric: [
            {
              step: "Bước 1 • Tính hình chiếu proj_u(v) (0.5đ)",
              detail:
                "$$\\operatorname{proj}_u(v) = \\frac{\\langle v, u \\rangle}{\\langle u, u \\rangle}u = \\frac{3 + 1}{1 + 1}(1, 1) = (2, 2).$$",
            },
            {
              step: "Bước 2 • Kiểm tra phần dư trực giao với u (0.5đ)",
              detail:
                "$r = v - \\operatorname{proj}_u(v) = (3, 1) - (2, 2) = (1, -1)$. Ta có $\\langle r, u \\rangle = 1 - 1 = 0 \\Rightarrow r \\perp u$.",
            },
          ],
          trap: "Vectơ không $0_V$ trực giao với mọi vectơ nhưng KHÔNG bao giờ được dùng làm phần tử của một cơ sở trực giao.",
        },
      },
      {
        heading:
          "7.11. Thuật toán Gram–Schmidt, Ma trận trực giao & Tọa độ trực chuẩn",
        content:
          "• <b>Định lý &amp; Thuật toán Gram–Schmidt (Slide 75):</b> Từ hệ ĐLTT $(u_1, \\dots, u_k)$ trong không gian Euclide, tạo hệ trực giao $(v_1, \\dots, v_k)$ thỏa $\\operatorname{span}(u_1,\\dots,u_j) = \\operatorname{span}(v_1,\\dots,v_j)$: $$v_1 = u_1, \\qquad v_j = u_j - \\sum_{i=1}^{j-1} \\frac{\\langle u_j, v_i \\rangle}{\\langle v_i, v_i \\rangle}v_i \\quad (j \\ge 2),$$ sau đó chuẩn hóa $e_j = v_j / \\|v_j\\|$ để thu được hệ trực chuẩn.<br>" +
          "• <b>Gram–Schmidt trong không gian đa thức $P_2$ (Slides 80 &amp; 81):</b> Với $\\langle p, q \\rangle = \\int_{-1}^1 p(x)q(x)\\,dx$ và cơ sở $(1, x, x^2)$: $v_1 = 1$ ($\\|v_1\\|^2 = 2$), $v_2 = x$ ($\\|v_2\\|^2 = 2/3$), $v_3 = x^2 - \\frac{2/3}{2}\\cdot 1 = x^2 - \\frac{1}{3}$ ($\\|v_3\\|^2 = \\frac{8}{45}$), chuẩn hóa được $e_1 = \\frac{1}{\\sqrt{2}}, \\; e_2 = \\sqrt{\\frac{3}{2}}x, \\; e_3 = \\sqrt{\\frac{45}{8}}\\left(x^2 - \\frac{1}{3}\\right)$.<br>" +
          "• <b>Ma trận trực giao &amp; Phân tích theo cơ sở trực chuẩn (Slides 82 &amp; 83):</b> Nếu $E, F$ là hai cơ sở trực chuẩn của $\\mathbb{R}^n$, ma trận chuyển $Q$ thỏa $Q^T Q = I, \\; Q^{-1} = Q^T$ (bảo toàn tích vô hướng và độ dài, vd $Q = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & -1 \\\\ 1 & 1 \\end{pmatrix}$). Trong cơ sở trực chuẩn $(e_1, \\dots, e_n)$, mọi vectơ phân tích ngay bằng tích vô hướng: $v = \\sum_{i=1}^n \\langle v, e_i \\rangle e_i$ (vd $e_1 = \\frac{(1,1)}{\\sqrt{2}}, \\; e_2 = \\frac{(-1,1)}{\\sqrt{2}}, \\; v=(3,1) \\Rightarrow [v]_E = (2\\sqrt{2}, -\\sqrt{2})^T$).",
        checkpoint: {
          question:
            "Ví dụ Gram–Schmidt trên $\\mathbb{R}^3$ (Slides 76–79): Trực giao hóa và trực chuẩn hóa hệ $u_1 = (1, 1, 0), \\; u_2 = (1, 0, 1), \\; u_3 = (0, 1, 1)$.",
          rubric: [
            {
              step: "Bước 1 • Tìm v₁ và w₂ (0.35đ)",
              detail:
                "$v_1 = u_1 = (1, 1, 0)$ ($\\langle v_1, v_1 \\rangle = 2$).<br>" +
                "$v_2 = (1, 0, 1) - \\frac{1}{2}(1, 1, 0) = \\left(\\frac{1}{2}, -\\frac{1}{2}, 1\\right)$. Chọn bội nguyên $w_2 = 2v_2 = (1, -1, 2)$ ($\\|w_2\\|^2 = 6$).",
            },
            {
              step: "Bước 2 • Tìm w₃ (0.35đ)",
              detail:
                "$v_3 = (0, 1, 1) - \\frac{1}{2}(1, 1, 0) - \\frac{1}{6}(1, -1, 2) = \\left(-\\frac{2}{3}, \\frac{2}{3}, \\frac{2}{3}\\right)$. Chọn $w_3 = \\frac{3}{2}v_3 = (-1, 1, 1)$.",
            },
            {
              step: "Bước 3 • Chuẩn hóa thu được cơ sở trực chuẩn (0.3đ)",
              detail:
                "$e_1 = \\frac{(1, 1, 0)}{\\sqrt{2}}, \\quad e_2 = \\frac{(1, -1, 2)}{\\sqrt{6}}, \\quad e_3 = \\frac{(-1, 1, 1)}{\\sqrt{3}}$.",
            },
          ],
          trap: "Có thể nhân $v_j$ với một hằng số khác $0$ cho gọn phân số ở bước trực giao trước khi tính $v_{j+1}$, nhưng cuối cùng nhớ chia cho chuẩn $\\|w_j\\|$ mới nhất khi trực chuẩn hóa!",
        },
      },
      {
        heading: "7.12. Bảng tổng hợp khái niệm & Kết luận Chương 7",
        content:
          "• <b>Bảng tổng hợp các khái niệm (Slide 86):</b><br>" +
          "1) <b>Không gian con $W$:</b> Đóng với mọi tổ hợp $\\lambda u + \\mu v$ (và chứa $0_V$).<br>" +
          "2) <b>Hệ sinh:</b> $\\operatorname{span}\\{v_1, \\dots, v_k\\} = V$.<br>" +
          "3) <b>Độc lập tuyến tính:</b> $\\sum c_i v_i = 0 \\Rightarrow c_i = 0$ với mọi $i$.<br>" +
          "4) <b>Cơ sở:</b> Hệ sinh và độc lập tuyến tính (vừa đủ sinh, vừa không dư).<br>" +
          "5) <b>Số chiều:</b> Số vectơ của một cơ sở.<br>" +
          "6) <b>Không gian nghiệm:</b> $N(A) = \\{x : Ax = 0\\}$; $\\dim N(A) = n - \\operatorname{rank}(A)$.<br>" +
          "7) <b>Đổi cơ sở:</b> $[v]_C = P_C^{-1} P_B [v]_B$.<br>" +
          "8) <b>Không gian Euclide:</b> $\\|u\\| = \\sqrt{\\langle u, u \\rangle}$; trực giao, Gram–Schmidt.<br>" +
          "• <b>Kết luận chương 7 (Slide 90):</b> Không gian vectơ cho phép thao tác tuyến tính trên bộ số, ma trận, đa thức, hàm số; khử Gauss là công cụ xuyên suốt để kiểm tra hệ sinh, ĐLTT, tìm cơ sở và giải hệ thuần nhất; đổi cơ sở chỉ thay đổi biểu diễn tọa độ chứ không thay đổi bản thân vectơ; tích vô hướng cho phép đo độ dài, góc và xây dựng cơ sở trực chuẩn.",
        checkpoint: {
          question:
            "Lộ trình hệ thống hóa (Slide 2): Cho $4$ vectơ trong $\\mathbb{R}^3$, hãy nêu quy trình dùng khử Gauss để vừa tìm số chiều của không gian sinh vừa chọn ra một cơ sở của nó.",
          rubric: [
            {
              step: "Bước 1 • Xếp vectơ thành cột và khử Gauss (0.5đ)",
              detail:
                "Xếp $4$ vectơ thành $4$ cột của ma trận $A$ cỡ $3 \\times 4$ và khử Gauss đưa về bậc thang dòng để đếm số pivot $r = \\operatorname{rank}(A)$.",
            },
            {
              step: "Bước 2 • Kết luận số chiều và chọn cơ sở từ ma trận gốc (0.5đ)",
              detail:
                "Số chiều $\\dim\\operatorname{span} = r$, và các vectơ trong ma trận gốc ứng với $r$ cột chứa phần tử trụ tạo thành một cơ sở của không gian sinh đó.",
            },
          ],
          trap: "Luôn nhớ: khử Gauss trên ma trận cột giúp tìm đồng thời hạng, tính ĐLTT và chọn đúng cơ sở không dư vectơ!",
        },
      },
    ],
    exercises: [
      {
        level: "Cơ bản",
        question:
          "Bài tập tự luyện 1 – Không gian con, hệ sinh (Slide 87):<br>1) Xét $W = \\{(x, y, z) : 2x - y + z = 0\\}$. Chứng minh $W$ là không gian con và tìm một hệ sinh.<br>2) Xét $T = \\{(x, y) : x + y \\ge 0\\}$. $T$ có là không gian con của $\\mathbb{R}^2$ không? Giải thích.<br>3) Trong $P_2$, tìm hệ sinh của $U = \\{p : p(0) = 0\\}$.<br>4) Kiểm tra $(2, 1, 3)$ có thuộc $\\operatorname{span}\\{(1, 0, 1), (0, 1, 1)\\}$ không.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.3đ)</span> • Có $2(0) - 0 + 0 = 0 \\Rightarrow (0, 0, 0) \\in W$ ($W \\neq \\varnothing$). Với $u=(x_1,y_1,z_1), \\; v=(x_2,y_2,z_2) \\in W$ và $\\lambda, \\mu \\in \\mathbb{R}$, ta có $2(\\lambda x_1 + \\mu x_2) - (\\lambda y_1 + \\mu y_2) + (\\lambda z_1 + \\mu z_2) = \\lambda(2x_1 - y_1 + z_1) + \\mu(2x_2 - y_2 + z_2) = 0 \\Rightarrow \\lambda u + \\mu v \\in W$. Vậy $W \\le \\mathbb{R}^3$.<br>
            • Từ $y = 2x + z \\Rightarrow (x, y, z) = x(1, 2, 0) + z(0, 1, 1) \\Rightarrow$ một hệ sinh của $W$ là $\\{(1, 2, 0), (0, 1, 1)\\}$.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.2đ)</span> <b>Không</b>. Dù $(0, 0) \\in T$, lấy $u = (1, 1) \\in T$ ($1 + 1 = 2 \\ge 0$) và $\\lambda = -1$ thì $(-1)u = (-1, -1) \\notin T$ (vì $-1 - 1 = -2 < 0$). Tập $T$ không đóng đối với phép nhân vô hướng.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.25đ)</span> Với $p(x) = a_0 + a_1 x + a_2 x^2 \\in P_2$, điều kiện $p(0) = 0 \\iff a_0 = 0 \\iff p(x) = a_1 x + a_2 x^2$. Vậy $U = \\operatorname{span}\\{x, x^2\\}$ (một hệ sinh là $\\{x, x^2\\}$).</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.25đ)</span> Giải $a(1, 0, 1) + b(0, 1, 1) = (2, 1, 3) \\iff \\begin{cases} a = 2 \\\\ b = 1 \\\\ a + b = 3 \\end{cases}$ có nghiệm duy nhất $(a, b) = (2, 1)$. Vậy $(2, 1, 3) \\in \\operatorname{span}\\{(1, 0, 1), (0, 1, 1)\\}$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Ở câu 1) phải kiểm tra đủ 2 bước: chứa $(0, 0, 0)$ và đóng với tổ hợp $\\lambda u + \\mu v$.</div>
          </div>`,
      },
      {
        level: "Vừa",
        question:
          "Bài tập tự luyện 2 – Độc lập, cơ sở, tọa độ (Slide 88):<br>1) Xét tính ĐLTT của $(1, 1, 0), \\; (1, 0, 1), \\; (0, 1, 1)$.<br>2) Tìm $m$ để $(1, 0, 1), \\; (0, 1, 1), \\; (1, 1, m)$ là cơ sở của $\\mathbb{R}^3$.<br>3) Trong $P_2$, chứng minh $(1, x, 1 + x^2)$ là cơ sở, rồi tìm tọa độ của $3 - x + 2x^2$.<br>4) Tìm cơ sở và số chiều của $W = \\{(x, y, z) : x - 2y + z = 0\\}$.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.25đ)</span> Lập ma trận cột $A = \\begin{pmatrix} 1 & 1 & 0 \\\\ 1 & 0 & 1 \\\\ 0 & 1 & 1 \\end{pmatrix}$. Tính $\\det A = 1(0 - 1) - 1(1 - 0) = -2 \\neq 0$ ($\\operatorname{rank} A = 3$). Vậy hệ <b>độc lập tuyến tính</b>.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.25đ)</span> Ba vectơ trong $\\mathbb{R}^3$ tạo thành cơ sở khi và chỉ khi $\\det \\begin{pmatrix} 1 & 0 & 1 \\\\ 0 & 1 & 1 \\\\ 1 & 1 & m \\end{pmatrix} = m - 2 \\neq 0 \\iff m \\neq 2$.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.25đ)</span> Lấy tọa độ theo cơ sở chính tắc $E = (1, x, x^2)$ lập $P_B = \\begin{pmatrix} 1 & 0 & 1 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}$ có $\\det P_B = 1 \\neq 0$, nên hệ 3 vectơ ĐLTT trong không gian 3 chiều $P_2 \\Rightarrow$ là cơ sở.<br>
            Viết $3 - x + 2x^2 = a(1) + b(x) + c(1 + x^2) \\iff c = 2, \\; b = -1, \\; a + c = 3 \\Rightarrow a = 1$. Tọa độ là $[3 - x + 2x^2]_B = (1, -1, 2)^T$.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.25đ)</span> Từ $x = 2y - z$, đặt $y = s, \\; z = t \\Rightarrow (x, y, z) = s(2, 1, 0) + t(-1, 0, 1)$. Hai vectơ $(2, 1, 0)$ và $(-1, 0, 1)$ không tỉ lệ nên ĐLTT và sinh $W$. Vậy cơ sở của $W$ là $\\{ (2, 1, 0), \\; (-1, 0, 1) \\}$ và $\\dim W = 2$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Ở câu 3) nhiều bạn chỉ lập $3 - x + 2x^2 = 1 + (-1)x + 2(1+x^2)$ mà quên chứng minh $(1, x, 1+x^2)$ là cơ sở của $P_2$ trước đó.</div>
          </div>`,
      },
      {
        level: "Khó",
        question:
          "Bài tập tự luyện 3 – Không gian nghiệm và đổi cơ sở (Slide 89):<br>1) Tìm cơ sở của nghiệm hệ $\\begin{cases} x_1 + x_2 + x_3 + x_4 = 0, \\\\ x_2 + x_3 = 0. \\end{cases}$<br>2) Với $A = \\begin{pmatrix} 1 & 2 & 0 \\\\ 0 & 1 & 3 \\end{pmatrix}$, tính $\\dim N(A)$ và tìm một cơ sở của $N(A)$.<br>3) Cho $B = ((1, 1), (1, -1)), \\; C = ((2, 1), (1, 1))$. Tìm $P_{C \\leftarrow B}$.<br>4) Tìm $[v]_C$ nếu $[v]_B = (2, -1)^T$ trong bài 3.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.25đ)</span> Hai cột trụ là cột 1 ($x_1$) và cột 2 ($x_2$). Đặt $x_3 = s, \\; x_4 = t$: $x_2 = -s$, $x_1 = s - s - t = -t$. Suy ra $x = s(0, -1, 1, 0) + t(-1, 0, 0, 1)$. Cơ sở không gian nghiệm: $\\{(0, -1, 1, 0), \\; (-1, 0, 0, 1)\\}$.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.25đ)</span> $A$ đã ở dạng bậc thang với $\\operatorname{rank}(A) = 2$ và số cột $n = 3 \\Rightarrow \\dim N(A) = 3 - 2 = 1$. Giải $Ax = 0$: đặt $x_3 = t \\Rightarrow x_2 = -3t, \\; x_1 = 6t$. Cơ sở của $N(A)$ là $\\{(6, -3, 1)^T\\}$.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.3đ)</span> Ta có $P_B = \\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}$, $P_C = \\begin{pmatrix} 2 & 1 \\\\ 1 & 1 \\end{pmatrix} \\Rightarrow P_C^{-1} = \\begin{pmatrix} 1 & -1 \\\\ -1 & 2 \\end{pmatrix}$. Suy ra:
            $$P_{C \\leftarrow B} = P_C^{-1} P_B = \\begin{pmatrix} 1 & -1 \\\\ -1 & 2 \\end{pmatrix}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix} = \\begin{pmatrix} 0 & 2 \\\\ 1 & -3 \\end{pmatrix}.$$</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.2đ)</span> $[v]_C = P_{C \\leftarrow B}[v]_B = \\begin{pmatrix} 0 & 2 \\\\ 1 & -3 \\end{pmatrix}\\begin{pmatrix} 2 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} -2 \\\\ 5 \\end{pmatrix}$ (kiểm tra: $-2(2,1) + 5(1,1) = (1,3) = 2(1,1) - 1(1,-1)$).</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Ở câu 3) rất hay nhầm tính $P_B^{-1}P_C$ (đó là $P_{B \\leftarrow C}$, ngược chiều!) thay vì $P_C^{-1}P_B$.</div>
          </div>`,
      },
      {
        level: "Cơ bản",
        question:
          "Bài tập tự luyện – Không gian Euclide (1) (Slide 84):<br>1) Trong $\\mathbb{R}^3$, tính $\\langle u, v \\rangle, \\; \\|u\\|, \\; \\|v\\|$ và góc giữa $u = (1, 2, 2), \\; v = (2, -1, 2)$.<br>2) Với $u = (1, m, 2)$ và $v = (3, -1, 1)$, tìm $m$ để $u \\perp v$.<br>3) Kiểm tra $\\langle u, v \\rangle = 2u_1 v_1 + 3u_2 v_2$ có là tích vô hướng trên $\\mathbb{R}^2$ không.<br>4) Tính $\\operatorname{proj}_u(v)$ với $u = (1, 2, 0), \\; v = (3, 0, 1)$.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.25đ)</span> $\\langle u, v \\rangle = 1(2) + 2(-1) + 2(2) = 4$; $\\|u\\| = \\sqrt{1 + 4 + 4} = 3$; $\\|v\\| = \\sqrt{4 + 1 + 4} = 3$; $\\cos\\varphi = \\frac{4}{3 \\cdot 3} = \\frac{4}{9} \\Rightarrow \\varphi = \\arccos\\frac{4}{9}$.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.2đ)</span> $u \\perp v \\iff \\langle u, v \\rangle = 1(3) + m(-1) + 2(1) = 5 - m = 0 \\iff m = 5$.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.3đ)</span> Kiểm tra đủ 4 tiên đề với mọi $u, v, w \\in \\mathbb{R}^2, \\; \\lambda \\in \\mathbb{R}$:<br>
            (1) $\\langle u, v \\rangle = 2u_1 v_1 + 3u_2 v_2 = \\langle v, u \\rangle$ (đối xứng);<br>
            (2) $\\langle u + v, w \\rangle = 2(u_1 + v_1)w_1 + 3(u_2 + v_2)w_2 = \\langle u, w \\rangle + \\langle v, w \\rangle$ (cộng tính);<br>
            (3) $\\langle \\lambda u, v \\rangle = 2(\\lambda u_1)v_1 + 3(\\lambda u_2)v_2 = \\lambda\\langle u, v \\rangle$ (thuần nhất);<br>
            (4) $\\langle u, u \\rangle = 2u_1^2 + 3u_2^2 \\ge 0$ và $= 0 \\iff u_1 = u_2 = 0$ (xác định dương). Vậy <b>có</b> là tích vô hướng trên $\\mathbb{R}^2$.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.25đ)</span> $\\langle v, u \\rangle = 3(1) + 0(2) + 1(0) = 3$, $\\langle u, u \\rangle = 1 + 4 + 0 = 5$. Vậy $\\operatorname{proj}_u(v) = \\frac{3}{5}(1, 2, 0) = \\left(\\frac{3}{5}, \\frac{6}{5}, 0\\right)$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Ở câu 3) chứng minh tích vô hướng bắt buộc phải kiểm tra đầy đủ cả 4 tiên đề (đặc biệt là tiên đề 4 xác định dương).</div>
          </div>`,
      },
      {
        level: "Khó",
        question:
          "Bài tập tự luyện – Không gian Euclide (2) (Slide 85):<br>1) Trực giao hóa và trực chuẩn hóa $(1, 1, 0), \\; (1, 0, 1), \\; (0, 1, 1)$.<br>2) Trong $P_2$ với $\\langle p, q \\rangle = \\int_0^1 p(x)q(x)\\,dx$, tìm một cơ sở trực giao xuất phát từ $(1, x)$ của $P_1$.<br>3) Cho $W = \\operatorname{span}\\{(1, 1, 0), \\; (0, 0, 1)\\}$. Tìm cơ sở trực chuẩn của $W$ và hình chiếu của $(2, 0, 3)$ lên $W$.<br>4) Chứng minh $Q^T Q = I$ với $Q = \\frac{1}{5}\\begin{pmatrix} 3 & -4 \\\\ 4 & 3 \\end{pmatrix}$.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.3đ)</span> $v_1 = (1, 1, 0)$; $v_2 = (1, 0, 1) - \\frac{1}{2}(1, 1, 0) = \\left(\\frac{1}{2}, -\\frac{1}{2}, 1\\right)$, lấy $w_2 = 2v_2 = (1, -1, 2)$; $v_3 = (0, 1, 1) - \\frac{1}{2}(1, 1, 0) - \\frac{1}{6}(1, -1, 2) = \\left(-\\frac{2}{3}, \\frac{2}{3}, \\frac{2}{3}\\right)$, lấy $w_3 = \\frac{3}{2}v_3 = (-1, 1, 1)$.<br>
            • Hệ trực giao: $(1, 1, 0), \\; (1, -1, 2), \\; (-1, 1, 1)$.<br>
            • Hệ trực chuẩn: $e_1 = \\frac{(1, 1, 0)}{\\sqrt{2}}, \\; e_2 = \\frac{(1, -1, 2)}{\\sqrt{6}}, \\; e_3 = \\frac{(-1, 1, 1)}{\\sqrt{3}}$.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.25đ)</span> Đặt $v_1 = 1 \\Rightarrow \\langle 1, 1 \\rangle = \\int_0^1 1\\,dx = 1$, $\\langle x, 1 \\rangle = \\int_0^1 x\\,dx = \\frac{1}{2}$. Khi đó $v_2 = x - \\frac{\\langle x, 1 \\rangle}{\\langle 1, 1 \\rangle} \\cdot 1 = x - \\frac{1}{2}$. Cơ sở trực giao là $\\left(1, \\; x - \\frac{1}{2}\\right)$.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.25đ)</span> Vì $\\langle (1, 1, 0), (0, 0, 1) \\rangle = 0$, hai vectơ đã trực giao. Chuẩn hóa được cơ sở trực chuẩn của $W$: $e_1 = \\frac{1}{\\sqrt{2}}(1, 1, 0), \\; e_2 = (0, 0, 1)$.<br>
            Hình chiếu của $v = (2, 0, 3)$ lên $W$: $\\operatorname{proj}_W(v) = \\langle v, e_1 \\rangle e_1 + \\langle v, e_2 \\rangle e_2 = \\sqrt{2}\\cdot\\frac{(1, 1, 0)}{\\sqrt{2}} + 3(0, 0, 1) = (1, 1, 3)$.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.2đ)</span> Ta có $Q^T = \\frac{1}{5}\\begin{pmatrix} 3 & 4 \\\\ -4 & 3 \\end{pmatrix} \\Rightarrow Q^T Q = \\frac{1}{25}\\begin{pmatrix} 3 & 4 \\\\ -4 & 3 \\end{pmatrix}\\begin{pmatrix} 3 & -4 \\\\ 4 & 3 \\end{pmatrix} = \\frac{1}{25}\\begin{pmatrix} 25 & 0 \\\\ 0 & 25 \\end{pmatrix} = I_2$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Ở câu 3) công thức $\\operatorname{proj}_W(v) = \\sum \\langle v, e_i \\rangle e_i$ CHỈ đúng khi $(e_1, e_2)$ là cơ sở TRỰC CHUẨN (không được thay thẳng bằng cơ sở chưa chuẩn hóa $(1, 1, 0)$ mà quên chia cho $\\|u_1\\|^2 = 2$)!</div>
          </div>`,
      },
    ],
    quiz: [
      {
        question:
          "Tập hợp nào sau đây KHÔNG phải là không gian con của $\\mathbb{R}^2$?",
        options: [
          "$W_1 = \\{(x, y) : 2x - 3y = 0\\}$",
          "$W_2 = \\{(x, y) : xy = 0\\}$",
          "$W_3 = \\{(t, 5t) : t \\in \\mathbb{R}\\}$",
          "$W_4 = \\{(0, 0)\\}$",
        ],
        answer: 1,
        explanation:
          "$W_2$ chứa $(1, 0)$ và $(0, 1)$ nhưng tổng $(1, 1) \\notin W_2$ nên không đóng đối với phép cộng.",
      },
      {
        question:
          "Cho $4$ vectơ tùy ý trong $\\mathbb{R}^3$. Khẳng định nào sau đây LUÔN đúng?",
        options: [
          "Hệ chắc chắn phụ thuộc tuyến tính",
          "Hệ chắc chắn sinh $\\mathbb{R}^3$",
          "Hệ có thể độc lập tuyến tính",
          "Hệ là một cơ sở của $\\mathbb{R}^3$",
        ],
        answer: 0,
        explanation:
          "Trong $\\mathbb{R}^n$, mọi hệ có nhiều hơn $n$ vectơ ($4 > 3$) đều phụ thuộc tuyến tính.",
      },
      {
        question:
          "Hệ vectơ $(1, 0, 1), \\; (0, 1, 1), \\; (1, 1, m)$ tạo thành một cơ sở của $\\mathbb{R}^3$ khi và chỉ khi:",
        options: ["$m = 2$", "$m \\neq 2$", "$m = 0$", "$m \\neq 0$"],
        answer: 1,
        explanation:
          "Định thức ma trận cột bằng $m - 2$; 3 vectơ trong $\\mathbb{R}^3$ là cơ sở $\\iff \\det A \\neq 0 \\iff m \\neq 2$.",
      },
      {
        question:
          "Cho ma trận $A$ cỡ $3 \\times 5$ có $\\operatorname{rank}(A) = 2$. Theo định lý hạng – số chiều, $\\dim N(A)$ bằng:",
        options: ["$1$", "$2$", "$3$", "$5$"],
        answer: 2,
        explanation:
          "Theo định lý rank–nullity, $\\dim N(A) = n - \\operatorname{rank}(A) = 5 - 2 = 3$ (dùng số cột $n = 5$, không dùng số hàng $m = 3$).",
      },
      {
        question:
          "Trong $P_2$, tọa độ của đa thức $p(x) = 2 + 3x + 4x^2$ trong cơ sở $B = (1, x, 1 + x^2)$ là:",
        options: [
          "$(2, 3, 4)^T$",
          "$(-2, 3, 4)^T$",
          "$(4, 3, 2)^T$",
          "$(2, 3, -4)^T$",
        ],
        answer: 1,
        explanation:
          "$2 + 3x + 4x^2 = -2(1) + 3(x) + 4(1 + x^2)$, nên $[p]_B = (-2, 3, 4)^T$.",
      },
      {
        question:
          "Công thức ma trận chuyển tọa độ $P_{C \\leftarrow B}$ (nhận $[v]_B$ và trả về $[v]_C$) là:",
        options: ["$P_B^{-1} P_C$", "$P_C^{-1} P_B$", "$P_C P_B$", "$P_B P_C$"],
        answer: 1,
        explanation:
          "Từ $P_B[v]_B = P_C[v]_C$ suy ra $[v]_C = P_C^{-1} P_B [v]_B$, tức $P_{C \\leftarrow B} = P_C^{-1} P_B$.",
      },
      {
        question:
          "Biểu thức nào sau đây KHÔNG phải là tích vô hướng trên $\\mathbb{R}^2$?",
        options: [
          "$\\langle u, v \\rangle = u_1 v_1 + u_2 v_2$",
          "$\\langle u, v \\rangle = 2u_1 v_1 + 3u_2 v_2$",
          "$\\langle u, v \\rangle = u_1 v_1 - u_2 v_2$",
          "$\\langle u, v \\rangle = 5u_1 v_1 + u_2 v_2$",
        ],
        answer: 2,
        explanation:
          "Với $u = (0, 1) \\neq 0$, $u_1^2 - u_2^2 = -1 < 0$, vi phạm tiên đề xác định dương.",
      },
      {
        question:
          "Trong không gian Euclide $\\mathbb{R}^3$ với tích vô hướng chính tắc, phép chiếu trực giao của $v = (3, 1, 0)$ lên $u = (1, 1, 0)$ là:",
        options: ["$(2, 2, 0)$", "$(1, 1, 0)$", "$(3, 3, 0)$", "$(1, -1, 0)$"],
        answer: 0,
        explanation:
          "$\\operatorname{proj}_u(v) = \\frac{\\langle v, u \\rangle}{\\langle u, u \\rangle}u = \\frac{3 + 1}{1 + 1}(1, 1, 0) = (2, 2, 0)$.",
      },
    ],
  },
];
