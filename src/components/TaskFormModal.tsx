"use client";

import { Label, Task } from "@/types";
import { X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

export default function TaskFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialTask,
  labels,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, "id" | "createdAt" | "completed">) => void;
  initialTask?: Task;
  labels: Label[];
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [basePriority, setBasePriority] = useState(1);
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description || "");
      setBasePriority(initialTask.basePriority);
      setDueDate(initialTask.dueDate ? initialTask.dueDate.split('T')[0] : null);
      setSelectedLabels(initialTask.labels);
    } else {
      setTitle("");
      setDescription("");
      setBasePriority(1);
      setDueDate(null);
      setSelectedLabels([]);
    }
  }, [initialTask, isOpen]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      basePriority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      labels: selectedLabels,
    });
    onClose();
  };

  const toggleLabel = (id: string) => {
    setSelectedLabels((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative bg-surface-light dark:bg-surface-dark w-full max-w-xl rounded-3xl shadow-2xl p-8 transform transition-all animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-black text-primaryAction dark:text-white tracking-tightest">
              {initialTask ? "Update Focus Task" : "Insert Focus Task"}
            </h2>
            <p className="text-xxs font-bold text-slate-400 uppercase tracking-widest mt-1">
              {initialTask ? "Modify existing task parameters" : "Create a new deep work entry"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-400 hover:text-primaryAction dark:hover:text-white"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Task Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-100/50 dark:bg-slate-800/50 border-none rounded-2xl px-5 py-4 text-slate-800 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primaryAction/20 transition-all font-medium"
              placeholder="e.g., Design System Architecture"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Base Priority (1-10)
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={basePriority}
                onChange={(e) => setBasePriority(Number(e.target.value))}
                className="w-full bg-slate-100/50 dark:bg-slate-800/50 border-none rounded-2xl px-5 py-4 text-slate-800 dark:text-white focus:ring-2 focus:ring-primaryAction/20 transition-all font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Target Date
              </label>
              <input
                type="date"
                value={dueDate || ""}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-slate-100/50 dark:bg-slate-800/50 border-none rounded-2xl px-5 py-4 text-slate-800 dark:text-white focus:ring-2 focus:ring-primaryAction/20 transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Strategic Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {labels.map((label) => (
                <button
                  key={label.id}
                  type="button"
                  onClick={() => toggleLabel(label.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border-2 ${
                    selectedLabels.includes(label.id)
                      ? "bg-primaryAction text-white border-primaryAction"
                      : "bg-transparent text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600"
                  }`}
                >
                  {label.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Execution Strategy
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-100/50 dark:bg-slate-800/50 border-none rounded-2xl px-5 py-4 text-slate-800 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primaryAction/20 transition-all font-medium min-h-[120px] resize-none"
              placeholder="Outline the critical steps for successful delivery..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-bold uppercase tracking-widest text-xxs hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover:scale-[0.98] active:scale-95"
            >
              Abort sequence
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="flex-[2] py-4 bg-primaryAction text-white dark:bg-white dark:text-primaryAction rounded-2xl font-black uppercase tracking-widest text-xxs hover:opacity-90 transition-all shadow-xl shadow-primaryAction/20 dark:shadow-none hover:scale-[1.02] active:scale-95 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100"
            >
              {initialTask ? "Update vector data" : "Initialize focus profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
