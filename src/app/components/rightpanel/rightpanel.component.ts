import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-rightpanel',
  templateUrl: './rightpanel.component.html',
  styleUrls: ['./rightpanel.component.css']
})
export class RightpanelComponent implements OnInit {

  constructor(private router: Router,  private auth: AuthService, private _location: Location) { }

  ngOnInit(): void {
  }


  onClickNewLessons() {

    this.router.navigate(['/list2']);
  }

  onClickMyLessons() {
    const beans = {schoolarchive: {date: this.getDateShow(), currentLessons: true}};
    this.router.navigate(['/archive'], {state: beans});
  }

  getDateShow() {
    let dd = new Date();
    // показываем с прошлого сентября
    if (dd.getMonth() < 8) {
      dd =  new Date(dd.getFullYear() - 1, 8, 1);
    } else {
      dd =  new Date(dd.getFullYear(), 8, 1);
    }
    return dd;
 }

 onClickExit() {
   this.auth.clearStorage();
   this.router.navigate(['/login']);
 }

 onBack() {

  console.log('this.router.url=', this.router.url);

  if (this.router.url === '/list5' || this.router.url === '/list5-v2') {
       // сохраняем объект в локальном хранилище, как следствие он откроется на редактирование
       this.auth.setSaveDocumentId(this.auth.getSaveDocumentId());
       this.auth.setSaveDocumentEdit(true);

  }

  this._location.back();
 }


}
