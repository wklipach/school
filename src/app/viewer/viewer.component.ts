import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {GuideService} from '../services/guide.service';
import {forkJoin} from "rxjs";


@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

  sNamePrint = 'АООП Вариант 1';

  lesson: any = {};
  fio = '';
  documentClassNameNumber = {id: -1, title: '--'};
  documentClassNameLetter = {id: -1, title: '--'};
  documentLessons = {id: -1, title: ''};
  documentTypeLesson = {id: -1, title: ''};
  documentType2Lesson = {id: -1, title: ''};

  documentObjectiveLessonList: any[] = [];
  documentPersonalLessonList: any[] = [];
  documentEquipmentList: any[] = [];

//  documentEquipment = {id: -1, title: ''};
//  documentGroupMethod = {id: -1, id_group: -1, title: ''};
//  documentMethod = {id: -1, id_group: -1, title: ''};
  fioTeacherhome = '';
  lessonTopic = '';
  lessonObjectives = '';
  curFormDate: Date;


  reviewerrecommendations = '';
  reviewerrecommendations2 = '';
  reviewerrecommendations3 = '';
  reviewerrecommendations4 = '';
  reviewerrecommendations5 = '';
  reviewerrecommendations6 = '';
  reviewerrecommendations7 = '';
  reviewerrecommendations8 = '';
  reviewerrecommendations9 = '';
  reviewerrecommendations10 = '';

  teacheractivity = '';
  teacheractivity2 = '';
  teacheractivity3 = '';
  teacheractivity4 = '';
  teacheractivity5 = '';
  teacheractivity6 = '';
  teacheractivity7 = '';
  teacheractivity8 = '';
  teacheractivity9 = '';
  teacheractivity10 = '';

  studentactivities = '';
  studentactivities2 = '';
  studentactivities3 = '';
  studentactivities4 = '';
  studentactivities5 = '';
  studentactivities6 = '';
  studentactivities7 = '';
  studentactivities8 = '';
  studentactivities9 = '';
  studentactivities10 = '';

  Guide7Resultat1: any[] = [];
  Guide7Resultat2: any[] = [];
  Guide7Resultat3: any[] = [];
  Guide7Resultat4: any[] = [];
  Guide7Resultat5: any[] = [];
  Guide7Resultat6: any[] = [];
  Guide7Resultat7: any[] = [];
  Guide7Resultat8: any[] = [];
  Guide7Resultat9: any[] = [];
  Guide7Resultat10: any[] = [];

  Guide8Resultat1: any[] = [];
  Guide8Resultat2: any[] = [];
  Guide8Resultat3: any[] = [];
  Guide8Resultat4: any[] = [];
  Guide8Resultat5: any[] = [];
  Guide8Resultat6: any[] = [];
  Guide8Resultat7: any[] = [];
  Guide8Resultat8: any[] = [];
  Guide8Resultat9: any[] = [];
  Guide8Resultat10: any[] = [];

  listBasicLearningActivities: any;
  guide8list: any[]  = [];

  constructor(private router: Router, private gs: GuideService, private auth: AuthService) {
    if (!this.auth.getViewPrintId()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    // this.lesson =  this.auth.getSchoolLesson();

    const lesson_id = this.auth.getViewPrintId();
    forkJoin([
      this.gs.selectCollection('classBasicLearningActions'),
      this.gs.getLesson(lesson_id)
    ]).subscribe(results => {
      this.guide8list = <any[]>results[0];
      this.lesson = results[1][0];
      this.loadData();
    });

  }

  loadData() {

    this.auth.getUserFromID(this.lesson.id_user).subscribe( user => {
      this.fio = user[0].fio;
    });

    this.documentClassNameNumber = this.lesson.objSummaryLesson.documentClassNameNumber;
    this.documentClassNameLetter = this.lesson.objSummaryLesson.documentClassNameLetter;


    this.curFormDate = new Date(this.lesson.objSummaryLesson.formControlDate[0]);
    this.fioTeacherhome = this.lesson.objSummaryLesson.fioteacherhome;
    this.documentLessons = this.lesson.objSummaryLesson.documentLessons;
    this.lessonTopic = this.lesson.objSummaryLesson.lessonTopic;
    this.lessonObjectives = this.lesson.objSummaryLesson.lessonObjectives;
    this.documentTypeLesson = this.lesson.objSummaryLesson.documentTypeLesson;
    this.documentType2Lesson = this.lesson.objSummaryLesson.documentType2Lesson;
    this.documentObjectiveLessonList = this.lesson.objSummaryLesson.documentObjectiveLessonList;
    this.documentPersonalLessonList = this.lesson.objSummaryLesson.documentPersonalLessonList;
    this.documentEquipmentList = this.lesson.objSummaryLesson.documentEquipmentList;

    // таблица
    const list5 = this.lesson.objSummaryLesson2;
    if (list5) {
      this.reviewerrecommendations = this.lesson.objSummaryLesson2.reviewerrecommendations;
      this.reviewerrecommendations2 = this.lesson.objSummaryLesson2.reviewerrecommendations2;
      this.reviewerrecommendations3 = this.lesson.objSummaryLesson2.reviewerrecommendations3;
      this.reviewerrecommendations4 = this.lesson.objSummaryLesson2.reviewerrecommendations4;
      this.reviewerrecommendations5 = this.lesson.objSummaryLesson2.reviewerrecommendations5;
      this.reviewerrecommendations6 = this.lesson.objSummaryLesson2.reviewerrecommendations6;
      this.reviewerrecommendations7 = this.lesson.objSummaryLesson2.reviewerrecommendations7;
      this.reviewerrecommendations8 = this.lesson.objSummaryLesson2.reviewerrecommendations8;
      this.reviewerrecommendations9 = this.lesson.objSummaryLesson2.reviewerrecommendations9;
      this.reviewerrecommendations10 = this.lesson.objSummaryLesson2.reviewerrecommendations10;

      this.teacheractivity = this.lesson.objSummaryLesson2.teacheractivity;
      this.teacheractivity2 = this.lesson.objSummaryLesson2.teacheractivity2;
      this.teacheractivity3 = this.lesson.objSummaryLesson2.teacheractivity3;
      this.teacheractivity4 = this.lesson.objSummaryLesson2.teacheractivity4;
      this.teacheractivity5 = this.lesson.objSummaryLesson2.teacheractivity5;
      this.teacheractivity6 = this.lesson.objSummaryLesson2.teacheractivity6;
      this.teacheractivity7 = this.lesson.objSummaryLesson2.teacheractivity7;
      this.teacheractivity8 = this.lesson.objSummaryLesson2.teacheractivity8;
      this.teacheractivity9 = this.lesson.objSummaryLesson2.teacheractivity9;
      this.teacheractivity10 = this.lesson.objSummaryLesson2.teacheractivity10;

      this.studentactivities = this.lesson.objSummaryLesson2.studentactivities;
      this.studentactivities2 = this.lesson.objSummaryLesson2.studentactivities2;
      this.studentactivities3 = this.lesson.objSummaryLesson2.studentactivities3;
      this.studentactivities4 = this.lesson.objSummaryLesson2.studentactivities4;
      this.studentactivities5 = this.lesson.objSummaryLesson2.studentactivities5;
      this.studentactivities6 = this.lesson.objSummaryLesson2.studentactivities6;
      this.studentactivities7 = this.lesson.objSummaryLesson2.studentactivities7;
      this.studentactivities8 = this.lesson.objSummaryLesson2.studentactivities8;
      this.studentactivities9 = this.lesson.objSummaryLesson2.studentactivities9;
      this.studentactivities10 = this.lesson.objSummaryLesson2.studentactivities10;

      this.Guide7Resultat1 = this.lesson.objSummaryLesson2.Guide7Resultat1;
      this.Guide7Resultat2 = this.lesson.objSummaryLesson2.Guide7Resultat2;
      this.Guide7Resultat3 = this.lesson.objSummaryLesson2.Guide7Resultat3;
      this.Guide7Resultat4 = this.lesson.objSummaryLesson2.Guide7Resultat4;
      this.Guide7Resultat5 = this.lesson.objSummaryLesson2.Guide7Resultat5;
      this.Guide7Resultat6 = this.lesson.objSummaryLesson2.Guide7Resultat6;
      this.Guide7Resultat7 = this.lesson.objSummaryLesson2.Guide7Resultat7;
      this.Guide7Resultat8 = this.lesson.objSummaryLesson2.Guide7Resultat8;
      this.Guide7Resultat9 = this.lesson.objSummaryLesson2.Guide7Resultat9;
      this.Guide7Resultat10 = this.lesson.objSummaryLesson2.Guide7Resultat10;

      this.Guide8Resultat1 = this.lesson.objSummaryLesson2.Guide8Resultat1;
      this.Guide8Resultat2 = this.lesson.objSummaryLesson2.Guide8Resultat2;
      this.Guide8Resultat3 = this.lesson.objSummaryLesson2.Guide8Resultat3;
      this.Guide8Resultat4 = this.lesson.objSummaryLesson2.Guide8Resultat4;
      this.Guide8Resultat5 = this.lesson.objSummaryLesson2.Guide8Resultat5;
      this.Guide8Resultat6 = this.lesson.objSummaryLesson2.Guide8Resultat6;
      this.Guide8Resultat7 = this.lesson.objSummaryLesson2.Guide8Resultat7;
      this.Guide8Resultat8 = this.lesson.objSummaryLesson2.Guide8Resultat8;
      this.Guide8Resultat9 = this.lesson.objSummaryLesson2.Guide8Resultat9;
      this.Guide8Resultat10 = this.lesson.objSummaryLesson2.Guide8Resultat10;

     }
  }

  Guide8Filter(id_element): string {
    return this.guide8list.filter(value => {
      return value.id === id_element;
    })[0].title;
  }

  print() {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').outerHTML;
    console.log('printContents=', printContents);
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();

/*
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
        </head>

         <body onload="window.print();window.close()">${printContents}</body>

      </html>`
    );
*/

    popupWin.document.write(`
         <body onload="window.print();">${printContents}</body>
    `);
    popupWin.document.close();
  }

}
