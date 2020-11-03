import { Injectable } from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Guide7Service {

  private subject = new Subject<any>();

  sendMessage({message: string, i: number}): void {
    const res = {message: string, i: number};
    this.subject.next(res);
  }

  clearMessage(): void {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

}

