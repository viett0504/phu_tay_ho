import thanhdongImg from '../assets/thanhdong.png';
import cungvanImg from '../assets/cungvan.png';
import haudangImg from '../assets/haudang.png';

export const characters = [
  {
    id: 'cung-van',
    name: 'Cung Văn',
    role: 'Nghệ nhân hát chầu văn',
    description: 'Người diễn xướng Chầu Văn và dẫn dắt không khí tâm linh, cảm xúc của buổi hầu đồng thông qua tiếng đàn, giọng hát cùng các nhạc cụ truyền thống.',
    image: cungvanImg,
    audio: '/audio/cung-van.mp3',
    icon: '🎵',
    alignment: 'left',
    positionStyle: 'md:left-[10%] bottom-0',
    titleDetail: 'Người Giữ Lửa Âm Nhạc'
  },
  {
    id: 'thanh-dong',
    name: 'Thanh Đồng',
    role: 'Người hầu bóng',
    description: 'Nhân vật trung tâm của nghi lễ Hầu Đồng, người bắc ghế hầu các vị thánh thần thông qua trang phục nghi lễ đặc trưng, các điệu múa thiêng và nghi thức dâng hương hành lễ.',
    image: thanhdongImg,
    audio: '/audio/thanh-dong.mp3',
    icon: '👤',
    alignment: 'center',
    positionStyle: 'md:left-[38%] bottom-0 z-10 scale-105 md:scale-110',
    titleDetail: 'Cầu Nối Tâm Linh Giữa Đời Thường Và Thần Thánh'
  },
  {
    id: 'hau-dang',
    name: 'Hầu Dâng',
    role: 'Người phụ tá nghi lễ',
    description: 'Hỗ trợ đắc lực cho nghi lễ bằng việc chuẩn bị, dâng lễ vật, chuẩn bị trang phục tương ứng với từng giá chầu và trợ giúp Thanh Đồng trong suốt thời gian diễn ra buổi lễ.',
    image: haudangImg,
    audio: '/audio/hau-dang.mp3',
    icon: '👥',
    alignment: 'right',
    positionStyle: 'md:right-[10%] bottom-0',
    titleDetail: 'Người Trợ Giúp Kính Cẩn'
  }
];
