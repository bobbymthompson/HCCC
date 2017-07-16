import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';

import { UserData } from './user-data';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import * as _ from 'underscore';

@Injectable()
export class  CommandCenterData {
  data: any;

  constructor(public http: Http, public user: UserData) { }

  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get('assets/data/data.json')
        .map((res:Response) => {
          this.data = res.json();
          return this.data;
        });
    }
  }

  getRecipeCategories() {
    return this.load().map(data => {
      return data.categories;
    });
  }

  getRecipes(category: string) {
    return this.load().map(data => {
      
      if (!category) {
        return data.recipes;
      }

      return _.where(data.recipes, { category: category });
    });
  }

}
