import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  constructor(private http: HttpClient) {}

  getFoods() {
    return this.http.get<any[]>('assets/data/foods.json');
  }
}
