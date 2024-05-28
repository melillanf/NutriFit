import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  meals: any[] = []; // Aquí almacenaremos los registros de comidas

  constructor() {}

  getMealsByDate(date: Date): any[] {
    // Lógica para obtener registros de comidas por fecha
    return this.meals.filter(meal => new Date(meal.date).toDateString() === date.toDateString());
  }

  addMeal(meal: any) {
    this.meals.push(meal);
  }
}
