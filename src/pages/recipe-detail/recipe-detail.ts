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

@Component({
  selector: 'page-recipe-detail',
  templateUrl: 'recipe-detail.html'
})
export class RecipeDetailPage {
  recipe: any;

  constructor(public navParams: NavParams, public navCtrl: NavController, public commandCenterData: CommandCenterData) {
    this.recipe = navParams.data;
  }

  ionViewDidLoad() {

    // this.commandCenterData.getRecipes("").subscribe(recipes => {
    //   this.recipes = recipes;
    // });
  }
}
