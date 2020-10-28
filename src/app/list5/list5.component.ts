import { Component, OnInit } from '@angular/core';
import {classBasicLearningActivities, classGroupLearningActivities} from '../class/academicSubject';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {GuideService} from '../services/guide.service';

@Component({
  selector: 'app-list5',
  templateUrl: './list5.component.html',
  styleUrls: ['./list5.component.css']
})
export class List5Component implements OnInit {

  UserInfo = {schoolLogin: '', bSchoolConnected: false, id_user_school: '', editor: 0};
  listBasicLearningActivities: any;
  listGroupLearningActivities: any;
  methodAggegateList: any;

  constructor(private router: Router, private gs: GuideService, private auth: AuthService) { }

  ngOnInit(): void {

    this.UserInfo = this.auth.getStorage();
    this.createOrLoadCollection('classBasicLearningActivities', classBasicLearningActivities, 'listBasicLearningActivities');
    this.createOrLoadCollection('classGroupLearningActivities', classGroupLearningActivities, 'listGroupLearningActivities');
    this.loadMethodCollection();
  }

  createOrLoadCollection(sName, objCollection, sResult: any) {
    this.gs.checkCollection(sName).subscribe(value => {
      if (value === false) {
        this.gs.insertGuideLessonsName(sName, objCollection).subscribe(guideList => {
          this[sResult] = guideList;
        });
      } else {
        this.gs.selectCollection(sName).subscribe(guideList => {
          this[sResult] = guideList;
        });
      }
    });
  }

  loadMethodCollection() {
    this.gs.selectLearningActivities().subscribe(methodList => {
      this.methodAggegateList = methodList;
      console.log(this.methodAggegateList);
    });
  }

}
