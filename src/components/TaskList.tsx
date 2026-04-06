"use client";

import { Task, Label, Settings } from "@/types";
import { calculateWeightedPriority } from "@/utils/priority-engine";
import TaskItem from "./TaskItem";
import { Inbox, MousePointerClick } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  labels: Label[];
  settings: Settings;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (task: Task) => void;
}

export default function TaskList({
  tasks,
  labels,
  settings,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}: TaskListProps) {
  // UIDesignSpec - 3. Main Dashboard: Task Sorting
  // Automatic descending sort by "Weighted Score"
  const sortedTasks = [...tasks].sort((a, b) => {
    const scoreA = calculateWeightedPriority(a, labels, settings);
    const scoreB = calculateWeightedPriority(b, labels, settings);
    return scoreB - scoreA;
  });

  return (
    <div className="flex flex-col gap-4 py-8">
      {sortedTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 sm:p-20 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl bg-slate-50/30 dark:bg-slate-900/10 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-700">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 text-slate-300 dark:text-slate-600">
            <Inbox className="w-8 h-8" strokeWidth={1.5} />
          </div>
          <h3 className="text-lg font-black text-slate-600 dark:text-slate-400 tracking-tightest mb-2">
            No active focuses found.
          </h3>
          <p className="text-xxs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center max-w-xs leading-relaxed">
            Initialize your primary objective to begin the priority re-indexing sequence.
          </p>
          <div className="mt-8 flex items-center gap-2 text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-tightest">
            <MousePointerClick className="w-3 h-3" />
            <span>Click 'New Focus' to commence</span>
          </div>
        </div>
      ) : (
        sortedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            labels={labels}
            settings={settings}
            onToggle={onToggleTask}
            onDelete={onDeleteTask}
            onEdit={onEditTask}
          />
        ))
      )}
    </div>
  );
}
