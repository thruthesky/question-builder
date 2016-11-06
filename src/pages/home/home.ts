import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { LoginPage } from '../login/login'
import { AngularFire } from 'angularfire2';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public af: AngularFire
    ) {
          this.af.auth.subscribe(auth =>{
      if(auth){
        this.navCtrl.setRoot( DashboardPage );
      }
      else this.navCtrl.setRoot( LoginPage );
    });
    }

  ionViewDidLoad() {
    console.log('Hello HomePage Page');
  }

}
