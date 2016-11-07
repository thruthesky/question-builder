import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { User, USER_DATA } from "../../fireframe2/user";

interface userMeta extends USER_DATA {
  displayName:string;
  age:string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'login.html'
})
export class LoginPage {

  userData = <userMeta> {};
  regUserMail:string;
  regUserPass:string;

  loginUserMail:string;
  loginUserPass:string;

  authentication: string = 'login';

  constructor(
    public navCtrl: NavController,
    private user: User,
    private toastCtrl: ToastController
  ) {
    this.checkUser();
  }


// observable
//  checks anfularfire auth if user is logged in.
  checkUser() {
    this.user.loggedIn( (userData) => {
      this.navCtrl.setRoot( DashboardPage );
    }, e => alert( e ) );
  }

  onClickTest(){

  }

  onClickReset(){
    this.userData.email = undefined;
    this.userData.password = undefined;
    this.userData.displayName = undefined;
  }
  ionViewWillEnter(){
    // this.checkUser();
  }
  ionViewDidLoad(){
   
  }
  onClickLogin(){
    this.user
      .set('email', this.loginUserMail)
      .set('password', this.loginUserPass)
      .login( re => {
        console.log(re)
      }, e => {
        console.log(e)
        let failToast = this.toastCtrl.create({
          message: e,
          duration: 1500
        })
        failToast.present();
      });
  }
  onClickRegister(){
    this.user
     .sets(this.userData)
     .register(
        ( ) => this.alert('User registration success'),
        (e) => this.alert(e) );
  }
  alert(e) {
    this.toastCtrl.create({ message: e, duration: 1500 }).present();
  }
}
