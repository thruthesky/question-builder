import { Component } from '@angular/core';
import { QuestionsPage } from '../questions/questions';
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
    private alrtCtrl: AlertController
  ) {

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
      if(re) this.data = re;
  });

  }
    get questions() {
    if ( this.data === void 0 ) return [];
    return Object.keys( this.data );
  }
  onClickDelete(id){
    this.question.delete(id, s=> {
      let confirmDelete = this.alrtCtrl.create({
        title:'delete',
        subTitle:'delete',
        buttons:[{
          text:'Ok',
          handler: ()=>{
            if(s) alert('Error: ' + s);
            else{
              console.log('success: removing question');
              this.data = {};
              this.displayQuestions();
            }
          }
        },{
          text:'Cancel',
          handler:()=>{
            alert('Canceled')
          }
        }]
      })
      confirmDelete.present();
    })

  }
  onClickUpdate(id){
    this.navCtrl.push( QuestionsPage,{
      questionID: id
    } );
  }

}
