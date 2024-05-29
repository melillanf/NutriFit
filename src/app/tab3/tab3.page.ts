import { Component } from '@angular/core';
import { ActivityService } from '../services/activity.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  selectedDate: Date = new Date();
  activities: any[] = [];
  description: string = '';
  time: number = 0;
  caloriesBurned: number = 0;

  constructor(private activityService: ActivityService) {}

  ngOnInit() {
    this.loadActivities();
  }

  loadActivities() {
    this.activityService.getActivities().subscribe(activities => {
      this.activities = activities;
    });
  }

  calculateCaloriesBurned(activity: any, time: number): number {
    return activity.calorias_por_minuto * time;
  }

  addActivity() {
    if (this.description && this.time && this.caloriesBurned) {
      const activity = {
        description: this.description,
        time: this.time,
        caloriesBurned: this.caloriesBurned,
        date: this.selectedDate
      };
      this.activityService.addActivity(activity);
      this.loadActivities(); // Actualizamos la lista de actividades después de agregar una nueva
      this.description = '';
      this.time = 0;
      this.caloriesBurned = 0;
    }
  }
  
}
