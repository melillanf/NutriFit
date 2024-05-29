import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private refreshNeeded = new Subject<void>();

  get refreshNeeded$() {
    return this.refreshNeeded.asObservable();
  }

  notifyRefreshNeeded() {
    this.refreshNeeded.next();
  }
}
