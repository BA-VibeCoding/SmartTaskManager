# UI Design Specification: Smart Task Manager

## 1. Visual Identity & Theme
- **Design Language**: Modern Minimalist / Productivity-focused ("Architectural Desk").
- **Typography**: Manrope (Primary Sans-Serif).
  - Headings: Bold, 1.5rem - 2rem.
  - Body: Medium/Regular, 0.875rem - 1rem.
  - Metadata: 0.75rem, tracking-tight.
- **Color Tokens (Light Mode)**:
  - **Background**: #F8FAFC (Slate 50)
  - **Surface**: #FFFFFF (White)
  - **Accent Border**: 1px solid #E2E8F0 (Slate 200)
  - **Primary Action**: #1A1C1E (Custom Dark)
  - **Priority Low**: #22C55E (Green)
  - **Priority Medium**: #F59E0B (Orange)
  - **Priority High**: #EF4444 (Red)

## 2. App Shell & Navigation
- **Top Navigation Bar**:
    - Sticky position, backdrop blur.
    - Product Logo: "Architect Desk" (left).
    - Search Bar (centered).
    - Actions: Theme Toggle, Settings Gear, and "+ Add Task" primary button.
- **Side Navigation**:
    - Tabs: "Deep Work" (Active), "Incoming", "Projects", "Archive".
    - "New Project" secondary CTA at bottom.

## 3. Main Dashboard: Task List
- **Focus Flow Header**: Displays active task count and team/user avatars.
- **Task Sorting**: Automatic descending sort by "Weighted Score".
- **Task Cards**:
    - **Indicator**: 4px left-border accent colored by priority (Green/Orange/Red).
    - **Checkbox**: Square toggle for completion state.
    - **Title & Description**: High-contrast text with clear hierarchy.
    - **Metadata**: Due date (icon), Label (Office/Personal), and the Calculated Score (e.g., "SCORE 18.2").
- **Empty State**: "Insert new focus task..." dashed placeholder button.

## 4. Task Form Modal (Add/Edit)
- **Overlay**: Center-aligned modal with 40% backdrop.
- **Inputs**:
    - **Title**: Large text input.
    - **Description**: Textarea for deep work details.
    - **Priority**: 3-point segmented control (Low, Medium, High).
    - **Due Date**: Date picker field.
    - **Labels**: Pill-style tags with "Add Label" interaction.
- **Actions**: "Cancel" (text button) and "Create Task" (primary filled button).

## 5. Settings Modal (Logic Configuration)
- **Theme Preference**: Light/Dark toggle.
- **Priority Weights**:
    - Four sliders to adjust the influence of: Base Priority, Due Date, Task Age, and Labels.
    - Live numeric feedback for each weight.
- **Thresholds**: 
    - Numeric inputs for "Low Max" and "Medium Max" to define color transitions.
- **Label Management**:
    - List of active labels with individual weight inputs.
    - "Add Label..." input with inline "+" button.
- **Actions**: "Close" button to dismiss and apply changes globally.

## 6. Priority Calculation Logic
- **Formula**: `(BasePriority * Weight) + (DueDateUrgency * Weight) + (TaskAge * Weight) + (LabelSum * Weight)`.
- **Dynamic Sorting**: Any change to weights in the Settings Modal triggers an immediate re-sort of the Task List.