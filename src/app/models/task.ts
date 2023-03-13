export interface Task {
  id: string;
  title: string;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
}
export type TaskData = Omit<Task, "id" | "created_at" | "updated_at">;
export type UpdatedTaskData = Omit<Task, "created_at" | "updated_at">;
export const DEFAULT_TASK: TaskData = {
  title: "",
  completed: false,
};
