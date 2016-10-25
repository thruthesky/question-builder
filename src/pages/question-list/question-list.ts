import { Component, Input } from '@angular/core';
import { PostQuery } from '../../providers/share';
import { Xapi } from '../../xmodule/providers/xapi';
import * as xi from '../../xmodule/interfaces/xapi';
import { PostEditPage } from '../post-edit/post-edit';
import { NavController, AlertController } from 'ionic-angular';
import { Dashboard } from '../dashboard/dashboard';

@Component({
  templateUrl: 'question-list.html'
})
export class QuestionList {
  @Input() slug: string;
  more = [];

  posts: xi.Posts = [];
  page: number = 0;
  featuredImage: string = "x-assets/img/sunset.jpg";

  constructor(
      private x: Xapi,
      private navCtrl: NavController,
      private alrtCtrl: AlertController
  ) {
    console.log('PostListComponent::constructor()', this.slug);
  }
  ngOnInit() {
    console.log('PostListComponent::ngOnInit()', this.slug);
    this.loadMorePosts( re => console.log(re), ()=>{} );
  }
  loadMorePosts( successCallback, errorCallback ) {
    console.log('loadMorePosts()');
    let args : PostQuery = <PostQuery> {};
    args.category = 'question';
    this.x.get_posts( args, re => {
      console.log('callback: ', re);
      this.posts = re.data;
    }, err => {
      this.x.error( err );
    });
  }
  displayPosts( posts: xi.Posts ) {
    //console.log('displayPosts()', posts);
    for( let post of posts ) {
      if ( post.images ) {
        let arr = [];
        for(var key in post.images ) {
          arr.push ( post.images[key] );
        }
        post.images = arr;
      }
      this.posts.push( (<xi.Post> post) );
    }
  }
  doInfinite( callback ) {
    console.log('PostListComponent::doInfinite() begin');
    this.loadMorePosts( (re) => {
          console.log('doInfinite() end');
          callback(re);
        },
        () => {} );
  }
  onClickEdit( post_ID ) {
      this.navCtrl.push( PostEditPage, { post_ID: post_ID });
  }
  onClickBack(){
    this.navCtrl.setRoot(Dashboard);
  }

  onClickDelete( post_ID, i ) {
    let obj = {post_ID: post_ID, password: 'default'};

    let confirmDelete = this.alrtCtrl.create({
      title: 'Confirmation',
      subTitle:'Are you sure you want to delete this question',
      buttons:[{
        text:'Ok',
        handler: ()=>{
          console.log('deleteClicked OK');

          this.x.delete_post(obj ,(res: xi.Response) => {
            if(res.success){
              delete this.posts[ post_ID ];
              this.posts.splice(i,1);

              this.x.alert('Delete','Question Deleted successfully');
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
