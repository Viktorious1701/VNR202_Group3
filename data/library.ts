import type { LibraryBook } from '@/types/library';

export const libraryBooks: LibraryBook[] = [
  {
    id: 'history-lsvnr',
    title: 'Hành Trình Cộng Hòa',
    author: 'Nguyễn Thị Hải Miên',
    year: '1955-1975',
    category: 'history',
    progress: 62,
    highlightTag: 'Nổi bật',
    synopsis: 'Ghi chép từ những cuộc họp kín đến đời sống thường nhật trong hai thập niên cộng hòa.',
    featuredQuote: 'Chúng tôi học cách yêu thành phố bằng ánh đèn neon và những phiên chợ sáng.',
    coverColor: '#DA291C',
    accentColor: '#FFCD00',
    readingTimeMinutes: 52,
    chapters: [
      {
        id: 'history-lsvnr-1',
        title: 'Khởi nguyên 1955',
        featuredQuote: 'Một nền cộng hòa ra đời từ cả quyết lẫn do dự.',
        content: `Sau cuộc trưng cầu dân ý năm 1955, nền cộng hòa non trẻ bắt đầu định hình những cơ quan đầu tiên. Các phòng ban dân sự được tái cấu trúc với mục tiêu hiện đại hóa, song vẫn giữ nếp sống truyền thống của miền Nam. Những phiên họp kéo dài đến rạng sáng tại dinh Norodom đặt nền cho hệ thống hành chính mới.

Trên các đại lộ Sài Gòn, sinh viên trường Hành chánh đi lại với tập hồ sơ dưới tay, thuộc lòng những giáo trình mới phiên dịch từ tiếng Pháp. Họ được kỳ vọng trở thành lớp cán bộ kiến tạo tương lai, dù chính họ vẫn đang học cách cân bằng giữa khuôn mẫu phương Tây và tâm thức làng xã.

Bên ngoài đô thị, chương trình ấp chiến lược thử nghiệm tạo nên những cuộc di dời, khiến nông dân vừa hy vọng vừa hoang mang. Lý tưởng cộng hòa vì vậy được hình thành từ cả khát vọng lẫn những điều chỉnh liên tục trong đời sống thực tế.`,
      },
      {
        id: 'history-lsvnr-2',
        title: 'Hạ tầng và nhịp thở đô thị',
        featuredQuote: 'Nhịp xe lam, mùi xăng mới và tiếng hát trên vỉa hè cùng viết nên bức tranh đô thị.',
        content: `Những cây cầu bê tông nối khu trung tâm với vùng Chợ Lớn hoàn thành trong thời gian kỷ lục. Đường Nguyễn Huệ khoác lên đèn điện mới, rạp hát Đại Nam thay áo vàng son với bảng hiệu đèn đỏ rực rỡ. Chính quyền xem hạ tầng là tuyên ngôn của sự tiến bộ.

Sài Gòn cũng trở thành phòng thí nghiệm văn hóa đại chúng, khi các đài phát thanh tư nhân được cấp phép. Mỗi buổi tối, người dân vặn radio nghe bản tin và những ca khúc mới nhất, vừa nghe vừa ghi chú bằng bút mực tím.

Trong khi đó, các tỉnh miền Trung tranh thủ nguồn ngân sách để mở rộng thương cảng và trường học. Sự chênh lệch giữa đô thị và nông thôn vẫn còn, nhưng đường lộ mới giúp tin tức và hàng hóa đi nhanh hơn, tạo nên một mạng lưới kinh tế gắn kết hơn.`,
      },
      {
        id: 'history-lsvnr-3',
        title: 'Ngoại giao và thử thách',
        featuredQuote: 'Mỗi chuyến công du là bài toán giữa niềm tin đồng minh và tiếng nói người dân.',
        content: `Từ cuối thập niên 1960, sổ tay ngoại giao dày lên với lịch trình tiếp đón phái đoàn quốc tế. Cờ vàng ba sọc đỏ tung bay trước các tòa đại sứ mới mở, đánh dấu vị thế của Sài Gòn trong bản đồ chiến lược Đông Nam Á.

Tuy vậy, những cuộc biểu tình sinh viên phản đối tham nhũng cũng xuất hiện bên ngoài Quốc hội. Chính quyền phải tổ chức các buổi tiếp xúc cử tri, lắng nghe tiếng nói của các hội đoàn nghề nghiệp, giáo phận và cộng đồng di cư.

Khi hiệp định Paris được ký, dư âm chiến tranh vẫn len lỏi trong những quán cà phê nhỏ. Ghi chép của tác giả kết thúc bằng lời nhắc nhở rằng người dân không chỉ là nhân vật phụ của lịch sử mà là những người viết nên từng dòng của bản trường ca cộng hòa.`,
      },
    ],
  },
  {
    id: 'culture-saigon',
    title: 'Sài Gòn Ban Ngày Và Đêm',
    author: 'Lâm Thảo Vy',
    year: '1962',
    category: 'culture',
    progress: 34,
    highlightTag: 'Đời sống',
    synopsis: 'Một hành trình thị giác qua chợ hoa, rạp cine và những quán cà phê đèn vàng của Sài Gòn.',
    coverColor: '#C4632B',
    accentColor: '#FFD166',
    readingTimeMinutes: 38,
    chapters: [
      {
        id: 'culture-saigon-1',
        title: 'Những buổi sáng ở Chợ Bến Thành',
        content: `Tiếng mời chào của các cô bán vải hòa với mùi phở bò bốc khói tại cửa tây. Những chiếc xe Vespa dừng vội để người mua hoa bưng bó cúc vàng cho kịp buổi họp mặt gia đình. Chợ Bến Thành không chỉ là nơi giao thương mà còn là sân khấu của thời trang miền Nam với áo dài may đo ngay tại sạp.

Tác giả ghi chép chi tiết cách người mua sắm trả giá bằng giọng nhỏ nhẹ, lưu giữ nét lịch thiệp giữa chốn đông người. Dù trời tháng Năm nóng rực, mọi người vẫn giữ nụ cười hiền và câu "thưa cô" trước khi rời quầy hàng.

Sau 9 giờ sáng, những xe hàng thực phẩm lên đường tới Gia Định và Tân Định, tiếp tục nuôi dưỡng nhịp sống đô thị đang mở rộng từng ngày.`,
      },
      {
        id: 'culture-saigon-2',
        title: 'Ánh đèn tối thứ bảy',
        content: `Đến tối, đại lộ Lê Lợi lung linh với biển hiệu neon của các rạp cine. Rạp Thống Nhất trình chiếu những bộ phim mới nhất từ Hồng Kông, trong khi rạp Rex giới thiệu các buổi hòa nhạc phòng trà. Người trẻ hẹn nhau uống cà phê sữa đá, bình luận về bản nhạc mới vừa phát trên đài Mẹ Việt Nam.

Trong không khí ấy, các nhà thiết kế áo dài thử nghiệm chất liệu ren và taffeta. Từng đường kim, mũi chỉ ghi dấu sự hội nhập văn hóa mà vẫn giữ dáng vẻ dịu dàng của Sài Gòn.

Tác giả kết luận rằng Sài Gòn ban đêm là bức tranh đa sắc, nơi văn minh đô thị và nếp nhà truyền thống cùng tỏa sáng.`,
      },
      {
        id: 'culture-saigon-3',
        title: 'Những con hẻm kể chuyện',
        content: `Giữa khu trung tâm hoa lệ, những con hẻm nhỏ vẫn giữ được nhịp sống bình dị. Mỗi sáng, các bà cụ bày ghế nhựa, pha ấm trà mạn và kể chuyện gia đình cho hàng xóm. Tối đến, trẻ nhỏ chơi đá dĩa, còn người lớn kê bàn đánh cờ tướng.

Tác giả ghi lại những câu chuyện về gia đình di cư từ miền Bắc, mang theo món bánh cốm, bánh gai rồi biến tấu theo khẩu vị miền Nam. Con hẻm vì vậy trở thành kho ký ức tập thể, nơi lịch sử được kể bằng giọng kể thân tình.

Nhờ sự đùm bọc ấy, Sài Gòn giữ được cảm giác gần gũi ngay cả khi mật độ dân cư tăng nhanh và các tòa chung cư mọc lên liên tiếp.`,
      },
    ],
  },
  {
    id: 'music-songvang',
    title: 'Tiếng Hát Vằng Vặc',
    author: 'Phạm Duy An',
    year: '1969',
    category: 'music',
    progress: 80,
    highlightTag: 'Âm nhạc vàng',
    synopsis: 'Bút ký phòng thu, ghi chép hòa âm và hậu trường các đêm nhạc tình ca miền Nam.',
    featuredQuote: 'Giữa phòng thu nhỏ, tiếng guitar gỗ và nhịp tim của ca sĩ hòa làm một.',
    coverColor: '#8C2136',
    accentColor: '#F2A65A',
    readingTimeMinutes: 44,
    chapters: [
      {
        id: 'music-songvang-1',
        title: 'Phòng thu Nguyễn Du',
        content: `Buổi chiều mưa nhẹ, nhạc sĩ tụ họp tại phòng thu nhỏ trên đường Nguyễn Du. Những cuộn băng từ quay đều khi ca sĩ thử giọng, chỉnh từng nốt ngân. Tác giả ghi lại cách nhóm hòa âm sử dụng đàn guitar Hawaii và organ Farfisa để tạo nên chất âm lãng mạn.

Mỗi bài hát được luyện tập kỹ lưỡng, từ cách lên hơi cho tới dấu luyến cuối câu. Bên ngoài cánh cửa phòng thu, người hâm mộ đứng chờ để xin chữ ký, tạo nên bầu không khí vừa chuyên nghiệp vừa thân mật.

Khi bản thu hoàn tất, mọi người cùng nhau nghe lại trong ánh đèn vàng ấm, đánh dấu khoảnh khắc ra đời của một ca khúc đi vào ký ức nhiều thế hệ.`,
      },
      {
        id: 'music-songvang-2',
        title: 'Sân khấu phòng trà',
        content: `Phòng trà Tự Do mở cửa từ 19 giờ, ánh đèn spotlight dịu nhẹ phủ lên sân khấu nhỏ. Dàn nhạc ba người với trống jazz, bass và piano điện sẵn sàng nhập cuộc. Khán giả là sĩ quan, sinh viên và giới nghệ sĩ, tất cả đều im lặng khi ca sĩ cầm micro.

Tác giả mô tả cách từng bài hát được giới thiệu bằng câu chuyện ngắn, khiến khán phòng trở thành nơi chia sẻ cảm xúc chân thành. Khi giai điệu kết thúc, tiếng vỗ tay vang dài như lời cảm ơn cho khoảnh khắc hiếm hoi bình yên giữa thời cuộc.

Sau buổi diễn, những bản ký âm được gấp gọn vào cặp da, chờ chuyến lưu diễn tiếp theo sang Biên Hòa và Vũng Tàu.`,
      },
      {
        id: 'music-songvang-3',
        title: 'Băng nhạc và đài sóng',
        content: `Sự xuất hiện của băng cassette mở ra kỷ nguyên mới cho âm nhạc miền Nam. Các hãng phát hành tranh thủ phát hành bản thu trong vòng vài ngày, đưa tiếng hát vươn xa đến tận vùng nông thôn.

Đài phát thanh Sài Gòn thiết lập chương trình "Gửi từ miền nhớ", nơi thính giả gọi tới yêu cầu ca khúc dành tặng người thân ở tiền tuyến. Mỗi lá thư được người dẫn chương trình đọc lên như một bài thơ.

Nhờ vậy, âm nhạc vàng không chỉ là sản phẩm giải trí mà còn là sợi dây nối dài tình cảm giữa những gia đình xa cách.`,
      },
    ],
  },
  {
    id: 'literature-duongpho',
    title: 'Những Bản Thảo Ngoài Hiên',
    author: 'Bảo Châu',
    year: '1971',
    category: 'literature',
    progress: 18,
    synopsis: 'Tuyển tập bài viết ngắn đăng trên các tạp chí văn chương Sài Gòn đầu thập niên 1970.',
    coverColor: '#5A6B4E',
    accentColor: '#C9D36A',
    readingTimeMinutes: 29,
    chapters: [
      {
        id: 'literature-duongpho-1',
        title: 'Truyện dài ngoài hiên mưa',
        content: `Tạp chí Bách Khoa đăng tải chuỗi truyện ngắn của Bảo Châu, nơi nhân vật chính là những người phụ nữ giữ cửa tiệm sách cũ. Họ ghi sổ tay bằng mực tím, kể về những độc giả ghé thăm rồi biến mất cùng câu chuyện riêng.

Giọng văn nhẹ nhàng nhưng sắc sảo, phản ánh sự thay đổi vai trò của phụ nữ đô thị trong giai đoạn công thương nghiệp bùng nổ. Họ vừa quản lý sổ sách, vừa là người giữ gìn ký ức gia đình.

Mỗi trang truyện kết thúc bằng một đoạn thơ lục bát mới chuyển thể, thêm vào hơi thở dân gian cho câu chuyện hiện đại.`,
      },
      {
        id: 'literature-duongpho-2',
        title: 'Bàn tròn văn nghệ',
        content: `Các tạp chí văn nghệ tổ chức bàn tròn tại quán cà phê La Pagode vào mỗi cuối tuần. Nhà văn trẻ, họa sĩ và nhà báo cùng tranh luận về chủ nghĩa hiện sinh, về việc liệu văn chương nên lên tiếng như thế nào trước biến động thời cuộc.

Bảo Châu ghi lại chi tiết từng cái gật đầu, tràng cười và cả những phút giây im lặng. Những cuộc đối thoại ấy cho thấy tinh thần tự do học thuật mà giới sáng tác miền Nam theo đuổi.

Bài viết kết thúc bằng thông điệp rằng mọi sáng tạo cần được cất giữ, bởi mỗi bản thảo là tấm vé trở về ký ức của thành phố.`,
      },
      {
        id: 'literature-duongpho-3',
        title: 'Tin tức văn đàn',
        content: `Chuyên mục tin ngắn giới thiệu sách mới phát hành, từ tiểu thuyết trinh thám đến tuyển thơ tôn giáo. Mỗi tựa sách được tóm tắt bằng vài câu, kèm địa chỉ nhà sách dọc đường Lê Lợi và Phạm Ngũ Lão.

Tác giả cũng không quên nhắc đến những chương trình đọc sách cho trẻ em tại thư viện Gia Long, góp phần nuôi dưỡng thói quen đọc trong cộng đồng.

Qua góc nhìn của Bảo Châu, đời sống văn chương Sài Gòn hiện ra sinh động, đa sắc, và đầy ắp sự hứng khởi sáng tạo.`,
      },
    ],
  },
  {
    id: 'press-songthan',
    title: 'Nhật Báo Sông Thần',
    author: 'Huỳnh Tố Ngọc',
    year: '1973',
    category: 'press',
    progress: 71,
    highlightTag: 'Tư liệu',
    synopsis: 'Hậu trường tòa soạn, quy trình in ấn và những bản tin nóng của một nhật báo Sài Gòn.',
    coverColor: '#3F546C',
    accentColor: '#9DC0F4',
    readingTimeMinutes: 36,
    chapters: [
      {
        id: 'press-songthan-1',
        title: '5 giờ sáng tại tòa soạn',
        content: `Khi Sài Gòn còn chìm trong sương, tiếng máy sắp chữ đã vang lên tại nhà in tòa soạn Sông Thần. Phóng viên trở về từ ca đêm gõ vội hàng tít, trong khi biên tập viên rà soát từng dòng để tránh sai sót.

Tác giả mô tả cách mực in được pha màu, cách những tờ giấy lớn chạy qua dây chuyền press rồi xếp chồng gọn gàng. Mỗi số báo phải hoàn tất trước khi ánh bình minh chạm vào mái nhà.

Nhờ tinh thần làm việc ấy, tờ báo kịp chuyển tới tay độc giả ở Chợ Lớn, Cần Thơ và cả những đơn vị tuyến đầu chỉ trong vài giờ.`,
      },
      {
        id: 'press-songthan-2',
        title: 'Phóng viên chiến trường',
        content: `Những chiếc trực thăng chở phóng viên tới vùng ngoại ô, nơi cuộc chiến diễn ra âm ỉ. Họ mang theo máy ảnh Leica và sổ tay chống nước, sẵn sàng ghi lại bất cứ điều gì họ chứng kiến.

Tòa soạn đặt ra nguyên tắc rằng mỗi bài viết phải cân bằng giữa sự thật và sự an ủi. Người đọc cần biết điều gì đang xảy ra, nhưng cũng cần hy vọng rằng ngày mai sẽ tốt hơn.

Bài viết kể lại câu chuyện của một phóng viên trẻ, người đã dùng chính lương của mình để hỗ trợ gia đình nạn nhân, rồi quay lại bàn phím để hoàn thành bài tường thuật.`,
      },
      {
        id: 'press-songthan-3',
        title: 'Phát hành và độc giả',
        content: `Sau khi báo in xong, đội ngũ phát hành tỏa đi khắp các quận bằng xe Vespa. Họ thuộc tên từng người bán báo đầu hẻm, biết rõ ai thích đọc mục kinh tế, ai chờ trang văn nghệ.

Nhật báo Sông Thần còn tổ chức chuyên mục "Thư độc giả", nơi các cô giáo, kỹ sư, và cả sinh viên gửi bài phản hồi. Những dòng chữ ấy giúp tòa soạn điều chỉnh cách đưa tin, khiến tờ báo trở thành diễn đàn mở.

Chính nhờ mạng lưới này, thông tin được lan tỏa nhanh chóng, giữ cho người dân cảm nhận được họ là một phần của cộng đồng đang thay đổi từng ngày.`,
      },
    ],
  },
];
