import { Component, OnInit } from '@angular/core';
import {lessonsName} from '../class/academicSubject';
import {GuideService} from '../services/guide.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list2',
  templateUrl: './list2.component.html',
  styleUrls: ['./list2.component.css']
})
export class List2Component implements OnInit {

  listLessons: any;
  constructor(private gs: GuideService, private router: Router) {

  }

  ngOnInit(): void {
    const sName = 'lessonsName';
    this.gs.checkCollection(sName).subscribe( value => {
      console.log('value', value);
      if (value === false) {
        this.gs.insertGuideLessonsName(sName, lessonsName).subscribe( guideList => {
          this.listLessons = guideList;
        });
      } else {
        this.gs.selectCollection(sName).subscribe( guideList => {
          this.listLessons = guideList;
        });
      }
    });

  }

  onClickVar1() {
    this.router.navigate(['/list4']);
  }
}
