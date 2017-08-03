import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import * as _ from 'underscore';

@Component({
  selector: 'page-weekly-menu-add',
  templateUrl: 'weekly-menu-add.html'
})
export class WeeklyMenuAddPage {
  recipe: any;
  days: Array<any>;
  selectedDay: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.days = [];
    this.recipe = {
      name: navParams.data.recipe.name,
      ingredients: _.map(navParams.data.recipe.ingredients, _.clone)
    }

    this.populateDays();
  }

  toggleDay(day: any) {
    if (this.selectedDay) {
      this.selectedDay.selected = false;
    }

    this.selectedDay = day;
    this.selectedDay.selected = true;
  }

  close(cancel) {

    if (cancel) {
      this.viewCtrl.dismiss(null);
    } else {
      this.viewCtrl.dismiss({
        selectedDay: this.selectedDay,
        neededIngredients: this.recipe.ingredients.filter((ingredient) => ingredient.checked)
      });
    }
  }

  private populateDays() {

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var today = new Date();

    for (let i = 0; i < 10; i++) {
      
      let date = new Date();
      date.setDate(date.getDate() + i)

      let day = today.getDay() + i;
      if (day >= 7) {
        day = day - 7;
      }
      
      this.days.push({
        title: days[day],
        displayDate: (today.getMonth() + 1) + '/' + (today.getDate() + i),
        date: date
      });
    }
  }
}
