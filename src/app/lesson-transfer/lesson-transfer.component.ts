import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import { GuideService } from '../services/guide.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lesson-transfer',
  templateUrl: './lesson-transfer.component.html',
  styleUrls: ['./lesson-transfer.component.css']
})
export class LessonTransferComponent implements OnInit {

  lesson_id = '-1';
  listuser:  any[] = [];
  fio = '';
  UserInfo = {schoolLogin: '', bSchoolConnected: false, id_user_school: '', editor: 0};
  LessonTransferForm: FormGroup;


  constructor(private router: Router, private auth: AuthService, private gs: GuideService, private location: Location) {
    this.UserInfo = this.auth.getStorage();
    if (this.UserInfo.bSchoolConnected === false) {
      this.router.navigate(['/login']);
    }

    if (!this.auth.getViewPrintId()) {
      this.router.navigate(['/']);
    }

    this.lesson_id = this.auth.getViewPrintId();
    this.LessonTransferForm = new FormGroup({});
  }

  ngOnInit(): void {

    this.auth.getUserFromID(this.UserInfo.id_user_school).subscribe( user => {
      this.fio = user[0].fio;
    });

    this.auth.getUserWithoutID(this.UserInfo.id_user_school).subscribe( (resuser: any[]) => {
      this.listuser = resuser;
      // listuser
      this.listuser.forEach( element => {
        this.LessonTransferForm.addControl('userCheck' + element._id.toString(), new FormControl(''));
      });
    });

  }

  moveLesson() {
    const arrUser = [];
    // 1 шаг собираем номера пользователей
    this.listuser.forEach( element => {
      if (this.LessonTransferForm.controls['userCheck' + element._id.toString()].value) {
        // console.log(element._id.toString());
        arrUser.push(element._id);
      }
    });
    // 2 шаг поллучаем урок
    this.gs.getLesson(this.lesson_id).subscribe( lesson => {
          console.log('lesson', lesson);
          if (lesson) {
            if (lesson[0]) {
              this.insertLesson(lesson[0], arrUser);
            }
          }
    });

  }

  insertLesson(lesson: any, arrUser: any[]) {
     const newLesson: any = {};
     const arrResult: any = [];

     newLesson.id_user = '';
     if (lesson.objSummaryLesson) {
        newLesson.objSummaryLesson = lesson.objSummaryLesson;
     }

     newLesson.objSummaryLesson.lessonTopic = 'от ' + this.fio + ': ' + newLesson.objSummaryLesson.lessonTopic;

     if (lesson.objSummaryLesson2) {
      newLesson.objSummaryLesson2  = lesson.objSummaryLesson2;
    }

    arrUser.forEach( (user, i) => {
      const objCopy = Object.assign({}, newLesson);
      objCopy.id_user = user;
      arrResult.push(objCopy);
    });

    this.gs.setInsertManyLessons(arrResult).subscribe( res => {
      alert('Уроки переданы');
      this.location.back();

    }) ;


  }
}
