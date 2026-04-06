"use client";

import { Task, Label, Settings } from "@/types";
import { calculateWeightedPriority } from "@/utils/priority-engine";
import TaskItem from "./TaskItem";

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
        <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50">
          <p className="text-slate-400 dark:text-slate-500 font-bold text-sm uppercase tracking-widest">
            Insert new focus task...
          </p>
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
