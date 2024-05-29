import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  meals: any[] = []; // Aquí almacenaremos los registros de comidas

  constructor(private notificationService: NotificationService) {}

  getMealsByDate(date: Date): any[] {
    // Lógica para obtener registros de comidas por fecha
    return this.meals.filter(meal => meal.date === date);
  }

  addMeal(meal: any) {
    this.meals.push(meal);
    this.notificationService.notifyRefreshNeeded();
  }
}
