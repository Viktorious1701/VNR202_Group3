import type { LibraryChapter, MediaItem } from '@/types/library';

// A default background image used as a placeholder.
const defaultBackground = require('@/assets/images/partial-react-logo.png');

// This object contains all the interactive media for Chapter 2.
const chapter2Media: Record<string, MediaItem> = {
  'congress-iii': {
    id: 'congress-hall',
    type: 'gallery',
    title: 'Đại hội Đảng lần thứ III',
    description: 'Hình ảnh từ Đại hội đại biểu toàn quốc lần thứ III của Đảng, tháng 9/1960.',
    images: [
      require('@/assets/images/partial-react-logo.png'), // Placeholder for Hội trường
      require('@/assets/images/react-logo.png'), // Placeholder for HCM Speech
    ],
    caption: '525 đại biểu chính thức và 51 đại biểu dự khuyết đã tham dự sự kiện lịch sử này.',
  },
  'strategic-hamlet': {
    id: 'hamlet-map',
    type: 'gallery',
    title: 'Ấp chiến lược',
    description: 'Chương trình "ấp chiến lược" là xương sống của chiến lược "chiến tranh đặc biệt" do Mỹ-nguỵ đề ra.',
    images: [
      require('@/assets/images/partial-react-logo.png'), // Placeholder for map
      require('@/assets/images/react-logo.png'), // Placeholder for people breaking the hamlet
    ],
    caption: 'Dù dự kiến xây dựng 17.000 ấp, nhưng chỉ 1/3 được hoàn thành do sự phản kháng mạnh mẽ của nhân dân.',
  },
  'ap-bac': {
    id: 'ap-bac-battle',
    type: 'image',
    title: 'Chiến thắng Ấp Bắc',
    description: 'Trận Ấp Bắc tại Mỹ Tho ngày 2/1/1963 là một thắng lợi quân sự vang dội, chứng tỏ khả năng đánh bại các chiến thuật hiện đại của địch.',
    images: [require('@/assets/images/react-logo.png')],
    caption: 'Chiến thắng này đã dấy lên phong trào "Thi đua Ấp Bắc, giết giặc lập công" trên toàn miền Nam.',
  },
  'kennedy': {
    id: 'kennedy-strategy',
    type: 'image',
    title: 'Tổng thống Kennedy',
    description: 'Tổng thống John F. Kennedy là người đã đề ra chiến lược "chiến tranh đặc biệt" tại Việt Nam.',
    images: [require('@/assets/images/partial-react-logo.png')],
    caption: 'Công thức của chiến lược là: Quân nguỵ + vũ khí Mỹ + cố vấn Mỹ.',
  },
  'diem-nhu': {
    id: 'coup-1963',
    type: 'image',
    title: 'Đảo chính 1/11/1963',
    description: 'Cuộc đảo chính do Mỹ hậu thuẫn đã lật đổ chế độ của anh em Ngô Đình Diệm và Ngô Đình Nhu.',
    images: [require('@/assets/images/react-logo.png')],
    caption: 'Sau đảo chính, tình hình chính trị ở miền Nam Việt Nam càng trở nên bất ổn.',
  },
  'binh-gia': {
    id: 'binh-gia-victory',
    type: 'image',
    title: 'Chiến thắng Bình Giã',
    description: 'Trận chiến diễn ra tại Bình Giã, Bà Rịa vào tháng 12/1964.',
    images: [require('@/assets/images/react-logo.png')],
    caption: 'Một trong những chiến thắng quan trọng góp phần làm phá sản "chiến tranh đặc biệt".',
  },
  'ba-gia': {
    id: 'ba-gia-victory',
    type: 'image',
    title: 'Chiến thắng Ba Gia',
    description: 'Trận chiến tại Ba Gia, Quảng Ngãi vào tháng 6/1965.',
    images: [require('@/assets/images/partial-react-logo.png')],
    caption: 'Tiếp tục khẳng định sự thất bại không thể tránh khỏi của chiến lược chiến tranh của địch.',
  },
  'dong-xoai': {
    id: 'dong-xoai-victory',
    type: 'image',
    title: 'Chiến thắng Đồng Xoài',
    description: 'Trận Đồng Xoài, Bình Phước vào tháng 6/1965 là một trong những đòn quyết định.',
    images: [require('@/assets/images/react-logo.png')],
    caption: 'Thắng lợi này đã góp phần làm phá sản hoàn toàn chiến lược "chiến tranh đặc biệt", buộc Mỹ phải leo thang.',
  },
};

// This file contains the data exclusively for Chapter 2.
export const chapter2: LibraryChapter = {
  id: 'chapter-1961-1965',
  title: 'Giai đoạn 1961 - 1965',
  featuredQuote: 'Đại hội xây dựng chủ nghĩa xã hội ở miền Bắc và đấu tranh hòa bình thống nhất nước nhà.',
  backgroundImage: defaultBackground,
  media: chapter2Media,
  content: `**Đại hội đại biểu toàn quốc lần thứ III của Đảng (9/1960)**

Đại hội họp tháng 9/1960 với 525 đại biểu chính thức và 51 đại biểu dự khuyết. Chủ tịch Hồ Chí Minh nêu rõ: "[Đại hội lần này là Đại hội xây dựng chủ nghĩa xã hội ở miền Bắc và đấu tranh hòa bình thống nhất nước nhà](congress-iii)".

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

Tổng thống [Kennedy](kennedy) đề ra chiến lược "chiến tranh đặc biệt": Quân nguỵ + vũ khí Mỹ + cố vấn Mỹ. Âm mưu tiêu diệt phong trào tiến công và nổi dậy ở miền Nam.

Mỹ tăng cường bình định, lập [ấp chiến lược](strategic-hamlet) để tách dân ra khỏi cách mạng. Dự kiến thành lập 17.000 [ấp chiến lược](strategic-hamlet), coi đây là chương trình xương sống.

**Chủ trương của ta**

Tháng 1/1961 và tháng 2/1962, Bộ Chính trị ra chỉ thị về "Phương hướng và nhiệm vụ công tác trước mắt của cách mạng miền Nam". Giữ vững thế chiến lược tiến công đã giành được từ sau phong trào Đồng khởi.

- Đẩy mạnh đấu tranh vũ trang song song với đấu tranh chính trị
- Tiến công địch trên cả 3 vùng chiến lược: nông thôn rừng núi, nông thôn đồng bằng, thành thị

**Các chiến thắng vang dội**

[Chiến thắng Ấp Bắc](ap-bac) (Mỹ Tho) ngày 2/1/1963 đã chứng minh sức mạnh và hiệu quả của đấu tranh vũ trang kết hợp chính trị và binh vận. Cả miền Nam dấy lên phong trào "Thi đua Ấp Bắc giết giặc lập công".

Phong trào phá [ấp chiến lược](strategic-hamlet) diễn ra mạnh mẽ. Mỹ-nguỵ chỉ xây dựng được 1/3 trong số 17.000 ấp dự định.

Ngày 1/11/1963, Mỹ đảo chính lật đổ anh em [Diệm-Nhu](diem-nhu), nhưng tình hình chính trị miền Nam vẫn bất ổn.

Chiến thắng [Bình Giã](binh-gia) (Bà Rịa) tháng 12/1964, tiếp theo là các chiến thắng [Ba Gia](ba-gia) (Quảng Ngãi) và [Đồng Xoài](dong-xoai) (Bình Phước) tháng 6/1965 đã làm phá sản hoàn toàn chiến lược "chiến tranh đặc biệt", buộc Mỹ phải chuyển sang "chiến tranh cục bộ".`,
};