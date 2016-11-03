import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

/*
  Generated class for the UserAuth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserAuth {
  userAuth:any;
  constructor(public http: Http) {
    this.userAuth = firebase.auth();
  }

  login( email:string, password:string ):any{
    return this.userAuth.signInWithEmailAndPassword(email,password);
  }

  signupUser( email: string, password: string ): any {
  return this.userAuth.createUserWithEmailAndPassword(email, password);
  }

  resetPass( email:string): any {
    return this.userAuth.sendPasswordResetEmail(email);
  }
}
