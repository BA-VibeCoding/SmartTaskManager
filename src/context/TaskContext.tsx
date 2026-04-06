"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Task, Label } from "@/types";
import { v4 as uuidv4 } from "uuid";

interface TaskContextType {
  tasks: Task[];
  labels: Label[];
  addTask: (taskData: Omit<Task, "id" | "createdAt" | "completed">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  addLabel: (labelData: Omit<Label, "id">) => void;
  updateLabel: (id: string, updates: Partial<Label>) => void;
  deleteLabel: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const DEFAULT_LABELS: Label[] = [
  { id: "1", name: "Office", weight: 2.0 },
  { id: "2", name: "Personal", weight: 1.0 },
];

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    const storedLabels = localStorage.getItem("labels");

    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (e) {
        console.error("Failed to parse tasks", e);
      }
    }

    if (storedLabels) {
      try {
        setLabels(JSON.parse(storedLabels));
      } catch (e) {
        console.error("Failed to parse labels", e);
      }
    } else {
      setLabels(DEFAULT_LABELS);
      localStorage.setItem("labels", JSON.stringify(DEFAULT_LABELS));
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      localStorage.setItem("labels", JSON.stringify(labels));
    }
  }, [tasks, labels, isInitialized]);

  const addTask = (taskData: Omit<Task, "id" | "createdAt" | "completed">) => {
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const addLabel = (labelData: Omit<Label, "id">) => {
    const newLabel: Label = { ...labelData, id: uuidv4() };
    setLabels((prev) => [...prev, newLabel]);
  };

  const updateLabel = (id: string, updates: Partial<Label>) => {
    setLabels((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));
  };

  const deleteLabel = (id: string) => {
    setLabels((prev) => prev.filter((l) => l.id !== id));
    // Remove deleted label reference from tasks
    setTasks((prev) =>
      prev.map((t) => ({
        ...t,
        labels: t.labels.filter((lid) => lid !== id),
      }))
    );
  };

  if (!isInitialized) return null;

  return (
    <TaskContext.Provider
      value={{
        tasks,
        labels,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        addLabel,
        updateLabel,
        deleteLabel,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within TaskProvider");
  return context;
};
