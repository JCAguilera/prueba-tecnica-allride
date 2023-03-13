import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-text-input",
  templateUrl: "./text-input.component.html",
  styleUrls: ["./text-input.component.css"],
})
export class TextInputComponent implements OnChanges {
  @Input() placeholder: string = "";
  @Input() disabled: boolean = false;
  @Input() focus: boolean = false;
  @Input() value: string = "";
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() submit: EventEmitter<string> = new EventEmitter<string>();
  @Output() exit: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild("theInput") mainInput!: ElementRef;

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      // 'setTimeout' hack to fix undefined input element 😬
      if (this.focus && changes["focus"] && changes["focus"].currentValue) {
        const inputElement = this.mainInput.nativeElement as HTMLInputElement;
        // Select text on input
        inputElement.selectionStart = 0;
        inputElement.selectionEnd = inputElement.value.length;
        // Set focus on input
        inputElement.focus();
      }
    }, 10);
  }

  onValueChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }

  onKeyUp(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
    if (event.key === "Enter") {
      this.submit.emit(this.value);
    }
  }

  onEscapePressed(event: Event) {
    const target = event.target as HTMLInputElement;
    target.blur();
    this.exit.emit();
  }
}
