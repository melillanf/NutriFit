import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  foodLog = [
    { name: 'Alimento 1', grams: 100, calories: 200 },
    { name: 'Alimento 2', grams: 200, calories: 1000 },
    { name: 'Alimento 3', grams: 150, calories: 500 },
    { name: 'Alimento 4', grams: 50, calories: 100 }
  ];

  selectedDate: string = '';
  isModalOpen = false;
  newFood = { id: null, name: '', grams: null, calories: null };
  foodOptions: { id: number, name: string }[] = [];

  constructor(private foodService: FoodService) {}

  ngOnInit() {
    this.loadFoods();
  }

  loadFoods() {
    this.foodService.getFoods().subscribe(
      (data: { id: number, name: string }[]) => {
        this.foodOptions = data;
      },
      (error: any) => {
        console.error('Error loading foods', error);
      }
    );
  }

  openAddFoodModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  addFood() {
    if (this.newFood.id && this.newFood.grams && this.newFood.calories) {
      const selectedFood = this.foodOptions.find(food => food.id === this.newFood.id);
      if (selectedFood) {
        this.foodLog.push({
          name: selectedFood.name,
          grams: this.newFood.grams,
          calories: this.newFood.calories
        });
        this.newFood = { id: null, name: '', grams: null, calories: null };
        this.isModalOpen = false;
      }
    } else {
      alert('Todos los campos son obligatorios');
    }
  }
}
