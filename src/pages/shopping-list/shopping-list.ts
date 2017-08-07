import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ShoppingListDataProvider, ShoppingListItem } from '../../providers/recipe-data-provider';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {

  shoppingListItems: Observable<ShoppingListItem[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, public shoppingListDataProvider: ShoppingListDataProvider) {}

  ionViewDidLoad() {
    this.shoppingListItems = this.shoppingListDataProvider.shoppingListItems;
    this.shoppingListDataProvider.load();
  }

  public editShoppingListItem(sli: ShoppingListItem) {
    console.log(sli);
  }

  public removeShoppingListItem(sli: ShoppingListItem) {
    this.shoppingListDataProvider.remove(sli.id);
  }
}
