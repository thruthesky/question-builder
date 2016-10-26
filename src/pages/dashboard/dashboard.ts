import { Component } from '@angular/core';
import { LoginPage } from '../login/login';
import { PostEditPage } from  '../post-edit/post-edit';
import { NavController, Events, ViewController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import * as xi from '../../xmodule/interfaces/xapi';
import { Xapi } from '../../xmodule/providers/xapi';
import { QuestionList } from '../question-list/question-list';
import { AlertController } from 'ionic-angular';
// import { QuestionList } from '../question-list/question-list';

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
      x.serverUrl = "http://work.org/wordpress/index.php/";
  }


  ionViewDidLoad() {
    // setTimeout( () => {
    //   this.onClickList();
    // } , 400 );
  }

  onClickLogout() {
    console.log("onClickLogout()");
    this.x.logout();
    this.user = '';
    setTimeout(()=>{
      this.navCtrl.setRoot(LoginPage);
    }, 300)
  }

  onClickLogin() {
    this.navCtrl.setRoot( LoginPage );
  }

  onClickAdd() {
    this.navCtrl.setRoot( PostEditPage, {
      title: 'Create'
    } );
  }

  onClickList() {
    this.navCtrl.setRoot( QuestionList );
  }
}
