import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Post } from '../../fireframe/post';
import { Category } from '../../fireframe/category';

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
export class QuestionPage {
  
  post = postData;
  category: Category;

  question: Post = new Post();

  constructor(public navCtrl: NavController) {
    this.category = new Category();
    this.category.get('questions', s => {
      if ( s ) {
        console.log("OK: category exists");
      }
      else {
        // category does not exists.
        this.category.id('questions').name('Question').title('Question Category').description('...')
          .create( s => {
            console.log("OK: category created!");
          }, e => {
            alert('Error: failed to create questions category');
          });
      }
    }, e => {
      alert( 'ERROR: failed to sync' );
    } );
  }

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

  onClickBack() {
    this.navCtrl.pop();
  }
}
