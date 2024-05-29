import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ActivitieslogService {
  private activitiesLog: any[] = [];
  
  constructor(private notificationService: NotificationService){}

  getActivityLogsByDate(date: Date): any[] {
    return this.activitiesLog.filter(activity => activity.date === date);
  }

  addActivityLog(activity: any): void {
    this.activitiesLog.push(activity);
  }
}
