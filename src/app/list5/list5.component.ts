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
  Guide8Resultat3 = [];
  Guide8Resultat4 = [];
  Guide8Resultat5 = [];
  Guide8Resultat6 = [];
  Guide8Resultat7 = [];
  Guide8Resultat8 = [];
  Guide8Resultat9 = [];
  Guide8Resultat10 = [];
  Guide7Resultat1 = [];
  Guide7Resultat2 = [];
  Guide7Resultat3 = [];
  Guide7Resultat4 = [];
  Guide7Resultat5 = [];
  Guide7Resultat6 = [];
  Guide7Resultat7 = [];
  Guide7Resultat8 = [];
  Guide7Resultat9 = [];
  Guide7Resultat10 = [];



  listBasicLearningActivities: any;
  listGroupLearningActivities: any;
  methodAggegateList: any;

  constructor(private router: Router, private gs: GuideService,
              private auth: AuthService, private g7s: Guide7Service) {
    this.UserInfo = this.auth.getStorage();
    this.list5Form = new FormGroup({
      teacheractivity: new FormControl(''),
      studentactivities: new FormControl(''),
      reviewerrecommendations: new FormControl(''),
      teacheractivity2: new FormControl(''),
      studentactivities2: new FormControl(''),
      reviewerrecommendations2: new FormControl(''),
      teacheractivity3: new FormControl(''),
      studentactivities3: new FormControl(''),
      reviewerrecommendations3: new FormControl(''),
      teacheractivity4: new FormControl(''),
      studentactivities4: new FormControl(''),
      reviewerrecommendations4: new FormControl(''),
      teacheractivity5: new FormControl(''),
      studentactivities5: new FormControl(''),
      reviewerrecommendations5: new FormControl(''),
      teacheractivity6: new FormControl(''),
      studentactivities6: new FormControl(''),
      reviewerrecommendations6: new FormControl(''),
      teacheractivity7: new FormControl(''),
      studentactivities7: new FormControl(''),
      reviewerrecommendations7: new FormControl(''),
      teacheractivity8: new FormControl(''),
      studentactivities8: new FormControl(''),
      reviewerrecommendations8: new FormControl(''),
      teacheractivity9: new FormControl(''),
      studentactivities9: new FormControl(''),
      reviewerrecommendations9: new FormControl(''),
      teacheractivity10: new FormControl(''),
      studentactivities10: new FormControl(''),
      reviewerrecommendations10: new FormControl(''),


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

  }


  loadCheckBox() {
    this.listBasicLearningActivities.forEach( element => {
      this.list5Form.addControl('aggregateCheck' + element.id.toString(), new FormControl(''));
    });
  }

/*
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
*/

  loadMethodCollection() {
    this.gs.selectLearningActivities().subscribe(methodList => {
      this.methodAggegateList = methodList;
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

  onResGuide7(event: [], i: number) {
    if (i === 1) {
      this.Guide7Resultat1 = event;
    }

    if (i === 2) {
      this.Guide7Resultat2 = event;
    }

    if (i === 3) {
      this.Guide7Resultat3 = event;
    }
    if (i === 4) {
      this.Guide7Resultat4 = event;
    }
    if (i === 5) {
      this.Guide7Resultat5 = event;
    }
    if (i === 6) {
      this.Guide7Resultat6 = event;
    }
    if (i === 7) {
      this.Guide7Resultat7 = event;
    }
    if (i === 8) {
      this.Guide7Resultat8 = event;
    }
    if (i === 9) {
      this.Guide7Resultat9 = event;
    }
    if (i === 10) {
      this.Guide7Resultat10 = event;
    }
  }

  onResGuide8(event: [], i: number) {

    if (i === 1) {
      this.Guide8Resultat1 = event;
    }

    if (i === 2) {
      this.Guide8Resultat2 = event;
    }

    if (i === 3) {
      this.Guide8Resultat3 = event;
    }
    if (i === 4) {
      this.Guide8Resultat4 = event;
    }
    if (i === 5) {
      this.Guide8Resultat5 = event;
    }
    if (i === 6) {
      this.Guide8Resultat6 = event;
    }
    if (i === 7) {
      this.Guide8Resultat7 = event;
    }
    if (i === 8) {
      this.Guide8Resultat8 = event;
    }
    if (i === 9) {
      this.Guide8Resultat9 = event;
    }
    if (i === 10) {
      this.Guide8Resultat10 = event;
    }
  }
}
