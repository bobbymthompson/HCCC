import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { CommandCenterData } from '../../providers/command-center-data';
import { RecipeDetailPage } from '../recipe-detail/recipe-detail';
import { RecipeDataProvider, WeeklyMenuItem } from '../../providers/recipe-data-provider';

@Component({
  selector: 'page-weekly-menu',
  templateUrl: 'weekly-menu.html'
})
export class WeeklyMenuPage {
  //days: Array<any>;
  weeklyMenuItems: Observable<WeeklyMenuItem[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, public commandCenterData: CommandCenterData, public recipeDataProvider: RecipeDataProvider) { }

  ionViewDidLoad() {

    this.weeklyMenuItems = this.recipeDataProvider.weeklyMenuItems;
    this.recipeDataProvider.loadWeeklyMenuItems(new Date());

    // this.days = [];
    // this.populate();
  }

  ionViewDidEnter() {
    // this.commandCenterData.getWeeklyMenu(new Date()).subscribe(menus => {

    //   for (let day of this.days) {

    //     let recipe = this.getRecipeForDate(menus, day.date);
    //     if (recipe && !day.recipe) {
    //       console.log('Updating recipe:');
    //       console.log(recipe);
    //       day.recipe = recipe;
    //     } else if (recipe && day.recipe && recipe.id !== day.recipe.id) {
    //       console.log('Updating recipe');
    //       day.recipe = recipe;
    //     }
    //   }
    // });

    // this.days = [];
    // this.populate();
  }

  public viewRecipe(recipe: any) {

    if (recipe) {
      this.commandCenterData.getRecipe(recipe.id).subscribe(foundRecipe => {
        if (foundRecipe) {
          this.navCtrl.push(RecipeDetailPage, foundRecipe);
        }
      });
    }
  }

  // private populate() {

  //   console.log('Loading weekly menu');

  //   this.commandCenterData.getWeeklyMenu(new Date()).subscribe(menus => {
  //     console.log('Populating weekly menu');
  //     this.populateDays(menus);
  //   });
  // }

  // private populateDays(menus: Array<any>) {

  //   var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  //   var today = new Date();

  //   for (let i = 0; i < 10; i++) {

  //     let date = new Date();
  //     date.setDate(date.getDate() + i)

  //     let day = today.getDay() + i;
  //     if (day >= 7) {
  //       day = day - 7;
  //     }

  //     this.days.push({
  //       title: days[day],
  //       displayDate: (today.getMonth() + 1) + '/' + (today.getDate() + i),
  //       date: date,
  //       recipe: this.getRecipeForDate(menus, date)
  //     });
  //   }
  // }

  // private getRecipeForDate(menus: Array<any>, date: Date): any {

  //   for (let menu of menus) {
  //     let menuDate = new Date(menu.date);

  //     if (menuDate.getDay() === date.getDay() &&
  //       menuDate.getMonth() === date.getMonth() &&
  //       menuDate.getFullYear() === date.getFullYear()) {

  //       return menu.recipe;
  //     }
  //   }

  //   return null;
  // }
}
