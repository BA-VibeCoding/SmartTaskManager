"use client";

import { useSettings } from "@/context/SettingsContext";
import { Plus, Settings as SettingsIcon, Sun, Moon } from "lucide-react";

export default function Header({
  onAddTask,
  onOpenSettings,
}: {
  onAddTask: () => void;
  onOpenSettings: () => void;
}) {
  const { settings, updateSettings } = useSettings();

  const toggleTheme = () => {
    updateSettings({ ...settings, theme: settings.theme === "light" ? "dark" : "light" });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primaryAction to-gray-500 bg-clip-text text-transparent dark:from-white dark:to-gray-400 font-manrope">
            Architect Desk
          </h1>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-200 dark:border-slate-700">
            v1.0.0
          </span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500 dark:text-slate-400"
            title="Toggle Theme"
            aria-label="Toggle Theme"
          >
            {settings.theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-500" />
            )}
          </button>

          <button
            onClick={onOpenSettings}
            className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500 dark:text-slate-400"
            title="System Settings"
            aria-label="System Settings"
          >
            <SettingsIcon className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 hidden sm:block" />

          <button
            onClick={onAddTask}
            className="flex items-center space-x-2 bg-primaryAction text-white dark:bg-white dark:text-primaryAction px-5 py-2.5 rounded-xl hover:opacity-90 transition-all font-bold text-sm shadow-lg shadow-slate-200 dark:shadow-none"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden xs:inline">Add Focus Task</span>
            <span className="xs:hidden">Add</span>
          </button>
        </div>
      </div>
    </header>
  );
}
