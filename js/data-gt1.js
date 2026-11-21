// =========================================================================
// MATHLAB MINI — DỮ LIỆU CHUYÊN ĐỀ GIẢI TÍCH 1 (DATA_GT1)
// =========================================================================

const DATA_GT1 = [
  {
    id: "gt-c1",
    code: "GIẢI TÍCH 1 • CHƯƠNG 1",
    subject: "Giải tích 1",
    level: "Cơ bản",
    title: "Giới hạn và Liên tục của hàm số",
    summary:
      "Ánh xạ (đơn ánh, toàn ánh, song ánh, ảnh & tạo ảnh), Giới hạn của dãy số (ε - N, tính chất, tiêu chuẩn kẹp, Weierstrass, tốc độ tăng), Giới hạn hàm số (ε - δ, Heine, giới hạn một phía, các giới hạn cơ bản & số e), Vô cùng bé – Vô cùng lớn tương đương, và Hàm số liên tục (điểm gián đoạn, Weierstrass, Bolzano–Cauchy).",
    previewFormula:
      "$$\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n = e, \\quad \\lim_{x \\to 0} \\frac{\\sin x}{x} = 1, \\quad \\lim_{x \\to x_0} f(x) = f(x_0)$$",
    bannerGradient: "linear-gradient(135deg, #2563eb 0%, #0891b2 100%)",
    theory: [
      {
        heading: "1.1. Khái niệm ánh xạ",
        content:
          "• <b>Định nghĩa:</b> Cho hai tập hợp khác rỗng $X, Y$. Một quy tắc $f$ gán mỗi $x \\in X$ với duy nhất một $y \\in Y$ được gọi là một <b>ánh xạ</b> từ $X$ vào $Y$, ký hiệu: $$f : X \\to Y, \\qquad y = f(x).$$" +
          "• <b>Các thành phần:</b><br>" +
          "- $X$: tập xác định (miền nguồn);<br>" +
          "- $Y$: tập đích;<br>" +
          "- $f(X) = \\{f(x) : x \\in X\\}$: miền giá trị của $f$.",
        checkpoint: {
          question:
            "Ví dụ (1.1): Xét ánh xạ $f : \\mathbb{R} \\to \\mathbb{R}$, $f(x) = x^2$. Hãy xác định tập xác định, tập đích và miền giá trị $f(\\mathbb{R})$ của $f$.",
          rubric: [
            {
              step: "Bước 1 • Xác định các thành phần của ánh xạ (0.5đ)",
              detail:
                "Tập xác định (miền nguồn) là $X = \\mathbb{R}$; tập đích là $Y = \\mathbb{R}$. Với mọi $x \\in \\mathbb{R}$, ta có $x^2 \\ge 0$ và mọi số $y \\ge 0$ đều có $x = \\sqrt{y} \\in \\mathbb{R}$ thỏa $f(x) = y$.",
            },
            {
              step: "Bước 2 • Kết luận miền giá trị (0.5đ)",
              detail:
                "$f : \\mathbb{R} \\to \\mathbb{R}$, $f(x) = x^2$ là một ánh xạ. Tuy nhiên miền giá trị $f(\\mathbb{R}) = [0, +\\infty) \\neq \\mathbb{R}$.",
            },
          ],
          trap: "Đừng nhầm lẫn giữa tập đích $Y$ (tập chứa các giá trị đầu ra được khai báo) và miền giá trị $f(X)$ (tập thực sự các giá trị đầu ra đạt được).",
        },
      },
      {
        heading: "1.2 & 1.3. Đơn ánh, toàn ánh, song ánh và Ánh xạ ngược",
        content:
          "• <b>Định nghĩa:</b> Với $f : X \\to Y$:<br>" +
          "- <b>Đơn ánh:</b> $f(x_1) = f(x_2) \\Rightarrow x_1 = x_2$.<br>" +
          "- <b>Toàn ánh:</b> $f(X) = Y$.<br>" +
          "- <b>Song ánh:</b> vừa đơn ánh vừa toàn ánh.<br>" +
          "• <b>Ánh xạ ngược:</b> Nếu $f : X \\to Y$ là song ánh thì tồn tại duy nhất ánh xạ $f^{-1} : Y \\to X$ sao cho: $$f^{-1}(y) = x \\iff f(x) = y.$$" +
          "• <b>Ví dụ phản chứng (1.3):</b> Xét $f_2(x) = x^2$, $f_2 : \\mathbb{R} \\to \\mathbb{R}$:<br>" +
          "- Không đơn ánh vì $f_2(1) = f_2(-1)$ (dù $1 \\neq -1$).<br>" +
          "- Không toàn ánh vì $-1 \\notin f_2(\\mathbb{R})$.",
        checkpoint: {
          question:
            "Ví dụ (1.3): Cho ánh xạ $f_1(x) = 2x + 3$, $f_1 : \\mathbb{R} \\to \\mathbb{R}$. Chứng minh $f_1$ là song ánh và tìm ánh xạ ngược $f_1^{-1}$.",
          rubric: [
            {
              step: "Bước 1 • Giải phương trình f₁(x) = y với y ∈ ℝ tùy ý (0.5đ)",
              detail:
                "Với mọi $y \\in \\mathbb{R}$, phương trình $2x + 3 = y$ có duy nhất nghiệm: $$x = \\frac{y - 3}{2} \\in \\mathbb{R}.$$",
            },
            {
              step: "Bước 2 • Kết luận song ánh và viết ánh xạ ngược (0.5đ)",
              detail:
                "Vì mỗi $y \\in \\mathbb{R}$ đều có duy nhất một $x \\in \\mathbb{R}$ sao cho $f_1(x) = y$, nên $f_1$ vừa đơn ánh vừa toàn ánh. Do đó $f_1$ là <b>song ánh</b> và $f_1^{-1}(y) = \\frac{y - 3}{2}$.",
            },
          ],
          trap: "Để chứng minh không đơn ánh chỉ cần chỉ ra 1 cặp $x_1 \\neq x_2$ có cùng ảnh; để chứng minh không toàn ánh chỉ cần chỉ ra 1 phần tử trong tập đích $Y$ không thuộc miền giá trị $f(X)$.",
        },
      },
      {
        heading: "1.4. Thay đổi miền xác định và tập đích",
        content:
          "• <b>Điểm cần nhớ:</b> Tính chất đơn ánh/toàn ánh phụ thuộc vào <b>cả miền xác định và tập đích</b>, không chỉ phụ thuộc vào công thức $f(x)$.<br>" +
          "• Khi thu hẹp miền xác định và tập đích phù hợp, một ánh xạ ban đầu không đơn ánh và không toàn ánh (như $x \\mapsto x^2$ trên $\\mathbb{R} \\to \\mathbb{R}$) có thể trở thành song ánh.",
        checkpoint: {
          question:
            "Ví dụ (1.4): Xét ánh xạ $f_3 : [0, +\\infty) \\to [0, +\\infty)$, $f_3(x) = x^2$. Chứng minh $f_3$ là song ánh và tìm $f_3^{-1}(y)$.",
          rubric: [
            {
              step: "Bước 1 • Kiểm tra tính đơn ánh và toàn ánh (0.5đ)",
              detail:
                "Nếu $x_1^2 = x_2^2$ và $x_1, x_2 \\ge 0$ thì $x_1 = x_2$ (nên $f_3$ đơn ánh). Với mọi $y \\ge 0$, phương trình $x^2 = y$ có nghiệm duy nhất $x = \\sqrt{y} \\in [0, +\\infty)$ (nên $f_3$ toàn ánh).",
            },
            {
              step: "Bước 2 • Kết luận ánh xạ ngược (0.5đ)",
              detail:
                "Vậy $f_3$ là song ánh và ánh xạ ngược là $f_3^{-1}(y) = \\sqrt{y}$.",
            },
          ],
          trap: "Luôn kiểm tra kỹ ký hiệu miền nguồn và tập đích của đề bài trước khi kết luận đơn ánh, toàn ánh hay song ánh.",
        },
      },
      {
        heading: "1.5. Ảnh và tạo ảnh",
        content:
          "• <b>Định nghĩa:</b> Cho ánh xạ $f : X \\to Y$, và các tập con $A \\subset X$, $B \\subset Y$:<br>" +
          "- <b>Ảnh</b> của tập $A$: $$f(A) = \\{f(x) : x \\in A\\}.$$" +
          "- <b>Tạo ảnh</b> của tập $B$: $$f^{-1}(B) = \\{x \\in X : f(x) \\in B\\}.$$",
        checkpoint: {
          question:
            "Ví dụ (1.5): Cho $f(x) = x^2 - 2x = (x - 1)^2 - 1$. Hãy tìm ảnh $f([0, 3])$ và tạo ảnh $f^{-1}(\\{3\\})$.",
          rubric: [
            {
              step: "Bước 1 • Tìm ảnh f([0, 3]) (0.5đ)",
              detail:
                "Với $x \\in [0, 3]$, ta có $x - 1 \\in [-1, 2] \\Rightarrow (x - 1)^2 \\in [0, 4] \\Rightarrow (x - 1)^2 - 1 \\in [-1, 3]$. Vậy $f([0, 3]) = [-1, 3]$.",
            },
            {
              step: "Bước 2 • Tìm tạo ảnh f⁻¹({3}) (0.5đ)",
              detail:
                "$x \\in f^{-1}(\\{3\\}) \\iff f(x) = 3 \\iff (x - 1)^2 - 1 = 3 \\iff (x - 1)^2 = 4 \\iff x = -1$ hoặc $x = 3$. Vậy $f^{-1}(\\{3\\}) = \\{-1, 3\\}$.",
            },
          ],
          trap: "Ký hiệu tạo ảnh $f^{-1}(B)$ luôn tồn tại với mọi ánh xạ $f$ (kể cả khi $f$ không phải là song ánh và không có ánh xạ ngược $f^{-1}$). Ngoài ra, với đoạn $[0, 3]$, giá trị nhỏ nhất của $x^2 - 2x$ nằm tại đỉnh $x = 1$, không phải tại hai đầu mút!",
        },
      },
      {
        heading: "2.1 & 2.2. Định nghĩa dãy số hội tụ (ε − N)",
        content:
          "• <b>Định nghĩa $\\varepsilon - N$:</b> Dãy $(x_n)$ hội tụ về $a$ nếu: $$\\forall \\varepsilon > 0, \\; \\exists N \\in \\mathbb{N}^* : n > N \\Rightarrow |x_n - a| < \\varepsilon.$$" +
          "• <b>Ký hiệu:</b> $\\lim_{n \\to \\infty} x_n = a$ hoặc $x_n \\to a$.<br>" +
          "• <b>Ý nghĩa:</b> Với mọi độ chính xác $\\varepsilon > 0$ được yêu cầu trước, ta luôn có thể chọn một chỉ số $N$ đủ lớn để từ đó trở đi mọi số hạng của dãy nằm trong khoảng $(a - \\varepsilon, a + \\varepsilon)$.",
        checkpoint: {
          question:
            "Ví dụ (2.2): Dùng định nghĩa $\\varepsilon - N$ chứng minh $\\lim_{n \\to \\infty} \\frac{2n + 1}{n + 2} = 2$.",
          rubric: [
            {
              step: "Bước 1 • Đánh giá |xₙ − 2| (0.5đ)",
              detail:
                "Ta có $\\left|\\frac{2n + 1}{n + 2} - 2\\right| = \\frac{3}{n + 2}$. Để $\\frac{3}{n + 2} < \\varepsilon$, chỉ cần $n > \\frac{3}{\\varepsilon} - 2$.",
            },
            {
              step: "Bước 2 • Chọn N và kết luận (0.5đ)",
              detail:
                "Chọn $N \\in \\mathbb{N}^*$ thỏa $N > \\max\\left\\{0, \\frac{3}{\\varepsilon} - 2\\right\\}$. Khi $n > N$, ta có $|x_n - 2| < \\varepsilon$. Vậy $\\lim_{n \\to \\infty} \\frac{2n + 1}{n + 2} = 2$.",
            },
          ],
          trap: "Phải đảm bảo chỉ số $N \\in \\mathbb{N}^*$; nếu $\\frac{3}{\\varepsilon} - 2 \\le 0$ (khi $\\varepsilon$ lớn) thì cần lấy $\\max\\left\\{0, \\frac{3}{\\varepsilon} - 2\\right\\}$ để $N$ dương.",
        },
      },
      {
        heading: "2.3. Những tính chất cơ bản của dãy hội tụ",
        content:
          "• <b>Các phép toán:</b> Nếu $x_n \\to a$ và $y_n \\to b$ thì: $$x_n \\pm y_n \\to a \\pm b, \\qquad x_n y_n \\to ab,$$ và nếu $b \\neq 0$ thì: $$\\frac{x_n}{y_n} \\to \\frac{a}{b}.$$" +
          "• <b>Hai tính chất quan trọng:</b><br>" +
          "- Giới hạn của một dãy hội tụ là <b>duy nhất</b>.<br>" +
          "- Mọi dãy hội tụ đều <b>bị chặn</b>.",
        checkpoint: {
          question:
            "Ví dụ (2.3): Tính giới hạn $\\lim_{n \\to \\infty} \\frac{3n^2 - 1}{2n^2 + n}$.",
          rubric: [
            {
              step: "Bước 1 • Chia tử và mẫu cho n² (0.5đ)",
              detail:
                "Ta viết $\\frac{3n^2 - 1}{2n^2 + n} = \\frac{3 - \\frac{1}{n^2}}{2 + \\frac{1}{n}}$.",
            },
            {
              step: "Bước 2 • Áp dụng tính chất giới hạn tổng, hiệu và thương (0.5đ)",
              detail:
                "Vì $\\frac{1}{n^2} \\to 0$ và $\\frac{1}{n} \\to 0$ nên tử tiến về $3$, mẫu tiến về $2 \\neq 0$. Vậy $\\lim_{n \\to \\infty} \\frac{3n^2 - 1}{2n^2 + n} = \\frac{3}{2}$.",
            },
          ],
          trap: 'Tính chất "mọi dãy hội tụ đều bị chặn" chỉ có 1 chiều; dãy bị chặn chưa chắc hội tụ (ví dụ $x_n = (-1)^n$ bị chặn nhưng không hội tụ).',
        },
      },
      {
        heading: "2.4. Tiêu chuẩn kẹp cho dãy số",
        content:
          "• <b>Định lý (Tiêu chuẩn kẹp):</b> Nếu từ một chỉ số đủ lớn ta có: $$y_n \\le x_n \\le z_n$$ và $$\\lim y_n = \\lim z_n = a,$$ thì $$\\lim x_n = a.$$",
        checkpoint: {
          question:
            "Ví dụ (2.4): Tính giới hạn $\\lim_{n \\to \\infty} \\frac{\\sin(n^2)}{n}$.",
          rubric: [
            {
              step: "Bước 1 • Thiết lập bất đẳng thức kẹp (0.5đ)",
              detail:
                "Với mọi $n \\in \\mathbb{N}^*$, vì $-1 \\le \\sin(n^2) \\le 1$ nên: $$-\\frac{1}{n} \\le \\frac{\\sin(n^2)}{n} \\le \\frac{1}{n}.$$",
            },
            {
              step: "Bước 2 • Tính giới hạn hai cận và kết luận (0.5đ)",
              detail:
                "Vì hai cận $-\\frac{1}{n}$ và $\\frac{1}{n}$ đều tiến về $0$ khi $n \\to \\infty$, theo tiêu chuẩn kẹp ta có $\\lim_{n \\to \\infty} \\frac{\\sin(n^2)}{n} = 0$.",
            },
          ],
          trap: "Tiêu chuẩn kẹp chỉ kết luận được khi giới hạn hai dãy biên $y_n$ và $z_n$ bằng nhau; nếu $\\lim y_n \\neq \\lim z_n$ thì không rút ra được giới hạn của $x_n$.",
        },
      },
      {
        heading:
          "2.5. Tiêu chuẩn đơn điệu – bị chặn (Định lý Weierstrass cho dãy)",
        content:
          "• <b>Định lý Weierstrass cho dãy:</b><br>" +
          "- Dãy <b>tăng</b> và <b>bị chặn trên</b> thì hội tụ.<br>" +
          "- Dãy <b>giảm</b> và <b>bị chặn dưới</b> thì hội tụ.",
        checkpoint: {
          question:
            "Ví dụ (2.5): Xét sự hội tụ và tìm giới hạn của dãy $x_n = 1 - \\frac{1}{n}$ ($n \\ge 1$).",
          rubric: [
            {
              step: "Bước 1 • Kiểm tra tính tăng và bị chặn trên (0.5đ)",
              detail:
                "Ta có $x_{n+1} - x_n = \\frac{1}{n} - \\frac{1}{n+1} > 0 \\Rightarrow x_{n+1} > x_n$ (dãy tăng), và $x_n = 1 - \\frac{1}{n} < 1$ với mọi $n$ (bị chặn trên bởi $1$).",
            },
            {
              step: "Bước 2 • Áp dụng định lý Weierstrass và tìm giới hạn (0.5đ)",
              detail:
                "Do đó $(x_n)$ tăng và bị chặn trên, suy ra hội tụ. Hơn nữa, $\\lim_{n \\to \\infty} x_n = \\lim_{n \\to \\infty} \\left(1 - \\frac{1}{n}\\right) = 1$.",
            },
          ],
          trap: "Lưu ý rằng tính bị chặn trên bởi $M$ chỉ khẳng định $\\lim x_n \\le M$, không đồng nghĩa giới hạn bắt buộc phải bằng $M$.",
        },
      },
      {
        heading: "2.6. Các giới hạn cơ bản của dãy số và Số e",
        content:
          "• <b>Một số giới hạn cần nhớ:</b> Với $p > 0, \\; a > 1$: $$\\lim_{n \\to \\infty} \\frac{1}{n^p} = 0, \\qquad \\lim_{n \\to \\infty} a^n = +\\infty,$$ $$\\lim_{n \\to \\infty} \\sqrt[n]{a} = 1, \\qquad \\lim_{n \\to \\infty} \\sqrt[n]{n} = 1.$$" +
          "• <b>Số $e$:</b> Ta định nghĩa: $$e = \\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n \\approx 2.718281828\\dots$$ và cũng có: $$\\lim_{x \\to \\infty} \\left(1 + \\frac{1}{x}\\right)^x = e.$$",
        checkpoint: {
          question:
            "Vận dụng các giới hạn cơ bản trên để tính $\\lim_{n \\to \\infty} \\left[\\left(1 + \\frac{1}{n}\\right)^{3n} + \\frac{2\\sqrt[n]{n}}{5}\\right]$.",
          rubric: [
            {
              step: "Bước 1 • Tách các giới hạn thành phần (0.5đ)",
              detail:
                "Ta có $\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^{3n} = \\left[\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n\\right]^3 = e^3$ và $\\lim_{n \\to \\infty} \\sqrt[n]{n} = 1$.",
            },
            {
              step: "Bước 2 • Cộng kết quả các giới hạn hữu hạn (0.5đ)",
              detail:
                "Vậy giới hạn cần tìm bằng $e^3 + \\frac{2 \\cdot 1}{5} = e^3 + \\frac{2}{5}$.",
            },
          ],
          trap: "Nhớ phân biệt $\\lim_{n \\to \\infty} \\sqrt[n]{n} = 1$ (không phải $+\\infty$), vì số mũ $\\frac{1}{n} \\to 0$ kéo biểu thức về $1$.",
        },
      },
      {
        heading: "2.7. So sánh tốc độ tăng của dãy số",
        content:
          "• <b>Khi $n \\to \\infty$:</b> $$\\ln n \\ll n^k \\ll a^n \\ll n! \\ll n^n, \\qquad (k > 0, \\; a > 1).$$" +
          "• <b>Hệ quả:</b> $$\\lim_{n \\to \\infty} \\frac{\\ln n}{n^k} = 0, \\qquad \\lim_{n \\to \\infty} \\frac{n^k}{a^n} = 0,$$ $$\\lim_{n \\to \\infty} \\frac{a^n}{n!} = 0, \\qquad \\lim_{n \\to \\infty} \\frac{n!}{n^n} = 0.$$" +
          "• <b>Trực giác:</b> Hàm mũ tăng nhanh hơn mọi lũy thừa; giai thừa lại tăng nhanh hơn một hàm mũ cố định.",
        checkpoint: {
          question:
            "Áp dụng thứ tự tốc độ tăng của dãy số để tính $\\lim_{n \\to \\infty} \\frac{n^{10} + 3^n}{n! + 2^n}$.",
          rubric: [
            {
              step: "Bước 1 • So sánh tốc độ tăng của tử và mẫu (0.5đ)",
              detail:
                "Khi $n \\to \\infty$, ta có $n^{10} \\ll 3^n \\ll n!$ và $2^n \\ll n!$. Chia cả tử và mẫu cho số hạng tăng nhanh nhất là $n!$.",
            },
            {
              step: "Bước 2 • Áp dụng hệ quả giới hạn (0.5đ)",
              detail:
                "$\\lim_{n \\to \\infty} \\frac{\\frac{n^{10}}{n!} + \\frac{3^n}{n!}}{1 + \\frac{2^n}{n!}} = \\frac{0 + 0}{1 + 0} = 0$.",
            },
          ],
          trap: "Dù số mũ của $n^{1000}$ rất lớn, khi $n \\to \\infty$ thì bất kỳ hàm mũ $a^n$ ($a > 1$) nào cũng vượt qua nó; và $n!$ luôn vượt qua mọi $a^n$ cố định.",
        },
      },
      {
        heading: "2.8. Kỹ thuật chia lũy thừa cao nhất",
        content:
          "• <b>Quy tắc:</b> Với phân thức hữu tỉ theo $n$, hãy chia cả tử và mẫu cho lũy thừa cao nhất của $n$ xuất hiện trong biểu thức.",
        checkpoint: {
          question:
            "Ví dụ (2.8): Tính giới hạn $A = \\lim_{n \\to \\infty} \\frac{4n^3 - 2n + 5}{3n^3 + n^2 - 1}$.",
          rubric: [
            {
              step: "Bước 1 • Chia cả tử và mẫu cho n³ (0.5đ)",
              detail:
                "$A = \\lim_{n \\to \\infty} \\frac{4 - \\frac{2}{n^2} + \\frac{5}{n^3}}{3 + \\frac{1}{n} - \\frac{1}{n^3}}$.",
            },
            {
              step: "Bước 2 • Cho n → ∞ và rút ra kết quả (0.5đ)",
              detail:
                "Vì các số hạng $\\frac{2}{n^2}, \\frac{5}{n^3}, \\frac{1}{n}, \\frac{1}{n^3}$ đều tiến về $0$, suy ra $A = \\frac{4}{3}$.",
            },
          ],
          trap: "Nếu bậc của tử nhỏ hơn bậc của mẫu thì giới hạn bằng $0$; nếu bậc của tử lớn hơn bậc của mẫu thì giới hạn là $\\pm\\infty$ (xét dấu hệ số bậc cao nhất).",
        },
      },
      {
        heading: "2.9. Kỹ thuật nhân lượng liên hợp",
        content:
          "• <b>Mẹo:</b> Gặp dạng vô định $\\infty - \\infty$ chứa căn thức, hãy thử nhân (và chia) với lượng liên hợp để đưa về dạng phân thức.",
        checkpoint: {
          question:
            "Ví dụ (2.9): Tính giới hạn $B = \\lim_{n \\to \\infty} \\left(\\sqrt{n^2 + 6n} - n\\right)$.",
          rubric: [
            {
              step: "Bước 1 • Nhân lượng liên hợp (0.5đ)",
              detail:
                "Nhân và chia cho $\\sqrt{n^2 + 6n} + n$: $$B = \\lim_{n \\to \\infty} \\frac{(n^2 + 6n) - n^2}{\\sqrt{n^2 + 6n} + n} = \\lim_{n \\to \\infty} \\frac{6n}{\\sqrt{n^2 + 6n} + n}.$$",
            },
            {
              step: "Bước 2 • Chia tử và mẫu cho n (0.5đ)",
              detail:
                "$B = \\lim_{n \\to \\infty} \\frac{6}{\\sqrt{1 + \\frac{6}{n}} + 1} = \\frac{6}{1 + 1} = 3$.",
            },
          ],
          trap: "Không được rút gọn ẩu $\\sqrt{n^2 + 6n} - n \\approx n - n = 0$ vì khi $n \\to \\infty$ phần dư bên trong căn tạo thành đại lượng hữu hạn khác $0$.",
        },
      },
      {
        heading: "3.1 & 3.3. Giới hạn hàm số – Định nghĩa ε − δ",
        content:
          "• <b>Định nghĩa:</b> Cho $f$ xác định trên một lân cận của $x_0$, có thể không xác định tại $x_0$. Ta nói $$\\lim_{x \\to x_0} f(x) = L$$ nếu: $$\\forall \\varepsilon > 0, \\; \\exists \\delta > 0 : 0 < |x - x_0| < \\delta \\Rightarrow |f(x) - L| < \\varepsilon.$$" +
          "• <b>Ý nghĩa:</b> Khi $x$ đủ gần $x_0$ (nhưng $x \\neq x_0$), giá trị $f(x)$ có thể làm gần $L$ bao nhiêu tùy ý.",
        checkpoint: {
          question:
            "Ví dụ (3.3): Dùng định nghĩa $\\varepsilon - \\delta$ chứng minh $\\lim_{x \\to 2} (3x - 1) = 5$.",
          rubric: [
            {
              step: "Bước 1 • Biến đổi |f(x) − L| theo |x − 2| (0.5đ)",
              detail: "Ta có $|(3x - 1) - 5| = |3x - 6| = 3|x - 2|$.",
            },
            {
              step: "Bước 2 • Chọn δ theo ε và chứng minh (0.5đ)",
              detail:
                "Cho $\\varepsilon > 0$, chọn $\\delta = \\frac{\\varepsilon}{3}$. Khi $0 < |x - 2| < \\delta$ thì $|(3x - 1) - 5| < 3\\delta = \\varepsilon$. Vậy $\\lim_{x \\to 2} (3x - 1) = 5$.",
            },
          ],
          trap: "Điều kiện $0 < |x - x_0| < \\delta$ nghĩa là KHÔNG xét $x = x_0$; giới hạn tại $x_0$ chỉ phụ thuộc vào hành vi của $f(x)$ quanh $x_0$, không phụ thuộc giá trị $f(x_0)$.",
        },
      },
      {
        heading: "3.2 & 3.4. Định nghĩa Heine (Chuyển qua giới hạn dãy số)",
        content:
          "• <b>Định lý Heine:</b> $$\\lim_{x \\to x_0} f(x) = L$$ khi và chỉ khi với mọi dãy $(x_n)$ thỏa $$x_n \\neq x_0, \\qquad x_n \\to x_0,$$ ta có: $$f(x_n) \\to L.$$" +
          "• <b>Ý tưởng:</b> Định nghĩa $\\varepsilon - \\delta$ dùng ngôn ngữ khoảng cách; định nghĩa Heine chuyển bài toán giới hạn hàm số về bài toán giới hạn dãy số (rất hiệu quả để chứng minh một giới hạn không tồn tại).",
        checkpoint: {
          question:
            "Ví dụ (3.4): Dùng định nghĩa Heine chứng minh $\\lim_{x \\to 0} \\sin \\frac{1}{x}$ không tồn tại.",
          rubric: [
            {
              step: "Bước 1 • Chọn hai dãy (xₙ), (yₙ) khác 0 cùng tiến về 0 (0.5đ)",
              detail:
                "Chọn $x_n = \\frac{1}{n\\pi} \\to 0 \\Rightarrow \\sin \\frac{1}{x_n} = \\sin(n\\pi) = 0$. Chọn $y_n = \\frac{1}{\\frac{\\pi}{2} + 2n\\pi} \\to 0 \\Rightarrow \\sin \\frac{1}{y_n} = \\sin\\left(\\frac{\\pi}{2} + 2n\\pi\\right) = 1$.",
            },
            {
              step: "Bước 2 • So sánh giới hạn ảnh và kết luận (0.5đ)",
              detail:
                "Hai dãy cùng tiến về $0$ nhưng ảnh của chúng có hai giới hạn khác nhau ($0 \\neq 1$). Theo định lý Heine, giới hạn $\\lim_{x \\to 0} \\sin \\frac{1}{x}$ không tồn tại.",
            },
          ],
          trap: "Để chứng minh giới hạn KHÔNG tồn tại bằng Heine, hai dãy chọn phải thỏa mãn $x_n \\neq x_0$, $y_n \\neq x_0$ với mọi $n$ và cùng tiến về $x_0$.",
        },
      },
      {
        heading: "3.5. Tính chất của giới hạn hàm số và Nguyên lý kẹp",
        content:
          "• <b>Các phép toán:</b> Nếu $\\lim f = L_1$ và $\\lim g = L_2$ khi $x \\to x_0$ thì: $$\\lim (f \\pm g) = L_1 \\pm L_2, \\qquad \\lim (fg) = L_1 L_2.$$ Nếu $L_2 \\neq 0$ thì: $$\\lim \\frac{f}{g} = \\frac{L_1}{L_2}.$$" +
          "• <b>Nguyên lý kẹp:</b> Nếu $g(x) \\le f(x) \\le h(x)$ trên một lân cận của $x_0$ (có thể trừ $x_0$) và $$\\lim_{x \\to x_0} g(x) = \\lim_{x \\to x_0} h(x) = L,$$ thì $$\\lim_{x \\to x_0} f(x) = L.$$",
        checkpoint: {
          question:
            "Sử dụng nguyên lý kẹp tính giới hạn $\\lim_{x \\to 0} x^2 \\cos \\frac{1}{x}$.",
          rubric: [
            {
              step: "Bước 1 • Thiết lập bất đẳng thức kẹp với x ≠ 0 (0.5đ)",
              detail:
                "Với mọi $x \\neq 0$, vì $-1 \\le \\cos \\frac{1}{x} \\le 1$ và $x^2 > 0$, nên $-x^2 \\le x^2 \\cos \\frac{1}{x} \\le x^2$.",
            },
            {
              step: "Bước 2 • Tính giới hạn hai hàm biên (0.5đ)",
              detail:
                "Ta có $\\lim_{x \\to 0} (-x^2) = \\lim_{x \\to 0} x^2 = 0$. Theo nguyên lý kẹp, $\\lim_{x \\to 0} x^2 \\cos \\frac{1}{x} = 0$.",
            },
          ],
          trap: "Không được tách $\\lim_{x \\to 0} \\left(x^2 \\cos \\frac{1}{x}\\right) = \\lim x^2 \\cdot \\lim \\cos \\frac{1}{x}$ vì $\\lim_{x \\to 0} \\cos \\frac{1}{x}$ không tồn tại!",
        },
      },
      {
        heading: "3.6, 3.7 & 3.8. Giới hạn một phía",
        content:
          "• <b>Định nghĩa:</b><br>" +
          "- $\\lim_{x \\to x_0^+} f(x) = L$ nếu $f(x) \\to L$ khi $x$ tiến đến $x_0$ từ bên phải.<br>" +
          "- $\\lim_{x \\to x_0^-} f(x) = L$ nếu $f(x) \\to L$ khi $x$ tiến đến $x_0$ từ bên trái.<br>" +
          "• <b>Quan hệ với giới hạn hai phía:</b> $$\\lim_{x \\to x_0} f(x) = L \\iff \\lim_{x \\to x_0^-} f(x) = \\lim_{x \\to x_0^+} f(x) = L.$$" +
          "• <b>Ví dụ (3.7):</b> Xét $\\lim_{x \\to 1} \\frac{|x - 1|}{x - 1}$:<br>" +
          "- Nếu $x \\to 1^+$: $\\frac{|x - 1|}{x - 1} = 1 \\Rightarrow \\lim_{x \\to 1^+} \\frac{|x - 1|}{x - 1} = 1$.<br>" +
          "- Nếu $x \\to 1^-$: $\\frac{|x - 1|}{x - 1} = -1 \\Rightarrow \\lim_{x \\to 1^-} \\frac{|x - 1|}{x - 1} = -1$.<br>" +
          "Vì hai giới hạn một phía khác nhau nên $\\lim_{x \\to 1} \\frac{|x - 1|}{x - 1}$ <b>không tồn tại</b>.",
        checkpoint: {
          question:
            "Ví dụ (3.8): Cho hàm số $f(x) = \\begin{cases} 2x + 1, & x \\ge 0, \\\\ x^2 + a, & x < 0. \\end{cases}$ Tìm $a$ để $\\lim_{x \\to 0} f(x)$ tồn tại.",
          rubric: [
            {
              step: "Bước 1 • Tính giới hạn bên phải và bên trái tại x₀ = 0 (0.5đ)",
              detail:
                "Ta có $\\lim_{x \\to 0^+} f(x) = \\lim_{x \\to 0^+} (2x + 1) = 1$, và $\\lim_{x \\to 0^-} f(x) = \\lim_{x \\to 0^-} (x^2 + a) = a$.",
            },
            {
              step: "Bước 2 • Cho hai giới hạn một phía bằng nhau (0.5đ)",
              detail:
                "Giới hạn $\\lim_{x \\to 0} f(x)$ tồn tại khi và chỉ khi $\\lim_{x \\to 0^+} f(x) = \\lim_{x \\to 0^-} f(x) \\iff a = 1$.",
            },
          ],
          trap: "Với hàm cho bởi nhiều công thức rẽ nhánh tại $x_0$ hoặc có chứa $|x - x_0|$, bắt buộc phải tách riêng hai giới hạn một phía $x \\to x_0^+$ và $x \\to x_0^-$.",
        },
      },
      {
        heading: "3.9 & 3.10. Các giới hạn cơ bản của hàm số",
        content:
          "• <b>Khi $x \\to 0$:</b> $$\\lim \\frac{\\sin x}{x} = 1, \\qquad \\lim \\frac{e^x - 1}{x} = 1, \\qquad \\lim \\frac{\\ln(1 + x)}{x} = 1,$$ $$\\lim \\frac{1 - \\cos x}{x^2} = \\frac{1}{2}.$$" +
          "• <b>Hệ quả thường dùng:</b> Nếu $u(x) \\to 0$ (và $u(x) \\neq 0$ quanh điểm xét), ta có thể thay $x$ bởi $u(x)$: $$\\frac{\\sin u(x)}{u(x)} \\to 1.$$ Đây là công cụ cơ bản để xử lý nhiều giới hạn dạng vô định.",
        checkpoint: {
          question:
            "Ví dụ (3.10): Tính giới hạn $A = \\lim_{x \\to 0} \\frac{1 - \\cos 4x}{x \\sin 3x}$.",
          rubric: [
            {
              step: "Bước 1 • Dùng công thức hạ bậc 1 − cos 4x = 2 sin² 2x (0.5đ)",
              detail:
                "$A = \\lim_{x \\to 0} 2\\frac{\\sin^2 2x}{x \\sin 3x} = \\lim_{x \\to 0} 2 \\cdot \\left(\\frac{\\sin 2x}{2x}\\right)^2 \\cdot \\frac{3x}{\\sin 3x} \\cdot \\frac{4x^2}{3x^2}$.",
            },
            {
              step: "Bước 2 • Đưa về các giới hạn cơ bản và kết luận (0.5đ)",
              detail:
                "Viết về các giới hạn cơ bản: $A = 2 \\cdot 1 \\cdot 1 \\cdot \\frac{4}{3} = \\frac{8}{3}$.",
            },
          ],
          trap: "Khi áp dụng $\\lim \\frac{\\sin u(x)}{u(x)} = 1$, bắt buộc phải kiểm tra $u(x) \\to 0$; ví dụ $\\lim_{x \\to \\infty} \\frac{\\sin x}{x} = 0$ chứ KHÔNG bằng $1$!",
        },
      },
      {
        heading: "3.11. Dạng mũ và số e",
        content:
          "• <b>Mẫu nhận diện dạng $1^\\infty$:</b> Nếu có dạng $$(1 + u(x))^{v(x)}, \\qquad u(x) \\to 0, \\qquad u(x)v(x) \\to L,$$ thì thường $$(1 + u(x))^{v(x)} \\to e^L.$$",
        checkpoint: {
          question:
            "Ví dụ (3.11): Tính giới hạn $B = \\lim_{x \\to \\infty} \\left(\\frac{x + 2}{x - 1}\\right)^{2x + 1}$.",
          rubric: [
            {
              step: "Bước 1 • Tách cơ số về dạng 1 + u(x) (0.5đ)",
              detail:
                "Ta viết $\\frac{x + 2}{x - 1} = 1 + \\frac{3}{x - 1}$. Khi $x \\to \\infty$, ta có $u(x) = \\frac{3}{x - 1} \\to 0$.",
            },
            {
              step: "Bước 2 • Tính giới hạn tích u(x)v(x) và suy ra kết quả (0.5đ)",
              detail:
                "$u(x)v(x) = \\frac{3(2x + 1)}{x - 1} \\to 6$. Do đó $B = \\lim_{x \\to \\infty} \\left(1 + \\frac{3}{x - 1}\\right)^{2x + 1} = e^6$.",
            },
          ],
          trap: "Phải tách đúng dạng $1 + u(x)$ với $u(x) \\to 0$ rồi mới nhân với số mũ $v(x)$; nếu cơ số không tiến về $1$ thì không thể dùng mẫu số $e$ này.",
        },
      },
      {
        heading: "4.1. Vô cùng bé (VCB) và vô cùng lớn (VCL)",
        content:
          "• <b>Định nghĩa:</b><br>" +
          "- $\\alpha(x)$ là <b>vô cùng bé</b> khi $x \\to x_0$ nếu $$\\lim_{x \\to x_0} \\alpha(x) = 0.$$" +
          "- $A(x)$ là <b>vô cùng lớn</b> khi $x \\to x_0$ nếu $$\\lim_{x \\to x_0} |A(x)| = +\\infty.$$" +
          "• <b>Mối liên hệ:</b> Nếu $\\alpha(x) \\neq 0$ là VCB thì $\\frac{1}{\\alpha(x)}$ là VCL, và ngược lại.",
        checkpoint: {
          question:
            "Cho $\\alpha(x) = \\tan(2x)$ và $A(x) = \\frac{1}{1 - \\cos x}$. Hãy xác định tính chất VCB hay VCL của chúng khi $x \\to 0$.",
          rubric: [
            {
              step: "Bước 1 • Tính giới hạn của α(x) khi x → 0 (0.5đ)",
              detail:
                "Vì $\\lim_{x \\to 0} \\tan(2x) = 0$ nên $\\alpha(x)$ là một <b>vô cùng bé</b> khi $x \\to 0$.",
            },
            {
              step: "Bước 2 • Tính giới hạn của A(x) theo mối liên hệ nghịch đảo (0.5đ)",
              detail:
                "Vì $1 - \\cos x \\to 0$ ($1 - \\cos x > 0$ với $x \\neq 0$ gần $0$), nên $\\lim_{x \\to 0} |A(x)| = +\\infty$. Vậy $A(x)$ là <b>vô cùng lớn</b> khi $x \\to 0$.",
            },
          ],
          trap: "Khái niệm VCB hay VCL luôn gắn liền với một điểm giới hạn $x \\to x_0$ cụ thể; một hàm có thể là VCB khi $x \\to 0$ nhưng lại là VCL khi $x \\to \\infty$.",
        },
      },
      {
        heading: "4.2. So sánh hai vô cùng bé",
        content:
          "• <b>Định nghĩa:</b> Giả sử $\\alpha, \\beta$ là hai VCB khi $x \\to x_0$ và $$\\lim_{x \\to x_0} \\frac{\\alpha(x)}{\\beta(x)} = k.$$" +
          "- $k = 0$: $\\alpha = o(\\beta)$ ($\\alpha$ là VCB cấp cao hơn $\\beta$).<br>" +
          "- $k = 1$: $\\alpha \\sim \\beta$ ($\\alpha$ và $\\beta$ là hai VCB tương đương).<br>" +
          "- $0 < |k| < \\infty$: $\\alpha$ và $\\beta$ là hai VCB cùng cấp.",
        checkpoint: {
          question:
            "Ví dụ (4.2): Khi $x \\to 0$, hãy so sánh hai vô cùng bé $\\sin x$ và $1 - \\cos x$.",
          rubric: [
            {
              step: "Bước 1 • Viết biểu thức VCB tương đương khi x → 0 (0.5đ)",
              detail:
                "Khi $x \\to 0$, ta có $\\sin x \\sim x$ và $1 - \\cos x \\sim \\frac{x^2}{2}$.",
            },
            {
              step: "Bước 2 • Lập tỉ số giới hạn và kết luận (0.5đ)",
              detail:
                "$\\lim_{x \\to 0} \\frac{1 - \\cos x}{\\sin x} = \\lim_{x \\to 0} \\frac{x^2 / 2}{x} = \\lim_{x \\to 0} \\frac{x}{2} = 0$. Do đó $1 - \\cos x$ là VCB cấp cao hơn $\\sin x$, tức $1 - \\cos x = o(\\sin x)$.",
            },
          ],
          trap: "VCB cấp cao hơn là VCB tiến về $0$ nhanh hơn (có số mũ của $x$ lớn hơn khi $x \\to 0$).",
        },
      },
      {
        heading: "4.3. So sánh tốc độ tăng của vô cùng lớn",
        content:
          "• <b>Khi $x \\to +\\infty$:</b> $$\\ln^p x \\ll x^q \\ll a^x \\ll x^x, \\qquad (p, q > 0, \\; a > 1).$$" +
          "Tức là: $\\lim_{x \\to +\\infty} \\frac{\\ln^p x}{x^q} = 0$, $\\lim_{x \\to +\\infty} \\frac{x^q}{a^x} = 0$, $\\lim_{x \\to +\\infty} \\frac{a^x}{x^x} = 0$.",
        checkpoint: {
          question:
            "Ví dụ (4.3): Áp dụng so sánh tốc độ tăng của vô cùng lớn, tính $\\lim_{x \\to \\infty} \\frac{x^4}{3^x}$ và $\\lim_{x \\to \\infty} \\frac{\\ln x}{\\sqrt{x}}$.",
          rubric: [
            {
              step: "Bước 1 • Tính giới hạn thứ nhất (0.5đ)",
              detail:
                "Vì $x^4 \\ll 3^x$ khi $x \\to +\\infty$, nên $\\lim_{x \\to \\infty} \\frac{x^4}{3^x} = 0$.",
            },
            {
              step: "Bước 2 • Tính giới hạn thứ hai (0.5đ)",
              detail:
                "Tương tự, với $p = 1, q = \\frac{1}{2}$ thì $\\ln x \\ll x^{1/2} = \\sqrt{x}$, nên $\\lim_{x \\to \\infty} \\frac{\\ln x}{\\sqrt{x}} = 0$.",
            },
          ],
          trap: "Thang so sánh $\\ln^p x \\ll x^q \\ll a^x \\ll x^x$ chỉ đúng khi $x \\to +\\infty$ với $p, q > 0$ và cơ số $a > 1$!",
        },
      },
      {
        heading: "4.4. Các vô cùng bé (VCB) tương đương cơ bản",
        content:
          "• <b>Khi $x \\to 0$:</b><br>" +
          "$$\\sin x \\sim x, \\qquad \\tan x \\sim x,$$" +
          "$$\\arcsin x \\sim x, \\qquad \\arctan x \\sim x,$$" +
          "$$e^x - 1 \\sim x, \\qquad \\ln(1 + x) \\sim x,$$" +
          "$$1 - \\cos x \\sim \\frac{x^2}{2}, \\qquad (1 + x)^\\alpha - 1 \\sim \\alpha x.$$" +
          "• <b>Một số công thức khác:</b> $$\\sqrt{1 + x} - 1 \\sim \\frac{x}{2}, \\qquad a^x - 1 \\sim x \\ln a.$$",
        checkpoint: {
          question:
            "Tìm VCB tương đương dạng lũy thừa đơn giản khi $x \\to 0$ của $f(x) = \\sqrt[3]{1 + 6x} - 1$ và $g(x) = 2^{3x} - 1$.",
          rubric: [
            {
              step: "Bước 1 • Thay u = 6x vào (1 + u)^α − 1 ∼ αu (0.5đ)",
              detail:
                "$\\sqrt[3]{1 + 6x} - 1 = (1 + 6x)^{1/3} - 1 \\sim \\frac{1}{3} \\cdot 6x = 2x$ khi $x \\to 0$.",
            },
            {
              step: "Bước 2 • Thay u = 3x vào aᵘ − 1 ∼ u ln a (0.5đ)",
              detail: "$2^{3x} - 1 \\sim 3x \\ln 2$ khi $x \\to 0$.",
            },
          ],
          trap: "Các công thức trên chỉ áp dụng khi biểu thức bên trong $u(x) \\to 0$; nếu $u(x) \\not\\to 0$ (ví dụ $x \\to 1$ trong $\\sin x$) thì không được thay $\\sin x \\sim x$!",
        },
      },
      {
        heading: "4.5 & 4.7. Quy tắc thay thế tương đương",
        content:
          "• <b>Trong tích và thương:</b> Nếu $\\alpha \\sim \\alpha_1$ và $\\beta \\sim \\beta_1$, thì trong các biểu thức tích/thương phù hợp: $$\\frac{\\alpha}{\\beta} \\sim \\frac{\\alpha_1}{\\beta_1}.$$" +
          "• <b>Ngắt bỏ VCB cấp cao trong tổng:</b> Nếu $\\alpha_2 = o(\\alpha_1)$, thì $$\\alpha_1 + \\alpha_2 \\sim \\alpha_1.$$" +
          "• <b>Ví dụ (4.5):</b> $3x + 4x^2 \\sim 3x$ ($x \\to 0$).",
        checkpoint: {
          question:
            "Ví dụ tổng hợp (4.7): Tính giới hạn $L = \\lim_{x \\to 0} \\frac{\\ln(1 + 3x) + \\sin^2 2x}{e^{5x} - 1 + \\arctan x}$.",
          rubric: [
            {
              step: "Bước 1 • Tìm VCB tương đương của từng số hạng và ngắt bỏ VCB cấp cao (0.5đ)",
              detail:
                "Khi $x \\to 0$, ta có: $\\ln(1 + 3x) \\sim 3x$, $\\sin^2 2x \\sim 4x^2 = o(x)$; ở mẫu: $e^{5x} - 1 \\sim 5x$, $\\arctan x \\sim x$. Do đó tử thức tương đương $3x$, mẫu thức tương đương $5x + x = 6x$.",
            },
            {
              step: "Bước 2 • Thay vào thương và kết luận (0.5đ)",
              detail:
                "Vì vậy $L = \\lim_{x \\to 0} \\frac{3x}{6x} = \\frac{1}{2}$.",
            },
          ],
          trap: "Tuyệt đối không thay thế tương đương trong tổng/hiệu nếu hai số hạng triệt tiêu nhau (ví dụ $\\tan x - \\sin x$ mà thay $x - x = 0$ là sai!). Chỉ được ngắt bỏ VCB cấp cao trong tổng khi số hạng giữ lại có bậc thấp nhất không bị triệt tiêu.",
        },
      },
      {
        heading: "4.6. Ngắt bỏ vô cùng lớn cấp thấp",
        content:
          "• <b>Nguyên tắc:</b> Trong tổng các vô cùng lớn khi $x \\to +\\infty$, giữ lại số hạng có tốc độ tăng nhanh nhất (ngắt bỏ các vô cùng lớn cấp thấp hơn).",
        checkpoint: {
          question:
            "Ví dụ (4.6): Tính giới hạn $\\lim_{x \\to \\infty} \\frac{3^x + x^4 - \\ln x}{2 \\cdot 3^x + 5x^2 + 10}$.",
          rubric: [
            {
              step: "Bước 1 • Giữ lại VCL tăng nhanh nhất ở tử và mẫu (0.5đ)",
              detail:
                "Khi $x \\to +\\infty$ (vì có $\\ln x$ nên $x > 0$), ta có $\\ln x \\ll x^4 \\ll 3^x$ và $10 \\ll 5x^2 \\ll 2 \\cdot 3^x$. Suy ra $3^x + x^4 - \\ln x \\sim 3^x$ và $2 \\cdot 3^x + 5x^2 + 10 \\sim 2 \\cdot 3^x$.",
            },
            {
              step: "Bước 2 • Rút gọn và kết luận (0.5đ)",
              detail:
                "Do đó $\\lim_{x \\to \\infty} \\frac{3^x + x^4 - \\ln x}{2 \\cdot 3^x + 5x^2 + 10} = \\lim_{x \\to \\infty} \\frac{3^x}{2 \\cdot 3^x} = \\frac{1}{2}$.",
            },
          ],
          trap: "Ngược với VCB (giữ bậc nhỏ nhất, bỏ bậc cao hơn), ở VCL khi $x \\to +\\infty$ ta phải giữ lại số hạng tăng nhanh nhất (cấp cao nhất) và bỏ phần cấp thấp hơn.",
        },
      },
      {
        heading: "5.1 & 5.4. Định nghĩa hàm số liên tục",
        content:
          "• <b>Liên tục tại một điểm:</b> Hàm số $f$ liên tục tại $x_0$ nếu: $$\\lim_{x \\to x_0} f(x) = f(x_0).$$ Tương đương: $$\\lim_{x \\to x_0^-} f(x) = \\lim_{x \\to x_0^+} f(x) = f(x_0).$$" +
          "• <b>Liên tục trên khoảng:</b> $f$ liên tục trên $(a, b)$ nếu nó liên tục tại mọi $x \\in (a, b)$.",
        checkpoint: {
          question:
            "Ví dụ (5.4): Cho hàm số $f(x) = \\begin{cases} \\frac{x^2 - 1}{x - 1}, & x \\neq 1, \\\\ m, & x = 1. \\end{cases}$ Tìm $m$ để $f$ liên tục tại $1$.",
          rubric: [
            {
              step: "Bước 1 • Tính giới hạn của f(x) khi x → 1 (0.5đ)",
              detail:
                "Với $x \\neq 1$: $\\frac{x^2 - 1}{x - 1} = x + 1$. Suy ra $\\lim_{x \\to 1} f(x) = \\lim_{x \\to 1} (x + 1) = 2$.",
            },
            {
              step: "Bước 2 • Áp dụng điều kiện liên tục f(1) = lim f(x) (0.5đ)",
              detail:
                "Điều kiện liên tục: $f(1) = \\lim_{x \\to 1} f(x) \\iff m = 2$. Vậy $m = 2$.",
            },
          ],
          trap: "Hàm số phải xác định tại $x_0$ ($f(x_0)$ tồn tại hữu hạn), giới hạn tại $x_0$ phải tồn tại, và hai giá trị đó phải bằng nhau.",
        },
      },
      {
        heading: "5.2. Liên tục trên đoạn",
        content:
          "• <b>Định nghĩa:</b> $f$ liên tục trên đoạn $[a, b]$ nếu:<br>" +
          "- liên tục tại mọi $x \\in (a, b)$;<br>" +
          "- liên tục bên phải tại $a$: $\\lim_{x \\to a^+} f(x) = f(a)$;<br>" +
          "- liên tục bên trái tại $b$: $\\lim_{x \\to b^-} f(x) = f(b)$.<br>" +
          "• <b>Lưu ý:</b> Ở hai đầu mút của đoạn, chỉ cần xét giới hạn một phía nằm trong đoạn.",
        checkpoint: {
          question:
            "Giải thích vì sao hàm số $f(x) = \\sqrt{4 - x^2}$ liên tục trên đoạn $[-2, 2]$.",
          rubric: [
            {
              step: "Bước 1 • Kiểm tra trên khoảng mở (−2, 2) (0.5đ)",
              detail:
                "Với mọi $x_0 \\in (-2, 2)$, ta có $4 - x_0^2 > 0$ và $\\lim_{x \\to x_0} \\sqrt{4 - x^2} = \\sqrt{4 - x_0^2} = f(x_0)$, nên $f$ liên tục trên $(-2, 2)$.",
            },
            {
              step: "Bước 2 • Kiểm tra giới hạn một phía tại hai đầu mút x = −2 và x = 2 (0.5đ)",
              detail:
                "Tại $x = -2$: $\\lim_{x \\to (-2)^+} \\sqrt{4 - x^2} = 0 = f(-2)$. Tại $x = 2$: $\\lim_{x \\to 2^-} \\sqrt{4 - x^2} = 0 = f(2)$. Vậy $f$ liên tục trên đoạn $[-2, 2]$.",
            },
          ],
          trap: "Không đòi hỏi giới hạn bên trái của $a$ hay bên phải của $b$ khi xét tính liên tục trên đoạn $[a, b]$ (hàm có thể không xác định ngoài $[a, b]$).",
        },
      },
      {
        heading: "5.3 & 5.5. Điểm gián đoạn và Phân loại điểm gián đoạn",
        content:
          "• <b>Định nghĩa:</b> Nếu $f$ không liên tục tại $x_0$, ta gọi $x_0$ là <b>điểm gián đoạn</b>.<br>" +
          "• <b>Gián đoạn loại 1:</b> Hai giới hạn một phía đều hữu hạn.<br>" +
          "- <b>Bỏ được:</b> hai giới hạn bằng nhau nhưng khác $f(x_0)$ (hoặc $f(x_0)$ không xác định).<br>" +
          "- <b>Bước nhảy:</b> hai giới hạn một phía khác nhau.<br>" +
          "• <b>Gián đoạn loại 2:</b> Ít nhất một giới hạn một phía vô hạn hoặc không tồn tại.<br>" +
          "• <b>Ví dụ 1 (5.5):</b> $f(x) = \\frac{1}{x - 2}$. Tại $x_0 = 2$: $\\lim_{x \\to 2^+} f(x) = +\\infty$. Do đó $2$ là điểm gián đoạn <b>loại 2</b>.",
        checkpoint: {
          question:
            "Ví dụ 2 (5.5): Phân loại điểm gián đoạn tại $x_0 = 0$ của hàm số $g(x) = \\frac{|x|}{x}$.",
          rubric: [
            {
              step: "Bước 1 • Tính hai giới hạn một phía tại x₀ = 0 (0.5đ)",
              detail:
                "Ta có $\\lim_{x \\to 0^-} g(x) = \\lim_{x \\to 0^-} \\frac{-x}{x} = -1$, và $\\lim_{x \\to 0^+} g(x) = \\lim_{x \\to 0^+} \\frac{x}{x} = 1$.",
            },
            {
              step: "Bước 2 • So sánh và phân loại (0.5đ)",
              detail:
                "Vì hai giới hạn một phía đều hữu hạn nhưng khác nhau ($-1 \\neq 1$), nên $0$ là điểm gián đoạn <b>loại 1 – bước nhảy</b>.",
            },
          ],
          trap: "Với hàm có giá trị tuyệt đối hoặc phân nhánh tại $x_0$, phải tính đủ cả hai giới hạn trái và phải trước khi kết luận loại gián đoạn.",
        },
      },
      {
        heading: "5.6. Các phép toán với hàm liên tục",
        content:
          "• <b>Định lý:</b> Nếu $f, g$ liên tục tại $x_0$ thì: $$f + g, \\qquad f - g, \\qquad fg$$ liên tục tại $x_0$. Nếu $g(x_0) \\neq 0$ thì $$\\frac{f}{g}$$ liên tục tại $x_0$. Nếu $g$ liên tục tại $x_0$ và $f$ liên tục tại $g(x_0)$ thì $f \\circ g$ liên tục tại $x_0$.<br>" +
          "• <b>Hệ quả:</b> Các hàm sơ cấp liên tục trên tập xác định của chúng.",
        checkpoint: {
          question:
            "Tìm tập hợp các điểm mà hàm số $h(x) = \\frac{\\ln(x^2 + 1)}{x - 3} + \\cos(2x)$ liên tục.",
          rubric: [
            {
              step: "Bước 1 • Tìm tập xác định của hàm sơ cấp h(x) (0.5đ)",
              detail:
                "Vì $x^2 + 1 > 0$ với mọi $x \\in \\mathbb{R}$, điều kiện xác định là $x - 3 \\neq 0 \\iff x \\neq 3$. Vậy tập xác định là $D = \\mathbb{R} \\setminus \\{3\\}$.",
            },
            {
              step: "Bước 2 • Áp dụng hệ quả hàm sơ cấp (0.5đ)",
              detail:
                "Vì $h(x)$ là hàm sơ cấp nên liên tục trên tập xác định của nó, tức liên tục trên $(-\\infty, 3) \\cup (3, +\\infty)$.",
            },
          ],
          trap: "Hệ quả nói hàm sơ cấp liên tục trên từng khoảng của tập xác định; tại điểm ngoài tập xác định (như $x = 3$) hàm KHÔNG liên tục (là điểm gián đoạn).",
        },
      },
      {
        heading: "5.7. Định lý Weierstrass (Giá trị lớn nhất và nhỏ nhất)",
        content:
          "• <b>Định lý:</b> Nếu $f$ liên tục trên đoạn $[a, b]$ thì $f$ bị chặn trên $[a, b]$ và đạt giá trị lớn nhất, giá trị nhỏ nhất trên đoạn đó.",
        checkpoint: {
          question:
            "Ví dụ (5.7): Với $f(x) = x^2 - 2x + 3$, $x \\in [0, 3]$, chứng tỏ $f$ đạt GTLN, GTNN trên $[0, 3]$ và tìm các giá trị đó.",
          rubric: [
            {
              step: "Bước 1 • Áp dụng định lý Weierstrass và biến đổi bình phương đủ (0.5đ)",
              detail:
                "Hàm $f$ là đa thức nên liên tục trên $[0, 3]$, suy ra chắc chắn đạt GTLN và GTNN trên $[0, 3]$. Ta có $f(x) = (x - 1)^2 + 2$.",
            },
            {
              step: "Bước 2 • Tìm GTNN và GTLN trên [0, 3] (0.5đ)",
              detail:
                "Với $x \\in [0, 3]$ thì $x - 1 \\in [-1, 2] \\Rightarrow (x - 1)^2 \\in [0, 4]$. Do đó $\\min_{[0, 3]} f = 2$ (tại $x = 1$) và $\\max_{[0, 3]} f = 6$ (tại $x = 3$).",
            },
          ],
          trap: "Định lý Weierstrass đòi hỏi đoạn đóng $[a, b]$ và tính liên tục; trên khoảng mở $(a, b)$ hoặc hàm không liên tục thì chưa chắc đạt GTLN/GTNN.",
        },
      },
      {
        heading:
          "5.8, 5.9 & 5.10. Định lý Bolzano – Cauchy (Giá trị trung gian)",
        content:
          "• <b>Định lý giá trị trung gian:</b> Nếu $f$ liên tục trên $[a, b]$ và $$f(a)f(b) < 0,$$ thì tồn tại ít nhất một $c \\in (a, b)$ sao cho: $$f(c) = 0.$$" +
          "• <b>Ý nghĩa:</b> Nếu đồ thị liên tục đi từ giá trị âm sang giá trị dương, nó buộc phải cắt trục hoành ít nhất một lần.<br>" +
          "• <b>Ví dụ (5.9):</b> Chứng minh $x^5 - 3x - 1 = 0$ có ít nhất một nghiệm trong $(1, 2)$:<br>" +
          "Đặt $f(x) = x^5 - 3x - 1$. $f$ là đa thức nên liên tục trên $[1, 2]$. Ta có $f(1) = -3 < 0$, $f(2) = 25 > 0 \\Rightarrow f(1)f(2) < 0$. Theo Bolzano–Cauchy, tồn tại $c \\in (1, 2)$ sao cho $f(c) = 0$.",
        checkpoint: {
          question:
            "Ví dụ (5.10): Chứng minh phương trình lượng giác $\\cos x = x$ có nghiệm trong $\\left(0, \\frac{\\pi}{2}\\right)$.",
          rubric: [
            {
              step: "Bước 1 • Đặt hàm g(x) = cos x − x và kiểm tra tính liên tục trên đoạn (0.5đ)",
              detail:
                "Đặt $g(x) = \\cos x - x$. Vì $g$ là hiệu của các hàm sơ cấp xác định trên $\\mathbb{R}$ nên $g$ liên tục trên $\\left[0, \\frac{\\pi}{2}\\right]$.",
            },
            {
              step: "Bước 2 • Tính g(0), g(π/2) và áp dụng Bolzano–Cauchy (0.5đ)",
              detail:
                "Ta có $g(0) = 1 > 0$ và $g\\left(\\frac{\\pi}{2}\\right) = -\\frac{\\pi}{2} < 0$. Vì $g(0) \\cdot g\\left(\\frac{\\pi}{2}\\right) < 0$, theo Bolzano–Cauchy tồn tại $c \\in \\left(0, \\frac{\\pi}{2}\\right)$ sao cho $g(c) = 0 \\iff \\cos c = c$.",
            },
          ],
          trap: "Luôn nhớ chuyển phương trình về dạng $g(x) = 0$ và chỉ rõ tính liên tục trên ĐOẠN đóng $[a, b]$ trước khi kết luận nghiệm nằm trong khoảng mở $(a, b)$.",
        },
      },
      {
        heading: "Tóm tắt Chương 1 & Câu hỏi ôn tập cốt lõi",
        content:
          "• <b>Các ý chính của chương:</b><br>" +
          "1. <b>Ánh xạ:</b> đơn ánh, toàn ánh, song ánh, ảnh và tạo ảnh.<br>" +
          "2. <b>Giới hạn dãy số:</b> $\\varepsilon - N$, tính chất, kẹp, đơn điệu – bị chặn.<br>" +
          "3. <b>Giới hạn hàm số:</b> $\\varepsilon - \\delta$, Heine, giới hạn một phía.<br>" +
          "4. <b>VCB, VCL</b> và các tương đương cơ bản.<br>" +
          "5. <b>Hàm liên tục:</b> điểm gián đoạn, Weierstrass và Bolzano–Cauchy.<br>" +
          "• <b>Thông điệp quan trọng:</b> Trong Giải tích, cần phân biệt giữa <b>định nghĩa</b>, <b>định lý</b> và <b>kỹ thuật tính toán</b>. Kỹ thuật tính giới hạn phải dựa trên các định nghĩa và định lý đã học.",
        checkpoint: {
          question:
            "Câu hỏi ôn tập (5.12): Hãy phân biệt rõ ba khái niệm: giới hạn $\\longrightarrow$ liên tục $\\longrightarrow$ gián đoạn tại điểm $x_0$.",
          rubric: [
            {
              step: "Bước 1 • Mối quan hệ từ Giới hạn đến Liên tục (0.5đ)",
              detail:
                "<b>Giới hạn</b> $\\lim_{x \\to x_0} f(x) = L$ chỉ xét giá trị của $f(x)$ khi $x$ tiến gần $x_0$ (với $x \\neq x_0$), không đòi hỏi hàm xác định tại $x_0$. Khi hàm xác định tại $x_0$ và giới hạn bằng đúng giá trị hàm ($\\lim_{x \\to x_0} f(x) = f(x_0)$), hàm số đạt tính <b>liên tục</b> tại $x_0$.",
            },
            {
              step: "Bước 2 • Khái niệm Gián đoạn (0.5đ)",
              detail:
                "Nếu điều kiện liên tục bị vi phạm (không tồn tại giới hạn, hoặc giới hạn hữu hạn nhưng khác $f(x_0)$, hoặc không xác định tại $x_0$), điểm $x_0$ trở thành <b>điểm gián đoạn</b> (loại 1 nếu cả hai giới hạn một phía hữu hạn; loại 2 nếu có giới hạn một phía vô hạn hoặc không tồn tại).",
            },
          ],
          trap: 'Đừng đánh đồng "có giới hạn tại $x_0$" với "liên tục tại $x_0$": một hàm có giới hạn hữu hạn tại $x_0$ vẫn có thể bị gián đoạn bỏ được tại $x_0$ nếu $f(x_0)$ không bằng giới hạn đó hoặc không xác định.',
        },
      },
    ],
    exercises: [
      {
        level: "Vừa",
        question:
          "Bài tập thực hành – Ánh xạ (Mục 1.6): Cho các ánh xạ $f : \\mathbb{R} \\to \\mathbb{R}, \\; f(x) = x^3 - 1$ và $g : [0, +\\infty) \\to [0, +\\infty), \\; g(x) = x^2$.<br>1) Xác định ánh xạ nào là song ánh.<br>2) Tìm ánh xạ ngược nếu tồn tại.<br>3) Với $h(x) = x^2 - 4x$, tìm $h([0, 5])$.",
        solution: `
        <div class="rubric-box">
          <div class="rubric-step"><span class="rubric-tag">Ý 1 &amp; 2 — Xét f (0.35đ)</span> <i>Gợi ý: Khi xét toàn ánh, hãy bắt đầu từ phương trình $f(x) = y$ với $y$ tùy ý trong tập đích.</i><br>Với $y \\in \\mathbb{R}$ tùy ý, xét $x^3 - 1 = y \\iff x^3 = y + 1 \\iff x = \\sqrt[3]{y + 1} \\in \\mathbb{R}$ là nghiệm duy nhất. Vậy $f$ vừa đơn ánh vừa toàn ánh, nên $f$ là <b>song ánh</b> và $f^{-1} : \\mathbb{R} \\to \\mathbb{R}, \\; f^{-1}(y) = \\sqrt[3]{y + 1}$.</div>
          <div class="rubric-step"><span class="rubric-tag">Ý 1 &amp; 2 — Xét g (0.35đ)</span> Với $y \\in [0, +\\infty)$ tùy ý, phương trình $x^2 = y$ có nghiệm duy nhất $x = \\sqrt{y} \\in [0, +\\infty)$ (do $x \\ge 0$). Vậy $g$ cũng là <b>song ánh</b> và $g^{-1} : [0, +\\infty) \\to [0, +\\infty), \\; g^{-1}(y) = \\sqrt{y}$.</div>
          <div class="rubric-step"><span class="rubric-tag">Ý 3 — Tìm ảnh h([0, 5]) (0.3đ)</span> Viết $h(x) = x^2 - 4x = (x - 2)^2 - 4$. Khi $x \\in [0, 5]$ thì $x - 2 \\in [-2, 3] \\Rightarrow (x - 2)^2 \\in [0, 9] \\Rightarrow h(x) \\in [-4, 5]$. Vậy $h([0, 5]) = [-4, 5]$.</div>
          <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Khi tìm $h([0, 5])$ không chỉ tính $h(0) = 0$ và $h(5) = 5$ rồi kết luận $[0, 5]$, vì đỉnh parabol $x = 2 \\in [0, 5]$ cho giá trị nhỏ nhất $h(2) = -4$.</div>
        </div>`,
      },
      {
        level: "Cơ bản",
        question:
          "Bài 1 (Mục 2.10 – Dãy số): Tính các giới hạn:<br>a) $\\lim_{n \\to \\infty} \\frac{5n^2 + 3n - 1}{2n^2 - n + 4}$,<br>b) $\\lim_{n \\to \\infty} \\left(\\sqrt{n^2 + 4n + 1} - n\\right)$,<br>c) $\\lim_{n \\to \\infty} \\frac{\\sin(n^3)}{\\sqrt{n}}$.",
        solution: `
        <div class="rubric-box">
          <div class="rubric-step"><span class="rubric-tag">Câu a (0.3đ)</span> Chia cả tử và mẫu cho $n^2$:
          $$\\lim_{n \\to \\infty} \\frac{5 + \\frac{3}{n} - \\frac{1}{n^2}}{2 - \\frac{1}{n} + \\frac{4}{n^2}} = \\frac{5}{2}.$$</div>
          <div class="rubric-step"><span class="rubric-tag">Câu b (0.4đ)</span> Nhân lượng liên hợp rồi chia tử và mẫu cho $n$:
          $$\\lim_{n \\to \\infty} \\frac{(n^2 + 4n + 1) - n^2}{\\sqrt{n^2 + 4n + 1} + n} = \\lim_{n \\to \\infty} \\frac{4n + 1}{\\sqrt{n^2 + 4n + 1} + n} = \\lim_{n \\to \\infty} \\frac{4 + \\frac{1}{n}}{\\sqrt{1 + \\frac{4}{n} + \\frac{1}{n^2}} + 1} = \\frac{4}{1 + 1} = 2.$$</div>
          <div class="rubric-step"><span class="rubric-tag">Câu c (0.3đ)</span> Với mọi $n \\in \\mathbb{N}^*$, vì $-1 \\le \\sin(n^3) \\le 1$ nên $-\\frac{1}{\\sqrt{n}} \\le \\frac{\\sin(n^3)}{\\sqrt{n}} \\le \\frac{1}{\\sqrt{n}}$. Mà $\\lim_{n \\to \\infty} \\left(-\\frac{1}{\\sqrt{n}}\\right) = \\lim_{n \\to \\infty} \\frac{1}{\\sqrt{n}} = 0$, theo tiêu chuẩn kẹp suy ra $\\lim_{n \\to \\infty} \\frac{\\sin(n^3)}{\\sqrt{n}} = 0$.</div>
          <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Ở câu c) không được viết $\\lim \\sin(n^3)$ vì $\\sin(n^3)$ dao động không có giới hạn; bắt buộc dùng tiêu chuẩn kẹp.</div>
        </div>`,
      },
      {
        level: "Vừa",
        question:
          "Bài 2 (Mục 2.10 – Dãy số): Dùng định nghĩa $\\varepsilon - N$ chứng minh $\\lim_{n \\to \\infty} \\frac{3n - 2}{n + 4} = 3$.",
        solution: `
        <div class="rubric-box">
          <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.5đ)</span> Xét hiệu:
          $$\\left|\\frac{3n - 2}{n + 4} - 3\\right| = \\left|\\frac{3n - 2 - 3n - 12}{n + 4}\\right| = \\frac{14}{n + 4}.$$
          Với mọi $\\varepsilon > 0$, để $\\frac{14}{n + 4} < \\varepsilon$ ta cần $n + 4 > \\frac{14}{\\varepsilon} \\iff n > \\frac{14}{\\varepsilon} - 4$.</div>
          <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Chọn $N \\in \\mathbb{N}^*$ sao cho $N > \\max\\left\\{0, \\frac{14}{\\varepsilon} - 4\\right\\}$. Khi đó, với mọi $n > N$ ta có $n > \\frac{14}{\\varepsilon} - 4$, suy ra $\\left|\\frac{3n - 2}{n + 4} - 3\\right| = \\frac{14}{n + 4} < \\varepsilon$. Vậy $\\lim_{n \\to \\infty} \\frac{3n - 2}{n + 4} = 3$.</div>
          <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Phải nêu rõ lấy giá trị tự nhiên $N \\in \\mathbb{N}^*$ và chặn dưới bởi $0$ trong $\\max\\left\\{0, \\frac{14}{\\varepsilon} - 4\\right\\}$.</div>
        </div>`,
      },
      {
        level: "Cơ bản",
        question:
          "Bài 3 (Mục 3.12 & 3.13 – Giới hạn hàm số): Tính:<br>a) $\\lim_{x \\to 0} \\frac{\\sin 5x}{\\sin 2x}$,<br>b) $\\lim_{x \\to 0} \\frac{1 - \\cos 3x}{x^2}$,<br>c) $\\lim_{x \\to 0} \\frac{e^{2x} - 1}{\\sin 3x}$,<br>d) $\\lim_{x \\to \\infty} \\left(1 + \\frac{2}{x}\\right)^{3x}$.",
        solution: `
        <div class="rubric-box">
          <div class="rubric-step"><span class="rubric-tag">Câu a (0.25đ)</span> $\\lim_{x \\to 0} \\frac{\\sin 5x}{\\sin 2x} = \\lim_{x \\to 0} \\left(\\frac{\\sin 5x}{5x} \\cdot \\frac{2x}{\\sin 2x} \\cdot \\frac{5}{2}\\right) = 1 \\cdot 1 \\cdot \\frac{5}{2} = \\frac{5}{2}$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu b (0.25đ)</span> $\\lim_{x \\to 0} \\frac{1 - \\cos 3x}{x^2} = \\lim_{x \\to 0} 9 \\cdot \\frac{1 - \\cos 3x}{(3x)^2} = 9 \\cdot \\frac{1}{2} = \\frac{9}{2}$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu c (0.25đ)</span> $\\lim_{x \\to 0} \\frac{e^{2x} - 1}{\\sin 3x} = \\lim_{x \\to 0} \\left(\\frac{e^{2x} - 1}{2x} \\cdot \\frac{3x}{\\sin 3x} \\cdot \\frac{2}{3}\\right) = 1 \\cdot 1 \\cdot \\frac{2}{3} = \\frac{2}{3}$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu d (0.25đ)</span> Nhận diện dạng $(1 + u(x))^{v(x)}$ với $u(x) = \\frac{2}{x} \\to 0$ khi $x \\to \\infty$ và $u(x)v(x) = \\frac{2}{x} \\cdot 3x = 6$. Do đó:
          $$\\lim_{x \\to \\infty} \\left(1 + \\frac{2}{x}\\right)^{3x} = \\lim_{x \\to \\infty} \\left[\\left(1 + \\frac{2}{x}\\right)^{\\frac{x}{2}}\\right]^6 = e^6.$$</div>
          <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Ở câu b), khi đặt $u = 3x$ thì mẫu tương ứng phải là $u^2 = (3x)^2 = 9x^2$, nhiều bạn nhầm thành $3x^2$.</div>
        </div>`,
      },
      {
        level: "Vừa",
        question:
          "Bài 4 (Mục 3.13 – Giới hạn hàm số): Dùng định nghĩa Heine để chứng minh $\\lim_{x \\to 0} \\cos \\frac{1}{x}$ không tồn tại.",
        solution: `
        <div class="rubric-box">
          <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.5đ)</span> Chọn hai dãy $(x_n), (y_n)$ khác $0$ và cùng tiến về $0$:<br>
          - Chọn $x_n = \\frac{1}{2n\\pi} \\to 0$ ($x_n \\neq 0$): khi đó $\\cos \\frac{1}{x_n} = \\cos(2n\\pi) = 1 \\to 1$.<br>
          - Chọn $y_n = \\frac{1}{\\pi + 2n\\pi} \\to 0$ ($y_n \\neq 0$): khi đó $\\cos \\frac{1}{y_n} = \\cos(\\pi + 2n\\pi) = -1 \\to -1$.</div>
          <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Hai dãy $(x_n)$ và $(y_n)$ cùng tiến về $0$ nhưng hai dãy ảnh tương ứng có giới hạn khác nhau ($1 \\neq -1$). Theo định lý Heine, giới hạn $\\lim_{x \\to 0} \\cos \\frac{1}{x}$ không tồn tại.</div>
          <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Không được chọn một dãy hằng $x_n = 0$ vì định nghĩa Heine yêu cầu $x_n \\neq x_0$.</div>
        </div>`,
      },
      {
        level: "Cơ bản",
        question:
          "Bài 5 (Mục 4.8 – VCB và VCL): Dùng VCB tương đương để tính:<br>a) $\\lim_{x \\to 0} \\frac{\\tan 3x}{\\sin 5x}$,<br>b) $\\lim_{x \\to 0} \\frac{\\ln(1 + 2x)}{e^{3x} - 1}$,<br>c) $\\lim_{x \\to 0} \\frac{1 - \\cos 2x}{x \\sin x}$.",
        solution: `
        <div class="rubric-box">
          <div class="rubric-step"><span class="rubric-tag">Câu a (0.3đ)</span> Khi $x \\to 0$, $\\tan 3x \\sim 3x$ và $\\sin 5x \\sim 5x$. Do đó $\\lim_{x \\to 0} \\frac{\\tan 3x}{\\sin 5x} = \\lim_{x \\to 0} \\frac{3x}{5x} = \\frac{3}{5}$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu b (0.3đ)</span> Khi $x \\to 0$, $\\ln(1 + 2x) \\sim 2x$ và $e^{3x} - 1 \\sim 3x$. Do đó $\\lim_{x \\to 0} \\frac{\\ln(1 + 2x)}{e^{3x} - 1} = \\lim_{x \\to 0} \\frac{2x}{3x} = \\frac{2}{3}$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu c (0.4đ)</span> Khi $x \\to 0$, $1 - \\cos 2x \\sim \\frac{(2x)^2}{2} = 2x^2$ và $x \\sin x \\sim x \\cdot x = x^2$. Do đó $\\lim_{x \\to 0} \\frac{1 - \\cos 2x}{x \\sin x} = \\lim_{x \\to 0} \\frac{2x^2}{x^2} = 2$.</div>
          <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Ở câu c), $1 - \\cos(2x) \\sim \\frac{(2x)^2}{2} = 2x^2$, cẩn thận đừng quên bình phương cả hệ số $2$ thành $4x^2 / 2$.</div>
        </div>`,
      },
      {
        level: "Vừa",
        question:
          "Bài 6 (Mục 4.8 – VCB và VCL): Tính $\\lim_{x \\to \\infty} \\frac{2^x + x^5 + \\ln x}{3 \\cdot 2^x + x^2 + 1}$.",
        solution: `
        <div class="rubric-box">
          <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.5đ)</span> Điều kiện xác định của $\\ln x$ là $x > 0$ nên $x \\to +\\infty$. Theo thang tốc độ tăng VCL $\\ln x \\ll x^2 \\ll x^5 \\ll 2^x$, ta ngắt bỏ các VCL cấp thấp:<br>
          $2^x + x^5 + \\ln x \\sim 2^x$ và $3 \\cdot 2^x + x^2 + 1 \\sim 3 \\cdot 2^x$.</div>
          <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Suy ra:
          $$\\lim_{x \\to +\\infty} \\frac{2^x + x^5 + \\ln x}{3 \\cdot 2^x + x^2 + 1} = \\lim_{x \\to +\\infty} \\frac{2^x}{3 \\cdot 2^x} = \\frac{1}{3}.$$</div>
          <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Cần so sánh đúng $x^5 \\ll 2^x$ (hàm mũ tăng nhanh hơn mọi đa thức) để giữ lại $2^x$ chứ không giữ $x^5$.</div>
        </div>`,
      },
      {
        level: "Cơ bản",
        question:
          "Bài 7 (Mục 5.11 – Hàm số liên tục): Tìm $m$ để hàm số $f(x) = \\begin{cases} x^2 + m, & x < 1, \\\\ 2x + 1, & x \\ge 1 \\end{cases}$ liên tục tại $x = 1$.",
        solution: `
        <div class="rubric-box">
          <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.5đ)</span> Tính $f(1)$ và hai giới hạn một phía tại $x = 1$:<br>
          $f(1) = 2(1) + 1 = 3$;<br>
          $\\lim_{x \\to 1^+} f(x) = \\lim_{x \\to 1^+} (2x + 1) = 3$;<br>
          $\\lim_{x \\to 1^-} f(x) = \\lim_{x \\to 1^-} (x^2 + m) = 1 + m$.</div>
          <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Hàm số liên tục tại $x = 1 \\iff \\lim_{x \\to 1^-} f(x) = \\lim_{x \\to 1^+} f(x) = f(1) \\iff 1 + m = 3 \\iff m = 2$.</div>
          <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Phải ghi đầy đủ ba thành phần $\\lim_{x \\to 1^-} f(x)$, $\\lim_{x \\to 1^+} f(x)$ và $f(1)$ khi trình bày bài thi.</div>
        </div>`,
      },
      {
        level: "Vừa",
        question:
          "Bài 8 (Mục 5.11 – Hàm số liên tục): Phân loại các điểm gián đoạn của $f(x) = \\frac{x + 1}{x - 2}$ và $g(x) = \\begin{cases} x + 1, & x < 0, \\\\ x^2 + 2, & x \\ge 0. \\end{cases}$",
        solution: `
        <div class="rubric-box">
          <div class="rubric-step"><span class="rubric-tag">Hàm f(x) (0.5đ)</span> Hàm $f(x) = \\frac{x + 1}{x - 2}$ liên tục trên $\\mathbb{R} \\setminus \\{2\\}$, không xác định tại $x_0 = 2$. Ta có $\\lim_{x \\to 2^+} f(x) = +\\infty$ (và $\\lim_{x \\to 2^-} f(x) = -\\infty$). Vì giới hạn một phía bằng vô cực nên $x_0 = 2$ là <b>điểm gián đoạn loại 2</b>.</div>
          <div class="rubric-step"><span class="rubric-tag">Hàm g(x) (0.5đ)</span> Hàm $g(x)$ liên tục trên $(-\\infty, 0)$ và $(0, +\\infty)$. Xét tại $x_0 = 0$: $\\lim_{x \\to 0^-} g(x) = 1$, $\\lim_{x \\to 0^+} g(x) = 2 = g(0)$. Vì hai giới hạn một phía đều hữu hạn nhưng khác nhau ($1 \\neq 2$), nên $x_0 = 0$ là <b>điểm gián đoạn loại 1 – bước nhảy</b> (bước nhảy $|2 - 1| = 1$).</div>
          <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Nhớ giải thích lý do hàm liên tục ở các điểm còn lại trước khi xét riêng điểm nghi ngờ gián đoạn.</div>
        </div>`,
      },
      {
        level: "Vừa",
        question:
          "Bài 9 (Mục 5.12 – Bài tập tổng hợp): Chứng minh phương trình $x^3 + x - 1 = 0$ có ít nhất một nghiệm trong $(0, 1)$.",
        solution: `
        <div class="rubric-box">
          <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.5đ)</span> Đặt $f(x) = x^3 + x - 1$. Vì $f$ là đa thức nên liên tục trên $\\mathbb{R}$, do đó $f$ liên tục trên đoạn $[0, 1]$.</div>
          <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Tính $f(0) = -1 < 0$ và $f(1) = 1 + 1 - 1 = 1 > 0 \\Rightarrow f(0)f(1) = -1 < 0$. Theo định lý Bolzano–Cauchy, tồn tại ít nhất một $c \\in (0, 1)$ sao cho $f(c) = 0$. Vậy phương trình đã cho có ít nhất một nghiệm trong $(0, 1)$.</div>
          <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Quên kiểm tra điều kiện hàm $f$ liên tục trên đoạn đóng $[0, 1]$ sẽ mất nửa số điểm bài chứng minh.</div>
        </div>`,
      },
      {
        level: "Vừa",
        question:
          "Bài 10 (Mục 5.12 – Bài tập tổng hợp): Tìm $a, b$ để hàm số $f(x) = \\begin{cases} ax + b, & x < 1, \\\\ x^2 + 1, & x \\ge 1 \\end{cases}$ liên tục tại $x = 1$.",
        solution: `
        <div class="rubric-box">
          <div class="rubric-step"><span class="rubric-tag">Bước 1 (0.5đ)</span> Ta có $f(1) = 1^2 + 1 = 2$, $\\lim_{x \\to 1^+} f(x) = \\lim_{x \\to 1^+} (x^2 + 1) = 2$, và $\\lim_{x \\to 1^-} f(x) = \\lim_{x \\to 1^-} (ax + b) = a + b$.</div>
          <div class="rubric-step"><span class="rubric-tag">Bước 2 (0.5đ)</span> Hàm số liên tục tại $x = 1 \\iff \\lim_{x \\to 1^-} f(x) = \\lim_{x \\to 1^+} f(x) = f(1) \\iff a + b = 2$. Vậy mọi cặp số thực $(a, b)$ thỏa $a + b = 2$ (tức $b = 2 - a$ với $a \\in \\mathbb{R}$ tùy ý) đều thỏa mãn đề bài.</div>
          <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Bài toán có 2 ẩn $a, b$ nhưng chỉ có 1 phương trình điều kiện liên tục tại $x = 1$, nên kết quả là một họ vô số nghiệm $b = 2 - a$ chứ không giải ra một giá trị duy nhất cho từng ẩn.</div>
        </div>`,
      },
    ],
    quiz: [
      {
        question:
          "Xét ánh xạ $f : \\mathbb{R} \\to \\mathbb{R}$, $f(x) = x^2$. Khẳng định nào sau đây ĐÚNG?",
        options: [
          "$f$ là đơn ánh nhưng không toàn ánh",
          "$f$ là toàn ánh nhưng không đơn ánh",
          "$f$ vừa không đơn ánh vừa không toàn ánh",
          "$f$ là song ánh",
        ],
        answer: 2,
        explanation:
          "$f$ không đơn ánh vì $f(1) = f(-1)$, và không toàn ánh vì $-1 \\notin f(\\mathbb{R}) = [0, +\\infty)$.",
      },
      {
        question: "Cho $f(x) = x^2 - 2x$. Tạo ảnh $f^{-1}(\\{3\\})$ bằng:",
        options: ["$\\{3\\}$", "$\\{-1, 3\\}$", "$[-1, 3]$", "$\\{1, 3\\}$"],
        answer: 1,
        explanation:
          "Giải $x^2 - 2x = 3 \\iff (x - 1)^2 = 4 \\iff x = -1$ hoặc $x = 3$, nên $f^{-1}(\\{3\\}) = \\{-1, 3\\}$.",
      },
      {
        question:
          "Theo định lý Weierstrass cho dãy số, điều kiện nào dưới đây đảm bảo dãy $(x_n)$ hội tụ?",
        options: [
          "Dãy $(x_n)$ bị chặn",
          "Dãy $(x_n)$ tăng và bị chặn dưới",
          "Dãy $(x_n)$ giảm và bị chặn dưới",
          "Dãy $(x_n)$ đơn điệu",
        ],
        answer: 2,
        explanation:
          "Dãy tăng và bị chặn trên thì hội tụ; dãy giảm và bị chặn dưới thì hội tụ.",
      },
      {
        question:
          "Theo thang so sánh tốc độ tăng khi $n \\to \\infty$ (với $k > 0, a > 1$), thứ tự nào sau đây ĐÚNG?",
        options: [
          "$\\ln n \\ll n^k \\ll a^n \\ll n! \\ll n^n$",
          "$n^k \\ll \\ln n \\ll a^n \\ll n! \\ll n^n$",
          "$\\ln n \\ll n^k \\ll n! \\ll a^n \\ll n^n$",
          "$\\ln n \\ll a^n \\ll n^k \\ll n! \\ll n^n$",
        ],
        answer: 0,
        explanation:
          "Hàm logarit chậm hơn lũy thừa, lũy thừa chậm hơn hàm mũ $a^n$, hàm mũ chậm hơn giai thừa $n!$, và $n!$ chậm hơn $n^n$.",
      },
      {
        question:
          "Giá trị giới hạn $B = \\lim_{x \\to \\infty} \\left(\\frac{x + 2}{x - 1}\\right)^{2x + 1}$ bằng:",
        options: ["$e^2$", "$e^3$", "$e^6$", "$1$"],
        answer: 2,
        explanation:
          "Ta viết $\\frac{x + 2}{x - 1} = 1 + \\frac{3}{x - 1}$. Khi $x \\to \\infty$, $\\frac{3}{x - 1} \\cdot (2x + 1) \\to 6$, nên giới hạn bằng $e^6$.",
      },
      {
        question:
          "Khi $x \\to 0$, cặp vô cùng bé nào sau đây KHÔNG tương đương?",
        options: [
          "$\\arcsin x \\sim x$",
          "$\\sqrt{1 + x} - 1 \\sim \\frac{x}{2}$",
          "$1 - \\cos x \\sim x^2$",
          "$a^x - 1 \\sim x \\ln a$",
        ],
        answer: 2,
        explanation:
          "Khi $x \\to 0$, $1 - \\cos x \\sim \\frac{x^2}{2}$ (không phải $x^2$).",
      },
      {
        question:
          "Cho $g(x) = \\frac{|x|}{x}$. Điểm $x_0 = 0$ thuộc loại điểm gián đoạn nào?",
        options: [
          "Gián đoạn loại 1 – bỏ được",
          "Gián đoạn loại 1 – bước nhảy",
          "Gián đoạn loại 2",
          "Hàm liên tục tại $x_0 = 0$",
        ],
        answer: 1,
        explanation:
          "Ta có $\\lim_{x \\to 0^-} g(x) = -1$ và $\\lim_{x \\to 0^+} g(x) = 1$. Hai giới hạn một phía đều hữu hạn nhưng khác nhau nên là gián đoạn loại 1 – bước nhảy.",
      },
      {
        question:
          "Theo định lý Bolzano–Cauchy (giá trị trung gian), điều kiện đủ để phương trình $f(x) = 0$ có ít nhất một nghiệm $c \\in (a, b)$ là:",
        options: [
          "$f(a)f(b) < 0$",
          "$f$ liên tục trên $(a, b)$ và $f(a)f(b) > 0$",
          "$f$ liên tục trên đoạn $[a, b]$ và $f(a)f(b) < 0$",
          "$f$ bị chặn trên $[a, b]$ và $f(a)f(b) < 0$",
        ],
        answer: 2,
        explanation:
          "Định lý Bolzano–Cauchy yêu cầu $f$ liên tục trên đoạn đóng $[a, b]$ và $f(a)f(b) < 0$.",
      },
    ],
  },

  // =========================================================================
  // CHƯƠNG 2: GIẢI TÍCH 1 - ĐẠO HÀM, VI PHÂN VÀ ỨNG DỤNG
  // =========================================================================
  {
    id: "gt-c2",
    code: "GIẢI TÍCH 1 • CHƯƠNG 2",
    subject: "Giải tích 1",
    level: "Trung bình",
    title: "Đạo hàm và Vi phân của hàm một biến",
    summary:
      "Định nghĩa, ý nghĩa cơ học – hình học và quy tắc tính đạo hàm (hàm hợp, hàm ngược, một phía, vô hạn, logarithm); Khả vi, vi phân cấp một – cấp cao, tính bất biến, hàm tham số & hàm ẩn, công thức Leibniz; Cực trị địa phương (Fermat & điều kiện đủ), định lý Rolle – Lagrange – Cauchy, quy tắc L’Hospital và khai triển Taylor–Maclaurin.",
    previewFormula:
      "$$f'(x_0) = \\lim_{\\Delta x \\to 0} \\frac{f(x_0 + \\Delta x) - f(x_0)}{\\Delta x}, \\quad f(x) = \\sum_{k=0}^n \\frac{f^{(k)}(x_0)}{k!}(x - x_0)^k + R_n(x)$$",
    bannerGradient: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    theory: [
      {
        heading: "2.1. Định nghĩa đạo hàm",
        content:
          "• Cho hàm số $y = f(x)$ xác định trong một lân cận của $x_0$.<br>" +
          "• <b>Định nghĩa:</b> Nếu giới hạn hữu hạn $$f'(x_0) = \\lim_{x \\to x_0} \\frac{f(x) - f(x_0)}{x - x_0}$$ tồn tại thì $f$ được gọi là <b>có đạo hàm tại $x_0$</b>.<br>" +
          "• Tương đương, với $\\Delta x = x - x_0$: $$f'(x_0) = \\lim_{\\Delta x \\to 0} \\frac{f(x_0 + \\Delta x) - f(x_0)}{\\Delta x}.$$",
        checkpoint: {
          question:
            "Ví dụ (đạo hàm tại một điểm): Dùng định nghĩa tính đạo hàm của $f(x) = x^2$ tại $x_0 = 1$ và suy ra hệ số góc tiếp tuyến tại điểm $(1, 1)$.",
          rubric: [
            {
              step: "Bước 1 • Lập tỉ số số gia và rút gọn khi h → 0 (0.5đ)",
              detail:
                "Đặt $h = \\Delta x$: $$f'(1) = \\lim_{h \\to 0} \\frac{(1 + h)^2 - 1}{h} = \\lim_{h \\to 0} \\frac{2h + h^2}{h} = \\lim_{h \\to 0} (2 + h) = 2.$$",
            },
            {
              step: "Bước 2 • Kết luận hệ số góc tiếp tuyến (0.5đ)",
              detail:
                "Vậy $f'(1) = 2$ và hệ số góc tiếp tuyến của đồ thị $y = x^2$ tại điểm $(1, 1)$ bằng $2$.",
            },
          ],
          trap: "Giới hạn định nghĩa đạo hàm phải là giới hạn HỮU HẠN; nếu giới hạn bằng $\\pm\\infty$ hoặc không tồn tại thì hàm không có đạo hàm (theo nghĩa thông thường) tại $x_0$.",
        },
      },
      {
        heading: "2.2. Ý nghĩa cơ học và Ý nghĩa hình học của đạo hàm",
        content:
          "• <b>Ý nghĩa cơ học:</b> Nếu $s = s(t)$ là quãng đường theo thời gian thì vận tốc tức thời tại $t_0$ là: $$v(t_0) = s'(t_0).$$" +
          "• <b>Ý nghĩa hình học:</b> Với đồ thị $y = f(x)$, hệ số góc tiếp tuyến tại $M_0(x_0, f(x_0))$ là: $$k = f'(x_0).$$ Phương trình tiếp tuyến tại $M_0(x_0, f(x_0))$: $$y - f(x_0) = f'(x_0)(x - x_0).$$",
        checkpoint: {
          question:
            "Ví dụ: Nếu $s(t) = t^2 + 2t$, hãy tính vận tốc tức thời $v(1)$; và với $f(x) = x^2$, viết phương trình tiếp tuyến tại điểm $(1, 1)$.",
          rubric: [
            {
              step: "Bước 1 • Tính vận tốc tức thời v(1) (0.5đ)",
              detail:
                "Ta có $s'(t) = 2t + 2 \\Rightarrow v(1) = s'(1) = 2(1) + 2 = 4$.",
            },
            {
              step: "Bước 2 • Viết phương trình tiếp tuyến tại (1, 1) (0.5đ)",
              detail:
                "Với $f(x) = x^2$, $f'(1) = 2$. Phương trình tiếp tuyến tại $(1, 1)$ là $y - 1 = 2(x - 1)$.",
            },
          ],
          trap: "Trong phương trình tiếp tuyến $y - f(x_0) = f'(x_0)(x - x_0)$, phải thay $f'(x_0)$ là một hằng số tại $x_0$, tuyệt đối không giữ nguyên biểu thức $f'(x)$ chứa biến $x$.",
        },
      },
      {
        heading: "2.3. Các quy tắc tính đạo hàm và Hệ quả liên tục",
        content:
          "• Giả sử $f, g$ có đạo hàm tại $x$ và $c$ là hằng số:<br>" +
          "$$(f \\pm g)' = f' \\pm g', \\qquad (cf)' = cf',$$" +
          "$$(fg)' = f'g + fg', \\qquad \\left(\\frac{f}{g}\\right)' = \\frac{f'g - fg'}{g^2} \\quad (g \\neq 0).$$" +
          "• <b>Hệ quả:</b> Nếu $f$ có đạo hàm tại $x_0$ thì $f$ <b>liên tục</b> tại $x_0$. Chiều ngược lại nói chung <b>không đúng</b>.",
        checkpoint: {
          question: "Ví dụ: Tính đạo hàm của hàm số $y = x^2 e^x$.",
          rubric: [
            {
              step: "Bước 1 • Áp dụng quy tắc đạo hàm của tích (fg)' = f'g + fg' (0.5đ)",
              detail:
                "Với $f(x) = x^2 \\Rightarrow f'(x) = 2x$ và $g(x) = e^x \\Rightarrow g'(x) = e^x$: $$y' = (x^2)'e^x + x^2(e^x)' = 2xe^x + x^2e^x.$$",
            },
            {
              step: "Bước 2 • Đặt nhân tử chung rút gọn (0.5đ)",
              detail: "Vậy $y' = e^x(x^2 + 2x)$.",
            },
          ],
          trap: "Đừng nhầm $(fg)' = f'g'$ và chú ý dấu trừ ở tử của quy tắc thương $\\frac{f'g - fg'}{g^2}$.",
        },
      },
      {
        heading: "2.4. Đạo hàm hàm hợp và Đạo hàm của hàm ngược",
        content:
          "• <b>Đạo hàm hàm hợp:</b> Nếu $u = u(x)$ có đạo hàm tại $x_0$ và $y = f(u)$ có đạo hàm tại $u_0 = u(x_0)$ thì: $$\\frac{dy}{dx} = \\frac{dy}{du}\\frac{du}{dx}$$ hay $$[f(u(x))]' = f'(u(x))u'(x).$$" +
          "<i>Ví dụ:</i> Với $y = \\sin(x^2 + 1)$, $y' = 2x \\cos(x^2 + 1)$.<br>" +
          "• <b>Đạo hàm của hàm ngược:</b> Giả sử $y = f(x)$ có hàm ngược $x = g(y)$ và $f'(x_0) \\neq 0$. Khi đó: $$g'(y_0) = \\frac{1}{f'(x_0)}, \\qquad y_0 = f(x_0).$$",
        checkpoint: {
          question:
            "Ví dụ (hàm ngược): Từ $y = \\arcsin x \\iff x = \\sin y$ ($y \\in (-\\frac{\\pi}{2}, \\frac{\\pi}{2})$), chứng minh $(\\arcsin x)' = \\frac{1}{\\sqrt{1 - x^2}}$ ($|x| < 1$), và nêu công thức tương tự cho $(\\arctan x)'$.",
          rubric: [
            {
              step: "Bước 1 • Áp dụng công thức đạo hàm hàm ngược cho y = arcsin x (0.6đ)",
              detail:
                "Vì $x = \\sin y$ có đạo hàm theo $y$ là $\\cos y > 0$ trên $(-\\frac{\\pi}{2}, \\frac{\\pi}{2})$, nên: $$(\\arcsin x)' = \\frac{1}{(\\sin y)'} = \\frac{1}{\\cos y} = \\frac{1}{\\sqrt{1 - \\sin^2 y}} = \\frac{1}{\\sqrt{1 - x^2}}, \\qquad |x| < 1.$$",
            },
            {
              step: "Bước 2 • Kết quả tương tự cho arctan x (0.4đ)",
              detail:
                "Từ $y = \\arctan x \\iff x = \\tan y$, $(\\arctan x)' = \\frac{1}{1 + \\tan^2 y} = \\frac{1}{1 + x^2}$.",
            },
          ],
          trap: "Khi tính đạo hàm hàm hợp nhiều lớp, nhớ nhân đủ tất cả các thừa số $u'(x)$ từ ngoài vào trong.",
        },
      },
      {
        heading: "2.5. Bảng đạo hàm cơ bản (I & II)",
        content:
          "• <b>Bảng đạo hàm cơ bản I (với $u = u(x)$):</b><br>" +
          "1) $(u^\\alpha)' = \\alpha u^{\\alpha - 1}u'$ <br>" +
          "2) $(e^u)' = e^u u'$, $\\quad (a^u)' = a^u \\ln a \\cdot u'$ <br>" +
          "3) $(\\ln |u|)' = \\frac{u'}{u}$, $\\quad (\\log_a |u|)' = \\frac{u'}{u \\ln a}$ <br>" +
          "4) $(\\sin u)' = u' \\cos u$, $\\quad (\\cos u)' = -u' \\sin u$ <br>" +
          "5) $(\\tan u)' = \\frac{u'}{\\cos^2 u}$, $\\quad (\\cot u)' = -\\frac{u'}{\\sin^2 u}$ <br>" +
          "• <b>Bảng đạo hàm cơ bản II (hàm lượng giác ngược):</b><br>" +
          "6) $(\\arcsin u)' = \\frac{u'}{\\sqrt{1 - u^2}}$, $\\quad (\\arccos u)' = -\\frac{u'}{\\sqrt{1 - u^2}}$ <br>" +
          "7) $(\\arctan u)' = \\frac{u'}{1 + u^2}$, $\\quad (\\operatorname{arccot} u)' = -\\frac{u'}{1 + u^2}$.",
        checkpoint: {
          question: "Ví dụ: Tính đạo hàm của hàm số $y = (1 + x^2)^5 \\sin x$.",
          rubric: [
            {
              step: "Bước 1 • Áp dụng quy tắc tích và đạo hàm hàm hợp (u⁵)' = 5u⁴u' (0.5đ)",
              detail:
                "Đạo hàm của $(1 + x^2)^5$ là $5(1 + x^2)^4 \\cdot (2x) = 10x(1 + x^2)^4$.",
            },
            {
              step: "Bước 2 • Ghép theo quy tắc tích (0.5đ)",
              detail: "$$y' = 10x(1 + x^2)^4 \\sin x + (1 + x^2)^5 \\cos x.$$",
            },
          ],
          trap: "Nhớ phân biệt công thức $(x^n)' = nx^{n-1}$ (số mũ hằng số) và $(a^x)' = a^x \\ln a$ (cơ số hằng số), và đừng quên nhân $\\ln a$ trong đạo hàm của $a^u$ và $\\log_a |u|$.",
        },
      },
      {
        heading: "2.6. Đạo hàm một phía, Đạo hàm vô hạn và Tiếp tuyến đứng",
        content:
          "• <b>Định nghĩa đạo hàm một phía:</b> $$f'_+(x_0) = \\lim_{x \\to x_0^+} \\frac{f(x) - f(x_0)}{x - x_0}, \\qquad f'_-(x_0) = \\lim_{x \\to x_0^-} \\frac{f(x) - f(x_0)}{x - x_0}.$$" +
          "• <b>Định lý 1.1:</b> $f$ có đạo hàm tại $x_0$ khi và chỉ khi hai đạo hàm một phía tồn tại hữu hạn và $$f'_-(x_0) = f'_+(x_0).$$" +
          "• <b>Đạo hàm vô hạn và tiếp tuyến đứng:</b> Nếu $$\\lim_{x \\to x_0} \\frac{f(x) - f(x_0)}{x - x_0} = \\pm\\infty,$$ ta nói đạo hàm theo nghĩa mở rộng là <b>vô hạn</b> tại $x_0$.<br>" +
          "<i>Ví dụ:</i> Với $f(x) = x^{1/3}$, $f'(x) = \\frac{1}{3x^{2/3}}$ ($x \\neq 0$), và $f'(x) \\to +\\infty$ khi $x \\to 0$. Đồ thị có tiếp tuyến đứng $x = 0$.",
        checkpoint: {
          question:
            "Ví dụ (đạo hàm một phía): Xét hàm số $f(x) = \\begin{cases} x^2, & x \\le 1, \\\\ 2x - 1, & x > 1. \\end{cases}$ Xét sự tồn tại đạo hàm của $f$ tại $x = 1$; và nếu thay nhánh thứ hai bởi $2x^2 - 1$ thì kết quả ra sao?",
          rubric: [
            {
              step: "Bước 1 • Trường hợp 1: nhánh dưới là 2x − 1 (0.5đ)",
              detail:
                "Ta có $f(1) = 1$, $f'_-(1) = \\lim_{x \\to 1^-} \\frac{x^2 - 1}{x - 1} = 2$ và $f'_+(1) = \\lim_{x \\to 1^+} \\frac{(2x - 1) - 1}{x - 1} = 2$. Vì $f'_-(1) = f'_+(1) = 2$, suy ra $f'(1) = 2$.",
            },
            {
              step: "Bước 2 • Trường hợp 2: thay nhánh thứ hai bởi 2x² − 1 (0.5đ)",
              detail:
                "Khi đó $f'_-(1) = 2$ nhưng $f'_+(1) = \\lim_{x \\to 1^+} \\frac{(2x^2 - 1) - 1}{x - 1} = 4 \\neq 2$, nên $f$ <b>không có đạo hàm</b> tại $x = 1$.",
            },
          ],
          trap: "Để hàm có đạo hàm tại $x_0$, trước hết hàm phải liên tục tại $x_0$; đừng vội lấy đạo hàm từng nhánh rồi thế $x = x_0$ mà bỏ qua bước kiểm tra liên tục và dùng đúng định nghĩa giới hạn một phía!",
        },
      },
      {
        heading: "2.7. Đạo hàm logarithm",
        content:
          "• Với hàm có cả cơ số và số mũ đều chứa biến $y = [u(x)]^{v(x)}$, $u(x) > 0$, ta lấy logarithm tự nhiên hai vế: $$\\ln y = v(x) \\ln u(x).$$" +
          "• Đạo hàm hai vế theo $x$ ta suy ra: $$y' = u^v \\left(v' \\ln u + v\\frac{u'}{u}\\right).$$",
        checkpoint: {
          question: "Ví dụ: Tính đạo hàm của hàm số $y = x^x$ ($x > 0$).",
          rubric: [
            {
              step: "Bước 1 • Lấy logarithm hai vế (0.5đ)",
              detail:
                "Với $x > 0$, lấy logarit tự nhiên hai vế được $\\ln y = x \\ln x$.",
            },
            {
              step: "Bước 2 • Đạo hàm theo x và rút y' (0.5đ)",
              detail:
                "$\\frac{y'}{y} = 1 \\cdot \\ln x + x \\cdot \\frac{1}{x} = 1 + \\ln x \\Rightarrow y' = x^x(1 + \\ln x)$.",
            },
          ],
          trap: "Phép lấy logarithm cũng rất hữu ích để tính đạo hàm của tích/thương nhiều thừa số phức tạp bằng cách biến tích thành tổng các logarithm.",
        },
      },
      {
        heading: "2.8. Khả vi tại một điểm và Vi phân cấp một",
        content:
          "• <b>Định nghĩa:</b> Hàm $f$ <b>khả vi tại $x_0$</b> nếu: $$\\Delta y = f(x_0 + \\Delta x) - f(x_0) = A\\Delta x + o(\\Delta x), \\qquad \\Delta x \\to 0.$$ Phần tuyến tính $A\\Delta x$ được gọi là <b>vi phân</b> của $f$ tại $x_0$.<br>" +
          "• <b>Định lý 2.1:</b> $f$ khả vi tại $x_0$ khi và chỉ khi $f$ có đạo hàm hữu hạn tại $x_0$. Khi đó: $$A = f'(x_0), \\qquad dy = f'(x)\\,dx.$$",
        checkpoint: {
          question:
            "Ví dụ (tính khả vi): Chứng minh $f(x) = x^2$ khả vi tại mọi $x_0 \\in \\mathbb{R}$ theo định nghĩa và viết vi phân $dy$.",
          rubric: [
            {
              step: "Bước 1 • Tính số gia Δy theo Δx (0.5đ)",
              detail:
                "$$\\Delta y = (x_0 + \\Delta x)^2 - x_0^2 = 2x_0 \\Delta x + (\\Delta x)^2.$$",
            },
            {
              step: "Bước 2 • Kiểm tra phần dư o(Δx) và viết dy (0.5đ)",
              detail:
                "Vì $\\lim_{\\Delta x \\to 0} \\frac{(\\Delta x)^2}{\\Delta x} = 0$ nên $(\\Delta x)^2 = o(\\Delta x)$ khi $\\Delta x \\to 0$. Vậy $f$ khả vi tại mọi $x_0$ với $A = 2x_0$, tức $dy = 2x\\,dx$.",
            },
          ],
          trap: 'Với hàm một biến, "khả vi tại $x_0$" và "có đạo hàm hữu hạn tại $x_0$" là hai khái niệm tương đương nhau.',
        },
      },
      {
        heading:
          "2.9. Các quy tắc vi phân và Tính bất biến của vi phân cấp một",
        content:
          "• <b>Các quy tắc vi phân:</b><br>" +
          "$$dc = 0, \\qquad d(f \\pm g) = df \\pm dg,$$" +
          "$$d(fg) = g\\,df + f\\,dg, \\qquad d\\left(\\frac{f}{g}\\right) = \\frac{g\\,df - f\\,dg}{g^2} \\quad (g \\neq 0).$$" +
          "<i>Ví dụ:</i> Nếu $y = 3x + e^x - \\cos x$ thì $dy = (3 + e^x + \\sin x)\\,dx$.<br>" +
          "• <b>Tính bất biến của vi phân cấp một:</b> Nếu $y = f(x)$ và $x = x(t)$ thì $$dy = f'(x)\\,dx,$$ trong đó $dx = x'(t)\\,dt$. Do đó dạng của vi phân cấp một <b>không đổi</b> dù $x$ là biến độc lập hay biến phụ thuộc.<br>" +
          "• <b>Ghi nhớ:</b> Tính bất biến này <b>không còn đúng</b> đối với vi phân cấp cao.",
        checkpoint: {
          question:
            "Ví dụ (tính bất biến): Cho $y = x^2$ với $x = \\sin t$. Tính vi phân $dy$ theo $dx$ và theo $dt$.",
          rubric: [
            {
              step: "Bước 1 • Viết dạng bất biến của dy theo dx (0.5đ)",
              detail:
                "Dù $x = \\sin t$ là biến phụ thuộc, dạng vi phân cấp một vẫn là $dy = 2x\\,dx$.",
            },
            {
              step: "Bước 2 • Thế x = sin t và dx = cos t dt (0.5đ)",
              detail:
                "Thay $dx = \\cos t\\,dt$ ta thu được: $$dy = 2x\\,dx = 2\\sin t \\cos t\\,dt.$$",
            },
          ],
          trap: "Khi viết vi phân $dy$, tuyệt đối không được quên nhân thêm $dx$ (hoặc $dt$) ở cuối biểu thức!",
        },
      },
      {
        heading: "2.10. Đạo hàm hàm tham số (cấp 1, cấp 2) và Đạo hàm hàm ẩn",
        content:
          "• <b>Hàm cho bởi phương trình tham số:</b> Cho $\\begin{cases} x = x(t), \\\\ y = y(t), \\end{cases}$ với $x'(t) \\neq 0$. Khi đó: $$y'_x = \\frac{dy}{dx} = \\frac{y'(t)}{x'(t)}.$$" +
          "<i>Ví dụ:</i> Với $x = a\\sin^3 t$, $y = a\\cos^3 t$, $\\frac{dy}{dx} = \\frac{-3a\\cos^2 t \\sin t}{3a\\sin^2 t \\cos t} = -\\cot t$.<br>" +
          "• <b>Đạo hàm cấp hai của hàm tham số:</b> $$y''_{xx} = \\frac{d}{dx}(y'_x) = \\frac{1}{x'_t}\\frac{d}{dt}\\left(\\frac{y'_t}{x'_t}\\right) = \\frac{y''_t x'_t - y'_t x''_t}{(x'_t)^3}.$$" +
          "• <b>Đạo hàm hàm ẩn:</b> Nếu $F(x, y) = 0$ xác định $y = y(x)$ và $F_y \\neq 0$, thì đạo hàm hai vế theo $x$ cho $F_x + F_y y' = 0$. Do đó: $$y' = -\\frac{F_x}{F_y}.$$" +
          "<i>Ví dụ:</i> Từ $x^2 + y^2 = R^2$, $2x + 2yy' = 0 \\Rightarrow y' = -\\frac{x}{y}$.",
        checkpoint: {
          question:
            "Ví dụ (đạo hàm cấp hai hàm tham số): Cho $x = t^2$, $y = t^3$ ($t \\neq 0$). Tính $y'_x$ và $y''_{xx}$.",
          rubric: [
            {
              step: "Bước 1 • Tính đạo hàm cấp một y'ₓ (0.5đ)",
              detail:
                "Ta có $x'_t = 2t$, $y'_t = 3t^2$. Do đó $y'_x = \\frac{y'_t}{x'_t} = \\frac{3t^2}{2t} = \\frac{3t}{2}$.",
            },
            {
              step: "Bước 2 • Tính đạo hàm cấp hai y''ₓₓ và nhớ chia thêm cho x'ₜ (0.5đ)",
              detail:
                "$$y''_{xx} = \\frac{1}{x'_t} \\frac{d}{dt}\\left(\\frac{3t}{2}\\right) = \\frac{1}{2t} \\cdot \\frac{3}{2} = \\frac{3}{4t}.$$",
            },
          ],
          trap: "Sai lầm kinh điển là tính $y''_{xx} = \\frac{y''_t}{x''_t}$ hoặc đạo hàm $y'_x$ theo $t$ xong quên chia cho $x'_t$ thêm một lần nữa!",
        },
      },
      {
        heading:
          "2.11. Đạo hàm cấp cao, Công thức Leibniz & Bảng đạo hàm cấp cao",
        content:
          "• <b>Định nghĩa đệ quy:</b> $f^{(n)}(x) = \\left(f^{(n-1)}(x)\\right)'$, $n \\ge 2$.<br>" +
          "• <b>Công thức Leibniz:</b> Nếu $f, g$ có đạo hàm đến cấp $n$ thì: $$(fg)^{(n)} = \\sum_{k=0}^n \\binom{n}{k} f^{(k)} g^{(n-k)}.$$" +
          "<i>Ví dụ:</i> Với $f(x) = e^x$, ta có $f^{(n)}(x) = e^x$ với mọi $n \\ge 1$.<br>" +
          "• <b>Một số công thức đạo hàm cấp cao cần nhớ:</b><br>" +
          "1) $\\frac{d^n}{dx^n}\\frac{1}{ax + b} = \\frac{(-1)^n n! a^n}{(ax + b)^{n+1}}$ <br>" +
          "2) $\\frac{d^n}{dx^n}\\ln(ax + b) = \\frac{(-1)^{n-1}(n-1)! a^n}{(ax + b)^n}$ <br>" +
          "3) $\\frac{d^n}{dx^n}\\sin(ax) = a^n \\sin\\left(ax + \\frac{n\\pi}{2}\\right)$ <br>" +
          "4) $\\frac{d^n}{dx^n}\\cos(ax) = a^n \\cos\\left(ax + \\frac{n\\pi}{2}\\right)$ <br>" +
          "5) $\\frac{d^n}{dx^n}e^{ax} = a^n e^{ax}$.",
        checkpoint: {
          question:
            "Ví dụ (công thức Leibniz): Tính đạo hàm cấp 10 của $y = x^2 \\sin x$.",
          rubric: [
            {
              step: "Bước 1 • Khai triển Leibniz và loại bỏ các đạo hàm bậc k ≥ 3 của x² (0.5đ)",
              detail:
                "$$y^{(10)} = \\sum_{k=0}^{10} \\binom{10}{k} (x^2)^{(k)} (\\sin x)^{(10-k)}.$$ Vì $(x^2)^{(k)} = 0$ với $k \\ge 3$, chỉ còn ba số hạng ứng với $k = 0, 1, 2$.",
            },
            {
              step: "Bước 2 • Tính ba số hạng và kết luận (0.5đ)",
              detail:
                "Với $(\\sin x)^{(10)} = -\\sin x$, $(\\sin x)^{(9)} = \\cos x$, $(\\sin x)^{(8)} = \\sin x$:<br>" +
                "$y^{(10)} = \\binom{10}{0} x^2(-\\sin x) + \\binom{10}{1}(2x)(\\cos x) + \\binom{10}{2}(2)(\\sin x) = -x^2\\sin x + 20x\\cos x + 90\\sin x$.",
            },
          ],
          trap: "Để tính $\\sin\\left(x + \\frac{m\\pi}{2}\\right)$ không bị nhầm dấu, hãy giảm $m$ theo bội của $4$ (chu kỳ $2\\pi$) trước khi quy đổi.",
        },
      },
      {
        heading: "2.12. Vi phân cấp cao & Ứng dụng vi phân để tính gần đúng",
        content:
          "• <b>Vi phân cấp cao:</b><br>" +
          "- Với $x$ là <b>biến độc lập</b>: $$d^n y = f^{(n)}(x)(dx)^n.$$ Đặc biệt, $d^2 y = f''(x)(dx)^2$.<br>" +
          "- Nếu $x = x(t)$ là <b>biến phụ thuộc</b> thì: $$d^2 y = f''(x)(dx)^2 + f'(x)\\,d^2 x.$$ Vì vậy vi phân cấp cao <b>không có tính bất biến</b> như vi phân cấp một.<br>" +
          "<i>Ví dụ:</i> Với $y = e^x$ và $x$ là biến độc lập, $d^3 y = e^x(dx)^3$.<br>" +
          "• <b>Ứng dụng vi phân để tính gần đúng:</b> Từ $\\Delta y = f'(x_0)\\Delta x + o(\\Delta x)$, khi $\\Delta x$ nhỏ, ta có: $$f(x_0 + \\Delta x) \\approx f(x_0) + f'(x_0)\\Delta x.$$",
        checkpoint: {
          question:
            "Ví dụ (tính gần đúng): Ước lượng giá trị $\\sqrt[3]{28}$ bằng vi phân.",
          rubric: [
            {
              step: "Bước 1 • Chọn hàm f(x), điểm gốc x₀ và số gia Δx (0.5đ)",
              detail:
                "Chọn $f(x) = \\sqrt[3]{x}$, $x_0 = 27$, $\\Delta x = 1$. Ta có $f(27) = 3$ và $f'(x) = \\frac{1}{3x^{2/3}} \\Rightarrow f'(27) = \\frac{1}{3 \\cdot 27^{2/3}} = \\frac{1}{27}$.",
            },
            {
              step: "Bước 2 • Áp dụng công thức xấp xỉ tuyến tính (0.5đ)",
              detail:
                "$$\\sqrt[3]{28} \\approx 3 + \\frac{1}{3 \\cdot 27^{2/3}} = 3 + \\frac{1}{27} \\approx 3.0370.$$",
            },
          ],
          trap: "Luôn chọn $x_0$ là điểm đẹp gần giá trị cần tính nhất sao cho $\\Delta x$ đủ nhỏ (có thể âm hoặc dương) để sai số nhỏ nhất.",
        },
      },
      {
        heading: "2.13. Cực trị địa phương và Định lý Fermat (Điều kiện cần)",
        content:
          "• <b>Cực trị địa phương:</b> $f$ đạt cực đại tại $x_0$ nếu tồn tại lân cận của $x_0$ sao cho $f(x) \\le f(x_0)$. Cực tiểu được định nghĩa tương tự.<br>" +
          "• <b>Định lý 3.1 (Fermat):</b> Nếu $f$ đạt cực trị tại điểm trong $x_0$ và có đạo hàm tại $x_0$ thì: $$f'(x_0) = 0.$$" +
          "• <b>Kết luận quan trọng:</b> Điều kiện $f'(x_0) = 0$ là <b>điều kiện cần</b> (khi đạo hàm tồn tại), nhưng <b>không phải điều kiện đủ</b>.",
        checkpoint: {
          question:
            "Ví dụ (điều kiện cần của cực trị): So sánh hành vi tại $x = 0$ của hai hàm $f(x) = x^2$ và $g(x) = x^3$ để minh họa định lý Fermat.",
          rubric: [
            {
              step: "Bước 1 • Xét f(x) = x² tại x = 0 (0.5đ)",
              detail:
                "Với $f(x) = x^2$, ta có $f'(0) = 0$ và $f(x) \\ge 0 = f(0)$ với mọi $x$, nên $x = 0$ là điểm cực tiểu.",
            },
            {
              step: "Bước 2 • Xét g(x) = x³ tại x = 0 (0.5đ)",
              detail:
                "Với $g(x) = x^3$, ta cũng có $g'(0) = 0$, nhưng $g(x) < 0$ khi $x < 0$ và $g(x) > 0$ khi $x > 0$, nên $x = 0$ <b>không phải</b> là điểm cực trị.",
            },
          ],
          trap: "Ngoài các điểm dừng $f'(x_0) = 0$, cực trị còn có thể xảy ra tại những điểm mà $f$ liên tục nhưng <b>không có đạo hàm</b> (ví dụ $y = |x|$ đạt cực tiểu tại $x = 0$).",
        },
      },
      {
        heading: "2.14. Các điều kiện đủ của cực trị (Định lý 3.2, 3.3, 3.4)",
        content:
          "• <b>Định lý 3.2 (Điều kiện đủ thứ nhất – dấu của đạo hàm):</b> Giả sử $f$ liên tục tại $x_0$ và có đạo hàm trong một lân cận thủng của $x_0$.<br>" +
          "- Nếu $f'(x) > 0$ khi $x < x_0$ và $f'(x) < 0$ khi $x > x_0$, thì $f$ đạt <b>cực đại</b> tại $x_0$.<br>" +
          "- Nếu $f'(x) < 0$ khi $x < x_0$ và $f'(x) > 0$ khi $x > x_0$, thì $f$ đạt <b>cực tiểu</b> tại $x_0$.<br>" +
          "<i>Ví dụ:</i> $f(x) = x^3 - 3x$ có $f'(x) = 3(x - 1)(x + 1)$. Dấu của $f'$ đổi $+ \\to -$ tại $x = -1$ (cực đại); đổi $- \\to +$ tại $x = 1$ (cực tiểu).<br>" +
          "• <b>Định lý 3.3 (Điều kiện đủ thứ hai – đạo hàm cấp hai):</b> Giả sử $f'(x_0) = 0$ và $f''(x_0)$ tồn tại.<br>" +
          "- Nếu $f''(x_0) > 0$ thì $f$ đạt <b>cực tiểu</b> tại $x_0$.<br>" +
          "- Nếu $f''(x_0) < 0$ thì $f$ đạt <b>cực đại</b> tại $x_0$.<br>" +
          "- Nếu $f''(x_0) = 0$ thì tiêu chuẩn này không kết luận được.<br>" +
          "<i>Ví dụ:</i> $f(x) = x^2 - 4x + 1$ có $f'(x) = 2x - 4 \\Rightarrow x_0 = 2$. Vì $f''(2) = 2 > 0$, hàm đạt cực tiểu tại $x = 2$.<br>" +
          "• <b>Định lý 3.4 (Tiêu chuẩn đạo hàm cấp cao):</b> Giả sử $f'(x_0) = f''(x_0) = \\dots = f^{(n-1)}(x_0) = 0$ và $f^{(n)}(x_0) \\neq 0$. Khi đó:<br>" +
          "- $n$ chẵn, $f^{(n)}(x_0) > 0$: $f$ đạt cực tiểu tại $x_0$;<br>" +
          "- $n$ chẵn, $f^{(n)}(x_0) < 0$: $f$ đạt cực đại tại $x_0$;<br>" +
          "- $n$ lẻ: $x_0$ không phải là điểm cực trị.",
        checkpoint: {
          question:
            "Ví dụ (tiêu chuẩn đạo hàm cấp cao): Xác định cực trị tại $x = 0$ của hàm số $f(x) = x^4$.",
          rubric: [
            {
              step: "Bước 1 • Tính các đạo hàm tại x = 0 cho tới cấp khác 0 đầu tiên (0.5đ)",
              detail:
                "Ta có $f'(0) = f''(0) = f'''(0) = 0$ và $f^{(4)}(0) = 24 \\neq 0$.",
            },
            {
              step: "Bước 2 • Áp dụng Định lý 3.4 (0.5đ)",
              detail:
                "Vì cấp $n = 4$ là số chẵn và $f^{(4)}(0) = 24 > 0$, nên $x = 0$ là điểm <b>cực tiểu</b> của $f$.",
            },
          ],
          trap: "Khi $f''(x_0) = 0$, tuyệt đối không kết luận \"$x_0$ không là cực trị\" — phải kiểm tra thêm dấu của $f'$ quanh $x_0$ hoặc dùng tiêu chuẩn đạo hàm cấp cao (Định lý 3.4)!",
        },
      },
      {
        heading: "2.15. Định lý Rolle và Ứng dụng đếm nghiệm",
        content:
          "• <b>Định lý 3.5 (Rolle):</b> Nếu $f$ liên tục trên $[a, b]$, khả vi trên $(a, b)$ và $$f(a) = f(b),$$ thì tồn tại ít nhất một $c \\in (a, b)$ sao cho: $$f'(c) = 0.$$" +
          "• <i>Ví dụ:</i> $f(x) = x^2 - 4x + 3$ trên $[1, 3]$ có $f(1) = f(3) = 0$. Theo Rolle, tồn tại $c \\in (1, 3)$ với $f'(c) = 0$; thực tế $c = 2$.",
        checkpoint: {
          question:
            "Ví dụ vận dụng Rolle: Cho $f(x) = x(x + 1)(x + 2)(x + 3)$. Chứng minh phương trình $f'(x) = 0$ có đúng ba nghiệm thực phân biệt.",
          rubric: [
            {
              step: "Bước 1 • Chỉ ra các nghiệm của f(x) và áp dụng Rolle trên từng đoạn (0.6đ)",
              detail:
                "Ta có $f(-3) = f(-2) = f(-1) = f(0) = 0$. Vì $f$ là đa thức (liên tục và khả vi mọi nơi), áp dụng định lý Rolle trên ba khoảng $(-3, -2)$, $(-2, -1)$, $(-1, 0)$, suy ra $f'(x) = 0$ có ít nhất ba nghiệm thực phân biệt.",
            },
            {
              step: "Bước 2 • Kết hợp bậc đa thức để kết luận có ĐÚNG ba nghiệm (0.4đ)",
              detail:
                "Vì $f$ là đa thức bậc $4$ nên $f'$ là đa thức bậc $3$, có tối đa $3$ nghiệm thực. Vậy phương trình $f'(x) = 0$ có đúng ba nghiệm thực phân biệt.",
            },
          ],
          trap: "Định lý Rolle luôn đòi hỏi đủ 3 điều kiện: liên tục trên đoạn đóng $[a, b]$, khả vi trên khoảng mở $(a, b)$, và $f(a) = f(b)$.",
        },
      },
      {
        heading: "2.16. Định lý Lagrange, Hệ quả đơn điệu & Định lý Cauchy",
        content:
          "• <b>Định lý 3.6 (Giá trị trung bình Lagrange):</b> Nếu $f$ liên tục trên $[a, b]$ và khả vi trên $(a, b)$ thì tồn tại $c \\in (a, b)$ sao cho: $$f'(c) = \\frac{f(b) - f(a)}{b - a}.$$" +
          "<i>Ví dụ:</i> Với $f(x) = x^2$ trên $[1, 3]$, $\\frac{f(3) - f(1)}{3 - 1} = 4 = f'(2)$, do đó điểm $c = 2$ thỏa kết luận của định lý.<br>" +
          "• <b>Hệ quả quan trọng của định lý Lagrange (trên một khoảng $I$):</b><br>" +
          "- Nếu $f'(x) > 0$ với mọi $x \\in I$ thì $f$ <b>đồng biến</b> trên $I$.<br>" +
          "- Nếu $f'(x) < 0$ với mọi $x \\in I$ thì $f$ <b>nghịch biến</b> trên $I$.<br>" +
          "- Nếu $f'(x) = 0$ với mọi $x \\in I$ thì $f$ là <b>hàm hằng</b> trên $I$.<br>" +
          "• <b>Định lý 3.7 (Giá trị trung bình Cauchy):</b> Nếu $f, g$ liên tục trên $[a, b]$, khả vi trên $(a, b)$ và $g'(x) \\neq 0$ trên $(a, b)$ thì tồn tại $c \\in (a, b)$ sao cho: $$\\frac{f(b) - f(a)}{g(b) - g(a)} = \\frac{f'(c)}{g'(c)}.$$ (Định lý Lagrange là trường hợp $g(x) = x$).<br>" +
          "<i>Ví dụ:</i> Với $f(x) = \\ln x, g(x) = x$ trên $[1, e]$, định lý Cauchy cho một $c \\in (1, e)$ sao cho $\\frac{1}{e - 1} = \\frac{1/c}{1}$, suy ra $c = e - 1$.",
        checkpoint: {
          question:
            "Ví dụ: Chứng minh $e^x \\ge 1 + x$ với mọi $x \\in \\mathbb{R}$ bằng định lý Lagrange.",
          rubric: [
            {
              step: "Bước 1 • Xét x = 0 và x > 0 (0.5đ)",
              detail:
                "Với $x = 0$: $e^0 = 1 = 1 + 0$ (đúng). Với $x > 0$: áp dụng định lý Lagrange cho $f(t) = e^t$ trên $[0, x]$, tồn tại $c \\in (0, x)$ sao cho $\\frac{e^x - 1}{x} = e^c > e^0 = 1 \\Rightarrow e^x > 1 + x$.",
            },
            {
              step: "Bước 2 • Xét x < 0 và kết luận (0.5đ)",
              detail:
                "Với $x < 0$: áp dụng Lagrange cho $f(t) = e^t$ trên $[x, 0]$, tồn tại $c \\in (x, 0)$ sao cho $\\frac{1 - e^x}{-x} = e^c < e^0 = 1$. Vì $-x > 0$ nên $1 - e^x < -x \\iff e^x > 1 + x$. Vậy $e^x \\ge 1 + x$ với mọi $x \\in \\mathbb{R}$.",
            },
          ],
          trap: 'Hệ quả "$f\'(x) = 0 \\Rightarrow f$ là hàm hằng" chỉ đúng trên một KHOẢNG $I$ liên tục; nếu miền xác định bị ngắt quãng (như $\\mathbb{R} \\setminus \\{0\\}$) thì hàm có thể nhận hai hằng số khác nhau trên hai nhánh!',
        },
      },
      {
        heading: "2.17. Quy tắc L’Hospital và Các dạng vô định khác",
        content:
          "• <b>Định lý 3.8 (Quy tắc L’Hospital):</b> Giả sử $f, g$ khả vi trong một lân cận thủng của $x_0$, $g'(x) \\neq 0$, và $$\\lim_{x \\to x_0} f(x) = \\lim_{x \\to x_0} g(x) = 0$$ hoặc cả hai cùng có độ lớn tiến tới $\\infty$. Nếu $\\lim_{x \\to x_0} \\frac{f'(x)}{g'(x)} = L$ tồn tại trong $\\overline{\\mathbb{R}}$, thì dưới các giả thiết chuẩn của định lý: $$\\lim_{x \\to x_0} \\frac{f(x)}{g(x)} = L.$$" +
          "<i>Ví dụ:</i> $\\lim_{x \\to 0} \\frac{\\sin x}{x} = \\lim_{x \\to 0} \\frac{\\cos x}{1} = 1$; $\\quad \\lim_{x \\to 0} \\frac{e^{2x} - 1}{x} = \\lim_{x \\to 0} 2e^{2x} = 2$; $\\quad \\lim_{x \\to 0} \\frac{x - \\sin x}{x^3} = \\lim_{x \\to 0} \\frac{1 - \\cos x}{3x^2} = \\lim_{x \\to 0} \\frac{\\sin x}{6x} = \\frac{1}{6}$.<br>" +
          "• <b>Các dạng vô định khác:</b> L’Hospital áp dụng trực tiếp cho $0/0$ và $\\infty/\\infty$. Các dạng $0 \\cdot \\infty, \\; \\infty - \\infty, \\; 0^0, \\; 1^\\infty, \\; \\infty^0$ cần biến đổi:<br>" +
          "- Với tích: chuyển về thương.<br>" +
          "- Với hiệu: quy đồng hoặc biến đổi đại số.<br>" +
          "- Với lũy thừa: đặt $y = u(x)^{v(x)}$, lấy $\\ln y = v(x)\\ln u(x)$.",
        checkpoint: {
          question:
            "Ví dụ (dạng 1^∞): Áp dụng biến đổi logarit và quy tắc L’Hospital tính $\\lim_{x \\to 0} (1 + x)^{1/x}$.",
          rubric: [
            {
              step: "Bước 1 • Logarit hóa biểu thức về dạng 0/0 (0.5đ)",
              detail:
                "Đặt $y = (1 + x)^{1/x} \\Rightarrow \\ln y = \\frac{\\ln(1 + x)}{x}$ (có dạng vô định $\\frac{0}{0}$ khi $x \\to 0$).",
            },
            {
              step: "Bước 2 • Áp dụng L'Hospital cho ln y rồi lũy thừa hóa kết quả (0.5đ)",
              detail:
                "$\\lim_{x \\to 0} \\ln y = \\lim_{x \\to 0} \\frac{\\frac{1}{1 + x}}{1} = 1$. Do đó $\\lim_{x \\to 0} (1 + x)^{1/x} = e^1 = e$.",
            },
          ],
          trap: "Điều quan trọng là CHỈ áp dụng L’Hospital sau khi kiểm tra đúng dạng vô định $0/0$ hoặc $\\infty/\\infty$ — nếu phân thức không phải dạng vô định mà vẫn lấy đạo hàm tử/mẫu thì kết quả sẽ sai hoàn toàn!",
        },
      },
      {
        heading:
          "2.18. Đa thức Taylor, Phần dư Lagrange, Peano & Công thức Maclaurin",
        content:
          "• <b>Đa thức Taylor:</b> Tại điểm $x_0$, đa thức Taylor bậc $n$ của $f$ là: $$P_n(x) = \\sum_{k=0}^n \\frac{f^{(k)}(x_0)}{k!}(x - x_0)^k.$$ Nó thỏa $P_n^{(k)}(x_0) = f^{(k)}(x_0)$, $k = 0, 1, \\dots, n$. Ta viết $f(x) = P_n(x) + R_n(x)$, trong đó $R_n$ là phần dư.<br>" +
          "<i>Ví dụ:</i> Với $f(x) = e^x, x_0 = 0$, đa thức Taylor bậc 2 là $P_2(x) = 1 + x + \\frac{x^2}{2}$.<br>" +
          "• <b>Taylor với phần dư Lagrange:</b> Nếu $f$ có đủ đạo hàm trên khoảng chứa $x_0$ và $x$, thì tồn tại $c$ nằm giữa $x_0$ và $x$ sao cho: $$f(x) = \\sum_{k=0}^n \\frac{f^{(k)}(x_0)}{k!}(x - x_0)^k + \\frac{f^{(n+1)}(c)}{(n + 1)!}(x - x_0)^{n+1}, \\quad R_n(x) = \\frac{f^{(n+1)}(c)}{(n + 1)!}(x - x_0)^{n+1}.$$" +
          "• <b>Taylor với phần dư Peano:</b> Nếu $f$ có các đạo hàm cần thiết tại $x_0$, thì khi $x \\to x_0$: $$f(x) = \\sum_{k=0}^n \\frac{f^{(k)}(x_0)}{k!}(x - x_0)^k + o\\left((x - x_0)^n\\right).$$ Dạng Peano đặc biệt hữu ích khi tính giới hạn và tìm tương đương vô cùng bé (ví dụ: $\\sin x = x - \\frac{x^3}{6} + o(x^3)$ khi $x \\to 0$).<br>" +
          "• <b>Công thức Maclaurin:</b> Taylor tại $x_0 = 0$ được gọi là công thức Maclaurin: $$f(x) = \\sum_{k=0}^n \\frac{f^{(k)}(0)}{k!}x^k + R_n(x),$$ với hai dạng phần dư thường dùng $R_n(x) = \\frac{f^{(n+1)}(c)}{(n+1)!}x^{n+1}$ hoặc $R_n(x) = o(x^n)$ ($x \\to 0$).",
        checkpoint: {
          question:
            "Ví dụ: Viết công thức Taylor bậc 1 với phần dư Lagrange quanh $x_0 = 0$ cho $e^x = 1 + x + R_1(x)$, và viết khai triển Maclaurin với phần dư Peano đến bậc 2 cho $\\ln(1 + x)$.",
          rubric: [
            {
              step: "Bước 1 • Phần dư Lagrange R₁(x) cho eˣ quanh 0 (0.5đ)",
              detail:
                "Với $f(x) = e^x$, $f''(c) = e^c$, nên $R_1(x) = \\frac{e^c}{2!}x^2 = \\frac{e^c}{2}x^2$, trong đó $c$ nằm giữa $0$ và $x$.",
            },
            {
              step: "Bước 2 • Khai triển Maclaurin của ln(1 + x) đến bậc 2 (0.5đ)",
              detail:
                "Với $g(x) = \\ln(1 + x)$: $g(0) = 0, g'(0) = 1, g''(0) = -1$. Do đó $\\ln(1 + x) = x - \\frac{x^2}{2} + o(x^2)$ khi $x \\to 0$.",
            },
          ],
          trap: "Nhớ chia đúng giai thừa $k!$ ở mẫu của từng số hạng Taylor; với phần dư Lagrange bậc $n$, đạo hàm lấy đến cấp $n + 1$ tại điểm trung gian $c$ và chia cho $(n + 1)!$.",
        },
      },
      {
        heading:
          "2.19. Các khai triển Maclaurin cơ bản (I & II) và Khai triển hàm hợp",
        content:
          "• <b>Khi $x \\to 0$ (Bảng I):</b><br>" +
          "$$e^x = 1 + x + \\frac{x^2}{2!} + \\dots + \\frac{x^n}{n!} + o(x^n),$$" +
          "$$\\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\dots, \\qquad \\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\dots,$$" +
          "$$\\ln(1 + x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\dots$$" +
          "• <b>Khi $x \\to 0$ (Bảng II):</b><br>" +
          "$$(1 + x)^\\alpha = 1 + \\alpha x + \\frac{\\alpha(\\alpha - 1)}{2!}x^2 + \\dots, \\qquad \\arctan x = x - \\frac{x^3}{3} + \\frac{x^5}{5} - \\dots,$$" +
          "$$\\frac{1}{1 + x} = 1 - x + x^2 - x^3 + \\dots, \\qquad \\sqrt{1 + x} = 1 + \\frac{x}{2} - \\frac{x^2}{8} + o(x^2).$$",
        checkpoint: {
          question:
            "Ví dụ (khai triển hàm hợp): Khai triển Maclaurin hàm số $e^{\\sin x}$ đến bậc $3$ khi $x \\to 0$.",
          rubric: [
            {
              step: "Bước 1 • Viết khai triển của u = sin x và eᵘ đến bậc 3 (0.5đ)",
              detail:
                "Khi $x \\to 0$: $\\sin x = x - \\frac{x^3}{6} + o(x^3)$, và $e^u = 1 + u + \\frac{u^2}{2} + \\frac{u^3}{6} + o(u^3)$.",
            },
            {
              step: "Bước 2 • Thế u = sin x và bỏ các bậc lớn hơn 3 vào o(x³) (0.5đ)",
              detail:
                "$e^{\\sin x} = 1 + \\left(x - \\frac{x^3}{6}\\right) + \\frac{1}{2}\\left(x - \\frac{x^3}{6}\\right)^2 + \\frac{1}{6}\\left(x - \\frac{x^3}{6}\\right)^3 + o(x^3) = 1 + x + \\frac{x^2}{2} + o(x^3)$ (hệ số của $x^3$ là $-\\frac{1}{6} + \\frac{1}{6} = 0$, triệt tiêu!).",
            },
          ],
          trap: "Trong khai triển $\\ln(1 + x)$ và $\\arctan x$, mẫu số là $1, 2, 3, \\dots$ và $1, 3, 5, \\dots$ (KHÔNG có giai thừa!), còn trong $e^x, \\sin x, \\cos x$ mẫu số CÓ giai thừa!",
        },
      },
      {
        heading:
          "2.20. Ứng dụng Taylor: Tính giới hạn, Tính gần đúng và Sai số",
        content:
          "• <b>Ứng dụng tính giới hạn:</b> Khai triển tử và mẫu theo Taylor–Maclaurin với phần dư Peano tới bậc thấp nhất không triệt tiêu để đọc trực tiếp tỉ số hệ số.<br>" +
          "• <b>Ứng dụng tính gần đúng và đánh giá sai số:</b> Nếu $|f^{(n+1)}(t)| \\le M$ trên đoạn nối $x_0$ và $x$, thì phần dư Lagrange thỏa: $$|R_n(x)| \\le \\frac{M}{(n + 1)!}|x - x_0|^{n+1}.$$" +
          "<i>Ví dụ:</i> Với $e = e^1$, $e \\approx 1 + 1 + \\frac{1}{2!} + \\dots + \\frac{1}{6!}$. Phần dư Lagrange cho phép kiểm soát sai số của phép xấp xỉ.",
        checkpoint: {
          question:
            "Ví dụ (ứng dụng Taylor tính giới hạn): Tính $L = \\lim_{x \\to 0} \\frac{e^x - e^{-x} - 2x}{x - \\sin x}$.",
          rubric: [
            {
              step: "Bước 1 • Khai triển Maclaurin tử và mẫu đến bậc 3 (0.5đ)",
              detail:
                "Ta có $e^x - e^{-x} - 2x = \\left(1 + x + \\frac{x^2}{2} + \\frac{x^3}{6}\\right) - \\left(1 - x + \\frac{x^2}{2} - \\frac{x^3}{6}\\right) - 2x + o(x^3) = \\frac{x^3}{3} + o(x^3)$, và $x - \\sin x = \\frac{x^3}{6} + o(x^3)$.",
            },
            {
              step: "Bước 2 • Rút gọn x³ và kết luận (0.5đ)",
              detail:
                "Do đó $L = \\lim_{x \\to 0} \\frac{\\frac{x^3}{3} + o(x^3)}{\\frac{x^3}{6} + o(x^3)} = \\frac{1/3}{1/6} = 2$.",
            },
          ],
          trap: "Luôn khai triển tử và mẫu đến cùng một bậc (hoặc bậc khác nhau sao cho phần dư không nuốt mất số hạng chính); phải giữ đầy đủ ký hiệu $o(x^n)$.",
        },
      },
      {
        heading: "2.21. Mục tiêu và Tóm tắt Chương II",
        content:
          "• <b>Mục tiêu chương:</b> Sau khi học xong chương này, sinh viên có thể:<br>" +
          "- hiểu định nghĩa, ý nghĩa và các quy tắc tính đạo hàm;<br>" +
          "- tính vi phân, đạo hàm cấp cao và vi phân cấp cao;<br>" +
          "- vận dụng các định lý Fermat, Rolle, Lagrange, Cauchy và các điều kiện đủ của cực trị;<br>" +
          "- sử dụng quy tắc L’Hospital để tính một số giới hạn vô định;<br>" +
          "- khai triển Taylor–Maclaurin và ứng dụng vào tính giới hạn, tính gần đúng.<br>" +
          "• <b>Tóm tắt chương:</b><br>" +
          "1) Đạo hàm mô tả tốc độ biến thiên và hệ số góc tiếp tuyến.<br>" +
          "2) Khả vi một biến tương đương với tồn tại đạo hàm hữu hạn; $dy = f'(x)\\,dx$.<br>" +
          "3) Các định lý Fermat–Rolle–Lagrange–Cauchy là nền tảng của nhiều kết quả giải tích.<br>" +
          "4) L’Hospital hỗ trợ xử lý các dạng $0/0$ và $\\infty/\\infty$.<br>" +
          "5) Taylor–Maclaurin thay hàm bởi đa thức gần điểm khai triển và cho phép kiểm soát sai số.",
        checkpoint: {
          question:
            "Hệ thống hóa nhanh: Giữa ba công cụ tính giới hạn (VCB tương đương, Quy tắc L’Hospital và Khai triển Maclaurin), khi nào nên ưu tiên dùng Khai triển Maclaurin?",
          rubric: [
            {
              step: "Bước 1 • So sánh với VCB tương đương (0.5đ)",
              detail:
                "Khi gặp tổng hoặc hiệu làm triệt tiêu bậc thấp nhất (ví dụ $x - \\sin x$, $e^x - e^{-x} - 2x$, $\\tan x - \\sin x$), VCB tương đương bậc 1 không thay trực tiếp được; lúc đó Khai triển Maclaurin cho ngay bậc cao hơn chính xác tuyệt đối.",
            },
            {
              step: "Bước 2 • So sánh với L'Hospital (0.5đ)",
              detail:
                "Khi biểu thức là tích/tổ hợp các hàm phức tạp mà đạo hàm nhiều lần theo L’Hospital rất dài, Maclaurin chỉ cần nhân các đa thức có sẵn sẽ nhanh và ít sai sót hơn.",
            },
          ],
          trap: "Nhớ rằng khai triển Maclaurin chỉ áp dụng trực tiếp khi biến tiến về $0$ (nếu $x \\to x_0 \\neq 0$, hãy đặt ẩn phụ $t = x - x_0 \\to 0$).",
        },
      },
    ],
    exercises: [
      {
        level: "Vừa",
        question:
          "Bài tập 1 – Đạo hàm: Tính đạo hàm các hàm số sau:<br>1) $y = (x^2 + 1)^4 e^{2x}$.<br>2) $y = \\ln\\sqrt{\\frac{x + 1}{x - 1}}$.<br>3) $y = (1 + x^2)^{\\sin x}$.<br>4) $y = \\arctan\\frac{2x}{1 - x^2}$ trên các khoảng thích hợp.<br>5) $y = x^{\\sqrt{x}}, \\; x > 0$.",
        solution: `
        <div class="rubric-box">
          <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.2đ)</span> Áp dụng quy tắc tích và hàm hợp:
          $$y' = 4(x^2 + 1)^3(2x)e^{2x} + (x^2 + 1)^4 (2e^{2x}) = 2(x^2 + 1)^3(x^2 + 4x + 1)e^{2x}.$$</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.2đ)</span> Điều kiện $|x| > 1$. Viết $y = \\frac{1}{2}\\left(\\ln|x + 1| - \\ln|x - 1|\\right)$:
          $$y' = \\frac{1}{2}\\left(\\frac{1}{x + 1} - \\frac{1}{x - 1}\\right) = \\frac{1}{1 - x^2}, \\qquad |x| > 1.$$</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.2đ)</span> Lấy logarit $\\ln y = \\sin x \\cdot \\ln(1 + x^2)$, đạo hàm hai vế theo $x$:
          $$y' = (1 + x^2)^{\\sin x}\\left[\\cos x \\ln(1 + x^2) + \\frac{2x \\sin x}{1 + x^2}\\right].$$</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.2đ)</span> Trên từng khoảng $(-\\infty, -1)$, $(-1, 1)$, $(1, +\\infty)$, đặt $u = \\frac{2x}{1 - x^2}$. Có $u' = \\frac{2(1 + x^2)}{(1 - x^2)^2}$ và $1 + u^2 = \\frac{(1 + x^2)^2}{(1 - x^2)^2}$, suy ra:
          $$y' = \\frac{u'}{1 + u^2} = \\frac{2}{1 + x^2}, \\qquad x \\neq \\pm 1.$$</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 5 (0.2đ)</span> Với $x > 0$, lấy $\\ln y = \\sqrt{x}\\ln x \\Rightarrow \\frac{y'}{y} = \\frac{1}{2\\sqrt{x}}\\ln x + \\sqrt{x}\\cdot\\frac{1}{x} = \\frac{\\ln x + 2}{2\\sqrt{x}}$. Vậy:
          $$y' = x^{\\sqrt{x}}\\frac{\\ln x + 2}{2\\sqrt{x}}.$$</div>
          <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Ở câu 2) và câu 4) cần chỉ rõ tập xác định ($|x| > 1$ và $x \\neq \\pm 1$); ở câu 3) và 5) bắt buộc dùng đạo hàm logarithm.</div>
        </div>`,
      },
      {
        level: "Vừa",
        question:
          "Bài tập 2 – Hàm ẩn và tham số:<br>1) Với $x^2 + xy + y^2 = 7$, tính $y'$ và $y''$.<br>2) Với $e^y + xy = 2$, tính $y'$ theo $x, y$.<br>3) Cho $x = t^2 + 1, \\; y = t^3 - 3t$. Tính $\\frac{dy}{dx}$ và $\\frac{d^2 y}{dx^2}$.<br>4) Cho $x = a(t - \\sin t), \\; y = a(1 - \\cos t)$. Tính $\\frac{dy}{dx}$.",
        solution: `
        <div class="rubric-box">
          <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.3đ)</span> Đạo hàm theo $x$: $2x + y + xy' + 2yy' = 0 \\Rightarrow y' = -\\frac{2x + y}{x + 2y}$ ($x + 2y \\neq 0$).<br>
          Đạo hàm tiếp theo $x$: $y'' = -\\frac{(2 + y')(x + 2y) - (2x + y)(1 + 2y')}{(x + 2y)^2} = \\frac{3(xy' - y)}{(x + 2y)^2}$. Thế $y'$ và dùng $x^2 + xy + y^2 = 7$ được $xy' - y = \\frac{-2(x^2 + xy + y^2)}{x + 2y} = -\\frac{14}{x + 2y}$, suy ra $y'' = -\\frac{42}{(x + 2y)^3}$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.2đ)</span> Đạo hàm hai vế theo $x$: $e^y y' + y + xy' = 0 \\iff (e^y + x)y' = -y \\Rightarrow y' = -\\frac{y}{e^y + x}$ ($e^y + x \\neq 0$).</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.3đ)</span> Với $t \\neq 0$: $x'_t = 2t$, $y'_t = 3t^2 - 3 \\Rightarrow \\frac{dy}{dx} = \\frac{3t^2 - 3}{2t} = \\frac{3}{2}\\left(t - \\frac{1}{t}\\right)$.<br>
          Tiếp tục: $\\frac{d^2 y}{dx^2} = \\frac{1}{x'_t}\\frac{d}{dt}\\left(\\frac{dy}{dx}\\right) = \\frac{1}{2t} \\cdot \\frac{3}{2}\\left(1 + \\frac{1}{t^2}\\right) = \\frac{3(t^2 + 1)}{4t^3}$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.2đ)</span> Với $a \\neq 0$ và $t \\neq 2k\\pi$: $x'_t = a(1 - \\cos t)$, $y'_t = a\\sin t$. Suy ra:
          $$\\frac{dy}{dx} = \\frac{a\\sin t}{a(1 - \\cos t)} = \\frac{2\\sin\\frac{t}{2}\\cos\\frac{t}{2}}{2\\sin^2\\frac{t}{2}} = \\cot\\frac{t}{2}.$$</div>
          <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Khi tính $y''$ của hàm ẩn và $\\frac{d^2 y}{dx^2}$ của hàm tham số, phải nhớ $y$ phụ thuộc $x$ và công thức tham số phải chia cho $x'_t$ thêm lần nữa.</div>
        </div>`,
      },
      {
        level: "Khó",
        question:
          "Bài tập 3 – Đạo hàm cấp cao và vi phân:<br>1) Tính $y^{(n)}$ với $y = e^{2x} \\cos 3x$.<br>2) Tính $y^{(8)}$ với $y = x^3 \\sin x$.<br>3) Tìm $d^5 y$ với $y = \\ln(1 + x)$.<br>4) Dùng vi phân để tính gần đúng $\\sqrt{101}$.<br>5) Dùng vi phân để tính gần đúng $\\sin 31^\\circ$.",
        solution: `
        <div class="rubric-box">
          <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.25đ)</span> Tính $y' = e^{2x}(2\\cos 3x - 3\\sin 3x) = \\sqrt{13}\\,e^{2x}\\cos(3x + \\varphi)$ với $\\varphi = \\arctan\\frac{3}{2}$ ($\\cos\\varphi = \\frac{2}{\\sqrt{13}}, \\; \\sin\\varphi = \\frac{3}{\\sqrt{13}}$). Bằng quy nạp (hoặc công thức Leibniz / số phức):
          $$y^{(n)} = (\\sqrt{13})^n e^{2x} \\cos\\left(3x + n\\arctan\\frac{3}{2}\\right).$$</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.25đ)</span> Dùng công thức Leibniz $y^{(8)} = \\sum_{k=0}^3 \\binom{8}{k} (x^3)^{(k)}(\\sin x)^{(8-k)}$ (vì $(x^3)^{(k)} = 0$ khi $k \\ge 4$):
          $$y^{(8)} = x^3 \\sin x + 8(3x^2)(-\\cos x) + 28(6x)(-\\sin x) + 56(6)(\\cos x) = (x^3 - 168x)\\sin x + (336 - 24x^2)\\cos x.$$</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.15đ)</span> Áp dụng $\\frac{d^n}{dx^n}\\ln(1 + x) = \\frac{(-1)^{n-1}(n-1)!}{(1+x)^n}$ với $n = 5$ ($x > -1$): $y^{(5)} = \\frac{4!}{(1+x)^5} = \\frac{24}{(1+x)^5}$, nên $d^5 y = \\frac{24}{(1+x)^5}(dx)^5$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.15đ)</span> Đặt $f(x) = \\sqrt{x}$, $x_0 = 100$, $\\Delta x = 1$. Ta có $f(100) = 10$, $f'(100) = \\frac{1}{2\\sqrt{100}} = 0.05 \\Rightarrow \\sqrt{101} \\approx 10 + 0.05(1) = 10.05$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 5 (0.2đ)</span> Đổi sang radian: $30^\\circ = \\frac{\\pi}{6}$, $1^\\circ = \\frac{\\pi}{180}$. Chọn $f(x) = \\sin x$, $x_0 = \\frac{\\pi}{6}$, $\\Delta x = \\frac{\\pi}{180}$:
          $$\\sin 31^\\circ \\approx \\sin\\frac{\\pi}{6} + \\cos\\frac{\\pi}{6} \\cdot \\frac{\\pi}{180} = 0.5 + \\frac{\\sqrt{3}\\pi}{360} \\approx 0.5151.$$</div>
          <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Ở câu 5) bắt buộc phải đổi $1^\\circ$ ra radian $\\frac{\\pi}{180}$ trước khi áp dụng công thức vi phân; nếu giữ nguyên số $1$ theo độ sẽ sai hoàn toàn!</div>
        </div>`,
      },
      {
        level: "Vừa",
        question:
          "Bài tập 4 – Cực trị và định lý giá trị trung bình:<br>1) Tìm và phân loại cực trị của $f(x) = x^3 - 3x$ bằng dấu của $f'$.<br>2) Dùng đạo hàm cấp hai xác định cực trị của $f(x) = x^4 - 4x^2$.<br>3) Kiểm tra điều kiện và tìm các điểm Rolle của $f(x) = x^2 - 4x + 3$ trên $[1, 3]$.<br>4) Dùng định lý Lagrange chứng minh $|\\sin x - \\sin y| \\le |x - y|$.<br>5) Chứng minh $\\ln x \\le x - 1$ với mọi $x > 0$.<br>6) Chứng minh phương trình $x^3 + 3x - 1 = 0$ có nhiều nhất một nghiệm thực.",
        solution: `
        <div class="rubric-box">
          <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.15đ)</span> $f'(x) = 3(x - 1)(x + 1) = 0 \\iff x = \\pm 1$. Dấu $f'$ đổi $+ \\to -$ qua $x = -1$ (cực đại, $f(-1) = 2$) và đổi $- \\to +$ qua $x = 1$ (cực tiểu, $f(1) = -2$).</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.15đ)</span> $f'(x) = 4x(x^2 - 2) = 0 \\iff x = 0, \\; x = \\pm\\sqrt{2}$; $f''(x) = 12x^2 - 8$. Vì $f''(0) = -8 < 0$ nên $x = 0$ là cực đại ($f(0)=0$); $f''(\\pm\\sqrt{2}) = 16 > 0$ nên $x = \\pm\\sqrt{2}$ là các điểm cực tiểu ($f(\\pm\\sqrt{2}) = -4$).</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.15đ)</span> $f$ là đa thức nên liên tục trên $[1, 3]$ và khả vi trên $(1, 3)$; đồng thời $f(1) = f(3) = 0$. Thỏa cả 3 điều kiện Rolle. Giải $f'(c) = 2c - 4 = 0 \\iff c = 2 \\in (1, 3)$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.2đ)</span> Nếu $x = y$, bất đẳng thức hiển nhiên đúng. Nếu $x \\neq y$, áp dụng định lý Lagrange cho $f(t) = \\sin t$ trên đoạn nối $x, y$: tồn tại $c$ ở giữa sao cho $\\sin x - \\sin y = (\\cos c)(x - y)$. Lấy trị tuyệt đối: $|\\sin x - \\sin y| = |\\cos c||x - y| \\le |x - y|$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 5 (0.2đ)</span> Với $x = 1$: $\\ln 1 = 0 = 1 - 1$. Với $x > 1$, áp dụng Lagrange cho $\\ln t$ trên $[1, x]$: $\\frac{\\ln x - 0}{x - 1} = \\frac{1}{c} < 1 \\Rightarrow \\ln x < x - 1$. Với $0 < x < 1$, áp dụng Lagrange trên $[x, 1]$: $\\frac{0 - \\ln x}{1 - x} = \\frac{1}{c} > 1 \\Rightarrow -\\ln x > 1 - x \\iff \\ln x < x - 1$. Vậy $\\ln x \\le x - 1, \\; \\forall x > 0$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 6 (0.15đ)</span> Giả sử phản chứng phương trình có hai nghiệm phân biệt $x_1 < x_2$. Đặt $f(x) = x^3 + 3x - 1$: $f$ liên tục trên $[x_1, x_2]$, khả vi trên $(x_1, x_2)$ và $f(x_1) = f(x_2) = 0$. Theo Rolle, tồn tại $c \\in (x_1, x_2)$ sao cho $f'(c) = 0$. Nhưng $f'(x) = 3x^2 + 3 \\ge 3 > 0, \\; \\forall x \\in \\mathbb{R}$ (vô lý). Vậy phương trình có nhiều nhất một nghiệm thực.</div>
          <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Ở câu 4) và 5) cần xét riêng trường hợp $x = y$ (hoặc $x = 1$) trước khi dùng Lagrange trên đoạn đóng $[a, b]$.</div>
        </div>`,
      },
      {
        level: "Vừa",
        question:
          "Bài tập 5 – L’Hospital: Tính các giới hạn:<br>1) $\\lim_{x \\to 0} \\frac{\\ln(1 + x) - x}{x^2}$.<br>2) $\\lim_{x \\to 0} \\frac{\\tan x - x}{x^3}$.<br>3) $\\lim_{x \\to \\infty} x\\left(e^{1/x} - 1\\right)$.<br>4) $\\lim_{x \\to 0^+} x^x$.<br>5) $\\lim_{x \\to \\infty} \\left(1 + \\frac{2}{x}\\right)^x$.",
        solution: `
        <div class="rubric-box">
          <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.2đ)</span> Dạng $0/0$: $\\lim_{x \\to 0} \\frac{\\frac{1}{1+x} - 1}{2x} = \\lim_{x \\to 0} \\frac{-x}{2x(1+x)} = \\lim_{x \\to 0} \\frac{-1}{2(1+x)} = -\\frac{1}{2}$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.2đ)</span> Dạng $0/0$: $\\lim_{x \\to 0} \\frac{\\frac{1}{\\cos^2 x} - 1}{3x^2} = \\lim_{x \\to 0} \\frac{\\tan^2 x}{3x^2} = \\frac{1}{3}$ (hoặc L’Hospital lần 2: $\\lim_{x \\to 0} \\frac{2\\sin x / \\cos^3 x}{6x} = \\frac{1}{3}$).</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.2đ)</span> Dạng $\\infty \\cdot 0$: chuyển về thương $\\frac{0}{0}$ rồi dùng L’Hospital:
          $$\\lim_{x \\to \\infty} \\frac{e^{1/x} - 1}{1/x} = \\lim_{x \\to \\infty} \\frac{e^{1/x}(-1/x^2)}{-1/x^2} = \\lim_{x \\to \\infty} e^{1/x} = 1.$$</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.2đ)</span> Dạng $0^0$: đặt $y = x^x \\Rightarrow \\ln y = \\frac{\\ln x}{1/x}$ (dạng $\\frac{-\\infty}{+\\infty}$ khi $x \\to 0^+$). Dùng L’Hospital: $\\lim_{x \\to 0^+} \\ln y = \\lim_{x \\to 0^+} \\frac{1/x}{-1/x^2} = \\lim_{x \\to 0^+} (-x) = 0 \\Rightarrow \\lim_{x \\to 0^+} x^x = e^0 = 1$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 5 (0.2đ)</span> Dạng $1^\\infty$: đặt $y = \\left(1 + \\frac{2}{x}\\right)^x \\Rightarrow \\ln y = \\frac{\\ln(1 + 2/x)}{1/x}$ (dạng $0/0$). Dùng L’Hospital: $\\lim_{x \\to \\infty} \\ln y = \\lim_{x \\to \\infty} \\frac{\\frac{-2/x^2}{1 + 2/x}}{-1/x^2} = \\lim_{x \\to \\infty} \\frac{2}{1 + 2/x} = 2 \\Rightarrow$ giới hạn bằng $e^2$.</div>
          <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Với các dạng mũ $0^0, 1^\\infty$ sau khi tìm ra $\\lim \\ln y = L$, nhớ trả kết quả cuối cùng là $e^L$ chứ không phải $L$.</div>
        </div>`,
      },
      {
        level: "Khó",
        question:
          "Bài tập 6 – Taylor–Maclaurin:<br>1) Khai triển $\\ln(1 + x)$ đến bậc $5$ tại $0$.<br>2) Khai triển $\\sqrt{1 + x}$ đến bậc $4$ tại $0$.<br>3) Khai triển $e^x \\cos x$ đến bậc $4$ tại $0$.<br>4) Dùng Maclaurin tính $\\lim_{x \\to 0} \\frac{\\sin x - x + x^3/6}{x^5}$.<br>5) Tính gần đúng $\\sqrt{e}$ với sai số không vượt quá $10^{-4}$ bằng Taylor.",
        solution: `
        <div class="rubric-box">
          <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.15đ)</span> $\\ln(1 + x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\frac{x^4}{4} + \\frac{x^5}{5} + o(x^5)$ ($x \\to 0$).</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.2đ)</span> Áp dụng $(1 + x)^\\alpha$ với $\\alpha = \\frac{1}{2}$:
          $$\\sqrt{1 + x} = 1 + \\frac{x}{2} - \\frac{x^2}{8} + \\frac{x^3}{16} - \\frac{5x^4}{128} + o(x^4).$$</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.2đ)</span> Nhân khai triển $e^x = 1 + x + \\frac{x^2}{2} + \\frac{x^3}{6} + \\frac{x^4}{24} + o(x^4)$ và $\\cos x = 1 - \\frac{x^2}{2} + \\frac{x^4}{24} + o(x^4)$, giữ đến bậc $4$:
          $$e^x \\cos x = 1 + x - \\frac{x^3}{3} - \\frac{x^4}{6} + o(x^4).$$</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.2đ)</span> Khai triển $\\sin x = x - \\frac{x^3}{6} + \\frac{x^5}{120} + o(x^5) \\Rightarrow \\lim_{x \\to 0} \\frac{\\frac{x^5}{120} + o(x^5)}{x^5} = \\frac{1}{120}$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 5 (0.25đ)</span> Ta có $\\sqrt{e} = e^{1/2}$. Khai triển Maclaurin $e^x$ đến bậc $n$ tại $x = \\frac{1}{2}$ với phần dư Lagrange ($0 < c < \\frac{1}{2}$, $e^c < e^{1/2} < 2$):
          $$\\left|R_n\\left(\\frac{1}{2}\\right)\\right| = \\frac{e^c}{(n+1)!}\\left(\\frac{1}{2}\\right)^{n+1} < \\frac{2}{(n+1)! \\cdot 2^{n+1}} = \\frac{1}{(n+1)! \\cdot 2^n}.$$
          Chọn $n = 5$ cho $\\frac{1}{6! \\cdot 2^5} = \\frac{1}{23040} \\approx 4.34 \\times 10^{-5} < 10^{-4}$ (đạt yêu cầu). Tính xấp xỉ:
          $$\\sqrt{e} \\approx 1 + \\frac{1}{2} + \\frac{1}{2! \\cdot 4} + \\frac{1}{3! \\cdot 8} + \\frac{1}{4! \\cdot 16} + \\frac{1}{5! \\cdot 32} = \\frac{6331}{3840} \\approx 1.6487.$$</div>
          <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Ở câu 5) phải chứng minh rõ điều kiện chọn $n = 5$ thông qua bất đẳng thức đánh giá phần dư Lagrange $|R_n(1/2)| \\le 10^{-4}$, không được chọn mò số hạng!</div>
        </div>`,
      },
    ],
    quiz: [
      {
        question: "Cho $y = x^x$ ($x > 0$). Đạo hàm $y'$ của hàm số này bằng:",
        options: [
          "$x^x(1 + \\ln x)$",
          "$x \\cdot x^{x-1}$",
          "$x^x \\ln x$",
          "$x^{x-1}(1 + \\ln x)$",
        ],
        answer: 0,
        explanation:
          "Lấy $\\ln y = x\\ln x$ rồi đạo hàm hai vế theo $x$: $\\frac{y'}{y} = \\ln x + 1 \\Rightarrow y' = x^x(1 + \\ln x)$.",
      },
      {
        question: "Khẳng định nào sau đây ĐÚNG về tính bất biến của vi phân?",
        options: [
          "Vi phân cấp một và cấp cao đều có tính bất biến",
          "Chỉ vi phân cấp một có tính bất biến, vi phân cấp cao không còn tính bất biến",
          "Vi phân cấp một không có tính bất biến khi $x = x(t)$ là biến phụ thuộc",
          "Vi phân cấp hai luôn bằng $f''(x)(dx)^2$ với mọi $x$",
        ],
        answer: 1,
        explanation:
          "Dạng $dy = f'(x)\\,dx$ đúng dù $x$ độc lập hay phụ thuộc, nhưng $d^2 y = f''(x)(dx)^2 + f'(x)\\,d^2x$ nên vi phân cấp cao không còn tính bất biến.",
      },
      {
        question:
          "Cho hàm tham số $x = t^2$, $y = t^3$ ($t \\neq 0$). Đạo hàm cấp hai $y''_{xx}$ bằng:",
        options: [
          "$\\frac{3}{4t}$",
          "$\\frac{3t}{2}$",
          "$3t$",
          "$\\frac{3}{2}$",
        ],
        answer: 0,
        explanation:
          "$y'_x = \\frac{3t^2}{2t} = \\frac{3t}{2}$, suy ra $y''_{xx} = \\frac{1}{x'_t}\\left(\\frac{3t}{2}\\right)'_t = \\frac{1}{2t}\\cdot\\frac{3}{2} = \\frac{3}{4t}$.",
      },
      {
        question:
          "Áp dụng công thức Leibniz cho $y = x^2 \\sin x$, đạo hàm cấp 10 $y^{(10)}$ bằng:",
        options: [
          "$-x^2\\sin x + 20x\\cos x + 90\\sin x$",
          "$x^2\\sin x + 20x\\cos x - 90\\sin x$",
          "$-x^2\\sin x - 20x\\cos x + 90\\sin x$",
          "$x^2\\cos x + 20x\\sin x$",
        ],
        answer: 0,
        explanation:
          "Khai triển Leibniz giữ 3 số hạng đầu: $\\binom{10}{0}x^2(-\\sin x) + \\binom{10}{1}(2x)\\cos x + \\binom{10}{2}(2)\\sin x = -x^2\\sin x + 20x\\cos x + 90\\sin x$.",
      },
      {
        question:
          "Theo Định lý 3.4 (tiêu chuẩn đạo hàm cấp cao), nếu $f'(x_0) = f''(x_0) = f'''(x_0) = 0$ và $f^{(4)}(x_0) = 24 > 0$ thì:",
        options: [
          "$x_0$ không phải điểm cực trị",
          "$f$ đạt cực đại tại $x_0$",
          "$f$ đạt cực tiểu tại $x_0$",
          "Chưa thể kết luận về cực trị tại $x_0$",
        ],
        answer: 2,
        explanation:
          "Cấp đạo hàm khác 0 đầu tiên là $n = 4$ (chẵn) và $f^{(4)}(x_0) > 0$ nên $f$ đạt cực tiểu tại $x_0$.",
      },
      {
        question:
          "Cho $f(x) = x^2 - 4x + 3$ trên $[1, 3]$. Điểm $c \\in (1, 3)$ thỏa mãn định lý Rolle là:",
        options: ["$c = 1$", "$c = 2$", "$c = 3$", "$c = \\frac{3}{2}$"],
        answer: 1,
        explanation:
          "$f(1) = f(3) = 0$ và $f'(c) = 2c - 4 = 0 \\iff c = 2 \\in (1, 3)$.",
      },
      {
        question:
          "Giới hạn $\\lim_{x \\to 0} \\frac{e^x - e^{-x} - 2x}{x - \\sin x}$ bằng:",
        options: ["$0$", "$1$", "$2$", "$6$"],
        answer: 2,
        explanation:
          "Khai triển Maclaurin: $e^x - e^{-x} - 2x = \\frac{x^3}{3} + o(x^3)$ và $x - \\sin x = \\frac{x^3}{6} + o(x^3)$, nên tỉ số tiến về $\\frac{1/3}{1/6} = 2$.",
      },
      {
        question:
          "Trong khai triển Maclaurin của $e^{\\sin x}$ đến bậc $3$ khi $x \\to 0$, hệ số của $x^3$ bằng:",
        options: ["$\\frac{1}{6}$", "$-\\frac{1}{6}$", "$0$", "$\\frac{1}{3}$"],
        answer: 2,
        explanation:
          "$e^{\\sin x} = 1 + x + \\frac{x^2}{2} + o(x^3)$, hệ số của $x^3$ bằng $-\\frac{1}{6} + \\frac{1}{6} = 0$ (triệt tiêu).",
      },
    ],
  },

  // =========================================================================
  // CHƯƠNG 3: GIẢI TÍCH 1 - NGUYÊN HÀM VÀ TÍCH PHÂN XÁC ĐỊNH
  // =========================================================================
  {
    id: "gt-c3",
    code: "GIẢI TÍCH 1 • CHƯƠNG 3",
    subject: "Giải tích 1",
    level: "Trung bình",
    title: "Phép tính tích phân hàm một biến",
    summary:
      "Nguyên hàm & tích phân bất định; Phương pháp đổi biến, đổi biến lượng giác & tích phân từng phần (LIATE); Tích phân hàm lượng giác & hàm hữu tỷ; Tích phân xác định (Riemann, Newton–Leibniz, tính đối xứng, giá trị trung bình); Ứng dụng diện tích, thể tích (đĩa, vỏ trụ), độ dài cung, diện tích mặt & kinh tế; Tích phân suy rộng loại 1, loại 2 và các tiêu chuẩn hội tụ.",
    previewFormula:
      "$$\\int_a^b f(x)\\,dx = F(b) - F(a), \\quad \\int u\\,dv = uv - \\int v\\,du, \\quad \\int_a^{+\\infty} f(x)\\,dx = \\lim_{b \\to +\\infty} \\int_a^b f(x)\\,dx$$",
    bannerGradient: "linear-gradient(135deg, #0284c7 0%, #2563eb 100%)",
    theory: [
      {
        heading: "3.1. Nguyên hàm và Tích phân bất định",
        content:
          "• <b>Định nghĩa nguyên hàm:</b> Cho $f$ xác định trên khoảng $I$. Hàm $F$ được gọi là một <b>nguyên hàm</b> của $f$ trên $I$ nếu: $$F'(x) = f(x), \\qquad \\forall x \\in I.$$" +
          "- Nếu $F$ là một nguyên hàm của $f$ thì $F + C$ cũng là một nguyên hàm của $f$.<br>" +
          "- Hai nguyên hàm của cùng một hàm trên một khoảng chỉ khác nhau một hằng số.<br>" +
          "<i>Ví dụ:</i> $(\\sin x)' = \\cos x \\Rightarrow \\sin x$ là một nguyên hàm của $\\cos x$; $\\quad (x^3)' = 3x^2 \\Rightarrow x^3$ là một nguyên hàm của $3x^2$.<br>" +
          "• <b>Định nghĩa tích phân bất định:</b> Tập hợp tất cả các nguyên hàm của $f$ trên $I$ được gọi là <b>tích phân bất định</b> của $f$: $$\\int f(x)\\,dx = F(x) + C, \\qquad C \\in \\mathbb{R},$$ trong đó $F'(x) = f(x)$.",
        checkpoint: {
          question:
            "Ví dụ (Slide 4): Tính $\\int 3x^2\\,dx$ và $\\int \\cos x\\,dx$, đồng thời nêu cách kiểm tra kết quả.",
          rubric: [
            {
              step: "Bước 1 • Tìm tích phân bất định (0.5đ)",
              detail:
                "$$\\int 3x^2\\,dx = x^3 + C, \\qquad \\int \\cos x\\,dx = \\sin x + C \\quad (C \\in \\mathbb{R}).$$",
            },
            {
              step: "Bước 2 • Kiểm tra kết quả (0.5đ)",
              detail:
                "Lấy đạo hàm biểu thức tìm được: $(x^3 + C)' = 3x^2$ và $(\\sin x + C)' = \\cos x$. Thu lại đúng hàm dưới dấu tích phân nên kết quả đúng.",
            },
          ],
          trap: "Kết quả tích phân bất định là một HỌ các hàm số, bắt buộc phải cộng hằng số tùy ý $+ C$ ($C \\in \\mathbb{R}$).",
        },
      },
      {
        heading: "3.2. Tính chất và Bảng nguyên hàm cơ bản (1 & 2)",
        content:
          "• <b>Tính chất của tích phân bất định:</b> Với $\\alpha, \\beta \\in \\mathbb{R}$ và các nguyên hàm tồn tại: $$\\int [\\alpha f(x) + \\beta g(x)]\\,dx = \\alpha \\int f(x)\\,dx + \\beta \\int g(x)\\,dx, \\qquad \\int F'(x)\\,dx = F(x) + C.$$ Nếu $F' = f$ và $a \\neq 0$ thì: $$\\int f(ax + b)\\,dx = \\frac{1}{a}F(ax + b) + C.$$" +
          "<i>Ví dụ:</i> $\\int (3x^2 - 4\\sin x + 2e^x)\\,dx = x^3 + 4\\cos x + 2e^x + C$.<br>" +
          "• <b>Bảng nguyên hàm cơ bản (1):</b><br>" +
          "1) $\\int x^\\alpha\\,dx = \\frac{x^{\\alpha + 1}}{\\alpha + 1} + C$ ($\\alpha \\neq -1$), $\\quad \\int \\frac{dx}{x} = \\ln|x| + C$.<br>" +
          "2) $\\int e^x\\,dx = e^x + C$, $\\quad \\int a^x\\,dx = \\frac{a^x}{\\ln a} + C$ ($a > 0, \\; a \\neq 1$).<br>" +
          "3) $\\int \\sin x\\,dx = -\\cos x + C$, $\\quad \\int \\cos x\\,dx = \\sin x + C$.<br>" +
          "• <b>Bảng nguyên hàm cơ bản (2):</b><br>" +
          "4) $\\int \\frac{dx}{\\cos^2 x} = \\tan x + C$, $\\quad \\int \\frac{dx}{\\sin^2 x} = -\\cot x + C$.<br>" +
          "5) $\\int \\frac{dx}{1 + x^2} = \\arctan x + C$, $\\quad \\int \\frac{dx}{\\sqrt{1 - x^2}} = \\arcsin x + C$.<br>" +
          "6) $\\int \\frac{dx}{x^2 + a^2} = \\frac{1}{a}\\arctan\\frac{x}{a} + C$ ($a > 0$), $\\quad \\int \\frac{dx}{\\sqrt{a^2 - x^2}} = \\arcsin\\frac{x}{a} + C$ ($a > 0$).",
        checkpoint: {
          question:
            "Ví dụ (Slide 7): Tính nguyên hàm $\\int \\left(\\frac{2}{1 + x^2} + \\frac{3}{\\sqrt{1 - x^2}}\\right)dx$.",
          rubric: [
            {
              step: "Bước 1 • Tách tuyến tính theo tính chất tích phân (0.5đ)",
              detail:
                "$$\\int \\left(\\frac{2}{1 + x^2} + \\frac{3}{\\sqrt{1 - x^2}}\\right)dx = 2\\int \\frac{dx}{1 + x^2} + 3\\int \\frac{dx}{\\sqrt{1 - x^2}}.$$",
            },
            {
              step: "Bước 2 • Áp dụng bảng nguyên hàm cơ bản (0.5đ)",
              detail: "$$= 2\\arctan x + 3\\arcsin x + C.$$",
            },
          ],
          trap: "Nhớ phân biệt hai công thức có tham số $a > 0$: $\\int \\frac{dx}{x^2 + a^2}$ CÓ hệ số $\\frac{1}{a}$ ở ngoài ($\\frac{1}{a}\\arctan\\frac{x}{a}$), còn $\\int \\frac{dx}{\\sqrt{a^2 - x^2}}$ KHÔNG có $\\frac{1}{a}$ ở ngoài ($\\arcsin\\frac{x}{a}$).",
        },
      },
      {
        heading: "3.3. Biến đổi sơ cấp trước khi chọn phương pháp",
        content:
          "• Trước khi đổi biến hay từng phần, nên kiểm tra khả năng:<br>" +
          "- khai triển đa thức;<br>" +
          "- tách phân thức;<br>" +
          "- dùng hằng đẳng thức lượng giác;<br>" +
          "- thêm bớt để xuất hiện đạo hàm của mẫu hoặc của biểu thức trong hàm hợp.<br>" +
          "• <b>Ví dụ 1:</b> $$\\int \\frac{1 + x^2}{x^2}\\,dx = \\int (1 + x^{-2})\\,dx = x - \\frac{1}{x} + C.$$",
        checkpoint: {
          question:
            "Ví dụ 2 (Slide 8): Tính $\\int \\sin^2 x\\,dx$ bằng biến đổi sơ cấp (hằng đẳng thức lượng giác).",
          rubric: [
            {
              step: "Bước 1 • Dùng công thức hạ bậc sin² x = (1 − cos 2x)/2 (0.5đ)",
              detail:
                "$$\\int \\sin^2 x\\,dx = \\frac{1}{2}\\int (1 - \\cos 2x)\\,dx.$$",
            },
            {
              step: "Bước 2 • Lấy nguyên hàm từng số hạng (0.5đ)",
              detail:
                "$$= \\frac{1}{2}\\left(x - \\frac{\\sin 2x}{2}\\right) + C = \\frac{x}{2} - \\frac{\\sin 2x}{4} + C.$$",
            },
          ],
          trap: "Khi lấy nguyên hàm $\\int \\cos 2x\\,dx = \\frac{\\sin 2x}{2} + C$, nhớ chia cho hệ số $a = 2$!",
        },
      },
      {
        heading:
          "3.4. Phương pháp đổi biến: Ý tưởng, Đổi biến trực tiếp & Mẫu f'(x)[f(x)]^α, f'(x)/f(x)",
        content:
          "• <b>Công thức đổi biến:</b> Nếu $u = \\varphi(x)$ khả vi và $F' = f$ thì: $$\\int f(\\varphi(x))\\varphi'(x)\\,dx = F(\\varphi(x)) + C.$$" +
          "• <b>Dấu hiệu nhận biết:</b> Có một biểu thức \"bên trong\" $\\varphi(x)$ và đồng thời xuất hiện $\\varphi'(x)$; có thể thêm bớt hoặc tách hệ số để tạo ra $\\varphi'(x)\\,dx$; sau đổi biến toàn bộ tích phân phải chỉ còn một biến mới.<br>" +
          "• <b>Quy trình:</b> chọn $u \\to$ tính $du \\to$ đổi toàn bộ tích phân $\\to$ tính theo $u \\to$ thế lại.<br>" +
          "• <b>Ví dụ trực tiếp (Slide 10):</b><br>" +
          "- $I = \\int 2x\\cos(x^2 + 1)\\,dx$: Đặt $u = x^2 + 1, \\; du = 2x\\,dx \\Rightarrow I = \\int \\cos u\\,du = \\sin(x^2 + 1) + C$.<br>" +
          "- $J = \\int \\frac{x}{x^2 + 4}\\,dx$: Đặt $u = x^2 + 4, \\; du = 2x\\,dx \\Rightarrow J = \\frac{1}{2}\\int \\frac{du}{u} = \\frac{1}{2}\\ln(x^2 + 4) + C$.<br>" +
          "• <b>Các mẫu thường gặp:</b> $$\\int f'(x)[f(x)]^\\alpha\\,dx \\qquad \\text{và} \\qquad \\int \\frac{f'(x)}{f(x)}\\,dx.$$" +
          "<i>Nhận xét:</i> Nếu tử là bội của đạo hàm mẫu, ưu tiên đổi biến theo mẫu.",
        checkpoint: {
          question:
            "Ví dụ (Slide 11): Tính $\\int 5(5x + 1)^6\\,dx$ và $\\int \\frac{3x^2 + 1}{x^3 + x + 5}\\,dx$.",
          rubric: [
            {
              step: "Bước 1 • Mẫu f'(x)[f(x)]^α (0.5đ)",
              detail:
                "Đặt $u = 5x + 1 \\Rightarrow du = 5\\,dx$: $$\\int 5(5x + 1)^6\\,dx = \\int u^6\\,du = \\frac{u^7}{7} + C = \\frac{(5x + 1)^7}{7} + C.$$",
            },
            {
              step: "Bước 2 • Mẫu f'(x)/f(x) (0.5đ)",
              detail:
                "Vì $(x^3 + x + 5)' = 3x^2 + 1$, đặt $u = x^3 + x + 5 \\Rightarrow du = (3x^2 + 1)\\,dx$: $$\\int \\frac{3x^2 + 1}{x^3 + x + 5}\\,dx = \\ln|x^3 + x + 5| + C.$$",
            },
          ],
          trap: "Với tích phân bất định, bước cuối cùng BẮT BUỘC phải thế ngược biến $u$ về lại biến $x$ ban đầu!",
        },
      },
      {
        heading: "3.5. Phép thế x = φ(t) và Đổi biến lượng giác",
        content:
          "• <b>Phép thế $x = \\varphi(t)$:</b> Đôi khi nên đặt trực tiếp biến cũ theo biến mới $x = \\varphi(t), \\; dx = \\varphi'(t)\\,dt$. Dùng khi: cần khử căn; biểu thức hữu tỷ theo $x$ và căn trở thành hữu tỷ theo $t$; có dạng lượng giác thích hợp.<br>" +
          "<i>Ví dụ:</i> Với $|x| < a$, $I = \\int \\sqrt{a^2 - x^2}\\,dx$. Đặt $x = a\\sin t, \\; t \\in (-\\pi/2, \\pi/2)$, khi đó $\\sqrt{a^2 - x^2} = a\\cos t$, $dx = a\\cos t\\,dt$.<br>" +
          "• <b>Bảng nhận biết đổi biến lượng giác:</b><br>" +
          "1) Dạng căn $\\sqrt{a^2 - x^2}$: đặt $x = a\\sin t$, dùng $1 - \\sin^2 t = \\cos^2 t$.<br>" +
          "2) Dạng căn $\\sqrt{a^2 + x^2}$: đặt $x = a\\tan t$, dùng $1 + \\tan^2 t = \\sec^2 t$.<br>" +
          "3) Dạng căn $\\sqrt{x^2 - a^2}$: đặt $x = a\\sec t$, dùng $\\sec^2 t - 1 = \\tan^2 t$.<br>" +
          "• <b>Lưu ý:</b> Chọn miền của $t$ để bỏ dấu giá trị tuyệt đối đúng cách khi lấy căn.",
        checkpoint: {
          question:
            "Ví dụ (Slide 14): Tính tích phân $I = \\int \\sqrt{4 - x^2}\\,dx$ ($|x| < 2$) bằng đổi biến lượng giác.",
          rubric: [
            {
              step: "Bước 1 • Đặt x = 2 sin t và tính tích phân theo t (0.5đ)",
              detail:
                "Đặt $x = 2\\sin t, \\; t \\in (-\\pi/2, \\pi/2)$ ($\\cos t > 0, \\; dx = 2\\cos t\\,dt$): $$I = 4\\int \\cos^2 t\\,dt = 2\\int (1 + \\cos 2t)\\,dt = 2t + \\sin 2t + C.$$",
            },
            {
              step: "Bước 2 • Trả về biến x (0.5đ)",
              detail:
                "Vì $t = \\arcsin(x/2)$ và $\\sin 2t = 2\\sin t\\cos t = \\frac{x}{2}\\sqrt{4 - x^2}$, nên: $$I = 2\\arcsin\\frac{x}{2} + \\frac{x}{2}\\sqrt{4 - x^2} + C.$$",
            },
          ],
          trap: "Khi trả về biến $x$ cho $\\sin 2t$, đừng quên biến đổi $\\sin 2t = 2\\sin t\\cos t$ rồi vẽ tam giác vuông hoặc dùng $\\cos t = \\sqrt{1 - \\sin^2 t} = \\frac{\\sqrt{4 - x^2}}{2}$.",
        },
      },
      {
        heading: "3.6. Tích phân từng phần và Quy tắc chọn u, dv (LIATE)",
        content:
          "• Từ $d(uv) = u\\,dv + v\\,du$, suy ra <b>công thức tích phân từng phần</b>: $$\\int u\\,dv = uv - \\int v\\,du.$$" +
          "• <b>Mục tiêu:</b> chọn $u$ sao cho $du$ đơn giản hơn, và chọn $dv$ sao cho $v$ dễ tìm.<br>" +
          "• <b>Dấu hiệu thường gặp:</b> đa thức nhân $e^{ax}, \\sin ax, \\cos ax$; có $\\ln x, \\arctan x, \\arcsin x$; tích phân lặp lại và tạo công thức truy hồi.<br>" +
          "• <b>Quy tắc LIATE:</b> <b>L</b>ogarithm $\\to$ <b>I</b>nverse trig $\\to$ <b>A</b>lgebraic $\\to$ <b>T</b>rig $\\to$ <b>E</b>xponential (hàm đứng trước ưu tiên chọn làm $u$):<br>" +
          "- $P_n(x)e^{ax}, \\; P_n(x)\\sin bx, \\; P_n(x)\\cos bx$: chọn $u = P_n(x)$.<br>" +
          "- $\\ln x, \\; \\arctan x, \\; \\arcsin x$: thường chọn chính hàm đó làm $u$, còn $dv = dx$ hoặc phần đại số còn lại.<br>" +
          "- $e^{ax}\\sin bx, \\; e^{ax}\\cos bx$: từng phần hai lần, tích phân ban đầu xuất hiện lại.<br>" +
          "• <b>Ví dụ (Slide 17):</b> $I = \\int xe^x\\,dx$. Chọn $u = x, \\; dv = e^x\\,dx \\Rightarrow du = dx, \\; v = e^x \\Rightarrow I = xe^x - \\int e^x\\,dx = e^x(x - 1) + C$. <i>(Mở rộng: Với $\\int x^n e^{ax}\\,dx$, lặp lại từng phần sẽ hạ bậc đa thức sau mỗi bước).</i>",
        checkpoint: {
          question:
            "Ví dụ (Slide 18): Tính nguyên hàm $I = \\int \\ln x\\,dx$ ($x > 0$).",
          rubric: [
            {
              step: "Bước 1 • Ngầm nhân với 1 và chọn u, dv (0.5đ)",
              detail:
                "Viết $I = \\int (\\ln x) \\cdot 1\\,dx$ và chọn $u = \\ln x, \\; dv = dx$. Suy ra $du = \\frac{dx}{x}, \\; v = x$.",
            },
            {
              step: "Bước 2 • Áp dụng công thức tích phân từng phần (0.5đ)",
              detail: "$$I = x\\ln x - \\int 1\\,dx = x\\ln x - x + C.$$",
            },
          ],
          trap: "Dấu hiệu quan trọng: khi biểu thức chỉ có một hàm như $\\ln x$ hay $\\arctan x$, hãy ngầm nhân với $1$ để chọn $dv = 1\\,dx$.",
        },
      },
      {
        heading:
          "3.7. Tích phân từng phần nhiều lần, Vòng lặp & Bảng chọn phương pháp",
        content:
          "• <b>Ví dụ từng phần hai lần (Slide 19):</b> $I = \\int x^2 \\cos x\\,dx$.<br>" +
          "- Lần 1 ($u = x^2, \\; dv = \\cos x\\,dx$): $I = x^2 \\sin x - 2\\int x\\sin x\\,dx$.<br>" +
          "- Lần 2 ($u = x, \\; dv = \\sin x\\,dx$): $\\int x\\sin x\\,dx = -x\\cos x + \\sin x$.<br>" +
          "- Suy ra $I = x^2 \\sin x + 2x\\cos x - 2\\sin x + C$.<br>" +
          "• <b>Bảng tóm tắt chọn phương pháp ưu tiên (Slide 21):</b><br>" +
          "1) Có $f'(x)$ đi cùng $f(x)$ $\\to$ Đổi biến $u = f(x)$.<br>" +
          "2) Có căn $\\sqrt{a^2 - x^2}, \\; \\sqrt{a^2 + x^2}$ $\\to$ Đổi biến lượng giác.<br>" +
          "3) Đa thức $\\times$ mũ/lượng giác $\\to$ Tích phân từng phần.<br>" +
          "4) Có $\\ln x, \\; \\arctan x, \\; \\arcsin x$ $\\to$ Từng phần, thường chọn hàm này làm $u$.<br>" +
          "5) Phân thức hữu tỷ $\\to$ Chia đa thức và phân tích thành phân thức đơn giản.<br>" +
          "6) Lũy thừa lượng giác $\\to$ Xét chẵn/lẻ, hạ bậc hoặc biến đổi tích–tổng.",
        checkpoint: {
          question:
            "Ví dụ từng phần kiểu vòng lặp (Slide 20): Tính $I = \\int e^x \\cos x\\,dx$.",
          rubric: [
            {
              step: "Bước 1 • Từng phần lần 1 và đặt J = ∫ eˣ sin x dx (0.5đ)",
              detail:
                "Chọn $u = \\cos x, \\; dv = e^x\\,dx$: $I = e^x \\cos x + \\int e^x \\sin x\\,dx = e^x \\cos x + J$.",
            },
            {
              step: "Bước 2 • Từng phần lần 2 cho J và giải phương trình tìm I (0.5đ)",
              detail:
                "Từng phần $J$ với $u = \\sin x, \\; dv = e^x\\,dx$: $J = e^x \\sin x - I$. Thay vào ta được $I = e^x\\cos x + e^x\\sin x - I \\iff 2I = e^x(\\sin x + \\cos x) \\Rightarrow I = \\frac{e^x}{2}(\\sin x + \\cos x) + C$.",
            },
          ],
          trap: "Trong tích phân lặp, cả 2 lần từng phần đều phải nhất quán chọn cùng loại hàm làm $u$ (cùng chọn lượng giác hoặc cùng chọn $e^x$); nếu đổi vai trò ở lần 2 sẽ quay về đồng nhất thức $I = I$.",
        },
      },
      {
        heading:
          "3.8. Tích phân hàm lượng giác (sin^m x cos^n x, Mũ chẵn & Tích–Tổng)",
        content:
          "• <b>Xét $I = \\int \\sin^m x \\cos^n x\\,dx$ ($m, n \\in \\mathbb{N}$):</b><br>" +
          "- $m$ lẻ: tách một $\\sin x$, dùng $\\sin^2 x = 1 - \\cos^2 x$, đặt $u = \\cos x$.<br>" +
          "- $n$ lẻ: tách một $\\cos x$, dùng $\\cos^2 x = 1 - \\sin^2 x$, đặt $u = \\sin x$.<br>" +
          "- $m, n$ đều chẵn: dùng công thức hạ bậc.<br>" +
          "<i>Ví dụ:</i> $\\int \\sin^3 x \\cos^2 x\\,dx = -\\frac{\\cos^3 x}{3} + \\frac{\\cos^5 x}{5} + C$.<br>" +
          "• <b>Các công thức tích–tổng (Slide 24):</b><br>" +
          "$$\\sin a \\cos b = \\frac{1}{2}[\\sin(a + b) + \\sin(a - b)],$$" +
          "$$\\cos a \\cos b = \\frac{1}{2}[\\cos(a + b) + \\cos(a - b)],$$" +
          "$$\\sin a \\sin b = \\frac{1}{2}[\\cos(a - b) - \\cos(a + b)].$$" +
          "<i>Ví dụ:</i> $\\int \\sin 2x \\cos 3x\\,dx = \\frac{1}{2}\\int (\\sin 5x - \\sin x)\\,dx = -\\frac{\\cos 5x}{10} + \\frac{\\cos x}{2} + C$.",
        checkpoint: {
          question:
            "Ví dụ lượng giác số mũ chẵn (Slide 23): Tính $I = \\int \\sin^2 x \\cos^2 x\\,dx$.",
          rubric: [
            {
              step: "Bước 1 • Dùng công thức nhân đôi và hạ bậc (0.5đ)",
              detail:
                "Ta có $\\sin^2 x \\cos^2 x = \\frac{1}{4}\\sin^2 2x = \\frac{1}{8}(1 - \\cos 4x)$.",
            },
            {
              step: "Bước 2 • Lấy nguyên hàm (0.5đ)",
              detail:
                "$$I = \\frac{1}{8}\\int (1 - \\cos 4x)\\,dx = \\frac{x}{8} - \\frac{\\sin 4x}{32} + C.$$",
            },
          ],
          trap: "Nhớ dấu trong công thức $\\sin a \\sin b = \\frac{1}{2}[\\cos(a - b) - \\cos(a + b)]$ và chia đúng hệ số góc khi lấy nguyên hàm $\\cos 4x$.",
        },
      },
      {
        heading:
          "3.9. Hàm hữu tỷ: Phân thức thực sự, Phân tích mẫu & Tìm hệ số",
        content:
          "• <b>Bước 1 – Phân thức thực sự:</b> Xét $R(x) = \\frac{P(x)}{Q(x)}$ với $P, Q \\in \\mathbb{R}[x], \\; Q \\not\\equiv 0$.<br>" +
          "- Nếu $\\deg P < \\deg Q$: phân thức thực sự.<br>" +
          "- Nếu $\\deg P \\ge \\deg Q$: chia đa thức $\\frac{P(x)}{Q(x)} = S(x) + \\frac{R_1(x)}{Q(x)}$ với $\\deg R_1 < \\deg Q$ (ví dụ $\\frac{x^3 + 5}{x^3 + 1} = 1 + \\frac{4}{x^3 + 1}$).<br>" +
          "• <b>Bước 2 – Phân tích mẫu:</b> Trên $\\mathbb{R}$, đa thức mẫu phân tích thành $Q(x) = A\\prod_i (x - a_i)^{m_i} \\prod_j (x^2 + p_j x + q_j)^{n_j}$ ($p_j^2 - 4q_j < 0$):<br>" +
          "- Mỗi nhân tử tuyến tính $(x - a)^m$ tạo các hạng: $\\frac{A_1}{x - a} + \\frac{A_2}{(x - a)^2} + \\dots + \\frac{A_m}{(x - a)^m}$.<br>" +
          "- Mỗi nhân tử bậc hai bất khả quy $(x^2 + px + q)^n$ tạo các hạng: $\\frac{B_k x + C_k}{(x^2 + px + q)^k}$ ($k = 1, \\dots, n$).<br>" +
          "• <b>Hai cách tìm hệ số:</b> (1) <b>Đồng nhất hệ số</b> (quy đồng, khai triển và so sánh hệ số các lũy thừa $x$); (2) <b>Thế giá trị đặc biệt</b> (cho $x = a$ nếu có nhân tử $(x - a)$, rồi dùng thêm giá trị khác hoặc đồng nhất hệ số).<br>" +
          "• <b>Quy trình tổng quát 6 bước:</b> (1) So sánh bậc, chia đa thức nếu cần; (2) Phân tích mẫu trên $\\mathbb{R}$; (3) Viết dạng phân tích đơn giản đúng bội; (4) Xác định hệ số; (5) Tích phân từng phân thức ($1/(x-a)^k \\to$ lũy thừa hoặc logarit; $(Ax+B)/(x^2+px+q) \\to$ tách đạo hàm mẫu và hoàn thành bình phương dùng $\\arctan$); (6) Gộp kết quả và kiểm tra bằng đạo hàm.",
        checkpoint: {
          question:
            "Ví dụ nhanh (Slide 32): Tính $\\int \\frac{3x + 5}{x^2 + 3x + 2}\\,dx$ bằng phương pháp thế giá trị đặc biệt.",
          rubric: [
            {
              step: "Bước 1 • Phân tích mẫu và đặt dạng phân thức đơn giản (0.5đ)",
              detail:
                "Phân tích $\\frac{3x + 5}{(x + 1)(x + 2)} = \\frac{A}{x + 1} + \\frac{B}{x + 2} \\iff 3x + 5 = A(x + 2) + B(x + 1)$.",
            },
            {
              step: "Bước 2 • Thế x = −1, x = −2 tìm A, B và lấy nguyên hàm (0.5đ)",
              detail:
                "Cho $x = -1$ được $A = 2$; cho $x = -2$ được $B = 1$. Vậy: $$\\int \\frac{3x + 5}{x^2 + 3x + 2}\\,dx = 2\\ln|x + 1| + \\ln|x + 2| + C.$$",
            },
          ],
          trap: "Tuyệt đối KHÔNG quên chia đa thức khi bậc tử lớn hơn hoặc bằng bậc mẫu!",
        },
      },
      {
        heading:
          "3.10. Các trường hợp phân tích hàm hữu tỷ (TH1, TH2, TH3, TH4)",
        content:
          "• <b>Trường hợp 1 (mẫu có các nhân tử tuyến tính khác nhau):</b> $$I = \\int \\frac{dx}{x^2 - 1} = \\int \\left(\\frac{1/2}{x - 1} - \\frac{1/2}{x + 1}\\right)dx = \\frac{1}{2}\\ln\\left|\\frac{x - 1}{x + 1}\\right| + C.$$" +
          "• <b>Trường hợp 2 (nhân tử tuyến tính lặp):</b> $\\frac{1}{x(x - 1)^2} = \\frac{A}{x} + \\frac{B}{x - 1} + \\frac{C}{(x - 1)^2}$. Đồng nhất hệ số cho $A = 1, \\; B = -1, \\; C = 1$. Suy ra: $$I = \\int \\frac{dx}{x(x - 1)^2} = \\ln|x| - \\ln|x - 1| - \\frac{1}{x - 1} + C.$$" +
          "• <b>Trường hợp 3 (mẫu bậc hai bất khả quy):</b> $I = \\int \\frac{2x + 3}{x^2 + 2x + 5}\\,dx$. Tách tử $2x + 3 = (2x + 2) + 1$ và hoàn thành bình phương $x^2 + 2x + 5 = (x + 1)^2 + 4$. Do đó: $$I = \\ln(x^2 + 2x + 5) + \\int \\frac{dx}{(x + 1)^2 + 4} = \\ln(x^2 + 2x + 5) + \\frac{1}{2}\\arctan\\frac{x + 1}{2} + C.$$",
        checkpoint: {
          question:
            "Trường hợp 4 (Slides 30 & 31): Tính tích phân hữu tỷ $I = \\int \\frac{dx}{x^3 + 1}$ (tuyến tính và bậc hai bất khả quy).",
          rubric: [
            {
              step: "Bước 1 • Phân tích mẫu và đồng nhất hệ số (0.5đ)",
              detail:
                "Vì $x^3 + 1 = (x + 1)(x^2 - x + 1)$, đặt $\\frac{1}{x^3 + 1} = \\frac{A}{x + 1} + \\frac{Bx + C}{x^2 - x + 1}$. Đồng nhất hệ số cho $A = \\frac{1}{3}, \\; B = -\\frac{1}{3}, \\; C = \\frac{2}{3}$. Suy ra: $$I = \\frac{1}{3}\\int \\frac{dx}{x + 1} + \\frac{1}{3}\\int \\frac{-x + 2}{x^2 - x + 1}\\,dx.$$",
            },
            {
              step: "Bước 2 • Tách đạo hàm mẫu, hoàn thành bình phương và kết luận (0.5đ)",
              detail:
                "Viết $-x + 2 = -\\frac{1}{2}(2x - 1) + \\frac{3}{2}$ và $x^2 - x + 1 = \\left(x - \\frac{1}{2}\\right)^2 + \\frac{3}{4}$. Suy ra: $$I = \\frac{1}{3}\\ln|x + 1| - \\frac{1}{6}\\ln(x^2 - x + 1) + \\frac{1}{\\sqrt{3}}\\arctan\\frac{2x - 1}{\\sqrt{3}} + C.$$",
            },
          ],
          trap: "Với nhân tử lặp $(x - 1)^2$, thiếu số hạng $\\frac{B}{x - 1}$ là lỗi phổ biến nhất; còn khi tính $\\int \\frac{dx}{(x - 1/2)^2 + (\\sqrt{3}/2)^2}$, chú ý $a = \\frac{\\sqrt{3}}{2}$ nên $\\frac{1}{a}\\arctan\\frac{u}{a}$ rút gọn thành $\\frac{2}{\\sqrt{3}}\\arctan\\frac{2x - 1}{\\sqrt{3}}$.",
        },
      },
      {
        heading:
          "3.11. Định nghĩa tích phân Riemann, Tính chất & Định lý Newton–Leibniz",
        content:
          "• <b>Định nghĩa tích phân Riemann:</b> Chia $[a, b]$ thành $a = x_0 < x_1 < \\dots < x_n = b$, đặt $\\Delta x_i = x_i - x_{i-1}$, chọn $\\xi_i \\in [x_{i-1}, x_i]$. Nếu $$\\lim_{\\max \\Delta x_i \\to 0} \\sum_{i=1}^n f(\\xi_i)\\Delta x_i$$ tồn tại hữu hạn và không phụ thuộc cách chia, thì giới hạn đó là $\\int_a^b f(x)\\,dx$. Mọi hàm liên tục trên $[a, b]$ đều khả tích Riemann.<br>" +
          "• <b>Tính chất cơ bản của tích phân xác định:</b><br>" +
          "- $\\int_a^a f(x)\\,dx = 0$, $\\quad \\int_a^b f(x)\\,dx = -\\int_b^a f(x)\\,dx$.<br>" +
          "- $\\int_a^b [\\alpha f + \\beta g]\\,dx = \\alpha \\int_a^b f\\,dx + \\beta \\int_a^b g\\,dx$, $\\quad \\int_a^b f\\,dx = \\int_a^c f\\,dx + \\int_c^b f\\,dx$.<br>" +
          "- Nếu $f \\le g$ trên $[a, b]$ thì $\\int_a^b f(x)\\,dx \\le \\int_a^b g(x)\\,dx$. Nếu $|f(x)| \\le M$ thì $\\left|\\int_a^b f(x)\\,dx\\right| \\le M(b - a)$.<br>" +
          "• <b>Định lý Newton–Leibniz:</b> Nếu $f$ liên tục trên $[a, b]$ và $F' = f$ thì: $$\\int_a^b f(x)\\,dx = F(b) - F(a).$$",
        checkpoint: {
          question:
            "Ví dụ (Slide 36): Dùng định lý Newton–Leibniz tính $\\int_0^2 (3x^2 + 1)\\,dx$ và $\\int_0^{\\pi/2} \\cos x\\,dx$.",
          rubric: [
            {
              step: "Bước 1 • Tính tích phân thứ nhất (0.5đ)",
              detail:
                "$$\\int_0^2 (3x^2 + 1)\\,dx = [x^3 + x]_0^2 = (2^3 + 2) - 0 = 10.$$",
            },
            {
              step: "Bước 2 • Tính tích phân thứ hai (0.5đ)",
              detail:
                "$$\\int_0^{\\pi/2} \\cos x\\,dx = [\\sin x]_0^{\\pi/2} = \\sin\\frac{\\pi}{2} - \\sin 0 = 1.$$",
            },
          ],
          trap: "Định lý Newton–Leibniz chỉ áp dụng trực tiếp khi $f$ liên tục (hoặc khả tích có nguyên hàm liên tục) trên toàn đoạn $[a, b]$; không dùng trực tiếp nếu $f$ bị gián đoạn vô hạn trong $[a, b]$.",
        },
      },
      {
        heading:
          "3.12. Đổi biến, Từng phần có cận, Tính đối xứng & Định lý giá trị trung bình",
        content:
          "• <b>Đổi biến trong tích phân xác định:</b> Nếu $x = \\varphi(t), \\; \\varphi(\\alpha) = a, \\; \\varphi(\\beta) = b$ thì $\\int_a^b f(x)\\,dx = \\int_\\alpha^\\beta f(\\varphi(t))\\varphi'(t)\\,dt$. <i>Nguyên tắc:</i> đổi biến thì đổi cận; khi đã đổi cận, không cần quay về biến cũ (ví dụ $\\int_0^1 2xe^{x^2}\\,dx = \\int_0^1 e^u\\,du = e - 1$).<br>" +
          "• <b>Tích phân từng phần có cận:</b> $\\int_a^b u\\,dv = [uv]_a^b - \\int_a^b v\\,du$ (cận được giữ nguyên trong tích phân còn lại; ví dụ $\\int_0^1 xe^x\\,dx = [xe^x]_0^1 - \\int_0^1 e^x\\,dx = 1$).<br>" +
          "• <b>Tính đối xứng (trên $[-a, a]$):</b> Nếu $f$ liên tục trên $[-a, a]$: $f$ lẻ $\\Rightarrow \\int_{-a}^a f(x)\\,dx = 0$; $f$ chẵn $\\Rightarrow \\int_{-a}^a f(x)\\,dx = 2\\int_0^a f(x)\\,dx$. <i>Ví dụ:</i> $\\int_{-2}^2 (x^3 + x^2)\\,dx = 2\\int_0^2 x^2\\,dx = \\frac{16}{3}$.<br>" +
          "• <b>Định lý giá trị trung bình của tích phân:</b> Nếu $f$ liên tục trên $[a, b]$, tồn tại $c \\in [a, b]$ sao cho $\\int_a^b f(x)\\,dx = f(c)(b - a)$. Giá trị trung bình của $f$ trên $[a, b]$ là $f_{\\text{tb}} = \\frac{1}{b - a}\\int_a^b f(x)\\,dx$. <i>Ví dụ:</i> Với $f(x) = x^2$ trên $[0, 2]$, $f_{\\text{tb}} = \\frac{1}{2}\\int_0^2 x^2\\,dx = \\frac{4}{3}$, do đó tồn tại $c \\in [0, 2]$ sao cho $c^2 = 4/3$.",
        checkpoint: {
          question:
            "Ví dụ đổi biến lượng giác có cận (Slide 38): Tính $I = \\int_0^2 \\sqrt{4 - x^2}\\,dx$ và nêu ý nghĩa hình học.",
          rubric: [
            {
              step: "Bước 1 • Đặt x = 2 sin t và đổi cận (0.5đ)",
              detail:
                "Đặt $x = 2\\sin t$: khi $x = 0 \\Rightarrow t = 0$; khi $x = 2 \\Rightarrow t = \\frac{\\pi}{2}$.",
            },
            {
              step: "Bước 2 • Tính tích phân theo t và nêu ý nghĩa hình học (0.5đ)",
              detail:
                "$$I = 4\\int_0^{\\pi/2} \\cos^2 t\\,dt = 2\\int_0^{\\pi/2} (1 + \\cos 2t)\\,dt = \\pi.$$ Ý nghĩa hình học: đây là diện tích một phần tư hình tròn bán kính $2$.",
            },
          ],
          trap: "Đừng quên kiểm tra tính đối xứng $[-a, a]$ của cận tích phân trước khi áp dụng tính chất hàm chẵn/lẻ.",
        },
      },
      {
        heading:
          "3.13. Ứng dụng: Diện tích hình phẳng & Thể tích khối tròn xoay (Đĩa, Vỏ trụ)",
        content:
          "• <b>Diện tích hình phẳng:</b><br>" +
          "- Theo $x$: Nếu $f, g$ liên tục trên $[a, b]$ thì $S = \\int_a^b |f(x) - g(x)|\\,dx$ (nếu $f(x) \\ge g(x)$ thì $S = \\int_a^b [f(x) - g(x)]\\,dx$). <i>Ví dụ:</i> Miền giới hạn bởi $y = 2x$ và $y = x^2$ ($x = 0, 2$): $S = \\int_0^2 (2x - x^2)\\,dx = \\frac{4}{3}$.<br>" +
          "- Theo $y$: Nếu miền mô tả bởi $x = \\varphi_1(y), \\; x = \\varphi_2(y), \\; c \\le y \\le d$ thì $S = \\int_c^d |\\varphi_2(y) - \\varphi_1(y)|\\,dy$. <i>Ví dụ:</i> Miền giới hạn bởi $y^2 = 2x$ và $x^2 = 2y$ trong góc phần tư thứ nhất ($0 \\le y \\le 2$): $S = \\int_0^2 \\left(\\sqrt{2y} - \\frac{y^2}{2}\\right)dy = \\frac{4}{3}$.<br>" +
          "• <b>Thể tích vật thể & khối tròn xoay:</b><br>" +
          "- Thiết diện $A(x)$ vuông góc trục $Ox$: $V = \\int_a^b A(x)\\,dx$.<br>" +
          "- Quay miền $0 \\le y \\le f(x)$ quanh $Ox$: $V = \\pi\\int_a^b [f(x)]^2\\,dx$ (ví dụ quay dưới $y = x, \\; 0 \\le x \\le 2$ quanh $Ox$: $V = \\pi\\int_0^2 x^2\\,dx = \\frac{8\\pi}{3}$).<br>" +
          "- <b>Phương pháp vỏ trụ:</b> Quay miền $0 \\le y \\le f(x), \\; a \\le x \\le b$ quanh $Oy$: $$V = 2\\pi\\int_a^b xf(x)\\,dx$$ (khi các vỏ trụ không chồng lấp).",
        checkpoint: {
          question:
            "Ví dụ phương pháp vỏ trụ (Slide 45): Tính thể tích khối tròn xoay khi quay miền dưới $y = 2 - x$, $0 \\le x \\le 2$ quanh trục $Oy$.",
          rubric: [
            {
              step: "Bước 1 • Áp dụng công thức vỏ trụ quanh Oy (0.5đ)",
              detail:
                "Với $a = 0, \\; b = 2, \\; f(x) = 2 - x \\ge 0$: $$V = 2\\pi\\int_0^2 x(2 - x)\\,dx.$$",
            },
            {
              step: "Bước 2 • Tính tích phân xác định (0.5đ)",
              detail:
                "$$V = 2\\pi\\left[x^2 - \\frac{x^3}{3}\\right]_0^2 = 2\\pi\\left(4 - \\frac{8}{3}\\right) = \\frac{8\\pi}{3}.$$",
            },
          ],
          trap: "Nhớ phân biệt hệ số: quay quanh $Ox$ dùng $\\pi\\int [f(x)]^2\\,dx$ (bình phương hàm), còn vỏ trụ quanh $Oy$ dùng $2\\pi\\int x f(x)\\,dx$ (có thêm nhân tử $x$ và $2\\pi$).",
        },
      },
      {
        heading:
          "3.14. Ứng dụng: Độ dài cung, Diện tích mặt tròn xoay & Ứng dụng kinh tế",
        content:
          "• <b>Độ dài cung:</b><br>" +
          "- Với $y = f(x)$ khả vi liên tục trên $[a, b]$: $L = \\int_a^b \\sqrt{1 + [f'(x)]^2}\\,dx$.<br>" +
          "- Với đường cong tham số $x = x(t), \\; y = y(t), \\; \\alpha \\le t \\le \\beta$: $L = \\int_\\alpha^\\beta \\sqrt{[x'(t)]^2 + [y'(t)]^2}\\,dt$.<br>" +
          "<i>Ví dụ:</i> Đoạn thẳng $y = x, \\; 0 \\le x \\le 1$: $L = \\int_0^1 \\sqrt{2}\\,dx = \\sqrt{2}$.<br>" +
          "• <b>Diện tích mặt tròn xoay:</b> Quay cung $y = f(x)$ quanh $Ox$: $S_x = 2\\pi\\int_a^b |f(x)|\\sqrt{1 + [f'(x)]^2}\\,dx$; quanh $Oy$: $S_y = 2\\pi\\int_a^b |x|\\sqrt{1 + [f'(x)]^2}\\,dx$. <i>Ví dụ:</i> Quay đoạn $y = x, \\; 0 \\le x \\le 1$ quanh $Ox$: $S_x = 2\\pi\\int_0^1 x\\sqrt{2}\\,dx = \\pi\\sqrt{2}$.<br>" +
          "• <b>Ứng dụng kinh tế (từ đại lượng biên đến tổng):</b> Nếu $C'(q)$ là chi phí biên và $C(0) = C_0$ thì $C(Q) = C_0 + \\int_0^Q C'(q)\\,dq$. Tương tự với doanh thu biên: $R(Q) = R(0) + \\int_0^Q R'(q)\\,dq$.",
        checkpoint: {
          question:
            "Ví dụ kinh tế (Slide 48): Biết chi phí biên $C'(q) = 4q + 10$ và chi phí cố định $C(0) = 100$. Tìm hàm tổng chi phí $C(Q)$.",
          rubric: [
            {
              step: "Bước 1 • Thiết lập công thức tích phân từ đại lượng biên (0.5đ)",
              detail:
                "$$C(Q) = C(0) + \\int_0^Q C'(q)\\,dq = 100 + \\int_0^Q (4q + 10)\\,dq.$$",
            },
            {
              step: "Bước 2 • Tính tích phân xác định (0.5đ)",
              detail: "$$C(Q) = 100 + [2q^2 + 10q]_0^Q = 2Q^2 + 10Q + 100.$$",
            },
          ],
          trap: "Khi tính tổng chi phí $C(Q)$ từ chi phí biên, đừng quên cộng chi phí cố định ban đầu $C(0) = C_0$!",
        },
      },
      {
        heading:
          "3.15. Khái niệm, phân loại & Tích phân suy rộng loại 1, loại 2",
        content:
          "• <b>Khái niệm và phân loại:</b> Tích phân suy rộng xuất hiện khi ít nhất một trong hai điều kiện của tích phân xác định thông thường bị phá vỡ:<br>" +
          "1) <b>Loại 1:</b> khoảng lấy tích phân vô hạn.<br>" +
          "2) <b>Loại 2:</b> hàm dưới dấu tích phân không bị chặn tại một cận hoặc một điểm trong khoảng.<br>" +
          "<i>Nguyên tắc chung:</i> mọi tích phân suy rộng phải được định nghĩa bằng <b>giới hạn</b>. Không được áp dụng Newton–Leibniz trực tiếp mà bỏ qua bước giới hạn.<br>" +
          "• <b>Tích phân suy rộng loại 1:</b> Nếu $f$ khả tích trên mọi $[a, b], \\; b > a$ thì $\\int_a^{+\\infty} f(x)\\,dx := \\lim_{b \\to +\\infty} \\int_a^b f(x)\\,dx$ (hội tụ khi giới hạn tồn tại hữu hạn).<br>" +
          "<i>Ví dụ:</i> $\\int_0^{+\\infty} e^{-x}\\,dx = \\lim_{b \\to \\infty} [-e^{-x}]_0^b = 1$ (hội tụ). <i>Phản ví dụ:</i> $\\int_0^{+\\infty} \\cos x\\,dx = \\lim_{b \\to \\infty} \\sin b$ không tồn tại nên phân kỳ.<br>" +
          "• <b>Hai đầu vô hạn:</b> Với $c \\in \\mathbb{R}$ bất kỳ, $\\int_{-\\infty}^{+\\infty} f(x)\\,dx = \\int_{-\\infty}^c f(x)\\,dx + \\int_c^{+\\infty} f(x)\\,dx$. Tích phân chỉ hội tụ khi <b>cả hai</b> tích phân ở vế phải hội tụ (ví dụ $\\int_{-\\infty}^{+\\infty} \\frac{dx}{1+x^2} = \\frac{\\pi}{2} + \\frac{\\pi}{2} = \\pi$). <i>Chú ý:</i> không thay định nghĩa này bằng giới hạn đối xứng $\\lim_{A \\to \\infty} \\int_{-A}^A$, vì đó là giá trị chính Cauchy, một khái niệm khác.<br>" +
          "• <b>Tích phân suy rộng loại 2:</b> Nếu $f$ không bị chặn khi $x \\to a^+$, $\\int_a^b f(x)\\,dx := \\lim_{t \\to a^+} \\int_t^b f(x)\\,dx$. Nếu $f$ không bị chặn tại $c \\in (a, b)$: $\\int_a^b f = \\int_a^c f + \\int_c^b f$ và phải kiểm tra hai tích phân riêng biệt.",
        checkpoint: {
          question:
            "Ví dụ (Slide 52): Xét sự hội tụ và tính giá trị của tích phân suy rộng loại 2: $\\int_0^1 \\frac{dx}{\\sqrt{x}}$.",
          rubric: [
            {
              step: "Bước 1 • Nhận diện điểm kỳ dị và viết dưới dạng giới hạn (0.5đ)",
              detail:
                "Hàm $f(x) = \\frac{1}{\\sqrt{x}} \\to +\\infty$ khi $x \\to 0^+$ (điểm kỳ dị tại $x = 0$). Ta viết: $$\\int_0^1 \\frac{dx}{\\sqrt{x}} = \\lim_{\\varepsilon \\to 0^+} \\int_\\varepsilon^1 x^{-1/2}\\,dx.$$",
            },
            {
              step: "Bước 2 • Tính tích phân và lấy giới hạn (0.5đ)",
              detail:
                "$$= \\lim_{\\varepsilon \\to 0^+} [2\\sqrt{x}]_\\varepsilon^1 = \\lim_{\\varepsilon \\to 0^+} (2 - 2\\sqrt{\\varepsilon}) = 2.$$ Tích phân hội tụ và bằng $2$.",
            },
          ],
          trap: "Sai lầm rất hay gặp là bỏ qua điểm kỳ dị nằm BÊN TRONG khoảng lấy tích phân (ví dụ $\\int_{-1}^1 \\frac{dx}{x^2}$ có điểm kỳ dị tại $x = 0$, nếu thay Newton–Leibniz thẳng sẽ ra $-2$ vô lý vì hàm dương!).",
        },
      },
      {
        heading: "3.16. Tiêu chuẩn p ở vô cực và gần điểm kỳ dị",
        content:
          "• <b>Tiêu chuẩn $p$ ở vô cực (với $a > 0$):</b><br>" +
          "$$\\int_a^{+\\infty} \\frac{dx}{x^p}$$ hội tụ khi $p > 1$, và phân kỳ khi $p \\le 1$.<br>" +
          "<i>Ví dụ:</i> $\\int_1^\\infty \\frac{dx}{x^{3/2}} = 2$ (hội tụ), trong khi $\\int_1^\\infty \\frac{dx}{x} = +\\infty$ (phân kỳ).<br>" +
          "• <b>Tiêu chuẩn $p$ gần điểm kỳ dị (với $b > 0$):</b><br>" +
          "$$\\int_0^b \\frac{dx}{x^p}$$ hội tụ khi $p < 1$, và phân kỳ khi $p \\ge 1$.<br>" +
          "Tổng quát gần $x = a$: $\\int_a^b \\frac{dx}{(x - a)^p}$ hội tụ khi và chỉ khi $p < 1$.<br>" +
          "<i>Ví dụ:</i> $\\int_0^1 x^{-2/3}\\,dx = 3$ (hội tụ vì $p = 2/3 < 1$), còn $\\int_0^1 \\frac{dx}{x}$ phân kỳ ($p = 1$).",
        checkpoint: {
          question:
            "Áp dụng nhanh tiêu chuẩn $p$ để xét tính hội tụ của $\\int_2^{+\\infty} \\frac{dx}{x^{4/3}}$ và $\\int_1^5 \\frac{dx}{(x - 1)^{3/2}}$.",
          rubric: [
            {
              step: "Bước 1 • Xét tích phân loại 1 ở vô cực (0.5đ)",
              detail:
                "Với $\\int_2^{+\\infty} \\frac{dx}{x^{4/3}}$, ta có $p = \\frac{4}{3} > 1$ nên tích phân <b>hội tụ</b>.",
            },
            {
              step: "Bước 2 • Xét tích phân loại 2 gần điểm kỳ dị x = 1 (0.5đ)",
              detail:
                "Với $\\int_1^5 \\frac{dx}{(x - 1)^{3/2}}$, điểm kỳ dị là $x = 1$ và $p = \\frac{3}{2} \\ge 1$ nên tích phân <b>phân kỳ</b>.",
            },
          ],
          trap: "Nhớ quy tắc đối nghịch: ở vô cực ($+\\infty$) cần $p > 1$ để hội tụ; gần điểm kỳ dị hữu hạn ($a$) lại cần $p < 1$ để hội tụ; còn tại đúng $p = 1$ thì CẢ HAI đều phân kỳ!",
        },
      },
      {
        heading:
          "3.17. Tiêu chuẩn so sánh trực tiếp, So sánh giới hạn & Tương đương",
        content:
          "• <b>Tiêu chuẩn so sánh trực tiếp:</b> Giả sử $0 \\le f(x) \\le g(x)$ gần điểm suy rộng:<br>" +
          "- Nếu $\\int g$ hội tụ thì $\\int f$ hội tụ.<br>" +
          "- Nếu $\\int f$ phân kỳ thì $\\int g$ phân kỳ.<br>" +
          "<i>Cách dùng:</i> (1) tìm hàm mẫu đơn giản $g$; (2) thiết lập bất đẳng thức đúng gần điểm suy rộng; (3) dùng tiêu chuẩn $p$ hoặc tích phân chuẩn đã biết.<br>" +
          "<i>Ví dụ (Slides 56 & 57):</i><br>" +
          "- Ở vô cực: Với $x \\ge 1$, $0 \\le \\frac{\\sin^2 x}{1 + x^2} \\le \\frac{1}{1 + x^2} \\le \\frac{1}{x^2}$, mà $\\int_1^\\infty \\frac{dx}{x^2}$ hội tụ nên $\\int_1^\\infty \\frac{\\sin^2 x}{1 + x^2}\\,dx$ hội tụ.<br>" +
          "- Gần điểm kỳ dị: Với $0 < x \\le 1$, $x + \\sqrt{x} \\ge \\sqrt{x} \\Rightarrow 0 \\le \\frac{1}{x + \\sqrt{x}} \\le \\frac{1}{\\sqrt{x}}$, mà $\\int_0^1 x^{-1/2}\\,dx$ hội tụ nên $\\int_0^1 \\frac{dx}{x + \\sqrt{x}}$ hội tụ (gần $0$, $\\sqrt{x}$ chi phối $x$).<br>" +
          "• <b>Tiêu chuẩn so sánh giới hạn:</b> Giả sử $f(x), g(x) > 0$ gần điểm suy rộng và $\\lim \\frac{f(x)}{g(x)} = L$ ($0 < L < +\\infty$). Khi đó $\\int f$ và $\\int g$ <b>cùng hội tụ hoặc cùng phân kỳ</b>. <i>Ý tưởng chọn $g$:</i> ở vô cực giữ các số hạng bậc cao nhất; gần điểm hữu hạn dùng khai triển tương đương hoặc số hạng chi phối.<br>" +
          "<i>Ví dụ (Slides 59 & 60):</i> Khi $x \\to \\infty$, $\\frac{x + 1}{x^3 + 2} \\sim \\frac{1}{x^2}$ nên $\\int_1^\\infty \\frac{x + 1}{x^3 + 2}\\,dx$ hội tụ. Khi $x \\to 0^+$, $e^x - 1 \\sim x \\Rightarrow \\frac{1}{e^x - 1} \\sim \\frac{1}{x}$ nên $\\int_0^1 \\frac{dx}{e^x - 1}$ phân kỳ.<br>" +
          "• <b>Tiêu chuẩn tương đương:</b> Nếu $f(x), g(x) > 0$ gần điểm suy rộng và $f(x) \\sim g(x)$, thì hai tích phân suy rộng tương ứng cùng tính hội tụ/phân kỳ. <i>Một số tương đương cơ bản khi $x \\to 0$:</i> $\\sin x \\sim x, \\; \\tan x \\sim x, \\; e^x - 1 \\sim x, \\; \\ln(1 + x) \\sim x$.",
        checkpoint: {
          question:
            "Ví dụ tiêu chuẩn tương đương (Slide 61): Xét sự hội tụ của $I = \\int_0^1 \\frac{dx}{\\sqrt{\\sin x}}$.",
          rubric: [
            {
              step: "Bước 1 • Tìm hàm tương đương khi x → 0⁺ (0.5đ)",
              detail:
                "Điểm kỳ dị là $x = 0$. Khi $x \\to 0^+$, vì $\\sin x > 0$ và $\\sin x \\sim x$ nên: $$\\frac{1}{\\sqrt{\\sin x}} \\sim \\frac{1}{\\sqrt{x}}.$$",
            },
            {
              step: "Bước 2 • Áp dụng tiêu chuẩn p gần 0 và kết luận (0.5đ)",
              detail:
                "Vì $\\int_0^1 \\frac{dx}{x^{1/2}}$ hội tụ ($p = \\frac{1}{2} < 1$), theo tiêu chuẩn tương đương thì $I = \\int_0^1 \\frac{dx}{\\sqrt{\\sin x}}$ <b>hội tụ</b>.",
            },
          ],
          trap: "Tiêu chuẩn so sánh và tương đương chỉ áp dụng cho hàm KHÔNG ÂM (hoặc giữ nguyên một dấu) gần điểm suy rộng; nếu hàm đổi dấu liên tục như $\\frac{\\sin x}{x}$, phải dùng hội tụ tuyệt đối hoặc Dirichlet/Abel.",
        },
      },
      {
        heading:
          "3.18. Hội tụ tuyệt đối, Tiêu chuẩn Dirichlet & Tiêu chuẩn Abel",
        content:
          "• <b>Hội tụ tuyệt đối:</b> $\\int_a^\\infty f(x)\\,dx$ gọi là <b>hội tụ tuyệt đối</b> nếu $\\int_a^\\infty |f(x)|\\,dx$ hội tụ. <i>Tính chất:</i> Hội tụ tuyệt đối $\\Rightarrow$ hội tụ.<br>" +
          "<i>Ví dụ:</i> $\\left|\\frac{\\sin x}{x^2}\\right| \\le \\frac{1}{x^2}$ ($x \\ge 1$), mà $\\int_1^\\infty x^{-2}\\,dx$ hội tụ nên $\\int_1^\\infty \\frac{\\sin x}{x^2}\\,dx$ hội tụ tuyệt đối.<br>" +
          "• <b>Tiêu chuẩn Dirichlet:</b> Nếu:<br>" +
          "- $F(t) = \\int_a^t f(x)\\,dx$ bị chặn với mọi $t \\ge a$;<br>" +
          "- $g(x)$ đơn điệu và $g(x) \\to 0$ khi $x \\to \\infty$,<br>" +
          "thì $\\int_a^\\infty f(x)g(x)\\,dx$ hội tụ. <i>(Điển hình: $f(x) = \\sin x$ hoặc $\\cos x$, còn $g(x)$ giảm về $0$).</i><br>" +
          "• <b>Tiêu chuẩn Abel:</b> Nếu $\\int_a^\\infty f(x)\\,dx$ hội tụ và $g(x)$ đơn điệu, bị chặn trên $[a, \\infty)$, thì $\\int_a^\\infty f(x)g(x)\\,dx$ hội tụ.<br>" +
          "<i>Nhận xét:</i> Dirichlet thường dùng khi $g(x) \\to 0$; Abel hữu ích khi $g$ không nhất thiết tiến về $0$ nhưng đơn điệu và bị chặn.",
        checkpoint: {
          question:
            "Ví dụ Dirichlet – hội tụ có điều kiện (Slide 64): Xét sự hội tụ và hội tụ tuyệt đối của $I = \\int_1^\\infty \\frac{\\sin x}{x}\\,dx$.",
          rubric: [
            {
              step: "Bước 1 • Chứng minh hội tụ bằng tiêu chuẩn Dirichlet (0.5đ)",
              detail:
                "Ta có $F(t) = \\int_1^t \\sin x\\,dx = \\cos 1 - \\cos t$ bị chặn ($|F(t)| \\le 2$), đồng thời $g(x) = \\frac{1}{x} \\searrow 0$ khi $x \\to \\infty$. Vì vậy $I$ hội tụ theo tiêu chuẩn Dirichlet.",
            },
            {
              step: "Bước 2 • Xét hội tụ tuyệt đối và kết luận (0.5đ)",
              detail:
                "Mặt khác, $\\int_1^\\infty \\frac{|\\sin x|}{x}\\,dx$ phân kỳ (do $\\frac{|\\sin x|}{x} \\ge \\frac{\\sin^2 x}{x} = \\frac{1 - \\cos 2x}{2x}$), nên $I$ chỉ <b>hội tụ có điều kiện</b> (bán hội tụ).",
            },
          ],
          trap: "Trong tiêu chuẩn Dirichlet, phải chỉ rõ cả 2 điều kiện: nguyên hàm $F(t)$ bị chặn trên $[a, +\\infty)$ VÀ $g(x)$ đơn điệu tiến về $0$ (nếu chỉ tiến về $0$ mà không đơn điệu thì chưa chắc hội tụ!).",
        },
      },
      {
        heading:
          "3.19. Tích phân có hai điểm suy rộng, Sơ đồ lựa chọn tiêu chuẩn & Tổng kết chương",
        content:
          "• <b>Sơ đồ lựa chọn tiêu chuẩn hội tụ (Slide 68):</b><br>" +
          "1) Xác định điểm suy rộng: $\\infty, \\; -\\infty$, hay điểm kỳ dị hữu hạn.<br>" +
          "2) Nếu có nhiều điểm suy rộng, <b>tách tích phân</b>.<br>" +
          "3) Nếu hàm không âm: so sánh với $1/x^p$ hoặc $1/(x - a)^p$; dùng so sánh trực tiếp, so sánh giới hạn hoặc tương đương.<br>" +
          "4) Nếu hàm đổi dấu: thử hội tụ tuyệt đối bằng $|f|$; nếu không tuyệt đối, kiểm tra Dirichlet/Abel.<br>" +
          "5) Chỉ sau khi kết luận hội tụ mới tính giá trị nếu bài toán yêu cầu.<br>" +
          "• <b>Tổng kết chương (Slide 78):</b><br>" +
          "- Nắm bảng nguyên hàm cơ bản và biết biến đổi biểu thức trước khi tích phân.<br>" +
          "- Nhận diện khi nào dùng đổi biến, đổi biến lượng giác hay tích phân từng phần.<br>" +
          "- Với hàm hữu tỷ: chia đa thức, phân tích mẫu, phân thức đơn giản, tích phân từng thành phần.<br>" +
          "- Tích phân xác định dựa trên Newton–Leibniz, kết hợp đổi biến và từng phần.<br>" +
          "- Ứng dụng tích phân để tính diện tích, thể tích, độ dài cung, diện tích mặt và đại lượng kinh tế.<br>" +
          "- Với tích phân suy rộng: xác định đúng điểm suy rộng, tách tích phân và chọn tiêu chuẩn hội tụ phù hợp.",
        checkpoint: {
          question:
            "Ví dụ (Slides 66 & 67): Xét sự hội tụ rồi tính giá trị của tích phân có hai điểm suy rộng $I = \\int_0^\\infty \\frac{dx}{\\sqrt{x}(1 + x)}$.",
          rubric: [
            {
              step: "Bước 1 • Tách tại x = 1 để xét hội tụ ở 0 và ở +∞ (0.5đ)",
              detail:
                "Phải tách $I = \\int_0^1 \\frac{dx}{\\sqrt{x}(1 + x)} + \\int_1^\\infty \\frac{dx}{\\sqrt{x}(1 + x)}$. Gần $0$, hàm tương đương $x^{-1/2}$ ($p = 1/2 < 1$) nên hội tụ. Ở vô cực, hàm tương đương $x^{-3/2}$ ($p = 3/2 > 1$) nên hội tụ. Do đó $I$ hội tụ.",
            },
            {
              step: "Bước 2 • Đặt x = t² để tính giá trị (0.5đ)",
              detail:
                "Đặt $x = t^2, \\; dx = 2t\\,dt$ ($x = 0 \\to t = 0, \\; x \\to \\infty \\to t \\to \\infty$): $$I = 2\\int_0^\\infty \\frac{dt}{1 + t^2} = 2[\\arctan t]_0^\\infty = 2 \\cdot \\frac{\\pi}{2} = \\pi.$$",
            },
          ],
          trap: "Lưu ý (Slide 67): Trước khi tính giá trị, phải bảo đảm tích phân được hiểu đúng theo nghĩa suy rộng và đã hội tụ!",
        },
      },
    ],
    exercises: [
      {
        level: "Cơ bản",
        question:
          "Bài tập 1 – Nguyên hàm và đổi biến: Tính:<br>1) $\\int (5x^4 - 3x + 2)\\,dx$.<br>2) $\\int \\frac{3x^2}{x^3 + 2}\\,dx$.<br>3) $\\int x\\sqrt{x^2 + 4}\\,dx$.<br>4) $\\int \\frac{2x + 1}{x^2 + x + 3}\\,dx$.<br>5) $\\int \\sqrt{9 - x^2}\\,dx$.<br>6) $\\int \\frac{dx}{\\sqrt{x^2 + 4}}$.",
        solution: `
        <div class="rubric-box">
          <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.15đ)</span> $\\int (5x^4 - 3x + 2)\\,dx = x^5 - \\frac{3}{2}x^2 + 2x + C$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.15đ)</span> Đặt $u = x^3 + 2 \\Rightarrow du = 3x^2\\,dx$: $\\int \\frac{du}{u} = \\ln|x^3 + 2| + C$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.15đ)</span> Đặt $u = x^2 + 4 \\Rightarrow du = 2x\\,dx$: $\\frac{1}{2}\\int u^{1/2}\\,du = \\frac{1}{3}(x^2 + 4)^{3/2} + C$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.15đ)</span> Đặt $u = x^2 + x + 3 \\Rightarrow du = (2x + 1)\\,dx$ (mẫu luôn dương): $\\ln(x^2 + x + 3) + C$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 5 (0.2đ)</span> Với $|x| < 3$, đặt $x = 3\\sin t, \\; t \\in (-\\frac{\\pi}{2}, \\frac{\\pi}{2})$ ($dx = 3\\cos t\\,dt, \\; \\sqrt{9 - x^2} = 3\\cos t$):
          $$I = 9\\int \\cos^2 t\\,dt = \\frac{9}{2}(t + \\sin t\\cos t) + C = \\frac{9}{2}\\arcsin\\frac{x}{3} + \\frac{x}{2}\\sqrt{9 - x^2} + C.$$</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 6 (0.2đ)</span> Đặt $x = 2\\tan t, \\; t \\in (-\\frac{\\pi}{2}, \\frac{\\pi}{2})$ ($dx = \\frac{2\\,dt}{\\cos^2 t}, \\; \\sqrt{x^2 + 4} = \\frac{2}{\\cos t}$):
          $$I = \\int \\frac{dt}{\\cos t} = \\ln|\\sec t + \\tan t| + C = \\ln\\left|\\frac{\\sqrt{x^2 + 4} + x}{2}\\right| + C = \\ln\\left(x + \\sqrt{x^2 + 4}\\right) + C_1.$$</div>
          <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Quên hằng số $+ C$ ở cuối hoặc quên thế ngược ẩn phụ $u, t$ về lại biến $x$.</div>
        </div>`,
      },
      {
        level: "Vừa",
        question:
          "Bài tập 2 – Tích phân từng phần: Tính:<br>1) $\\int x\\ln x\\,dx$.<br>2) $\\int x^2 e^{2x}\\,dx$.<br>3) $\\int x\\sin 3x\\,dx$.<br>4) $\\int \\arctan x\\,dx$.<br>5) $\\int e^{2x}\\cos x\\,dx$.<br>6) $\\int x^3 \\ln x\\,dx$.",
        solution: `
        <div class="rubric-box">
          <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.15đ)</span> ($x > 0$) Đặt $u = \\ln x, \\; dv = x\\,dx \\Rightarrow du = \\frac{dx}{x}, \\; v = \\frac{x^2}{2}$:
          $$I = \\frac{x^2}{2}\\ln x - \\frac{1}{2}\\int x\\,dx = \\frac{x^2}{2}\\ln x - \\frac{x^2}{4} + C.$$</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.2đ)</span> Từng phần 2 lần (chọn $u = x^2$ rồi $u = x$):
          $$I = \\frac{x^2}{2}e^{2x} - \\int x e^{2x}\\,dx = \\frac{x^2}{2}e^{2x} - \\left(\\frac{x}{2}e^{2x} - \\frac{1}{4}e^{2x}\\right) + C = e^{2x}\\left(\\frac{x^2}{2} - \\frac{x}{2} + \\frac{1}{4}\\right) + C.$$</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.15đ)</span> Đặt $u = x, \\; dv = \\sin 3x\\,dx \\Rightarrow v = -\\frac{1}{3}\\cos 3x$:
          $$I = -\\frac{x}{3}\\cos 3x + \\frac{1}{3}\\int \\cos 3x\\,dx = -\\frac{x}{3}\\cos 3x + \\frac{1}{9}\\sin 3x + C.$$</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.15đ)</span> Đặt $u = \\arctan x, \\; dv = dx \\Rightarrow du = \\frac{dx}{1 + x^2}, \\; v = x$:
          $$I = x\\arctan x - \\int \\frac{x}{1 + x^2}\\,dx = x\\arctan x - \\frac{1}{2}\\ln(1 + x^2) + C.$$</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 5 (0.2đ)</span> Từng phần vòng lặp 2 lần với $u = \\cos x$ rồi $u = \\sin x$: $I = \\frac{1}{2}e^{2x}\\cos x + \\frac{1}{2}\\left(\\frac{1}{2}e^{2x}\\sin x - \\frac{1}{2}I\\right) \\iff \\frac{5}{4}I = \\frac{e^{2x}}{4}(2\\cos x + \\sin x)$, suy ra:
          $$I = \\frac{e^{2x}}{5}(2\\cos x + \\sin x) + C.$$</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 6 (0.15đ)</span> ($x > 0$) Đặt $u = \\ln x, \\; dv = x^3\\,dx \\Rightarrow v = \\frac{x^4}{4}$:
          $$I = \\frac{x^4}{4}\\ln x - \\frac{1}{4}\\int x^3\\,dx = \\frac{x^4}{4}\\ln x - \\frac{x^4}{16} + C.$$</div>
          <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Trong tích phân chứa $\\ln x$ hoặc $\\arctan x$, luôn đặt chúng làm $u$ theo quy tắc LIATE, đừng đặt ngược làm $dv$.</div>
        </div>`,
      },
      {
        level: "Vừa",
        question:
          "Bài tập 3 – Hàm lượng giác: Tính:<br>1) $\\int \\sin^3 x \\cos^4 x\\,dx$.<br>2) $\\int \\sin^4 x\\,dx$.<br>3) $\\int \\sin 2x \\sin 5x\\,dx$.<br>4) $\\int \\cos^3 x \\sin^2 x\\,dx$.<br>5) $\\int \\frac{\\sin x}{1 + \\cos x}\\,dx$.<br>6) $\\int \\tan^2 x\\,dx$.",
        solution: `
        <div class="rubric-box">
          <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.15đ)</span> Tách $\\sin x\\,dx$, đặt $u = \\cos x \\Rightarrow du = -\\sin x\\,dx$:
          $$I = -\\int (1 - u^2)u^4\\,du = \\int (u^6 - u^4)\\,du = \\frac{\\cos^7 x}{7} - \\frac{\\cos^5 x}{5} + C.$$</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.2đ)</span> Hạ bậc 2 lần: $\\sin^4 x = \\left(\\frac{1 - \\cos 2x}{2}\\right)^2 = \\frac{1}{4}\\left(1 - 2\\cos 2x + \\frac{1 + \\cos 4x}{2}\\right) = \\frac{3}{8} - \\frac{1}{2}\\cos 2x + \\frac{1}{8}\\cos 4x$:
          $$I = \\frac{3x}{8} - \\frac{\\sin 2x}{4} + \\frac{\\sin 4x}{32} + C.$$</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.15đ)</span> Dùng công thức tích–tổng $\\sin 2x\\sin 5x = \\frac{1}{2}(\\cos 3x - \\cos 7x)$:
          $$I = \\frac{1}{2}\\int (\\cos 3x - \\cos 7x)\\,dx = \\frac{\\sin 3x}{6} - \\frac{\\sin 7x}{14} + C.$$</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.15đ)</span> Tách $\\cos x\\,dx$, đặt $u = \\sin x \\Rightarrow du = \\cos x\\,dx$:
          $$I = \\int (1 - u^2)u^2\\,du = \\frac{\\sin^3 x}{3} - \\frac{\\sin^5 x}{5} + C.$$</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 5 (0.15đ)</span> Đặt $u = 1 + \\cos x \\Rightarrow du = -\\sin x\\,dx$: $I = -\\int \\frac{du}{u} = -\\ln|1 + \\cos x| + C$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 6 (0.2đ)</span> Dùng $\\tan^2 x = \\frac{1}{\\cos^2 x} - 1$: $I = \\int \\left(\\frac{1}{\\cos^2 x} - 1\\right)dx = \\tan x - x + C$.</div>
          <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Với $\\sin^4 x$ cần hạ bậc ĐỦ 2 lần; đừng quên $\\cos^2 2x = \\frac{1 + \\cos 4x}{2}$ ở lần hạ bậc thứ hai.</div>
        </div>`,
      },
      {
        level: "Khó",
        question:
          "Bài tập 4 – Hàm hữu tỷ: Tính:<br>1) $\\int \\frac{3x + 5}{x^2 + 3x + 2}\\,dx$.<br>2) $\\int \\frac{dx}{x(x - 1)^2}$.<br>3) $\\int \\frac{x + 2}{x^2 + 4x + 8}\\,dx$.<br>4) $\\int \\frac{dx}{x^3 + 1}$.<br>5) $\\int \\frac{x^2 + 1}{x^2 - 1}\\,dx$.<br>6) $\\int \\frac{2x^2 + 3x + 1}{(x + 1)(x^2 + 1)}\\,dx$.",
        solution: `
        <div class="rubric-box">
          <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.15đ)</span> $\\frac{3x + 5}{(x + 1)(x + 2)} = \\frac{2}{x + 1} + \\frac{1}{x + 2} \\Rightarrow I = 2\\ln|x + 1| + \\ln|x + 2| + C$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.15đ)</span> $\\frac{1}{x(x - 1)^2} = \\frac{1}{x} - \\frac{1}{x - 1} + \\frac{1}{(x - 1)^2} \\Rightarrow I = \\ln|x| - \\ln|x - 1| - \\frac{1}{x - 1} + C$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.15đ)</span> Nhận xét $(x^2 + 4x + 8)' = 2x + 4 = 2(x + 2)$: $I = \\frac{1}{2}\\int \\frac{2x + 4}{x^2 + 4x + 8}\\,dx = \\frac{1}{2}\\ln(x^2 + 4x + 8) + C$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.2đ)</span> Phân tích $\\frac{1}{x^3 + 1} = \\frac{1/3}{x + 1} + \\frac{(-1/3)x + 2/3}{x^2 - x + 1}$, tách đạo hàm mẫu và hoàn thành bình phương:
          $$I = \\frac{1}{3}\\ln|x + 1| - \\frac{1}{6}\\ln(x^2 - x + 1) + \\frac{1}{\\sqrt{3}}\\arctan\\frac{2x - 1}{\\sqrt{3}} + C.$$</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 5 (0.15đ)</span> Chia đa thức: $\\frac{x^2 + 1}{x^2 - 1} = 1 + \\frac{2}{x^2 - 1} = 1 + \\frac{1}{x - 1} - \\frac{1}{x + 1} \\Rightarrow I = x + \\ln\\left|\\frac{x - 1}{x + 1}\\right| + C$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 6 (0.2đ)</span> Rút gọn nhân tử chung $2x^2 + 3x + 1 = (x + 1)(2x + 1)$ (với $x \\neq -1$):
          $$I = \\int \\frac{2x + 1}{x^2 + 1}\\,dx = \\int \\frac{2x}{x^2 + 1}\\,dx + \\int \\frac{dx}{x^2 + 1} = \\ln(x^2 + 1) + \\arctan x + C.$$</div>
          <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Ở câu 6) nếu đặt phân thức $\\frac{A}{x+1} + \\frac{Bx+C}{x^2+1}$ sẽ tìm được $A = 0$, nhưng phát hiện rút gọn $(x + 1)$ ngay từ đầu giúp giải nhanh gấp 5 lần; ở câu 5) nhớ chia đa thức vì bậc tử bằng bậc mẫu!</div>
        </div>`,
      },
      {
        level: "Cơ bản",
        question:
          "Bài tập 5 – Tích phân xác định: Tính:<br>1) $\\int_0^2 x\\sqrt{x^2 + 1}\\,dx$.<br>2) $\\int_0^1 x\\ln(1 + x)\\,dx$.<br>3) $\\int_{-1}^1 (x^5 + 2x^2)\\,dx$.<br>4) $\\int_0^{\\pi/2} \\sin^3 x\\,dx$.<br>5) $\\int_0^2 \\sqrt{4 - x^2}\\,dx$.<br>6) $\\int_0^1 \\frac{x}{1 + x^2}\\,dx$.",
        solution: `
        <div class="rubric-box">
          <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.15đ)</span> Đặt $u = x^2 + 1$ ($x = 0 \\to u = 1, \\; x = 2 \\to u = 5$): $\\frac{1}{2}\\int_1^5 \\sqrt{u}\\,du = \\left[\\frac{u^{3/2}}{3}\\right]_1^5 = \\frac{5\\sqrt{5} - 1}{3}$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.2đ)</span> Từng phần với $u = \\ln(1 + x), \\; dv = x\\,dx$, chọn $v = \\frac{x^2 - 1}{2}$:
          $$I = \\left[\\frac{x^2 - 1}{2}\\ln(1 + x)\\right]_0^1 - \\frac{1}{2}\\int_0^1 (x - 1)\\,dx = 0 - \\frac{1}{2}\\left[\\frac{x^2}{2} - x\\right]_0^1 = \\frac{1}{4}.$$</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.15đ)</span> Tính đối xứng trên $[-1, 1]$ ($x^5$ lẻ, $2x^2$ chẵn): $I = 0 + 2\\int_0^1 2x^2\\,dx = 4\\left[\\frac{x^3}{3}\\right]_0^1 = \\frac{4}{3}$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.15đ)</span> Đặt $u = \\cos x$ ($x = 0 \\to 1, \\; \\frac{\\pi}{2} \\to 0$): $I = \\int_0^1 (1 - u^2)\\,du = \\left[u - \\frac{u^3}{3}\\right]_0^1 = \\frac{2}{3}$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 5 (0.2đ)</span> Đặt $x = 2\\sin t$ ($0 \\to 0, \\; 2 \\to \\frac{\\pi}{2}$): $I = 4\\int_0^{\\pi/2} \\cos^2 t\\,dt = 2\\int_0^{\\pi/2} (1 + \\cos 2t)\\,dt = \\pi$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 6 (0.15đ)</span> Đặt $u = 1 + x^2$ ($0 \\to 1, \\; 1 \\to 2$): $I = \\frac{1}{2}\\int_1^2 \\frac{du}{u} = \\frac{1}{2}\\ln 2$.</div>
          <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Mọi phép đổi biến trong tích phân xác định đều BẮT BUỘC phải đổi cận tương ứng ngay tại bước đặt ẩn phụ.</div>
        </div>`,
      },
      {
        level: "Vừa",
        question:
          "Bài tập 6 – Ứng dụng:<br>1) Tính diện tích miền giới hạn bởi $y = x^2$ và $y = 2x$.<br>2) Tính diện tích miền giới hạn bởi $y = x^2 - 1$ và trục $Ox$ trên $[-2, 2]$.<br>3) Tính thể tích khi quay miền $0 \\le y \\le x^2, \\; 0 \\le x \\le 1$ quanh $Ox$.<br>4) Tính thể tích khi quay miền $0 \\le y \\le 1 - x, \\; 0 \\le x \\le 1$ quanh $Oy$.<br>5) Tính độ dài cung $y = \\frac{2}{3}x^{3/2}, \\; 0 \\le x \\le 3$.<br>6) Biết $C'(q) = 6q + 8, \\; C(0) = 50$, tìm $C(10)$.",
        solution: `
        <div class="rubric-box">
          <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.15đ)</span> Giao điểm $x^2 = 2x \\iff x = 0, \\; x = 2$. Trên $[0, 2]$ có $2x \\ge x^2$: $S = \\int_0^2 (2x - x^2)\\,dx = \\left[x^2 - \\frac{x^3}{3}\\right]_0^2 = \\frac{4}{3}$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.2đ)</span> Trên $[-2, 2]$, $x^2 - 1$ đổi dấu tại $x = \\pm 1$ và là hàm chẵn:
          $$S = \\int_{-2}^2 |x^2 - 1|\\,dx = 2\\left[\\int_0^1 (1 - x^2)\\,dx + \\int_1^2 (x^2 - 1)\\,dx\\right] = 2\\left(\\frac{2}{3} + \\frac{4}{3}\\right) = 4.$$</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.15đ)</span> Quay quanh $Ox$: $V = \\pi\\int_0^1 (x^2)^2\\,dx = \\pi\\int_0^1 x^4\\,dx = \\frac{\\pi}{5}$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.2đ)</span> Dùng phương pháp vỏ trụ quanh $Oy$: $V = 2\\pi\\int_0^1 x(1 - x)\\,dx = 2\\pi\\left[\\frac{x^2}{2} - \\frac{x^3}{3}\\right]_0^1 = \\frac{\\pi}{3}$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 5 (0.15đ)</span> Ta có $y' = x^{1/2} \\Rightarrow 1 + [y']^2 = 1 + x$:
          $$L = \\int_0^3 \\sqrt{1 + x}\\,dx = \\left[\\frac{2}{3}(1 + x)^{3/2}\\right]_0^3 = \\frac{2}{3}(8 - 1) = \\frac{14}{3}.$$</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 6 (0.15đ)</span> $C(10) = C(0) + \\int_0^{10} (6q + 8)\\,dq = 50 + [3q^2 + 8q]_0^{10} = 50 + 380 = 430$.</div>
          <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Ở câu 2) nhiều bạn quên trị tuyệt đối $|x^2 - 1|$ và tính thẳng $\\int_{-2}^2 (x^2 - 1)\\,dx = \\frac{4}{3}$ (sai vì phần âm nằm dưới trục hoành bị trừ mất!).</div>
        </div>`,
      },
      {
        level: "Vừa",
        question:
          "Bài tập 7 – Tích phân suy rộng loại 1: Xét hội tụ/phân kỳ; tính giá trị nếu có thể:<br>1) $\\int_1^\\infty \\frac{dx}{x^{5/4}}$.<br>2) $\\int_1^\\infty \\frac{dx}{x + \\sqrt{x}}$.<br>3) $\\int_1^\\infty \\frac{x + 3}{x^3 + 1}\\,dx$.<br>4) $\\int_0^\\infty e^{-2x}\\,dx$.<br>5) $\\int_1^\\infty \\frac{\\sin x}{x}\\,dx$.<br>6) $\\int_{-\\infty}^{+\\infty} \\frac{dx}{1 + x^2}$.",
        solution: `
        <div class="rubric-box">
          <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.15đ)</span> Tiêu chuẩn $p$ ở vô cực với $p = \\frac{5}{4} > 1 \\Rightarrow$ <b>hội tụ</b>. Giá trị: $\\lim_{b \\to \\infty} [-4x^{-1/4}]_1^b = 4$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.15đ)</span> Khi $x \\to \\infty$, $\\frac{1}{x + \\sqrt{x}} \\sim \\frac{1}{x}$. Vì $\\int_1^\\infty \\frac{dx}{x}$ phân kỳ ($p = 1$) nên tích phân <b>phân kỳ</b>.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.2đ)</span> Khi $x \\to \\infty$, $\\frac{x + 3}{x^3 + 1} \\sim \\frac{1}{x^2}$ ($p = 2 > 1$) nên tích phân <b>hội tụ</b>. Phân tích hữu tỷ $\\frac{x+3}{x^3+1} = \\frac{2/3}{x+1} - \\frac{1}{3}\\frac{2x-1}{x^2-x+1} + \\frac{2}{(x-1/2)^2+3/4}$ cho giá trị chính xác $\\frac{4\\pi}{3\\sqrt{3}} - \\frac{2}{3}\\ln 2$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.15đ)</span> $\\lim_{b \\to +\\infty} \\int_0^b e^{-2x}\\,dx = \\lim_{b \\to +\\infty} \\left[-\\frac{1}{2}e^{-2x}\\right]_0^b = \\frac{1}{2}$ (<b>hội tụ</b>, giá trị $\\frac{1}{2}$).</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 5 (0.2đ)</span> Vì $F(t) = \\int_1^t \\sin x\\,dx = \\cos 1 - \\cos t$ bị chặn và $\\frac{1}{x} \\searrow 0$ khi $x \\to \\infty$, tích phân <b>hội tụ</b> theo tiêu chuẩn Dirichlet (hội tụ có điều kiện, không tính được bằng nguyên hàm sơ cấp).</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 6 (0.15đ)</span> Tách tại $0$: $\\int_{-\\infty}^0 \\frac{dx}{1 + x^2} + \\int_0^{+\\infty} \\frac{dx}{1 + x^2} = \\frac{\\pi}{2} + \\frac{\\pi}{2} = \\pi$ (<b>hội tụ</b>, giá trị $\\pi$).</div>
          <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Ở câu 6) bắt buộc phải tách $\\int_{-\\infty}^{+\\infty} = \\int_{-\\infty}^0 + \\int_0^{+\\infty}$ và lấy hai giới hạn độc lập, không viết gộp $\\lim_{A\\to\\infty}[\\arctan x]_{-A}^A$.</div>
        </div>`,
      },
      {
        level: "Vừa",
        question:
          "Bài tập 8 – Tích phân suy rộng loại 2: Xét hội tụ/phân kỳ; tính giá trị nếu có thể:<br>1) $\\int_0^1 \\frac{dx}{x^{3/4}}$.<br>2) $\\int_0^1 \\frac{dx}{x^{4/3}}$.<br>3) $\\int_0^1 \\frac{dx}{e^x - 1}$.<br>4) $\\int_0^1 \\frac{dx}{\\sqrt{\\sin x}}$.<br>5) $\\int_{-1}^1 \\frac{dx}{|x|^{1/2}}$.<br>6) $\\int_0^1 \\ln x\\,dx$.",
        solution: `
        <div class="rubric-box">
          <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.15đ)</span> Điểm kỳ dị $x = 0$, tiêu chuẩn $p$ gần $0$ có $p = \\frac{3}{4} < 1 \\Rightarrow$ <b>hội tụ</b>. Giá trị: $\\lim_{\\varepsilon \\to 0^+} [4x^{1/4}]_\\varepsilon^1 = 4$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.15đ)</span> Điểm kỳ dị $x = 0$, tiêu chuẩn $p$ gần $0$ có $p = \\frac{4}{3} \\ge 1 \\Rightarrow$ <b>phân kỳ</b>.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.15đ)</span> Khi $x \\to 0^+$, $e^x - 1 \\sim x \\Rightarrow \\frac{1}{e^x - 1} \\sim \\frac{1}{x}$. Vì $\\int_0^1 \\frac{dx}{x}$ phân kỳ ($p = 1$) nên tích phân <b>phân kỳ</b>.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.15đ)</span> Khi $x \\to 0^+$, $\\sin x \\sim x \\Rightarrow \\frac{1}{\\sqrt{\\sin x}} \\sim \\frac{1}{x^{1/2}}$. Vì $\\int_0^1 \\frac{dx}{x^{1/2}}$ hội tụ ($p = \\frac{1}{2} < 1$) nên tích phân <b>hội tụ</b>.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 5 (0.2đ)</span> Kỳ dị tại $x = 0 \\in (-1, 1)$, tách $\\int_{-1}^0 + \\int_0^1$. Hàm chẵn và $\\int_0^1 x^{-1/2}\\,dx = \\lim_{\\varepsilon \\to 0^+} [2\\sqrt{x}]_\\varepsilon^1 = 2$ (hội tụ vì $p = 1/2 < 1$), nên tích phân <b>hội tụ</b> và bằng $2 + 2 = 4$.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 6 (0.2đ)</span> Kỳ dị tại $x = 0$ ($\\ln x \\to -\\infty$). Dùng định nghĩa giới hạn và từng phần:
          $$\\int_0^1 \\ln x\\,dx = \\lim_{\\varepsilon \\to 0^+} [x\\ln x - x]_\\varepsilon^1 = \\lim_{\\varepsilon \\to 0^+} (-1 - \\varepsilon\\ln\\varepsilon + \\varepsilon) = -1$$ (hội tụ, giá trị $-1$).</div>
          <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Ở câu 5) điểm kỳ dị $x = 0$ nằm giữa đoạn $[-1, 1]$ nên bắt buộc phải tách thành $\\int_{-1}^0 + \\int_0^1$.</div>
        </div>`,
      },
      {
        level: "Khó",
        question:
          "Bài tập 9 – Tổng hợp tiêu chuẩn hội tụ: Xét sự hội tụ và nêu rõ tiêu chuẩn sử dụng:<br>1) $\\int_1^\\infty \\frac{\\ln x}{x^2}\\,dx$.<br>2) $\\int_1^\\infty \\frac{\\cos x}{x^{3/2}}\\,dx$.<br>3) $\\int_1^\\infty \\frac{\\cos x}{x}\\,dx$.<br>4) $\\int_0^1 \\frac{\\sin x}{x^{3/2}}\\,dx$.<br>5) $\\int_0^\\infty \\frac{dx}{\\sqrt{x}(1 + x^2)}$.<br>6) $\\int_0^1 \\frac{\\ln(1 + x)}{x^{3/2}}\\,dx$.",
        solution: `
        <div class="rubric-box">
          <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.15đ)</span> Chọn $g(x) = \\frac{1}{x^{3/2}}$. Ta có $\\lim_{x \\to \\infty} \\frac{(\\ln x)/x^2}{1/x^{3/2}} = \\lim_{x \\to \\infty} \\frac{\\ln x}{\\sqrt{x}} = 0$ (nên $\\frac{\\ln x}{x^2} \\le \\frac{1}{x^{3/2}}$ khi $x$ đủ lớn). Mà $\\int_1^\\infty \\frac{dx}{x^{3/2}}$ hội tụ ($p = 3/2 > 1$) $\\Rightarrow$ <b>hội tụ</b> theo <b>tiêu chuẩn so sánh</b>.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.15đ)</span> Có $\\left|\\frac{\\cos x}{x^{3/2}}\\right| \\le \\frac{1}{x^{3/2}}$ ($x \\ge 1$). Vì $\\int_1^\\infty \\frac{dx}{x^{3/2}}$ hội tụ ($p = 3/2 > 1$) nên theo <b>tiêu chuẩn so sánh trực tiếp</b> và <b>hội tụ tuyệt đối</b>, tích phân <b>hội tụ tuyệt đối</b> (nên hội tụ).</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.2đ)</span> Dùng <b>tiêu chuẩn Dirichlet</b>: $F(t) = \\int_1^t \\cos x\\,dx = \\sin t - \\sin 1$ bị chặn ($|F(t)| \\le 2$), và $g(x) = \\frac{1}{x}$ đơn điệu giảm về $0$ khi $x \\to \\infty$. Vậy tích phân <b>hội tụ</b> (hội tụ có điều kiện).</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.15đ)</span> Kỳ dị $x = 0$. Khi $x \\to 0^+$, $\\sin x \\sim x \\Rightarrow \\frac{\\sin x}{x^{3/2}} \\sim \\frac{1}{x^{1/2}}$. Vì $\\int_0^1 \\frac{dx}{x^{1/2}}$ hội tụ ($p = 1/2 < 1$), theo <b>tiêu chuẩn tương đương</b> (hoặc <b>so sánh giới hạn</b>), tích phân <b>hội tụ</b>.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 5 (0.2đ)</span> Có 2 điểm suy rộng ($0$ và $+\\infty$), tách $\\int_0^1 + \\int_1^\\infty$: gần $0^+$, $\\frac{1}{\\sqrt{x}(1+x^2)} \\sim \\frac{1}{x^{1/2}}$ ($p = 1/2 < 1$, hội tụ); khi $x \\to +\\infty$, $\\frac{1}{\\sqrt{x}(1+x^2)} \\sim \\frac{1}{x^{5/2}}$ ($p = 5/2 > 1$, hội tụ). Theo <b>tiêu chuẩn tương đương</b>, cả hai phần đều hội tụ nên tích phân đã cho <b>hội tụ</b>.</div>
          <div class="rubric-step"><span class="rubric-tag">Câu 6 (0.15đ)</span> Kỳ dị $x = 0$. Khi $x \\to 0^+$, $\\ln(1 + x) \\sim x \\Rightarrow \\frac{\\ln(1 + x)}{x^{3/2}} \\sim \\frac{1}{x^{1/2}}$. Vì $\\int_0^1 \\frac{dx}{x^{1/2}}$ hội tụ ($p = 1/2 < 1$), theo <b>tiêu chuẩn tương đương</b> (hoặc <b>so sánh giới hạn</b>), tích phân <b>hội tụ</b>.</div>
          <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Đề yêu cầu nêu rõ tên tiêu chuẩn sử dụng — ở câu 2) là hội tụ tuyệt đối + so sánh trực tiếp, câu 3) là Dirichlet, câu 4, 5, 6) là tương đương / so sánh giới hạn!</div>
        </div>`,
      },
    ],
    quiz: [
      {
        question:
          "Theo quy tắc LIATE, khi tính nguyên hàm $\\int x^2 \\arctan x\\,dx$, ta ưu tiên đặt $u$ bằng:",
        options: ["$\\arctan x$", "$x^2$", "$x^2 \\arctan x$", "$1$"],
        answer: 0,
        explanation:
          "Thứ tự ưu tiên LIATE: Logarithm -> Inverse trig -> Algebraic -> Trig -> Exponential. Hàm lượng giác ngược $\\arctan x$ đứng trước đa thức $x^2$.",
      },
      {
        question:
          "Để tính tích phân bất định chứa biểu thức $\\sqrt{a^2 + x^2}$ ($a > 0$), phép đổi biến lượng giác chuẩn là:",
        options: [
          "$x = a\\sin t$",
          "$x = a\\tan t$",
          "$x = a\\sec t$",
          "$x = a\\cos t$",
        ],
        answer: 1,
        explanation:
          "Đặt $x = a\\tan t$ và dùng hằng đẳng thức $1 + \\tan^2 t = \\sec^2 t = \\frac{1}{\\cos^2 t}$ để khử căn $\\sqrt{a^2 + x^2}$.",
      },
      {
        question:
          "Khi phân tích phân thức thực sự có nhân tử lặp $(x - 1)^2$ ở mẫu như $\\frac{1}{x(x - 1)^2}$, dạng phân tích đúng là:",
        options: [
          "$\\frac{A}{x} + \\frac{B}{(x - 1)^2}$",
          "$\\frac{A}{x} + \\frac{Bx + C}{(x - 1)^2}$",
          "$\\frac{A}{x} + \\frac{B}{x - 1} + \\frac{C}{(x - 1)^2}$",
          "$\\frac{A}{x} + \\frac{B}{x - 1}$",
        ],
        answer: 2,
        explanation:
          "Mỗi nhân tử tuyến tính $(x - a)^m$ tạo $m$ hạng tử $\\frac{A_1}{x-a} + \\dots + \\frac{A_m}{(x-a)^m}$.",
      },
      {
        question:
          "Giá trị của tích phân xác định $\\int_{-2}^2 (x^3 + x^2)\\,dx$ bằng:",
        options: ["$0$", "$\\frac{16}{3}$", "$\\frac{8}{3}$", "$8$"],
        answer: 1,
        explanation:
          "$x^3$ là hàm lẻ nên tích phân trên $[-2, 2]$ bằng $0$; $x^2$ là hàm chẵn nên $\\int_{-2}^2 x^2\\,dx = 2\\int_0^2 x^2\\,dx = \\frac{16}{3}$.",
      },
      {
        question:
          "Quay miền phẳng $0 \\le y \\le f(x), \\; a \\le x \\le b$ ($a \\ge 0$) quanh trục $Oy$, công thức thể tích theo phương pháp vỏ trụ là:",
        options: [
          "$\\pi\\int_a^b [f(x)]^2\\,dx$",
          "$2\\pi\\int_a^b x f(x)\\,dx$",
          "$2\\pi\\int_a^b f(x)\\,dx$",
          "$\\pi\\int_a^b x[f(x)]^2\\,dx$",
        ],
        answer: 1,
        explanation:
          "Phương pháp vỏ trụ quay quanh trục $Oy$ cho $V = 2\\pi\\int_a^b x f(x)\\,dx$.",
      },
      {
        question:
          "Cặp điều kiện nào sau đây cho biết cả hai tích phân suy rộng đều HỘI TỤ?",
        options: [
          "$\\int_1^{+\\infty} \\frac{dx}{x^p}$ với $p > 1$ và $\\int_0^1 \\frac{dx}{x^p}$ với $p < 1$",
          "$\\int_1^{+\\infty} \\frac{dx}{x^p}$ với $p < 1$ và $\\int_0^1 \\frac{dx}{x^p}$ với $p > 1$",
          "$\\int_1^{+\\infty} \\frac{dx}{x^p}$ với $p \\ge 1$ và $\\int_0^1 \\frac{dx}{x^p}$ với $p \\le 1$",
          "$\\int_1^{+\\infty} \\frac{dx}{x^p}$ với $p > 1$ và $\\int_0^1 \\frac{dx}{x^p}$ với $p > 1$",
        ],
        answer: 0,
        explanation:
          "Tiêu chuẩn $p$ ở vô cực hội tụ khi $p > 1$, còn gần điểm kỳ dị $0$ hội tụ khi $p < 1$.",
      },
      {
        question:
          "Tích phân suy rộng $I = \\int_1^\\infty \\frac{\\sin x}{x}\\,dx$ có tính chất nào sau đây?",
        options: [
          "Phân kỳ",
          "Hội tụ tuyệt đối",
          "Hội tụ có điều kiện (theo tiêu chuẩn Dirichlet)",
          "Không thể kết luận bằng các tiêu chuẩn đã học",
        ],
        answer: 2,
        explanation:
          "$\\int_1^t \\sin x\\,dx$ bị chặn và $\\frac{1}{x} \\searrow 0$ nên $I$ hội tụ theo Dirichlet, nhưng $\\int_1^\\infty \\frac{|\\sin x|}{x}\\,dx$ phân kỳ nên chỉ hội tụ có điều kiện.",
      },
      {
        question:
          "Tích phân suy rộng $I = \\int_0^\\infty \\frac{dx}{\\sqrt{x}(1 + x)}$ có giá trị bằng:",
        options: ["$\\frac{\\pi}{2}$", "$\\pi$", "$2\\pi$", "Phân kỳ"],
        answer: 1,
        explanation:
          "Tách tại $x = 1$ kiểm tra được $I$ hội tụ ở cả $0$ và $+\\infty$. Đặt $x = t^2 \\Rightarrow I = 2\\int_0^\\infty \\frac{dt}{1 + t^2} = 2\\cdot\\frac{\\pi}{2} = \\pi$.",
      },
    ],
  },

  // =========================================================================
  // CHƯƠNG 4: GIẢI TÍCH 1 - CHUỖI SỐ, CHUỖI HÀM, CHUỖI LŨY THỪA VÀ CHUỖI TAYLOR
  // =========================================================================
  {
    id: "gt-c4",
    code: "GIẢI TÍCH 1 • CHƯƠNG 4",
    subject: "Giải tích 1",
    level: "Nâng cao",
    title: "Chuỗi số, Chuỗi hàm, Chuỗi lũy thừa và Chuỗi Taylor",
    summary:
      "Chuỗi số (tổng riêng, chuỗi hình học, telescoping, điều kiện cần, chuỗi điều hòa); Chuỗi số không âm (so sánh trực tiếp, so sánh giới hạn, chuỗi p, tích phân, D’Alembert, Cauchy); Chuỗi đan dấu Leibniz & ước lượng sai số, hội tụ tuyệt đối & có điều kiện; Chuỗi hàm (hội tụ điểm, hội tụ đều, Weierstrass M-test, tích phân & đạo hàm từng số hạng); Chuỗi lũy thừa (Abel, bán kính hội tụ R) và Chuỗi Taylor–Maclaurin.",
    previewFormula:
      "$$R = \\frac{1}{\\lim_{n \\to \\infty} \\left|\\frac{a_{n+1}}{a_n}\\right|}, \\quad f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(x_0)}{n!}(x - x_0)^n$$",
    bannerGradient: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)",
    theory: [
      {
        heading:
          "4.1. Định nghĩa chuỗi số, Chuỗi hình học & Chuỗi rút gọn (Telescoping)",
        content:
          "• <b>Định nghĩa chuỗi số:</b> Với dãy số $(a_n)$, biểu thức $\\sum_{n=1}^{\\infty} a_n$ là một <b>chuỗi số</b>. Tổng riêng thứ $N$ là $S_N = \\sum_{n=1}^{N} a_n$.<br>" +
          "- Chuỗi <b>hội tụ</b> nếu $S_N \\to S \\in \\mathbb{R}$; khi đó $\\sum_{n=1}^{\\infty} a_n = S$.<br>" +
          "- Nếu $(S_N)$ không có giới hạn hữu hạn thì chuỗi <b>phân kỳ</b>.<br>" +
          "- Phần dư sau $N$ số hạng: $R_N = S - S_N = \\sum_{n=N+1}^{\\infty} a_n$ (khi chuỗi hội tụ).<br>" +
          "• <b>Chuỗi hình học:</b> Với $a \\neq 0$, $\\sum_{n=0}^{\\infty} a q^n$ hội tụ khi và chỉ khi $|q| < 1$, và $S = \\frac{a}{1 - q}$, với $S_N = a\\frac{1 - q^{N+1}}{1 - q}$ ($q \\neq 1$).<br>" +
          "<i>Ví dụ (Slide 5):</i> Tính $\\sum_{n=1}^{\\infty} 3\\left(\\frac{1}{4}\\right)^n$. Đây là chuỗi hình học có số hạng đầu $3/4$, công bội $1/4$; do đó $S = \\frac{3/4}{1 - 1/4} = 1$. <i>(Chú ý: điều kiện là $|q| < 1$, không chỉ $q < 1$).</i>",
        checkpoint: {
          question:
            "Ví dụ chuỗi rút gọn / telescoping (Slide 6): Tính tổng của chuỗi $\\sum_{n=1}^{\\infty} \\frac{2}{n(n + 2)}$.",
          rubric: [
            {
              step: "Bước 1 • Tách phân thức và viết tổng riêng S_N (0.5đ)",
              detail:
                "Ta có $\\frac{2}{n(n + 2)} = \\frac{1}{n} - \\frac{1}{n + 2}$. Do đó tổng riêng thứ $N$ rút gọn chéo thành: $$S_N = \\sum_{n=1}^{N} \\left(\\frac{1}{n} - \\frac{1}{n + 2}\\right) = 1 + \\frac{1}{2} - \\frac{1}{N + 1} - \\frac{1}{N + 2}.$$",
            },
            {
              step: "Bước 2 • Lấy giới hạn khi N → ∞ (0.5đ)",
              detail:
                "Cho $N \\to \\infty$, ta được $S_N \\longrightarrow 1 + \\frac{1}{2} = \\frac{3}{2}$. Vậy chuỗi hội tụ và có tổng bằng $\\frac{3}{2}$.",
            },
          ],
          trap: "Khi tách chuỗi telescoping dạng $\\frac{1}{n} - \\frac{1}{n + 2}$ (lệch $2$ đơn vị), sẽ còn lại HAI số hạng đầu ($1 + \\frac{1}{2}$) chứ không phải một số hạng!",
        },
      },
      {
        heading:
          "4.2. Điều kiện cần để chuỗi hội tụ, Chuỗi điều hòa & Tính chất cơ bản",
        content:
          "• <b>Định lý (Điều kiện cần):</b> Nếu $\\sum a_n$ hội tụ thì $\\lim_{n \\to \\infty} a_n = 0$. <i>Chứng minh:</i> $a_n = S_n - S_{n-1} \\to S - S = 0$.<br>" +
          "- <b>Cảnh báo:</b> Chiều đảo <b>không đúng</b>: $a_n \\to 0$ chưa đủ để kết luận chuỗi hội tụ.<br>" +
          "- <i>Ví dụ (Slide 7):</i> $\\sum_{n=1}^{\\infty} \\frac{n}{2n + 1}$ phân kỳ vì $\\lim \\frac{n}{2n + 1} = \\frac{1}{2} \\neq 0$.<br>" +
          "• <b>Chuỗi điều hòa phân kỳ (Slide 8):</b> $\\sum_{n=1}^{\\infty} \\frac{1}{n} = 1 + \\frac{1}{2} + \\frac{1}{3} + \\cdots$. Nhóm số hạng: $1 + \\frac{1}{2} + \\left(\\frac{1}{3} + \\frac{1}{4}\\right) + \\left(\\frac{1}{5} + \\cdots + \\frac{1}{8}\\right) + \\cdots$ (mỗi nhóm $\\ge \\frac{1}{2}$). Tổng riêng không bị chặn nên phân kỳ — ví dụ điển hình cho việc $a_n \\to 0$ nhưng chuỗi vẫn phân kỳ.<br>" +
          "• <b>Các tính chất cơ bản (Slide 9):</b><br>" +
          "- Nếu $\\sum a_n = A$, $\\sum b_n = B$ thì $\\sum (\\alpha a_n + \\beta b_n) = \\alpha A + \\beta B$.<br>" +
          "- Thêm hoặc bớt <b>hữu hạn</b> số hạng không làm thay đổi tính hội tụ.<br>" +
          "- Hai chuỗi chỉ khác nhau hữu hạn số hạng có cùng tính hội tụ, nhưng tổng có thể khác.",
        checkpoint: {
          question:
            "Ví dụ (Slide 9): Tính tổng chuỗi $\\sum_{n=1}^{\\infty} \\left(\\frac{2}{3^n} + \\frac{1}{n(n + 1)}\\right)$.",
          rubric: [
            {
              step: "Bước 1 • Tính tổng hai chuỗi thành phần (0.5đ)",
              detail:
                "Chuỗi $\\sum_{n=1}^{\\infty} \\frac{1}{3^n} = \\frac{1/3}{1 - 1/3} = \\frac{1}{2}$, và chuỗi $\\sum_{n=1}^{\\infty} \\frac{1}{n(n + 1)} = \\lim_{N \\to \\infty} \\left(1 - \\frac{1}{N + 1}\\right) = 1$.",
            },
            {
              step: "Bước 2 • Dùng tính chất tuyến tính (0.5đ)",
              detail:
                "Vì cả hai chuỗi đều hội tụ, tổng bằng $2 \\cdot \\frac{1/3}{1 - 1/3} + 1 = 2 \\cdot \\frac{1}{2} + 1 = 2$.",
            },
          ],
          trap: "Tuyệt đối KHÔNG tách tổng $\\sum (a_n + b_n) = \\sum a_n + \\sum b_n$ khi một trong hai chuỗi thành phần phân kỳ!",
        },
      },
      {
        heading:
          "4.3. Chuỗi số không âm, Tiêu chuẩn so sánh trực tiếp & So sánh giới hạn",
        content:
          "• <b>Tiêu chuẩn tổng riêng (Slide 10):</b> Nếu $a_n \\ge 0$ thì $S_N$ không giảm. Do đó $\\sum a_n$ hội tụ <b>khi và chỉ khi</b> $(S_N)$ bị chặn trên. Có thể dùng các bất đẳng thức để so sánh với hai chuỗi chuẩn: chuỗi hình học và chuỗi $p$.<br>" +
          "• <b>Tiêu chuẩn so sánh trực tiếp (Slide 11):</b> Giả sử $0 \\le a_n \\le b_n$ với mọi $n$ đủ lớn:<br>" +
          "- Nếu $\\sum b_n$ hội tụ thì $\\sum a_n$ hội tụ.<br>" +
          "- Nếu $\\sum a_n$ phân kỳ thì $\\sum b_n$ phân kỳ.<br>" +
          "<i>Ví dụ:</i> $\\sum_{n=1}^{\\infty} \\frac{1}{n^2 + 3n + 1}$ hội tụ vì $0 < \\frac{1}{n^2 + 3n + 1} \\le \\frac{1}{n^2}$.<br>" +
          "• <b>Tiêu chuẩn so sánh giới hạn (Slide 12):</b> Với $a_n, b_n > 0$, nếu $\\lim_{n \\to \\infty} \\frac{a_n}{b_n} = L \\in (0, +\\infty)$ thì $\\sum a_n$ và $\\sum b_n$ cùng tính hội tụ.",
        checkpoint: {
          question:
            "Ví dụ (Slide 12): Khảo sát sự hội tụ của chuỗi $\\sum_{n=1}^{\\infty} \\frac{3n + 2}{n^3 + 1}$ bằng tiêu chuẩn so sánh giới hạn.",
          rubric: [
            {
              step: "Bước 1 • Chọn chuỗi chuẩn bₙ = 1/n² và tính giới hạn tỉ số (0.5đ)",
              detail:
                "Chọn $b_n = \\frac{1}{n^2} > 0$: $$\\lim_{n \\to \\infty} \\frac{(3n + 2)/(n^3 + 1)}{1/n^2} = \\lim_{n \\to \\infty} \\frac{3n^3 + 2n^2}{n^3 + 1} = 3 \\in (0, +\\infty).$$",
            },
            {
              step: "Bước 2 • Kết luận dựa trên chuỗi p = 2 (0.5đ)",
              detail:
                "Vì $\\sum_{n=1}^{\\infty} \\frac{1}{n^2}$ hội tụ ($p = 2 > 1$), nên theo tiêu chuẩn so sánh giới hạn chuỗi đã cho <b>hội tụ</b>.",
            },
          ],
          trap: "Tiêu chuẩn so sánh chỉ áp dụng cho chuỗi KHÔNG ÂM ($a_n \\ge 0$ hoặc $a_n, b_n > 0$ từ một chỉ số đủ lớn trở đi).",
        },
      },
      {
        heading: "4.4. Chuỗi p và Tiêu chuẩn tích phân",
        content:
          "• <b>Chuỗi $p$ (Slide 13):</b> $$\\sum_{n=1}^{\\infty} \\frac{1}{n^p}$$ hội tụ khi $p > 1$, và phân kỳ khi $p \\le 1$.<br>" +
          "• <b>Tiêu chuẩn tích phân:</b> Nếu $f$ liên tục, không âm, giảm trên $[1, \\infty)$ và $f(n) = a_n$, thì $\\sum a_n$ và $\\int_1^{\\infty} f(x)\\,dx$ cùng tính hội tụ.",
        checkpoint: {
          question:
            "Ví dụ chuỗi có logarithm (Slide 14): Khảo sát theo tham số $p$ sự hội tụ của $\\sum_{n=2}^{\\infty} \\frac{1}{n(\\ln n)^p}$.",
          rubric: [
            {
              step: "Bước 1 • Kiểm tra điều kiện và tính tích phân suy rộng tương ứng (0.5đ)",
              detail:
                "Dùng $f(x) = \\frac{1}{x(\\ln x)^p}$ trên $[2, \\infty)$ (liên tục, dương, giảm với $p > 0$). Đặt $t = \\ln x$: $$\\int_2^{\\infty} \\frac{dx}{x(\\ln x)^p} = \\int_{\\ln 2}^{\\infty} \\frac{dt}{t^p}.$$",
            },
            {
              step: "Bước 2 • Kết luận theo p (0.5đ)",
              detail:
                "Theo tiêu chuẩn $p$ ở vô cực (và với $p \\le 0$ thì số hạng $\\frac{1}{n(\\ln n)^p} > \\frac{1}{n\\ln n}$), suy ra chuỗi <b>hội tụ khi $p > 1$</b> và <b>phân kỳ khi $p \\le 1$</b>.",
            },
          ],
          trap: "Khi dùng tiêu chuẩn tích phân, bắt buộc phải kiểm tra hàm $f(x)$ liên tục, không âm và ĐƠN ĐIỆU GIẢM trên $[N_0, +\\infty)$.",
        },
      },
      {
        heading:
          "4.5. Tiêu chuẩn D’Alembert (tỉ số), Cauchy (căn bậc n) & Sơ đồ chọn tiêu chuẩn",
        content:
          "• <b>Tiêu chuẩn D’Alembert – tỉ số (Slide 15):</b> Với $a_n > 0$, giả sử $L = \\lim_{n \\to \\infty} \\frac{a_{n+1}}{a_n}$:<br>" +
          "- $L < 1$: hội tụ; $\\quad L > 1$: phân kỳ; $\\quad L = 1$: không kết luận.<br>" +
          "<i>Ví dụ:</i> Xét $\\sum_{n=1}^{\\infty} \\frac{3^n}{n!}$. Với $a_n = 3^n/n!$, ta có $\\frac{a_{n+1}}{a_n} = \\frac{3}{n + 1} \\to 0 < 1$; chuỗi hội tụ.<br>" +
          "• <b>Tiêu chuẩn Cauchy – căn bậc $n$ (Slide 16):</b> Với $a_n \\ge 0$, đặt $L = \\lim_{n \\to \\infty} \\sqrt[n]{a_n}$:<br>" +
          "- $L < 1$: hội tụ; $\\quad L > 1$: phân kỳ; $\\quad L = 1$: không kết luận.<br>" +
          "<i>Ví dụ:</i> Xét $\\sum_{n=1}^{\\infty} \\left(\\frac{2n + 1}{5n + 4}\\right)^n$. Ta có $\\sqrt[n]{a_n} = \\frac{2n + 1}{5n + 4} \\to \\frac{2}{5} < 1$; chuỗi hội tụ.<br>" +
          "• <b>Khi tỉ số hoặc căn bậc $n$ bằng $1$ (Slide 17):</b> $\\lim \\frac{a_{n+1}}{a_n} = 1$ với cả $\\sum \\frac{1}{n}$ (phân kỳ) và $\\sum \\frac{1}{n^2}$ (hội tụ). <i>Kết luận:</i> Không được suy ra hội tụ hoặc phân kỳ khi giới hạn của tiêu chuẩn D’Alembert hay Cauchy bằng $1$; hãy đổi sang so sánh hoặc tích phân.<br>" +
          "• <b>Sơ đồ chọn tiêu chuẩn (Slide 18):</b><br>" +
          "1) Kiểm tra $a_n \\to 0$ trước.<br>" +
          "2) Có $n!$, tích hoặc lũy thừa mũ: thử <b>D’Alembert</b>.<br>" +
          "3) Có biểu thức dạng $(\\cdots)^n$: thử <b>Cauchy</b>.<br>" +
          "4) Có phân thức hữu tỷ: thử <b>so sánh giới hạn</b> với $1/n^p$.<br>" +
          "5) Có $\\ln n$: cân nhắc <b>tích phân</b>.<br>" +
          "6) Nếu giới hạn bằng $1$, chuyển phương pháp.",
        checkpoint: {
          question:
            "Vận dụng sơ đồ chọn tiêu chuẩn để khảo sát sự hội tụ của $\\sum_{n=1}^{\\infty} \\frac{2^n n!}{n^n}$ và $\\sum_{n=1}^{\\infty} \\frac{n + 1}{n^2 + 3}$.",
          rubric: [
            {
              step: "Bước 1 • Chuỗi thứ nhất có n! và lũy thừa mũ → dùng D'Alembert (0.5đ)",
              detail:
                "Với $a_n = \\frac{2^n n!}{n^n}$: $\\frac{a_{n+1}}{a_n} = \\frac{2^{n+1}(n+1)!}{(n+1)^{n+1}} \\cdot \\frac{n^n}{2^n n!} = \\frac{2}{\\left(1 + \\frac{1}{n}\\right)^n} \\xrightarrow{n \\to \\infty} \\frac{2}{e} < 1$ (vì $e \\approx 2.718 > 2$). Chuỗi <b>hội tụ</b>.",
            },
            {
              step: "Bước 2 • Chuỗi thứ hai là phân thức hữu tỷ (tỉ số bằng 1) → dùng so sánh giới hạn (0.5đ)",
              detail:
                "Chọn $b_n = \\frac{1}{n}$: $\\lim_{n \\to \\infty} \\frac{(n+1)/(n^2+3)}{1/n} = 1 \\in (0, +\\infty)$. Vì $\\sum \\frac{1}{n}$ phân kỳ nên chuỗi <b>phân kỳ</b>.",
            },
          ],
          trap: 'Lỗi sai phổ biến là áp dụng D\'Alembert hoặc Cauchy cho phân thức đa thức như $\\frac{n+1}{n^2+3}$, giải ra $L = 1$ rồi kết luận sai là "hội tụ" hoặc "không hội tụ".',
        },
      },
      {
        heading: "4.6. Chuỗi đan dấu, Tiêu chuẩn Leibniz & Ước lượng sai số",
        content:
          "• <b>Tiêu chuẩn Leibniz (Slide 19):</b> Nếu $b_n \\ge 0$, $b_{n+1} \\le b_n$ từ một chỉ số nào đó và $b_n \\to 0$, thì $$\\sum_{n=1}^{\\infty} (-1)^{n-1} b_n$$ hội tụ.<br>" +
          "<i>Ví dụ:</i> $\\sum_{n=1}^{\\infty} \\frac{(-1)^{n-1}}{\\sqrt{n}}$ hội tụ vì $\\frac{1}{\\sqrt{n}}$ giảm về $0$.<br>" +
          "• <b>Định lý ước lượng sai số chuỗi Leibniz (Slide 20):</b> Với chuỗi thỏa Leibniz, phần dư sau $N$ số hạng thỏa: $$|S - S_N| \\le b_{N+1}.$$",
        checkpoint: {
          question:
            "Ví dụ ước lượng sai số (Slide 20): Dùng $\\ln 2 = 1 - \\frac{1}{2} + \\frac{1}{3} - \\cdots$ để tính gần đúng với sai số không quá $0.01$, cần lấy ít nhất bao nhiêu số hạng?",
          rubric: [
            {
              step: "Bước 1 • Thiết lập bất đẳng thức phần dư |S − S_N| ≤ b_{N+1} (0.5đ)",
              detail:
                "Chuỗi $\\sum_{n=1}^{\\infty} \\frac{(-1)^{n-1}}{n}$ thỏa tiêu chuẩn Leibniz với $b_n = \\frac{1}{n}$. Do đó: $$|S - S_N| \\le b_{N+1} = \\frac{1}{N + 1}.$$",
            },
            {
              step: "Bước 2 • Giải bất đẳng thức tìm N (0.5đ)",
              detail:
                "Để sai số không quá $0.01$, ta giải $\\frac{1}{N + 1} \\le 0.01 = \\frac{1}{100} \\iff N + 1 \\ge 100 \\iff N \\ge 99$. Vậy cần lấy ít nhất $99$ số hạng.",
            },
          ],
          trap: "Chú ý chỉ số ở vế phải của ước lượng Leibniz là $b_{N+1}$ (số hạng đầu tiên BỊ BỎ ĐI), không phải $b_N$!",
        },
      },
      {
        heading:
          "4.7. Hội tụ tuyệt đối, Hội tụ có điều kiện & Phân loại theo tham số",
        content:
          "• <b>Định nghĩa (Slide 21):</b><br>" +
          "- $\\sum u_n$ <b>hội tụ tuyệt đối</b> nếu $\\sum |u_n|$ hội tụ.<br>" +
          "- $\\sum u_n$ <b>hội tụ có điều kiện</b> nếu $\\sum u_n$ hội tụ nhưng $\\sum |u_n|$ phân kỳ.<br>" +
          "• <b>Định lý:</b> Hội tụ tuyệt đối kéo theo hội tụ.<br>" +
          "<i>Ví dụ:</i> $\\sum (-1)^{n-1}/n$ hội tụ có điều kiện; $\\sum (-1)^n / n^2$ hội tụ tuyệt đối.",
        checkpoint: {
          question:
            "Ví dụ phân loại theo tham số (Slide 22): Khảo sát sự hội tụ của $\\sum_{n=1}^{\\infty} \\frac{(-1)^{n-1}}{n^p}$ theo tham số $p \\in \\mathbb{R}$.",
          rubric: [
            {
              step: "Bước 1 • Xét p > 1 và 0 < p ≤ 1 (0.6đ)",
              detail:
                "• $p > 1$: $\\sum \\frac{1}{n^p}$ hội tụ $\\Rightarrow$ chuỗi <b>hội tụ tuyệt đối</b>.<br>" +
                "• $0 < p \\le 1$: Leibniz cho hội tụ; chuỗi trị tuyệt đối $\\sum \\frac{1}{n^p}$ phân kỳ $\\Rightarrow$ chuỗi <b>hội tụ có điều kiện</b>.",
            },
            {
              step: "Bước 2 • Mở rộng với p ≤ 0 (0.4đ)",
              detail:
                "Nếu $p \\le 0$ thì số hạng tổng quát không tiến về $0$, vi phạm điều kiện cần nên chuỗi <b>phân kỳ</b>.",
            },
          ],
          trap: "Nếu $\\sum |u_n|$ phân kỳ thì KHÔNG được kết luận ngay $\\sum u_n$ phân kỳ (ví dụ $\\sum \\frac{(-1)^{n-1}}{n}$ vẫn hội tụ có điều kiện); chỉ khi $u_n \\not\\to 0$ hoặc dùng được Leibniz/Dirichlet mới kết luận được!",
        },
      },
      {
        heading: "4.8. Chuỗi hàm, Miền hội tụ, Hội tụ điểm và Hội tụ đều",
        content:
          "• <b>Định nghĩa chuỗi hàm và miền hội tụ (Slide 23):</b> Cho các hàm $u_n : D \\to \\mathbb{R}$. Chuỗi $\\sum_{n=1}^{\\infty} u_n(x)$ có tổng riêng $S_N(x) = \\sum_{n=1}^{N} u_n(x)$. <b>Miền hội tụ</b> là tập các $x \\in D$ mà $S_N(x)$ có giới hạn hữu hạn.<br>" +
          "<i>Ví dụ:</i> $\\sum_{n=0}^{\\infty} x^n = \\frac{1}{1 - x}$ khi $|x| < 1$; miền hội tụ $(-1, 1)$.<br>" +
          "• <b>Hội tụ đều (Slide 24):</b> Chuỗi hội tụ đều về $S(x)$ trên $D$ nếu: $$\\forall \\varepsilon > 0 \\; \\exists N_0 : \\forall N \\ge N_0, \\; \\forall x \\in D, \\quad |S_N(x) - S(x)| < \\varepsilon.$$" +
          "<i>Khác biệt:</i> Với hội tụ điểm, chỉ số $N_0$ có thể phụ thuộc vào $x$; với hội tụ đều, $N_0$ không phụ thuộc vào $x$.",
        checkpoint: {
          question:
            "Ví dụ hội tụ điểm nhưng không đều (Slide 25): Khảo sát sự hội tụ đều của chuỗi $\\sum_{n=1}^{\\infty} (x^n - x^{n+1})$ trên $[0, 1)$ và trên $[0, r]$ với $0 < r < 1$.",
          rubric: [
            {
              step: "Bước 1 • Tính tổng riêng S_N(x) và hàm tổng S(x) (0.4đ)",
              detail:
                "Ta có $S_N(x) = x - x^{N+1} \\to x$ với mọi $x \\in [0, 1)$.",
            },
            {
              step: "Bước 2 • Tính chuẩn sai số sup |S_N(x) − x| trên [0, 1) và trên [0, r] (0.6đ)",
              detail:
                "Trên $[0, 1)$: $\\sup_{0 \\le x < 1} |S_N(x) - x| = \\sup_{0 \\le x < 1} x^{N+1} = 1 \\not\\to 0$. Vì vậy chuỗi <b>không hội tụ đều</b> trên $[0, 1)$.<br>" +
                "Trên $[0, r]$ với $r < 1$: sai số $\\le r^{N+1} \\to 0$ khi $N \\to \\infty$, nên chuỗi <b>hội tụ đều</b> trên $[0, r]$.",
            },
          ],
          trap: "Điều kiện cần và đủ để hội tụ đều về $S(x)$ trên $D$ là $\\lim_{N \\to \\infty} \\sup_{x \\in D} |S_N(x) - S(x)| = 0$.",
        },
      },
      {
        heading:
          "4.9. Tiêu chuẩn Weierstrass (M-test) & Các phép toán với chuỗi hàm",
        content:
          "• <b>Tiêu chuẩn Weierstrass – M-test (Slide 26):</b> Nếu $|u_n(x)| \\le M_n$ với mọi $x \\in D$ và $\\sum M_n$ hội tụ, thì $\\sum u_n(x)$ <b>hội tụ đều</b> (và tuyệt đối tại mỗi điểm) trên $D$.<br>" +
          "<i>Ví dụ:</i> Xét $\\sum_{n=1}^{\\infty} \\frac{\\sin(nx)}{n^2 + 1}$ trên $\\mathbb{R}$. Vì $\\left|\\frac{\\sin(nx)}{n^2 + 1}\\right| \\le \\frac{1}{n^2}$ và $\\sum \\frac{1}{n^2}$ hội tụ, chuỗi hội tụ đều trên $\\mathbb{R}$.<br>" +
          "• <b>Các phép toán với chuỗi hàm (Slide 27):</b><br>" +
          "- Nếu các $u_n$ liên tục và chuỗi hội tụ đều, hàm tổng liên tục.<br>" +
          "- Nếu các $u_n$ liên tục trên $[a, b]$ và chuỗi hội tụ đều: $$\\int_a^b \\sum_{n=1}^{\\infty} u_n(x)\\,dx = \\sum_{n=1}^{\\infty} \\int_a^b u_n(x)\\,dx.$$" +
          "- Để đạo hàm từng số hạng, cần giả thiết mạnh hơn: các $u_n$ khả vi, chuỗi đạo hàm hội tụ đều và chuỗi gốc hội tụ tại ít nhất một điểm.",
        checkpoint: {
          question:
            "Ví dụ tích phân từng số hạng (Slide 28): Áp dụng chuỗi $\\sum_{n=0}^{\\infty} \\frac{x^n}{2^n}$ ($x \\in [0, 1]$) để tính tổng $\\sum_{n=0}^{\\infty} \\frac{1}{(n + 1)2^n}$.",
          rubric: [
            {
              step: "Bước 1 • Chứng minh chuỗi hàm hội tụ đều trên [0, 1] (0.5đ)",
              detail:
                "Với $x \\in [0, 1]$, $|x^n / 2^n| \\le 2^{-n}$. Vì $\\sum_{n=0}^{\\infty} 2^{-n}$ hội tụ, theo Weierstrass chuỗi hội tụ đều trên $[0, 1]$ nên lấy tích phân từng số hạng được.",
            },
            {
              step: "Bước 2 • Tích phân hai vế trên [0, 1] (0.5đ)",
              detail:
                "$$\\sum_{n=0}^{\\infty} \\frac{1}{(n + 1)2^n} = \\int_0^1 \\sum_{n=0}^{\\infty} \\left(\\frac{x}{2}\\right)^n dx = \\int_0^1 \\frac{dx}{1 - x/2} = \\left[-2\\ln\\left(1 - \\frac{x}{2}\\right)\\right]_0^1 = 2\\ln 2.$$",
            },
          ],
          trap: "Hằng số chặn trên $M_n$ trong tiêu chuẩn Weierstrass tuyệt đối KHÔNG được phụ thuộc vào biến $x$!",
        },
      },
      {
        heading: "4.10. Chuỗi lũy thừa, Định lý Abel & Tính bán kính hội tụ",
        content:
          "• <b>Chuỗi lũy thừa và bán kính hội tụ (Slide 29):</b> Với chuỗi $\\sum_{n=0}^{\\infty} a_n(x - x_0)^n$, tồn tại $R \\in [0, +\\infty]$ sao cho chuỗi hội tụ tuyệt đối khi $|x - x_0| < R$ và phân kỳ khi $|x - x_0| > R$. Hai đầu mút $x_0 \\pm R$ (nếu $0 < R < \\infty$) phải xét riêng.<br>" +
          "• <b>Định lý Abel (Slide 30):</b> Nếu $\\sum a_n(x_1 - x_0)^n$ hội tụ tại $x_1 \\neq x_0$, thì chuỗi hội tụ tuyệt đối tại mọi $x$ thỏa $|x - x_0| < |x_1 - x_0|$. <i>Ý nghĩa:</i> Tập hội tụ tuyệt đối có cấu trúc một khoảng đối xứng quanh tâm $x_0$.<br>" +
          "• <b>Tính bán kính hội tụ (Slide 31):</b><br>" +
          "- Công thức tỉ số: Nếu $\\rho = \\lim \\left|\\frac{a_{n+1}}{a_n}\\right|$ tồn tại thì $R = 1/\\rho$ (quy ước $1/0 = +\\infty, \\; 1/\\infty = 0$).<br>" +
          "- Công thức căn: Nếu $L = \\limsup_{n \\to \\infty} \\sqrt[n]{|a_n|}$ thì $R = 1/L$.<br>" +
          "- Quy trình: Tìm $R \\to$ xét riêng hai đầu mút $\\to$ kết luận miền hội tụ.<br>" +
          "• <b>Ví dụ hai đầu mút đều hội tụ (Slide 33):</b> $\\sum_{n=1}^{\\infty} \\frac{(x + 1)^n}{n^2}$ có $R = 1$. Tại $x = -2$ và $x = 0$, chuỗi trị tuyệt đối đều là $\\sum 1/n^2$, hội tụ. Miền hội tụ $[-2, 0]$.",
        checkpoint: {
          question:
            "Ví dụ hai đầu mút khác nhau (Slide 32): Tìm bán kính và miền hội tụ của chuỗi lũy thừa $\\sum_{n=1}^{\\infty} \\frac{(x - 2)^n}{n}$.",
          rubric: [
            {
              step: "Bước 1 • Tìm bán kính R và khoảng hội tụ (0.4đ)",
              detail:
                "Hệ số $a_n = \\frac{1}{n}$ có $\\rho = \\lim_{n \\to \\infty} \\frac{n}{n + 1} = 1 \\Rightarrow R = 1$. Chuỗi hội tụ tuyệt đối khi $|x - 2| < 1 \\iff 1 < x < 3$.",
            },
            {
              step: "Bước 2 • Xét riêng hai đầu mút x = 1 và x = 3 (0.6đ)",
              detail:
                "• Tại $x = 1$: chuỗi là $\\sum_{n=1}^{\\infty} \\frac{(-1)^n}{n}$, hội tụ theo Leibniz.<br>" +
                "• Tại $x = 3$: chuỗi là $\\sum_{n=1}^{\\infty} \\frac{1}{n}$, phân kỳ.<br>" +
                "Vậy miền hội tụ là $[1, 3)$.",
            },
          ],
          trap: "Khi chuỗi bị khuyết bậc (ví dụ $\\sum a_n x^{2n}$), phải tính giới hạn cả cục $|u_{n+1}/u_n| < 1$ hoặc đổi biến $t = x^2$ rồi mới giải điều kiện theo $x$.",
        },
      },
      {
        heading: "4.11. Đạo hàm, Tích phân chuỗi lũy thừa & Tính tổng",
        content:
          "• <b>Tính chất (Slide 34):</b> Trong $|x - x_0| < R$, có thể đạo hàm và tích phân từng số hạng: $$S'(x) = \\sum_{n=1}^{\\infty} n a_n (x - x_0)^{n-1}, \\qquad \\int_{x_0}^{x} S(t)\\,dt = \\sum_{n=0}^{\\infty} \\frac{a_n(x - x_0)^{n+1}}{n + 1}.$$ Các chuỗi thu được có cùng bán kính hội tụ $R$.",
        checkpoint: {
          question:
            "Ví dụ (Slide 35): Tính tổng chuỗi lũy thừa $S(x) = \\sum_{n=1}^{\\infty} n x^{n-1}$ khi $|x| < 1$, và nêu cách mở rộng để tính $\\sum_{n=1}^{\\infty} n^2 x^n$.",
          rubric: [
            {
              step: "Bước 1 • Đạo hàm từng số hạng chuỗi hình học (0.5đ)",
              detail:
                "Từ $\\sum_{n=0}^{\\infty} x^n = \\frac{1}{1 - x}$ ($|x| < 1$), đạo hàm từng số hạng thu được: $$S(x) = \\sum_{n=1}^{\\infty} n x^{n-1} = \\frac{1}{(1 - x)^2}.$$",
            },
            {
              step: "Bước 2 • Mở rộng cho Σ n² x^n (0.5đ)",
              detail:
                "Nhân hai vế với $x$ được $\\sum_{n=1}^{\\infty} n x^n = \\frac{x}{(1 - x)^2}$; lấy đạo hàm thêm lần nữa rồi nhân tiếp với $x$ thu được $\\sum_{n=1}^{\\infty} n^2 x^n = \\frac{x(1 + x)}{(1 - x)^3}$ ($|x| < 1$).",
            },
          ],
          trap: "Khi đạo hàm từng số hạng chuỗi $\\sum_{n=0}^{\\infty} a_n x^n$, chỉ số $n = 0$ (hằng số $a_0$) bị triệt tiêu nên tổng mới chạy từ $n = 1$; bán kính $R$ giữ nguyên nhưng tính hội tụ tại hai đầu mút có thể thay đổi!",
        },
      },
      {
        heading:
          "4.12. Chuỗi Taylor–Maclaurin, Phần dư Lagrange & Điều kiện khai triển",
        content:
          "• <b>Định nghĩa (Slide 36):</b><br>" +
          "- <b>Chuỗi Taylor tại $x_0$:</b> $\\sum_{n=0}^{\\infty} \\frac{f^{(n)}(x_0)}{n!}(x - x_0)^n$.<br>" +
          "- <b>Chuỗi Maclaurin ($x_0 = 0$):</b> $\\sum_{n=0}^{\\infty} \\frac{f^{(n)}(0)}{n!} x^n$.<br>" +
          "<i>Cảnh báo:</i> Chuỗi Taylor không nhất thiết bằng hàm gốc: cần chứng minh phần dư Taylor tiến về $0$.<br>" +
          "• <b>Phần dư Taylor và điều kiện khai triển (Slide 37):</b> $f(x) = \\sum_{k=0}^{N} \\frac{f^{(k)}(x_0)}{k!}(x - x_0)^k + R_N(x)$. Nếu $f$ khả vi đến cấp $N + 1$, <b>phần dư Lagrange</b> là: $$R_N(x) = \\frac{f^{(N+1)}(\\xi)}{(N + 1)!}(x - x_0)^{N+1},$$ với $\\xi$ nằm giữa $x_0$ và $x$. Nếu $R_N(x) \\to 0$ thì chuỗi Taylor biểu diễn đúng $f(x)$ tại điểm đó.",
        checkpoint: {
          question:
            "Ví dụ khai triển tại điểm khác 0 (Slide 41): Khai triển $f(x) = \\ln x$ thành chuỗi Taylor tại $x_0 = 1$ và xác định miền giá trị $x$ mà khai triển đúng.",
          rubric: [
            {
              step: "Bước 1 • Đặt t = x − 1 để quy về khai triển Maclaurin của ln(1 + t) (0.5đ)",
              detail:
                "Đặt $t = x - 1$. Khi $|t| < 1$, ta có: $$\\ln x = \\ln(1 + t) = t - \\frac{t^2}{2} + \\frac{t^3}{3} - \\cdots$$",
            },
            {
              step: "Bước 2 • Thay t = x − 1 và chỉ rõ miền đúng (0.5đ)",
              detail:
                "Suy ra: $$\\ln x = \\sum_{n=1}^{\\infty} (-1)^{n-1}\\frac{(x - 1)^n}{n}, \\qquad 0 < x \\le 2.$$",
            },
          ],
          trap: "Khi khai triển tại $x_0 \\neq 0$, luôn đặt $t = x - x_0$ để đưa về dạng hàm theo $t$ quanh $0$ thay vì tính đạo hàm cấp $n$ trực tiếp từ đầu nếu có thể quy về chuỗi chuẩn.",
        },
      },
      {
        heading:
          "4.13. Các khai triển Maclaurin cơ bản (I, II) & Khai triển nhị thức tổng quát",
        content:
          "• <b>Khai triển Maclaurin cơ bản (I) (Slide 38):</b><br>" +
          "$$e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!} \\quad (x \\in \\mathbb{R}),$$" +
          "$$\\sin x = \\sum_{n=0}^{\\infty} (-1)^n \\frac{x^{2n+1}}{(2n + 1)!} \\quad (x \\in \\mathbb{R}), \\qquad \\cos x = \\sum_{n=0}^{\\infty} (-1)^n \\frac{x^{2n}}{(2n)!} \\quad (x \\in \\mathbb{R}).$$" +
          "• <b>Khai triển Maclaurin cơ bản (II) (Slide 39):</b><br>" +
          "$$\\frac{1}{1 - x} = \\sum_{n=0}^{\\infty} x^n \\quad (|x| < 1), \\qquad \\ln(1 + x) = \\sum_{n=1}^{\\infty} (-1)^{n-1}\\frac{x^n}{n} \\quad (-1 < x \\le 1),$$" +
          "$$\\arctan x = \\sum_{n=0}^{\\infty} (-1)^n \\frac{x^{2n+1}}{2n + 1} \\quad (|x| \\le 1).$$" +
          "• <b>Khai triển nhị thức tổng quát (Slide 40):</b> $$(1 + x)^\\alpha = \\sum_{n=0}^{\\infty} \\binom{\\alpha}{n} x^n \\quad (|x| < 1),$$ trong đó $\\binom{\\alpha}{n} = \\frac{\\alpha(\\alpha - 1)\\cdots(\\alpha - n + 1)}{n!}$, $\\binom{\\alpha}{0} = 1$.",
        checkpoint: {
          question:
            "Ví dụ nhị thức tổng quát (Slide 40): Viết 4 số hạng đầu của khai triển Maclaurin cho $(1 + x)^{-1/2}$ ($|x| < 1$).",
          rubric: [
            {
              step: "Bước 1 • Tính các hệ số nhị thức với α = −1/2 (0.6đ)",
              detail:
                "$\\binom{-1/2}{0} = 1$; $\\binom{-1/2}{1} = -\\frac{1}{2}$; $\\binom{-1/2}{2} = \\frac{(-1/2)(-3/2)}{2!} = \\frac{3}{8}$; $\\binom{-1/2}{3} = \\frac{(-1/2)(-3/2)(-5/2)}{3!} = -\\frac{5}{16}$.",
            },
            {
              step: "Bước 2 • Viết khai triển (0.4đ)",
              detail:
                "$$(1 + x)^{-1/2} = 1 - \\frac{1}{2}x + \\frac{3}{8}x^2 - \\frac{5}{16}x^3 + \\cdots$$",
            },
          ],
          trap: "Chú ý miền hội tụ tại đầu mút của từng chuỗi chuẩn: $\\ln(1+x)$ hội tụ tại $x = 1$ (không hội tụ tại $-1$), còn $\\arctan x$ hội tụ tại cả $x = \\pm 1$.",
        },
      },
      {
        heading:
          "4.14. Ứng dụng Taylor–Maclaurin, Mục tiêu & Tổng kết Chương 4",
        content:
          "• <b>Ví dụ tính giới hạn bằng khai triển (Slide 43):</b> Tính $\\lim_{x \\to 0} \\frac{e^x - 1 - x - \\frac{x^2}{2}}{x^3}$. Vì $e^x = 1 + x + \\frac{x^2}{2} + \\frac{x^3}{6} + o(x^3)$, nên $\\lim_{x \\to 0} \\frac{e^x - 1 - x - x^2/2}{x^3} = \\frac{1}{6}$.<br>" +
          "• <b>Mục tiêu học tập (Slide 2):</b> Phân biệt chuỗi hội tụ, phân kỳ và tính tổng một số chuỗi; lựa chọn tiêu chuẩn hội tụ phù hợp cho chuỗi số dương và chuỗi đan dấu; xác định miền hội tụ và khảo sát hội tụ đều của chuỗi hàm; tìm bán kính, khoảng hội tụ của chuỗi lũy thừa; khai triển Taylor–Maclaurin và áp dụng để tính gần đúng.<br>" +
          "• <b>Tổng kết phương pháp (Slide 44):</b><br>" +
          "1) <b>Chuỗi số:</b> xét tổng riêng, điều kiện cần, chuỗi hình học và chuỗi $p$.<br>" +
          "2) <b>Chuỗi dương:</b> so sánh, tỉ số, căn, tích phân.<br>" +
          "3) <b>Chuỗi đan dấu:</b> Leibniz; phân biệt hội tụ tuyệt đối và có điều kiện.<br>" +
          "4) <b>Chuỗi hàm:</b> phân biệt hội tụ điểm và hội tụ đều.<br>" +
          "5) <b>Chuỗi lũy thừa:</b> tìm $R$, kiểm tra từng đầu mút.<br>" +
          "6) <b>Taylor:</b> tìm hệ số và kiểm soát phần dư.",
        checkpoint: {
          question:
            "Ví dụ tính gần đúng (Slide 42): Tính gần đúng $e^{0.2}$ bằng đa thức Maclaurin bậc $3$ và đánh giá sai số bằng phần dư Lagrange.",
          rubric: [
            {
              step: "Bước 1 • Tính giá trị đa thức Maclaurin bậc 3 tại x = 0.2 (0.5đ)",
              detail:
                "$$e^{0.2} \\approx 1 + 0.2 + \\frac{0.2^2}{2} + \\frac{0.2^3}{6} = 1.221333\\dots$$",
            },
            {
              step: "Bước 2 • Đánh giá sai số bằng phần dư Lagrange (0.5đ)",
              detail:
                "Với $\\xi \\in (0, 0.2)$ thì $f^{(4)}(\\xi) = e^{\\xi} < e^{0.2}$. Do đó: $$|R_3(0.2)| \\le \\frac{e^{0.2}(0.2)^4}{4!} < 8.2 \\times 10^{-5}.$$",
            },
          ],
          trap: "Khi đánh giá sai số của chuỗi Taylor tại $x > 0$ cho $e^x$, cần chặn trên $e^\\xi$ bằng $e^x$ (hoặc một số nguyên lớn hơn như $3$ nếu chưa biết $e^{0.2}$), không đánh giá sai chiều bất đẳng thức!",
        },
      },
    ],
    exercises: [
      {
        level: "Cơ bản",
        question:
          "Bài tập về nhà 1 – Chuỗi số:<br>1) Tính $\\sum_{n=1}^{\\infty} \\frac{1}{(n + 1)(n + 2)}$.<br>2) Tính $\\sum_{n=1}^{\\infty} \\frac{5}{2^{n + 1}}$.<br>3) Xét hội tụ của $\\sum_{n=1}^{\\infty} \\frac{2n + 1}{3n + 2}$.<br>4) Xét hội tụ của $\\sum_{n=1}^{\\infty} \\ln\\frac{n + 2}{n + 1}$.<br>5) Tính $\\sum_{n=1}^{\\infty} \\frac{1}{n(n + 1)(n + 2)}$.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.2đ)</span> Tách $\\frac{1}{(n+1)(n+2)} = \\frac{1}{n+1} - \\frac{1}{n+2}$. Tổng riêng $S_N = \\frac{1}{2} - \\frac{1}{N+2} \\xrightarrow{N \\to \\infty} \\frac{1}{2}$. Chuỗi hội tụ và có tổng bằng $\\frac{1}{2}$.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.2đ)</span> Chuỗi hình học với số hạng đầu $a = \\frac{5}{4}$ (ứng với $n = 1$) và công bội $q = \\frac{1}{2}$ ($|q| < 1$): $S = \\frac{5/4}{1 - 1/2} = \\frac{5}{2}$.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.2đ)</span> Ta có $\\lim_{n \\to \\infty} \\frac{2n + 1}{3n + 2} = \\frac{2}{3} \\neq 0$, vi phạm điều kiện cần để chuỗi hội tụ nên chuỗi <b>phân kỳ</b>.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.2đ)</span> Viết $\\ln\\frac{n+2}{n+1} = \\ln(n+2) - \\ln(n+1)$. Tổng riêng $S_N = \\ln(N+2) - \\ln 2 \\xrightarrow{N \\to \\infty} +\\infty$, nên chuỗi <b>phân kỳ</b> (dù số hạng tổng quát tiến về $0$).</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 5 (0.2đ)</span> Tách $\\frac{1}{n(n+1)(n+2)} = \\frac{1}{2}\\left[\\frac{1}{n(n+1)} - \\frac{1}{(n+1)(n+2)}\\right]$. Tổng riêng $S_N = \\frac{1}{2}\\left[\\frac{1}{2} - \\frac{1}{(N+1)(N+2)}\\right] \\xrightarrow{N \\to \\infty} \\frac{1}{4}$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Ở câu 2) nhiều bạn lấy nhầm số hạng đầu $a = 5$ (ứng với $n = 0$) trong khi chuỗi bắt đầu từ $n = 1$ ($a = \\frac{5}{4}$)!</div>
          </div>`,
      },
      {
        level: "Vừa",
        question:
          "Bài tập về nhà 2 – Chuỗi số dương (Yêu cầu: nêu rõ tiêu chuẩn sử dụng):<br>1) $\\sum_{n=1}^{\\infty} \\frac{n + 3}{n^3 + 2}$.<br>2) $\\sum_{n=1}^{\\infty} \\frac{4^n}{(n + 1)!}$.<br>3) $\\sum_{n=1}^{\\infty} \\left(\\frac{3n + 1}{5n + 2}\\right)^n$.<br>4) $\\sum_{n=2}^{\\infty} \\frac{1}{n(\\ln n)^2}$.<br>5) $\\sum_{n=1}^{\\infty} \\frac{\\sqrt{n + 1} - \\sqrt{n}}{n}$.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.2đ)</span> Dùng <b>tiêu chuẩn so sánh giới hạn</b> với $b_n = \\frac{1}{n^2}$: $\\lim_{n \\to \\infty} \\frac{(n+3)/(n^3+2)}{1/n^2} = 1 \\in (0, +\\infty)$. Vì $\\sum \\frac{1}{n^2}$ hội tụ ($p = 2 > 1$) nên chuỗi <b>hội tụ</b>.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.2đ)</span> Dùng <b>tiêu chuẩn D’Alembert</b>: $L = \\lim_{n \\to \\infty} \\frac{a_{n+1}}{a_n} = \\lim_{n \\to \\infty} \\frac{4^{n+1}/(n+2)!}{4^n/(n+1)!} = \\lim_{n \\to \\infty} \\frac{4}{n + 2} = 0 < 1 \\Rightarrow$ chuỗi <b>hội tụ</b>.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.2đ)</span> Dùng <b>tiêu chuẩn Cauchy</b>: $L = \\lim_{n \\to \\infty} \\sqrt[n]{a_n} = \\lim_{n \\to \\infty} \\frac{3n + 1}{5n + 2} = \\frac{3}{5} < 1 \\Rightarrow$ chuỗi <b>hội tụ</b>.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.2đ)</span> Dùng <b>tiêu chuẩn tích phân</b> với $f(x) = \\frac{1}{x(\\ln x)^2}$ liên tục, dương, giảm trên $[2, +\\infty)$: $\\int_2^{+\\infty} \\frac{dx}{x(\\ln x)^2} = \\lim_{b \\to \\infty}\\left[-\\frac{1}{\\ln x}\\right]_2^b = \\frac{1}{\\ln 2}$ (hội tụ) $\\Rightarrow$ chuỗi <b>hội tụ</b>.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 5 (0.2đ)</span> Nhân liên hợp: $a_n = \\frac{1}{n(\\sqrt{n+1} + \\sqrt{n})}$. Dùng <b>tiêu chuẩn so sánh giới hạn</b> với $b_n = \\frac{1}{n^{3/2}}$: $\\lim_{n \\to \\infty} \\frac{a_n}{1/n^{3/2}} = \\frac{1}{2} \\in (0, +\\infty)$. Vì $\\sum \\frac{1}{n^{3/2}}$ hội tụ ($p = \\frac{3}{2} > 1$) nên chuỗi <b>hội tụ</b>.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Đề yêu cầu nêu rõ tên tiêu chuẩn sử dụng; không viết tắt hoặc bỏ qua bước kiểm tra $f$ giảm (câu 4) hay tính giới hạn tỉ số $L \\in (0, +\\infty)$ (câu 1, 5).</div>
          </div>`,
      },
      {
        level: "Vừa",
        question:
          "Bài tập về nhà 3 – Chuỗi có dấu:<br>1) Phân loại $\\sum_{n=1}^{\\infty} \\frac{(-1)^{n-1}}{n^{2/3}}$.<br>2) Phân loại $\\sum_{n=1}^{\\infty} \\frac{(-1)^n}{n^2 + 1}$.<br>3) Tìm các $p \\in \\mathbb{R}$ để $\\sum_{n=1}^{\\infty} \\frac{(-1)^{n-1}}{n^p}$ hội tụ.<br>4) Cần lấy ít nhất bao nhiêu số hạng của $\\sum_{n=1}^{\\infty} (-1)^{n-1}/n^2$ để sai số theo ước lượng Leibniz không quá $10^{-3}$?",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.25đ)</span> Chuỗi trị tuyệt đối $\\sum \\frac{1}{n^{2/3}}$ phân kỳ ($p = \\frac{2}{3} \\le 1$), nhưng $b_n = \\frac{1}{n^{2/3}} \\searrow 0$ nên chuỗi hội tụ theo Leibniz. Vậy chuỗi <b>hội tụ có điều kiện</b>.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.25đ)</span> Chuỗi trị tuyệt đối $\\sum \\frac{1}{n^2 + 1}$ hội tụ (vì $\\frac{1}{n^2 + 1} \\le \\frac{1}{n^2}$). Vậy chuỗi <b>hội tụ tuyệt đối</b>.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.25đ)</span> Nếu $p \\le 0$: $\\frac{1}{n^p} \\not\\to 0$ nên chuỗi phân kỳ. Nếu $p > 0$: $b_n = \\frac{1}{n^p} \\searrow 0$ nên chuỗi hội tụ theo Leibniz (hội tụ có điều kiện khi $0 < p \\le 1$, hội tụ tuyệt đối khi $p > 1$). Kết luận: <b>$p > 0$</b>.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.25đ)</span> Theo ước lượng Leibniz, $|S - S_N| \\le b_{N+1} = \\frac{1}{(N + 1)^2} \\le 10^{-3} \\iff (N + 1)^2 \\ge 1000 \\iff N + 1 \\ge 32 \\iff N \\ge 31$. Cần lấy ít nhất <b>$31$ số hạng</b>.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Ở câu 4) giải $(N + 1)^2 \\ge 1000$ cho $N + 1 > 31.62 \\Rightarrow N + 1 \\ge 32 \\Rightarrow N = 31$ (nhiều bạn quên trừ $1$ và ghi $32$!).</div>
          </div>`,
      },
      {
        level: "Vừa",
        question:
          "Bài tập về nhà 4 – Chuỗi hàm:<br>1) Tìm miền hội tụ của $\\sum_{n=1}^{\\infty} n x^n$.<br>2) Chứng minh $\\sum_{n=1}^{\\infty} \\frac{\\cos(nx)}{n^3}$ hội tụ đều trên $\\mathbb{R}$.<br>3) Khảo sát hội tụ đều của $\\sum_{n=1}^{\\infty} (x^n - x^{n+1})$ trên $[0, 1]$ và trên $[0, 1/2]$.<br>4) Chứng minh $\\sum_{n=1}^{\\infty} \\frac{x^n}{n^2}$ hội tụ đều trên $[-1, 1]$.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.25đ)</span> Với $x = 0$: hội tụ. Với $x \\neq 0$: $\\lim_{n \\to \\infty} \\sqrt[n]{|n x^n|} = |x|$. Khi $|x| < 1$ chuỗi hội tụ tuyệt đối; khi $|x| \\ge 1$ thì $|nx^n| \\ge n \\not\\to 0$ nên phân kỳ. Miền hội tụ: <b>$(-1, 1)$</b>.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.25đ)</span> Với mọi $x \\in \\mathbb{R}$, $\\left|\\frac{\\cos(nx)}{n^3}\\right| \\le \\frac{1}{n^3} = M_n$, mà $\\sum_{n=1}^{\\infty} \\frac{1}{n^3}$ hội tụ ($p = 3 > 1$). Theo tiêu chuẩn Weierstrass, chuỗi hội tụ đều trên $\\mathbb{R}$.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.25đ)</span> Tổng riêng $S_N(x) = x - x^{N+1}$. Trên $[0, 1]$, hàm tổng điểm là $S(x) = x$ với $x \\in [0, 1)$ và $S(1) = 0$ (gián đoạn tại $1$, hoặc $\\sup_{x \\in [0,1)} |S_N(x) - S(x)| = 1 \\not\\to 0$), nên <b>không hội tụ đều</b> trên $[0, 1]$. Trên $[0, 1/2]$, $|S_N(x) - x| = x^{N+1} \\le (1/2)^{N+1} \\to 0$ nên chuỗi <b>hội tụ đều</b> trên $[0, 1/2]$.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.25đ)</span> Với mọi $x \\in [-1, 1]$, $\\left|\\frac{x^n}{n^2}\\right| \\le \\frac{1}{n^2} = M_n$. Vì $\\sum_{n=1}^{\\infty} \\frac{1}{n^2}$ hội tụ ($p = 2 > 1$), theo Weierstrass chuỗi hội tụ đều trên $[-1, 1]$.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Ở câu 3) trên $[0, 1]$ điểm $x = 1$ cho tổng riêng $S_N(1) = 0$ làm hàm tổng bị gián đoạn tại $1$ — đây là dấu hiệu nhận biết ngay chuỗi các hàm liên tục KHÔNG hội tụ đều.</div>
          </div>`,
      },
      {
        level: "Khó",
        question:
          "Bài tập về nhà 5 – Chuỗi lũy thừa: Tìm bán kính và miền hội tụ:<br>1) $\\sum_{n=1}^{\\infty} \\frac{(x - 3)^n}{n}$.<br>2) $\\sum_{n=1}^{\\infty} \\frac{(x + 2)^n}{n^2}$.<br>3) $\\sum_{n=1}^{\\infty} \\frac{n!}{n^n} x^n$.<br>4) $\\sum_{n=1}^{\\infty} \\frac{n(x - 1)^n}{3^n}$.<br>5) $\\sum_{n=1}^{\\infty} \\frac{(x - 2)^n}{n 4^n}$.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.2đ)</span> $R = \\lim_{n \\to \\infty} \\frac{n + 1}{n} = 1 \\Rightarrow 2 < x < 4$. Tại $x = 2$: $\\sum \\frac{(-1)^n}{n}$ hội tụ (Leibniz); tại $x = 4$: $\\sum \\frac{1}{n}$ phân kỳ. Vậy $R = 1$, miền hội tụ <b>$[2, 4)$</b>.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.2đ)</span> $R = \\lim_{n \\to \\infty} \\left(\\frac{n + 1}{n}\\right)^2 = 1 \\Rightarrow -3 < x < -1$. Tại $x = -3$ và $x = -1$, chuỗi trị tuyệt đối đều là $\\sum \\frac{1}{n^2}$ hội tụ. Vậy $R = 1$, miền hội tụ <b>$[-3, -1]$</b>.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.2đ)</span> $\\rho = \\lim_{n \\to \\infty} \\frac{(n+1)!}{(n+1)^{n+1}} \\cdot \\frac{n^n}{n!} = \\lim_{n \\to \\infty} \\frac{1}{(1 + 1/n)^n} = \\frac{1}{e} \\Rightarrow R = e$. Xét $x = \\pm e$: đặt $b_n = \\frac{n! e^n}{n^n}$, có $\\frac{b_{n+1}}{b_n} = \\frac{e}{(1 + 1/n)^n} > 1$ (do $(1 + 1/n)^n < e$), nên $b_n \\ge b_1 = e \\not\\to 0$. Vậy phân kỳ tại cả hai đầu mút. Kết luận $R = e$, miền hội tụ <b>$(-e, e)$</b>.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.2đ)</span> $R = \\lim_{n \\to \\infty} \\frac{n \\cdot 3^{n+1}}{(n + 1)3^n} = 3 \\Rightarrow -2 < x < 4$. Tại $x = -2$ ($\\sum (-1)^n n$) và $x = 4$ ($\\sum n$), số hạng tổng quát đều không tiến về $0$ nên phân kỳ. Vậy $R = 3$, miền hội tụ <b>$(-2, 4)$</b>.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 5 (0.2đ)</span> $R = \\lim_{n \\to \\infty} \\frac{(n + 1)4^{n+1}}{n \\cdot 4^n} = 4 \\Rightarrow -2 < x < 6$. Tại $x = -2$: $\\sum \\frac{(-1)^n}{n}$ hội tụ (Leibniz); tại $x = 6$: $\\sum \\frac{1}{n}$ phân kỳ. Vậy $R = 4$, miền hội tụ <b>$[-2, 6)$</b>.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Ở câu 3) rất hay nhầm $R = \\frac{1}{e}$ (quên nghịch đảo $\\rho = \\frac{1}{e} \\Rightarrow R = \\frac{1}{\\rho} = e$) và quên chứng minh $b_n \\not\\to 0$ tại $x = \\pm e$.</div>
          </div>`,
      },
      {
        level: "Vừa",
        question:
          "Bài tập về nhà 6 – Taylor–Maclaurin:<br>1) Khai triển Maclaurin đến bậc $5$ của $\\sin(2x)$.<br>2) Khai triển Taylor đến bậc $3$ của $\\sqrt{x}$ tại $x_0 = 1$.<br>3) Tính $\\lim_{x \\to 0} \\frac{\\sin x - x + x^3/6}{x^5}$.<br>4) Dùng khai triển Maclaurin để xấp xỉ $\\ln(1.1)$ với sai số không quá $10^{-4}$.<br>5) Tính tổng $\\sum_{n=1}^{\\infty} \\frac{n}{2^n}$.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.2đ)</span> Thay $u = 2x$ vào $\\sin u = u - \\frac{u^3}{6} + \\frac{u^5}{120} + o(u^5)$:
            $$\\sin(2x) = 2x - \\frac{4}{3}x^3 + \\frac{4}{15}x^5 + o(x^5).$$</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.2đ)</span> Đặt $t = x - 1$, $\\sqrt{x} = (1 + t)^{1/2}$. Dùng khai triển nhị thức $\\alpha = \\frac{1}{2}$:
            $$\\sqrt{x} = 1 + \\frac{1}{2}(x - 1) - \\frac{1}{8}(x - 1)^2 + \\frac{1}{16}(x - 1)^3 + o((x - 1)^3).$$</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.2đ)</span> Thay $\\sin x = x - \\frac{x^3}{6} + \\frac{x^5}{120} + o(x^5)$:
            $$\\lim_{x \\to 0} \\frac{\\frac{x^5}{120} + o(x^5)}{x^5} = \\frac{1}{120}.$$</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.2đ)</span> $\\ln(1.1) = \\ln(1 + 0.1) = \\sum_{n=1}^{\\infty} (-1)^{n-1}\\frac{(0.1)^n}{n}$. Theo ước lượng Leibniz, sai số sau $N$ số hạng $\\le \\frac{(0.1)^{N+1}}{N + 1} \\le 10^{-4}$. Chọn $N = 3$ vì $\\frac{(0.1)^4}{4} = 2.5 \\times 10^{-5} < 10^{-4}$:
            $$\\ln(1.1) \\approx 0.1 - \\frac{0.01}{2} + \\frac{0.001}{3} \\approx 0.095333.$$</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 5 (0.2đ)</span> Đạo hàm $\\sum_{n=0}^{\\infty} x^n = \\frac{1}{1 - x}$ ($|x| < 1$) được $\\sum_{n=1}^{\\infty} n x^{n-1} = \\frac{1}{(1 - x)^2} \\Rightarrow \\sum_{n=1}^{\\infty} n x^n = \\frac{x}{(1 - x)^2}$. Thay $x = \\frac{1}{2}$:
            $$\\sum_{n=1}^{\\infty} \\frac{n}{2^n} = \\frac{1/2}{(1 - 1/2)^2} = 2.$$</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Ở câu 5) nhớ nhân thêm $x$ sau khi đạo hàm để đổi từ $\\sum n x^{n-1}$ sang $\\sum n x^n$ trước khi thế $x = \\frac{1}{2}$.</div>
          </div>`,
      },
      {
        level: "Khó",
        question:
          "Bài tập tổng hợp nâng cao:<br>1) Khảo sát theo $p \\in \\mathbb{R}$ tính hội tụ của $\\sum_{n=2}^{\\infty} \\frac{(-1)^n}{n^p \\ln n}$.<br>2) Tìm miền hội tụ của $\\sum_{n=2}^{\\infty} \\frac{(x - 1)^n}{n \\ln n}$.<br>3) Với $|x| < 1$, tính $\\sum_{n=1}^{\\infty} n^2 x^n$.<br>4) Chứng minh chuỗi $\\sum_{n=1}^{\\infty} \\frac{\\sin(nx)}{n^2}$ hội tụ đều trên $\\mathbb{R}$ và hàm tổng liên tục.",
        solution: `
          <div class="rubric-box">
            <div class="rubric-step"><span class="rubric-tag">Câu 1 (0.3đ)</span> • Nếu $p < 0$: $\\lim_{n \\to \\infty} \\frac{n^{-p}}{\\ln n} = +\\infty \\neq 0 \\Rightarrow$ chuỗi <b>phân kỳ</b>.<br>
            • Nếu $0 \\le p \\le 1$: dãy $b_n = \\frac{1}{n^p \\ln n} \\searrow 0$ nên chuỗi hội tụ theo Leibniz; tuy nhiên chuỗi trị tuyệt đối $\\sum_{n=2}^{\\infty} \\frac{1}{n^p \\ln n}$ phân kỳ (vì với $p < 1$ thì $\\frac{1}{n^p \\ln n} > \\frac{1}{n}$ khi $n$ đủ lớn; với $p = 1$ dùng tiêu chuẩn tích phân $\\int_2^\\infty \\frac{dx}{x\\ln x} = +\\infty$). Vậy chuỗi <b>hội tụ có điều kiện</b>.<br>
            • Nếu $p > 1$: với $n \\ge 3$ ($\\ln n > 1$), $\\frac{1}{n^p \\ln n} < \\frac{1}{n^p}$, mà $\\sum \\frac{1}{n^p}$ hội tụ nên chuỗi <b>hội tụ tuyệt đối</b>.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 2 (0.25đ)</span> Tính $R = \\lim_{n \\to \\infty} \\frac{(n + 1)\\ln(n + 1)}{n \\ln n} = 1 \\Rightarrow 0 < x < 2$. Tại $x = 0$: $\\sum_{n=2}^{\\infty} \\frac{(-1)^n}{n \\ln n}$ hội tụ (Leibniz). Tại $x = 2$: $\\sum_{n=2}^{\\infty} \\frac{1}{n \\ln n}$ phân kỳ (tiêu chuẩn tích phân). Miền hội tụ: <b>$[0, 2)$</b>.</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 3 (0.25đ)</span> Từ $\\sum_{n=1}^{\\infty} n x^n = \\frac{x}{(1 - x)^2}$ ($|x| < 1$), đạo hàm từng số hạng được $\\sum_{n=1}^{\\infty} n^2 x^{n-1} = \\frac{(1 - x)^2 + 2x(1 - x)}{(1 - x)^4} = \\frac{1 + x}{(1 - x)^3}$. Nhân hai vế với $x$:
            $$\\sum_{n=1}^{\\infty} n^2 x^n = \\frac{x(1 + x)}{(1 - x)^3}, \\qquad |x| < 1.$$</div>
            <div class="rubric-step"><span class="rubric-tag">Câu 4 (0.2đ)</span> Với mọi $x \\in \\mathbb{R}$, $\\left|\\frac{\\sin(nx)}{n^2}\\right| \\le \\frac{1}{n^2}$ và $\\sum_{n=1}^{\\infty} \\frac{1}{n^2}$ hội tụ $\\Rightarrow$ chuỗi hội tụ đều trên $\\mathbb{R}$ theo Weierstrass. Vì mỗi số hạng $\\frac{\\sin(nx)}{n^2}$ liên tục trên $\\mathbb{R}$ và chuỗi hội tụ đều trên $\\mathbb{R}$, nên hàm tổng <b>liên tục trên $\\mathbb{R}$</b>.</div>
            <div class="rubric-trap">⚠️ <b>Lỗi mất điểm tự luận:</b> Ở câu 1) cẩn thận trường hợp biên $p = 0$: $\\frac{1}{\\ln n}$ vẫn giảm về $0$ nên chuỗi $\\sum \\frac{(-1)^n}{\\ln n}$ VẪN hội tụ có điều kiện (chứ không phân kỳ như khi $p < 0$)!</div>
          </div>`,
      },
    ],
    quiz: [
      {
        question:
          "Điều kiện cần và đủ để chuỗi hình học $\\sum_{n=0}^{\\infty} a q^n$ ($a \\neq 0$) hội tụ là:",
        options: ["$q < 1$", "$|q| < 1$", "$|q| \\le 1$", "$q > -1$"],
        answer: 1,
        explanation:
          "Chuỗi hình học hội tụ khi và chỉ khi $|q| < 1$ (tức $-1 < q < 1$), không phải chỉ cần $q < 1$.",
      },
      {
        question:
          "Nếu $a_n > 0$ và $\\lim_{n \\to \\infty} \\frac{a_{n+1}}{a_n} = 1$, ta kết luận gì về chuỗi $\\sum a_n$?",
        options: [
          "Chuỗi hội tụ",
          "Chuỗi phân kỳ",
          "Tiêu chuẩn D’Alembert không kết luận được, cần đổi phương pháp",
          "Chuỗi hội tụ có điều kiện",
        ],
        answer: 2,
        explanation:
          "Cả $\\sum \\frac{1}{n}$ (phân kỳ) và $\\sum \\frac{1}{n^2}$ (hội tụ) đều có tỉ số tiến về $1$, nên $L = 1$ không đủ để kết luận.",
      },
      {
        question:
          "Chuỗi số $\\sum_{n=2}^{\\infty} \\frac{1}{n(\\ln n)^p}$ hội tụ khi và chỉ khi:",
        options: ["$p > 1$", "$p \\ge 1$", "$p > 0$", "$p < 1$"],
        answer: 0,
        explanation:
          "Theo tiêu chuẩn tích phân đặt $t = \\ln x$, $\\int_2^{\\infty} \\frac{dx}{x(\\ln x)^p} = \\int_{\\ln 2}^{\\infty} \\frac{dt}{t^p}$ hội tụ $\\iff p > 1$.",
      },
      {
        question:
          "Cho chuỗi $\\sum_{n=1}^{\\infty} \\frac{(-1)^{n-1}}{n^p}$. Chuỗi này hội tụ có điều kiện khi:",
        options: ["$p > 1$", "$p > 0$", "$0 < p \\le 1$", "$p \\le 0$"],
        answer: 2,
        explanation:
          "Với $0 < p \\le 1$, chuỗi hội tụ theo tiêu chuẩn Leibniz nhưng chuỗi trị tuyệt đối $\\sum \\frac{1}{n^p}$ phân kỳ nên hội tụ có điều kiện.",
      },
      {
        question:
          "Khẳng định nào sau đây ĐÚNG về chuỗi hàm $\\sum_{n=1}^{\\infty} (x^n - x^{n+1})$?",
        options: [
          "Hội tụ đều trên $[0, 1)$",
          "Hội tụ điểm về $x$ trên $[0, 1)$ nhưng không hội tụ đều trên $[0, 1)$",
          "Không hội tụ điểm tại $x = 1/2$",
          "Hội tụ đều trên $[0, 1]$",
        ],
        answer: 1,
        explanation:
          "Trên $[0, 1)$, $S_N(x) = x - x^{N+1} \\to x$, nhưng $\\sup_{0 \\le x < 1} x^{N+1} = 1 \\not\\to 0$ nên không hội tụ đều trên $[0, 1)$.",
      },
      {
        question:
          "Miền hội tụ của chuỗi lũy thừa $\\sum_{n=1}^{\\infty} \\frac{(x - 2)^n}{n}$ là:",
        options: ["$(1, 3)$", "$[1, 3]$", "$[1, 3)$", "$(1, 3]$"],
        answer: 2,
        explanation:
          "$R = 1 \\Rightarrow 1 < x < 3$. Tại $x = 1$ chuỗi $\\sum \\frac{(-1)^n}{n}$ hội tụ (Leibniz); tại $x = 3$ chuỗi $\\sum \\frac{1}{n}$ phân kỳ. Vậy miền hội tụ là $[1, 3)$.",
      },
      {
        question:
          "Bán kính hội tụ $R$ của chuỗi lũy thừa $\\sum_{n=1}^{\\infty} \\frac{n!}{n^n} x^n$ bằng:",
        options: ["$R = 0$", "$R = 1$", "$R = e$", "$R = \\frac{1}{e}$"],
        answer: 2,
        explanation:
          "$\\rho = \\lim_{n \\to \\infty} \\left|\\frac{a_{n+1}}{a_n}\\right| = \\lim_{n \\to \\infty} \\frac{1}{(1 + 1/n)^n} = \\frac{1}{e}$, nên $R = \\frac{1}{\\rho} = e$.",
      },
      {
        question:
          "Khai triển Maclaurin của hàm số $\\ln(1 + x)$ là $\\sum_{n=1}^{\\infty} (-1)^{n-1}\\frac{x^n}{n}$ đúng trên miền nào?",
        options: [
          "$(-1, 1)$",
          "$(-1, 1]$",
          "$[-1, 1]$",
          "$x \\in \\mathbb{R}$",
        ],
        answer: 1,
        explanation:
          "Khai triển $\\ln(1 + x)$ có bán kính hội tụ $R = 1$, phân kỳ tại $x = -1$ và hội tụ (về $\\ln 2$) tại $x = 1$, nên đúng trên $(-1, 1]$.",
      },
    ],
  },
];
