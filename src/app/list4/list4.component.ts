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
import { forkJoin } from 'rxjs';
import {Location} from '@angular/common';

@Component({
  selector: 'app-list4',
  templateUrl: './list4.component.html',
  styleUrls: ['./list4.component.css']
})
export class List4Component implements OnInit {

  currentDate: Date;
  typeEdit = 'новый документ';
  edititing_id = '-1';

  UserInfo = {schoolLogin: '', bSchoolConnected: false, id_user_school: '', editor: 0};
  listLessonsname: any;
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
    dateFormat: 'd.m.Y'
  };

  constructor(private router: Router, private gs: GuideService, private auth: AuthService,
              private g7s: Guide7Service, private _location: Location) {

    this.UserInfo = this.auth.getStorage();
    if (!this.UserInfo.bSchoolConnected) {
      this.router.navigate(['/login']);
    }

    this.list4Form = new FormGroup({
      formControlDate: new FormControl(),
      lessonTopic: new FormControl(),
      fio: new FormControl(),
      fioteacherhome: new FormControl(),
      lessonObjectives: new FormControl(),
      lessonTasks: new FormControl()
    });

  }

  ngOnInit(): void {

    window.scroll(0,0);

    if (this.auth.getSaveDocumentEdit()) {
      this.typeEdit = 'редактирование документа';
    } else {
      this.typeEdit = 'новый документ';
    }


    setTimeout(() => {
      this.currentDate = new Date();
    }, 0);


    forkJoin([
              this.gs.selectCollection('lessonsName'),
              this.gs.selectCollection('classNameNumber'),
              this.gs.selectCollection('classNameLetter'),
              this.gs.selectCollection('classTypeLesson'),
              this.gs.selectCollection('classType2Lesson'),
              this.gs.selectCollection('classObjectiveLesson'),
              this.gs.selectCollection('classPersonalLesson'),
              this.gs.selectCollection('classEquipment'),
              this.gs.selectCollection('classMethod'),
              this.gs.selectCollection('classGroupMethod'),
              this.gs.selectGroupInnerMethod(),
              this.auth.getUserFromID(this.UserInfo.id_user_school)
    ]).subscribe(results => {

      this.listLessonsname = results[0];
      this.listClassNameNumber = results[1];
      this.listClassNameLetter = results[2];
      this.listTypeLesson = results[3];
      this.listType2Lesson = results[4];
      this.listObjectiveLesson = results[5];
      this.listPersonalLesson = results[6];
      this.listEquipment = results[7];
      this.listMethod = results[8];
      this.listGroupMethod = results[9];
      this.methodAggegateList = results[10];
      this.list4Form.controls.fio.setValue(results[11][0].fio);
      // если это редактирование урока, загружаем урок из базы
      this.loadLesson();
  });
}


loadLesson() {
  // если это редактирование урока, загружаем урок из базы
  if (this.auth.getSaveDocumentEdit()) {
    this.edititing_id = this.auth.getSaveDocumentId();
     this.gs.getLesson(this.edititing_id).subscribe( (lesson: []) => {
      if (lesson) {
        if (lesson.length > 0) {
          const lesson4 = (lesson as any[])[0].objSummaryLesson;
          this.loadDataForLesson(lesson4);
        }
    }
  });
 }
}

  loadDataForLesson(lesson4) {
    const documentEquipmentList: any[] =  lesson4.documentEquipmentList;

    documentEquipmentList.forEach( (element, ind) => {
        const documentEquipment = {id: element.id, title: element.title, delete: 0};
        const newIndex = this.documentEquipmentList.push(documentEquipment) - 1;
        this.list4Form.addControl('equipment' + newIndex.toString(), new FormControl(element.AdditionalMessage));
    });

    this.list4Form.controls.fioteacherhome.setValue(lesson4.fioteacherhome);
    this.list4Form.controls.lessonTopic.setValue(lesson4.lessonTopic);
    this.list4Form.controls.lessonObjectives.setValue(lesson4.lessonObjectives);
    if (lesson4.lessonTasks) {
      this.list4Form.controls.lessonTasks.setValue(lesson4.lessonTasks);
    }
    this.list4Form.controls.formControlDate.setValue(new Date(lesson4.formControlDate[0]));

    setTimeout(() => {
      this.currentDate = new Date(lesson4.formControlDate[0]);
    }, 0);
    this.documentClassNameNumber = lesson4.documentClassNameNumber;
    this.documentClassNameLetter = lesson4.documentClassNameLetter;
    this.documentLessons = lesson4.documentLessons;
    this.documentTypeLesson = lesson4.documentTypeLesson;
    this.documentType2Lesson = lesson4.documentType2Lesson;

    lesson4.documentObjectiveLessonList.forEach( (element, ind) => {
      const documentObjective = {id: element.id, title: element.title, delete: 0};
      const newIndex = this.documentObjectiveLessonList.push(documentObjective) - 1;
      this.list4Form.addControl('subjectResults' + newIndex.toString(), new FormControl(element.AdditionalMessage));
    });

    lesson4.documentPersonalLessonList.forEach( (element, ind) => {
      const documentPersonal = {id: element.id, title: element.title, delete: 0};
      const newIndex = this.documentPersonalLessonList.push(documentPersonal) - 1;
      this.list4Form.addControl('personalResults' + newIndex.toString(), new FormControl(element.AdditionalMessage));
    });

  }

  LoadCollection(sName, sResult: any) {
    this.gs.selectCollection(sName).subscribe(guideList => {
      this[sResult] = guideList;
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

    /*
    const res1 = {message: 'guide7', i: 1};
    this.g7s.sendMessage(res1);
    console.log('methodResultat1=', this.methodResultat1);

    const res2 = {message: 'guide7', i: 2};
    this.g7s.sendMessage(res2);
    console.log('methodResultat2=', this.methodResultat2);
   */


    /* 1 */
    let fioteacherhome = '';
    if (this.list4Form.controls.fioteacherhome.value) {
      fioteacherhome = this.list4Form.controls.fioteacherhome.value.toString().trim();
    }
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


    let lessonTasks = '';
    if (this.list4Form.controls.lessonTasks.value) {
      lessonTasks = this.list4Form.controls.lessonTasks.value.toString().trim();
    }

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



    const summaryLesson = {
                            LESSON: 1,
                            formControlDate: this.list4Form.controls.formControlDate.value,
                            fioteacherhome: fioteacherhome,
                            lessonTopic: lessonTopic,
                            lessonObjectives: lessonObjectives,
                            lessonTasks: lessonTasks,
                            documentClassNameNumber: this.documentClassNameNumber,
                            documentClassNameLetter: this.documentClassNameLetter,
                            documentLessons: this.documentLessons,
                            documentTypeLesson: this.documentTypeLesson,
                            documentType2Lesson: this.documentType2Lesson,
                            documentObjectiveLessonList: moveDocumentObjectiveLessonList,
                            documentPersonalLessonList: moveDocumentPersonalLessonList,
                            documentEquipmentList: moveDocumentEquipmentList,
//                            GuideMultiOne_method1:  {
//                              documentGroupMethod: this.documentGroupMethod,
//                              documentMethod: this.documentMethod},
//                            subjectResultsText: this.list4Form.controls.subjectResults.value,
//                            personalResultsText: this.list4Form.controls.personalResults.value,
//                            equipmentText: this.list4Form.controls.equipment.value
                           } ;



    if (this.auth.getSaveDocumentEdit()) {
      this.gs.updateSummaryLessonList4(this.edititing_id, summaryLesson).subscribe( resultat => {
        this.auth.setSaveDocumentId(this.edititing_id);
        this.router.navigate(['/list5']);
      });
    } else {
      this.gs.insertSummaryLesson(this.UserInfo.id_user_school, summaryLesson).subscribe( (suumaryRes: any) => {
        this.auth.setSaveDocumentId(suumaryRes.insertedId);
        this.router.navigate(['/list5']);
      });
    }

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
  this._location.back();
 }

 }
