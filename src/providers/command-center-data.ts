import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';

import { UserData } from './user-data';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import * as _ from 'underscore';

@Injectable()
export class CommandCenterData {
  configuration: any;
  recipes: any;
  weeklyMenuItems: any;

  constructor(public http: Http, public user: UserData) { }

  loadConfiguration(): any {
    if (this.configuration) {
      return Observable.of(this.configuration);
    } else {
      return this.http.get('assets/data/data.json')
        .map((res: Response) => {
          this.configuration = res.json();
          return this.configuration;
        });
    }
  }

  loadRecipes(): any {
    if (this.recipes) {
      return Observable.of(this.recipes);
    }
    else {
      return this.http.get('http://localhost:9000/recipes')
        .map((res: Response) => {
          this.recipes = res.json();
          return this.recipes;
        });
    }
  }

  // loadWeeklyMenuItems(date: Date): Observable<any> {
  //   if (this.weeklyMenuItems) {
  //     console.log('Loading weekly menu items from local - Count: %s', this.weeklyMenuItems.length);
  //     return Observable.of(this.weeklyMenuItems);
  //   }
  //   else {

  //     console.log('Loading weekly menu items from server');
  //     var formattedToday = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();

  //     return this.http.get('http://localhost:9000/weekly-menus/' + formattedToday)
  //       .map((res: Response) => {
  //         this.weeklyMenuItems = res.json();
  //         return this.weeklyMenuItems;
  //       });
  //   }
  // }

  getRecipeCategories() {
    return this.loadConfiguration().map(configuration => {
      return configuration.categories;
    });
  }

  getRecipes(category: string) {
    return this.loadRecipes().map(recipes => {

      if (!category) {
        return recipes;
      }

      return _.where(recipes, { category: category });
    });
  }

  public getRecipe(id: string) {
    return this.loadRecipes().map(recipes => {
      return _.findWhere(recipes, { id: id });
    });
  }

  // public getWeeklyMenu(date: Date): Observable<any> {

  //   return this.loadWeeklyMenuItems(date).map(weeklyMenuItems => {
  //     return weeklyMenuItems;
  //   });
  // }

  // public addRecipeToWeeklyMenu(date: Date, recipe: any) {

  //   console.log('Adding recipe to weekly menu');

  //   let wmi = {
  //     date: (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear(),
  //     _recipe: recipe.id
  //   }

  //   console.log(`Date: ${wmi.date} - Recipe: ${wmi._recipe}`);

  //   this.http.post('http://localhost:9000/weekly-menus/', wmi).map(res => res.json()).subscribe(data => {
  //     console.log('Pushing new wmi:');
  //     console.log(data);
  //     if (!this.weeklyMenuItems) this.weeklyMenuItems = [];
  //     this.weeklyMenuItems.push(data);
  //   });
  // }

  // public getShoppingList(): Observable<any> {

  //   return this.http.get('http://localhost:9000/shopping-list-items/')
  //     .map((res: Response) => res.json());
  // }

  // public addIngredientsToShoppingList(ingredients: Array<any>) {

  //   console.log('Adding ingredients to shopping list');

  //   this.http.post('http://localhost:9000/shopping-list-items/', ingredients).map(res => res.json()).subscribe(data => {

  //   });
  // }
}
