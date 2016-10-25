import { Component } from '@angular/core';
import { Xapi } from '../../xmodule/providers/xapi';
import * as xi from '../../xmodule/interfaces/xapi';
import { NavController } from 'ionic-angular';
import { Dashboard } from '../dashboard/dashboard';
@Component({
  templateUrl: 'login.html'
})
export class LoginPage {
  user: xi.UserLogin = xi.userLogin;
  loading: boolean = false;
  resultmessage: string = '';
  constructor(
    private api: Xapi,
    private navCtrl: NavController
    ) {
    console.log('LoginComponent::constructor()');
    this.api.getLoginData( x => this.userAlreadyLoggedIn(x) );
  }
  userAlreadyLoggedIn( user: xi.UserLoginData ) {
  }

  onClickLogin() {
    console.log("LoginComponent::onClickRegister()");
    this.loading = true;
 
    this.api.login( this.user, ( re: xi.RegisterResponse ) => {
    this.loading = false;
    this.resultmessage = '';
      
      if ( re.success ) {
        console.log("LoginComponent::onClickRegister() success");
        this.navCtrl.setRoot( Dashboard );
      }
      else {
        console.log("LoginComponent::onClickRegister() error");
        this.resultmessage = <string>re.data;
      }
    },
    ( err ) => {
      this.loading = false;

      console.log('LoginComponent::onClickRegister() error: ', err);

    });
  }
}

