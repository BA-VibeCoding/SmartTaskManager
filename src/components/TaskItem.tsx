"use client";

import { Task, Label, Settings } from "@/types";
import { calculateWeightedPriority, getPriorityColor } from "@/utils/priority-engine";
import { Calendar, CheckCircle, Circle, Trash2, Edit3 } from "lucide-react";
import { format, parseISO } from "date-fns";
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
        "group relative flex items-center bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 border-l-[4px] p-5 rounded-xl transition-all hover:shadow-md",
        borderColors[color],
        task.completed && "opacity-60"
      )}
    >
      <button
        onClick={() => onToggle(task.id)}
        className="mr-5 flex-shrink-0 transition-transform active:scale-90"
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
      >
        {task.completed ? (
          <CheckCircle className="w-6 h-6 text-priorityLow" />
        ) : (
          <Circle className="w-6 h-6 text-slate-300 dark:text-slate-700 hover:text-slate-400" />
        )}
      </button>

      <div className="flex-grow min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3
              className={cn(
                "text-body font-bold truncate transition-all",
                task.completed ? "line-through text-slate-400" : "text-slate-900 dark:text-white"
              )}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="text-metadata text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                {task.description}
              </p>
            )}
          </div>
          
          <div className="flex items-center bg-slate-50 dark:bg-slate-900/50 px-2 py-1 rounded-md border border-slate-100 dark:border-slate-800 flex-shrink-0">
            <span className="text-[10px] font-bold text-slate-400 mr-2 uppercase tracking-tighter">
              Score
            </span>
            <span className="text-xs font-black text-primaryAction dark:text-white tabular-nums">
              {score}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-3">
          {task.dueDate && (
            <div className="flex items-center space-x-1.5 text-xxs font-bold text-slate-400 uppercase tracking-tight">
              <Calendar className="w-3 h-3" />
              <span>{format(parseISO(task.dueDate), "MMM d")}</span>
            </div>
          )}

          <div className="flex gap-1.5">
            {taskLabels.map((l) => (
              <LabelBadge key={l.id} label={l} />
            ))}
          </div>
        </div>
      </div>

      <div className="ml-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
        <button
          onClick={() => onEdit(task)}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-primaryAction dark:hover:text-white rounded-lg transition-colors"
          title="Edit task"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-priorityHigh rounded-lg transition-colors"
          title="Delete task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
