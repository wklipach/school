import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import * as CryptoJS from 'crypto-js';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  bPassword = false;
  registerForm: FormGroup;
  constructor(private router: Router, private auth: AuthService) {

    this.registerForm  = new FormGroup({
      userLogin: new FormControl('', [Validators.required, Validators.minLength(1)], [this.userNameAsyncValidator.bind(this)]),
      userFio: new FormControl(''),
      organization: new FormControl(''),
      userEmail: new FormControl('', [Validators.required, Validators.email], [this.userEmailAsyncValidator.bind(this)]),
      userPassword1: new FormControl('',  [Validators.required]),
      userPassword2: new FormControl('', [Validators.required, Validators.minLength(1)], [this.password2AsyncValidator.bind(this)])
    });

  }

  ngOnInit(): void {
  }

  // валидатор по имени пользователя
  userNameAsyncValidator(control: FormControl): Promise<{[s: string]: boolean}> {
    return new Promise(
      (resolve, reject) => {

        return this.auth.getNickUserTable(control.value).subscribe(
          (data: number) => {
            if (data > 0) {
              resolve( {'myError': true});
            }   else {
              resolve(null);
            }
          }
        );
      }
    );
  }

  // валидатор по паролю
  password2AsyncValidator(control: FormControl): Promise<{[s: string]: boolean}> {
    return new Promise(
      (resolve, reject) => {
        if (this.registerForm.controls['userPassword1'].value !== control.value) {
          resolve( {'myError': true});
        } else {
          resolve(null);
        }
      }
    );
  }

  // валидатор по EMail
  userEmailAsyncValidator(control: FormControl): Promise<{[s: string]: boolean}> {
    return new Promise(
      (resolve, reject) => {

        return this.auth.getEmailUserTable(control.value).subscribe(
          (data: number) => {
            if (data > 0) {
              resolve( {'errorEmailExists': true});
            } else {
              resolve(null);
            }
          }
        );
      }
    );
  }

  submit() {
    this.bPassword = false;


    console.log('this.registerForm.value=', this.registerForm.value);
    const {userLogin, userFio, organization, userEmail, userPassword1, userPassword2} = this.registerForm.value;

    if (userPassword1.trim() !== userPassword2.trim()) {
      this.bPassword = true;
      return -1;
    }

    const NewUser = {
    login: userLogin,
    password: CryptoJS.SHA256(userPassword1.trim().toLowerCase()).toString().toLowerCase(),
    email: userEmail,
    fio: userFio,
    bitdelete: false,
    editor: 0,
      organization: organization.toString().trim()
  };

    const curSubject = 'Добро пожаловать.';
    const curLetter = 'Спасибо за регистрацию. Надеемся, что вы найдете здесь решение ваших вопросов.';


    return this.auth.setNewUser(NewUser, curSubject, curLetter).subscribe((value: any) => {
      this.auth.setStorage(value.ops[0].login, true, value.insertedId, 0);
      this.router.navigate(['/login']);
    });
  }

}
