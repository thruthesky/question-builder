import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Post page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-post',
  templateUrl: 'post.html'
})
export class Post {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Post Page');
  }

}
