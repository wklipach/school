import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-lesson-transfer',
  templateUrl: './lesson-transfer.component.html',
  styleUrls: ['./lesson-transfer.component.css']
})
export class LessonTransferComponent implements OnInit {

  listuser = [];
  UserInfo = {schoolLogin: '', bSchoolConnected: false, id_user_school: '', editor: 0};
  LessonTransferForm: FormGroup;


  constructor(private router: Router, private auth: AuthService) {
    this.UserInfo = this.auth.getStorage();
    if (this.UserInfo.bSchoolConnected === false) {
      this.router.navigate(['/login']);
    }
    this.LessonTransferForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.auth.getUserWithoutID(this.UserInfo.id_user_school).subscribe( (resuser: []) => {
      this.listuser = resuser;
      // listuser
      this.listuser.forEach( element => {
        this.LessonTransferForm.addControl('userCheck' + element._id.toString(), new FormControl(''));
      });
    });

  }

  moveLesson() {
    this.listuser.forEach( element => {
      if (this.LessonTransferForm.controls['userCheck' + element._id.toString()].value) {
        console.log('userCheck' + element._id.toString(), this.LessonTransferForm.controls['userCheck' + element._id.toString()].value);
      }
    });

  }
}
