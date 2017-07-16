import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { CategoryListPage } from '../category-list/category-list';
import { WeeklyMenuPage } from '../weekly-menu/weekly-menu';
import { ShoppingListPage } from '../shopping-list/shopping-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = CategoryListPage;
  tab2Root: any = WeeklyMenuPage;
  tab3Root: any = ShoppingListPage;
  tab4Root: any = CategoryListPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
