import { Component, Output, EventEmitter } from '@angular/core';
// import { Questionsform } from '../questionsform/questionsform'
import { Xapi } from '../../xmodule/providers/xapi';
import * as xi from '../../xmodule/interfaces/xapi';
import { PostQuery } from '../../providers/share';
import { Dashboard } from '../dashboard/dashboard';
import { NavController, AlertController } from 'ionic-angular';
@Component( {
    templateUrl: `question-list.html`
})
export class QuestionList {

    @Output() edit = new EventEmitter<number>();

    posts: xi.PostQueryResponse;
    constructor( private x: Xapi, private navCtrl: NavController, private alrtCtrl: AlertController) {
        console.log('Dashboard::onClickList()');
        let args: PostQuery = <PostQuery> {};
        args.category = 'question';
        this.x.get_posts( args, re => {
        console.log('callback: ', re);
        this.posts = re.data;
        }, err => {
        this.x.error( err );
        });
    }
    onClickBack(){
        console.log('clicked back');
        this.navCtrl.setRoot( Dashboard );

    }
    onClickUpdate(ID){
        console.log('onClickEdit()', ID);
        this.edit.emit( ID );
    }

    onClickDelete(ID){
        console.log(ID);
        let confirmDelete = this.alrtCtrl.create({
          title: 'Confirmation',
          subTitle:'Are you sure you want to delete this question',
          buttons:[{
            text:'Ok',
            handler: ()=>{
              console.log('deleteClicked OK');
              this.x.delete_post( ID,(res: xi.Response) => {
                if(res.success){
                  delete this.posts[ res.data ];
                  this.x.alert('Delete','Question Deleted successfully');
                  this.navCtrl.push(this);
                }else{
                  this.x.error ( res.data.message );
                }
              },e=>{
                this.x.error( e );
              })
            }
          },{
            text:'Cancel',
            handler: ()=>{

            }
          }]
        });
      confirmDelete.present();
    }

}
