import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Guide7Service } from '../components/guide7/guide7.service';
import { AuthService } from '../services/auth.service';
import { GuideService } from '../services/guide.service';

@Component({
  selector: 'app-list5-v2',
  templateUrl: './list5-v2.component.html',
  styleUrls: ['./list5-v2.component.css']
})
export class List5V2Component implements OnInit {

  UserInfo = {schoolLogin: '', bSchoolConnected: false, id_user_school: '', editor: 0};
  list5v2Form: FormGroup;
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
  Guide10Resultat1 = [];

  constructor(private router: Router, private gs: GuideService,
    private auth: AuthService, private g7s: Guide7Service) {

    this.UserInfo = this.auth.getStorage();
    this.list5v2Form = new FormGroup({
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
  }

  onResGuide10(event: [], i: number) {

    if (i === 1) {
      this.Guide10Resultat1 = event;
    }
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

  sentCurrentMessage(guideName: string, iNumber: number) {
    const res = {message: guideName, i: iNumber};
    this.g7s.sendMessage(res);
  }

  saveList5v2() {
    // получаем номер id
    const id = this.auth.getSaveDocumentId();

    // получаем все справочники
    const objResult: {[k: string]: any} = {};
    this.sentCurrentMessage('guide10', 1);
    objResult.Guide10Resultat1 = this.Guide10Resultat1;

    this.sentCurrentMessage('guide7', 1);
    this.sentCurrentMessage('guide7', 2);
    this.sentCurrentMessage('guide7', 3);
    this.sentCurrentMessage('guide7', 4);
    this.sentCurrentMessage('guide7', 5);
    this.sentCurrentMessage('guide7', 6);
    this.sentCurrentMessage('guide7', 7);
    this.sentCurrentMessage('guide7', 8);
    this.sentCurrentMessage('guide7', 9);
    this.sentCurrentMessage('guide7', 10);
    objResult.Guide7Resultat1 = this.Guide7Resultat1;
    objResult.Guide7Resultat2 = this.Guide7Resultat2;
    objResult.Guide7Resultat3 = this.Guide7Resultat3;
    objResult.Guide7Resultat4 = this.Guide7Resultat4;
    objResult.Guide7Resultat5 = this.Guide7Resultat5;
    objResult.Guide7Resultat6 = this.Guide7Resultat6;
    objResult.Guide7Resultat7 = this.Guide7Resultat7;
    objResult.Guide7Resultat8 = this.Guide7Resultat8;
    objResult.Guide7Resultat9 = this.Guide7Resultat9;
    objResult.Guide7Resultat10 = this.Guide7Resultat10;


    objResult.teacheractivity = this.list5v2Form.controls.teacheractivity.value;
    objResult.studentactivities = this.list5v2Form.controls.studentactivities.value;
    objResult.reviewerrecommendations = this.list5v2Form.controls.reviewerrecommendations.value;

    objResult.teacheractivity2 = this.list5v2Form.controls.teacheractivity2.value;
    objResult.studentactivities2 = this.list5v2Form.controls.studentactivities2.value;
    objResult.reviewerrecommendations2 = this.list5v2Form.controls.reviewerrecommendations2.value;

    objResult.teacheractivity3 = this.list5v2Form.controls.teacheractivity3.value;
    objResult.studentactivities3 = this.list5v2Form.controls.studentactivities3.value;
    objResult.reviewerrecommendations3 = this.list5v2Form.controls.reviewerrecommendations3.value;

    objResult.teacheractivity4 = this.list5v2Form.controls.teacheractivity4.value;
    objResult.studentactivities4 = this.list5v2Form.controls.studentactivities4.value;
    objResult.reviewerrecommendations4 = this.list5v2Form.controls.reviewerrecommendations4.value;

    objResult.teacheractivity5 = this.list5v2Form.controls.teacheractivity5.value;
    objResult.studentactivities5 = this.list5v2Form.controls.studentactivities5.value;
    objResult.reviewerrecommendations5 = this.list5v2Form.controls.reviewerrecommendations5.value;

    objResult.teacheractivity6 = this.list5v2Form.controls.teacheractivity6.value;
    objResult.studentactivities6 = this.list5v2Form.controls.studentactivities6.value;
    objResult.reviewerrecommendations6 = this.list5v2Form.controls.reviewerrecommendations6.value;

    objResult.teacheractivity7 = this.list5v2Form.controls.teacheractivity7.value;
    objResult.studentactivities7 = this.list5v2Form.controls.studentactivities7.value;
    objResult.reviewerrecommendations7 = this.list5v2Form.controls.reviewerrecommendations7.value;

    objResult.teacheractivity8 = this.list5v2Form.controls.teacheractivity8.value;
    objResult.studentactivities8 = this.list5v2Form.controls.studentactivities8.value;
    objResult.reviewerrecommendations8 = this.list5v2Form.controls.reviewerrecommendations8.value;

    objResult.teacheractivity9 = this.list5v2Form.controls.teacheractivity9.value;
    objResult.studentactivities9 = this.list5v2Form.controls.studentactivities9.value;
    objResult.reviewerrecommendations9 = this.list5v2Form.controls.reviewerrecommendations9.value;

    objResult.teacheractivity10 = this.list5v2Form.controls.teacheractivity10.value;
    objResult.studentactivities10 = this.list5v2Form.controls.studentactivities10.value;
    objResult.reviewerrecommendations10 = this.list5v2Form.controls.reviewerrecommendations10.value;

    console.log('objResult=', objResult);

    this.gs.updateSummaryLessonList5(id, objResult).subscribe( resultat => {
            // переход к "моим урокам"
            const beans = {schoolarchive: {date: this.getDateShow(), currentLessons: true}};
            this.router.navigate(['/archive'], {state: beans});
    });

  }

  getDateShow() {
    let dd = new Date();
    // показываем с прошлого сентября
    if (dd.getMonth() < 8) {
      dd =  new Date(dd.getFullYear() - 1, 8, 1);
    } else {
      dd =  new Date(dd.getFullYear(), 8, 1);
    }
    return dd;
  }


}
