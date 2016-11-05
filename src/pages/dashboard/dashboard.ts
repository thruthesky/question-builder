import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuestionformPage } from '../questionform/questionform';
import {Post} from "../../fireframe2/post";
import { HomePage } from '../home/home';
import { AngularFire, FirebaseAuth } from 'angularfire2';


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

  userAuth:FirebaseAuth;
  more = [];
  questionID
  contents;
  constructor(
    private navCtrl: NavController,
    private question: Post,
    public af: AngularFire

  ) {
    this.userAuth = af.auth
    this.checkUser();
  }


    checkUser(){
    this.af.auth.subscribe(auth =>{
      if(auth){
        console.log(auth)
      }
      else this.navCtrl.setRoot( HomePage );
    });
  }

  ionViewWillEnter() {
    this.displayQuestions();
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
      if(re) this.contents = re;
    },e =>{
      console.log(e)
    });

  }
  logOut(){
    return 
  }
  onClickLogout(){
   this.userAuth.logout()
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
        this.displayQuestions();
        this.contents = {};

      }

    }, e => {
      alert('Error: ' + e);
    });
  }

}
