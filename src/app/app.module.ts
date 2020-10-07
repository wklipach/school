import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainschoolComponent } from './mainschool/mainschool.component';
import {RouterModule, Routes} from '@angular/router';
import { CaptionComponent } from './caption/caption.component';
import { BasementComponent } from './basement/basement.component';
import { List2Component } from './list2/list2.component';
import { List3Component } from './list3/list3.component';
import { List4Component } from './list4/list4.component';
import {GlobalRef} from './services/globalref';
import {HttpClientModule} from '@angular/common/http';
import {GuideService} from './services/guide.service';
import {Ng2FlatpickrModule} from 'ng2-flatpickr';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



// определение маршрутов
const appRoutes: Routes = [
  {path: '', component: MainschoolComponent},
  {path: 'list2', component: List2Component},
  {path: 'list3', component: List3Component},
  {path: 'list4', component: List4Component}
];

@NgModule({
  declarations: [
    AppComponent,
    MainschoolComponent,
    CaptionComponent,
    BasementComponent,
    List2Component,
    List3Component,
    List4Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2FlatpickrModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [GlobalRef, GuideService],
  bootstrap: [AppComponent]
})
export class AppModule { }


