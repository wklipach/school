import {Component, Input, OnInit} from '@angular/core';
import {classBasicLearningActivities, classGroupLearningActivities} from '../class/academicSubject';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {GuideService} from '../services/guide.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {Guide7Service} from '../components/guide7/guide7.service';

@Component({
  selector: 'app-list5',
  templateUrl: './list5.component.html',
  styleUrls: ['./list5.component.css']
})
export class List5Component implements OnInit {


  UserInfo = {schoolLogin: '', bSchoolConnected: false, id_user_school: '', editor: 0};
  list5Form: FormGroup;
  messageEmitter = new Subject<String>();
  Guide8Resultat1 = [];
  Guide8Resultat2 = [];


  listBasicLearningActivities: any;
  listGroupLearningActivities: any;
  methodAggegateList: any;

  constructor(private router: Router, private gs: GuideService,
              private auth: AuthService, private g7s: Guide7Service) {
    this.UserInfo = this.auth.getStorage();
    this.list5Form = new FormGroup({
      teacheractivity: new FormControl(''),
      studentactivities: new FormControl(''),
      reviewerrecommendations: new FormControl('')
    });
  }

  ngOnInit(): void {

    this.messageEmitter.subscribe(msg => {
      if (msg === 'listBasicLearningActivities') {
        console.log(msg);
        this.loadCheckBox();
        this.loadMethodCollection();
      }
    });

    this.createOrLoadCollection('classBasicLearningActivities', classBasicLearningActivities, 'listBasicLearningActivities');
    this.createOrLoadCollection('classGroupLearningActivities', classGroupLearningActivities, 'listGroupLearningActivities');

  }


  loadCheckBox() {
    this.listBasicLearningActivities.forEach( element => {
      this.list5Form.addControl('aggregateCheck' + element.id.toString(), new FormControl(''));
    });
  }

  createOrLoadCollection(sName, objCollection, sResult: any) {
    this.gs.checkCollection(sName).subscribe(value => {
      if (value === false) {
        this.gs.insertGuideLessonsName(sName, objCollection).subscribe(guideList => {
          this[sResult] = guideList;
          this.messageEmitter.next(sResult);
        });
      } else {
        this.gs.selectCollection(sName).subscribe(guideList => {
          this[sResult] = guideList;
          this.messageEmitter.next(sResult);
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

  onClickSave() {
    this.listBasicLearningActivities.forEach( element => {
//      console.log('aggregateCheck' + element.id.toString(), this.list5Form.controls['aggregateCheck' + element.id.toString()].value);
      if (this.list5Form.controls['aggregateCheck' + element.id.toString()].value) {
        console.log('aggregateCheck' + element.id.toString(), this.list5Form.controls['aggregateCheck' + element.id.toString()].value);
      }
    });
  }

  saveList5() {
    console.log('111');
    const res1 = {message: 'guide8', i: 1};
    this.g7s.sendMessage(res1);
    console.log('Guide8Resultat1=', this.Guide8Resultat1);
    const res2 = {message: 'guide8', i: 2};
    this.g7s.sendMessage(res2);
    console.log('Guide8Resultat2=', this.Guide8Resultat2);
  }

  onResGuide8(event: [], i: number) {
    if (i === 1) {
      this.Guide8Resultat1 = event;
    }

    if (i === 2) {
      this.Guide8Resultat2 = event;
    }
  }
}
