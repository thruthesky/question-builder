import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import {User} from "../../fireframe2/user";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  regUserMail:string;
  regUserPass:string;

  loginUserMail:string;
  loginUserPass:string;

  authentication: string = 'login';

  constructor(
    public navCtrl: NavController,
    private user: User
  ) {

  }
  ionViewDidLoad(){
    this.navCtrl.push( DashboardPage )
  }
  onClickLogin(){
    this.user
      .set('email', this.loginUserMail)
      .set('password', this.loginUserPass)
      .login( re => {
        console.log(re)
      }, e => {
        console.log(e)
      });
  }
  onClickRegister(){
    this.user
      .set('email', this.regUserMail)
      .set('password', this.regUserPass )
      .create( re => {
        console.log(re)
      }, e => {
        console.log(e)
      })
  }
}
