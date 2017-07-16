import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';

import { CommandCenterData } from '../providers/command-center-data';
import { UserData } from '../providers/user-data';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
}

@Component({
  templateUrl: 'app.template.html'
})
export class CommandCenter {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
    { title: 'Recipes', component: TabsPage, icon: 'list' },
    { title: 'Weekly Menu', component: TabsPage, index: 1, icon: 'calendar' },
    { title: 'Shopping List', component: TabsPage, index: 2, icon: 'cart' },
    { title: 'Search', component: TabsPage, index: 3, icon: 'search' }
  ];
  
  rootPage: any;

  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public commandCenterData:  CommandCenterData,
    public storage: Storage
  ) {

    this.rootPage = TabsPage;

    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      Splashscreen.hide();
    });

    // load the command center data
    commandCenterData.load();
  }

  openPage(page: PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, { tabIndex: page.index });

    } else {
      this.nav.setRoot(page.component).catch(() => {
        console.log("Didn't set nav root");
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      // setTimeout(() => {
      //   this.userData.logout();
      // }, 1000);
    }
  }
}
