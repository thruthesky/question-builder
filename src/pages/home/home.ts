import { Component } from '@angular/core';
import { QuestionsPage } from '../questions/questions';
import { NavController } from 'ionic-angular';
import { Post } from '../../fireframe/post';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  question: Post = new Post();
  data;
  constructor(private navCtrl: NavController) {
    
  }
  ionViewWillEnter() {
    console.log('CategoryPage will enter');
    this.displayQuestions();
  }
  onClickAdd(){
    this.navCtrl.push( QuestionsPage );
  }

  displayQuestions() {
    this.question.gets( re => {
      console.log(re);
      this.data = re;
      console.log( this.questions );
  });

  }
    get questions() {
    if ( this.data === void 0 ) return [];
    return Object.keys( this.data );
  }

}
