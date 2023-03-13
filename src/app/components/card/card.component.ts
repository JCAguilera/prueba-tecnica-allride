import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent {
  @Input() background: boolean = true;
  @Output() doubleClick: EventEmitter<void> = new EventEmitter<void>();

  onDoubleClick() {
    this.doubleClick.emit();
  }
}
