import { Task, TaskData, UpdatedTaskData } from "./../models/task";
import { Injectable } from "@angular/core";
import { TodoList } from "../models/todo";
import { SocketService } from "./socket.service";
import { randomString } from "../utils/util";

@Injectable({ providedIn: "root" })
export class TodoService {
  private todoList: TodoList = new TodoList();

  constructor(private socket: SocketService) {
    // Receives socket events and updates the todo list as needed
    this.socket.onCreateTask().subscribe((task: Task) => {
      this.todoList.addTask(task);
    });
    this.socket.onUpdateTask().subscribe((updatedTask: UpdatedTaskData) => {
      console.log(updatedTask);
      this.todoList.updateTask(updatedTask.id, updatedTask);
    });
    this.socket.onDeleteTask().subscribe((id: string) => {
      this.todoList.deleteTask(id);
    });
    this.socket.onCompleteTask().subscribe((id: string) => {
      this.todoList.completeTask(id);
    });
    // Create demo tasks (not necessary)
    this._createDemoTasks();
  }

  // Create task from given data, adds them to the todo list and emits the createTask event
  createTask(taskData: Partial<TaskData>) {
    const task = this.todoList.createTask(taskData);
    if (task) {
      this.socket.createTask(task);
    }
  }

  // Updates task with given data, emits the updateTask event
  updateTask(id: string, taskData: Partial<TaskData>) {
    const updatedTask = this.todoList.updateTask(id, taskData);
    if (updatedTask) {
      this.socket.updateTask(updatedTask);
    }
  }

  // Delete task with given id, emits the deleteTask event
  deleteTask(id: string) {
    if (this.todoList.deleteTask(id)) {
      this.socket.deleteTask(id);
    }
  }

  // Completes task with given id, emits the completeTask event
  completeTask(id: string) {
    if (this.todoList.completeTask(id)) {
      this.socket.completeTask(id);
    }
  }

  // Get task by id
  getTask(id: string): Task | undefined {
    return this.todoList.getTask(id);
  }

  // Gets array of tasks
  get taskList(): Task[] {
    return this.todoList.taskList;
  }

  // Create demo tasks
  private _createDemoTasks() {
    this.todoList.addTask({
      id: "task1",
      title: "Tarea 1",
      completed: false,
      created_at: new Date(),
      updated_at: new Date(),
    });
    this.todoList.addTask({
      id: "task2",
      title: "Tarea 2",
      completed: false,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
}
