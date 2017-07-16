import {
  Component
} from '@angular/core';

import {
  ActionSheetController,
  Config,
  NavController
} from 'ionic-angular';

import {
  CommandCenterData
} from '../../providers/command-center-data';
import {
  CategoryDetailPage
} from '../category-detail/category-detail';

@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html'
})
export class CategoryListPage {
  categories = [];

  constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public commandCenterData: CommandCenterData, public config: Config) { }

  ionViewDidLoad() {
    this.commandCenterData.getRecipeCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  navigateToCategory(category) {
    this.navCtrl.push(CategoryDetailPage, category);
  }
}
