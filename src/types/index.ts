export interface Label {
  id: string;
  name: string;
  weight: number;
}

export interface Task {
  id: string; // uuid
  title: string; // required
  description?: string; // optional
  basePriority: number; // 1 = Low, 2 = Medium, 3 = High
  dueDate: string | null; // ISO string
  labels: string[]; // Array of Label IDs
  createdAt: string; // ISO string
  completed: boolean;
}

export interface Settings {
  weights: {
    basePriority: number;
    dueDate: number;
    taskAge: number;
    label: number;
  };
  priorityThresholds: {
    lowMax: number; // Green if score < lowMax
    mediumMax: number; // Orange if score >= lowMax and < mediumMax
    // Red if score >= mediumMax
  };
  theme: "light" | "dark";
}
