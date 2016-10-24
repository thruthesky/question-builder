import { Component } from '@angular/core';
import { Xapi } from '../../xmodule/providers/xapi';
import * as xi from '../../xmodule/interfaces/xapi';
@Component({
  templateUrl: 'login.html'
})
export class LoginPage {
  user: xi.UserLogin = xi.userLogin;
  loading: boolean = false;
  message: string = '';
  t = {
    User_ID: 'User ID',
    Password: 'Password',
    Input_User_ID: 'Input User ID',
    Input_Password: 'Input Password',
    Login: 'Login',
    Cancel: 'Cancel'
  };

  constructor(
    private api: Xapi
    ) {
    console.log('LoginComponent::constructor()');
    this.api.getLoginData( x => this.userAlreadyLoggedIn(x) );
  }

  /**
   * 회원이 이미 로그인을 한 경우 이 함수가 호출된다.
   */
  userAlreadyLoggedIn( user: xi.UserLoginData ) {
  }

  onClickLogin() {
    console.log("LoginComponent::onClickRegister()");
    this.loading = true;
 
    this.api.login( this.user, ( re: xi.RegisterResponse ) => {
      this.loading = false;
      this.message = '';
      
      if ( re.success ) {
        console.log("LoginComponent::onClickRegister() success");
 
      }
      else {
        console.log("LoginComponent::onClickRegister() error");
        this.message = <string>re.data;
      }
    },
    ( err ) => {
      this.loading = false;

      console.log('LoginComponent::onClickRegister() error: ', err);

    });
  }

  onClickCancel() {
    this.loading = false;
    console.log("LoginComponent::onClickCancel()");

  }

}

