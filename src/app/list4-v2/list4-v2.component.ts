import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Guide7Service} from '../components/guide7/guide7.service';
import {GuideService} from '../services/guide.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import Russian from 'flatpickr/dist/l10n/ru.js';

@Component({
  selector: 'app-list4-v2',
  templateUrl: './list4-v2.component.html',
  styleUrls: ['./list4-v2.component.css']
})
export class List4V2Component implements OnInit {

  list4v2Form: FormGroup;
  vDatePickOptions: FlatpickrOptions = {
    locale: Russian.ru,
    dateFormat: 'd.m.Y',
    defaultDate: new Date()
  };

  guide2linesResultat1 = [];
  UserInfo = {schoolLogin: '', bSchoolConnected: false, id_user_school: '', editor: 0};

  listLessons2: any;
  documentLessons2 = {id: -1, title: ''};
  listTypeLesson: any;
  documentTypeLesson = {id: -1, title: ''};
  listType2Lesson: any;
  documentType2Lesson = {id: -1, title: ''};
  listEquipment: any;
  documentEquipmentList = [];

  Guide7Resultat1 = [];
  listClassNameNumber: any;
  documentClassNameNumber = {id: -1, title: '--'};
  listClassNameLetter: any;
  documentClassNameLetter = {id: -1, title: '--'};


  constructor(private router: Router, private gs: GuideService,
              private auth: AuthService, private g7s: Guide7Service) {
    this.UserInfo = this.auth.getStorage();
    this.list4v2Form = new FormGroup({
      formControlDate: new FormControl(),
      fio: new FormControl(),
      fioteacherhome: new FormControl(),
      lessonTopic: new FormControl(),
      lessonObjectives: new FormControl(),
      subjectResults: new FormControl(),
      personalResults: new FormControl(),
      equipment: new FormControl()
    });

  }

  ngOnInit(): void {
    this.LoadCollection('classNameNumber',  'listClassNameNumber');
    this.LoadCollection('lessonsName2',  'listLessons2');
    this.LoadCollection('classTypeLesson',  'listTypeLesson');
    this.LoadCollection('classType2Lesson',  'listType2Lesson');
    this.LoadCollection('classEquipment', 'listEquipment');
    this.LoadCollection('classNameLetter',  'listClassNameLetter');

    this.loadCurrentTeacher();

  }

  loadCurrentTeacher() {
    this.auth.getUserFromID(this.UserInfo.id_user_school).subscribe(teacher => {
      this.list4v2Form.controls.fio.setValue(teacher[0].fio);
    });
  }

  LoadCollection(sName, sResult: any) {
    this.gs.selectCollection(sName).subscribe(guideList => {
      this[sResult] = guideList;
    });
  }

  onResElem2lines(event, i) {
    if (i === 1) {
      this.guide2linesResultat1 = event;
    }
 }

  sentCurrentMessage(guideName: string, iNumber: number) {
    const res = {message: guideName, i: iNumber};
    this.g7s.sendMessage(res);
  }

  onEquipment(curValue) {
    const documentEquipment = {id: curValue.id, title: curValue.title, delete: 0};
    const newIndex = this.documentEquipmentList.push(documentEquipment) - 1;
    this.list4v2Form.addControl('equipment' + newIndex.toString(), new FormControl(''));
  }

  onClickDeleteEquipment(DOL) {
    DOL.delete = 1;
  }

  onClickDeletePersonalResults(DOL) {
    DOL.delete = 1;
  }

  onClickDeleteSubjectResults(DOL) {
    DOL.delete = 1;
  }

  onResGuide7(event: [], i: number) {
    if (i === 1) {
      this.Guide7Resultat1 = event;
    }
  }

  onClassNameNumber(curValue) {
    this.documentClassNameNumber.id = curValue.id;
    this.documentClassNameNumber.title = curValue.title;
  }

  onClassNameLetter(curValue) {
    this.documentClassNameLetter.id = curValue.id;
    this.documentClassNameLetter.title = curValue.title;
  }

  onLessons(curValue) {
    this.documentLessons2.id = curValue.id;
    this.documentLessons2.title = curValue.title;
  }

  onTypeLesson(curValue) {
    this.documentTypeLesson.id = curValue.id;
    this.documentTypeLesson.title = curValue.title;
  }

  onType2Lesson(curValue) {
    this.documentType2Lesson.id = curValue.id;
    this.documentType2Lesson.title = curValue.title;
  }

  addStudentClick(i: number) {
    this.sentCurrentMessage('addStudentElem2lines', i);
  }


    onSaveLis4v2() {
    const objResult: {[k: string]: any} = {};
    this.sentCurrentMessage('elem2lines', 1);
    objResult.guide2linesResultat1 = this.guide2linesResultat1;
    console.log(objResult);
  }


}
