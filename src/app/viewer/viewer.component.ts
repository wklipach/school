import {Component, OnInit, SecurityContext} from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {GuideService} from "../services/guide.service";
import {forkJoin} from "rxjs";
import { HttpClient } from "@angular/common/http";

import { jsPDF } from "jspdf";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import printJS from "print-js";

// import * as jsPDF from 'jspdf';



@Component({
  selector: "app-viewer",
  templateUrl: "./viewer.component.html",
  styleUrls: ["./viewer.component.css"]
})

export class ViewerComponent implements OnInit {

  partEnd = false;
  partBase = false;
  partBegin = false;


  sNamePrint = "АООП Вариант 1";
  UserInfo = {schoolLogin: "", bSchoolConnected: false, id_user_school: "", editor: 0};
  lesson: any = {};
  fio = "";
  documentClassNameNumber = {id: -1, title: "--"};
  documentClassNameLetter = {id: -1, title: "--"};
  documentLessons = {id: -1, title: ""};
  documentTypeLesson = {id: -1, title: ""};
  documentType2Lesson = {id: -1, title: ""};

  documentObjectiveLessonList: any[] = [];
  documentPersonalLessonList: any[] = [];
  documentEquipmentList: any[] = [];


  taskList: any[] = [];
  taskList1: any[] = [];
  taskList2: any[] = [];
  taskList3: any[] = [];
  listClassEducationalTasksV1: any;
  listClassCorrectionalTasksV1: any;
  listClassRaisetionalTasksV1: any;

//  documentEquipment = {id: -1, title: ''};
//  documentGroupMethod = {id: -1, id_group: -1, title: ''};
//  documentMethod = {id: -1, id_group: -1, title: ''};
  fioTeacherhome = "";
  lessonTopic = "";
  lessonObjectives = "";
  lessonTasks = "";
  curFormDate: Date;


  reviewerrecommendations = "";
  reviewerrecommendations2 = "";
  reviewerrecommendations3 = "";
  reviewerrecommendations4 = "";
  reviewerrecommendations5 = "";
  reviewerrecommendations6 = "";
  reviewerrecommendations7 = "";
  reviewerrecommendations8 = "";
  reviewerrecommendations9 = "";
  reviewerrecommendations10 = "";

  teacheractivity = "";
  teacheractivity2 = "";
  teacheractivity3 = "";
  teacheractivity4 = "";
  teacheractivity5 = "";
  teacheractivity6 = "";
  teacheractivity7 = "";
  teacheractivity8 = "";
  teacheractivity9 = "";
  teacheractivity10 = "";

  studentactivities = "";
  studentactivities2 = "";
  studentactivities3 = "";
  studentactivities4 = "";
  studentactivities5 = "";
  studentactivities6 = "";
  studentactivities7 = "";
  studentactivities8 = "";
  studentactivities9 = "";
  studentactivities10 = "";

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

  // listBasicLearningActivities: any;
  guide8list: any[]  = [];

  constructor(private router: Router, private gs: GuideService,
              private auth: AuthService, private http: HttpClient,
              private _sanitizer: DomSanitizer) {

    if (!this.auth.getViewPrintId()) {
      this.router.navigate(["/"]);
    }

    this.UserInfo = this.auth.getStorage();
    if (!this.UserInfo.bSchoolConnected) {
      this.router.navigate(["/login"]);
    }

   }



  ngOnInit(): void {

    // this.lesson =  this.auth.getSchoolLesson();

    const lesson_id = this.auth.getViewPrintId();
    forkJoin([
      this.gs.selectCollection("classBasicLearningActivities"),
      this.gs.getLesson(lesson_id),
      this.gs.selectCollection("classEducationalTasksV1"),
      this.gs.selectCollection("classCorrectionalTasksV1"),
      this.gs.selectCollection("classRaisetionalTasksV1")

    ]).subscribe(results => {
      this.guide8list = <any[]>results[0];
      this.lesson = results[1][0];
      this.listClassEducationalTasksV1 = <any[]>results[2];
      this.listClassCorrectionalTasksV1 = <any[]>results[3];
      this.listClassRaisetionalTasksV1 = <any[]>results[4];

      this.loadData();
    });

  }



  loadData() {

    this.auth.getUserFromID(this.lesson.id_user).subscribe( user => {
      this.fio = user[0].fio.toString();
    });

    this.documentClassNameNumber = this.lesson.objSummaryLesson.documentClassNameNumber;
    this.documentClassNameLetter = this.lesson.objSummaryLesson.documentClassNameLetter;


    this.curFormDate = new Date(this.lesson.objSummaryLesson.formControlDate[0]);

    this.fioTeacherhome = this.lesson.objSummaryLesson.fioteacherhome.toCurHTML();
    this.documentLessons = this.lesson.objSummaryLesson.documentLessons;


    //this._sanitizer.sanitize(SecurityContext.HTML, title); this.lesson.objSummaryLesson.lessonTopic.toCurHTML()
    this.lessonTopic = this.lesson.objSummaryLesson.lessonTopic.toCurHTML();

    // console.log("toCurHTML=", this.lessonTopic.toCurHTML());

    this.lessonObjectives = this.lesson.objSummaryLesson.lessonObjectives.toCurHTML();

    if (this.lesson.objSummaryLesson.lessonTasks) {
      this.lessonTasks = this.lesson.objSummaryLesson.lessonTasks;
    }

    this.documentTypeLesson = this.lesson.objSummaryLesson.documentTypeLesson;
    this.documentType2Lesson = this.lesson.objSummaryLesson.documentType2Lesson;
    this.documentObjectiveLessonList = this.lesson.objSummaryLesson.documentObjectiveLessonList;
    this.documentPersonalLessonList = this.lesson.objSummaryLesson.documentPersonalLessonList;
    this.documentEquipmentList = this.lesson.objSummaryLesson.documentEquipmentList;


    // задачи из листа 4
    this.loadTask(this.lesson.objSummaryLesson);

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


      if (this.Guide7Resultat1.length > 0 || this.Guide7Resultat2.length > 0 ||
          this.Guide7Resultat3.length > 0 || this.Guide7Resultat4.length > 0 || this.Guide7Resultat5.length > 0 ||
          this.Guide8Resultat1.length > 0 || this.Guide8Resultat2.length > 0 ||
          this.Guide8Resultat3.length > 0 || this.Guide8Resultat4.length > 0 || this.Guide8Resultat5.length > 0) {
          this.partBegin = true;
      };


      if (this.Guide7Resultat6.length > 0 || this.Guide7Resultat7.length > 0 ||
          this.Guide8Resultat6.length > 0 || this.Guide8Resultat7.length > 0 ||
          this.teacheractivity6.length > 0 || this.teacheractivity6.length > 0 ||
          this.teacheractivity7.length > 0 || this.studentactivities7.length > 0) {

          this.partBase = true;
      };


      if (this.Guide7Resultat8.length > 0 || this.Guide7Resultat9.length > 0 || this.Guide7Resultat10.length > 0 ||
          this.Guide8Resultat8.length > 0 || this.Guide8Resultat9.length > 0 || this.Guide8Resultat10.length > 0) {
          this.partEnd = true;
      };


     }
  }

  Guide8Filter(id_element): string {
    return this.guide8list.filter(value => {
      return value.id === id_element;
    })[0].title;
  }

  print() {
    this.print4x();
  }

  print4x_2() {

    printJS({
      printable: "contentToConvert",
      type: "html",
      css: "/assets/viewer.component.css",
      style: "@page { size: A4 landscape; }"
    });
  }



  print4x() {
  forkJoin([
    this.http.get("https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css", { responseType: "text" }),
    this.http.get("assets/viewer.component.css", { responseType: "text" })
  ]).subscribe(results => {

    const printContent = document.getElementById("contentToConvert");
    const WindowPrt = window.open("100", "100", "width=900,height=500,toolbar=0,scrollbars=0,status=0,location=no");

    let sText = "<html><head><style>" + results[0] + results[1] + "</style>" + "</head>";
    sText = sText  + printContent.innerHTML + "</html>";

    WindowPrt.document.write(sText);

    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();

  });

  }

/*
print4x() {
        this.http.get('assets/viewer.txt', { responseType: 'text' }).subscribe( data =>  {
              const printContent = document.getElementById('contentToConvert');
              const WindowPrt = window.open('100', '100', 'width=900,height=500,toolbar=0,scrollbars=0,status=0,location=no');

              let sText =
              '<html><head>' +
              '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css">' +
              '<style>' +
               data +
              '</style>' +
              '</head>';

              sText = sText  + printContent.innerHTML + '</html>';


              console.log('ЭТО СТРАНИЦА');
              console.log(sText);
              console.log('СТРАНИЦА ЗАКОНЧЕНА');

              WindowPrt.document.write(sText);

              WindowPrt.document.close();
              WindowPrt.focus();
              WindowPrt.print();
              WindowPrt.close();
      });
}
*/

loadTask(objSummaryLesson) {

  this.taskList = [];
  this.taskList1 = [];
  this.taskList2 = [];
  this.taskList3 = [];

  if (objSummaryLesson.EducationalTasks1 && objSummaryLesson.EducationalTasks1.id !== -1) {

    const title = this.listClassEducationalTasksV1.find(value =>
                                      value.id === objSummaryLesson.EducationalTasks1.id).title;
    this.taskList.push({title,
                        text: objSummaryLesson.EducationalTasks1.text,
                        type: 1,
                        sortindex: 1
                      });
}

if (objSummaryLesson.EducationalTasks2 && objSummaryLesson.EducationalTasks2.id !== -1) {
const title = this.listClassEducationalTasksV1.find(value => value.id === objSummaryLesson.EducationalTasks2.id).title;
this.taskList.push({title,
                text: objSummaryLesson.EducationalTasks2.text,
                type: 1,
                sortindex: 2
              });
}

if (objSummaryLesson.EducationalTasks3 && objSummaryLesson.EducationalTasks3.id !== -1) {
const title = this.listClassEducationalTasksV1.find(value => value.id === objSummaryLesson.EducationalTasks3.id).title;
this.taskList.push({title,
                text: objSummaryLesson.EducationalTasks3.text,
                type: 1,
                sortindex: 3
              });
}


if (objSummaryLesson.CorrectionalTasks1 && objSummaryLesson.CorrectionalTasks1.id !== -1) {
const title = this.listClassCorrectionalTasksV1.find(value => value.id === objSummaryLesson.CorrectionalTasks1.id).title;
this.taskList.push({title,
                text: objSummaryLesson.CorrectionalTasks1.text,
                type: 2,
                sortindex: 4
              });
}

if (objSummaryLesson.CorrectionalTasks2 && objSummaryLesson.CorrectionalTasks2.id !== -1) {
const title = this.listClassCorrectionalTasksV1.find(value => value.id === objSummaryLesson.CorrectionalTasks2.id).title;
this.taskList.push({title,
                text: objSummaryLesson.CorrectionalTasks2.text,
                type: 2,
                sortindex: 5
              });
}

if (objSummaryLesson.CorrectionalTasks3 && objSummaryLesson.CorrectionalTasks3.id !== -1) {
const title = this.listClassCorrectionalTasksV1.find(value => value.id === objSummaryLesson.CorrectionalTasks3.id).title;
this.taskList.push({title,
                text: objSummaryLesson.CorrectionalTasks3.text,
                type: 2,
                sortindex: 6
              });
}


if (objSummaryLesson.RaisetionalTasks1 && objSummaryLesson.RaisetionalTasks1.id !== -1) {
const title = this.listClassRaisetionalTasksV1.find(value => value.id === objSummaryLesson.RaisetionalTasks1.id).title;
this.taskList.push({title,
                text: objSummaryLesson.RaisetionalTasks1.text,
                type: 3,
                sortindex: 7
              });
}

if (objSummaryLesson.RaisetionalTasks2 && objSummaryLesson.RaisetionalTasks2.id !== -1) {
const title = this.listClassRaisetionalTasksV1.find(value => value.id === objSummaryLesson.RaisetionalTasks2.id).title;
this.taskList.push({title,
                text: objSummaryLesson.RaisetionalTasks2.text,
                type: 3,
                sortindex: 8
              });
}

if (objSummaryLesson.RaisetionalTasks3 && objSummaryLesson.RaisetionalTasks3.id !== -1) {
const title = this.listClassRaisetionalTasksV1.find(value => value.id === objSummaryLesson.RaisetionalTasks3.id).title;
this.taskList.push({title,
                text: objSummaryLesson.RaisetionalTasks3.text,
                type: 3,
                sortindex: 9
              });
}

this.taskList = this.taskList.sort(this.compare);
this.taskList1 = this.taskList.filter(x => x.type === 1);
this.taskList2 = this.taskList.filter(x => x.type === 2);
this.taskList3 = this.taskList.filter(x => x.type === 3);

}

compare(a, b) {
  if (a.sortindex < b.sortindex) {
    return -1;
  }
  if ( a.sortindex > b.sortindex ) {
    return 1;
  }
  return 0;
}


printJsPdf() {

  const elem = document.getElementById("saveAsPdf");


  domtoimage.toBlob(elem)
    .then(function (blob) {
      console.log("blob=", blob);
        saveAs(blob, "my-node.png");
    });

    /*

  domtoimage.toPng(elem)
    .then(function (dataUrl) {
        const img = new Image();
        img.src = dataUrl;

        window.open().document.write('<img src="' + dataUrl + '" />');

        img.onload = () => {


           const  imgWidth = 210,
                  pageHeight = 295,
                  imgHeight = img.height * imgWidth / img.width,
                  heightLeft = imgHeight,
                  doc = new jsPDF('p', 'mm'),
                  position = 0;
              doc.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
              doc.save( 'lesson.pdf');
        }
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
*/


}


}
