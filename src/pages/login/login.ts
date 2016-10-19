import { Component} from '@angular/core';
import { ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { LoginComponent } from '../../xmodule/components/login';
import { Dashboard } from '../dashboard/dashboard';
import { Xapi } from '../../xmodule/providers/xapi';
import * as xi from '../../xmodule/interfaces/xapi';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  appTitle = "Login";
  loading: boolean = false;
  errorMessage: string = '';

  @ViewChild('Login') userLog: LoginComponent;
  constructor(public navCtrl: NavController,private api: Xapi, private viewCtrl: ViewController) {
    console.log("LoginPage::constrcutor()");
    
  }
  ionViewDidLoad() {
    this.userLog.t.Login = "Sign in";
  }
  onBeforeRequest() {
    console.log("onBeforeRequest()");
    this.loading = true;
    this.errorMessage = '';
  }
  onAfterRequest() {
    console.log("onAfterRequest()");
    this.loading = false;
  }
  onSuccess( user: xi.UserLoginData) {
    console.log("onSuccess()", user);
    this.navCtrl.setRoot(Dashboard);
  }
  onError( message ) {
    console.log("onError()");
    this.errorMessage = message;
  }
}