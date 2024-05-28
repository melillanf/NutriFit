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
  meals: any[] = []; // Agregamos la definición de la propiedad meals
  selectedFood: any;
  constructor(private foodService: FoodService, private mealService: MealService) {}

  ngOnInit() {
    this.loadFoods();
    this.loadMeals(); // Llamamos a la función loadMeals al iniciar la página
  }

  loadFoods() {
    this.foodService.getFoods().subscribe(foods => {
      this.foods = foods;
    });
  }

  loadMeals() {
    // Implementa la lógica para cargar los registros de comidas
    this.meals = this.mealService.getMealsByDate(this.selectedDate);
  }

  calculateCalories(food: any, grams: number): number {
    return food.coeficiente * grams;
  }

  addMeal(food: any, grams: number) {
    const calories = this.calculateCalories(food, grams);
    this.mealService.addMeal({ food, grams, calories, date: this.selectedDate });
    this.loadMeals(); // Actualizamos la lista de comidas después de agregar una nueva
  }
}
