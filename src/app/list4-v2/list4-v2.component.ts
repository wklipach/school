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
      if (!this.list4v2Form.controls.fioteacherhome.value) {
        alert('Укажите имя обучающегося');
        return;
      }
      const fioteacherhome = this.list4v2Form.controls.fioteacherhome.value.toString().trim();
      /* end 1 */

      /* 2 */
      if (!this.list4v2Form.controls.lessonTopic.value) {
        alert('Укажите тему урока');
        return;
      }
      const lessonTopic = this.list4v2Form.controls.lessonTopic.value.toString().trim();
      /* end 2 */

      /* 3 */
      if (!this.list4v2Form.controls.lessonObjectives.value) {
        alert('Укажите цель урока');
        return;
      }
      const lessonObjectives = this.list4v2Form.controls.lessonObjectives.value.toString().trim();
      /* end 3 */

    // загружаем коллекцию documentEquipmentList
    this.loadInfoFromMultiLevelGuide('equipment', this.documentEquipmentList);
    // формируем коллекцию для записи без удаженных элементов
    const moveDocumentEquipmentList = this.deleteInfoFromMultiLevelGuide(this.documentEquipmentList);

    if (!this.list4v2Form.controls.formControlDate.value) {
      this.list4v2Form.controls.formControlDate.setValue(new Date());
    }

    if (!this.list4v2Form.controls.subjectResults.value) {
      this.list4v2Form.controls.subjectResults.setValue('');
    }

    if (!this.list4v2Form.controls.personalResults.value) {
      this.list4v2Form.controls.personalResults.setValue('');
    }

    if (!this.list4v2Form.controls.equipment.value) {
      this.list4v2Form.controls.equipment.setValue('');
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
      documentClassNameNumber: this.documentClassNameNumber,
      documentClassNameLetter: this.documentClassNameLetter,
      documentLessons2: this.documentLessons2,
      documentTypeLesson: this.documentTypeLesson,
      documentType2Lesson: this.documentType2Lesson,
      documentEquipmentList: moveDocumentEquipmentList,
      guide2linesResultat1: objResult.guide2linesResultat1,
      Guide7Resultat1: objResult.Guide7Resultat1
    };

    this.gs.insertSummaryLesson(this.UserInfo.id_user_school, summaryLesson).subscribe( (suumaryRes: any) => {
      this.auth.setSaveDocumentId(suumaryRes.insertedId);
      this.router.navigate(['/list5-v2']);
    });

  }


}
