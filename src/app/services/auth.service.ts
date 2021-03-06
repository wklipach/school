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
    window.localStorage.setItem('schoolEditor', JSON.stringify(editor));
  }

  public setSchoolArchive(schoolarchive) {
    window.localStorage.setItem('schoolarchive', JSON.stringify(schoolarchive));
  }

  public getStorage(): {schoolLogin: string, bSchoolConnected: boolean, id_user_school: string, editor: number} {
    const curSchoolLogin = window.localStorage.getItem('schoolLogin');
    const curSchoolConnected = (window.localStorage.getItem('bSchoolConnected') === 'true');
    const curUserMongoID = window.localStorage.getItem('id_user_school');
    const curEditor = Number.parseInt(window.localStorage.getItem('schoolEditor'));
    return {schoolLogin: curSchoolLogin, bSchoolConnected: curSchoolConnected, id_user_school: curUserMongoID, editor: curEditor};
  }


  // стираем текущего пользователя из локального хранилища
  public clearStorage() {
    window.localStorage.setItem('schoolLogin', '');
    window.localStorage.setItem('bSchoolConnected', JSON.stringify(false));
    window.localStorage.setItem('id_user_school', JSON.stringify(-1));
    window.localStorage.setItem('schoolEditor', JSON.stringify(-1));
    window.localStorage.removeItem('schoollesson');
    window.localStorage.removeItem('schoolarchive');
    window.localStorage.removeItem('savedocument_id');
    window.localStorage.removeItem('savedocument_edit');
    window.localStorage.removeItem('viewprint_id');
  }

  public setSchoolLesson(schoollesson) {
    window.localStorage.setItem('schoollesson', JSON.stringify(schoollesson));
  }

  public setViewPrintId(lesson_id) {
    window.localStorage.setItem('viewprint_id', JSON.stringify(lesson_id));
  }

  public getViewPrintId() {
    return JSON.parse(window.localStorage.getItem('viewprint_id'));
  }

  public setSaveDocumentId(id) {
    window.localStorage.setItem('savedocument_id', JSON.stringify(id));
  }

  public setSaveDocumentEdit(b: boolean) {
    window.localStorage.setItem('savedocument_edit', JSON.stringify(b));
  }


  public getSaveDocumentId() {
    return JSON.parse(window.localStorage.getItem('savedocument_id'));
  }

  public getSaveDocumentEdit() {
    return JSON.parse(window.localStorage.getItem('savedocument_edit'));
  }



  public getSchoolLesson() {
    return JSON.parse(window.localStorage.getItem('schoollesson'));
  }

  public getSchoolArchive() {
    return JSON.parse(window.localStorage.getItem('schoolarchive'));
  }


  // получаем пользователя, поиск по 2 полям - его почте и нику одновременно
  getUserFromBase(UserName: string) {
    const params = new HttpParams()
      .set('get_user', UserName.toString());
    return this.http.get(this.gr.sUrlGlobal + 'users', {params: params});
  }

  // получаем пользователя, поиск по mongo-ID
  getUserFromID(mongoID: string) {
    const params = new HttpParams()
      .set('get_user_id', mongoID.toString());
    return this.http.get(this.gr.sUrlGlobal + 'users', {params: params});
  }

  // получаем пользователя, поиск по mongo-ID
  getUserWithoutID(mongoID: string) {
    const params = new HttpParams()
      .set('get_user_withoutcurrentid', 'get_user_withoutcurrentid')
      .set('id_user', mongoID.toString());
    return this.http.get(this.gr.sUrlGlobal + 'users', {params: params});
  }


  sendPassword(email: string, pwd: string, hash: string) {
    const sUrl = this.gr.sUrlGlobal + 'forgotpassword';
    return this.http.post(sUrl, {email, pwd, hash});
  }

  // получаем пользователя, поиск по mongo-ID
  getUserFromSchool(school: string, fio: string, slogin: string) {
    const params = new HttpParams()
      .set('get_user_school', 'get_user_school')
      .set('school', school)
      .set('fio', fio)
      .set('slogin', slogin);
    return this.http.get(this.gr.sUrlGlobal + 'users', {params: params});
  }


}
