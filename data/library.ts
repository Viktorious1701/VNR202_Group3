// VNR202_Group3/data/library.ts
import type { LibraryBook } from '@/types/library';

// A default background image used as a placeholder.
// This can be replaced with actual historical images for each chapter.
const defaultBackground = require('@/assets/images/partial-react-logo.png');

export const libraryBooks: LibraryBook[] = [
  // This single LibraryBook object contains the entire historical text you provided.
  // The content is structured into distinct chapters based on the main sections of the source text.
  {
    // --- BOOK METADATA ---
    // This section defines the overall book that will be displayed in the library.
    id: 'history-vnr-1954-1975',
    title: 'Lãnh Đạo Cách Mạng (1954 - 1975)',
    author: 'Lịch sử Đảng Cộng sản Việt Nam',
    year: '1954-1975',
    category: 'history',
    progress: 0, // Initial progress is set to 0 for a new book.
    highlightTag: 'Toàn Tập',
    synopsis: 'Tổng quan về sự lãnh đạo của Đảng trong công cuộc xây dựng CNXH ở miền Bắc và kháng chiến chống Mỹ, giải phóng miền Nam, thống nhất đất nước.',
    featuredQuote: 'Chống Mỹ cứu nước là nhiệm vụ thiêng liêng nhất của cả dân tộc từ Nam chí Bắc.',
    coverColor: '#DA291C', // Inspired by the national flag color.
    accentColor: '#FFCD00', // Inspired by the national flag color.
    readingTimeMinutes: 120, // Estimated total reading time in minutes.
    chapters: [
      // --- CHAPTER 1: 1954 - 1960 ---
      // Corresponds to section II.1 in the source text.
      {
        id: 'chapter-1954-1960',
        title: 'Giai đoạn 1954 - 1960',
        featuredQuote: 'Chuyển cách mạng miền Nam từ thế giữ gìn lực lượng sang thế tiến công.',
        backgroundImage: defaultBackground,
        content: `**Bối cảnh lịch sử**

Sau Hiệp định Genève, đất nước tạm thời bị chia cắt làm hai miền với hai chế độ chính trị khác nhau. Miền Bắc tiến lên chủ nghĩa xã hội, miền Nam vẫn chịu ách thống trị của đế quốc Mỹ và tay sai. Kẻ thù là đế quốc Mỹ hùng mạnh, âm mưu bá chủ thế giới. Tuy nhiên, miền Bắc được hoàn toàn giải phóng, làm căn cứ địa hậu phương cho cả nước.

**Chiến lược củng cố miền Bắc**

Các hội nghị Trung ương lần thứ 7 (3/1955) và lần thứ 8 (8/1955) nhận định: Muốn chống Mỹ, củng cố hòa bình, thực hiện thống nhất, điều cốt lõi là củng cố miền Bắc, đồng thời giữ vững và đẩy mạnh đấu tranh ở miền Nam.

**Cải cách ruộng đất**

Đến tháng 7/1956, cải cách ruộng đất căn bản hoàn thành. Hơn 9 triệu người trong hơn 2 triệu hộ được chia hơn 810.000 ha ruộng đất. Chế độ chiếm hữu ruộng đất phong kiến bị xóa bỏ hoàn toàn. Tuy nhiên, đã phạm sai lầm: cường điệu hóa đấu tranh giai cấp, mở rộng quá mức đối tượng, xử lý oan nhiều cán bộ đảng viên tốt.

**Các hội nghị và kế hoạch phát triển**

- Hội nghị lần thứ 13 (12/1956): Đề ra nhiệm vụ soạn thảo đường lối cách mạng giai đoạn mới
- Hội nghị lần thứ 14 (11/1957): Đề ra kế hoạch 3 năm phát triển kinh tế-văn hóa và cải tạo XHCN (1958-1960)
- Hội nghị lần thứ 16 (4/1959): Thông qua nghị quyết về hợp tác hóa nông nghiệp và cải tạo công thương nghiệp tư bản tư doanh

**Tình hình miền Nam**

Tại miền Nam, với sự hậu thuẫn của Mỹ, Ngô Đình Diệm thiết lập chính quyền độc tài, từ chối tổ chức tổng tuyển cử. Chế độ Diệm thực hiện chính sách khủng bố "Tố cộng diệt cộng", bắt bớ giết hại cán bộ cách mạng tàn khốc.

**Mở đường Trường Sơn**

Trước tình hình đó, Hội nghị lần thứ 15 (1/1959) đã ra quyết định lịch sử, mở đường Trường Sơn để chi viện miền Nam. Đường vận tải trên bộ mang tên đường 559, trên biển mang tên đường 759.

**Phong trào "Đồng khởi"**

Phong trào "Đồng khởi", bắt đầu từ Bến Tre ngày 17/1/1960, đã tạo ra một bước ngoặt chiến lược, chuyển cách mạng miền Nam từ thế phòng thủ sang thế tiến công. Nhân dân đồng loạt nổi dậy, phá tan ấp chiến lược, giành chính quyền. Đến cuối năm 1960, phong trào làm tan rã cơ cấu chính quyền cơ sở địch ở nhiều vùng.

Thắng lợi này dẫn đến sự ra đời của Mặt trận Dân tộc Giải phóng miền Nam Việt Nam vào ngày 20/12/1960 tại Tân Lập, Tây Ninh.`,
      },
      // --- CHAPTER 2: 1961 - 1965 ---
      // Corresponds to section II.2 in the source text.
      {
        id: 'chapter-1961-1965',
        title: 'Giai đoạn 1961 - 1965',
        featuredQuote: 'Đại hội xây dựng chủ nghĩa xã hội ở miền Bắc và đấu tranh hòa bình thống nhất nước nhà.',
        backgroundImage: defaultBackground,
        content: `**Đại hội đại biểu toàn quốc lần thứ III của Đảng (9/1960)**

Đại hội họp tháng 9/1960 với 525 đại biểu chính thức và 51 đại biểu dự khuyết. Chủ tịch Hồ Chí Minh nêu rõ: "Đại hội lần này là Đại hội xây dựng chủ nghĩa xã hội ở miền Bắc và đấu tranh hòa bình thống nhất nước nhà".

**Đường lối chiến lược hai nhiệm vụ**

Đại hội xác định hai nhiệm vụ chiến lược:
- Một là: Đẩy mạnh cách mạng xã hội chủ nghĩa ở miền Bắc
- Hai là: Tiến hành cách mạng dân tộc dân chủ nhân dân ở miền Nam, thực hiện thống nhất nước nhà

Cách mạng XHCN ở miền Bắc giữ vai trò quyết định đối với sự phát triển cách mạng Việt Nam, trong khi cách mạng miền Nam có tác dụng quyết định trực tiếp đối với sự nghiệp giải phóng miền Nam.

**Xây dựng chủ nghĩa xã hội ở miền Bắc**

Đường lối chung thời kỳ quá độ: Đoàn kết toàn dân, phát huy truyền thống, đưa miền Bắc tiến nhanh, tiến mạnh, tiến vững chắc lên CNXH.

Phương hướng cơ bản:
- Cải tạo XHCN đối với nông nghiệp, thủ công nghiệp, công thương nghiệp tư bản tư doanh
- Phát triển kinh tế quốc doanh
- Công nghiệp hóa XHCN: Ưu tiên phát triển công nghiệp nặng hợp lý, đồng thời phát triển nông nghiệp và công nghiệp nhẹ
- Đẩy mạnh cách mạng tư tưởng, văn hóa, kỹ thuật

**Các kế hoạch nhà nước**

- Thời kỳ 1954-1957: Khôi phục kinh tế và bước đầu củng cố miền Bắc
- Kế hoạch 3 năm (1958-1960): Phát triển kinh tế-văn hóa và cải tạo XHCN
- Kế hoạch 5 năm lần thứ nhất (1961-1965): Xây dựng cơ sở vật chất kỹ thuật của CNXH

**Chiến lược "chiến tranh đặc biệt" của Mỹ**

Tổng thống Kennedy đề ra chiến lược "chiến tranh đặc biệt": Quân nguỵ + vũ khí Mỹ + cố vấn Mỹ. Âm mưu tiêu diệt phong trào tiến công và nổi dậy ở miền Nam.

Mỹ tăng cường bình định, lập ấp chiến lược để tách dân ra khỏi cách mạng. Dự kiến thành lập 17.000 ấp chiến lược, coi đây là chương trình xương sống.

**Chủ trương của ta**

Tháng 1/1961 và tháng 2/1962, Bộ Chính trị ra chỉ thị về "Phương hướng và nhiệm vụ công tác trước mắt của cách mạng miền Nam". Giữ vững thế chiến lược tiến công đã giành được từ sau phong trào Đồng khởi.

- Đẩy mạnh đấu tranh vũ trang song song với đấu tranh chính trị
- Tiến công địch trên cả 3 vùng chiến lược: nông thôn rừng núi, nông thôn đồng bằng, thành thị

**Các chiến thắng vang dội**

Chiến thắng Ấp Bắc (Mỹ Tho) ngày 2/1/1963 đã chứng minh sức mạnh và hiệu quả của đấu tranh vũ trang kết hợp chính trị và binh vận. Cả miền Nam dấy lên phong trào "Thi đua Ấp Bắc giết giặc lập công".

Phong trào phá ấp chiến lược diễn ra mạnh mẽ. Mỹ-nguỵ chỉ xây dựng được 1/3 trong số 17.000 ấp dự định.

Ngày 1/11/1963, Mỹ đảo chính lật đổ anh em Diệm-Nhu, nhưng tình hình chính trị miền Nam vẫn bất ổn.

Chiến thắng Bình Giã (Bà Rịa) tháng 12/1964, tiếp theo là các chiến thắng Ba Gia (Quảng Ngãi) và Đồng Xoài (Bình Phước) tháng 6/1965 đã làm phá sản hoàn toàn chiến lược "chiến tranh đặc biệt", buộc Mỹ phải chuyển sang "chiến tranh cục bộ".`,
      },
      // --- CHAPTER 3: 1965 - 1975 ---
      // Corresponds to section II.3 in the source text.
      {
        id: 'chapter-1965-1975',
        title: 'Giai đoạn 1965 - 1975',
        featuredQuote: 'Đánh cho Mỹ cút, đánh cho Nguỵ nhào.',
        backgroundImage: defaultBackground,
        content: `**Đường lối kháng chiến chống Mỹ, cứu nước**

Sau thất bại "chiến tranh đặc biệt", Mỹ chuyển sang "chiến tranh cục bộ", ồ ạt đưa quân viễn chinh vào miền Nam và mở rộng chiến tranh phá hoại ra miền Bắc.

Ban Chấp hành Trung ương Đảng họp Hội nghị lần thứ 11 (3/1965) và lần thứ 12 (12/1965) để nhận định tình hình, đề ra nhiệm vụ lãnh đạo cả nước kháng chiến chống Mỹ.

**Nội dung đường lối**

Quyết tâm chiến lược: Đảng khẳng định có đủ điều kiện chiến thắng đế quốc Mỹ, quyết tâm toàn Đảng, toàn dân quyết đánh thắng Mỹ. "Lúc này chống Mỹ cứu nước là nhiệm vụ thiêng liêng nhất của cả dân tộc từ Nam chí Bắc".

Mục tiêu chiến lược: Kiên quyết đánh bại cuộc chiến tranh xâm lược của đế quốc Mỹ, giải phóng miền Nam, bảo vệ miền Bắc, thống nhất Tổ quốc.

Phương châm chiến lược: Toàn dân, toàn diện, lâu dài, tự lực cánh sinh, dựa vào sức mình là chính.

Nhiệm vụ chiến lược của hai miền:
- Miền Bắc: Vừa chi viện sức người sức của cho tiền tuyến miền Nam, vừa xây dựng CNXH, xây dựng hậu phương vững mạnh
- Miền Nam: Tập trung lực lượng đánh thắng chiến lược "chiến tranh cục bộ" của Mỹ

**Đánh bại chiến lược "chiến tranh cục bộ" (1965-1968)**

Mỹ đưa hơn 500.000 quân viễn chinh và quân chư hầu vào miền Nam. Đồng thời ném bom phá hoại miền Bắc (1965-1968). Lực lượng: Quân Mỹ + quân nguỵ + vũ khí hiện đại.

Cuộc đấu tranh của nhân dân ta:
- Miền Nam: Quân dân anh dũng chiến đấu, kết hợp đấu tranh vũ trang với đấu tranh chính trị. Nhiều chiến thắng lớn: Vạn Tường, Núi Thành, Núi Ba Đen...
- Miền Bắc: Nhân dân kiên cường chống chiến tranh phá hoại, vừa đánh vừa xây, chi viện miền Nam với khẩu hiệu "Tất cả để đánh thắng giặc Mỹ xâm lược".

**Tổng tiến công và nổi dậy Tết Mậu Thân 1968**

Cuộc Tổng tiến công và nổi dậy Tết Mậu Thân (30/1/1968) là đỉnh cao của nghệ thuật quân sự và chính trị Việt Nam. Tấn công đồng loạt vào hầu hết các thành phố, thị xã, căn cứ địch.

Kết quả: Chiến lược "chiến tranh cục bộ" phá sản hoàn toàn, Mỹ buộc phải tuyên bố ngừng ném bom miền Bắc (1/11/1968) và chuyển sang chiến lược "Việt Nam hóa chiến tranh".

**Đánh bại chiến lược "Việt Nam hóa chiến tranh" (1969-1973)**

Mỹ rút dần quân về, tăng cường cho quân đội Sài Gòn, "để người Việt đánh người Việt". Cuộc chiến tranh phá hoại lần 2 ở miền Bắc (1972).

Quân dân miền Nam tiếp tục tiến công địch. Miền Bắc kiên cường chống chiến tranh phá hoại, đập tan chiến dịch "Hà Nội - Điện Biên Phủ trên không".

Kết quả: Chiến lược "Việt Nam hóa chiến tranh" phá sản, buộc Mỹ phải ký Hiệp định Paris ngày 27/1/1973, công nhận độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ Việt Nam.

**Tổng tiến công và nổi dậy Mùa Xuân 1975**

Sau khi Mỹ rút quân, Đảng quyết định phát động chiến dịch tổng tiến công giải phóng hoàn toàn miền Nam.

Chiến dịch Hồ Chí Minh (26/4 - 30/4/1975) là đỉnh cao nghệ thuật quân sự Việt Nam, kết hợp tiến công quân sự với nổi dậy chính trị. Hơn 200.000 quân chủ lực từ nhiều hướng tiến công vào Sài Gòn.

Ngày 30/4/1975, Sài Gòn được giải phóng hoàn toàn, chế độ nguỵ quyền Sài Gòn sụp đổ. Đất nước thống nhất, độc lập, toàn vẹn lãnh thổ.

**Ý nghĩa lịch sử**

- Kết thúc 30 năm chiến tranh, hoàn thành độc lập dân tộc và thống nhất đất nước
- Thắng lợi của đường lối đúng đắn, sáng tạo của Đảng, của khối đại đoàn kết toàn dân tộc
- Biểu tượng chủ nghĩa anh hùng cách mạng và đại đoàn kết dân tộc
- Cổ vũ phong trào giải phóng dân tộc thế giới, góp phần bảo vệ hòa bình`,
      },
      // --- CHAPTER 4: LIÊN HỆ THỰC TIỄN ---
      // Corresponds to the final section of the source text.
      {
        id: 'chapter-lessons',
        title: 'Bài học và Liên hệ thực tiễn',
        featuredQuote: 'Vai trò lãnh đạo của Đảng là nhân tố quyết định mọi thắng lợi của cách mạng Việt Nam.',
        backgroundImage: defaultBackground,
        content: `Thắng lợi vĩ đại của cuộc kháng chiến chống Mỹ, cứu nước đã để lại nhiều bài học kinh nghiệm quý báu cho công cuộc xây dựng và bảo vệ Tổ quốc hiện nay.

**Bài học kinh nghiệm**

1. Kiên định mục tiêu độc lập dân tộc gắn với chủ nghĩa xã hội
2. Phát huy sức mạnh toàn dân tộc, khối đại đoàn kết
3. Kết hợp đấu tranh quân sự với chính trị-ngoại giao
4. Vai trò lãnh đạo của Đảng là nhân tố quyết định mọi thắng lợi
5. Độc lập, tự chủ, sáng tạo trong đường lối cách mạng

**1. Tinh thần độc lập, tự chủ trong hội nhập quốc tế**

Bài học về độc lập, tự chủ trong kháng chiến có giá trị quan trọng với Việt Nam hiện nay. Việt Nam cần kiên định con đường xã hội chủ nghĩa, không phụ thuộc về kinh tế, chính trị vào các nước lớn. Chính sách đối ngoại thể hiện tinh thần tự chủ, chủ động, không ngả theo phe nào.

**2. Sức mạnh đại đoàn kết toàn dân tộc**

Khối đại đoàn kết toàn dân tộc là nguồn sức mạnh để giành thắng lợi. Hiện nay, Đảng tiếp tục phát huy truyền thống này thông qua Mặt trận Tổ quốc Việt Nam. Đoàn kết toàn dân là chìa khóa để phát triển kinh tế, bảo vệ chủ quyền biển đảo, đấu tranh chống "diễn biến hòa bình".

**3. Xây dựng và bảo vệ Tổ quốc trong kỷ nguyên mới**

Bài học "vừa xây vừa đánh" được vận dụng sáng tạo: vừa phát triển kinh tế, vừa tăng cường quốc phòng-an ninh. Việt Nam hiện đại hóa quân đội, xây dựng nền quốc phóng toàn dân, sẵn sàng bảo vệ vững chắc độc lập, chủ quyền. Đồng thời tích cực tham gia các diễn đàn quốc tế, mở rộng hợp tác.

Khẩu hiệu "Tất cả để đánh thắng giặc Mỹ xâm lược" trong thời kỳ kháng chiến nay được vận dụng thành tinh thần "Tất cả để xây dựng và bảo vệ Tổ quốc Việt Nam xã hội chủ nghĩa".

**4. Vai trò lãnh đạo của Đảng - Nhân tố quyết định**

Vai trò lãnh đạo của Đảng là nhân tố quyết định mọi thắng lợi của cách mạng Việt Nam. Trong thời kỳ đổi mới, Đảng tiếp tục khẳng định vai trò lãnh đạo toàn diện, xây dựng Đảng trong sạch vững mạnh, chống tham nhũng, tiêu cực. 

Kinh nghiệm lãnh đạo linh hoạt, sáng tạo trong kháng chiến - thể hiện qua việc điều chỉnh chiến lược phù hợp với từng giai đoạn - được vận dụng vào công cuộc công nghiệp hóa, hiện đại hóa đất nước và hội nhập quốc tế sâu rộng.`,
      },
    ],
  },
];