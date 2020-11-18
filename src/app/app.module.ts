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
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { List5Component } from './list5/list5.component';
import { ArchiveComponent } from './archive/archive.component';
import { ViewerComponent } from './viewer/viewer.component';
import { LessonTransferComponent } from './lesson-transfer/lesson-transfer.component';
import { ViewerV2Component } from './viewer-v2/viewer-v2.component';
import { List4V2Component } from './list4-v2/list4-v2.component';
import { List5V2Component } from './list5-v2/list5-v2.component';
import { Guide7Component } from './components/guide7/guide7.component';
import {Guide7Service} from './components/guide7/guide7.service';
import { Guide8Component } from './components/guide8/guide8.component';
import { Elem2linesComponent } from './components/elem2lines/elem2lines.component';
import { Guide10Component } from './components/guide10/guide10.component';
import { RightpanelComponent } from './components/rightpanel/rightpanel.component';


// определение маршрутов
const appRoutes: Routes = [
  {path: '', component: MainschoolComponent},
  {path: 'list2', component: List2Component},
  {path: 'list3', component: List3Component},
  {path: 'list4', component: List4Component},
  {path: 'list4-v2', component: List4V2Component},
  {path: 'list5', component: List5Component},
  {path: 'list5-v2', component: List5V2Component},
  {path: 'archive', component: ArchiveComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'viewer', component: ViewerComponent},
  {path: 'viewer-v2', component: ViewerV2Component},
  {path: 'lesson-transfer', component: LessonTransferComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MainschoolComponent,
    CaptionComponent,
    BasementComponent,
    List2Component,
    List3Component,
    List4Component,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    List5Component,
    ArchiveComponent,
    ViewerComponent,
    LessonTransferComponent,
    ViewerV2Component,
    List4V2Component,
    List5V2Component,
    Guide7Component,
    Guide8Component,
    Elem2linesComponent,
    Guide10Component,
    RightpanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2FlatpickrModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [GlobalRef, GuideService, Guide7Service],
  bootstrap: [AppComponent]
})
export class AppModule { }


