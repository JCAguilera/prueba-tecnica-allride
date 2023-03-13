import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AppComponent } from "./app.component";
import { CheckboxComponent } from "./components/ui/checkbox/checkbox.component";
import { TextInputComponent } from "./components/ui/text-input/text-input.component";
import { CardComponent } from "./components/card/card.component";
import { LabeledIconComponent } from "./components/ui/labeled-icon/labeled-icon.component";

// Socket.io Connection
const socketConfig: SocketIoConfig = {
  url: "https://stage.allrideapp.com/tech_interview",
  options: { query: { room: "jcaguilera" }, transports: ["websocket"] },
};

@NgModule({
  declarations: [
    AppComponent,
    CheckboxComponent,
    TextInputComponent,
    CardComponent,
    LabeledIconComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SocketIoModule.forRoot(socketConfig),
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
