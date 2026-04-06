"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Settings } from "@/types";

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Settings) => void;
  updateWeights: (weights: Settings["weights"]) => void;
  updateThresholds: (thresholds: Settings["priorityThresholds"]) => void;
  setTheme: (theme: "light" | "dark") => void;
}

const DEFAULT_SETTINGS: Settings = {
  weights: {
    basePriority: 1,
    dueDate: 2,
    taskAge: 1,
    label: 1,
  },
  priorityThresholds: {
    lowMax: 4,
    mediumMax: 8,
  },
  theme: "light",
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettingsState] = useState<Settings>(DEFAULT_SETTINGS);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("settings");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSettingsState(parsed);
        document.documentElement.classList.toggle("dark", parsed.theme === "dark");
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
    setIsInitialized(true);
  }, []);

  const updateSettings = (newSettings: Settings) => {
    setSettingsState(newSettings);
    localStorage.setItem("settings", JSON.stringify(newSettings));
    document.documentElement.classList.toggle("dark", newSettings.theme === "dark");
  };

  const updateWeights = (weights: Settings["weights"]) => {
    updateSettings({ ...settings, weights });
  };

  const updateThresholds = (thresholds: Settings["priorityThresholds"]) => {
    updateSettings({ ...settings, priorityThresholds: thresholds });
  };

  const setTheme = (theme: "light" | "dark") => {
    updateSettings({ ...settings, theme });
  };

  if (!isInitialized) return null;

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, updateWeights, updateThresholds, setTheme }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings must be used within SettingsProvider");
  return context;
};
