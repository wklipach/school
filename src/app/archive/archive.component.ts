import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  sTitle = '';

  constructor(private router: Router, private gs: GuideService, private auth: AuthService, actroute: ActivatedRoute) {

    const dmove = router.getCurrentNavigation().extras.state;
    if (dmove && dmove.schoolarchive) {
     this.auth.setSchoolArchive(dmove.schoolarchive);
    }

  }

  ngOnInit(): void {

    this.UserInfo = this.auth.getStorage();

    if (!this.UserInfo.id_user_school) {
      this.router.navigate(['/login']);
    }

    let schoolarchive = this.auth.getSchoolArchive();

    if (!schoolarchive) {
      schoolarchive = {schoolarchive: {date: this.getDateShow(), currentLessons: true}};
    }

    if (schoolarchive.currentLessons === true) {
      this.sTitle = 'МОИ УРОКИ';
    } else {
      this.sTitle = 'АРХИВ УРОКОВ';
    }

    // получаем список уроков
    this.gs.selectListLessons(this.UserInfo.id_user_school, schoolarchive).subscribe( (summaryRes: Array<any>) => {
      this.linsLessons = summaryRes;
    });

  }

  getDateShow() {
    let dd = new Date();
    // показываем с прошлого сентября
    if (dd.getMonth() < 8) {
      dd =  new Date(dd.getFullYear() - 1, 8, 1);
    } else {
      dd =  new Date(dd.getFullYear(), 8, 1);
    }
    return dd.toISOString();
  }

  onClickViewing(lesson: any) {
    // сохраняем объект в локальном хранилище
     this.auth.setSchoolLesson(lesson);
    // переходим к странице
    this.router.navigate(['/viewer']);
  }

  onClickEdit(lesson: any) {
    // сохраняем объект в локальном хранилище
    this.auth.setSaveDocumentId(lesson._id);
    this.auth.setSaveDocumentEdit(true);

    if (this.itisTypeLessons2(lesson)) {
       this.router.navigate(['/list4-v2']);
    } else {
      this.router.navigate(['/list4']);
    }

  }

  itisTypeLessons2(lesson: any) {
    if (lesson.objSummaryLesson.LESSON) {
      if (lesson.objSummaryLesson.LESSON === 2) {
          return true;
      } else { return false; }
    } else {return false; }
  }

}
