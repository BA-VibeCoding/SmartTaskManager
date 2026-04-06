import { Label } from "@/types";
import { cn } from "@/lib/utils";

interface LabelBadgeProps {
  label: Label;
  className?: string;
}

export default function LabelBadge({ label, className }: LabelBadgeProps) {
  return (
    <span
      className={cn(
        "px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold rounded-md uppercase tracking-wider border border-slate-200/50 dark:border-slate-700/50",
        className
      )}
    >
      {label.name}
    </span>
  );
}
