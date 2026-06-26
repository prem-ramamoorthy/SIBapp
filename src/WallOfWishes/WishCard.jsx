import { Cake, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

export default function WishCard({ memberName, profileImage, type, date, chapterName, profileId, userId, index = 0 }) {
  const isBirthday = type === 'birthday';
  const Icon = isBirthday ? Cake : Heart;

  const avatarUrl = profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(memberName)}&background=random&size=256&bold=true`;

  const linkTarget = profileId ? `/profile/${profileId}?user=${userId || ''}` : '#';

  return (
    <Link
      to={linkTarget}
      className="relative group w-full max-w-sm mx-auto block cursor-pointer"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Outer glow ring */}
      <div className={clsx(
        "absolute -inset-1 rounded-3xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-700",
        isBirthday
          ? "bg-gradient-to-r from-amber-400 via-orange-500 to-red-500"
          : "bg-gradient-to-r from-pink-400 via-rose-500 to-fuchsia-500"
      )} />

      <div className={clsx(
        "relative overflow-hidden rounded-3xl border backdrop-blur-sm transition-all duration-500 transform hover:scale-[1.03] hover:shadow-2xl",
        isBirthday
          ? "bg-gradient-to-br from-amber-950/90 via-orange-950/80 to-red-950/90 border-amber-700/40"
          : "bg-gradient-to-br from-pink-950/90 via-rose-950/80 to-fuchsia-950/90 border-pink-700/40"
      )}>

        {/* Animated background orbs */}
        <div className={clsx(
          "absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20 animate-pulse",
          isBirthday ? "bg-amber-500" : "bg-pink-500"
        )} />
        <div className={clsx(
          "absolute bottom-0 left-0 w-32 h-32 rounded-full blur-3xl opacity-15",
          isBirthday ? "bg-orange-400" : "bg-rose-400"
        )} style={{ animation: 'pulse 3s ease-in-out infinite reverse' }} />

        {/* Floating sparkle decorations */}
        <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-60 transition-opacity">
          <Sparkles size={20} className={isBirthday ? "text-amber-400" : "text-pink-400"} />
        </div>
        <div className="absolute bottom-16 right-8 opacity-20 group-hover:opacity-50 transition-opacity">
          <Sparkles size={14} className={isBirthday ? "text-orange-300" : "text-rose-300"} />
        </div>

        <div className="relative z-10 p-8 flex flex-col items-center text-center">
          {/* Avatar with glowing ring */}
          <div className="relative mb-5">
            <div className={clsx(
              "absolute -inset-2 rounded-full blur-md opacity-60 animate-pulse",
              isBirthday
                ? "bg-gradient-to-r from-amber-400 to-orange-500"
                : "bg-gradient-to-r from-pink-400 to-rose-500"
            )} />
            <img
              src={avatarUrl}
              alt={memberName}
              className={clsx(
                "relative w-28 h-28 rounded-full object-cover border-4 shadow-xl",
                isBirthday ? "border-amber-400/70" : "border-pink-400/70"
              )}
            />
            <div className={clsx(
              "absolute -bottom-2 -right-2 p-2.5 rounded-full text-white shadow-lg border-2 border-gray-900",
              isBirthday
                ? "bg-gradient-to-br from-amber-500 to-orange-600"
                : "bg-gradient-to-br from-pink-500 to-rose-600"
            )}>
              <Icon size={18} />
            </div>
          </div>

          {/* Name */}
          <h3 className={clsx(
            "text-2xl font-extrabold bg-clip-text text-transparent",
            isBirthday
              ? "bg-gradient-to-r from-amber-200 via-yellow-100 to-orange-200"
              : "bg-gradient-to-r from-pink-200 via-rose-100 to-fuchsia-200"
          )}>
            {memberName}
          </h3>

          {/* Chapter badge */}
          <span className={clsx(
            "mt-2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider border",
            isBirthday
              ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
              : "bg-pink-500/15 text-pink-300 border-pink-500/30"
          )}>
            {chapterName || "SIB Chapter"}
          </span>

          {/* Event type & date */}
          <div className={clsx(
            "mt-5 flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold border",
            isBirthday
              ? "bg-amber-500/10 border-amber-500/20 text-amber-200"
              : "bg-pink-500/10 border-pink-500/20 text-pink-200"
          )}>
            <Icon size={16} className="animate-bounce" />
            <span>{isBirthday ? '🎂 Birthday' : '💍 Anniversary'}</span>
            <span className="opacity-40">•</span>
            <span className="text-white/80">{date}</span>
          </div>

          {/* Send Wishes Button */}
          {date === "Today" && (
            <button className={clsx(
              "mt-6 w-full py-3.5 rounded-2xl text-sm font-extrabold text-white shadow-lg transition-all duration-300",
              "active:scale-95 flex items-center justify-center gap-2.5 uppercase tracking-wide",
              "hover:shadow-2xl hover:brightness-110 cursor-pointer",
              isBirthday
                ? "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:shadow-amber-500/30"
                : "bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 hover:shadow-pink-500/30"
            )}>
              <Sparkles size={18} />
              Send Wishes ✨
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
