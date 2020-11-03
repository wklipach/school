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
import {Guide7Service} from '../components/guide7/guide7.service';

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

  methodResultat1 = [];
  methodResultat2 = [];

  documentClassNameNumber = {id: -1, title: '--'};
  documentClassNameLetter = {id: -1, title: '--'};
  documentLessons = {id: -1, title: ''};
  documentTypeLesson = {id: -1, title: ''};
  documentType2Lesson = {id: -1, title: ''};

  documentObjectiveLessonList = [];
  documentPersonalLessonList = [];
  documentEquipmentList = [];
  documentGroupMethod = {id: -1, id_group: -1, title: ''};
  documentMethod = {id: -1, id_group: -1, title: ''};

  list4Form: FormGroup;
  vDatePickOptions: FlatpickrOptions = {
    locale: Russian.ru,
    dateFormat: 'd.m.Y',
    defaultDate: new Date()
  };

  constructor(private router: Router, private gs: GuideService, private auth: AuthService, private g7s: Guide7Service) {

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
    });
  }

  loadCurrentTeacher() {
    this.auth.getUserFromID(this.UserInfo.id_user_school).subscribe(teacher => {
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
    const documentObjectiveLesson = {id: curValue.id, title: curValue.title, delete: 0};
    const newIndex = this.documentObjectiveLessonList.push(documentObjectiveLesson) - 1;
    this.list4Form.addControl('subjectResults' + newIndex.toString(), new FormControl(''));
  }


  onPersonalLesson(curValue) {
    const documentPersonalLesson = {id: curValue.id, title: curValue.title, delete: 0};
    const newIndex = this.documentPersonalLessonList.push(documentPersonalLesson) - 1;
    this.list4Form.addControl('personalResults' + newIndex.toString(), new FormControl(''));
  }

  onEquipment(curValue) {
    const documentEquipment = {id: curValue.id, title: curValue.title, delete: 0};
    const newIndex = this.documentEquipmentList.push(documentEquipment) - 1;
    this.list4Form.addControl('equipment' + newIndex.toString(), new FormControl(''));
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

    const res1 = {message: 'guide7', i: 1};
    this.g7s.sendMessage(res1);
    console.log('methodResultat1=', this.methodResultat1);

    const res2 = {message: 'guide7', i: 2};
    this.g7s.sendMessage(res2);
    console.log('methodResultat2=', this.methodResultat2);


    return;


    /* 1 */
    if (!this.list4Form.controls.fioteacherhome.value) {
      alert('Укажите имя обучающегося');
      return;
    }
    const fioteacherhome = this.list4Form.controls.fioteacherhome.value.toString().trim();
    /* end 1 */

    /* 2 */
    if (!this.list4Form.controls.lessonTopic.value) {
      alert('Укажите тему урока');
      return;
    }
    const lessonTopic = this.list4Form.controls.lessonTopic.value.toString().trim();
    /* end 2 */

    /* 3 */
    if (!this.list4Form.controls.lessonObjectives.value) {
      alert('Укажите цель урока');
      return;
    }
    const lessonObjectives = this.list4Form.controls.lessonObjectives.value.toString().trim();
    /* end 3 */


    // загружаем коллекцию documentObjectiveLessonList
    this.loadInfoFromMultiLevelGuide('subjectResults', this.documentObjectiveLessonList);
    // формируем коллекцию для записи без удаженных элементов
    const moveDocumentObjectiveLessonList = this.deleteInfoFromMultiLevelGuide(this.documentObjectiveLessonList);

    // загружаем коллекцию documentObjectiveLessonList
    this.loadInfoFromMultiLevelGuide('personalResults', this.documentPersonalLessonList);
    // формируем коллекцию для записи без удаженных элементов
    const moveDocumentPersonalLessonList = this.deleteInfoFromMultiLevelGuide(this.documentPersonalLessonList);

    // загружаем коллекцию documentEquipmentList
    this.loadInfoFromMultiLevelGuide('equipment', this.documentEquipmentList);
    // формируем коллекцию для записи без удаженных элементов
    const moveDocumentEquipmentList = this.deleteInfoFromMultiLevelGuide(this.documentEquipmentList);


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


    const summaryLesson = { formControlDate: this.list4Form.controls.formControlDate.value,
                            fioteacherhome: fioteacherhome,
                            lessonTopic: lessonTopic,
                            lessonObjectives: lessonObjectives,
                            documentClassNameNumber: this.documentClassNameNumber,
                            documentClassNameLetter: this.documentClassNameLetter,
                            documentLessons: this.documentLessons,
                            documentTypeLesson: this.documentTypeLesson,
                            documentType2Lesson: this.documentType2Lesson,
                            documentObjectiveLessonList: moveDocumentObjectiveLessonList,
                            documentPersonalLessonList: moveDocumentPersonalLessonList,
                            documentEquipmentList: moveDocumentEquipmentList,
                            GuideMultiOne_method1:  {
                              documentGroupMethod: this.documentGroupMethod,
                              documentMethod: this.documentMethod},
                            subjectResultsText: this.list4Form.controls.subjectResults.value,
                            personalResultsText: this.list4Form.controls.personalResults.value,
                            equipmentText: this.list4Form.controls.equipment.value
                           } ;

    this.gs.insertSummaryLesson(this.UserInfo.id_user_school, summaryLesson).subscribe(suumaryRes => {
      this.router.navigate(['/list5']);
    });
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

  loadInfoFromMultiLevelGuide(sName: string, arrayCollection: any[]) {
    for (let i = 0; i < arrayCollection.length; i++) {
      let sAdditionalMessage = '';
      if (this.list4Form.controls[sName + i.toString()].value) {
        sAdditionalMessage = this.list4Form.controls[sName + i.toString()].value.trim();
      }
      arrayCollection[i].AdditionalMessage = sAdditionalMessage;
    }
  }

  deleteInfoFromMultiLevelGuide(arrayCollection: any[]) {
    let resultCollection = arrayCollection.map(x => Object.assign({}, x));
    resultCollection = resultCollection.filter(obj => obj.delete === 0);
    return resultCollection;
  }


  onResGuide7(event, i) {

    if (i === 1) {
      this.methodResultat1 = event;
    }

    if (i === 2) {
      this.methodResultat2 = event;
    }

  }
}
