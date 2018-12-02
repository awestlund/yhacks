import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MatCardModule, MatButtonModule, MatButton } from "@angular/material";

import { AppComponent } from './app.component';
import { OwnerComponent } from './components/owner/owner.component';
import { MoverComponent } from './components/mover/mover.component';

@NgModule({
  declarations: [
    AppComponent,
    OwnerComponent,
    MoverComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
