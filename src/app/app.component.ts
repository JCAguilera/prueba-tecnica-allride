import { DEFAULT_TASK, Task, TaskData } from "./models/task";
import { TodoService } from "./services/todo.service";
import { Component } from "@angular/core";
import {
  faCheck,
  faPencil,
  faRotateRight,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { PRO_TIPS } from "./utils/util";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  taskFormData: TaskData = Object.assign({}, DEFAULT_TASK);
  editingTask: Task | null = null;
  // Icons
  deleteIcon = faTrash;
  editIcon = faPencil;
  cancelIcon = faX;
  addIcon = faCheck;
  reloadIcon = faRotateRight;
  // Other vars
  proTipIdx = -1;

  constructor(private todo: TodoService) {}

  ngOnInit() {
    this.getNextProTip();
  }

  // Submits new task data
  submitForm() {
    if (this.taskFormData.title.trim() === "") {
      return;
    }
    this.todo.createTask(this.taskFormData);
    this.resetForm();
  }

  // Resets new task form
  resetForm(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.taskFormData = Object.assign({}, DEFAULT_TASK);
  }

  // Handles toggling of task checkbox
  onToggledCheckbox(event: Event, id: string) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.todo.completeTask(id);
    } else {
      this.todo.updateTask(id, { completed: false }); // Uses updateTask to "incomplete" the task
    }
  }

  // Set a task for editing
  editTask(id: string) {
    const task = this.todo.getTask(id);
    if (task) {
      this.editingTask = Object.assign({}, task);
    }
  }

  // Saves task that is being edited
  saveTask() {
    if (this.editingTask) {
      this.todo.updateTask(this.editingTask.id, this.editingTask);
    }
    this.cancelEdit();
  }

  // Cancels edition of a task
  cancelEdit() {
    this.editingTask = null;
  }

  // Delete task from the todo list and cancels edition if necessary
  deleteTask(id: string) {
    if (this.editingTask && this.editingTask.id === id) {
      this.cancelEdit();
    }
    this.todo.deleteTask(id);
  }

  // Check if the task of the given id is being edited
  isEditingCurrentTask(id: string) {
    if (this.editingTask && this.editingTask.id === id) {
      return true;
    }
    return false;
  }

  // Gets the task list
  get taskList(): Task[] {
    return this.todo.taskList;
  }

  // Gets the display text for pending tasks
  get pendingTasksText(): string {
    const pendingTasks = this.taskList.filter((t) => !t.completed).length;
    const theS = pendingTasks === 1 ? "" : "s";
    return pendingTasks === 0
      ? "No tienes tareas pendientes 😎"
      : `Tienes ${pendingTasks} tarea${theS} pendiente${theS} 🤓`;
  }

  // Gets next pro tip index
  getNextProTip() {
    if (this.proTipIdx === -1) {
      this.proTipIdx = Math.floor(Math.random() * PRO_TIPS.length);
    } else if (this.proTipIdx < PRO_TIPS.length - 1) {
      this.proTipIdx++;
    } else {
      this.proTipIdx = 0;
    }
  }

  // Gets the pro tip text
  get proTip(): string {
    return PRO_TIPS[this.proTipIdx];
  }
}
