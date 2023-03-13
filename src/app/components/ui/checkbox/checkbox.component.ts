import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-checkbox",
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.css"],
})
export class CheckboxComponent {
  @Input() id: string = "";
  @Input() disabled: boolean = false;
  @Input() checked: boolean = false;
  @Output() checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() change: EventEmitter<Event> = new EventEmitter<Event>();

  onToggledCheckbox(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.checkedChange.emit(this.checked);
    this.change.emit(event);
  }
}
