import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-food-modal',
  templateUrl: './food-modal.component.html',
  styleUrls: ['./food-modal.component.scss'],
})
export class FoodModalComponent {
  @Input() foodOptions: { id: number, name: string }[] = []; // Inicialización aquí
  newFood = { id: null, grams: null, calories: null };

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }

  addFood() {
    if (this.newFood.id && this.newFood.grams && this.newFood.calories) {
      const selectedFood = this.foodOptions.find(food => food.id === this.newFood.id);
      if (selectedFood) {
        const foodLogItem = {
          name: selectedFood.name,
          grams: this.newFood.grams,
          calories: this.newFood.calories
        };
        this.modalController.dismiss(foodLogItem);
      }
    } else {
      alert('Todos los campos son obligatorios');
    }
  }
}
