import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';

interface Food {
  id: number;
  name: string;
  grams: number;
}

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  foodTypes: any[] = [];
  foodLog: Food[] = [];
  selectedFoodId: number = 0; // Inicializar como 0
  grams: number = 0; // Inicializar como 0

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.loadFoodTypes();
  }

  loadFoodTypes() {
    this.http.get<any[]>('assets/food-types.json').subscribe(data => {
      this.foodTypes = data;
    });
  }

  openAddFoodModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  addFood() {
    if (this.newFood.name && this.newFood.grams && this.newFood.calories) {
      this.foodLog.push({ ...this.newFood });
      this.newFood = { name: '', grams: null, calories: null };
      this.isModalOpen = false;
    } else {
      // Optionally show a message that all fields are required
      alert('Todos los campos son obligatorios');
    }
  }
}
