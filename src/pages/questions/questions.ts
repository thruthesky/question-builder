import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Post } from '../../fireframe/post';

let postData = {
  title: '',
  category_id:'',
  choice1:'',
  choice2:'',
  choice3:'',
  choice4:'',
  answer:''
}

/*
  Generated class for the Questions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html'
})
export class Questions {
  
  post = postData;

  question: Post = new Post();

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Questions Page');
  }
  onClickCreate(){
        this.question
      .set('title', this.post.title)
      .set('category_id', 'questions')
      .set('choice1', this.post.choice1)
      .set('choice2', this.post.choice2)
      .set('choice3', this.post.choice3)
      .set('choice4', this.post.choice4)
      .set('answer', this.post.answer)
      .create( s => {
        this.question.get( 'talk', s => {     // this will return the created value
          console.log('success', s);
        },
        e => {
          console.log('success', e);
        });

      }, e => console.log( e ) );
  }

}
