import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Config } from '../providers/config-provider';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { SlicePipe } from '@angular/common';

export interface Recipe {
  id: string;
  name: string;
  description: string;
}

export interface WeeklyMenuItem {
  id: string;
  date: Date;
  recipe: Recipe;
  displayDate: string;
  dayOfTheWeek: string;
}

@Injectable()
export class RecipeDataProvider {
  weeklyMenuItems: Observable<WeeklyMenuItem[]>
  private _weeklyMenuItems: BehaviorSubject<WeeklyMenuItem[]>;
  private dataStore: {
    weeklyMenuItems: WeeklyMenuItem[]
  };

  constructor(private http: Http, private config: Config) {
    this.dataStore = { weeklyMenuItems: [] };
    this._weeklyMenuItems = <BehaviorSubject<WeeklyMenuItem[]>>new BehaviorSubject([]);
    this.weeklyMenuItems = this._weeklyMenuItems.asObservable();
  }
  
  loadWeeklyMenuItems(date: Date) {

    var formattedToday = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();

    this.http.get(this.config.get('endPoint') + '/weeklymenuitems/' + formattedToday).map(res => res.json()).subscribe(data => {

      this.dataStore.weeklyMenuItems = data;
      this.dataStore.weeklyMenuItems.forEach((wmi) => this.formatWeeklyMenuItem(wmi));

      this._weeklyMenuItems.next(Object.assign({}, this.dataStore).weeklyMenuItems);

    }, error => console.log('Could not load weekly menu items.'));
  }

  createWeeklyMenuItem(wmi: WeeklyMenuItem) {

    console.log('Adding recipe to weekly menu:');
    console.log(wmi);

    let postData = {
      date: (wmi.date.getMonth() + 1) + '-' + wmi.date.getDate() + '-' + wmi.date.getFullYear(),
      recipe: wmi.recipe.id
    }

    this.http.post(this.config.get('endPoint') + '/weeklymenuitems/', postData).map(res => res.json()).subscribe(data => {
      
      wmi.id = data.id;
      this.formatWeeklyMenuItem(wmi);
      this.dataStore.weeklyMenuItems.push(wmi);
      this._weeklyMenuItems.next(Object.assign({}, this.dataStore).weeklyMenuItems);

    }, error => console.log('Could not create weekly menu item.'));
  }

  removeWeeklyMenuItem(wmiId: string) {
    this.http.delete(this.config.get('endPoint') + `/weeklymenuitems/${wmiId}`).subscribe(response => {
      
      this.dataStore.weeklyMenuItems.forEach((t, i) => {
        if (t.id === wmiId) { this.dataStore.weeklyMenuItems.splice(i, 1); }
      });

      this._weeklyMenuItems.next(Object.assign({}, this.dataStore).weeklyMenuItems);

    }, error => console.log('Could not delete weekly menu item.'));
  }

  private formatWeeklyMenuItem(wmi: WeeklyMenuItem) {

    wmi.date = new Date(wmi.date);

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    console.log('WMI:');
    console.log(wmi);

    let day = wmi.date.getDay();
    if (day >= 7) day = day - 7;

    wmi.dayOfTheWeek = days[day];
    wmi.displayDate = (wmi.date.getMonth() + 1) + '/' + (wmi.date.getDate());
  }
}

export interface ShoppingListItem {
  id: string;
  text: string;
}

@Injectable()
export class ShoppingListDataProvider {
  shoppingListItems: Observable<ShoppingListItem[]>
  private _shoppingListItems: BehaviorSubject<ShoppingListItem[]>;
  private dataStore: {
    shoppingListItems: ShoppingListItem[]
  };

  constructor(private http: Http, private config: Config) {
    this.dataStore = { shoppingListItems: [] };
    this._shoppingListItems = <BehaviorSubject<ShoppingListItem[]>>new BehaviorSubject([]);
    this.shoppingListItems = this._shoppingListItems.asObservable();
  }
  
  load() {

    this.http.get(this.config.get('endPoint') + '/shoppingListItems/').map(res => res.json()).subscribe(data => {

      this.dataStore.shoppingListItems = data;

      this._shoppingListItems.next(Object.assign({}, this.dataStore).shoppingListItems);

    }, error => console.log('Could not load shopping list items.'));
  }

  create(sli: ShoppingListItem) {

    this.http.post(this.config.get('endPoint') + '/shoppingListItems/', sli).map(res => res.json()).subscribe(data => {
      
      this.dataStore.shoppingListItems.splice(0, 0, data);

      this._shoppingListItems.next(Object.assign({}, this.dataStore).shoppingListItems);

    }, error => console.log('Could not create shopping list item.'));
  }

  createFromList(items: ShoppingListItem[]) {

    items.forEach(sli => {
      this.create(sli);
    });

    // this.http.post(this.config.get('endPoint') + '/shoppingListItems/', items).map(res => res.json()).subscribe(data => {
      
    //   this.dataStore.shoppingListItems.push(data);

    //   this._shoppingListItems.next(Object.assign({}, this.dataStore).shoppingListItems);

    // }, error => console.log('Could not create shopping list item.'));
  }

  update(sli: ShoppingListItem) {

    this.http.put(this.config.get('endPoint') + `/shoppingListItems/${sli.id}`, { text: sli.text }).map(res => res.json()).subscribe(data => {
        this.dataStore.shoppingListItems.forEach((t, i) => {
          if (t.id === data.id) { this.dataStore.shoppingListItems[i] = data; }
        });

        this._shoppingListItems.next(Object.assign({}, this.dataStore).shoppingListItems);
      }, error => console.log('Could not update shopping list item.'));
  }

  remove(sliId: string) {

    this.http.delete(this.config.get('endPoint') + `/shoppingListItems/${sliId}`).subscribe(response => {
      
      this.dataStore.shoppingListItems.forEach((t, i) => {
        if (t.id === sliId) { this.dataStore.shoppingListItems.splice(i, 1); }      });

      this._shoppingListItems.next(Object.assign({}, this.dataStore).shoppingListItems);

    }, error => console.log('Could not delete shopping list item.'));
  }
}