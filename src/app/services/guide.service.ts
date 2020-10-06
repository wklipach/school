import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GlobalRef} from './globalref';

@Injectable({
  providedIn: 'root'
})
export class GuideService {

  constructor(private http: HttpClient, public gr: GlobalRef) { }

  insertUser(sname) {
      const datamessage = {insert_user: 'insert_user', sname};
      return this.http.post(this.gr.sUrlGlobal + 'guide', datamessage);
  }

  selectUser() {
    const varparams = new HttpParams()
      .set('get_users', 'get_users');
    return this.http.get(this.gr.sUrlGlobal + 'guide', {params: varparams});
  }

  checkCollection(sname) {
    const varparams = new HttpParams()
      .set('get_collection_check', 'get_collection_check')
      .set('collection_name', sname);
    return this.http.get(this.gr.sUrlGlobal + 'guide', {params: varparams});
  }

  selectCollection(sname) {
    const varparams = new HttpParams()
      .set('get_collection', 'get_collection')
      .set('collection_name', sname);
    return this.http.get(this.gr.sUrlGlobal + 'guide', {params: varparams});
  }

  insertGuideLessonsName(collectionName, objLessonsName) {
    const datamessage = {insert_lessonsName: 'insert_lessonsName', collectionName, objLessonsName};
    return this.http.post(this.gr.sUrlGlobal + 'guide', datamessage);
  }


}
