"use client";

import { Search, Filter, SortDesc } from "lucide-react";
import { cn } from "@/lib/utils";

export type FilterStatus = "all" | "active" | "completed";
export type SortOption = "score" | "dueDate" | "createdAt";

interface TaskFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: FilterStatus;
  onStatusChange: (status: FilterStatus) => void;
  sortBy: SortOption;
  onSortByChange: (sort: SortOption) => void;
}

export default function TaskFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortByChange,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-col gap-6 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Search Input */}
        <div className="relative flex-grow group">
          <label htmlFor="task-search" className="sr-only">Search tasks</label>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primaryAction dark:group-focus-within:text-white transition-colors" />
          <input
            id="task-search"
            type="text"
            placeholder="Search tasks by title or context..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium focus:ring-2 focus:ring-primaryAction/20 dark:focus:ring-white/20 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 hover:border-slate-300 dark:hover:border-slate-700"
          />
        </div>

        {/* Status Filters */}
        <nav className="flex bg-slate-100 dark:bg-slate-900/50 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 self-start" aria-label="Task status filter">
          {(["all", "active", "completed"] as FilterStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(status)}
              aria-current={statusFilter === status ? "page" : undefined}
              className={cn(
                "px-5 py-2.5 text-xxs font-black uppercase tracking-widest rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-primaryAction/10",
                statusFilter === status
                  ? "bg-white dark:bg-slate-800 shadow-md shadow-slate-200/50 dark:shadow-none text-primaryAction dark:text-white"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/30"
              )}
            >
              {status}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800/50" role="toolbar" aria-label="Sort options">
        <div className="flex items-center gap-2 text-slate-400">
          <SortDesc className="w-4 h-4" strokeWidth={2.5} />
          <span className="text-xxs font-black uppercase tracking-widest">Sort Architecture</span>
        </div>

        <div className="flex gap-6">
          {(["score", "dueDate", "createdAt"] as SortOption[]).map((option) => (
            <button
              key={option}
              onClick={() => onSortByChange(option)}
              aria-pressed={sortBy === option}
              className={cn(
                "text-xxs font-black uppercase tracking-widest transition-all relative pb-2 group focus:outline-none",
                sortBy === option
                  ? "text-primaryAction dark:text-white"
                  : "text-slate-400 hover:text-slate-500"
              )}
            >
              {option.replace(/([A-Z])/g, " $1")}
              <span className={cn(
                "absolute bottom-0 left-0 w-full h-0.5 rounded-full transition-all duration-300",
                sortBy === option 
                  ? "bg-primaryAction dark:bg-white translate-y-0 opacity-100" 
                  : "bg-slate-200 dark:bg-slate-700 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
              )} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
