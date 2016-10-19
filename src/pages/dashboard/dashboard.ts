import { Component } from '@angular/core';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { Questionsform } from '../questionsform/questionsform';
import { Delete } from '../delete/delete';
import { NavController, Events, ViewController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import * as xi from '../../xmodule/interfaces/xapi';
import { Xapi } from '../../xmodule/providers/xapi';
import { PageController } from '../../xmodule/providers/page-controller';
import { AlertController } from 'ionic-angular';
import { QuestionList } from '../question-list/question-list';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class Dashboard {
  appTitle = "Hello World!";
  userLogged:string;
  user: xi.UserLoginData;
  
  constructor(private navCtrl: NavController, private alertCtrl: AlertController, private viewCtrl: ViewController ,private events: Events,private x: Xapi, private navPar: NavParams) {
    console.log("Dashboard::constructor()");
      this.x.getLoginData( (user:xi.UserLoginData) => {
        console.log( 'Dashboard::constructor() x.getLogin() callback: ', user);
        if ( user ) {
          if ( user.user_login == 'admin' ) this.user = user;
          else {
            this.x.error("Please login as admin.");
            this.x.logout();
            navCtrl.setRoot( LoginPage );
          }
        }
        else navCtrl.setRoot( LoginPage );
      } );
  }
  
  
  ionViewDidLoad() {
    setTimeout( () => {
      this.onClickList();
    } , 400 );
  }

  onClickLogout() {
    console.log("onClickLogout()");
    this.x.logout();
    this.user = '';
  } 
  
  onClickLogin() {
    this.navCtrl.setRoot( LoginPage );
  }
  
  onClickAdd() {
    this.navCtrl.setRoot( Questionsform );
  }
  
  onClickList() {
    this.navCtrl.setRoot( QuestionList ); 
  }
}
