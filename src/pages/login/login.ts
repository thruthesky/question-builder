import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { User, USER_DATA } from "../../fireframe2/user";
import { AngularFire } from 'angularfire2';

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
    public af: AngularFire,
    private toastCtrl: ToastController
  ) {
    this.checkUser();
  }


// observable
//  checks anfularfire auth if user is logged in.
  checkUser(){
    this.af.auth.subscribe(auth =>{
      if(auth) this.navCtrl.setRoot( DashboardPage );
      
      else console.log(auth)
    });
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
      .create( () => {
          this.user.sets(this.userData).login( userData => {
              console.log('login ok: Data from Stroage: ', userData);
              this.userData.uid = userData.uid;
              console.log("RegisterPage::onClickRegister() login OK: this.data: ", this.userData);
              this.user.sets(this.userData).update( () => {
                  console.log('User update success');
                  let regToast = this.toastCtrl.create({
                    message: 'User registration success.',
                    duration: 1500
                  })
                  regToast.present();
              }, e => {
                  let regToast = this.toastCtrl.create({
                    message: e,
                    duration: 1500
                  })
                  regToast.present();
              })
          }, e => {
                  let regToast = this.toastCtrl.create({
                    message: e,
                    duration: 1500
                    })
                  regToast.present();
            })
        }, e => {
                  let regToast = this.toastCtrl.create({
                    message: e,
                    duration: 1500
                  })
                  regToast.present();
      });
  }
}
