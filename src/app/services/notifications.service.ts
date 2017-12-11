import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotificationsService {
  private subject = new Subject<any>();

  notify(notification: string) {
    this.subject.next({ text: notification });
  }

  clearNotification() {
    this.subject.next();
  }

  getNotification(): Observable<any> {
    return this.subject.asObservable();
  }
}
