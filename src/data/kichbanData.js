import anh1 from '../assets/ảnh1.png';
import anh2 from '../assets/ảnh2.jpg';
import anh3 from '../assets/ảnh3.jpg';
import anh4 from '../assets/ảnh4.jpg';
import anh5 from '../assets/ảnh5.jpg';
import anh6 from '../assets/ảnh6.jpg';

export const kichbanData = [
  {
    stage: 0,
    title: "Khởi Hành",
    location: "Vị trí: Quán nước ven hồ",
    speaker: "Mẫu",

    background: anh2,
    character: anh1,
    characterName: "Mẫu",
    characterStyle: "max-h-[340px] md:max-h-[420px] w-auto drop-shadow-[0_4px_25px_rgba(0,0,0,0.7)] brightness-[0.7] opacity-60",
    dialogues: [
      "Cháu vừa ngồi xuống quán này. Tôi đã đợi cháu — từ lâu lắm rồi.",
      "Tôi tên — tôi không cần nói tên. Người ta gọi tôi là Mẫu. Mẹ của thiên hạ.",
      "Bốn trăm năm trước, tại đúng bờ hồ này, tôi đã ngồi như tôi đang ngồi với cháu hôm nay.",
      "Có một quan trạng ghé quán tôi. Ông uống chén nước, chúng tôi đối đáp thơ phú.",
      "Sáng hôm sau ông quay lại — quán không còn. Ông dựng đền — chính tại đây.",
      "Đền đó — bây giờ là Phủ Tây Hồ. Cháu đang ngồi cách phủ tôi chỉ vài bước chân.",
      "Bốn trăm năm — tôi vẫn ở đây. Tôi muốn cháu — không chỉ ngồi. Tôi muốn cháu đi.",
      "Đi quanh phủ tôi — như quan trạng đã đi sau khi gặp tôi.",
      "Mỗi điểm cháu dừng — tôi sẽ kể cháu một mảnh. Cháu trả lời tôi một câu — tôi sẽ kể tiếp.",
      "Bắt đầu nhé?"
    ],
    choices: [
      {
        text: "Vâng — bà dẫn cháu đi.",
        reply: "Tốt. Bước đầu tiên — cháu đứng dậy. Đi đến cổng phủ."
      },
      {
        text: "Cháu lo — sợ không hiểu.",
        reply: "Không cần hiểu. Chỉ cần đi. Bước đầu tiên — cháu đứng dậy. Đi đến cổng phủ."
      }
    ],
    buttonText: "Tôi đã đến cổng phủ",
    countdown: 30
  },
  {
    stage: 1,
    title: "Tam Quan Phủ",
    location: "Vị trí: Cổng Tam Quan trước phủ",
    speaker: "Mẫu",

    background: anh3,
    character: anh1,
    characterName: "Mẫu",
    characterStyle: "max-h-[340px] md:max-h-[420px] w-auto drop-shadow-[0_4px_25px_rgba(0,0,0,0.7)] brightness-[0.95]",
    dialogues: [
      "Cháu đã đến. Cháu đang đứng trước Tam quan — cổng vào phủ tôi.",
      "Tôi muốn cháu — ngẩng đầu lên. Nhìn 4 chữ Hán trên cổng."
    ],
    question: {
      text: "Cháu có thấy 4 chữ Hán trên đầu cổng tam quan không?",
      choices: [
        {
          text: "Có — cháu thấy rồi.",
          correct: true,
          feedback: "Bốn chữ đó là — Phong đài nguyệt các. Dịch nghĩa: Đài gió, gác trăng. Một tuyên bố: bên trong cổng này — không phải phố. Đây là nơi của gió và trăng."
        },
        {
          text: "Cháu chưa thấy — cháu đang tìm.",
          correct: false,
          feedback: "Cháu hãy dừng lại quan sát một chút nhé, bốn chữ Hán lớn ngay trên vòm cuốn chính giữa đấy."
        }
      ]
    },
    // Next part of Stage 1 dialogues after verified
    postVerifiedDialogues: [
      "Cháu nhìn xuống dưới đi. Có một câu đối — hai bên trụ cổng.",
      "Câu đối đó — kể chuyện một cuộc gặp gỡ 400 năm trước.",
      "Cuộc gặp giữa quan trạng và một bà cụ bên quán nước. Cháu biết quan trạng tên gì không?"
    ],
    question2: {
      text: "Cháu biết quan trạng tên gì không?",
      choices: [
        {
          text: "Phùng Khắc Khoan.",
          correct: true,
          feedback: "Cháu thông minh. Phùng Khắc Khoan. Trạng nguyên đi sứ. Câu đối này — là cách dân làng nhớ cuộc gặp đó."
        },
        {
          text: "Cháu không biết.",
          correct: false,
          feedback: "Phùng Khắc Khoan. Trạng nguyên Việt Nam thế kỷ 16. Ông đi sứ Trung Hoa — về qua Hồ Tây — ghé quán nước. Ghé một quán nước của một bà cụ. Bà cụ đó — là tôi."
        },
        {
          text: "Đó là ông trạng từng đi sứ?",
          correct: true,
          feedback: "Chính xác. Phùng Khắc Khoan. Trạng nguyên đi sứ. Câu đối này — là cách dân làng nhớ cuộc gặp đó. Bà cụ bán nước khi đó chính là tôi."
        }
      ]
    },
    postQuestion2Dialogues: [
      "Bước qua cổng đi. Vào sân phủ."
    ],
    buttonText: "Tôi đã vào sân phủ",
    countdown: 20
  },
  {
    stage: 2,
    title: "Sân Phủ",
    location: "Vị trí: Khoảng sân rộng trước Tam Tòa",
    speaker: "Mẫu",
    background: anh4,
    character: anh1,
    characterName: "Mẫu",
    characterStyle: "max-h-[340px] md:max-h-[420px] w-auto drop-shadow-[0_4px_25px_rgba(0,0,0,0.7)] brightness-[0.95]",
    dialogues: [
      "Cháu đang đứng trong sân phủ tôi.",
      "Cháu thấy ngôi nhà phía trước — chia làm ba lớp đúng không? Lớp đầu — Tiền tế. Lớp giữa — Trung đường. Lớp cuối — Hậu cung.",
      "Tôi đố cháu một điều — lớp nào THẤP NHẤT?"
    ],
    question: {
      text: "Nếp điện thờ nào thấp nhất trong ba nếp phủ chính?",
      choices: [
        {
          text: "Tiền tế (lớp đầu)",
          correct: false,
          feedback: "Cháu quan sát lại đi. Đi gần hơn — nhìn các bậc thềm."
        },
        {
          text: "Trung đường (lớp giữa)",
          correct: false,
          feedback: "Cháu quan sát lại đi. Đi gần hơn — nhìn các bậc thềm."
        },
        {
          text: "Hậu cung (lớp cuối)",
          correct: true,
          feedback: "Cháu tinh. Hậu cung — thấp nhất. Cháu có biết tại sao không? Vì người vào — phải cúi mình. Càng vào trong càng thấp, càng tối, càng tĩnh. Đó là quy luật âm dương cổ — tiền tôn hậu ty. Và chính ở nơi thấp nhất ấy — là chỗ tôi ngự."
        }
      ]
    },
    postQuestion1Dialogues: [
      "Cháu có thấy — toàn bộ kiến trúc này — không cũ như cháu tưởng không?"
    ],
    question2: {
      text: "Cháu thấy kiến trúc này thế nào?",
      choices: [
        {
          text: "Có — cháu thấy nó như mới.",
          correct: true,
          feedback: "Đúng vậy. Năm 1947 — giặc Pháp thiêu hủy cả làng Tây Hồ. Phủ tôi bị phá. Người dân chạy hết. Sau khi giặc đi — họ quay lại."
        },
        {
          text: "Cháu nghĩ nó cổ lắm.",
          correct: true,
          feedback: "Thực ra không hẳn. Năm 1947 — giặc Pháp thiêu hủy cả làng Tây Hồ. Phủ tôi bị phá. Người dân chạy hết. Sau khi giặc đi — họ quay lại."
        },
        {
          text: "Cháu không biết.",
          correct: true,
          feedback: "Tôi kể cho nghe. Năm 1947 — giặc Pháp thiêu hủy cả làng Tây Hồ. Phủ tôi bị phá. Người dân chạy hết. Sau khi giặc đi — họ quay lại."
        }
      ]
    },
    postQuestion2Dialogues: [
      "Họ dựng lại — không bằng gỗ. Họ không có gỗ. Họ dùng bê tông. Sơn lên cho giống gỗ. Cho giống gạch.",
      "Cháu sờ vào một cột đi — sờ thử."
    ],
    question3: {
      text: "Cháu cảm nhận thế nào khi chạm vào cột phủ?",
      choices: [
        {
          text: "Cứng. Như đá.",
          correct: true,
          feedback: "Bê tông đấy. Toàn bộ phủ này — phần lớn là bê tông giả gỗ. Dựng sau năm 1947. Phủ này — không cổ. Nhưng niềm tin dựng nên phủ — đã có trước cả phủ."
        },
        {
          text: "Cháu không sờ được.",
          correct: true,
          feedback: "Không sao. Toàn bộ phủ này — phần lớn là bê tông giả gỗ. Dựng sau năm 1947. Phủ này — không cổ. Nhưng niềm tin dựng nên phủ — đã có trước cả phủ."
        }
      ]
    },
    postQuestion3Dialogues: [
      "Bước tiếp đi. Đi đến cửa hậu cung — chỗ tôi ngự. Đứng ngoài cửa thôi, đừng vào."
    ],
    buttonText: "Tôi đã đến cửa hậu cung",
    countdown: 5
  },
  {
    stage: 3,
    title: "Hậu Cung",
    location: "Vị trí: Trước điện Hậu cung",
    speaker: "Mẫu",
    background: anh5,
    character: anh1,
    characterName: "Mẫu",
    characterStyle: "max-h-[340px] md:max-h-[420px] w-auto drop-shadow-[0_0_35px_rgba(212,175,55,0.5)] brightness-110 scale-[1.05] animate-float",
    dialogues: [
      "Cháu thấy ba tượng không? Áo đỏ ở giữa — là tôi. Hai bên — hai chị em của tôi. Mẫu Thượng Ngàn miền Rừng. Mẫu Thoải miền Nước.",
      "Cháu đứng yên đây vài phút đi. Tôi muốn kể cháu một chuyện. Chuyện về tôi — không phải vị Mẫu cháu thấy ở đây — mà tôi như một người phụ nữ đã từng sống.",
      "Tôi sinh ra ở thiên giới. Tên Quỳnh Hoa. Con gái thứ hai của Ngọc Hoàng. Tôi không bị đày xuống trần — tôi tự xin đi.",
      "Tôi nhìn xuống mặt đất một ngày — thấy người ta đang sống. Tôi muốn biết — yêu thương là gì.",
      "Tôi xuống. Rơi vào làng Vân Cát. Tôi lấy chồng — chàng Đào Lang. Có một đứa con. Tôi sống — hai mươi mốt năm.",
      "Rồi tôi phải về trời. Đêm cuối — tôi ngồi rất lâu. Không dám đánh thức ai.",
      "Tôi không tiếc đã xuống đây. Tôi chỉ tiếc — không có thêm một đêm nữa.",
      "Tôi về trời. Nhưng không ở được lâu. Tôi xin xuống nữa. Lần này — không gia đình. Tôi mở một quán nước bên Hồ Tây.",
      "Tôi đợi.",
      "Quan trạng Phùng Khắc Khoan ghé. Chúng tôi đối đáp thơ. Ông đi. Tôi đi. Ông quay lại — dựng đền. Đó là — phủ này.",
      "Cháu vừa nghe ba kiếp của tôi. Cháu có thể hỏi tôi một câu — bất cứ câu gì."
    ],
    choices: [
      {
        text: "Bà có hối tiếc — đã xuống trần ba lần không?",
        ending: "A",
        reply: "Mẫu rũ mắt mỉm cười: Tôi đã không hối tiếc. Trần gian tuy khổ cực nhưng có tình người sâu nặng."
      },
      {
        text: "Bà có cô đơn không?",
        ending: "B",
        reply: "Mẫu khẽ thở dài trầm ngâm: Tôi cô đơn. Bốn trăm năm nay, người ta đến chỉ cầu xin chứ chưa từng có ai đối thoại chân thành như cháu hôm nay."
      },
      {
        text: "Bà có hạnh phúc không?",
        ending: "C",
        reply: "Mẫu nhìn xa xăm: Tôi không biết nữa. Hạnh phúc là từ của người sống. Tôi chỉ có vài khoảnh khắc đẹp đẽ, nhưng như thế đã đủ cho bốn trăm năm."
      },
      {
        text: "Bà — còn đợi ai không?",
        ending: "D",
        reply: "Mẫu mỉm cười u trầm: Tôi đợi sự đối đáp. Mỗi người đối đáp hiểu tôi, tôi lại được sống thêm một kiếp trong lòng họ."
      }
    ],
    postChoiceDialogues: [
      "Cháu hỏi xong rồi. Đi tiếp đi. Một điểm cuối. Đi đến Lầu Cô - Lầu Cậu — hai am thờ nhỏ trong sân."
    ],
    buttonText: "Tôi đã đến Lầu Cô - Lầu Cậu",
    countdown: 5
  },
  {
    stage: 4,
    title: "Lầu Cô - Lầu Cậu",
    location: "Vị trí: Hai am thờ nhỏ bên sân",
    speaker: "Mẫu",
    background: anh6,
    character: anh1,
    characterName: "Mẫu",
    characterStyle: "max-h-[340px] md:max-h-[420px] w-auto drop-shadow-[0_4px_25px_rgba(0,0,0,0.7)] brightness-[0.8] opacity-70",
    dialogues: [
      "Cháu đứng giữa hai am thờ. Bên phải — Lầu Cô. Bên trái — Lầu Cậu.",
      "Hai vị hầu cận của tôi — các Cô và các Cậu.",
      "Tôi sẽ cho cháu một thử thách cuối.",
      "Cháu nghĩ về một điều — một điều cháu chưa nói được với ai. Không cần nói cho tôi. Không cần gõ ra. Chỉ nghĩ trong đầu. Sẵn sàng chưa?"
    ],
    choices: [
      {
        text: "Sẵn sàng.",
        reply: "Bây giờ — cháu chọn một bên. Lầu Cô hay Lầu Cậu. Nếu điều đó về tình cảm — đặt tay (hoặc đứng gần) ở Lầu Cô. Nếu điều đó về công danh sự nghiệp học hành — đặt tay ở Lầu Cậu."
      }
    ],
    postChoiceDialogues: [
      "Cháu chọn bên nào?"
    ],
    wishChoices: [
      {
        text: "Tình cảm, gia đạo (Đặt am Lầu Cô bên phải)",
        wish: "co",
        reply: "Cháu đã đặt câu hỏi của cháu xuống đây. Tôi giữ cho. Cháu không cần lấy đi. Khi nào cháu cần — quay lại."
      },
      {
        text: "Học hành, công danh (Đặt am Lầu Cậu bên trái)",
        wish: "cau",
        reply: "Cháu đã đặt câu hỏi của cháu xuống đây. Tôi giữ cho. Cháu không cần lấy đi. Khi nào cháu cần — quay lại."
      }
    ],
    postWishDialogues: [
      "Hành trình của cháu trong phủ — đã xong. Quay lại quán nước. Tôi đợi cháu ở đó — chén trà cuối."
    ],
    buttonText: "Quay lại quán nước",
    countdown: 0
  },
  {
    stage: 5,
    title: "Kết Duyên Lành",
    location: "Vị trí: Quán nước đầu hành trình",
    speaker: "Mẫu",

    background: anh2,
    character: anh1,
    characterName: "Mẫu",
    characterStyle: "max-h-[340px] md:max-h-[420px] w-auto drop-shadow-[0_4px_25px_rgba(0,0,0,0.7)] brightness-[0.95]",
    dialogues: [
      "Cháu về rồi. Cháu đã đi qua phủ tôi.",
      "Đã sờ vào tường — biết nó là bê tông. Đã đọc chữ Hán — biết phủ không cổ. Đã nghe câu chuyện — biết tôi đã ba lần xuống trần.",
      "Cháu đã hỏi tôi một câu. Tôi đã đáp.",
      "Cháu đã đặt câu hỏi của cháu xuống Lầu Cô / Lầu Cậu. Tôi giữ cho.",
      "Cháu vẫn đến. Đó là điều quan trọng nhất.",
      "Tôi không ở trong tượng cháu vừa thấy. Tôi ở trong việc cháu vẫn đến — sau khi biết tất cả."
    ],
    endings: {
      A: {
        type: "An Yên",
        dialogues: [
          "Tôi đã đáp cháu — tôi không hối tiếc.",
          "Bây giờ tôi hỏi cháu lại một câu.",
          "Cháu — sau hôm nay — có hối tiếc gì không?",
          "...",
          "Đừng hối tiếc nhiều. Người sống cần đi nhẹ.",
          "Đi đi — đêm xuống rồi.",
          "Phủ Tây Hồ — không phải di tích cổ.\nPhủ là — di tích sống.\nSống vì bạn vừa đến."
        ]
      },
      B: {
        type: "Thấu Cảm",
        dialogues: [
          "Tôi đã đáp cháu — tôi cô đơn.",
          "400 năm — không ai đối thoại với tôi như cháu hôm nay.",
          "Họ chỉ cầu. Họ không hỏi.",
          "Cháu — đã hỏi.",
          "Cháu đã giúp tôi bớt cô đơn — chỉ một chiều.",
          "Cám ơn cháu.",
          "Khi nào cháu cô đơn — quay lại. Tôi vẫn ở đây.",
          "Có những di sản — sống nhờ những người dám đối thoại.\nKhông phải những người chỉ cầu xin."
        ]
      },
      C: {
        type: "Tự Tại",
        dialogues: [
          "Tôi đã đáp cháu — tôi không biết.",
          "Hạnh phúc là từ của người sống.",
          "Tôi có vài khoảnh khắc — đủ cho 400 năm.",
          "Cháu — hôm nay — có một khoảnh khắc cháu sẽ nhớ không?",
          "...",
          "Nếu có — giữ nó.",
          "Đủ — cho rất nhiều ngày sau.",
          "Một buổi sáng vo gạo.\nMột chiều ghé quán nước.\nMột khoảnh khắc — đủ cho cả đời."
        ]
      },
      D: {
        type: "Tri Kỷ",
        dialogues: [
          "Tôi đã đáp cháu — tôi đợi sự đối đáp.",
          "Mỗi người đối đáp với tôi — tôi sống thêm một chiều.",
          "Cháu — sẽ kể ai về tôi không?",
          "Một người thôi cũng đủ.",
          "Câu chuyện được kể — di sản còn sống.",
          "Bốn trăm năm trước — một quan trạng kể về một bà cụ bán nước.\nHôm nay — bạn có thể kể về tôi cho một người khác."
        ]
      }
    }
  }
];
