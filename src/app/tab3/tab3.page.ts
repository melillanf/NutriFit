import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../services/activity.service';
import { ActivitieslogService } from '../services/activitieslog.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  activities: any[] = [];
  selectedDate: Date = new Date(); // Inicializar con una cadena vacía
  activityLog: any[] = [];
  selectedActivity: any;
  minutes: number = 0; // Inicializar con 0
  showAddActivity = false;

  constructor(
    private activityService: ActivityService,
    private activitieslogService: ActivitieslogService
  ) {}

  ngOnInit() {
    this.activityService.getActivities().subscribe(activities => {
      this.activities = activities;
    });
  }

  loadActivityLog() {
    this.activityLog = this.activitieslogService.getActivityLogsByDate(this.selectedDate);
  }

  addActivity() {
    const caloriesBurned = this.selectedActivity.caloriesPerMinute * this.minutes;
    const newActivity = {
      name: this.selectedActivity.name,
      minutes: this.minutes,
      calories: caloriesBurned,
      date: this.selectedDate
    };
    this.activitieslogService.addActivityLog(newActivity);
    this.loadActivityLog();
    this.showAddActivity = false;
  }
}
