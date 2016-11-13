import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';

/*
  Generated class for the Test page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class TestPage {

  constructor(private navCtrl: NavController) {
    // this.navCtrl.setRoot( DashboardPage )
  }

  ionViewDidLoad() {
    this.test();
  }

  test(){
    this.navCtrl.setRoot( DashboardPage )
  }

}
