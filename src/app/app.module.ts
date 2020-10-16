import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { AlarmComponent } from './alarm/alarm.component';

@NgModule({
  declarations: [
    AppComponent,
    AlarmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
