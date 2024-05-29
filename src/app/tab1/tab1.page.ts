import { Component, OnInit } from '@angular/core';
import { MealService } from '../services/meal.service';
import { ActivitieslogService } from '../services/activitieslog.service';
import { NotificationService } from '../services/notification.service';
@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  selectedDate: Date = new Date(); // Inicia con la fecha actual
  balanceLog: any[] = [];

  constructor(
    private mealService: MealService,
    private activitieslogService: ActivitieslogService
  ) {}

  ngOnInit() {
    this.loadBalance();
  }

  loadBalance() {
    const foodLogs = this.mealService.getMealsByDate(this.selectedDate);
    const activityLogs = this.activitieslogService.getActivityLogsByDate(this.selectedDate);

    const caloriesConsumed = foodLogs.reduce((sum, log) => sum + log.calories, 0);
    const caloriesBurned = activityLogs.reduce((sum, log) => sum + log.calories, 0);
    const caloricBalance = caloriesConsumed - caloriesBurned;

    this.balanceLog = [{
      date: this.selectedDate,
      caloriesConsumed: caloriesConsumed,
      caloriesBurned: caloriesBurned,
      caloricBalance: caloricBalance
    }];
  }
}
