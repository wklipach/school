import { Component, OnInit } from '@angular/core';
import {
  lessonsName, classNameLetter, classNameNumber, classTypeLesson, classType2Lesson,
  classObjectiveLesson, classPersonalLesson, classEquipment, classMethod, classGroupMethod
} from '../class/academicSubject';
import {GuideService} from '../services/guide.service';
import {FormControl, FormGroup} from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import Russian from 'flatpickr/dist/l10n/ru.js';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list4',
  templateUrl: './list4.component.html',
  styleUrls: ['./list4.component.css']
})
export class List4Component implements OnInit {

  UserInfo = {schoolLogin: '', bSchoolConnected: false, id_user_school: '', editor: 0};
  listLessons: any;
  listTypeLesson: any;
  listType2Lesson: any;
  listClassNameNumber: any;
  listClassNameLetter: any;
  listObjectiveLesson: any;
  listPersonalLesson: any;
  listEquipment: any;
  listMethod: any;
  listGroupMethod: any;
  methodAggegateList: any;

  documentClassNameNumber = {id: -1, title: '--'};
  documentClassNameLetter = {id: -1, title: '--'};
  documentLessons = {id: -1, title: ''};
  documentTypeLesson = {id: -1, title: ''};
  documentType2Lesson = {id: -1, title: ''};
  documentObjectiveLesson = {id: -1, title: ''};
  documentPersonalLesson = {id: -1, title: ''};
  documentEquipment = {id: -1, title: ''};
  documentGroupMethod = {id: -1, id_group: -1, title: ''};
  documentMethod = {id: -1, id_group: -1, title: ''};

  list4Form: FormGroup;
  vDatePickOptions: FlatpickrOptions = {
    locale: Russian.ru,
    dateFormat: 'd.m.Y',
    defaultDate: new Date()
  };

  constructor(private router: Router, private gs: GuideService, private auth: AuthService) {

    this.UserInfo = this.auth.getStorage();
    this.list4Form = new FormGroup({
      formControlDate: new FormControl(),
      lessonTopic: new FormControl(),
      fio: new FormControl(),
      fioteacherhome: new FormControl(),
      lessonObjectives: new FormControl(),
      subjectResults: new FormControl(),
      personalResults: new FormControl(),
      equipment: new FormControl()
    });

  }

  ngOnInit(): void {
    this.createOrLoadCollection('lessonsName', lessonsName, 'listLessons');
    this.createOrLoadCollection('classNameNumber', classNameNumber, 'listClassNameNumber');
    this.createOrLoadCollection('classNameLetter', classNameLetter, 'listClassNameLetter');
    this.createOrLoadCollection('classTypeLesson', classTypeLesson, 'listTypeLesson');
    this.createOrLoadCollection('classType2Lesson', classType2Lesson, 'listType2Lesson');
    this.createOrLoadCollection('classObjectiveLesson', classObjectiveLesson, 'listObjectiveLesson');

    this.createOrLoadCollection('classPersonalLesson', classPersonalLesson, 'listPersonalLesson');
    this.createOrLoadCollection('classEquipment', classEquipment, 'listEquipment');

    this.createOrLoadCollection('classMethod', classMethod, 'listMethod');
    this.createOrLoadCollection('classGroupMethod', classGroupMethod, 'listGroupMethod');
    this.loadMethodCollection();

    this.loadCurrentTeacher();
  }

  createOrLoadCollection(sName, objCollection, sResult: any) {
    this.gs.checkCollection(sName).subscribe(value => {
      if (value === false) {
        this.gs.insertGuideLessonsName(sName, objCollection).subscribe(guideList => {
          this[sResult] = guideList;
        });
      } else {
        this.gs.selectCollection(sName).subscribe(guideList => {
          this[sResult] = guideList;
        });
      }
    });
  }

  loadMethodCollection() {
    this.gs.selectGroupInnerMethod().subscribe(methodList => {
      this.methodAggegateList = methodList;
      console.log(this.methodAggegateList);
    });
  }

  loadCurrentTeacher() {
    this.auth.getUserFromID(this.UserInfo.id_user_school).subscribe(teacher => {
      console.log(teacher);
      this.list4Form.controls.fio.setValue(teacher[0].fio);
    });
  }

  onTestRes() {
    console.log(this);
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
    this.documentLessons.id = curValue.id;
    this.documentLessons.title = curValue.title;
  }

  onTypeLesson(curValue) {
    this.documentTypeLesson.id = curValue.id;
    this.documentTypeLesson.title = curValue.title;
  }

  onType2Lesson(curValue) {
    this.documentType2Lesson.id = curValue.id;
    this.documentType2Lesson.title = curValue.title;
  }

  onObjectiveLesson(curValue) {
    this.documentObjectiveLesson.id = curValue.id;
    this.documentObjectiveLesson.title = curValue.title;
  }


  onPersonalLesson(curValue) {
    this.documentPersonalLesson.id = curValue.id;
    this.documentPersonalLesson.title = curValue.title;
  }

  onEquipment(curValue) {
    this.documentEquipment.id = curValue.id;
    this.documentEquipment.title = curValue.title;
  }

  onCurGroupMethod(curGroupValue): void {
    this.documentGroupMethod.id = curGroupValue.id;
    this.documentGroupMethod.id_group = curGroupValue.id_group;
    this.documentGroupMethod.title = curGroupValue.title;
  }

  onMethod(curMethodValue) {
    this.documentMethod.id = curMethodValue.id;
    this.documentMethod.id_group = curMethodValue.id_group;
    this.documentMethod.title = curMethodValue.title;
  }

  onSaveRes() {


    const fioteacherhome = this.list4Form.controls.fioteacherhome.value.toString().trim();
    if (!fioteacherhome) {
      alert('Укажите имя обучающегося');
      return;
    }

    const lessonTopic = this.list4Form.controls.lessonTopic.value.toString().trim();
    if (!lessonTopic) {
      alert('Укажите тему урока');
      return;
    }

    const lessonObjectives = this.list4Form.controls.lessonObjectives.value.toString().trim();
    if (!lessonObjectives) {
      alert('Укажите цель урока');
      return;
    }

    if (!this.list4Form.controls.formControlDate.value) {
      this.list4Form.controls.formControlDate.setValue(new Date());
    }

    if (!this.list4Form.controls.subjectResults.value) {
      this.list4Form.controls.subjectResults.setValue('');
    }

    if (!this.list4Form.controls.personalResults.value) {
      this.list4Form.controls.personalResults.setValue('');
    }

    if (!this.list4Form.controls.equipment.value) {
      this.list4Form.controls.equipment.setValue('');
    }

    console.log(this.list4Form.controls.formControlDate);

    const summaryLesson = { formControlDate: this.list4Form.controls.formControlDate.value,
                            fioteacherhome: fioteacherhome,
                            lessonTopic: lessonTopic,
                            lessonObjectives: lessonObjectives,
                            documentClassNameNumber: this.documentClassNameNumber,
                            documentClassNameLetter: this.documentClassNameLetter,
                            documentLessons: this.documentLessons,
                            documentTypeLesson: this.documentTypeLesson,
                            documentType2Lesson: this.documentType2Lesson,
                            documentObjectiveLesson: this.documentObjectiveLesson,
                            documentPersonalLesson: this.documentPersonalLesson,
                            documentEquipment: this.documentEquipment,
                            documentGroupMethod: this.documentGroupMethod,
                            documentMethod: this.documentMethod,
                            subjectResultsText: this.list4Form.controls.subjectResults.value,
                            personalResultsText: this.list4Form.controls.personalResults.value,
                            equipmentText: this.list4Form.controls.equipment.value
                           } ;

    this.gs.insertSummaryLesson(this.UserInfo.id_user_school, summaryLesson).subscribe(suumaryRes => {
      this.router.navigate(['/archive']);
    });
  }

  onClickDeleteEquipment() {
    this.list4Form.controls.equipment.setValue('');
  }

  onClickDeletePersonalResults() {
    this.list4Form.controls.personalResults.setValue('');
  }

  onClickDeleteSubjectResults() {
    this.list4Form.controls.subjectResults.setValue('');
  }
}
