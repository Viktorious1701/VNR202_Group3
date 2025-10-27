import type { LibraryChapter, MediaItem } from '@/types/library';

// A default background image used as a placeholder.
const defaultBackground = require('@/assets/images/partial-react-logo.png');

// This object contains all the interactive media for Chapter 4.
const chapter4Media: Record<string, MediaItem> = {
  'independence': {
    id: 'national-independence',
    type: 'image',
    title: 'Độc lập Dân tộc',
    description: 'Tinh thần độc lập, tự chủ là nền tảng của mọi thắng lợi.',
    items: [require('@/assets/images/national-independence-01.jpg')],
    caption: 'Độc lập dân tộc gắn liền với chủ nghĩa xã hội.',
  },
  'unity': {
    id: 'national-unity',
    type: 'gallery',
    title: 'Đại Đoàn Kết Toàn Dân Tộc',
    description: 'Khối đại đoàn kết là nguồn sức mạnh vô tận của dân tộc.',
    items: [
      require('@/assets/images/national-unity-01.jpg'),
      require('@/assets/images/national-unity-02.jpg'),
    ],
    caption: 'Đoàn kết các dân tộc, tôn giáo, giai cấp trong xã hội.',
  },
  'fatherland-front': {
    id: 'fatherland-front',
    type: 'image',
    title: 'Mặt trận Tổ quốc Việt Nam',
    description: 'Tổ chức chính trị-xã hội rộng rãi của nhân dân.',
    items: [require('@/assets/images/fatherland-front-logo-01.png')],
    caption: 'Mặt trận Tổ quốc đoàn kết mọi tầng lớp nhân dân.',
  },
  'peoples-defense': {
    id: 'peoples-defense',
    type: 'gallery',
    title: 'Quốc phòng Toàn dân',
    description: 'Xây dựng nền quốc phòng toàn dân vững mạnh.',
    items: [
      require('@/assets/images/peoples-defense-01.jpg'),
      require('@/assets/images/modern-military-01.jpg'),
    ],
    caption: 'Kết hợp quốc phòng với phát triển kinh tế.',
  },
  'cpv-emblem': {
    id: 'party-leadership',
    type: 'image',
    title: 'Đảng Cộng sản Việt Nam',
    description: 'Vai trò lãnh đạo của Đảng là nhân tố quyết định mọi thắng lợi.',
    items: [require('@/assets/images/cpv-emblem-01.png')],
    caption: 'Đảng là người tổ chức, lãnh đạo mọi thắng lợi của cách mạng.',
  },
  'modernization': {
    id: 'industrialization',
    type: 'gallery',
    title: 'Công nghiệp hóa, Hiện đại hóa',
    description: 'Con đường phát triển đất nước trong thời kỳ mới.',
    items: [
      require('@/assets/images/modernization-01.jpg'),
      require('@/assets/images/industrialization-01.jpg'),
    ],
    caption: 'Đẩy mạnh công nghiệp hóa, hiện đại hóa đất nước.',
  },
  'integration': {
    id: 'international-integration',
    type: 'image',
    title: 'Hội nhập Quốc tế',
    description: 'Việt Nam chủ động, tích cực hội nhập quốc tế.',
    items: [require('@/assets/images/international-integration-01.jpg')],
    caption: 'Hội nhập quốc tế sâu rộng, giữ vững độc lập tự chủ.',
  },
  'maritime-sovereignty': {
    id: 'sovereignty',
    type: 'gallery',
    title: 'Chủ quyền Biển đảo',
    description: 'Bảo vệ vững chắc chủ quyền biển, đảo Việt Nam.',
    items: [
      require('@/assets/images/vietnam-maritime-map-01.jpeg'),
    ],
    caption: 'Kiên quyết, kiên trì bảo vệ chủ quyền lãnh thổ.',
  },
};

// This file contains the data exclusively for Chapter 4.
export const chapter4: LibraryChapter = {
  id: 'chapter-lessons',
  title: 'Bài học và Liên hệ thực tiễn',
  featuredQuote: 'Vai trò lãnh đạo của Đảng là nhân tố quyết định mọi thắng lợi của cách mạng Việt Nam.',
  backgroundImage: defaultBackground,
  media: chapter4Media,
  content: `Thắng lợi vĩ đại của cuộc kháng chiến chống Mỹ, cứu nước đã để lại nhiều bài học kinh nghiệm quý báu cho công cuộc xây dựng và bảo vệ Tổ quốc hiện nay.

**Bài học kinh nghiệm**

1. Kiên định mục tiêu [độc lập dân tộc](independence) gắn với chủ nghĩa xã hội
2. Phát huy sức mạnh toàn dân tộc, [khối đại đoàn kết](unity)
3. Kết hợp đấu tranh quân sự với chính trị-ngoại giao
4. Vai trò [lãnh đạo của Đảng](cpv-emblem) là nhân tố quyết định mọi thắng lợi
5. Độc lập, tự chủ, sáng tạo trong đường lối cách mạng
[PAGEBREAK]

**1. Tinh thần độc lập, tự chủ trong hội nhập quốc tế**

Bài học về [độc lập, tự chủ](independence) trong kháng chiến có giá trị quan trọng với Việt Nam hiện nay. Việt Nam cần kiên định con đường xã hội chủ nghĩa, không phụ thuộc về kinh tế, chính trị vào các nước lớn. Chính sách đối ngoại thể hiện tinh thần tự chủ, chủ động, không ngả theo phe nào.


**2. Sức mạnh đại đoàn kết toàn dân tộc**

[Khối đại đoàn kết toàn dân tộc](unity) là nguồn sức mạnh để giành thắng lợi. Hiện nay, Đảng tiếp tục phát huy truyền thống này thông qua [Mặt trận Tổ quốc Việt Nam](fatherland-front). Đoàn kết toàn dân là chìa khóa để phát triển kinh tế, bảo vệ [chủ quyền biển đảo](maritime-sovereignty), đấu tranh chống "diễn biến hòa bình".
[PAGEBREAK]
**3. Xây dựng và bảo vệ Tổ quốc trong kỷ nguyên mới**

Bài học "vừa xây vừa đánh" được vận dụng sáng tạo: vừa phát triển kinh tế, vừa tăng cường [quốc phòng-an ninh](peoples-defense). Việt Nam hiện đại hóa quân đội, xây dựng [nền quốc phòng toàn dân](peoples-defense), sẵn sàng bảo vệ vững chắc độc lập, chủ quyền. Đồng thời tích cực tham gia các diễn đàn quốc tế, mở rộng [hợp tác quốc tế](integration).

Khẩu hiệu "Tất cả để đánh thắng giặc Mỹ xâm lược" trong thời kỳ kháng chiến nay được vận dụng thành tinh thần "Tất cả để xây dựng và bảo vệ Tổ quốc Việt Nam xã hội chủ nghĩa".

**4. Vai trò lãnh đạo của Đảng - Nhân tố quyết định**

Vai trò [lãnh đạo của Đảng](cpv-emblem) là nhân tố quyết định mọi thắng lợi của cách mạng Việt Nam. Trong thời kỳ đổi mới, Đảng tiếp tục khẳng định vai trò lãnh đạo toàn diện, xây dựng Đảng trong sạch vững mạnh, chống tham nhũng, tiêu cực. 

Kinh nghiệm lãnh đạo linh hoạt, sáng tạo trong kháng chiến - thể hiện qua việc điều chỉnh chiến lược phù hợp với từng giai đoạn - được vận dụng vào công cuộc [công nghiệp hóa, hiện đại hóa](modernization) đất nước và [hội nhập quốc tế](integration) sâu rộng.`,
};
