import { Component, OnInit } from '@angular/core';
import {lessonsName, classNameLetter, classNameNumber} from '../class/academicSubject';
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
  listClassNameNumber: any;
  listClassNameLetter: any;
  documentClassNameNumber = {id: -1, title: '' };
  documentClassNameLetter = {id: -1, title: '' };
  documentLessons = {id: -1, title: '' };

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
    this.createOrLoadCollection.bind(this);
    this.createOrLoadCollection('lessonsName', lessonsName, 'listLessons');
    this.createOrLoadCollection('classNameNumber', classNameNumber, 'listClassNameNumber');
    this.createOrLoadCollection('classNameLetter', classNameLetter, 'listClassNameLetter');
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
          console.log(this.listLessons, this.listClassNameNumber, this.listClassNameLetter, sResult);
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
}
