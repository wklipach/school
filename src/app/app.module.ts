import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainschoolComponent } from './mainschool/mainschool.component';
import {RouterModule, Routes} from '@angular/router';


// определение маршрутов
const appRoutes: Routes = [
  {path: '', component: MainschoolComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MainschoolComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
