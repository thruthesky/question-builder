import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { User } from "../../fireframe2/user";
import { AngularFire } from 'angularfire2';

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
    private user: User,
    public af: AngularFire
  ) {
    this.checkUser();
  }


// observable
//  checks anfularfire auth if user is logged in.
  checkUser(){
    this.af.auth.subscribe(auth =>{
      if(auth){
        this.navCtrl.setRoot( DashboardPage );
      }
      else console.log(auth)
    });
  }

  onClickTest(){

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
