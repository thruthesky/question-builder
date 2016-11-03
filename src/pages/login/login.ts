import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import * as firebase from 'firebase';
import { UserAuth } from '../../providers/user-auth';
import { HomePage } from '../home/home';
import { RegistrationPage } from '../registration-page/registration-page';
import { PasswordReset } from '../password-reset/password-reset';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user:string;
  password:string;
  loading: boolean = false;


  constructor(
    private navCtrl: NavController,
    private userAuth: UserAuth
    ) {
  }

  ionViewDidLoad() {
    console.log( 'Hello Login Page' );
  }

  onClickLogin(){
    this.loading = true;
    this.userAuth.login(this.user, this.password)
      .then(userAuth =>{
      this.navCtrl.setRoot( HomePage );
    }, error => {
      alert(error.message)
    })
  }

  onClickSignup(){
    this.navCtrl.push( RegistrationPage )
  }

  onClickForgot(){
    this.navCtrl.push( PasswordReset )
  }

  onClickLogout(){
    this.userAuth.logoutUser().then(() => {
      this.navCtrl.setRoot(LoginPage);
    });
  }

}
