import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GuideService } from '../services/guide.service';
import {Guide7_2Service} from "../components/guide7_2/guide7_2.service";

@Component({
  selector: 'app-list5-v2',
  templateUrl: './list5-v2.component.html',
  styleUrls: ['./list5-v2.component.css']
})
export class List5V2Component implements OnInit {

   documentGuide10List = [];
   documentGuide10AggregateList = [];
   checkArray: any = [];

  boolVE1  = false;
  boolVE2  = false;
  boolVE3  = false;

  thisThemeId = -1;
  thisTheme = '---';
  edititing_id = '-1';
  typeEdit = 'новый документ';

  UserInfo = {schoolLogin: '', bSchoolConnected: false, id_user_school: '', editor: 0};
  list5v2Form: FormGroup;
  Guide7Resultat1 = [];
  // Guide7Resultat2 = [];
  Guide7Resultat3 = [];
  Guide7Resultat4 = [];
  Guide7Resultat5 = [];
  Guide7Resultat6 = [];
  Guide7Resultat7 = [];
  Guide7Resultat8 = [];
 // Guide7Resultat9 = [];
  Guide7Resultat10 = [];
  Guide7Resultat11 = [];
  Guide7Resultat12 = [];
  inputDocumentComponentMethodList1: any[] = [];
  // inputDocumentComponentMethodList2: any[] = [];
  inputDocumentComponentMethodList3: any[] = [];
  inputDocumentComponentMethodList4: any[] = [];
  inputDocumentComponentMethodList5: any[] = [];
  inputDocumentComponentMethodList6: any[] = [];
  inputDocumentComponentMethodList7: any[] = [];
  inputDocumentComponentMethodList8: any[] = [];
  // inputDocumentComponentMethodList9: any[] = [];
  inputDocumentComponentMethodList10: any[] = [];


  inputDocumentComponentMethodList11: any[] = [];
  inputDocumentComponentMethodList12: any[] = [];

  constructor(private router: Router, private gs: GuideService,
    private auth: AuthService, private g7_2s: Guide7_2Service) {

    this.UserInfo = this.auth.getStorage();
    if (!this.UserInfo.bSchoolConnected) {
      this.router.navigate(['/login']);
    }

    this.list5v2Form = new FormGroup({
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
          this.thisThemeId = document.objSummaryLesson.documentTypeLesson.id;
          // console.log('this.thisThemeId ===', this.thisThemeId);
          this.thisTheme = document.objSummaryLesson.documentTypeLesson.title;
        }
      }
    });

    this.loadLesson();

    if (this.auth.getSaveDocumentEdit()) {
      this.typeEdit = 'редактирование документа';
    } else {
      this.typeEdit = 'новый документ';
    }

  }

  loadLesson() {
    // если это редактирование урока, загружаем урок из базы
    if (this.auth.getSaveDocumentEdit()) {
      this.edititing_id = this.auth.getSaveDocumentId();
      this.gs.getLesson(this.edititing_id).subscribe( (lesson: []) => {
        if (lesson) {
          if (lesson.length > 0) {

            const lesson4v2 = (lesson as any[])[0].objSummaryLesson;
            const lesson5v2 = (lesson as any[])[0].objSummaryLesson2;
            // this.loadDataPriorLesson(lesson4v2);
            this.loadDataForLesson(lesson5v2, lesson4v2);
          }
        }
      });
    }
  }

  loadDataPriorLesson(lesson4v2) {


      // console.log('lesson4v2.documentTypeLesson=', lesson4v2.documentTypeLesson);
  }

  loadDataForLesson(lesson5v2, lesson4v2) {

    let curThemeId = -1;
    if (lesson4v2.documentTypeLesson.id) {
      curThemeId = lesson4v2.documentTypeLesson.id;
    }

    if (!lesson5v2) {
      return;
    }

    this.inputDocumentComponentMethodList1 = lesson5v2.Guide7Resultat1;
    // this.inputDocumentComponentMethodList2 = lesson5v2.Guide7Resultat2;
    this.inputDocumentComponentMethodList3 = lesson5v2.Guide7Resultat3;
    this.inputDocumentComponentMethodList4 = lesson5v2.Guide7Resultat4;
    this.inputDocumentComponentMethodList5 = lesson5v2.Guide7Resultat5;
    this.inputDocumentComponentMethodList6 = lesson5v2.Guide7Resultat6;


    if (curThemeId === 1 || curThemeId === 2 || curThemeId === 3) {
      this.inputDocumentComponentMethodList7 = lesson5v2.Guide7Resultat7;
    }

    this.inputDocumentComponentMethodList8 = lesson5v2.Guide7Resultat8;
    // this.inputDocumentComponentMethodList9 = lesson5v2.Guide7Resultat9;
    this.inputDocumentComponentMethodList10 = lesson5v2.Guide7Resultat10;

    if (curThemeId === 2 || curThemeId === 3) {
      if (lesson5v2.Guide7Resultat11) {
        this.inputDocumentComponentMethodList11 = lesson5v2.Guide7Resultat11;
      }
    }

    if (curThemeId === 4) {
      if (lesson5v2.Guide7Resultat12) {
        this.inputDocumentComponentMethodList12 = lesson5v2.Guide7Resultat12;
      }
    }

/*
    this.checkArray = lesson5v2.documentGuide10AggregateList;
    this.checkArray.forEach( (value) => {
      this.documentGuide10List.push({delete: 0});
    });
*/

    this.boolVE1 = lesson5v2.boolVE1;
    this.boolVE2 = lesson5v2.boolVE2;
    this.boolVE3 = lesson5v2.boolVE3;

  }


/*
    onResGuide10(event: [], i: number) {
      this.documentGuide10AggregateList[i-1] =  event;
  }
*/

  onResGuide7(event: [], i: number) {
    if (i === 1) {
      this.Guide7Resultat1 = event;
    }

//    if (i === 2) {
//      this.Guide7Resultat2 = event;
//    }

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

//    if (i === 9) {
//      this.Guide7Resultat9 = event;
//    }

    if (i === 10) {
      this.Guide7Resultat10 = event;
    }

    if (i === 11) {
      this.Guide7Resultat11 = event;
    }

    if (i === 12) {
      this.Guide7Resultat12 = event;
    }

  }

  sentCurrentMessage(guideName: string, iNumber: number) {
    const res = {message: guideName, i: iNumber};
    // console.log('передаем', res );
    this.g7_2s.sendMessage(res);
  }

  saveList5v2() {
    // получаем номер id
    const id = this.auth.getSaveDocumentId();


    // получаем все справочники
    const objResult: {[k: string]: any} = {};

/*
    this.documentGuide10List.forEach( (value, index) => {
      if (value.delete === 0) {
        this.sentCurrentMessage('guide10', index + 1);
      }
    });

    // удаляем из массива null
    const curAggregateList = [];
    this.documentGuide10AggregateList.forEach( value =>{
          if (value) {
            curAggregateList.push(value);
          }
    });
    objResult.documentGuide10AggregateList = curAggregateList;
*/

    this.sentCurrentMessage('guide7_2', 1);
    this.sentCurrentMessage('guide7_2', 3);
    this.sentCurrentMessage('guide7_2', 4);
    this.sentCurrentMessage('guide7_2', 5);
    this.sentCurrentMessage('guide7_2', 6);
    this.sentCurrentMessage('guide7_2', 7);
    this.sentCurrentMessage('guide7_2', 8);
    this.sentCurrentMessage('guide7_2', 10);
    this.sentCurrentMessage('guide7_2', 11);
    this.sentCurrentMessage('guide7_2', 12);
    objResult.Guide7Resultat1 = this.Guide7Resultat1;
    objResult.Guide7Resultat3 = this.Guide7Resultat3;
    objResult.Guide7Resultat4 = this.Guide7Resultat4;
    objResult.Guide7Resultat5 = this.Guide7Resultat5;
    objResult.Guide7Resultat6 = this.Guide7Resultat6;
    objResult.Guide7Resultat7 = this.Guide7Resultat7;
    objResult.Guide7Resultat8 = this.Guide7Resultat8;
    objResult.Guide7Resultat10 = this.Guide7Resultat10;
    objResult.Guide7Resultat11 = this.Guide7Resultat11;
    objResult.Guide7Resultat12 = this.Guide7Resultat12;

    objResult.boolVE1  = this.boolVE1;
    objResult.boolVE2  = this.boolVE2;
    objResult.boolVE3  = this.boolVE3;

    // console.log('objResult=', objResult);

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


  clickGroupDropVE(i: number) {
    if (i === 1) {
      this.boolVE1  = true;
    }

    if (i === 2) {
      this.boolVE2  = true;
    }

    if (i === 3) {
      this.boolVE3  = true;
    }
  }

  onClickDeleteVE(i: number) {
    if (i === 1) {
      this.boolVE1  = false;
      this.list5v2Form.controls.teacheractivity3.setValue('');
      this.list5v2Form.controls.studentactivities3.setValue('');
      this.list5v2Form.controls.reviewerrecommendations3.setValue('');
    }

    if (i === 2) {
      this.boolVE2  = false;
      this.list5v2Form.controls.teacheractivity4.setValue('');
      this.list5v2Form.controls.studentactivities4.setValue('');
      this.list5v2Form.controls.reviewerrecommendations4.setValue('');
    }

    if (i === 3) {
      this.boolVE3  = false;
      this.list5v2Form.controls.teacheractivity5.setValue('');
      this.list5v2Form.controls.studentactivities5.setValue('');
      this.list5v2Form.controls.reviewerrecommendations5.setValue('');
    }

  }

  onClickDeleteGuide10List(DOL: any) {
    DOL.delete = 1;
  }


  onAddStudent() {
    const documentObjectiveLesson = {delete: 0};
    const newIndex = this.documentGuide10List.push(documentObjectiveLesson) - 1;
    // console.log('newIndex=', newIndex);
    // this.list5v2Form.addControl('subjectResults' + newIndex.toString(), new FormControl(''));

  }


}
