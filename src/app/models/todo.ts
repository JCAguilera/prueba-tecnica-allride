import { randomString } from "../utils/util";
import { Task, TaskData, UpdatedTaskData, DEFAULT_TASK } from "./task";

/** Acts as task database */
export class TodoList {
  private _taskList: Task[] = [];

  getIndex(id: string) {
    return this.taskList.findIndex((t) => t.id === id);
  }

  exists(id: string) {
    return this.getIndex(id) >= 0;
  }

  getTask(id: string) {
    return this._taskList.find((t) => t.id === id);
  }

  addTask(task: Task) {
    if (this.exists(task.id)) {
      console.error(`Cannot add task ${task.id} because it already exists!`);
      return false;
    }
    this._taskList.push(task);
    return true;
  }

  createTask(taskData: Partial<TaskData>) {
    const newTask: Task = {
      ...DEFAULT_TASK,
      ...taskData,
      id: randomString(5),
      created_at: new Date(),
      updated_at: new Date(),
    };
    const done = this.addTask(newTask);
    return done ? newTask : undefined;
  }

  updateTask(id: string, taskData: Partial<TaskData>) {
    const foundIndex = this.getIndex(id);
    if (foundIndex < 0) {
      console.error(`Cannot update task ${id} because it does not exist!`);
      return undefined;
    }
    const updatedTask: Task = {
      ...this._taskList[foundIndex],
      ...taskData,
      updated_at: new Date(),
    };
    this._taskList[foundIndex] = updatedTask;
    return updatedTask as UpdatedTaskData;
  }

  deleteTask(id: string) {
    const foundId = this._taskList.findIndex((t) => t.id === id);
    if (foundId < 0) {
      console.error(`Cannot delete task ${id} because it does not exist!`);
      return false;
    }
    this._taskList.splice(foundId, 1);
    return true;
  }

  completeTask(id: string) {
    const foundId = this._taskList.findIndex((t) => t.id === id);
    if (foundId < 0) {
      console.error(`Cannot complete task ${id} because it does not exist!`);
      return false;
    }
    const updatedTask: Task = {
      ...this._taskList[foundId],
      completed: true,
      updated_at: new Date(),
    };
    this._taskList[foundId] = updatedTask;
    return true;
  }

  get taskList(): Task[] {
    return this._taskList.slice();
  }
}
