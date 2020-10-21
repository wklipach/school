import { Component, OnInit } from '@angular/core';
import {
  lessonsName, classNameLetter, classNameNumber, classTypeLesson, classType2Lesson,
  classObjectiveLesson, classPersonalLesson, classEquipment
} from '../class/academicSubject';
import {GuideService} from '../services/guide.service';
import {FormControl, FormGroup} from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import Russian from 'flatpickr/dist/l10n/ru.js';

@Component({
  selector: 'app-list4',
  templateUrl: './list4.component.html',
  styleUrls: ['./list4.component.css']
})
export class List4Component implements OnInit {

  listLessons: any;
  listTypeLesson: any;
  listType2Lesson: any;
  listClassNameNumber: any;
  listClassNameLetter: any;
  listObjectiveLesson: any;
  listPersonalLesson: any;
  listEquipment: any;
  documentClassNameNumber = {id: -1, title: '' };
  documentClassNameLetter = {id: -1, title: '' };
  documentLessons = {id: -1, title: '' };
  documentTypeLesson = {id: -1, title: '' };
  documentType2Lesson = {id: -1, title: '' };
  documentObjectiveLesson = {id: -1, title: '' };
  documentPersonalLesson = {id: -1, title: '' };
  documentEquipment = {id: -1, title: '' };

  list4Form: FormGroup;
  vDatePickOptions: FlatpickrOptions = {
    locale: Russian.ru,
    dateFormat: 'd.m.Y',
    defaultDate: new Date()
  };

  constructor(private gs: GuideService) {
    this.list4Form  = new FormGroup({
      formControlDate: new FormControl(),
      lessonTopic: new FormControl(),
      lessonObjectives: new FormControl()
    });

  }

  ngOnInit(): void {
    this.createOrLoadCollection('lessonsName', lessonsName, 'listLessons');
    this.createOrLoadCollection('classNameNumber', classNameNumber, 'listClassNameNumber');
    this.createOrLoadCollection('classNameLetter', classNameLetter, 'listClassNameLetter');
    this.createOrLoadCollection('classTypeLesson', classTypeLesson, 'listTypeLesson');
    this.createOrLoadCollection('classType2Lesson', classType2Lesson, 'listType2Lesson');
    this.createOrLoadCollection('classObjectiveLesson', classObjectiveLesson, 'listObjectiveLesson');

    this.createOrLoadCollection('classPersonalLesson', classPersonalLesson, 'listPersonalLesson');
    this.createOrLoadCollection('classEquipment', classEquipment, 'listEquipment');
  }

  createOrLoadCollection(sName, objCollection, sResult: any) {
    this.gs.checkCollection(sName).subscribe( value => {
      if (value === false) {
        this.gs.insertGuideLessonsName(sName,  objCollection).subscribe( guideList => {
          this[sResult] = guideList;
        });
      } else {
        this.gs.selectCollection(sName).subscribe( guideList => {
          this[sResult] = guideList;
        });
      }
    });
  }

  onTestRes() {
    console.log( this);
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
  this.documentLessons.id = curValue.id;
  this.documentLessons.title = curValue.title;
  }

  onTypeLesson(curValue) {
    this.documentTypeLesson.id = curValue.id;
    this.documentTypeLesson.title = curValue.title;
  }

  onType2Lesson(curValue) {
    this.documentType2Lesson.id = curValue.id;
    this.documentType2Lesson.title = curValue.title;
  }

  onObjectiveLesson(curValue) {
    this.documentObjectiveLesson.id = curValue.id;
    this.documentObjectiveLesson.title = curValue.title;
  }


  onPersonalLesson(curValue) {
    this.documentPersonalLesson.id = curValue.id;
    this.documentPersonalLesson.title = curValue.title;
  }

  onEquipment(curValue) {
    this.documentEquipment.id = curValue.id;
    this.documentEquipment.title = curValue.title;
  }
}
