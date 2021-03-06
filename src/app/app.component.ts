import { Component } from '@angular/core';
import {
  classBasicLearningActions,
  classBasicLearningActivities, classCorrectionalTasksV1, classCorrectionalTasksV2,
  classEducationalTasksV1, classEducationalTasksV2, classEquipment, classGroupLearningActions,
  classGroupLearningActivities,
  classGroupMethod, classMethod,
  classNameLetter,
  classNameNumber, classObjectiveLesson, classPersonalLesson,
  classRaisetionalTasksV1, classRaisetionalTasksV2, classType2Lesson, classTypeLesson, lessonsName,
  lessonsName2
} from './class/academicSubject';
import { GuideService } from './services/guide.service';


declare global {
  interface String {
    toCurHTML(): number;
  }
}

String.prototype.toCurHTML = function () {
  const str =  this.replace(/(?:\r\n|\r|\n)/g, "<br>");
  return str;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor( private gs: GuideService) {
    this.createCollection('classBasicLearningActivities', classBasicLearningActivities);
    this.createCollection('classGroupLearningActivities', classGroupLearningActivities);
    this.createCollection('lessonsName', lessonsName);
    this.createCollection('lessonsName2', lessonsName2);
    this.createCollection('classNameNumber', classNameNumber);
    this.createCollection('classNameLetter', classNameLetter);
    this.createCollection('classTypeLesson', classTypeLesson);
    this.createCollection('classType2Lesson', classType2Lesson);
    this.createCollection('classObjectiveLesson', classObjectiveLesson);
    this.createCollection('classPersonalLesson', classPersonalLesson);
    this.createCollection('classEquipment', classEquipment);
    this.createCollection('classMethod', classMethod);
    this.createCollection('classGroupMethod', classGroupMethod);
    this.createCollection('classBasicLearningActions', classBasicLearningActions);
    this.createCollection('classGroupLearningActions', classGroupLearningActions);
    this.createCollection('classEducationalTasksV2', classEducationalTasksV2);
    this.createCollection('classCorrectionalTasksV2', classCorrectionalTasksV2);
    this.createCollection('classRaisetionalTasksV2', classRaisetionalTasksV2);
    this.createCollection('classEducationalTasksV1', classEducationalTasksV1);
    this.createCollection('classCorrectionalTasksV1', classCorrectionalTasksV1);
    this.createCollection('classRaisetionalTasksV1', classRaisetionalTasksV1);
  }

  createCollection(sName, objCollection) {
    this.gs.checkCollection(sName).subscribe(value => {
      if (value === false) {
        this.gs.insertGuideLessonsName(sName, objCollection).subscribe(guideList => {  });
    }
  });
}


}
