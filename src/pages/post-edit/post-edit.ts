import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { PostEditService } from '../../xmodule/providers/post-edit-service';
import { Dashboard } from '../dashboard/dashboard';
import { QuestionList } from '../question-list/question-list';

export const category: string = 'question';
export interface POST { // post data basic strucure
    ID?:number;
    password?:string;
    category: string;
    post_title : string;
    content?:string;
    choice1 : string;
    choice2 : string;
    choice3 : string;
    choice4 : string;
    answer : number | string;
}
export interface POST_DATA extends POST { // post data from server ( to be displayed )
  images?: {};
}
export interface POST_SUBMIT extends POST { // post data to send to server
  fid?: Array< string >;
}
export let postData: () => POST_DATA = () : POST_DATA => {
  return {
    category: category,password: 'default', post_title : '', choice1:'',choice2:'',choice3:'',choice4:'',answer:''
  };
}
export let trimPostDataForForm: (x) => POST_DATA = (x) : POST_DATA => {
  let p: POST_DATA = <POST_DATA> {};
  p.ID = x.ID;
  p.category = category;
  p.post_title = x.post_title;
  p.choice1 = x.meta.choice1;
  p.choice2 = x.meta.choice2;
  p.choice3 = x.meta.choice3;
  p.choice4 = x.meta.choice4;
  p.password = x.meta.password;
  p.answer = x.meta.answer;
  if ( x.images ) p.images = x.images;
  else p.images = {};
  return p;
}
export let trimPostDataForSubmit: (x) => POST_SUBMIT = (x) : POST_SUBMIT => {
    let post = JSON.parse( JSON.stringify( x ) );
    if ( post.images ) post.fid = Object.keys( post.images ); 
    delete post['images']; 
    return post;
  }
@Component({
  selector: 'page-post-edit',
  templateUrl: 'post-edit.html'
})
export class PostEditPage {

  urlPhoto: string;
  post: POST_DATA = postData();
  post_ID;
  get imageKeys() {
    if ( this.post.images ) {
      return Object.keys( this.post.images );
    }
  }
  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    public postEditService: PostEditService,
    private events: Events
    ) {
      this.post = postData();
      this.urlPhoto = postEditService.urlPhoto;
      this.post_ID = navParams.get( 'post_ID' );
      if ( this.post_ID ) {
        postEditService.load( this.post_ID, (p:POST_DATA) => {
          this.post = trimPostDataForForm( p );
        });
      }
  }
  onClickCreate() {
    this.postEditService.submit( trimPostDataForSubmit( this.post ), x => this.onClickPostComplete( x ) );
  }
  onClickPostComplete( data ) {
    console.log("PostEditPage::onClickPostComplete()", data);
    this.post = postData(); // clear user input post data after submit success.
    alert("Post upload success");
  }
  onClickBack() {
    this.navCtrl.setRoot( Dashboard );
  }
    onClickBackToList(){
    this.navCtrl.setRoot(QuestionList);
  }
}
