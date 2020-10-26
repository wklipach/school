import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {GuideService} from '../services/guide.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

  lesson: any = {};
  fio = '';
  documentClassNameNumber = {id: -1, title: '--'};
  documentClassNameLetter = {id: -1, title: '--'};
  documentLessons = {id: -1, title: ''};
  documentTypeLesson = {id: -1, title: ''};
  documentType2Lesson = {id: -1, title: ''};
  documentObjectiveLesson = {id: -1, title: ''};
  documentPersonalLesson = {id: -1, title: ''};
  documentEquipment = {id: -1, title: ''};
  documentGroupMethod = {id: -1, id_group: -1, title: ''};
  documentMethod = {id: -1, id_group: -1, title: ''};
  fioStudent = '';
  lessonTopic = '';
  lessonObjectives = '';

  constructor(private router: Router, private gs: GuideService, private auth: AuthService) { }

  ngOnInit(): void {
    this.lesson =  this.auth.getSchoolLesson();
    console.log(this.lesson);
    console.log(this.lesson.objSummaryLesson);
    this.loadData();
  }

  loadData() {

    this.auth.getUserFromID(this.lesson.id_user).subscribe( user => {
      this.fio = user[0].fio;
    });

    this.documentClassNameNumber = this.lesson.objSummaryLesson.documentClassNameNumber;
    this.documentClassNameLetter = this.lesson.objSummaryLesson.documentClassNameLetter;
    this.fioStudent = this.lesson.objSummaryLesson.fiostudent;
    this.documentLessons = this.lesson.objSummaryLesson.documentLessons;
    this.lessonTopic = this.lesson.objSummaryLesson.lessonTopic;
    this.lessonObjectives = this.lesson.objSummaryLesson.lessonObjectives;
    this.documentTypeLesson = this.lesson.objSummaryLesson.documentTypeLesson;
    this.documentType2Lesson = this.lesson.objSummaryLesson.documentType2Lesson;
    this.documentObjectiveLesson = this.lesson.objSummaryLesson.documentObjectiveLesson;
    this.documentPersonalLesson = this.lesson.objSummaryLesson.documentPersonalLesson;

  }

}
