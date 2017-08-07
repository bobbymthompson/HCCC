import { NgModule } from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { CommandCenter } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { CategoryListPage } from '../pages/category-list/category-list';
import { CategoryDetailPage } from '../pages/category-detail/category-detail'; 
import { RecipeDetailPage } from '../pages/recipe-detail/recipe-detail'; 
import { WeeklyMenuPage } from '../pages/weekly-menu/weekly-menu';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { WeeklyMenuAddPage } from '../pages/weekly-menu-add/weekly-menu-add';

import { CommandCenterData } from '../providers/command-center-data';
import { RecipeDataProvider, ShoppingListDataProvider } from '../providers/recipe-data-provider';
import { UserData } from '../providers/user-data';
import { Config } from '../providers/config-provider';


@NgModule({
  declarations: [
    CommandCenter,    
    TabsPage,
    CategoryListPage,
    CategoryDetailPage,
    RecipeDetailPage,
    WeeklyMenuPage,
    ShoppingListPage,
    WeeklyMenuAddPage
  ],
  imports: [
    IonicModule.forRoot(CommandCenter)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CommandCenter,
    TabsPage,
    CategoryListPage,
    CategoryDetailPage,
    RecipeDetailPage,
    WeeklyMenuPage,
    ShoppingListPage,
    WeeklyMenuAddPage
  ],
  providers: [ CommandCenterData, UserData, RecipeDataProvider, ShoppingListDataProvider, Config, Storage]
})
export class AppModule { }
