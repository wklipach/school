import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {GuideService} from "../services/guide.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-viewer-v2',
  templateUrl: './viewer-v2.component.html',
  styleUrls: ['./viewer-v2.component.css']
})
export class ViewerV2Component implements OnInit {

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

  guide2linesResultat1: any[] = [];
  guide10list: any[] = [];


  constructor(private router: Router, private gs: GuideService, private auth: AuthService) {

    if (!this.auth.getViewPrintId()) {
      this.router.navigate(['/']);
    }

  }

  ngOnInit(): void {
    const lesson_id = this.auth.getViewPrintId();
    forkJoin([

      this.gs.selectCollection('classBasicLearningActions'),
      this.gs.getLesson(lesson_id)
    ]).subscribe(results => {
        this.guide10list = <any[]>results[0];
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
    this.documentLessons2 = this.lesson.objSummaryLesson.documentLessons2;
    this.lessonTopic = this.lesson.objSummaryLesson.lessonTopic;
    this.lessonObjectives = this.lesson.objSummaryLesson.lessonObjectives;
    this.documentTypeLesson = this.lesson.objSummaryLesson.documentTypeLesson;
    this.documentType2Lesson = this.lesson.objSummaryLesson.documentType2Lesson;
    // this.documentObjectiveLessonList = this.lesson.objSummaryLesson.documentObjectiveLessonList;
    // this.documentPersonalLessonList = this.lesson.objSummaryLesson.documentPersonalLessonList;
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
      // дволной справочник берется именно из objSummaryLesson, а не objSummaryLesson2
      this.guide2linesResultat1 = this.lesson.objSummaryLesson.guide2linesResultat1;

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
    }
  }


  Guide10Filter(id_element): string {
    return this.guide10list.filter(value => {
      return value.id === id_element;
    })[0].title;
  }


}
