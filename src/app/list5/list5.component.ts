import {Component, Input, OnInit} from '@angular/core';
import {classBasicLearningActivities, classGroupLearningActivities} from '../class/academicSubject';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {GuideService} from '../services/guide.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {Guide7Service} from '../components/guide7/guide7.service';

@Component({
  selector: 'app-list5',
  templateUrl: './list5.component.html',
  styleUrls: ['./list5.component.css']
})
export class List5Component implements OnInit {

  thisTheme = '---';
  edititing_id = '-1';
  typeEdit = 'новый документ';
  UserInfo = {schoolLogin: '', bSchoolConnected: false, id_user_school: '', editor: 0};
  list5Form: FormGroup;
  messageEmitter = new Subject<String>();
  Guide8Resultat1 = [];
  Guide8Resultat2 = [];
  Guide8Resultat3 = [];
  Guide8Resultat4 = [];
  Guide8Resultat5 = [];
  Guide8Resultat6 = [];
  Guide8Resultat7 = [];
  Guide8Resultat8 = [];
  Guide8Resultat9 = [];
  Guide8Resultat10 = [];
  Guide7Resultat1 = [];
  Guide7Resultat2 = [];
  Guide7Resultat3 = [];
  Guide7Resultat4 = [];
  Guide7Resultat5 = [];
  Guide7Resultat6 = [];
  Guide7Resultat7 = [];
  Guide7Resultat8 = [];
  Guide7Resultat9 = [];
  Guide7Resultat10 = [];

  checkArray1: any[] = [];
  checkArray2: any[] = [];
  checkArray3: any[] = [];
  checkArray4: any[] = [];
  checkArray5: any[] = [];
  checkArray6: any[] = [];
  checkArray7: any[] = [];
  checkArray8: any[] = [];
  checkArray9: any[] = [];
  checkArray10: any[] = [];

  listBasicLearningActivities: any;
  listGroupLearningActivities: any;
  methodAggegateList: any;

  inputDocumentComponentMethodList1: any[] = [];
  inputDocumentComponentMethodList2: any[] = [];
  inputDocumentComponentMethodList3: any[] = [];
  inputDocumentComponentMethodList4: any[] = [];
  inputDocumentComponentMethodList5: any[] = [];
  inputDocumentComponentMethodList6: any[] = [];
  inputDocumentComponentMethodList7: any[] = [];
  inputDocumentComponentMethodList8: any[] = [];
  inputDocumentComponentMethodList9: any[] = [];
  inputDocumentComponentMethodList10: any[] = [];


  constructor(private router: Router, private gs: GuideService,
              private auth: AuthService, private g7s: Guide7Service) {

    this.UserInfo = this.auth.getStorage();
    if (!this.UserInfo.bSchoolConnected) {
      this.router.navigate(['/login']);
    }


    this.list5Form = new FormGroup({
      teacheractivity: new FormControl(''),
      studentactivities: new FormControl(''),
      reviewerrecommendations: new FormControl(''),
      teacheractivity2: new FormControl(''),
      studentactivities2: new FormControl(''),
      reviewerrecommendations2: new FormControl(''),
      teacheractivity3: new FormControl(''),
      studentactivities3: new FormControl(''),
      reviewerrecommendations3: new FormControl(''),
      teacheractivity4: new FormControl(''),
      studentactivities4: new FormControl(''),
      reviewerrecommendations4: new FormControl(''),
      teacheractivity5: new FormControl(''),
      studentactivities5: new FormControl(''),
      reviewerrecommendations5: new FormControl(''),
      teacheractivity6: new FormControl(''),
      studentactivities6: new FormControl(''),
      reviewerrecommendations6: new FormControl(''),
      teacheractivity7: new FormControl(''),
      studentactivities7: new FormControl(''),
      reviewerrecommendations7: new FormControl(''),
      teacheractivity8: new FormControl(''),
      studentactivities8: new FormControl(''),
      reviewerrecommendations8: new FormControl(''),
      teacheractivity9: new FormControl(''),
      studentactivities9: new FormControl(''),
      reviewerrecommendations9: new FormControl(''),
      teacheractivity10: new FormControl(''),
      studentactivities10: new FormControl(''),
      reviewerrecommendations10: new FormControl(''),


    });
  }

  ngOnInit(): void {

    window.scroll(0,0);

      // загружаем тему урока из базы
    const id = this.auth.getSaveDocumentId();
    this.gs.getThemeLesson(id).subscribe( (value: any[]) => {
      if (value.length > 0) {
        const document = value[0];
        if (document.objSummaryLesson.documentTypeLesson) {
          this.thisTheme = document.objSummaryLesson.documentTypeLesson.title;
        }
      }
    });


    // this.thisTheme

      this.loadLesson();

      if (this.auth.getSaveDocumentEdit()) {
        this.typeEdit = 'редактирование документа';
      } else {
        this.typeEdit = 'новый документ';
      }


    this.messageEmitter.subscribe(msg => {
      if (msg === 'listBasicLearningActivities') {
        console.log(msg);
        this.loadCheckBox();
        this.loadMethodCollection();
      }
    });

  }

  loadLesson() {
    // если это редактирование урока, загружаем урок из базы
    if (this.auth.getSaveDocumentEdit()) {
      this.edititing_id = this.auth.getSaveDocumentId();
      this.gs.getLesson(this.edititing_id).subscribe( (lesson: []) => {
        if (lesson) {
          if (lesson.length > 0) {
            const lesson5 = (lesson as any[])[0].objSummaryLesson2;
            this.loadDataForLesson(lesson5);
          }
        }
      });
    }
  }

  loadDataForLesson(lesson5) {

    this.inputDocumentComponentMethodList1 = lesson5.Guide7Resultat1;
    this.inputDocumentComponentMethodList2 = lesson5.Guide7Resultat2;
    this.inputDocumentComponentMethodList3 = lesson5.Guide7Resultat3;
    this.inputDocumentComponentMethodList4 = lesson5.Guide7Resultat4;
    this.inputDocumentComponentMethodList5 = lesson5.Guide7Resultat5;
    this.inputDocumentComponentMethodList6 = lesson5.Guide7Resultat6;
    this.inputDocumentComponentMethodList7 = lesson5.Guide7Resultat7;
    this.inputDocumentComponentMethodList8 = lesson5.Guide7Resultat8;
    this.inputDocumentComponentMethodList9 = lesson5.Guide7Resultat9;
    this.inputDocumentComponentMethodList10 = lesson5.Guide7Resultat10;

    this.checkArray1 = lesson5.Guide8Resultat1;
    this.checkArray2 = lesson5.Guide8Resultat2;
    this.checkArray3 = lesson5.Guide8Resultat3;
    this.checkArray4 = lesson5.Guide8Resultat4;
    this.checkArray5 = lesson5.Guide8Resultat5;
    this.checkArray6 = lesson5.Guide8Resultat6;
    this.checkArray7 = lesson5.Guide8Resultat7;
    this.checkArray8 = lesson5.Guide8Resultat8;
    this.checkArray9 = lesson5.Guide8Resultat9;
    this.checkArray10 = lesson5.Guide8Resultat10;

    this.list5Form.controls.teacheractivity.setValue(lesson5.teacheractivity);
    this.list5Form.controls.studentactivities.setValue(lesson5.studentactivities);
    this.list5Form.controls.reviewerrecommendations.setValue(lesson5.reviewerrecommendations);

    this.list5Form.controls.teacheractivity2.setValue(lesson5.teacheractivity2);
    this.list5Form.controls.studentactivities2.setValue(lesson5.studentactivities2);
    this.list5Form.controls.reviewerrecommendations2.setValue(lesson5.reviewerrecommendations2);

    this.list5Form.controls.teacheractivity3.setValue(lesson5.teacheractivity3);
    this.list5Form.controls.studentactivities3.setValue(lesson5.studentactivities3);
    this.list5Form.controls.reviewerrecommendations3.setValue(lesson5.reviewerrecommendations3);

    this.list5Form.controls.teacheractivity4.setValue(lesson5.teacheractivity4);
    this.list5Form.controls.studentactivities4.setValue(lesson5.studentactivities4);
    this.list5Form.controls.reviewerrecommendations4.setValue(lesson5.reviewerrecommendations4);

    this.list5Form.controls.teacheractivity5.setValue(lesson5.teacheractivity5);
    this.list5Form.controls.studentactivities5.setValue(lesson5.studentactivities5);
    this.list5Form.controls.reviewerrecommendations5.setValue(lesson5.reviewerrecommendations5);

    this.list5Form.controls.teacheractivity6.setValue(lesson5.teacheractivity6);
    this.list5Form.controls.studentactivities6.setValue(lesson5.studentactivities6);
    this.list5Form.controls.reviewerrecommendations6.setValue(lesson5.reviewerrecommendations6);

    this.list5Form.controls.teacheractivity7.setValue(lesson5.teacheractivity7);
    this.list5Form.controls.studentactivities7.setValue(lesson5.studentactivities7);
    this.list5Form.controls.reviewerrecommendations7.setValue(lesson5.reviewerrecommendations7);

    this.list5Form.controls.teacheractivity8.setValue(lesson5.teacheractivity8);
    this.list5Form.controls.studentactivities8.setValue(lesson5.studentactivities8);
    this.list5Form.controls.reviewerrecommendations8.setValue(lesson5.reviewerrecommendations8);

    this.list5Form.controls.teacheractivity9.setValue(lesson5.teacheractivity9);
    this.list5Form.controls.studentactivities9.setValue(lesson5.studentactivities9);
    this.list5Form.controls.reviewerrecommendations9.setValue(lesson5.reviewerrecommendations9);

    this.list5Form.controls.teacheractivity10.setValue(lesson5.teacheractivity10);
    this.list5Form.controls.studentactivities10.setValue(lesson5.studentactivities10);
    this.list5Form.controls.reviewerrecommendations10.setValue(lesson5.reviewerrecommendations10);

  }


  loadCheckBox() {
    this.listBasicLearningActivities.forEach( element => {
      this.list5Form.addControl('aggregateCheck' + element.id.toString(), new FormControl(''));
    });
  }

/*
  createOrLoadCollection(sName, objCollection, sResult: any) {
    this.gs.checkCollection(sName).subscribe(value => {
      if (value === false) {
        this.gs.insertGuideLessonsName(sName, objCollection).subscribe(guideList => {
          this[sResult] = guideList;
          this.messageEmitter.next(sResult);
        });
      } else {
        this.gs.selectCollection(sName).subscribe(guideList => {
          this[sResult] = guideList;
          this.messageEmitter.next(sResult);
        });
      }
    });
  }
*/

  loadMethodCollection() {
    this.gs.selectLearningActivities().subscribe(methodList => {
      this.methodAggegateList = methodList;
    });
  }

  onClickSave() {
    this.listBasicLearningActivities.forEach( element => {
//      console.log('aggregateCheck' + element.id.toString(), this.list5Form.controls['aggregateCheck' + element.id.toString()].value);
      if (this.list5Form.controls['aggregateCheck' + element.id.toString()].value) {
        console.log('aggregateCheck' + element.id.toString(), this.list5Form.controls['aggregateCheck' + element.id.toString()].value);
      }
    });
  }


  sentCurrentMessage(guideName: string, iNumber: number) {
    const res = {message: guideName, i: iNumber};
    this.g7s.sendMessage(res);
  }


  saveList5() {

/*
    console.log('111');
    const res1 = {message: 'guide8', i: 1};
    this.g7s.sendMessage(res1);
    console.log('Guide8Resultat1=', this.Guide8Resultat1);
    const res2 = {message: 'guide8', i: 2};
    this.g7s.sendMessage(res2);
    console.log('Guide8Resultat2=', this.Guide8Resultat2);
*/
    // получаем номер id
    const id = this.auth.getSaveDocumentId();

    // получаем все справочники
    const objResult: {[k: string]: any} = {};
    this.sentCurrentMessage('guide7', 1);
    this.sentCurrentMessage('guide7', 2);
    this.sentCurrentMessage('guide7', 3);
    this.sentCurrentMessage('guide7', 4);
    this.sentCurrentMessage('guide7', 5);
    this.sentCurrentMessage('guide7', 6);
    this.sentCurrentMessage('guide7', 7);
    this.sentCurrentMessage('guide7', 8);
    this.sentCurrentMessage('guide7', 9);
    this.sentCurrentMessage('guide7', 10);
    this.sentCurrentMessage('guide8', 1);
    this.sentCurrentMessage('guide8', 2);
    this.sentCurrentMessage('guide8', 3);
    this.sentCurrentMessage('guide8', 4);
    this.sentCurrentMessage('guide8', 5);
    this.sentCurrentMessage('guide8', 6);
    this.sentCurrentMessage('guide8', 7);
    this.sentCurrentMessage('guide8', 8);
    this.sentCurrentMessage('guide8', 9);
    this.sentCurrentMessage('guide8', 10);

    objResult.Guide7Resultat1 = this.Guide7Resultat1;
    objResult.Guide7Resultat2 = this.Guide7Resultat2;
    objResult.Guide7Resultat3 = this.Guide7Resultat3;
    objResult.Guide7Resultat4 = this.Guide7Resultat4;
    objResult.Guide7Resultat5 = this.Guide7Resultat5;
    objResult.Guide7Resultat6 = this.Guide7Resultat6;
    objResult.Guide7Resultat7 = this.Guide7Resultat7;
    objResult.Guide7Resultat8 = this.Guide7Resultat8;
    objResult.Guide7Resultat9 = this.Guide7Resultat9;
    objResult.Guide7Resultat10 = this.Guide7Resultat10;
    objResult.Guide8Resultat1 = this.Guide8Resultat1;
    objResult.Guide8Resultat2 = this.Guide8Resultat2;
    objResult.Guide8Resultat3 = this.Guide8Resultat3;
    objResult.Guide8Resultat4 = this.Guide8Resultat4;
    objResult.Guide8Resultat5 = this.Guide8Resultat5;
    objResult.Guide8Resultat6 = this.Guide8Resultat6;
    objResult.Guide8Resultat7 = this.Guide8Resultat7;
    objResult.Guide8Resultat8 = this.Guide8Resultat8;
    objResult.Guide8Resultat9 = this.Guide8Resultat9;
    objResult.Guide8Resultat10 = this.Guide8Resultat10;

    objResult.teacheractivity = this.list5Form.controls.teacheractivity.value;
    objResult.studentactivities = this.list5Form.controls.studentactivities.value;
    objResult.reviewerrecommendations = this.list5Form.controls.reviewerrecommendations.value;

    objResult.teacheractivity2 = this.list5Form.controls.teacheractivity2.value;
    objResult.studentactivities2 = this.list5Form.controls.studentactivities2.value;
    objResult.reviewerrecommendations2 = this.list5Form.controls.reviewerrecommendations2.value;

    objResult.teacheractivity3 = this.list5Form.controls.teacheractivity3.value;
    objResult.studentactivities3 = this.list5Form.controls.studentactivities3.value;
    objResult.reviewerrecommendations3 = this.list5Form.controls.reviewerrecommendations3.value;

    objResult.teacheractivity4 = this.list5Form.controls.teacheractivity4.value;
    objResult.studentactivities4 = this.list5Form.controls.studentactivities4.value;
    objResult.reviewerrecommendations4 = this.list5Form.controls.reviewerrecommendations4.value;

    objResult.teacheractivity5 = this.list5Form.controls.teacheractivity5.value;
    objResult.studentactivities5 = this.list5Form.controls.studentactivities5.value;
    objResult.reviewerrecommendations5 = this.list5Form.controls.reviewerrecommendations5.value;

    objResult.teacheractivity6 = this.list5Form.controls.teacheractivity6.value;
    objResult.studentactivities6 = this.list5Form.controls.studentactivities6.value;
    objResult.reviewerrecommendations6 = this.list5Form.controls.reviewerrecommendations6.value;

    objResult.teacheractivity7 = this.list5Form.controls.teacheractivity7.value;
    objResult.studentactivities7 = this.list5Form.controls.studentactivities7.value;
    objResult.reviewerrecommendations7 = this.list5Form.controls.reviewerrecommendations7.value;

    objResult.teacheractivity8 = this.list5Form.controls.teacheractivity8.value;
    objResult.studentactivities8 = this.list5Form.controls.studentactivities8.value;
    objResult.reviewerrecommendations8 = this.list5Form.controls.reviewerrecommendations8.value;

    objResult.teacheractivity9 = this.list5Form.controls.teacheractivity9.value;
    objResult.studentactivities9 = this.list5Form.controls.studentactivities9.value;
    objResult.reviewerrecommendations9 = this.list5Form.controls.reviewerrecommendations9.value;

    objResult.teacheractivity10 = this.list5Form.controls.teacheractivity10.value;
    objResult.studentactivities10 = this.list5Form.controls.studentactivities10.value;
    objResult.reviewerrecommendations10 = this.list5Form.controls.reviewerrecommendations10.value;

    console.log('id=', id, objResult);
    this.gs.updateSummaryLessonList5(id, objResult).subscribe( resultat => {

      // переход к "моим урокам"
      const beans = {schoolarchive: {date: this.getDateShow(), currentLessons: true}};
      this.router.navigate(['/archive'], {state: beans});

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
    return dd;
  }


  onResGuide7(event: [], i: number) {
    if (i === 1) {
      this.Guide7Resultat1 = event;
    }

    if (i === 2) {
      this.Guide7Resultat2 = event;
    }

    if (i === 3) {
      this.Guide7Resultat3 = event;
    }
    if (i === 4) {
      this.Guide7Resultat4 = event;
    }
    if (i === 5) {
      this.Guide7Resultat5 = event;
    }
    if (i === 6) {
      this.Guide7Resultat6 = event;
    }
    if (i === 7) {
      this.Guide7Resultat7 = event;
    }
    if (i === 8) {
      this.Guide7Resultat8 = event;
    }
    if (i === 9) {
      this.Guide7Resultat9 = event;
    }
    if (i === 10) {
      this.Guide7Resultat10 = event;
    }
  }

  onResGuide8(event: [], i: number) {

    if (i === 1) {
      this.Guide8Resultat1 = event;
    }

    if (i === 2) {
      this.Guide8Resultat2 = event;
    }

    if (i === 3) {
      this.Guide8Resultat3 = event;
    }
    if (i === 4) {
      this.Guide8Resultat4 = event;
    }
    if (i === 5) {
      this.Guide8Resultat5 = event;
    }
    if (i === 6) {
      this.Guide8Resultat6 = event;
    }
    if (i === 7) {
      this.Guide8Resultat7 = event;
    }
    if (i === 8) {
      this.Guide8Resultat8 = event;
    }
    if (i === 9) {
      this.Guide8Resultat9 = event;
    }
    if (i === 10) {
      this.Guide8Resultat10 = event;
    }
  }
}
