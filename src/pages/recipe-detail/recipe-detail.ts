import { Component } from '@angular/core';
import { NavParams, NavController, ModalController } from 'ionic-angular';
import { CommandCenterData } from '../../providers/command-center-data';
import { WeeklyMenuAddPage } from '../weekly-menu-add/weekly-menu-add';
import { RecipeDataProvider, ShoppingListDataProvider, WeeklyMenuItem, ShoppingListItem } from '../../providers/recipe-data-provider';
import * as _ from 'underscore';

@Component({
  selector: 'page-recipe-detail',
  templateUrl: 'recipe-detail.html'
})
export class RecipeDetailPage {
  recipe: any;

  constructor(
    public navParams: NavParams, 
    public navCtrl: NavController, 
    public commandCenterData: CommandCenterData, 
    public recipeDataProvider: RecipeDataProvider, 
    public shoppingListDataProvider: ShoppingListDataProvider,
    public modalCtrl: ModalController) {

    this.recipe = navParams.data;
  }

  public addRecipeToWeeklyMenu() {

    let modal = this.modalCtrl.create(WeeklyMenuAddPage, { recipe: this.recipe });

    modal.onDidDismiss((data) => {
      
      if (data) {

        let wmi = <WeeklyMenuItem>{};
        wmi.date = data.selectedDay.date;
        wmi.recipe = this.recipe;
        
        this.recipeDataProvider.createWeeklyMenuItem(wmi);
        
        let ingredients = _.map(data.neededIngredients, (ingredient) => {
          let sli = <ShoppingListItem>{};
          sli.text = ingredient.text;
          return sli;
        });

        this.shoppingListDataProvider.createFromList(ingredients);
      }
    });

    modal.present();
  }
}
