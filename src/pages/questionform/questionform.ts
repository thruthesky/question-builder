import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Category } from '../../fireframe2/category';
import { Post } from '../../fireframe2/post';
import { questionData } from '../../shared/shared';
/*
  Generated class for the Questionform page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-questionform',
  templateUrl: 'questionform.html'
})
export class QuestionformPage {
  questionID
  contents;
  question = questionData;
  constructor(
    private navCtrl: NavController,
    private category: Category,
    private questionPost: Post,
    private navPar: NavParams
  ) {
    this.questionID = this.navPar.get('questionID');
  }

  ionViewWillEnter() {
    console.log('Hello QuestionformPage Page');
    this.questionCategory(); //creates category
    this.displayQuestions();
  }

  questionCategory( ) {
    this.category
      .set( 'key', 'questions' )
      .set( 'name', 'questions' )
      .set( 'title', 'Questions' )
      .set( 'description', 'questions for quiz app' )
      .create( s => {

        console.log(s)
      }, e => {

        console.log(e)
      });
  }

  onClickCreate(){
    this.questionPost
      .sets(this.question)
      .create( s => {
        console.log(s)
        this.onClickReset()
      }, e => {
        console.log(e)
      });
  }
  onClickReset(){
    this.question.question = '';
    this.question.choice1 = '';
    this.question.choice2 = '';
    this.question.choice3 = '';
    this.question.choice4 = '';
    this.question.answer = '';
  }

  displayQuestions() {
    this.questionPost.gets( re => {
      if(re) this.contents = re;
      if(this.questionID){
        console.log(this.contents[this.questionID].question)
        this.question = this.contents[this.questionID]
      }
    },e =>{
      console.log(e)
    });

  }

  get questions() {
    if ( this.contents === void 0 ) return [];
    return Object.keys( this.contents );
  }

  onClickUpdate(){
    this.questionPost
      .set( 'key', this.questionID )
      .set( 'question', this.question.question )
      .set( 'choice1', this.question.choice1 )
      .set( 'choice2', this.question.choice2 )
      .set( 'choice3', this.question.choice3 )
      .set( 'choice4', this.question.choice4 )
      .set( 'answer', this.question.answer )
      .update(s => {
        console.log(s)
        this.onClickBack();
      },e=>{
        console.log(e)
      })
  }

  onClickBack(){
    this.navCtrl.pop();
  }
}
