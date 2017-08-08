import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { ShoppingListDataProvider, ShoppingListItem } from '../../providers/recipe-data-provider';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {
  sliChanged: Subject<ShoppingListItem> = new Subject<ShoppingListItem>();

  shoppingListItems: Observable<ShoppingListItem[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, public shoppingListDataProvider: ShoppingListDataProvider, public modalCtrl: ModalController) {
    this.sliChanged
      .debounceTime(1000)
      .subscribe((sli) => {
        console.log('Value changed: %s', JSON.stringify(sli));
        this.shoppingListDataProvider.update(sli);
      });
  }

  ionViewDidLoad() {
    this.shoppingListItems = this.shoppingListDataProvider.shoppingListItems;
    this.shoppingListDataProvider.load();
  }

  public addNewShoppingListItem() {
    
    let sli = <ShoppingListItem>{};
    sli.description = '';
    this.shoppingListDataProvider.create(sli);
  }

  public removeShoppingListItem(sli: ShoppingListItem) {
    this.shoppingListDataProvider.remove(sli.id);
  }

  public itemUpdated(newDescription: string, sli: ShoppingListItem) {
    sli.description = newDescription;
    this.sliChanged.next(sli);
  }
}