import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { QuestionPage } from '../questions/questions';
import { Category } from '../../fireframe/category';
import { Post } from '../../fireframe/post';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  post: Post = new Post();
  posts;
  category: Category = new Category();
  categories;
  constructor(public navCtrl: NavController) {
//    this.navCtrl.push( QuestionPage );

/*
    this.category.gets( s => {
      console.log(s);
    }, e => {
      alert('Error: failed to get categories : ' + e );
    })
    */

    this.post.gets( s => {
      console.log(s);
      this.posts = s;
    }, e => alert( 'Failed to get post data : ' + e ) );

  }
  
  get postKeys() {
    if ( this.posts === void 0 ) return [];
    return Object.keys( this.posts );
  }

  onClickLogin() {
    this.navCtrl.push( LoginPage );
  }
  onClickQuestion() {
    this.navCtrl.push( QuestionPage );
  }
  onClickDelete( key ) {
    this.post.delete( key, s => {
      if ( s ) {
        alert( ' ERROR : failed : ' + s );
      }
      else {
        delete this.posts[ key ];
      }
    }, e => {
      alert('Error: failed to delete a post : ' + e );
    });
  }

}
