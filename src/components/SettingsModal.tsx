import { Settings, Label } from "@/types";
import { X, Plus, Trash2, Sun, Moon } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  labels: Label[];
  onUpdateSettings: (settings: Settings) => void;
  onAddLabel: (label: Omit<Label, "id">) => void;
  onUpdateLabel: (id: string, updates: Partial<Label>) => void;
  onDeleteLabel: (id: string) => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  settings,
  labels,
  onUpdateSettings,
  onAddLabel,
  onUpdateLabel,
  onDeleteLabel,
}: SettingsModalProps) {
  const [newLabelName, setNewLabelName] = useState("");
  const [newLabelWeight, setNewLabelWeight] = useState(1.0);

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

  const handleWeightChange = (key: keyof Settings["weights"], val: number) => {
    onUpdateSettings({
      ...settings,
      weights: { ...settings.weights, [key]: val },
    });
  };

  const handleThresholdChange = (
    key: keyof Settings["priorityThresholds"],
    val: number
  ) => {
    onUpdateSettings({
      ...settings,
      priorityThresholds: { ...settings.priorityThresholds, [key]: val },
    });
  };

  const toggleTheme = () => {
    onUpdateSettings({
      ...settings,
      theme: settings.theme === "light" ? "dark" : "light",
    });
  };

  const handleAddLabel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabelName.trim()) return;
    onAddLabel({ name: newLabelName.trim(), weight: newLabelWeight });
    setNewLabelName("");
    setNewLabelWeight(1.0);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative bg-surface-light dark:bg-surface-dark w-full max-w-2xl rounded-3xl shadow-2xl p-8 sm:p-10 transform transition-all animate-in fade-in zoom-in duration-300 h-[85vh] flex flex-col">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-100 dark:border-slate-800/50 flex-shrink-0">
          <div>
            <h2 className="text-3xl font-black text-primaryAction dark:text-white tracking-tightest">
              System Configuration
            </h2>
            <p className="text-xxs font-bold text-slate-400 uppercase tracking-widest mt-1">
              Logic Engine & Universal Defaults
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-400"
            aria-label="Close settings"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto pr-2 custom-scrollbar flex-grow space-y-12">
          {/* Theme Section */}
          <section className="space-y-6">
            <h3 className="text-xxs font-black text-slate-400 uppercase tracking-widest leading-none block">
              Interface Mode
            </h3>
            <div className="flex gap-4">
              {(["light", "dark"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => onUpdateSettings({ ...settings, theme: t })}
                  className={cn(
                    "flex-1 py-5 px-6 rounded-2xl border-2 transition-all flex items-center justify-between group",
                    settings.theme === t
                      ? "border-primaryAction bg-primaryAction text-white dark:border-white dark:bg-slate-800"
                      : "border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/20"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {t === "light" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    <span className="text-xs font-black uppercase tracking-widest">{t} Mode</span>
                  </div>
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full border-2 transition-transform",
                      settings.theme === t
                        ? "bg-white dark:bg-white border-white scale-110"
                        : "border-slate-200 dark:border-slate-700"
                    )}
                  />
                </button>
              ))}
            </div>
          </section>

          {/* Weights Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xxs font-black text-slate-400 uppercase tracking-widest">
                Scoring Influence Weights
              </h3>
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 uppercase tracking-widest rounded-md border border-slate-200/50 dark:border-slate-700/50">
                0.0x → 5.0x
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 p-8 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/50">
              {(Object.keys(settings.weights) as (keyof Settings["weights"])[]).map(
                (key) => (
                  <div key={key} className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-xxs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">
                        {key.replace(/([A-Z])/g, " $1")}
                      </label>
                      <span className="text-xs font-black text-primaryAction dark:text-white tabular-nums">
                        {settings.weights[key].toFixed(1)}x
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.1"
                      className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-primaryAction dark:accent-white transition-all hover:scale-y-150"
                      value={settings.weights[key]}
                      onChange={(e) =>
                        handleWeightChange(key, parseFloat(e.target.value))
                      }
                    />
                  </div>
                )
              )}
            </div>
          </section>

          {/* Thresholds Section */}
          <section className="space-y-6">
            <h3 className="text-xxs font-black text-slate-400 uppercase tracking-widest leading-none block">
              Visual Priority Boundaries
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4 p-6 bg-priorityLow/5 dark:bg-priorityLow/10 border border-priorityLow/10 rounded-2xl">
                <label className="text-xxs font-black text-priorityLow uppercase tracking-widest block">
                  Green → Orange Breakpoint
                </label>
                <div className="relative">
                  <input
                    type="number"
                    className="w-full bg-surface-light dark:bg-surface-dark text-xl font-black p-4 rounded-xl focus:ring-2 focus:ring-priorityLow outline-none tabular-nums text-primaryAction dark:text-white border border-priorityLow/20"
                    value={settings.priorityThresholds.lowMax}
                    onChange={(e) =>
                      handleThresholdChange("lowMax", parseFloat(e.target.value))
                    }
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xxs font-bold text-slate-300 pointer-events-none uppercase">Points</span>
                </div>
              </div>
              <div className="space-y-4 p-6 bg-priorityMedium/5 dark:bg-priorityMedium/10 border border-priorityMedium/10 rounded-2xl">
                <label className="text-xxs font-black text-priorityMedium uppercase tracking-widest block">
                  Orange → Red Breakpoint
                </label>
                <div className="relative">
                  <input
                    type="number"
                    className="w-full bg-surface-light dark:bg-surface-dark text-xl font-black p-4 rounded-xl focus:ring-2 focus:ring-priorityMedium outline-none tabular-nums text-primaryAction dark:text-white border border-priorityMedium/20"
                    value={settings.priorityThresholds.mediumMax}
                    onChange={(e) =>
                      handleThresholdChange("mediumMax", parseFloat(e.target.value))
                    }
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xxs font-bold text-slate-300 pointer-events-none uppercase">Points</span>
                </div>
              </div>
            </div>
          </section>

          {/* Label Management Section */}
          <section className="space-y-6 pb-4">
            <h3 className="text-xxs font-black text-slate-400 uppercase tracking-widest leading-none block">
              Label Catalog (Global Contexts)
            </h3>
            <div className="space-y-4">
              <form onSubmit={handleAddLabel} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="New label identifier (e.g. Critical)"
                  className="flex-[3] bg-slate-100 dark:bg-slate-900/50 p-4 rounded-2xl text-xs font-black uppercase tracking-widest outline-none border border-slate-200/50 dark:border-slate-800/50 focus:border-primaryAction dark:focus:border-white transition-all"
                  value={newLabelName}
                  onChange={(e) => setNewLabelName(e.target.value)}
                />
                <div className="flex flex-1 gap-4">
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Wgt"
                    className="flex-1 bg-slate-100 dark:bg-slate-900/50 p-4 rounded-2xl text-xs font-black p-4 outline-none border border-slate-200/50 dark:border-slate-800/50 focus:border-primaryAction dark:focus:border-white tabular-nums text-primaryAction dark:text-white"
                    value={newLabelWeight}
                    onChange={(e) => setNewLabelWeight(parseFloat(e.target.value))}
                  />
                  <button
                    type="submit"
                    disabled={!newLabelName.trim()}
                    className="w-14 h-14 bg-primaryAction dark:bg-white text-white dark:text-primaryAction rounded-2xl hover:opacity-90 transition-all font-black flex items-center justify-center shadow-xl shadow-primaryAction/10 dark:shadow-none disabled:opacity-30"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {labels.map((label) => (
                  <div
                    key={label.id}
                    className="flex items-center justify-between p-4 bg-surface-light dark:bg-surface-dark border border-slate-200/50 dark:border-slate-800/50 rounded-2xl group transition-all hover:border-slate-300 dark:hover:border-slate-600 shadow-sm"
                  >
                    <div className="flex flex-col gap-1.5 flex-grow">
                      <span className="text-xxs font-black text-primaryAction dark:text-white uppercase tracking-widest bg-slate-100 dark:bg-slate-800 self-start px-2 py-0.5 rounded-md">
                        {label.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                          Bias Influence:
                        </span>
                        <input
                          type="number"
                          step="0.1"
                          className="w-14 bg-transparent text-xs font-black text-primaryAction dark:text-white py-0.5 border-b border-dashed border-slate-200 dark:border-slate-700 focus:border-primaryAction outline-none tabular-nums"
                          value={label.weight}
                          onChange={(e) =>
                            onUpdateLabel(label.id, {
                              weight: parseFloat(e.target.value),
                            })
                          }
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => onDeleteLabel(label.id)}
                      className="p-2.5 opacity-0 group-hover:opacity-100 text-slate-300 hover:text-priorityHigh transition-all"
                      aria-label="Delete label"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="mt-10 flex items-center justify-between flex-shrink-0 pt-8 border-t border-slate-100 dark:border-slate-800/50">
           <p className="text-xxs font-bold text-slate-300 uppercase tracking-widest leading-relaxed w-1/2">
             All modifications trigger immediate runtime re-indexing of priority vectors.
           </p>
           <button
            onClick={onClose}
            className="w-48 py-4 bg-primaryAction text-white dark:bg-white dark:text-primaryAction text-xxs font-black uppercase tracking-widest rounded-2xl hover:opacity-90 transition-all shadow-2xl shadow-primaryAction/20 dark:shadow-none"
          >
            Close Engine
          </button>
        </div>
      </div>
    </div>
  );
}
