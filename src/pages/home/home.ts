import { Component } from '@angular/core';
import { QuestionsPage } from '../questions/questions';
import { LoginPage } from  '../login/login';
import { NavController, AlertController } from 'ionic-angular';
import { Post } from '../../fireframe/post';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  question: Post = new Post();
  data;

  constructor(
    private navCtrl: NavController,
    private alrtCtrl: AlertController,

  ) {

  }
  ionViewWillEnter() {
    this.displayQuestions();
  }
  onClickAdd(){
    this.navCtrl.push( QuestionsPage );
  }

  displayQuestions() {
    this.question.gets( re => {
      if(re) this.data = re;
  });

  }
    get questions() {
    if ( this.data === void 0 ) return [];
    return Object.keys( this.data );
  }
  onDelete(id){
    this.question.delete( id, s => {
      if ( s ) alert('Error: ' + s);
      else {
        console.log('success: removing from content');
        this.data = {};
        this.displayQuestions();
      }

    }, e => {
      alert('Error: ' + e);
    });
  }

  onClickDelete(id){
    this.question.delete( id, s => {
    let confirmDelete = this.alrtCtrl.create({
      title:'delete',
      subTitle:'Are you sure you want to delete this?',
      buttons:[{
        text: 'ok',
        handler:()=>{
          if ( s ) alert('Error: ' + s);
          else {
            console.log('success: removing from content');
            this.data = {};
            this.displayQuestions();
          }
        }
      }]
    })
    confirmDelete.present();
    });
  }

  onClickLogin(){
    this.navCtrl.push( LoginPage );
  }
  onClickUpdate(id){
    this.navCtrl.push( QuestionsPage,{
      questionID: id
    } );
  }

}
