import { Component, OnInit } from '@angular/core';
import {GuideService} from '../services/guide.service';
import {curuserL, lessonsName} from '../class/academicSubject';

@Component({
  selector: 'app-mainschool',
  templateUrl: './mainschool.component.html',
  styleUrls: ['./mainschool.component.css']
})
export class MainschoolComponent implements OnInit {

  collectionUsers: any;
  constructor(private gs: GuideService) { }

  ngOnInit(): void {
  }

/*
  addUser() {
    const userInput = document.getElementById('userName') as HTMLInputElement;
    console.log(userInput.value);
    this.gs.insertUser(userInput.value).subscribe( () => {
    // this.selectUser();
    });
  }

  selectUser() {
    this.gs.selectUser().subscribe( (value) => {
      this.collectionUsers = value;
      console.log(this.collectionUsers);
    });
  }
*/

  cliclAddLessons() {

    const sName = 'lessonsName';

    this.gs.checkCollection(sName).subscribe( value => {
      console.log('value', value);
      if (value === false) {
        this.gs.insertGuideLessonsName(sName, lessonsName).subscribe( guideList => {
          console.log(guideList);
        });
      } else {
        this.gs.selectCollection(sName).subscribe( guideList => {
          console.log(guideList);
        });
      }
    });

  }
}
