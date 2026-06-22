import React from 'react';
import { Award, Heart, GraduationCap, Sparkles } from 'lucide-react';

export default function CouponCard({ wishPath }) {
  // Determine content based on wishPath ('co' or 'cau')
  const getBlessingData = () => {
    if (wishPath === 'co') {
      return {
        title: "GIA ĐẠO & TÌNH DUYÊN",
        subtitle: "AN KHANG VIÊN MÃN",
        desc: "Mẫu chứng giám lòng thành, chúc cho gia đình cháu luôn bình an, hạnh phúc đong đầy, tình cảm gắn kết bền chặt, vạn sự cát tường, sở nguyện sớm thành.",
        icon: <Heart className="h-8 w-8 text-[#D4AF37] animate-pulse" />
      };
    } else if (wishPath === 'cau') {
      return {
        title: "CÔNG DANH & HỌC VẤN",
        subtitle: "KHOA CỬ HANH THÔNG",
        desc: "Mẫu chứng giám lòng thành, chúc cho con đường học tập, sự nghiệp của cháu luôn thuận buồm xuôi gió, thi cử đỗ đạt cao, công danh rộng mở, tài lộc dồi dào.",
        icon: <GraduationCap className="h-8 w-8 text-[#D4AF37]" />
      };
    } else {
      return {
        title: "ƯỚC NGUYỆN LÀNH",
        subtitle: "SỞ CẦU NHƯ Ý",
        desc: "Mẫu chứng giám lòng thành kính của cháu. Chúc cho mọi ước nguyện cháu đặt lại nơi đây sớm thành hiện thực, hanh thông tự tại, vạn sự cát tường.",
        icon: <Sparkles className="h-8 w-8 text-[#D4AF37]" />
      };
    }
  };

  const blessing = getBlessingData();

  return (
    <div className="relative w-full max-w-sm mx-auto overflow-hidden rounded-2xl border-2 border-[#D4AF37] bg-gradient-to-br from-[#2a1b15] to-[#150d0a] p-6 text-center shadow-[0_15px_35px_rgba(0,0,0,0.9)] animate-scale-up">
      {/* Decorative Gold Shimmer Mask */}
      <div className="absolute inset-0 pointer-events-none animate-shimmer opacity-40" />

      {/* Decorative Corner borders (classic Vietnamese design vibe) */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#D4AF37]/60" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#D4AF37]/60" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#D4AF37]/60" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#D4AF37]/60" />

      {/* Top Header Badge */}
      <div className="flex justify-center items-center gap-1.5 text-xs text-[#D4AF37] font-serif tracking-[0.2em] uppercase font-bold mb-4">
        <Award className="h-4 w-4" /> LỜI NGUYỆN CẦU TỪ MẪU <Award className="h-4 w-4" />
      </div>

      <div className="h-[1px] w-24 bg-[#D4AF37]/35 mx-auto mb-4" />

      {/* Blessing Icon & Title */}
      <div className="flex flex-col items-center gap-2 my-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 shadow-inner">
          {blessing.icon}
        </div>
        <p className="text-xl font-serif text-[#D4AF37] font-black tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-2 uppercase">
          {blessing.title}
        </p>
        <span className="text-[10px] tracking-widest text-[#FFB74D] uppercase font-bold mt-1">
          {blessing.subtitle}
        </span>
      </div>

      {/* Blessing Description */}
      <p className="text-sm text-slate-200 leading-relaxed font-sans max-w-[290px] mx-auto px-1 mb-4 italic">
        "{blessing.desc}"
      </p>

      <div className="h-[1px] w-16 bg-[#D4AF37]/20 mx-auto my-4" />

      {/* Note */}
      <p className="text-[9px] text-slate-500 italic font-serif">
        Mẫu giữ lời nguyện cho cháu. Khi nào bình an, hãy ghé lại Phủ.
      </p>
    </div>
  );
}
