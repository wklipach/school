import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {GuideService} from '../services/guide.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  UserInfo = {schoolLogin: '', bSchoolConnected: false, id_user_school: '', editor: 0};
  linsLessons: Array<any> = [];

  constructor(private router: Router, private gs: GuideService, private auth: AuthService) { }

  ngOnInit(): void {
    this.UserInfo = this.auth.getStorage();

    if (!this.UserInfo.id_user_school) {
      this.router.navigate(['/login']);
    }

    // получаем список уроков
    this.gs.selectListLessons(this.UserInfo.id_user_school).subscribe( (summaryRes: Array<any>) => {
      this.linsLessons = summaryRes;
    });

  }

  onClickViewing(lesson: any) {
    // сохраняем объект в локальном хранилище
     this.auth.setSchoolLesson(lesson);
    // переходим к странице
    this.router.navigate(['/viewer']);
  }

}
