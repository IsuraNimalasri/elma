type PerformaceProps = {
  xp?: number;
  streak?: number;
  hearts?: number;
  className?: string;
};

export default function Performace({ xp = 1200, streak = 5, hearts = 3, className = "" }: PerformaceProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <Stat icon="⚡" value={xp} accentClass="text-yellow-600" />
      <Stat icon="🔥" value={streak} accentClass="text-orange-600" />
      <Stat icon="❤️" value={hearts} accentClass="text-red-600" />
    </div>
  );
}

function Stat({ icon,value, accentClass }: { icon: string; value: number | string; accentClass: string }) {
  return (
    <div className="flex items-center gap-2 text-sm mr-4">
      <span className={`text-lg ${accentClass}`} aria-hidden>
        {icon}
      </span>
      {/* <span className="text-gray-700">{label}</span> */}
      <span className="font-semibold">{value}</span>
    </div>
  );
}


