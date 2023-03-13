import { Task, UpdatedTaskData } from "./../models/task";
import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";

/**
 * Implements Socket.io methods
 */
@Injectable({ providedIn: "root" })
export class SocketService {
  constructor(private socket: Socket) {}

  createTask(task: Task) {
    this.socket.emit("createTask", task);
  }

  updateTask(updatedTask: UpdatedTaskData) {
    this.socket.emit("updateTask", updatedTask);
  }

  deleteTask(id: string) {
    this.socket.emit("deleteTask", id);
  }

  completeTask(id: string) {
    this.socket.emit("completeTask", id);
  }

  getClients() {
    this.socket.emit("getClients");
  }

  onCreateTask() {
    return this.socket.fromEvent<Task>("createTask");
  }

  onUpdateTask() {
    return this.socket.fromEvent<UpdatedTaskData>("updateTask");
  }

  onDeleteTask() {
    return this.socket.fromEvent<string>("deleteTask");
  }

  onCompleteTask() {
    return this.socket.fromEvent<string>("completeTask");
  }

  onGetClients() {
    return this.socket.fromEvent<{ clients: number }>("getClients");
  }

  onNewClient() {
    return this.socket.fromEvent<void>("newClient");
  }

  onDisconnectedClient() {
    return this.socket.fromEvent<void>("disconnectedClient");
  }
}
