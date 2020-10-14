import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GlobalRef} from './globalref';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, public gr: GlobalRef) { }


  getNickUserTable(nick: string) {
    const params = new HttpParams()
      .set('get_nick_user', nick.toString());
    return this.http.get(this.gr.sUrlGlobal + 'users', {params: params});
  }

  // получаем пользователя по почтовому адресу
  getEmailUserTable(email: string) {
    const params = new HttpParams()
      .set('get_email_user', email.toString());
    return this.http.get(this.gr.sUrlGlobal + 'users', {params: params});
  }

  setNewUser(NewUser, curSubject, curLetter) {
    // вставить запрос по добавлению пользователя в базу
    const user = { newuser : NewUser, subject: curSubject, letter: curLetter};
    return this.http.post(this.gr.sUrlGlobal + 'users', user);
  }

  // заносим текущего пользователя в локальное хранилище
  public setStorage(schoolLogin: string, bSchoolConnected: boolean, id_user_school: string, editor: number) {
    window.localStorage.setItem('schoolLogin', schoolLogin);
    window.localStorage.setItem('bSchoolConnected', JSON.stringify(bSchoolConnected));
    window.localStorage.setItem('id_user_school', JSON.stringify(id_user_school));
    window.localStorage.setItem('editor', JSON.stringify(editor));
  }

  // стираем текущего пользователя из локального хранилища
  public clearStorage() {
    window.localStorage.setItem('schoolLogin', '');
    window.localStorage.setItem('bSchoolConnected', JSON.stringify(false));
    window.localStorage.setItem('id_user_school', JSON.stringify(-1));
    window.localStorage.setItem('editor', JSON.stringify(-1));
  }

  // получаем пользователя, поиск по 2 полям - его почте и нику одновременно
  getUserFromBase(UserName: string) {
    const params = new HttpParams()
      .set('get_user', UserName.toString());
    return this.http.get(this.gr.sUrlGlobal + 'users', {params: params});
  }

  sendPassword(email: string, pwd: string, hash: string) {
    const sUrl = this.gr.sUrlGlobal + 'forgotpassword';
    return this.http.post(sUrl, {email, pwd, hash});
  }


}
