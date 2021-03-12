import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {GuideService} from "../services/guide.service";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {FormArray, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-find-transfer',
  templateUrl: './find-transfer.component.html',
  styleUrls: ['./find-transfer.component.css']
})
export class FindTransferComponent implements OnInit {

  lesson_id = '-1';
  listuser:  any[] = [];
  fio = '';
  UserInfo = {schoolLogin: '', bSchoolConnected: false, id_user_school: '', editor: 0};
  FindTransferForm: FormGroup;
  FioForm: FormGroup;

  constructor(private router: Router, private auth: AuthService, private gs: GuideService, private location: Location) {
    this.UserInfo = this.auth.getStorage();
    if (this.UserInfo.bSchoolConnected === false) {
      this.router.navigate(['/login']);
    }

    if (!this.auth.getViewPrintId()) {
      this.router.navigate(['/']);
    }

    this.lesson_id = this.auth.getViewPrintId();
    this.FioForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.FindTransferForm = new FormGroup({
      fSchoolNumber: new FormControl(),
      fFio: new FormControl(),
      fLogin: new FormControl()
    });
  }


  findFromSchool() {
    let sSchoolNumber = '';
    let sFio = '';
    let sLogin = '';
    if (this.FindTransferForm.controls.fSchoolNumber.value) {
      sSchoolNumber = this.FindTransferForm.controls.fSchoolNumber.value.trim()
    }
    if (this.FindTransferForm.controls.fFio.value) {
      sFio = this.FindTransferForm.controls.fFio.value.trim()
    }
    if (this.FindTransferForm.controls.fLogin.value) {
      sLogin = this.FindTransferForm.controls.fLogin.value.trim()
    }

    if (!sSchoolNumber && !sFio && !sLogin) {
      alert('Вы не ввели данных для поиска');
      return;
    }

    if (!sSchoolNumber) {
      alert('Вы не ввели учебное заведение');
      return;
    }

    this.auth.getUserFromSchool(sSchoolNumber, sFio, sLogin).subscribe( (resuser: any[]) => {

      for (let obj in this.FioForm.controls) {
        this.FioForm.removeControl(obj);
      }

      this.listuser = resuser;
      this.listuser.forEach( element => {
        this.FioForm.addControl('userFind' + element._id.toString(), new FormControl(''));
      });
    });
  }

  findUsers() {
      this.findFromSchool();
  }


  moveLesson() {
    const arrUser = [];
    // 1 шаг собираем номера пользователей
    this.listuser.forEach( element => {
      if (this.FioForm.controls['userFind' + element._id.toString()].value) {
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
      objCopy.objSummaryLesson.formControlDate[0] = new Date();
      arrResult.push(objCopy);
    });

    this.gs.setInsertManyLessons(arrResult).subscribe( res => {
      alert('Уроки переданы');
      this.router.navigate(['/archive']);
    }) ;
  }

}
