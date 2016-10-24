import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PostListComponent } from '../../components/postlists/postlists';
import { PostEditPage } from  '../post-edit/post-edit';
import { PageController } from '../../xmodule/providers/page-controller';
import { Dashboard } from '../dashboard/dashboard';

@Component({
  selector: 'page-post-list',
  templateUrl: 'post-list.html'
})
export class PostListPage {
  @ViewChild('xapiPostList') postListComponent: PostListComponent;
  slug: string;
  constructor(
    public navCtrl: NavController,
    private navParams: NavParams
    ) {
      console.log( 'PostListPage::constructor()', navParams.data);
      this.slug = this.navParams.get( 'slug' );
    }


  ionViewDidLoad() {
    console.log("PostListPage::ionViewDidLoad()", this.postListComponent.slug);
  }
  onClickBack(){
    console.log('clicked back');
    this.navCtrl.setRoot( Dashboard );

  }
  doInfinite( infiniteScroll ) {
    console.log("PostListPage::doInfinite() begin");
    this.postListComponent.doInfinite( ( more ) => {
      console.log("PostListPage::doInfinite() end");
      infiniteScroll.complete();
      if ( ! more ) {
        infiniteScroll.enable( false );
      }
    });
  }




  /**
   * Use can use 'PageController' here or you can move customized edit page.
   */
    onClickEdit( post_ID ) {
      console.log("PostListPage::onClickEdit()", post_ID);

      console.log( PageController.page );
      this.navCtrl.push( PostEditPage, { post_ID: post_ID });
    }
    onClickDelete( post_ID ) {
    }

}
