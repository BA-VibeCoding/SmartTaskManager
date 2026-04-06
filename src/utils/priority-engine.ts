import { Task, Label, Settings } from "@/types";
import { differenceInDays, parseISO, startOfDay } from "date-fns";

/**
 * 5.3 Due Date Urgency Score Definition
 * | Days Until Due | Urgency Meaning | Score |
 * | :--- | :--- | :--- |
 * | <= 0 | Overdue / Today | 4 |
 * | 1–2 days | Very urgent | 3 |
 * | 3–5 days | Moderate | 2 |
 * | > 5 days or none | Low / None | 1 |
 */
export const getUrgencyScore = (dueDateString: string | null): number => {
  if (!dueDateString) return 1;

  const dueDate = startOfDay(parseISO(dueDateString));
  const today = startOfDay(new Date());
  const diff = differenceInDays(dueDate, today);

  if (diff <= 0) return 4;
  if (diff <= 2) return 3;
  if (diff <= 5) return 2;
  return 1;
};

/**
 * Task Age Score (Implicitly part of TaskAgeScore in formula)
 * Defined in implementation plan to prevent neglect of older tasks.
 */
export const getTaskAgeScore = (createdAtString: string): number => {
  const createdAt = startOfDay(parseISO(createdAtString));
  const today = startOfDay(new Date());
  const diff = differenceInDays(today, createdAt);

  if (diff >= 30) return 4;
  if (diff >= 14) return 3;
  if (diff >= 7) return 2;
  return 1;
};

/**
 * sumLabelWeights()
 * Calculates the total sum of weights for labels associated with a task.
 */
export const sumLabelWeights = (taskLabelIds: string[], allLabels: Label[]): number => {
  return allLabels
    .filter((label) => taskLabelIds.includes(label.id))
    .reduce((sum, label) => sum + label.weight, 0);
};

/**
 * 5.2 The Formula
 * WeightedPriority = (BasePriorityScore * BasePriorityWeight) + 
 *                    (DueDateUrgencyScore * DueDateWeight) + 
 *                    (TaskAgeScore * TaskAgeWeight) + 
 *                    (sum(LabelWeights) * LabelWeight)
 */
export const calculateWeightedPriority = (
  task: Task,
  allLabels: Label[],
  settings: Settings
): number => {
  const { weights } = settings;

  const basePriorityScore = task.basePriority;
  const dueDateUrgencyScore = getUrgencyScore(task.dueDate);
  const taskAgeScore = getTaskAgeScore(task.createdAt);
  const labelSum = sumLabelWeights(task.labels, allLabels);

  const weightedPriority =
    basePriorityScore * weights.basePriority +
    dueDateUrgencyScore * weights.dueDate +
    taskAgeScore * weights.taskAge +
    labelSum * weights.label;

  // Returning as a number rounded to 2 decimal places for UI display consistency
  return Math.round(weightedPriority * 100) / 100;
};

/**
 * Maps the calculated priority score to a color string based on settings.
 */
export const getPriorityColor = (score: number, settings: Settings): "green" | "orange" | "red" => {
  const { lowMax, mediumMax } = settings.priorityThresholds;
  if (score <= lowMax) return "green";
  if (score <= mediumMax) return "orange";
  return "red";
};
