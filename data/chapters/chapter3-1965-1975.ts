import type { LibraryChapter, MediaItem } from '@/types/library';

// A default background image used as a placeholder.
const defaultBackground = require('@/assets/images/partial-react-logo.png');

// This object contains all the interactive media for Chapter 3.
const chapter3Media: Record<string, MediaItem> = {
  'tet-mau-than': {
    id: 'tet-offensive-1968',
    type: 'image',
    title: 'Tổng tiến công Tết Mậu Thân 1968',
    description: 'Cuộc Tổng tiến công và nổi dậy Tết Mậu Thân (30/1/1968) là đỉnh cao của nghệ thuật quân sự và chính trị Việt Nam. Tấn công đồng loạt vào hầu hết các thành phố, thị xã, căn cứ địch.',
    items: [
      require('@/assets/images/tet-mau-than.jpg'),
    ],
    caption: 'Chiến dịch đánh dấu bước ngoặt trong cuộc chiến, buộc Mỹ phải ngừng ném bom miền Bắc.',
  },
  'chien-dich-ho-chi-minh': {
    id: 'ho-chi-minh-campaign',
    type: 'image',
    title: 'Chiến dịch Hồ Chí Minh (26/4 - 30/4/1975)',
    description: 'Chiến dịch Hồ Chí Minh là đỉnh cao nghệ thuật quân sự Việt Nam, kết hợp tiến công quân sự với nổi dậy chính trị. Hơn 200.000 quân chủ lực từ nhiều hướng tiến công vào Sài Gòn.',
    items: [
      require('@/assets/images/chien-dich-hcm.webp'),
      require('@/assets/images/chien-dich-hcm.webp2.jpeg'),
    ],
    caption: 'Chiến dịch kết thúc với việc giải phóng hoàn toàn Sài Gòn ngày 30/4/1975.',
  },
  'hiep-dinh-paris': {
    id: 'paris-peace-accords',
    type: 'image',
    title: 'Hiệp định Paris (27/1/1973)',
    description: 'Hiệp định Paris được ký kết ngày 27/1/1973, buộc Mỹ phải công nhận độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ Việt Nam.',
    items: [
      require('@/assets/images/hiep-dinh-paris.jpg'),
    ],
    caption: 'Thắng lợi ngoại giao lớn đánh dấu sự phá sản của chiến lược "Việt Nam hóa chiến tranh".',
  },
  'chien-tranh-pha-hoai': {
    id: 'bombing-campaign',
    type: 'image',
    title: 'Chiến tranh phá hoại miền Bắc',
    description: 'Mỹ thực hiện các cuộc ném bom dữ dội miền Bắc (1965-1968 và 1972), nhưng nhân dân miền Bắc kiên cường chống trả với khẩu hiệu "Vừa đánh vừa xây".',
    items: [
      require('@/assets/images/nem-bom-mien-bac.jpg'),
    ],
    caption: 'Chiến dịch "Hà Nội - Điện Biên Phủ trên không" bị đập tan hoàn toàn.',
  },
  'giai-phong-30-4': {
    id: 'liberation-day',
    type: 'image',
    title: 'Ngày 30/4/1975 - Đại thắng mùa Xuân',
    description: 'Ngày 30/4/1975, Sài Gòn được giải phóng hoàn toàn, chế độ ngụy quyền Sài Gòn sụp đổ. Đất nước thống nhất, độc lập, toàn vẹn lãnh thổ.',
    items: [
      require('@/assets/images/30-4-1975.jpg'),
    ],
    caption: 'Kết thúc 30 năm chiến tranh, hoàn thành độc lập dân tộc và thống nhất đất nước.',
  },
  'quan-doi-my': {
    id: 'us-forces',
    type: 'image',
    title: 'Quân đội Mỹ tại Việt Nam',
    description: 'Từ 1965-1973, quân đội Mỹ triển khai hơn 500.000 quân viễn chinh tại miền Nam Việt Nam, cùng với vũ khí hiện đại và chiến thuật "chiến tranh cục bộ".',
    items: [
      require('@/assets/images/quan-doi-my.webp'),
    ],
    caption: 'Dù có vũ khí và công nghệ hiện đại, quân đội Mỹ vẫn thất bại trước ý chí và nghệ thuật quân sự của nhân dân Việt Nam.',
  },
};

// This file contains the data exclusively for Chapter 3.
export const chapter3: LibraryChapter = {
  id: 'chapter-1965-1975',
  title: 'Giai đoạn 1965 - 1975',
  featuredQuote: 'Đánh cho Mỹ cút, đánh cho Nguỵ nhào.',
  backgroundImage: defaultBackground,
  media: chapter3Media,
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

Cuộc [Tổng tiến công và nổi dậy Tết Mậu Thân](tet-mau-than) (30/1/1968) là đỉnh cao của nghệ thuật quân sự và chính trị Việt Nam. Tấn công đồng loạt vào hầu hết các thành phố, thị xã, căn cứ địch.

Kết quả: Chiến lược "chiến tranh cục bộ" phá sản hoàn toàn, Mỹ buộc phải tuyên bố ngừng ném bom miền Bắc (1/11/1968) và chuyển sang chiến lược "Việt Nam hóa chiến tranh".

**Đánh bại chiến lược "Việt Nam hóa chiến tranh" (1969-1973)**

Mỹ rút dần quân về, tăng cường cho quân đội Sài Gòn, "để người Việt đánh người Việt". Cuộc [chiến tranh phá hoại](chien-tranh-pha-hoai) lần 2 ở miền Bắc (1972).

Quân dân miền Nam tiếp tục tiến công địch. Miền Bắc kiên cường chống chiến tranh phá hoại, đập tan chiến dịch "Hà Nội - Điện Biên Phủ trên không".

Kết quả: Chiến lược "Việt Nam hóa chiến tranh" phá sản, buộc Mỹ phải ký [Hiệp định Paris](hiep-dinh-paris) ngày 27/1/1973, công nhận độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ Việt Nam.

**Tổng tiến công và nổi dậy Mùa Xuân 1975**

Sau khi Mỹ rút quân, Đảng quyết định phát động chiến dịch tổng tiến công giải phóng hoàn toàn miền Nam.

[Chiến dịch Hồ Chí Minh](chien-dich-ho-chi-minh) (26/4 - 30/4/1975) là đỉnh cao nghệ thuật quân sự Việt Nam, kết hợp tiến công quân sự với nổi dậy chính trị. Hơn 200.000 quân chủ lực từ nhiều hướng tiến công vào Sài Gòn.

[Ngày 30/4/1975](giai-phong-30-4), Sài Gòn được giải phóng hoàn toàn, chế độ nguỵ quyền Sài Gòn sụp đổ. Đất nước thống nhất, độc lập, toàn vẹn lãnh thổ.

**Ý nghĩa lịch sử**

- Kết thúc 30 năm chiến tranh, hoàn thành độc lập dân tộc và thống nhất đất nước
- Thắng lợi của đường lối đúng đắn, sáng tạo của Đảng, của khối đại đoàn kết toàn dân tộc
- Biểu tượng chủ nghĩa anh hùng cách mạng và đại đoàn kết dân tộc
- Cổ vũ phong trào giải phóng dân tộc thế giới, góp phần bảo vệ hòa bình`,
};
