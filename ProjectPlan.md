# Project Plan: Smart Task Manager

## 1. Project Overview
### 1.1 Purpose
Build a smart, configurable task manager that helps users prioritize work using a dynamic weighted priority system, where importance is calculated based on configurable decision modeling.

### 1.2 Key Characteristics
* **Local-first**: Data is stored and processed locally.
* **No Authentication**: User sessions are not required.
* **No Backend**: Data is persisted on the client-side.
* **Highly Configurable**: Users can adjust priority logic and UI themes.
* **Visually Polished**: Professional UI with Light & Dark themes.
* **Explainable Logic**: Priority scores are derived from transparent formulas.

---

## 2. Core Features
* **Task CRUD**: Create, Read, Update, and Delete tasks.
* **Weighted Priority Calculation**: Dynamic scoring based on multiple criteria.
* **User-Configurable Weights**: Fine-tune the importance of different factors.
* **Label-Based Priority Influence**: Labels contribute to the overall task score.
* **Theme Toggle**: Switch between Light and Dark modes.
* **Settings Modal**: Single control center for all configurations.
* **Persistent State**: Automatic saving to `localStorage`.

---

## 3. Data Models & Schemas

### 3.1 Task Entity
```typescript
interface Task {
  id: string;             // uuid
  title: string;          // required
  description?: string;   // optional
  basePriority: number;   // 1 = Low, 2 = Medium, 3 = High
  dueDate: string | null; // ISO string
  labels: string[];       // Array of Label IDs
  createdAt: string;      // ISO string
  completed: boolean;
}
```

### 3.2 Label Entity
```typescript
interface Label {
  id: string;
  name: string;
  weight: number;
}
```

### 3.3 Settings & State
```typescript
interface Settings {
  weights: {
    basePriority: number;
    dueDate: number;
    taskAge: number;
    label: number;
  };
  priorityThresholds: {
    lowMax: number;    // Green if score < lowMax
    mediumMax: number; // Orange if score >= lowMax and < mediumMax
                       // Red if score >= mediumMax
  };
  theme: "light" | "dark";
}
```

---

## 4. Functional Requirements

### 4.1 Task Management
* **Task Form**: Modal-based overlay (no route change).
* **Keyboard Support**: Modals must be keyboard-dismissible.
* **Dismissal**: Via "Cancel" button, background click, or Escape key.
* **Operations**:
  * Create new tasks.
  * Edit existing tasks.
  * Toggle completion status.
  * Delete tasks.

### 4.2 Labels System
* **Relationships**: Tasks can have multiple labels.
* **Default Labels**:
  | Name | Purpose | Default Weight |
  | :--- | :--- | :--- |
  | Office | Work tasks | 2.0 |
  | Personal | Personal tasks | 1.0 |
* **Management**: Labels are created, renamed, weighted, or deleted via the Settings modal.

### 4.3 Persistence (localStorage)
The following must be persisted:
* `tasks`
* `labels`
* `settings` (weights, thresholds, theme)

---

## 5. Priority Calculation System (Core Intelligence)

### 5.1 Components
| Criterion | Purpose |
| :--- | :--- |
| Base Priority | User's initial intent/choice. |
| Due Date Urgency | Time sensitivity. |
| Task Age | Prevention of neglect for older tasks. |
| Labels | Contextual importance via associated tags. |

### 5.2 The Formula
The **Weighted Priority** is a derived value (never persisted) calculated as:
$$WeightedPriority = (BasePriorityScore \times BasePriorityWeight) + (DueDateUrgencyScore \times DueDateWeight) + (TaskAgeScore \times TaskAgeWeight) + (\sum(LabelWeights) \times LabelWeight)$$

### 5.3 Due Date Urgency Score Definition
| Days Until Due | Urgency Meaning | Score |
| :--- | :--- | :--- |
| $\le 0$ | Overdue / Today | 4 |
| 1–2 days | Very urgent | 3 |
| 3–5 days | Moderate | 2 |
| > 5 days or none | Low / None | 1 |

---

## 6. UI / UX Rules

### 6.1 Priority Indicators (Visual Feedback)
Tasks are highlighted based on their derived score compared to user-defined thresholds.
* **Low (Green)**: Score < `settings.priorityThresholds.lowMax` (Default: 4)
* **Medium (Orange)**: Score $\ge$ `lowMax` AND < `mediumMax` (Default: 8)
* **High (Red)**: Score $\ge$ `mediumMax`

### 6.2 Settings Modal Layout
The settings interface must include:
1. **Theme Toggle**: Radio/Switch for Light/Dark.
2. **Weight Sliders**: Numeric input/sliders for Base Priority, Due Date, Task Age, and Labels.
3. **Label Management**: List of labels with editable weights and delete actions.
4. **Threshold Configuration**: Adjustable cutoffs for Green/Orange/Red indicators.

### 6.3 Visual Constraints
* **Style**: Elegant, modern, soft UI; premium and calm feel.
* **Hierarchy**: Clear visual structure; non-intrusive priority indicators.
* **Behavior**: All configuration changes (weights/thresholds) must update the UI immediately without page refresh.

---

## 7. Component Architecture

### Components
* `Header`: Contains `ThemeToggle`, `AddTaskButton`, and `SettingsButton`.
* `TaskFormModal`: Handles creation and editing of tasks.
* `SettingsModal`: Central control for weights, labels, and thresholds.
* `TaskList`: Renders a collection of `TaskItem` components.
* `TaskItem`: Displays individual task details and `LabelBadges`.
* `TaskFilters`: (Implied by list management).

### Logic Modules
* **Task Logic**: `addTask`, `updateTask`, `deleteTask`, `toggleTaskCompletion`.
* **Settings Logic**: `loadSettings`, `saveSettings`, `updateWeights`, `toggleTheme`.
* **Label Logic**: `addLabel`, `updateLabel`, `deleteLabel`.
* **Core Intelligence**:
  * `calculateWeightedPriority(task, labels, settings)`
  * `getUrgencyScore()`
  * `getTaskAgeScore()`
  * `sumLabelWeights()`

---

## 8. Success Criteria
* [ ] Application deploys successfully.
* [ ] Tasks and settings persist across refreshes via `localStorage`.
* [ ] Weighted priority scores correctly influence task ordering/sorting.
* [ ] Updating weights in Settings immediately re-ranks the task list.
* [ ] Adding/Removing labels shifts priority scores as defined.
* [ ] Dark and Light themes are fully implemented and visually distinct.
