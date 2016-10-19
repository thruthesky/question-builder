import { Component } from '@angular/core';
import { Xapi } from '../../xmodule/providers/xapi';
import * as xi from '../../xmodule/interfaces/xapi';
@Component( {
    templateUrl: `question-list.html`
})
export class QuestionList {
    posts: xi.PostQueryResponse;
    constructor( private x: Xapi ) {
        console.log('Dashboard::onClickList()');
        let args: xi.PostQuery = <xi.PostQuery> {};
        args.category_name = 'question';
        this.x.get_posts( args, re => {
        console.log('callback: ', re);
        this.posts = re.data;
        }, err => {
        this.x.error( err );
        });
    }
}