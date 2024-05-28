import { Component } from '@angular/core';
import { FoodService } from '../services/food.service';
import { MealService } from '../services/meal.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  selectedDate: Date = new Date();
  foods: any[] = [];
  grams: number = 0;
  meals: any[] = [];
  selectedFood: any;
  showAddForm: boolean = false;

  constructor(private foodService: FoodService, private mealService: MealService) {}

  ngOnInit() {
    this.loadFoods();
    this.loadMeals();
  }

  loadFoods() {
    this.foodService.getFoods().subscribe(foods => {
      this.foods = foods;
    });
  }

  loadMeals() {
    this.meals = this.mealService.getMealsByDate(this.selectedDate);
  }

  calculateCalories(food: any, grams: number): number {
    if (!food || isNaN(grams) || isNaN(food.calorias)) {
      return 0; // Manejar el caso de datos inválidos
    }
    // Convertir las calorías por cada 100 gramos a las calorías según la cantidad ingresada por el usuario
    return (food.calorias / 100) * grams;
  }

  addMeal(food: any, grams: number) {
    const calories = this.calculateCalories(food, grams);
    this.mealService.addMeal({ food, grams, calories, date: this.selectedDate });
    this.loadMeals();
  }
}
