import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Xapi } from '../../xmodule/providers/xapi';
import { QuestionForm } from '../../providers/share';
import { Dashboard } from '../dashboard/dashboard';
import * as xi from '../../xmodule/interfaces/xapi';
@Component({
  templateUrl: 'questionsform.html'
})
export class Questionsform {
  id:number;
  title:string;
  user: xi.UserLoginData;
  questionForm : QuestionForm = <QuestionForm> {};

  constructor(
      private navP: NavParams,
      public navCtrl: NavController,
      private x: Xapi
  ) {
    this.id = this.navP.get('id');
    console.log(this.id);
    console.log( 'PostListPage::constructor()');
    this.title = this.navP.get('title');
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

  test(){
    console.log(this.navP.get('id'));
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

  onClickCreate() {
    console.log('question: ' + this.questionForm );
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

  onClickUpdate(){
    console.log(this.id);
    console.log('question: ' + this.questionForm );
    this.questionForm.category = 'question';
    this.questionForm.ID = this.id
    this.x.post_insert( this.questionForm, re => {
      console.log("QuestionForm::onClickSubmit() callback()", re);
      if ( re.success ) {
        this.questionForm = <QuestionForm> {};
      }
    }, err => {
      this.x.error( err );
    });


  }
}