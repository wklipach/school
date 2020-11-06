import { Component } from '@angular/core';
import {
  classBasicLearningActivities, classEquipment, classGroupLearningActivities, classGroupMethod, classMethod, classNameLetter,
  classNameNumber, classObjectiveLesson, classPersonalLesson, classType2Lesson, classTypeLesson, lessonsName, lessonsName2
} from './class/academicSubject';
import { GuideService } from './services/guide.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor( private gs: GuideService) {
    this.createCollection('classBasicLearningActivities', classBasicLearningActivities, 'listBasicLearningActivities');
    this.createCollection('classGroupLearningActivities', classGroupLearningActivities, 'listGroupLearningActivities');
    this.createCollection('lessonsName', lessonsName, 'listLessons');
    this.createCollection('lessonsName2', lessonsName2, 'listLessons2');
    this.createCollection('classNameNumber', classNameNumber, 'listClassNameNumber');
    this.createCollection('classNameLetter', classNameLetter, 'listClassNameLetter');
    this.createCollection('classTypeLesson', classTypeLesson, 'listTypeLesson');
    this.createCollection('classType2Lesson', classType2Lesson, 'listType2Lesson');
    this.createCollection('classObjectiveLesson', classObjectiveLesson, 'listObjectiveLesson');
    this.createCollection('classPersonalLesson', classPersonalLesson, 'listPersonalLesson');
    this.createCollection('classEquipment', classEquipment, 'listEquipment');
    this.createCollection('classMethod', classMethod, 'listMethod');
    this.createCollection('classGroupMethod', classGroupMethod, 'listGroupMethod');

  }

  createCollection(sName, objCollection, sResult: any) {
    this.gs.checkCollection(sName).subscribe(value => {
      if (value === false) {
        this.gs.insertGuideLessonsName(sName, objCollection).subscribe(guideList => {  });
    }
  });
}


}
