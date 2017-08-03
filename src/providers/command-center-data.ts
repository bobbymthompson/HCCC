import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';

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
}
