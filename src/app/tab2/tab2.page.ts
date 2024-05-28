import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

interface Food {
  name: string;
  caloriesPerGram: number;
}

interface FoodRecord {
  food: string;
  grams: number;
  calories: number;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  selectedDate: string = new Date().toISOString();
  foods: Food[] = [];
  foodRecords: FoodRecord[] = [];

  constructor(private http: HttpClient, private alertCtrl: AlertController) {
    this.loadFoods();
  }

  loadFoods() {
    this.http.get<Food[]>('./assets/data/foods.json').subscribe(data => {
      this.foods = data;
    });
  }

  async addRecord() {
    const alert = await this.alertCtrl.create({
      header: 'Agregar nuevo registro',
      inputs: this.foods.map(food => ({
        type: 'radio',
        label: food.name,
        value: food.name,
        checked: food === this.foods[0] // Marcar como seleccionado el primer alimento
      })),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Agregar',
          handler: (data) => {
            const selectedFood = this.foods.find(food => food.name === data);
            if (selectedFood) {
              const gramsInput = alert.inputs.find(input => input.checked);
              const grams = gramsInput ? parseInt(gramsInput.value) : 0; // Obtener los gramos del alimento seleccionado
              const calories = grams * selectedFood.caloriesPerGram;
              this.foodRecords.push({
                food: selectedFood.name,
                grams: grams,
                calories: calories
              });
            }
          }
        }
      ]
    });
  
    await alert.present();
  }
}
