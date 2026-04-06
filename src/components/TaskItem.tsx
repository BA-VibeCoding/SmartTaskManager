"use client";

import { Task, Label, Settings } from "@/types";
import { calculateWeightedPriority, getPriorityColor } from "@/utils/priority-engine";
import { Calendar, CheckCircle, Circle, Trash2, Edit3 } from "lucide-react";
import { format, parseISO, isPast } from "date-fns";
import { cn } from "@/lib/utils";
import LabelBadge from "./LabelBadge";

interface TaskItemProps {
  task: Task;
  labels: Label[];
  settings: Settings;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export default function TaskItem({
  task,
  labels,
  settings,
  onToggle,
  onDelete,
  onEdit,
}: TaskItemProps) {
  const score = calculateWeightedPriority(task, labels, settings);
  const color = getPriorityColor(score, settings);
  const taskLabels = labels.filter((l) => task.labels.includes(l.id));

  const borderColors = {
    green: "border-l-priorityLow",
    orange: "border-l-priorityMedium",
    red: "border-l-priorityHigh",
  };

  return (
    <div
      className={cn(
        "group relative flex items-center bg-surface-light dark:bg-surface-dark border border-slate-200/60 dark:border-slate-800/60 border-l-[4px] p-5 rounded-2xl transition-all hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none hover:-translate-y-0.5 active:translate-y-0 active:shadow-md",
        borderColors[color],
        task.completed && "opacity-50 grayscale-[0.5]"
      )}
    >
      <button
        onClick={() => onToggle(task.id)}
        className="mr-5 flex-shrink-0 transition-all hover:scale-110 active:scale-90 focus:outline-none focus:ring-2 focus:ring-primaryAction/20 rounded-full"
        aria-label={task.completed ? `Mark "${task.title}" as incomplete` : `Mark "${task.title}" as complete`}
      >
        {task.completed ? (
          <CheckCircle className="w-6 h-6 text-priorityLow fill-priorityLow/10" strokeWidth={2.5} />
        ) : (
          <Circle className="w-6 h-6 text-slate-300 dark:text-slate-700 hover:text-slate-400 dark:hover:text-white transition-colors" strokeWidth={2} />
        )}
      </button>

      <div className="flex-grow min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3
              className={cn(
                "text-body font-black tracking-tightest truncate transition-all",
                task.completed ? "line-through text-slate-400" : "text-slate-900 dark:text-white group-hover:text-primaryAction dark:group-hover:text-white"
              )}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="text-xxs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest line-clamp-1 mt-1 opacity-80">
                {task.description}
              </p>
            )}
          </div>
          
          <div className="flex items-center bg-slate-50 dark:bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800 flex-shrink-0 shadow-sm">
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 mr-2 uppercase tracking-widest">
              IDX
            </span>
            <span className={cn(
              "text-xs font-black tabular-nums transition-colors",
              color === 'red' ? "text-priorityHigh" : 
              color === 'orange' ? "text-priorityMedium" : 
              "text-priorityLow"
            )}>
              {score.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-4">
          {task.dueDate && (
            <div className={cn(
              "flex items-center space-x-1.5 text-xxs font-black uppercase tracking-widest px-2 py-0.5 rounded-md border",
              isPast(parseISO(task.dueDate)) && !task.completed 
                ? "text-priorityHigh bg-priorityHigh/5 border-priorityHigh/10 animate-pulse" 
                : "text-slate-400 bg-slate-100/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50"
            )}>
              <Calendar className="w-3 h-3" strokeWidth={2.5} />
              <span>{format(parseISO(task.dueDate), "MMM dd")}</span>
            </div>
          )}

          <div className="flex gap-1.5">
            {taskLabels.map((l) => (
              <LabelBadge key={l.id} label={l} />
            ))}
          </div>
        </div>
      </div>

      <div className="ml-4 flex-shrink-0 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-all flex items-center gap-1 translate-x-2 group-hover:translate-x-0">
        <button
          onClick={() => onEdit(task)}
          className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-primaryAction dark:hover:text-white rounded-xl transition-all hover:scale-110 active:scale-90"
          title="Edit parameters"
          aria-label="Edit task"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-priorityHigh rounded-xl transition-all hover:scale-110 active:scale-90"
          title="Archive result"
          aria-label="Delete task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
