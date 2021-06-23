import {Component, Input, OnInit} from '@angular/core';
import {classBasicLearningActivities, classGroupLearningActivities} from '../class/academicSubject';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {GuideService} from '../services/guide.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {Guide7Service} from '../components/guide7/guide7.service';
import {Guide7_2Service} from "../components/guide7_2/guide7_2.service";

@Component({
  selector: 'app-list5',
  templateUrl: './list5.component.html',
  styleUrls: ['./list5.component.css']
})
export class List5Component implements OnInit {

  boolVE1  = false;
  boolVE2  = false;
  boolVE3  = false;
  boolVE4  = false;


  boolVE5  = false;
  boolVE6  = false;
  boolVE7  = false;
  boolVE8  = false;
  boolVE9  = false;

  thisThemeId = -1;
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
  Guide8Resultat11 = [];
  Guide8Resultat12 = [];
  Guide8Resultat13 = [];

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
  Guide7Resultat11 = [];
  Guide7Resultat12 = [];
  Guide7Resultat13 = [];

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
  checkArray11: any[] = [];
  checkArray12: any[] = [];
  checkArray13: any[] = [];

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
  inputDocumentComponentMethodList11: any[] = [];
  inputDocumentComponentMethodList12: any[] = [];
  inputDocumentComponentMethodList13: any[] = [];




  orderArray: string[] = [];
  public setOrder(stype: string) {
    this.orderArray.push(stype);
    console.log('orderArray', this.orderArray);
  }

  public deleteOrder(stype: string) {
    this.orderArray.splice(this.orderArray.indexOf(stype), 1);
    console.log('orderArray', this.orderArray);
  };

  constructor(private router: Router, private gs: GuideService,
              private auth: AuthService, private g7_2s: Guide7_2Service, private g7s: Guide7Service) {

    this.UserInfo = this.auth.getStorage();
    if (!this.UserInfo.bSchoolConnected) {
      this.router.navigate(['/login']);
    }


    this.list5Form = new FormGroup({
      //teacheractivity: new FormControl(''),
      //studentactivities: new FormControl(''),
      //reviewerrecommendations: new FormControl(''),
      //teacheractivity2: new FormControl(''),
      //studentactivities2: new FormControl(''),
      //reviewerrecommendations2: new FormControl(''),
      //teacheractivity3: new FormControl(''),
      //studentactivities3: new FormControl(''),
      //reviewerrecommendations3: new FormControl(''),
      //teacheractivity4: new FormControl(''),
      //studentactivities4: new FormControl(''),
      //reviewerrecommendations4: new FormControl(''),
      //teacheractivity5: new FormControl(''),
      //studentactivities5: new FormControl(''),
      //reviewerrecommendations5: new FormControl(''),
      //teacheractivity6: new FormControl(''),
      //studentactivities6: new FormControl(''),
      //reviewerrecommendations6: new FormControl(''),
      //teacheractivity7: new FormControl(''),
      //studentactivities7: new FormControl(''),
      //reviewerrecommendations7: new FormControl(''),
      //teacheractivity8: new FormControl(''),
      //studentactivities8: new FormControl(''),
      //reviewerrecommendations8: new FormControl(''),
      //teacheractivity9: new FormControl(''),
      //studentactivities9: new FormControl(''),
      //reviewerrecommendations9: new FormControl(''),
      //teacheractivity10: new FormControl(''),
      //studentactivities10: new FormControl(''),
      //reviewerrecommendations10: new FormControl(''),
      //teacheractivity11: new FormControl(''),
      //studentactivities11: new FormControl(''),
      //reviewerrecommendations11: new FormControl(''),
      //teacheractivity12: new FormControl(''),
      //studentactivities12: new FormControl(''),
      //reviewerrecommendations12: new FormControl(''),
      //teacheractivity13: new FormControl(''),
      //studentactivities13: new FormControl(''),
      //reviewerrecommendations13: new FormControl(''),
    });
  }

  ngOnInit(): void {

    window.scroll(0, 0);

      // загружаем тему урока из базы
    const id = this.auth.getSaveDocumentId();
    this.gs.getThemeLesson(id).subscribe( (value: any[]) => {
      if (value.length > 0) {
        const document = value[0];
        if (document.objSummaryLesson.documentTypeLesson) {
          this.thisTheme = document.objSummaryLesson.documentTypeLesson.title;
          this.thisThemeId = document.objSummaryLesson.documentTypeLesson.id;
          if (this.thisThemeId === 1 || this.thisThemeId === 2) {
            this.boolVE8 = true;
          }
          if (this.thisThemeId === 3) {
            this.boolVE7 = true;
          }

          if (this.thisThemeId === 1 || this.thisThemeId === 2 || this.thisThemeId === 3) {
            this.boolVE9 = true;
          }

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


    if (!lesson5) {
      return;
    }

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

    if (lesson5.Guide7Resultat11) {
    this.inputDocumentComponentMethodList11 = lesson5.Guide7Resultat11;
    }

    if (lesson5.Guide7Resultat12) {
    this.inputDocumentComponentMethodList12 = lesson5.Guide7Resultat12;
    }

    if (lesson5.Guide7Resultat13) {
      this.inputDocumentComponentMethodList13 = lesson5.Guide7Resultat13;
      }

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

    if (lesson5.Guide8Resultat11) {
    this.checkArray11 = lesson5.Guide8Resultat11;
    }

    if (lesson5.Guide8Resultat12) {
    this.checkArray12 = lesson5.Guide8Resultat12;
    }

    if (lesson5.Guide8Resultat13) {
      this.checkArray13 = lesson5.Guide8Resultat13;
      }


    //this.list5Form.controls.teacheractivity.setValue(lesson5.teacheractivity);
    //this.list5Form.controls.studentactivities.setValue(lesson5.studentactivities);
    //this.list5Form.controls.reviewerrecommendations.setValue(lesson5.reviewerrecommendations);

    //this.list5Form.controls.teacheractivity2.setValue(lesson5.teacheractivity2);
    //this.list5Form.controls.studentactivities2.setValue(lesson5.studentactivities2);
    //this.list5Form.controls.reviewerrecommendations2.setValue(lesson5.reviewerrecommendations2);

    //this.list5Form.controls.teacheractivity3.setValue(lesson5.teacheractivity3);
    //this.list5Form.controls.studentactivities3.setValue(lesson5.studentactivities3);
    //this.list5Form.controls.reviewerrecommendations3.setValue(lesson5.reviewerrecommendations3);

    //this.list5Form.controls.teacheractivity4.setValue(lesson5.teacheractivity4);
    //this.list5Form.controls.studentactivities4.setValue(lesson5.studentactivities4);
    //this.list5Form.controls.reviewerrecommendations4.setValue(lesson5.reviewerrecommendations4);

    //this.list5Form.controls.teacheractivity5.setValue(lesson5.teacheractivity5);
    //this.list5Form.controls.studentactivities5.setValue(lesson5.studentactivities5);
    //this.list5Form.controls.reviewerrecommendations5.setValue(lesson5.reviewerrecommendations5);

    //this.list5Form.controls.teacheractivity6.setValue(lesson5.teacheractivity6);
    //this.list5Form.controls.studentactivities6.setValue(lesson5.studentactivities6);
    //this.list5Form.controls.reviewerrecommendations6.setValue(lesson5.reviewerrecommendations6);

    //this.list5Form.controls.teacheractivity7.setValue(lesson5.teacheractivity7);
    //this.list5Form.controls.studentactivities7.setValue(lesson5.studentactivities7);
    //this.list5Form.controls.reviewerrecommendations7.setValue(lesson5.reviewerrecommendations7);

    //this.list5Form.controls.teacheractivity8.setValue(lesson5.teacheractivity8);
    //this.list5Form.controls.studentactivities8.setValue(lesson5.studentactivities8);
    //this.list5Form.controls.reviewerrecommendations8.setValue(lesson5.reviewerrecommendations8);

    //this.list5Form.controls.teacheractivity9.setValue(lesson5.teacheractivity9);
    //this.list5Form.controls.studentactivities9.setValue(lesson5.studentactivities9);
    //this.list5Form.controls.reviewerrecommendations9.setValue(lesson5.reviewerrecommendations9);

    //this.list5Form.controls.teacheractivity10.setValue(lesson5.teacheractivity10);
    //this.list5Form.controls.studentactivities10.setValue(lesson5.studentactivities10);
    //this.list5Form.controls.reviewerrecommendations10.setValue(lesson5.reviewerrecommendations10);

    //this.list5Form.controls.teacheractivity11.setValue(lesson5.teacheractivity11);
    //this.list5Form.controls.studentactivities11.setValue(lesson5.studentactivities11);
    //this.list5Form.controls.reviewerrecommendations11.setValue(lesson5.reviewerrecommendations11);

    //this.list5Form.controls.teacheractivity12.setValue(lesson5.teacheractivity12);
    //this.list5Form.controls.studentactivities12.setValue(lesson5.studentactivities12);
    //this.list5Form.controls.reviewerrecommendations12.setValue(lesson5.reviewerrecommendations12);

    //this.list5Form.controls.teacheractivity13.setValue(lesson5.teacheractivity13);
    //this.list5Form.controls.studentactivities13.setValue(lesson5.studentactivities13);
    //this.list5Form.controls.reviewerrecommendations13.setValue(lesson5.reviewerrecommendations13);

    this.boolVE1 = lesson5.boolVE1;
    this.boolVE2 = lesson5.boolVE2;
    this.boolVE3 = lesson5.boolVE3;
    this.boolVE4 = lesson5.boolVE4;
    this.boolVE5 = lesson5.boolVE5;
    this.boolVE6 = lesson5.boolVE6;
    this.boolVE7 = lesson5.boolVE7;
    this.boolVE8 = lesson5.boolVE8;
    this.boolVE9 = lesson5.boolVE9;


    if (lesson5.orderArray) {
      this.orderArray = lesson5.orderArray;
    }

    console.log('this.thisTheme=', this.thisTheme, this.thisThemeId);

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
    this.g7_2s.sendMessage(res);
  }

  sentCurrentMessage1(guideName: string, iNumber: number) {
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
    this.sentCurrentMessage('guide7_2', 1);
    this.sentCurrentMessage('guide7_2', 2);
    this.sentCurrentMessage('guide7_2', 3);
    this.sentCurrentMessage('guide7_2', 4);
    this.sentCurrentMessage('guide7_2', 5);
    this.sentCurrentMessage('guide7_2', 6);
    this.sentCurrentMessage('guide7_2', 7);
    this.sentCurrentMessage('guide7_2', 8);
    this.sentCurrentMessage('guide7_2', 9);
    this.sentCurrentMessage('guide7_2', 10);
    this.sentCurrentMessage('guide7_2', 11);
    this.sentCurrentMessage('guide7_2', 12);
    this.sentCurrentMessage('guide7_2', 13);

    this.sentCurrentMessage1('guide8', 1);
    this.sentCurrentMessage1('guide8', 2);
    this.sentCurrentMessage1('guide8', 3);
    this.sentCurrentMessage1('guide8', 4);
    this.sentCurrentMessage1('guide8', 5);
    this.sentCurrentMessage1('guide8', 6);
    this.sentCurrentMessage1('guide8', 7);
    this.sentCurrentMessage1('guide8', 8);
    this.sentCurrentMessage1('guide8', 9);
    this.sentCurrentMessage1('guide8', 10);
    this.sentCurrentMessage1('guide8', 11);
    this.sentCurrentMessage1('guide8', 12);
    this.sentCurrentMessage1('guide8', 13);

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
    objResult.Guide7Resultat11 = this.Guide7Resultat11;
    objResult.Guide7Resultat12 = this.Guide7Resultat12;
    objResult.Guide7Resultat13 = this.Guide7Resultat13;

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
    objResult.Guide8Resultat11 = this.Guide8Resultat11;
    objResult.Guide8Resultat12 = this.Guide8Resultat12;
    objResult.Guide8Resultat13 = this.Guide8Resultat13;


    console.log('objResult.Guide8Resultat1=', objResult.Guide8Resultat1);

    //objResult.teacheractivity = this.list5Form.controls.teacheractivity.value;
    //objResult.studentactivities = this.list5Form.controls.studentactivities.value;
    //objResult.reviewerrecommendations = this.list5Form.controls.reviewerrecommendations.value;

    //objResult.teacheractivity2 = this.list5Form.controls.teacheractivity2.value;
    //objResult.studentactivities2 = this.list5Form.controls.studentactivities2.value;
    //objResult.reviewerrecommendations2 = this.list5Form.controls.reviewerrecommendations2.value;

    //objResult.teacheractivity3 = this.list5Form.controls.teacheractivity3.value;
    //objResult.studentactivities3 = this.list5Form.controls.studentactivities3.value;
    //objResult.reviewerrecommendations3 = this.list5Form.controls.reviewerrecommendations3.value;

    //objResult.teacheractivity4 = this.list5Form.controls.teacheractivity4.value;
    //objResult.studentactivities4 = this.list5Form.controls.studentactivities4.value;
    //objResult.reviewerrecommendations4 = this.list5Form.controls.reviewerrecommendations4.value;

    //objResult.teacheractivity5 = this.list5Form.controls.teacheractivity5.value;
    //objResult.studentactivities5 = this.list5Form.controls.studentactivities5.value;
    //objResult.reviewerrecommendations5 = this.list5Form.controls.reviewerrecommendations5.value;

    //objResult.teacheractivity6 = this.list5Form.controls.teacheractivity6.value;
    //objResult.studentactivities6 = this.list5Form.controls.studentactivities6.value;
    //objResult.reviewerrecommendations6 = this.list5Form.controls.reviewerrecommendations6.value;

    //objResult.teacheractivity7 = this.list5Form.controls.teacheractivity7.value;
    //objResult.studentactivities7 = this.list5Form.controls.studentactivities7.value;
    //objResult.reviewerrecommendations7 = this.list5Form.controls.reviewerrecommendations7.value;

    //objResult.teacheractivity8 = this.list5Form.controls.teacheractivity8.value;
    //objResult.studentactivities8 = this.list5Form.controls.studentactivities8.value;
    //objResult.reviewerrecommendations8 = this.list5Form.controls.reviewerrecommendations8.value;

    //objResult.teacheractivity9 = this.list5Form.controls.teacheractivity9.value;
    //objResult.studentactivities9 = this.list5Form.controls.studentactivities9.value;
    //objResult.reviewerrecommendations9 = this.list5Form.controls.reviewerrecommendations9.value;

    //objResult.teacheractivity10 = this.list5Form.controls.teacheractivity10.value;
    //objResult.studentactivities10 = this.list5Form.controls.studentactivities10.value;
    //objResult.reviewerrecommendations10 = this.list5Form.controls.reviewerrecommendations10.value;

    //objResult.teacheractivity11 = this.list5Form.controls.teacheractivity11.value;
    //objResult.studentactivities11 = this.list5Form.controls.studentactivities11.value;
    //objResult.reviewerrecommendations11 = this.list5Form.controls.reviewerrecommendations11.value;

    //objResult.teacheractivity12 = this.list5Form.controls.teacheractivity12.value;
    //objResult.studentactivities12 = this.list5Form.controls.studentactivities12.value;
    //objResult.reviewerrecommendations12 = this.list5Form.controls.reviewerrecommendations12.value;

    //objResult.teacheractivity13 = this.list5Form.controls.teacheractivity13.value;
    //objResult.studentactivities13 = this.list5Form.controls.studentactivities13.value;
    //objResult.reviewerrecommendations13 = this.list5Form.controls.reviewerrecommendations13.value;

    objResult.boolVE1  = this.boolVE1;
    objResult.boolVE2  = this.boolVE2;
    objResult.boolVE3  = this.boolVE3;
    objResult.boolVE4  = this.boolVE4;
    objResult.boolVE5  = this.boolVE5;
    objResult.boolVE6  = this.boolVE6;
    objResult.boolVE7  = this.boolVE7;
    objResult.boolVE8  = this.boolVE8;
    objResult.boolVE9  = this.boolVE9;
    objResult.orderArray = this.orderArray;

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

    if (i === 11) {
      this.Guide7Resultat11 = event;
    }

    if (i === 12) {
      this.Guide7Resultat12 = event;
    }

    if (i === 13) {
      this.Guide7Resultat13 = event;
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

    if (i === 11) {
      this.Guide8Resultat11 = event;
    }

    if (i === 12) {
      this.Guide8Resultat12 = event;
    }

    if (i === 13) {
      this.Guide8Resultat13 = event;
    }

  }

  clickGroupDropVE(i: number) {
    if (i === 1) {
      this.boolVE1  = true;
      this.setOrder('boolVE1');
    }

    if (i === 2) {
      this.boolVE2  = true;
      this.setOrder('boolVE2');
    }

    if (i === 3) {
      this.boolVE3  = true;
      this.setOrder('boolVE3');
    }

    if (i === 4) {
      this.boolVE4  = true;
      this.setOrder('boolVE4');
    }

    if (i === 5) {
      this.boolVE5  = true;
    }

    if (i === 6) {
      this.boolVE6  = true;
    }

  }

  onClickDeleteVE(i: number) {
    if (i === 1) {
      this.boolVE1  = false;
      this.deleteOrder('boolVE1');
    }

    if (i === 2) {
      this.boolVE2  = false;
      this.deleteOrder('boolVE2');
    }

    if (i === 3) {
      this.boolVE3  = false;
      this.deleteOrder('boolVE3');
    }

    if (i === 4) {
      this.boolVE4  = false;
      this.deleteOrder('boolVE4');
    }

    if (i === 5) {
      this.boolVE5  = false;
    }

    if (i === 6) {
      this.boolVE6  = false;
    }

  }

  getOrderClass(stype: string) {
    //"block3 d-flex order-2";
    let res = "";
    if (this.orderArray.indexOf(stype) > -1) {
      const ind = this.orderArray.indexOf(stype) + 1;
      res = "block" + ind.toString() +" "+"d-flex order-" + ind.toString();
    }
    return res;
  }

}
