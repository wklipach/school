import { Component, OnInit } from '@angular/core';
import {lessonsName} from '../class/academicSubject';
import {GuideService} from '../services/guide.service';

@Component({
  selector: 'app-list4',
  templateUrl: './list4.component.html',
  styleUrls: ['./list4.component.css']
})
export class List4Component implements OnInit {

  listLessons: any;
  constructor(private gs: GuideService) {

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

}
