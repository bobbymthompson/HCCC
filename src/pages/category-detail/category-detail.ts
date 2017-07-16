import {
  Component
} from '@angular/core';

import {
  NavParams,
  NavController
} from 'ionic-angular';
import {
  CommandCenterData
} from '../../providers/command-center-data';
import {
  RecipeDetailPage
} from '../recipe-detail/recipe-detail';

@Component({
  selector: 'page-category-detail',
  templateUrl: 'category-detail.html'
})
export class CategoryDetailPage {
  category: any;
  allRecipes = [];
  recipes = [];
  
  searchQuery: string = '';
  items: string[];

  constructor(public navParams: NavParams, public navCtrl: NavController, public commandCenterData: CommandCenterData) {
    this.category = navParams.data;
  }

  ionViewDidLoad() {
    console.log("Category: '%s'", this.category.title);
    this.commandCenterData.getRecipes(this.category.title).subscribe(recipes => {
      this.allRecipes = recipes;
      this.recipes = recipes;
    });
  }

  navigateToRecipe(recipe) {
    this.navCtrl.push(RecipeDetailPage, recipe);
  }

  searchRecipes(ev: any) {
    // Reset items back to all of the items
    this.recipes = this.allRecipes;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.recipes = this.recipes.filter((recipe: any) => {
        return (recipe.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
