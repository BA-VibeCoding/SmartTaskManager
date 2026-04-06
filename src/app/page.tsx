"use client";

import { useTasks } from "@/context/TaskContext";
import { useSettings } from "@/context/SettingsContext";
import Header from "@/components/Header";
import TaskList from "@/components/TaskList";
import TaskFormModal from "@/components/TaskFormModal";
import SettingsModal from "@/components/SettingsModal";
import TaskFilters, { FilterStatus, SortOption } from "@/components/TaskFilters";
import { useState, useMemo } from "react";
import { Task } from "@/types";
import { calculateWeightedPriority } from "@/utils/priority-engine";
import { parseISO, compareDesc, compareAsc } from "date-fns";

export default function Home() {
  const {
    tasks,
    labels,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    addLabel,
    updateLabel,
    deleteLabel,
  } = useTasks();

  const { settings, updateSettings } = useSettings();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  // States for filtering and sorting
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [sortBy, setSortBy] = useState<SortOption>("score");

  // Derived filtered and sorted tasks
  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];

    // Status Filter
    if (statusFilter === "active") {
      result = result.filter((t) => !t.completed);
    } else if (statusFilter === "completed") {
      result = result.filter((t) => t.completed);
    }

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description?.toLowerCase().includes(q)
      );
    }

    // Sorting
    return result.sort((a, b) => {
      if (sortBy === "score") {
        const scoreA = calculateWeightedPriority(a, labels, settings);
        const scoreB = calculateWeightedPriority(b, labels, settings);
        return scoreB - scoreA;
      }
      if (sortBy === "dueDate") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return compareAsc(parseISO(a.dueDate), parseISO(b.dueDate));
      }
      if (sortBy === "createdAt") {
        return compareDesc(parseISO(a.createdAt), parseISO(b.createdAt));
      }
      return 0;
    });
  }, [tasks, labels, settings, searchQuery, statusFilter, sortBy]);

  const handleOpenEditModal = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleAddTask = (taskData: Omit<Task, "id" | "createdAt" | "completed">) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
    setIsTaskModalOpen(false);
    setEditingTask(undefined);
  };

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false);
    setEditingTask(undefined);
  };

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark transition-colors font-manrope">
      <Header
        onAddTask={() => setIsTaskModalOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
      />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h2 className="text-display tracking-tightest text-primaryAction dark:text-white">
              Focus Workflow
            </h2>
            <div className="flex items-center gap-3 mt-4">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-priorityLow/10 text-priorityLow text-xs font-black uppercase tracking-widest border border-priorityLow/20">
                <span className="w-1.5 h-1.5 bg-priorityLow rounded-full animate-pulse" />
                {tasks.filter((t) => !t.completed).length} Active
              </span>
              <span className="text-slate-400 dark:text-slate-500 text-xxs font-bold uppercase tracking-widest">
                Priority Ranking Enabled
              </span>
            </div>
          </div>
        </div>

        <TaskFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          sortBy={sortBy}
          onSortByChange={setSortBy}
        />

        <TaskList
          tasks={filteredAndSortedTasks}
          labels={labels}
          settings={settings}
          onToggleTask={toggleTaskCompletion}
          onDeleteTask={deleteTask}
          onEditTask={handleOpenEditModal}
        />
      </div>

      <TaskFormModal
        isOpen={isTaskModalOpen}
        onClose={handleCloseTaskModal}
        onSubmit={handleAddTask}
        initialTask={editingTask}
        labels={labels}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        settings={settings}
        labels={labels}
        onUpdateSettings={updateSettings}
        onAddLabel={addLabel}
        onUpdateLabel={updateLabel}
        onDeleteLabel={deleteLabel}
      />
    </main>
  );
}
