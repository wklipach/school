import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {GuideService} from '../services/guide.service';
import {forkJoin} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import printJS from 'print-js'
import { jsPDF } from "jspdf";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-viewer-v2',
  templateUrl: './viewer-v2.component.html',
  styleUrls: ['./viewer-v2.component.css']
})
export class ViewerV2Component implements OnInit {

  MARGIN_LEFT = 5;
  textHeight = 5;
  positionY = 5;

  partEnd = false;
  partBase = false;
  partBegin = false;
  boolVE1  = false;
  boolVE2  = false;
  boolVE3  = false;
  thisThemeId = -1;

  sNamePrint = 'АООП Вариант 2';

  lesson: any = {};
  fio = '';
  documentClassNameNumber = {id: -1, title: '--'};
  documentClassNameLetter = {id: -1, title: '--'};
  documentLessons2 = {id: -1, title: ''};
  documentTypeLesson = {id: -1, title: ''};
  documentType2Lesson = {id: -1, title: ''};
  documentEquipmentList: any[] = [];

  fioTeacherhome = '';
  lessonTopic = '';
  lessonObjectives = '';
  lessonTasks = '';
  curFormDate: Date;

  listClassEducationalTasksV2: any;
  listClassCorrectionalTasksV2: any;
  listClassRaisetionalTasksV2: any;

  /*
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
*/


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
  Guide7Resultat11: any[] = [];
  Guide7Resultat12: any[] = [];

/*
  Guide10Resultat1: any[] = [];
  Guide10Resultat2: any[] = [];
  Guide10Resultat3: any[] = [];
  Guide10Resultat4: any[] = [];
  Guide10Resultat5: any[] = [];
  Guide10Resultat6: any[] = [];
  Guide10Resultat7: any[] = [];
  Guide10Resultat8: any[] = [];
  Guide10Resultat9: any[] = [];
  Guide10Resultat10: any[] = [];
*/

documentGuide10AggregateList: any[] = [];

  guide2linesResultat1: any[] = [];
  guide10list: any[] = [];

  taskList: any[] = [];
  taskList1: any[] = [];
  taskList2: any[] = [];
  taskList3: any[] = [];

  UserInfo = {schoolLogin: '', bSchoolConnected: false, id_user_school: '', editor: 0};

  constructor(private router: Router,
              private gs: GuideService,
              private auth: AuthService,
              private http: HttpClient,
              private datePipe: DatePipe) {

    if (!this.auth.getViewPrintId()) {
      this.router.navigate(['/']);
    }

    this.UserInfo = this.auth.getStorage();
    if (!this.UserInfo.bSchoolConnected) {
      this.router.navigate(['/login']);
    }

  }

  ngOnInit(): void {
    const lesson_id = this.auth.getViewPrintId();
    forkJoin([
      this.gs.selectCollection('classBasicLearningActions'),
      this.gs.getLesson(lesson_id),
      this.gs.selectCollection('classEducationalTasksV2'),
      this.gs.selectCollection('classCorrectionalTasksV2'),
      this.gs.selectCollection('classRaisetionalTasksV2')
    ]).subscribe(results => {
        this.guide10list = <any[]>results[0];
        this.lesson = results[1][0];

        this.listClassEducationalTasksV2 = <any[]>results[2];
        this.listClassCorrectionalTasksV2 = <any[]>results[3];
        this.listClassRaisetionalTasksV2 = <any[]>results[4];
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
    this.documentLessons2 = this.lesson.objSummaryLesson.documentLessons2;
    this.lessonTopic = this.lesson.objSummaryLesson.lessonTopic;
    this.lessonObjectives = this.lesson.objSummaryLesson.lessonObjectives;

    if (this.lesson.objSummaryLesson.lessonTasks) {
      this.lessonTasks = this.lesson.objSummaryLesson.lessonTasks;
    }


    this.documentTypeLesson = this.lesson.objSummaryLesson.documentTypeLesson;
    this.documentType2Lesson = this.lesson.objSummaryLesson.documentType2Lesson;
    // this.documentObjectiveLessonList = this.lesson.objSummaryLesson.documentObjectiveLessonList;
    // this.documentPersonalLessonList = this.lesson.objSummaryLesson.documentPersonalLessonList;
    this.documentEquipmentList = this.lesson.objSummaryLesson.documentEquipmentList;

    // таблица
    const list5 = this.lesson.objSummaryLesson2;
    if (list5) {

/*
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
*/


      this.Guide7Resultat1 = this.lesson.objSummaryLesson2.Guide7Resultat1;
      console.log('this.Guide7Resultat1=', this.Guide7Resultat1);
      this.Guide7Resultat2 = this.lesson.objSummaryLesson2.Guide7Resultat2;
      this.Guide7Resultat3 = this.lesson.objSummaryLesson2.Guide7Resultat3;
      this.Guide7Resultat4 = this.lesson.objSummaryLesson2.Guide7Resultat4;
      this.Guide7Resultat5 = this.lesson.objSummaryLesson2.Guide7Resultat5;
      this.Guide7Resultat6 = this.lesson.objSummaryLesson2.Guide7Resultat6;
      this.Guide7Resultat7 = this.lesson.objSummaryLesson2.Guide7Resultat7;
      this.Guide7Resultat8 = this.lesson.objSummaryLesson2.Guide7Resultat8;
      this.Guide7Resultat9 = this.lesson.objSummaryLesson2.Guide7Resultat9;
      this.Guide7Resultat10 = this.lesson.objSummaryLesson2.Guide7Resultat10;
      this.Guide7Resultat11 = this.lesson.objSummaryLesson2.Guide7Resultat11;
      this.Guide7Resultat12 = this.lesson.objSummaryLesson2.Guide7Resultat12;
      // дволной справочник берется именно из objSummaryLesson, а не objSummaryLesson2
      this.guide2linesResultat1 = this.lesson.objSummaryLesson.guide2linesResultat1;

      /*
      this.Guide10Resultat1 = this.lesson.objSummaryLesson2.Guide10Resultat1;
      this.Guide10Resultat2 = this.lesson.objSummaryLesson2.Guide10Resultat2;
      this.Guide10Resultat3 = this.lesson.objSummaryLesson2.Guide10Resultat3;
      this.Guide10Resultat4 = this.lesson.objSummaryLesson2.Guide10Resultat4;
      this.Guide10Resultat5 = this.lesson.objSummaryLesson2.Guide10Resultat5;
      this.Guide10Resultat6 = this.lesson.objSummaryLesson2.Guide10Resultat6;
      this.Guide10Resultat7 = this.lesson.objSummaryLesson2.Guide10Resultat7;
      this.Guide10Resultat8 = this.lesson.objSummaryLesson2.Guide10Resultat8;
      this.Guide10Resultat9 = this.lesson.objSummaryLesson2.Guide10Resultat9;
      this.Guide10Resultat10 = this.lesson.objSummaryLesson2.Guide10Resultat10;
      */

     this.documentGuide10AggregateList = this.lesson.objSummaryLesson2.documentGuide10AggregateList;

     this.boolVE1 = this.lesson.objSummaryLesson2.boolVE1;
     this.boolVE2 = this.lesson.objSummaryLesson2.boolVE2;
     this.boolVE3 = this.lesson.objSummaryLesson2.boolVE3;

     this.thisThemeId = -1;
     if (this.lesson.objSummaryLesson.documentTypeLesson.id) {
      this.thisThemeId = this.lesson.objSummaryLesson.documentTypeLesson.id;
     }


     if (this.Guide7Resultat1.length > 0 || this.Guide7Resultat3.length > 0 ||
      this.Guide7Resultat4.length > 0 || this.Guide7Resultat5.length > 0) {
        this.partBegin = true;
    }


     if (this.Guide7Resultat6.length > 0 || this.Guide7Resultat7.length > 0 ||
         this.Guide7Resultat11.length > 0 || this.Guide7Resultat12.length > 0) {
           this.partBase = true;

     }

     if (this.Guide7Resultat8.length > 0 || this.Guide7Resultat10.length > 0) {
       console.log('есть заключительный  этап');
       this.partEnd = true;
     };

    }


    this.taskList = [];
    this.taskList1 = [];
    this.taskList2 = [];
    this.taskList3 = [];
    if (this.lesson.objSummaryLesson.EducationalTasks1 && this.lesson.objSummaryLesson.EducationalTasks1.id !== -1) {

              const title = this.listClassEducationalTasksV2.find(value =>
                                                value.id === this.lesson.objSummaryLesson.EducationalTasks1.id).title;
              this.taskList.push({title,
                                  text: this.lesson.objSummaryLesson.EducationalTasks1.text,
                                  type: 1,
                                  sortindex: 1
                                });
    }

    if (this.lesson.objSummaryLesson.EducationalTasks2 && this.lesson.objSummaryLesson.EducationalTasks2.id !== -1) {
      const title = this.listClassEducationalTasksV2.find(value => value.id === this.lesson.objSummaryLesson.EducationalTasks2.id).title;
      this.taskList.push({title,
                          text: this.lesson.objSummaryLesson.EducationalTasks2.text,
                          type: 1,
                          sortindex: 2
                        });
    }

    if (this.lesson.objSummaryLesson.EducationalTasks3 && this.lesson.objSummaryLesson.EducationalTasks3.id !== -1) {
      const title = this.listClassEducationalTasksV2.find(value => value.id === this.lesson.objSummaryLesson.EducationalTasks3.id).title;
      this.taskList.push({title,
                          text: this.lesson.objSummaryLesson.EducationalTasks3.text,
                          type: 1,
                          sortindex: 3
                        });
    }


    if (this.lesson.objSummaryLesson.CorrectionalTasks1 && this.lesson.objSummaryLesson.CorrectionalTasks1.id !== -1) {
      const title = this.listClassCorrectionalTasksV2.find(value => value.id === this.lesson.objSummaryLesson.CorrectionalTasks1.id).title;
      this.taskList.push({title,
                          text: this.lesson.objSummaryLesson.CorrectionalTasks1.text,
                          type: 2,
                          sortindex: 4
                        });
    }

    if (this.lesson.objSummaryLesson.CorrectionalTasks2 && this.lesson.objSummaryLesson.CorrectionalTasks2.id !== -1) {
      const title = this.listClassCorrectionalTasksV2.find(value => value.id === this.lesson.objSummaryLesson.CorrectionalTasks2.id).title;
      this.taskList.push({title,
                          text: this.lesson.objSummaryLesson.CorrectionalTasks2.text,
                          type: 2,
                          sortindex: 5
                        });
    }

    if (this.lesson.objSummaryLesson.CorrectionalTasks3 && this.lesson.objSummaryLesson.CorrectionalTasks3.id !== -1) {
      const title = this.listClassCorrectionalTasksV2.find(value => value.id === this.lesson.objSummaryLesson.CorrectionalTasks3.id).title;
      this.taskList.push({title,
                          text: this.lesson.objSummaryLesson.CorrectionalTasks3.text,
                          type: 2,
                          sortindex: 6
                        });
    }


    if (this.lesson.objSummaryLesson.RaisetionalTasks1 && this.lesson.objSummaryLesson.RaisetionalTasks1.id !== -1) {
      const title = this.listClassRaisetionalTasksV2.find(value => value.id === this.lesson.objSummaryLesson.RaisetionalTasks1.id).title;
      this.taskList.push({title,
                          text: this.lesson.objSummaryLesson.RaisetionalTasks1.text,
                          type: 3,
                          sortindex: 7
                        });
    }

    if (this.lesson.objSummaryLesson.RaisetionalTasks2 && this.lesson.objSummaryLesson.RaisetionalTasks2.id !== -1) {
      const title = this.listClassRaisetionalTasksV2.find(value => value.id === this.lesson.objSummaryLesson.RaisetionalTasks2.id).title;
      this.taskList.push({title,
                          text: this.lesson.objSummaryLesson.RaisetionalTasks2.text,
                          type: 3,
                          sortindex: 8
                        });
    }

    if (this.lesson.objSummaryLesson.RaisetionalTasks3 && this.lesson.objSummaryLesson.RaisetionalTasks3.id !== -1) {
      const title = this.listClassRaisetionalTasksV2.find(value => value.id === this.lesson.objSummaryLesson.RaisetionalTasks3.id).title;
      this.taskList.push({title,
                          text: this.lesson.objSummaryLesson.RaisetionalTasks3.text,
                          type: 3,
                          sortindex: 9
                        });
    }

    this.taskList = this.taskList.sort(this.compare);
    this.taskList1 = this.taskList.filter(x => x.type === 1);
    this.taskList2 = this.taskList.filter(x => x.type === 2);
    this.taskList3 = this.taskList.filter(x => x.type === 3);

    // console.log('this.taskList=', this.taskList);
    // console.log('this.taskList=', this.taskList.sort(this.compare));

  }

  compare(a, b) {
    if ( a.sortindex < b.sortindex ){
      return -1;
    }
    if ( a.sortindex > b.sortindex ){
      return 1;
    }
    return 0;
  }

  Guide10Filter(id_element): string {
    return this.guide10list.filter(value => {
      return value.id === id_element;
    })[0].title;
  }

  print() {
    this.print4x();
    // this.print4x_2();
  }


  print4x() {



    this.http.get('assets/viewer.txt', { responseType: 'text' }).subscribe( data =>  {
      const printContent = document.getElementById('contentToConvert');
      const WindowPrt = window.open('', '', 'left=0,top=0,width=100,height=100,toolbar=0,scrollbars=0,status=0');

      // screen.orientation.lock('landscape');

/*
      WindowPrt.document.write('<html><head>' +
        '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" ' +
        'integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">'+
        '<style>' +
        data +
        '</style></head>');
*/


    const strBegin = '<html><head>' +
      '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"' +
      'integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">'+
      '<style type = "text/css">  @page { size: landscape; }' +
      data +
      '</style></head>';

      WindowPrt.document.write(strBegin);
      WindowPrt.document.write(printContent.innerHTML + '</html>');

      console.log(strBegin+ printContent.innerHTML + '</html>');

      WindowPrt.document.close();
      WindowPrt.focus();
      // WindowPrt.screen.orientation.lock('landscape');
      WindowPrt.print();
      // WindowPrt.close();
    });
  }

  orrr() {
   // screen.orientation.lock('landscape');
    screen.orientation.lock('landscape-primary');
 }

  ready() {
    const { type } = screen.orientation;
    console.log(`Fullscreen and locked to ${type}. Ready!`);
  }

  print4x_2() {
    printJS({
      printable: 'contentToConvert',
      type: 'html',
      style: '@page { size: A4 landscape; }'
    })
  }



  private addText(pdf: jsPDF, text) {
    //if (this.positionY + textHeight > (this.pdf.internal.pages.height - MARGIN_BOTTOM)) {
    //  this.addPage();
    //}
    pdf.text(text, this.MARGIN_LEFT, this.positionY + this.textHeight);
    this.positionY += this.textHeight;
  }


  start() {
    const doc = new jsPDF();

    doc.addFont("assets/a_AntiqueTrady.ttf", "AntiqueTrady", "normal");
    doc.setFont("AntiqueTrady"); // set font
    doc.setFontSize(10);

    // обнуляем пеерменные
    this.MARGIN_LEFT = 5;
    this.textHeight = 5;
    this.positionY = 5;


    this.addText(doc, 'Дата: ' + this.datePipe.transform(this.curFormDate, 'dd.MM.yyyy'));
    this.addText(doc, 'Учитель: '+ this.fio);
    this.addText(doc, 'Класс: '+ this.documentClassNameLetter.title);
    this.addText(doc, 'ФИО обучающего (индивидуальное обучение): '+ this.fioTeacherhome);
    this.addText(doc, 'Учебный предмет: '+ this.documentLessons2.title);

    this.addText(doc, 'Тема урока: '+ this.lessonTopic);
    this.addText(doc, 'Цель урока: '+ this.lessonObjectives);
    this.addText(doc, 'Тип урока: '+ this.documentTypeLesson.title);
    this.addText(doc, 'Форма проведения урока(вид урока): '+ this.documentType2Lesson.title);

    doc.save("viewer-v2.pdf");
  }



}
