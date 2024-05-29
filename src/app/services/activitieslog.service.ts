import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivitieslogService {
  private activitiesLog: any[] = [];

  getActivityLogsByDate(date: string): any[] {
    return this.activitiesLog.filter(activity => activity.date === date);
  }

  addActivityLog(activity: any): void {
    this.activitiesLog.push(activity);
  }
}

