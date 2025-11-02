import { Loader2 } from "lucide-react"; // Any spinner icon you like

export default function HalfPageLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-white/80 dark:bg-gray-800/80 z-50">
      <Loader2 className="animate-spin text-amber-500" size={48} />
    </div>
  );
}