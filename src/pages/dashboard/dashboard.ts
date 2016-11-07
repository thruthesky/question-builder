import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuestionformPage } from '../questionform/questionform';
import {Post} from "../../fireframe2/post";
import { User, USER_DATA } from '../../fireframe2/user';

//import { LoginPage } from '../login/login';
//import { AngularFire, FirebaseAuth } from 'angularfire2';


interface userMeta extends USER_DATA {
  displayName:string;
  age:string;
}

/*
  Generated class for the Dashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
  userName;
  userData = <userMeta> {};
  uid;
  more = [];
  questionID
  contents;
  choice
  constructor(
    private navCtrl: NavController,
    private question: Post,
    private user: User

  ) {
//    this.checkUser();
//this.navCtrl.setRoot( QuestionformPage, { questionID: '-KVzAiWzLy-MvgW3QWdt' } );
    
  }

    checkUser(){
      this.user.loggedIn( (userData) => {
        this.uid = userData.uid;
        this.user.set('key', this.uid).get( user =>{
          this.userName = user.displayName;
        }, e=>{})
      }, e => alert('Login : ' + e ) );

  }

  ionViewWillEnter() {
    //console.log('ionViewWillEnter()');
    this.displayQuestions();
  }

  testResign(){
    this.user.resign( s=>{console.log(s)}, e=>console.error(e) )
  }


  onClickAdd(){
    this.navCtrl.push( QuestionformPage );
  }

  onSlideItem(id){
    // console.log('Slide ok')
    this.more[id] = null;
  }

  displayQuestions() {
    this.question.gets( re => {
      if ( re ) {
        this.contents = re;
        console.log(JSON.stringify(re));
      } 
    }, e => {
      console.log(e);
    });

  }
  onClickChoice(ansTest, answer){
    console.log(ansTest);
    if( ansTest == answer)console.log('correct');
    else console.log('incorrect');
  }

  onClickLogout(){
   //this.userAuth.logout()
  //  this.navCtrl.setRoot( HomePage );
  }
  get questions() {
    if ( this.contents === void 0 ) return [];
    return Object.keys( this.contents );
  }
  onClickUpdate(id){
    this.navCtrl.push( QuestionformPage, {
      questionID: id
    })
  }

  onClickDelete(id){
    this.question.delete( id, s => {
      if ( s ) alert('Error: ' + s);
      else {
        console.log('success: removing from content');
        this.contents = {};
        this.displayQuestions();
      }
    }, e => {
      alert('Error: ' + e);
    });
  }

}
