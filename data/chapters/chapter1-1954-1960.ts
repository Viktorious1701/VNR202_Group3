import type { LibraryChapter, MediaItem } from '@/types/library';

// A default background image used as a placeholder.
const defaultBackground = require('@/assets/images/partial-react-logo.png');

// This object contains all the interactive media for Chapter 1.
const chapter1Media: Record<string, MediaItem> = {
  'dong-khoi': {
    id: 'dong-khoi-movement',
    type: 'image',
    title: 'Phong trào Đồng khởi',
    description: 'Phong trào "Đồng khởi" bắt đầu từ Bến Tre ngày 17/1/1960, đã tạo ra một bước ngoặt chiến lược.',
    items: [require('@/assets/images/Dong Khoi 2.png')],
    caption: 'Nhân dân đồng loạt nổi dậy, phá tan ấp chiến lược, giành chính quyền.',
  },
  'truong-son': {
    id: 'truong-son-road',
    type: 'image',
    title: 'Đường Trường Sơn',
    description: 'Đường Trường Sơn được mở để chi viện cho miền Nam, mang tên đường 559 trên bộ và đường 759 trên biển.',
    items: [require('@/assets/images/TruongSon.png')],
    caption: 'Con đường huyền thoại kết nối miền Bắc và miền Nam trong cuộc kháng chiến.',
  },
};

// This file contains the data exclusively for Chapter 1.
export const chapter1: LibraryChapter = {
  id: 'chapter-1954-1960',
  title: 'Giai đoạn 1954 - 1960',
  featuredQuote: 'Chuyển cách mạng miền Nam từ thế giữ gìn lực lượng sang thế tiến công.',
  backgroundImage: defaultBackground,
  media: chapter1Media,
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

Trước tình hình đó, Hội nghị lần thứ 15 (1/1959) đã ra quyết định lịch sử, mở đường Trường Sơn để chi viện miền Nam. Đường vận tải trên bộ mang tên [đường 559](truong-son), trên biển mang tên đường 759.

**Phong trào "Đồng khởi"**

[Phong trào "Đồng khởi"](dong-khoi), bắt đầu từ Bến Tre ngày 17/1/1960, đã tạo ra một bước ngoặt chiến lược, chuyển cách mạng miền Nam từ thế phòng thủ sang thế tiến công. Nhân dân đồng loạt nổi dậy, phá tan ấp chiến lược, giành chính quyền. Đến cuối năm 1960, phong trào làm tan rã cơ cấu chính quyền cơ sở địch ở nhiều vùng.

Thắng lợi này dẫn đến sự ra đời của Mặt trận Dân tộc Giải phóng miền Nam Việt Nam vào ngày 20/12/1960 tại Tân Lập, Tây Ninh.`,
};
