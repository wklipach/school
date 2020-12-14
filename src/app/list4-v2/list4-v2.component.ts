import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Guide7Service} from '../components/guide7/guide7.service';
import {GuideService} from '../services/guide.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import Russian from 'flatpickr/dist/l10n/ru.js';
import { forkJoin } from 'rxjs';
import {classCorrectionalTasksV2, classEducationalTasksV2, classRaisetionalTasksV2} from "../class/academicSubject";

@Component({
  selector: 'app-list4-v2',
  templateUrl: './list4-v2.component.html',
  styleUrls: ['./list4-v2.component.css']
})
export class List4V2Component implements OnInit {

  typeEdit = 'новый документ';
  edititing_id = '-1';

  list4v2Form: FormGroup;
  vDatePickOptions: FlatpickrOptions = {
    locale: Russian.ru,
    dateFormat: 'd.m.Y'
  };

  currentDate: Date;

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

  listClassEducationalTasksV2: any;
  documentClassEducationalTasks1 = {id: -1, title: '--'};
  documentClassEducationalTasks2 = {id: -1, title: '--'};
  documentClassEducationalTasks3 = {id: -1, title: '--'};

  listClassCorrectionalTasksV2: any;
  documentClassCorrectionalTasks1 = {id: -1, title: '--'};
  documentClassCorrectionalTasks2 = {id: -1, title: '--'};
  documentClassCorrectionalTasks3 = {id: -1, title: '--'};

  listClassRaisetionalTasksV2: any;
  documentClassRaisetionalTasks1 = {id: -1, title: '--'};
  documentClassRaisetionalTasks2 = {id: -1, title: '--'};
  documentClassRaisetionalTasks3 = {id: -1, title: '--'};

  inputDocumentComponentMethodList: any[] = [];
  inputDocumentComponentList: any[] = [];


  constructor(private router: Router, private gs: GuideService,
              private auth: AuthService, private g7s: Guide7Service) {

    this.UserInfo = this.auth.getStorage();
    if (!this.UserInfo.bSchoolConnected) {
      this.router.navigate(['/login']);
    }

    this.list4v2Form = new FormGroup({
      formControlDate: new FormControl(),
      fio: new FormControl(),
      fioteacherhome: new FormControl(),
      lessonTopic: new FormControl(''),
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

             this.loadCurrentTeacher(),
             this.gs.selectCollection('classNameNumber'),
             this.gs.selectCollection('lessonsName2'),
             this.gs.selectCollection('classTypeLesson'),
             this.gs.selectCollection('classType2Lesson'),
             this.gs.selectCollection('classEquipment'),
             this.gs.selectCollection('classNameLetter'),
             this.gs.selectCollection('classEducationalTasksV2'),
             this.gs.selectCollection('classCorrectionalTasksV2'),
             this.gs.selectCollection('classRaisetionalTasksV2')
             ]).subscribe(results => {

              const teacher = results[0];
              this.list4v2Form.controls.fio.setValue(teacher[0].fio);
              // console.log('teacher', teacher);

              this.listClassNameNumber = results[1];
              // console.log('listClassNameNumber', this.listClassNameNumber);

              this.listLessons2 = results[2];
              // console.log('listLessons2', this.listLessons2);

              this.listTypeLesson = results[3];
              // console.log('listTypeLesson', this.listTypeLesson);

              this.listType2Lesson = results[4];
              // console.log('listType2Lesson', this.listType2Lesson);

              this.listEquipment = results[5];
              // console.log('listEquipment', this.listEquipment);

              this.listClassNameLetter = results[6];
              // console.log('listClassNameLetter', this.listClassNameLetter);
              this.listClassEducationalTasksV2 = results[7];
              this.listClassCorrectionalTasksV2 = results[8];
              this.listClassRaisetionalTasksV2 = results[9];
              // если это редактирование урока, загружаем урок из базы
              this.loadLesson();

             });

    // this.LoadCollection('classNameNumber',  'listClassNameNumber');
    // this.LoadCollection('lessonsName2',  'listLessons2');
    // this.LoadCollection('classTypeLesson',  'listTypeLesson');
    // this.LoadCollection('classType2Lesson',  'listType2Lesson');
    // this.LoadCollection('classEquipment', 'listEquipment');
    // this.LoadCollection('classNameLetter',  'listClassNameLetter');
    // this.loadCurrentTeacher();

  }


  loadLesson() {
    // если это редактирование урока, загружаем урок из базы
    if (this.auth.getSaveDocumentEdit()) {
      this.edititing_id = this.auth.getSaveDocumentId();
       this.gs.getLesson(this.edititing_id).subscribe( (lesson: []) => {
        if (lesson) {
          if (lesson.length > 0) {
            const lesson4v2 = (lesson as any[])[0].objSummaryLesson;
            this.loadDataForLesson(lesson4v2);
          }
      }
    });
   }
  }

  loadDataForLesson(lesson4v2) {
    const documentEquipmentList: any[] =  lesson4v2.documentEquipmentList;

    documentEquipmentList.forEach( (element, ind) => {
         const documentEquipment = {id: element.id, title: element.title, delete: 0};
         const newIndex = this.documentEquipmentList.push(documentEquipment) - 1;
         this.list4v2Form.addControl('equipment' + newIndex.toString(), new FormControl(element.AdditionalMessage));
    });
    this.inputDocumentComponentMethodList = lesson4v2.Guide7Resultat1;
    this.list4v2Form.controls.fioteacherhome.setValue(lesson4v2.fioteacherhome);
    this.list4v2Form.controls.lessonTopic.setValue(lesson4v2.lessonTopic);
    this.list4v2Form.controls.lessonObjectives.setValue(lesson4v2.lessonObjectives);

    if (lesson4v2.lessonTasks) {
      this.list4v2Form.controls.lessonTasks.setValue(lesson4v2.lessonTasks);
    }

    this.list4v2Form.controls.formControlDate.setValue(new Date(lesson4v2.formControlDate[0]));

    setTimeout(() => {
      this.currentDate = new Date(lesson4v2.formControlDate[0]);
    }, 0);



    this.documentClassNameNumber = lesson4v2.documentClassNameNumber;
    this.documentClassNameLetter = lesson4v2.documentClassNameLetter;
    this.documentLessons2 = lesson4v2.documentLessons2;
    this.documentTypeLesson  = lesson4v2.documentTypeLesson;
    this.documentType2Lesson = lesson4v2.documentType2Lesson;
    this.inputDocumentComponentList = lesson4v2.guide2linesResultat1;


    if (lesson4v2.EducationalTasks1) {
      this.documentClassEducationalTasks1.id = lesson4v2.EducationalTasks1.id;
      if (lesson4v2.EducationalTasks1.id > 0) this.documentClassEducationalTasks1.title = this.listClassEducationalTasksV2.find( value => value.id === lesson4v2.EducationalTasks1.id).title;
      this.list4v2Form.controls.textEducationalTasks1.setValue(lesson4v2.EducationalTasks1.text);
    }

    if (lesson4v2.CorrectionalTasks1) {
      this.documentClassCorrectionalTasks1.id = lesson4v2.CorrectionalTasks1.id;
      if (lesson4v2.CorrectionalTasks1.id > 0) this.documentClassCorrectionalTasks1.title = this.listClassCorrectionalTasksV2.find( value => value.id === lesson4v2.CorrectionalTasks1.id).title;
      this.list4v2Form.controls.textCorrectionalTasks1.setValue(lesson4v2.CorrectionalTasks1.text);
    }

    if (lesson4v2.RaisetionalTasks1) {
      this.documentClassRaisetionalTasks1.id = lesson4v2.RaisetionalTasks1.id;
      if (lesson4v2.RaisetionalTasks1.id > 0) this.documentClassRaisetionalTasks1.title = this.listClassRaisetionalTasksV2.find( value => value.id === lesson4v2.RaisetionalTasks1.id).title;
      this.list4v2Form.controls.textRaisetionalTasks1.setValue(lesson4v2.RaisetionalTasks1.text);
    }

    if (lesson4v2.EducationalTasks2) {
      this.documentClassEducationalTasks2.id = lesson4v2.EducationalTasks2.id;
      if (lesson4v2.EducationalTasks2.id > 0) this.documentClassEducationalTasks2.title = this.listClassEducationalTasksV2.find( value => value.id === lesson4v2.EducationalTasks2.id).title;
      this.list4v2Form.controls.textEducationalTasks2.setValue(lesson4v2.EducationalTasks2.text);
    }

    if (lesson4v2.CorrectionalTasks2) {
      this.documentClassCorrectionalTasks2.id = lesson4v2.CorrectionalTasks2.id;
      if (lesson4v2.CorrectionalTasks2.id > 0) this.documentClassCorrectionalTasks2.title = this.listClassCorrectionalTasksV2.find( value => value.id === lesson4v2.CorrectionalTasks2.id).title;
      this.list4v2Form.controls.textCorrectionalTasks2.setValue(lesson4v2.CorrectionalTasks2.text);
    }

    if (lesson4v2.RaisetionalTasks2) {
      this.documentClassRaisetionalTasks2.id = lesson4v2.RaisetionalTasks2.id;
      if (lesson4v2.RaisetionalTasks2.id > 0) this.documentClassRaisetionalTasks2.title = this.listClassRaisetionalTasksV2.find( value => value.id === lesson4v2.RaisetionalTasks2.id).title;
      this.list4v2Form.controls.textRaisetionalTasks2.setValue(lesson4v2.RaisetionalTasks2.text);
    }

    if (lesson4v2.EducationalTasks3) {
      this.documentClassEducationalTasks3.id = lesson4v2.EducationalTasks3.id;
      if (lesson4v2.EducationalTasks3.id > 0) this.documentClassEducationalTasks3.title = this.listClassEducationalTasksV2.find( value => value.id === lesson4v2.EducationalTasks3.id).title;
      this.list4v2Form.controls.textEducationalTasks3.setValue(lesson4v2.EducationalTasks3.text);
    }

    if (lesson4v2.CorrectionalTasks3) {
      this.documentClassCorrectionalTasks3.id = lesson4v2.CorrectionalTasks3.id;
      if (lesson4v2.CorrectionalTasks3.id > 0) this.documentClassCorrectionalTasks3.title = this.listClassCorrectionalTasksV2.find( value => value.id === lesson4v2.CorrectionalTasks3.id).title;
      this.list4v2Form.controls.textCorrectionalTasks3.setValue(lesson4v2.CorrectionalTasks3.text);
    }

    if (lesson4v2.RaisetionalTasks3) {
      this.documentClassRaisetionalTasks3.id = lesson4v2.RaisetionalTasks3.id;
      if (lesson4v2.RaisetionalTasks3.id > 0) this.documentClassRaisetionalTasks3.title = this.listClassRaisetionalTasksV2.find( value => value.id === lesson4v2.RaisetionalTasks3.id).title;
      this.list4v2Form.controls.textRaisetionalTasks3.setValue(lesson4v2.RaisetionalTasks3.text);
    }

  }

  loadCurrentTeacher() {
    return this.auth.getUserFromID(this.UserInfo.id_user_school);
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

  loadInfoFromMultiLevelGuide(sName: string, arrayCollection: any[]) {
    for (let i = 0; i < arrayCollection.length; i++) {
      let sAdditionalMessage = '';
      if (this.list4v2Form.controls[sName + i.toString()].value) {
        sAdditionalMessage = this.list4v2Form.controls[sName + i.toString()].value.trim();
      }
      arrayCollection[i].AdditionalMessage = sAdditionalMessage;
    }
  }

  deleteInfoFromMultiLevelGuide(arrayCollection: any[]) {
    let resultCollection = arrayCollection.map(x => Object.assign({}, x));
    resultCollection = resultCollection.filter(obj => obj.delete === 0);
    return resultCollection;
  }

  onSaveLis4v2() {

      /* 1 */
      let fioteacherhome = '';
      if (this.list4v2Form.controls.fioteacherhome.value) {
        fioteacherhome = this.list4v2Form.controls.fioteacherhome.value.toString().trim();
      }

      /* end 1 */

      /* 2 */
      if (!this.list4v2Form.controls.lessonTopic.value) {
        this.list4v2Form.controls.lessonTopic.setValue('');
      }
      const lessonTopic = this.list4v2Form.controls.lessonTopic.value.toString().trim();
      /* end 2 */

      /* 3 */
      if (!this.list4v2Form.controls.lessonObjectives.value) {
        this.list4v2Form.controls.lessonObjectives.setValue('');
      }
      const lessonObjectives = this.list4v2Form.controls.lessonObjectives.value.toString().trim();
      /* end 3 */


    const textEducationalTasks1 = this.list4v2Form.controls.textEducationalTasks1.value.toString().trim();
    const textEducationalTasks2 = this.list4v2Form.controls.textEducationalTasks2.value.toString().trim();
    const textEducationalTasks3 = this.list4v2Form.controls.textEducationalTasks3.value.toString().trim();
    const textCorrectionalTasks1 = this.list4v2Form.controls.textCorrectionalTasks1.value.toString().trim();
    const textCorrectionalTasks2 = this.list4v2Form.controls.textCorrectionalTasks2.value.toString().trim();
    const textCorrectionalTasks3 = this.list4v2Form.controls.textCorrectionalTasks3.value.toString().trim();
    const textRaisetionalTasks1 = this.list4v2Form.controls.textRaisetionalTasks1.value.toString().trim();
    const textRaisetionalTasks2 = this.list4v2Form.controls.textRaisetionalTasks2.value.toString().trim();
    const textRaisetionalTasks3 = this.list4v2Form.controls.textRaisetionalTasks3.value.toString().trim();

    let lessonTasks = '';
    if (this.list4v2Form.controls.lessonTasks.value) {
      lessonTasks = this.list4v2Form.controls.lessonTasks.value.toString().trim();
    }

    // загружаем коллекцию documentEquipmentList
    this.loadInfoFromMultiLevelGuide('equipment', this.documentEquipmentList);
    // формируем коллекцию для записи без удаженных элементов
    const moveDocumentEquipmentList = this.deleteInfoFromMultiLevelGuide(this.documentEquipmentList);

    if (!this.list4v2Form.controls.formControlDate.value) {
      this.list4v2Form.controls.formControlDate.setValue(new Date());
    }


    // this.documentLessons2);
    // this.documentTypeLesson);
    // this.documentType2Lesson);
    // this.documentClassNameNumber
    // this.documentClassNameLetter);

    const objResult: {[k: string]: any} = {};
    this.sentCurrentMessage('elem2lines', 1);
    objResult.guide2linesResultat1 = this.guide2linesResultat1;
    this.sentCurrentMessage('guide7', 1);
    objResult.Guide7Resultat1 = this.Guide7Resultat1;

    const summaryLesson = {
      LESSON: 2,
      formControlDate: this.list4v2Form.controls.formControlDate.value,
      fioteacherhome: fioteacherhome,
      lessonTopic: lessonTopic,
      lessonObjectives: lessonObjectives,
      lessonTasks: lessonTasks,
      documentClassNameNumber: this.documentClassNameNumber,
      documentClassNameLetter: this.documentClassNameLetter,
      documentLessons2: this.documentLessons2,
      documentTypeLesson: this.documentTypeLesson,
      documentType2Lesson: this.documentType2Lesson,
      documentEquipmentList: moveDocumentEquipmentList,
      guide2linesResultat1: objResult.guide2linesResultat1,
      Guide7Resultat1: objResult.Guide7Resultat1,
      EducationalTasks1 : {text: textEducationalTasks1, id: this.documentClassEducationalTasks1.id},
      EducationalTasks2 : {text: textEducationalTasks2, id: this.documentClassEducationalTasks2.id},
      EducationalTasks3 : {text: textEducationalTasks3, id: this.documentClassEducationalTasks3.id},
      CorrectionalTasks1 : {text: textCorrectionalTasks1, id: this.documentClassCorrectionalTasks1.id},
      CorrectionalTasks2 : {text: textCorrectionalTasks2, id: this.documentClassCorrectionalTasks2.id},
      CorrectionalTasks3 : {text: textCorrectionalTasks3, id: this.documentClassCorrectionalTasks3.id},
      RaisetionalTasks1: {text: textRaisetionalTasks1, id: this.documentClassRaisetionalTasks1.id},
      RaisetionalTasks2: {text: textRaisetionalTasks2, id: this.documentClassRaisetionalTasks2.id},
      RaisetionalTasks3: {text: textRaisetionalTasks3, id: this.documentClassRaisetionalTasks3.id}
    };

    if (this.auth.getSaveDocumentEdit()) {
      this.gs.updateSummaryLessonList4(this.edititing_id, summaryLesson).subscribe( resultat => {
        this.auth.setSaveDocumentId(this.edititing_id);
        this.router.navigate(['/list5-v2']);
      });
    } else {
      this.gs.insertSummaryLesson(this.UserInfo.id_user_school, summaryLesson).subscribe((suumaryRes: any) => {
        this.auth.setSaveDocumentId(suumaryRes.insertedId);
        this.router.navigate(['/list5-v2']);
      });
    }

  }



}
