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
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primaryAction dark:group-focus-within:text-white transition-colors" />
          <input
            type="text"
            placeholder="Search tasks by title or context..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium focus:ring-2 focus:ring-primaryAction/5 dark:focus:ring-white/5 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
          />
        </div>

        {/* Status Filters */}
        <div className="flex bg-slate-100 dark:bg-slate-900/50 p-1 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 self-start">
          {(["all", "active", "completed"] as FilterStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(status)}
              className={cn(
                "px-5 py-2 text-xxs font-black uppercase tracking-widest rounded-xl transition-all",
                statusFilter === status
                  ? "bg-white dark:bg-slate-800 shadow-sm text-primaryAction dark:text-white"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/50">
        <div className="flex items-center gap-2 text-slate-400">
          <SortDesc className="w-3.5 h-3.5" />
          <span className="text-xxs font-bold uppercase tracking-widest">Sort Architecture</span>
        </div>

        <div className="flex gap-4">
          {(["score", "dueDate", "createdAt"] as SortOption[]).map((option) => (
            <button
              key={option}
              onClick={() => onSortByChange(option)}
              className={cn(
                "text-xxs font-bold uppercase tracking-widest transition-colors relative pb-1",
                sortBy === option
                  ? "text-primaryAction dark:text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primaryAction dark:after:bg-white after:rounded-full"
                  : "text-slate-400 hover:text-slate-500"
              )}
            >
              {option.replace(/([A-Z])/g, " $1")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
