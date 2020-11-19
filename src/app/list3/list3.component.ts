import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-list3',
  templateUrl: './list3.component.html',
  styleUrls: ['./list3.component.css']
})
export class List3Component implements OnInit {

  UserInfo = {schoolLogin: '', bSchoolConnected: false, id_user_school: '', editor: 0};

  constructor(private router: Router, private auth: AuthService,) {
    this.UserInfo = this.auth.getStorage();
    if (!this.UserInfo.bSchoolConnected) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
  }

  onClick() {

    console.log(this.getDateShow());

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

  onClickMyLessons() {
    const beans = {schoolarchive: {date: this.getDateShow(), currentLessons: true}};
    this.router.navigate(['/archive'], {state: beans});
  }

  onClickArchive() {
    const beans = {schoolarchive: {date: this.getDateShow(), currentLessons: false}};
    this.router.navigate(['/archive'], {state: beans});

  }

  onClickNewLessons() {
    this.router.navigate(['/list2']);
  }

}
