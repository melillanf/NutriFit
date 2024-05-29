import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivitieslogService {
  private activitiesLog: any[] = [];

  getActivitiesByDate(date: string): any[] {
    return this.activitiesLog.filter(activity => activity.date === date);
  }

  addActivity(activity: any): void {
    this.activitiesLog.push(activity);
  }
}
