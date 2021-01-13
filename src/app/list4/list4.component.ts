import { Component, OnInit } from '@angular/core';
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

  listClassEducationalTasksV1: any;
  documentClassEducationalTasks1 = {id: -1, title: '--'};
  documentClassEducationalTasks2 = {id: -1, title: '--'};
  documentClassEducationalTasks3 = {id: -1, title: '--'};

  listClassCorrectionalTasksV1: any;
  documentClassCorrectionalTasks1 = {id: -1, title: '--'};
  documentClassCorrectionalTasks2 = {id: -1, title: '--'};
  documentClassCorrectionalTasks3 = {id: -1, title: '--'};

  listClassRaisetionalTasksV1: any;
  documentClassRaisetionalTasks1 = {id: -1, title: '--'};
  documentClassRaisetionalTasks2 = {id: -1, title: '--'};
  documentClassRaisetionalTasks3 = {id: -1, title: '--'};

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
      lessonTopic: new FormControl(''),
      fio: new FormControl(),
      fioteacherhome: new FormControl(''),
      lessonObjectives: new FormControl(''),
      lessonTasks: new FormControl(''),
      textEducationalTasks1: new FormControl(''),
      textEducationalTasks2: new FormControl(''),
      textEducationalTasks3: new FormControl(''),
      textCorrectionalTasks1: new FormControl(''),
      textCorrectionalTasks2: new FormControl(''),
      textCorrectionalTasks3: new FormControl(''),
      textRaisetionalTasks1: new FormControl(''),
      textRaisetionalTasks2: new FormControl(''),
      textRaisetionalTasks3: new FormControl('')
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
              this.auth.getUserFromID(this.UserInfo.id_user_school),
              this.gs.selectCollection('classEducationalTasksV1'),
              this.gs.selectCollection('classCorrectionalTasksV1'),
              this.gs.selectCollection('classRaisetionalTasksV1')
    ]).subscribe(results => {

      console.log(results[0]);
      this.listLessonsname = Array<any>(results[0])[0].sort( (a,b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1) );
      this.listClassNameNumber = Array<any>(results[1])[0].sort( (a,b) => (a.title < b.title ? -1 : 1) );
      this.listClassNameLetter = Array<any>(results[2])[0].sort( (a,b) => (a.title < b.title ? -1 : 1) );
      this.listTypeLesson = Array<any>(results[3])[0].sort( (a,b) => (a.title < b.title ? -1 : 1) );
      this.listType2Lesson = Array<any>(results[4])[0].sort( (a,b) => (a.title < b.title ? -1 : 1) );
      this.listObjectiveLesson = Array<any>(results[5])[0].sort( (a,b) => (a.title < b.title ? -1 : 1) );
      this.listPersonalLesson = Array<any>(results[6])[0].sort( (a,b) => (a.title < b.title ? -1 : 1) );
      this.listEquipment = Array<any>(results[7])[0].sort( (a,b) => (a.title < b.title ? -1 : 1) );
      this.listMethod = Array<any>(results[8])[0].sort( (a,b) => (a.title < b.title ? -1 : 1) );
      this.listGroupMethod = Array<any>(results[9])[0].sort( (a,b) => (a.title < b.title ? -1 : 1) );
      this.methodAggegateList = Array<any>(results[10])[0].sort( (a,b) => (a.title < b.title ? -1 : 1) );
      this.list4Form.controls.fio.setValue(results[11][0].fio);

      this.listClassEducationalTasksV1 = Array<any>(results[12])[0].sort((a, b) =>
                                    (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1) );

      this.listClassCorrectionalTasksV1 = Array<any>(results[13])[0].sort((a, b) =>
                                    (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1) );

      this.listClassRaisetionalTasksV1 = Array<any>(results[14])[0].sort((a, b) =>
                                    (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1) );


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


    if (lesson4.EducationalTasks1) {
      this.documentClassEducationalTasks1.id = lesson4.EducationalTasks1.id;
      if (lesson4.EducationalTasks1.id > 0) {
        this.documentClassEducationalTasks1.title =
            this.listClassEducationalTasksV1.find( value => value.id === lesson4.EducationalTasks1.id).title;
      }
      this.list4Form.controls.textEducationalTasks1.setValue(lesson4.EducationalTasks1.text);
    }

    if (lesson4.CorrectionalTasks1) {
      this.documentClassCorrectionalTasks1.id = lesson4.CorrectionalTasks1.id;
      if (lesson4.CorrectionalTasks1.id > 0) {
        this.documentClassCorrectionalTasks1.title = 
           this.listClassCorrectionalTasksV1.find( value => value.id === lesson4.CorrectionalTasks1.id).title;
      }
      this.list4Form.controls.textCorrectionalTasks1.setValue(lesson4.CorrectionalTasks1.text);
    }

    if (lesson4.RaisetionalTasks1) {
      this.documentClassRaisetionalTasks1.id = lesson4.RaisetionalTasks1.id;
      if (lesson4.RaisetionalTasks1.id > 0) {
        this.documentClassRaisetionalTasks1.title =
         this.listClassRaisetionalTasksV1.find( value => value.id === lesson4.RaisetionalTasks1.id).title;
      }
      this.list4Form.controls.textRaisetionalTasks1.setValue(lesson4.RaisetionalTasks1.text);
    }

    if (lesson4.EducationalTasks2) {
      this.documentClassEducationalTasks2.id = lesson4.EducationalTasks2.id;
      if (lesson4.EducationalTasks2.id > 0) {
              this.documentClassEducationalTasks2.title =
                  this.listClassEducationalTasksV1.find( value => value.id === lesson4.EducationalTasks2.id).title;
      }
      this.list4Form.controls.textEducationalTasks2.setValue(lesson4.EducationalTasks2.text);
    }

    if (lesson4.CorrectionalTasks2) {
      this.documentClassCorrectionalTasks2.id = lesson4.CorrectionalTasks2.id;
      if (lesson4.CorrectionalTasks2.id > 0) {
        this.documentClassCorrectionalTasks2.title =
                 this.listClassCorrectionalTasksV1.find(value => value.id === lesson4.CorrectionalTasks2.id).title;
      }
      this.list4Form.controls.textCorrectionalTasks2.setValue(lesson4.CorrectionalTasks2.text);
    }

    if (lesson4.RaisetionalTasks2) {
      this.documentClassRaisetionalTasks2.id = lesson4.RaisetionalTasks2.id;
      if (lesson4.RaisetionalTasks2.id > 0) {
        this.documentClassRaisetionalTasks2.title =
            this.listClassRaisetionalTasksV1.find( value => value.id === lesson4.RaisetionalTasks2.id).title;
      }
      this.list4Form.controls.textRaisetionalTasks2.setValue(lesson4.RaisetionalTasks2.text);
    }

    if (lesson4.EducationalTasks3) {
      this.documentClassEducationalTasks3.id = lesson4.EducationalTasks3.id;
      if (lesson4.EducationalTasks3.id > 0) {
         this.documentClassEducationalTasks3.title =
                   this.listClassEducationalTasksV1.find( value => value.id === lesson4.EducationalTasks3.id).title;
      }
      this.list4Form.controls.textEducationalTasks3.setValue(lesson4.EducationalTasks3.text);
    }

    if (lesson4.CorrectionalTasks3) {
      this.documentClassCorrectionalTasks3.id = lesson4.CorrectionalTasks3.id;
      if (lesson4.CorrectionalTasks3.id > 0) {
        this.documentClassCorrectionalTasks3.title =
               this.listClassCorrectionalTasksV1.find( value => value.id === lesson4.CorrectionalTasks3.id).title;
      }
      this.list4Form.controls.textCorrectionalTasks3.setValue(lesson4.CorrectionalTasks3.text);
    }

    if (lesson4.RaisetionalTasks3) {
      this.documentClassRaisetionalTasks3.id = lesson4.RaisetionalTasks3.id;
      if (lesson4.RaisetionalTasks3.id > 0) {
       this.documentClassRaisetionalTasks3.title =
               this.listClassRaisetionalTasksV1.find( value => value.id === lesson4.RaisetionalTasks3.id).title;
      }
      this.list4Form.controls.textRaisetionalTasks3.setValue(lesson4.RaisetionalTasks3.text);
    }

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
      this.list4Form.controls.lessonTopic.setValue('');

    }
    const lessonTopic = this.list4Form.controls.lessonTopic.value.toString().trim();
    /* end 2 */

    /* 3 */
    if (!this.list4Form.controls.lessonObjectives.value) {
      this.list4Form.controls.lessonObjectives.setValue('');
    }
    const lessonObjectives = this.list4Form.controls.lessonObjectives.value.toString().trim();
    /* end 3 */


    const textEducationalTasks1 = this.list4Form.controls.textEducationalTasks1.value.toString().trim();
    const textEducationalTasks2 = this.list4Form.controls.textEducationalTasks2.value.toString().trim();
    const textEducationalTasks3 = this.list4Form.controls.textEducationalTasks3.value.toString().trim();
    const textCorrectionalTasks1 = this.list4Form.controls.textCorrectionalTasks1.value.toString().trim();
    const textCorrectionalTasks2 = this.list4Form.controls.textCorrectionalTasks2.value.toString().trim();
    const textCorrectionalTasks3 = this.list4Form.controls.textCorrectionalTasks3.value.toString().trim();
    const textRaisetionalTasks1 = this.list4Form.controls.textRaisetionalTasks1.value.toString().trim();
    const textRaisetionalTasks2 = this.list4Form.controls.textRaisetionalTasks2.value.toString().trim();
    const textRaisetionalTasks3 = this.list4Form.controls.textRaisetionalTasks3.value.toString().trim();



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
                            EducationalTasks1 : {text: textEducationalTasks1, id: this.documentClassEducationalTasks1.id},
                            EducationalTasks2 : {text: textEducationalTasks2, id: this.documentClassEducationalTasks2.id},
                            EducationalTasks3 : {text: textEducationalTasks3, id: this.documentClassEducationalTasks3.id},
                            CorrectionalTasks1 : {text: textCorrectionalTasks1, id: this.documentClassCorrectionalTasks1.id},
                            CorrectionalTasks2 : {text: textCorrectionalTasks2, id: this.documentClassCorrectionalTasks2.id},
                            CorrectionalTasks3 : {text: textCorrectionalTasks3, id: this.documentClassCorrectionalTasks3.id},
                            RaisetionalTasks1: {text: textRaisetionalTasks1, id: this.documentClassRaisetionalTasks1.id},
                            RaisetionalTasks2: {text: textRaisetionalTasks2, id: this.documentClassRaisetionalTasks2.id},
                            RaisetionalTasks3: {text: textRaisetionalTasks3, id: this.documentClassRaisetionalTasks3.id}
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

 onClassEducationalTasks1(curValue) {
  this.documentClassEducationalTasks1.id = curValue.id;
  this.documentClassEducationalTasks1.title = curValue.title;
}

onClassEducationalTasks2(curValue) {
  this.documentClassEducationalTasks2.id = curValue.id;
  this.documentClassEducationalTasks2.title = curValue.title;
}

onClassEducationalTasks3(curValue) {
  this.documentClassEducationalTasks3.id = curValue.id;
  this.documentClassEducationalTasks3.title = curValue.title;
}

onClassCorrectionalTasks1(curValue) {
  this.documentClassCorrectionalTasks1.id = curValue.id;
  this.documentClassCorrectionalTasks1.title = curValue.title;
}

onClassCorrectionalTasks2(curValue) {
  this.documentClassCorrectionalTasks2.id = curValue.id;
  this.documentClassCorrectionalTasks2.title = curValue.title;
}

onClassCorrectionalTasks3(curValue) {
  this.documentClassCorrectionalTasks3.id = curValue.id;
  this.documentClassCorrectionalTasks3.title = curValue.title;
}

onClassRaisetionalTasks1(curValue) {
  this.documentClassRaisetionalTasks1.id = curValue.id;
  this.documentClassRaisetionalTasks1.title = curValue.title;
}

onClassRaisetionalTasks2(curValue) {
  this.documentClassRaisetionalTasks2.id = curValue.id;
  this.documentClassRaisetionalTasks2.title = curValue.title;
}

onClassRaisetionalTasks3(curValue) {
  this.documentClassRaisetionalTasks3.id = curValue.id;
  this.documentClassRaisetionalTasks3.title = curValue.title;
}


}
