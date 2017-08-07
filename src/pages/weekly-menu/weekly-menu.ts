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
  weeklyMenuItems: Observable<WeeklyMenuItem[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, public commandCenterData: CommandCenterData, public recipeDataProvider: RecipeDataProvider) { }

  ionViewDidLoad() {

    this.weeklyMenuItems = this.recipeDataProvider.weeklyMenuItems;
    this.recipeDataProvider.loadWeeklyMenuItems(new Date());
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

  public removeFromWeeklyMenu(wmi: WeeklyMenuItem) {
    console.log('Removing weekly menu item: %s', wmi.id);
    console.log(wmi);
    this.recipeDataProvider.removeWeeklyMenuItem(wmi.id);
  }
}
