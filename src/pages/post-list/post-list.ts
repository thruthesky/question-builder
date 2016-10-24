import { Component, Input } from '@angular/core';
import { PostQuery } from '../../providers/share';
import { Xapi } from '../../xmodule/providers/xapi';
import * as xi from '../../xmodule/interfaces/xapi';
import { PostEditPage } from '../post-edit/post-edit';
import { NavController, AlertController } from 'ionic-angular';
import { Dashboard } from '../dashboard/dashboard';


//////////////////////////////////////


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
/**
 * Returns trimed post data from server to display as user input.
 */
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
  let post = JSON.parse( JSON.stringify( x ) ); // Soft copy on new object ( new placeholder )
  if ( post.images ) post.fid = Object.keys( post.images ); // get images to send to server
  delete post['images']; // delete images of display
  return post;
}


//////////////////////////

@Component({
  selector: 'postlist',
  templateUrl: 'post-list.html'
})
export class PostListPage {
  @Input() slug: string;
  more = [];
  post: POST_DATA = postData();
  posts: xi.Posts = [];
  page: number = 0;
  featuredImage: string = "x-assets/img/sunset.jpg";

  constructor(
      private x: Xapi,
      private navCtrl: NavController,
      private alrtCtrl: AlertController
  ) {
    this.post = postData();
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
      console.log("PostListPage::onClickEdit()", post_ID);

      // console.log( PageController.page );
      this.navCtrl.push( PostEditPage, { post_ID: post_ID });
  }
  onClickBack(){
    this.navCtrl.setRoot(Dashboard);
  }

  onClickDelete( ID ) {
    console.log('onClickDel()', ID);
    console.log(ID);
    let confirmDelete = this.alrtCtrl.create({
      title: 'Confirmation',
      subTitle:'Are you sure you want to delete this question',
      buttons:[{
        text:'Ok',
        handler: ()=>{
          console.log('deleteClicked OK');;
          this.x.delete_post( ID,(res: xi.Response) => {
            if(res.success){
              delete this.post[ res.data ];
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
