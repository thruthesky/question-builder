import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuestionformPage } from '../questionform/questionform';
import {Post} from "../../fireframe2/post";

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
  more = [];
  questionID
  contents;
  constructor(
    private navCtrl: NavController,
    private question: Post

  ) {

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
