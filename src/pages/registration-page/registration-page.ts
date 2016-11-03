import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { UserAuth } from '../../providers/user-auth';
import { HomePage } from '../home/home';

/*
  Generated class for the RegistrationPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-registration-page',
  templateUrl: 'registration-page.html'
})
export class RegistrationPage {

  public signupForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;


  constructor(
    public navCtrl: NavController,
    private userAuth: UserAuth,
    private formBuilder: FormBuilder,
    private alrtCtrl: AlertController
  ) {
    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    })
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  ionViewDidLoad() {
    console.log('Hello RegistrationPage Page');
  }

  onClickRegister(){
    this.submitAttempt = true;

    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.userAuth.signupUser(this.signupForm.value.email, this.signupForm.value.password).then(() => {
        this.navCtrl.setRoot( HomePage );
      }, (error) => {

        let alert = this.alrtCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });

    }
  }
}
