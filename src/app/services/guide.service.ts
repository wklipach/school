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

  selectListLessons(id_user, schoolarchive) {

    const varparams = new HttpParams()
      .set('get_lessons_user', 'get_lessons_user')
      .set('date',  schoolarchive.date)
      .set('current_lessons',  schoolarchive.currentLessons)
      .set('id_user', id_user);
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

  selectGroupInnerMethod() {
    const varparams = new HttpParams()
      .set('get_groupinnermethod', 'get_groupinnermethod');
    return this.http.get(this.gr.sUrlGlobal + 'guide', {params: varparams});
  }

  selectLearningActivities() {
    const varparams = new HttpParams()
      .set('get_learningactivities', 'get_learningactivities');
    return this.http.get(this.gr.sUrlGlobal + 'guide', {params: varparams});
  }

  selectLearningActions() {
    const varparams = new HttpParams()
      .set('get_learningactions', 'get_learningactions');
    return this.http.get(this.gr.sUrlGlobal + 'guide', {params: varparams});
  }
  insertGuideLessonsName(collectionName, objLessonsName) {
    const datamessage = {insert_lessonsName: 'insert_lessonsName', collectionName, objLessonsName};
    return this.http.post(this.gr.sUrlGlobal + 'guide', datamessage);
  }


  insertSummaryLesson(id_user, objSummaryLesson) {
    const datamessage = {insert_summarylesson: 'insert_summarylesson', id_user, objSummaryLesson};
    return this.http.post(this.gr.sUrlGlobal + 'guide', datamessage);
  }

  updateSummaryLessonList4(id_key, objSummaryLesson) {
    const datamessage = {update_summarylesson_1: 'update_summarylesson_1', id_key, objSummaryLesson};
    return this.http.post(this.gr.sUrlGlobal + 'guide', datamessage);
  }

  updateSummaryLessonList5(id_key, objSummaryLesson2) {
    const datamessage = {update_summarylesson: 'update_summarylesson', id_key, objSummaryLesson2};
    return this.http.post(this.gr.sUrlGlobal + 'guide', datamessage);
  }

    // получаем урок, поиск по mongo-ID
    getLesson(mongoID: string) {
      const params = new HttpParams()
        .set('get_lesson', 'get_lesson')
        .set('id_lesson', mongoID.toString());
      return this.http.get(this.gr.sUrlGlobal + 'guide', {params: params});
    }


}
