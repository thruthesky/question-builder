import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Xapi } from '../../xmodule/providers/xapi';
import { QuestionForm } from '../../providers/share';
import { Dashboard } from '../dashboard/dashboard';
import * as xi from '../../xmodule/interfaces/xapi';
@Component({
  templateUrl: 'questionsform.html'
})
export class Questionsform {

  user: xi.UserLoginData;
  
  questionForm : QuestionForm = <QuestionForm> {};

  constructor(
    public navCtrl: NavController,
    private x: Xapi
    ) {
      console.log( 'PostListPage::constructor()');

      this.x.getLoginData( (user:xi.UserLoginData) => {
        console.log( 'Dashboard::constructor() x.getLogin() callback: ', user);
         if ( user ) {
          if ( user.user_login == 'admin' ) {
            this.user = user;
          }
         }
      });

      this.x.getLoginData( (user:xi.UserLoginData) => {
        console.log( 'Dashboard::constructor() x.getLogin() callback: ', user)
      });
    }



    // test() {
      
    //   this.questionForm.title = "What is one in number?";
    //   this.questionForm.choice1 = "7";
    //   this.questionForm.choice2 = "17";
    //   this.questionForm.choice3 = "11";
    //   this.questionForm.choice4 = "1";
    //   this.questionForm.answer = '4';
    //   this.onClickSubmit();
    // }


    onClickSubmit() {
      console.log('question: ' + this.questionForm );
      this.questionForm.content = this.questionForm.title;
      this.questionForm.first_name = this.user.user_login;
      this.questionForm.category = 'question';
      
      this.x.post_insert( this.questionForm, re => {
        console.log("QuestionForm::onClickSubmit() callback()", re);
        if ( re.success ) {
          this.questionForm = <QuestionForm> {};         
        }
      }, err => {
        this.x.error( err );
      });
    }
    
    
    onClickBack() {
      this.navCtrl.setRoot( Dashboard );
    }
}