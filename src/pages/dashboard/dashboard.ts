import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { QuestionformPage } from '../questionform/questionform';
import { LoginPage } from '../login/login';
import {Post} from "../../fireframe2/post";
import { User, USER_DATA } from '../../fireframe2/user';
import * as _ from 'lodash'

//import { LoginPage } from '../login/login';
//import { AngularFire, FirebaseAuth } from 'angularfire2';


interface userMeta extends USER_DATA {
  displayName:string;
  age:string;
}

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

  waitingList:boolean;

  noMorePost: boolean = false;
  searchBar:string = '';
  lastDisplayedKey: string = '';
  userName;
  userData = <userMeta> {};
  uid;
  more = [];
  questionID;
  contents = [];
  choice
  questions = [];
  previous = [];
  searchedItem = [];
  page:number = 1;
  constructor(
    private navCtrl: NavController,
    private question: Post,
    private user: User,
    private toastCtrl: ToastController,
    private alrtCtrl: AlertController

  ) {
    // this.onDestroy();
    this.question.pagination_key = '';
    this.getQuestions();
  }

    checkUser(){
      this.user.loggedIn( (userData) => {
        this.uid = userData.uid;
        this.user.set('key', this.uid).get( user =>{
          this.userName = user.displayName;
        }, e=>{})
      }, e => alert('Login : ' + e ) );

  }

  onDestroy(){
    this.question.path='question';
          this.question.destroy( () => {
        }, e => {
           console.log('error:' + e)
        });
  }



  // debounce(callback, wait, immediate){
  //   let timeout;
  //   return function(){
  //     let context = this, args = arguments;
  //     let later = () =>{
  //       timeout = null;
  //       if(!immediate) callback.apply(context,args);
  //     };
  //     let callnow = immediate && !timeout;
  //     clearTimeout(timeout);
  //     timeout = setTimeout(later, wait);
  //     if( callnow ) callback.apply(context, args)
  //   }
  // }






  searchQuestions(ev) {

    // let temp;
    let val = ev.target.value;

    if(!val){
      this.searchedItem = [];
      this.searchedItem = this.questions;
    }

    if (val && val.trim() != '') {
      this.searchedItem = this.questions.filter( res => {
        // console.log('check searched: ' + this.searchedItem[0].question)
        return ( res.value.question.toLowerCase().indexOf(val.toLowerCase()) > -1 );
      }, e=>{console.log('error')})
    }
  }


  ionViewWillEnter() {
    //console.log('ionViewWillEnter()');
    
    this.checkUser();
  }

  testResign(){
    this.user.resign( s=>{console.log(s)}, e=>console.error(e) )
  }
  
  onClickAdd(){
    this.navCtrl.push( QuestionformPage );
  }

  onSlideItem(id){
    // console.log('Slide ok')
    this.more[id] = null;
  }

  displayQuestions(data?) {
    this.waitingList = false
      for( let key of Object.keys(data).reverse() ) {
        this.questions.push ( {key: key, value: data[key]} );
        // this.searchedItem.push( {key: key, value: data[key]} );
      }

  }

  getSearched( key? ){
    this.question.path = 'question'
    this.question
      .set('key', key)
      .get( re =>{

      },e=>{})
  }

  getQuestions( infinite? ) {
    this.waitingList = true;
    this.question.path = 'question'
    this.question
        .set( 'numberOfPosts', 10 )
        .nextPage( data => {
          if ( infinite ) { infinite.complete(); this.waitingList = false; } 
          if ( ! _.isEmpty(data) ) this.displayQuestions( data );
          else {
            this.noMorePost = true;
            infinite.enable( false );
          }
        },
        e => {
          if ( infinite ) infinite.complete();
          console.log( e );
        });
  }

  doInfinite( infiniteScroll? ) {

  this.getQuestions( infiniteScroll );

  }
  onClickNext(){
    this.previous = this.questions;
    if(! this.noMorePost ){
      
      console.log('page::()' + JSON.stringify(this.previous) + 'this')
      this.questions = [];
      this.doInfinite();
      // this.previous = this.questions;
      this.page = this.page + 1; 
    }else{
      this.questions = this.previous;
      this.doInfinite()
    }

  }

  onClickPrevious(){
    this.questions = this.previous
    this.page = this.page - 1;
    
  }


  onClickChoice(ansTest, answer){
    console.log(ansTest);
    if( ansTest == answer)console.log('correct');
    else console.log('incorrect');
  }

  onClickLogout(){
    this.user.logout( () => {
      this.userData = null
      this.navCtrl.setRoot( LoginPage )
  } );
  }

  onClickUpdate(id){
    this.navCtrl.pop();
    this.navCtrl.push( QuestionformPage, {
      questionID: id
    })
  }
  
  onClickDelete( key, indx ){
    this.question.path = 'question'
    this.question.set( 'key', key );
    this.alrtCtrl.create({
      title:'Delete Question',
      subTitle:'Are you sure you want to delete?',
      buttons:[{
        text:'ok',
        handler:()=>{
              this.question.delete( s => {
              this.toastCtrl
              .create( 
                { message:'deleted question sucessfully', duration: 1500 } 
                )
                .present()
              console.log('success: removing from content');
              this.questions.splice( indx, 1 ) 
          }, e => {
            console.log( 'error: ' + e )
          });
        }
      },
      {
        text:'cancel',
        handler:()=>{ console.log('cancel') }
      }]
    }).present();
    


  }

  onRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
