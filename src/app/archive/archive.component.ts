import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {GuideService} from '../services/guide.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  formArchive: FormGroup;
  UserInfo = {schoolLogin: '', bSchoolConnected: false, id_user_school: '', editor: 0};
  linsLessons: Array<any> = [];
  sTitle = '';

  constructor(private router: Router, private gs: GuideService, private auth: AuthService, actroute: ActivatedRoute) {

    this.formArchive = new FormGroup({
      uLessonObjectives: new FormControl(''),
      uLessonTopic: new FormControl(),
      uLesson: new FormControl(),
      uClass: new FormControl()
      });


    this.UserInfo = this.auth.getStorage();
    if (!this.UserInfo.bSchoolConnected) {
      this.router.navigate(['/login']);
    }

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
    this.showLessons();
  }


  showLessons() {

    let uLessonObjectives = this.formArchive.controls.uLessonObjectives.value;
    let uLessonTopic = this.formArchive.controls.uLessonTopic.value;
    let uLesson = this.formArchive.controls.uLesson.value;
    let uClass = this.formArchive.controls.uClass.value;

    if (!uLessonObjectives) {
      uLessonObjectives = 'nonestring';
    }

    if (!uLessonTopic) {
      uLessonTopic = 'nonestring';
    }

    if (!uLesson) {
      uLesson = 'nonestring';
    }

    if (!uClass) {
      uClass = 'nonestring';
    }

    console.log('uLessonObjectives=', uLessonObjectives, 'uLessonTopic =', uLessonTopic);

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
    this.gs.selectListLessons(this.UserInfo.id_user_school, schoolarchive,
                               uLessonObjectives, uLessonTopic,
                               uLesson, uClass).subscribe( (summaryRes: Array<any>) => {
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

  onClickViewing(lesson) {
    // сохраняем объект в локальном хранилище
    // this.auth.setSchoolLesson(lesson);
    this.auth.setViewPrintId(lesson._id);

    // переходим к странице
    if (this.itisTypeLessons2(lesson)) {
      this.router.navigate(['/viewer-v2']);
    } else {
      this.router.navigate(['/viewer']);
    }

    // this.router.navigate(['/viewer']);
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

  onClickMove(lesson) {
    // сохраняем объект в локальном хранилище
    this.auth.setViewPrintId(lesson._id);
    // переходим к странице
      this.router.navigate(['/lesson-transfer']);
  }


  onClickCopy(lesson) {
    if (confirm("Копировать урок?")) {
      this.gs.setCopyLesson(lesson._id).subscribe( value => {
        this.showLessons();
      });
    }
  }

  onClickDelete(lesson){
    if (confirm("Удалить урок?")) {
      this.gs.setDeleteLesson(lesson._id).subscribe( value => {
        this.showLessons();
      });
    }
  }


}
