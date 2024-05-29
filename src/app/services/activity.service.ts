import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private activities: any[] = [];

  constructor(private http: HttpClient) { }

  getActivitiesByDate(date: Date): any[] {
    // Simplemente devolvemos las actividades para la fecha dada (simulado)
    return this.activities.filter(activity => activity.date.toDateString() === date.toDateString());
  }

  addActivity(activity: any): void {
    this.activities.push(activity);
  }

  getActivities(): Observable<any[]> {
    return this.http.get<any[]>('assets/data/activities.json');
  }
}
