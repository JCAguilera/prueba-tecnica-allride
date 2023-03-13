import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-labeled-icon",
  templateUrl: "./labeled-icon.component.html",
  styleUrls: ["./labeled-icon.component.css"],
})
export class LabeledIconComponent {
  @Input() icon!: IconDefinition;
  @Input() label: string = "";
  @Input() ngStyle: { [klass: string]: any } = {};
  @Input() ngClass: string | string[] | Set<string> | { [klass: string]: any } =
    "";
}
