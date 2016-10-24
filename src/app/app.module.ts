import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { LoginComponent } from '../components/login/login'
import { RegisterPage } from '../pages/register/register';
import { Dashboard } from '../pages/dashboard/dashboard';

import { XModule } from '../xmodule/modules/core';
import { Logout } from '../components/logout/logout';

import { List } from '../components/list/list'
import { PostListComponent } from '../components/postlists/postlists';
import { Questionsform } from '../pages/questionsform/questionsform';
import { CreateUpdateForm } from '../pages/form/form';
import { Delete } from '../pages/delete/delete';
import { QuestionList } from '../pages/question-list/question-list';
import { PostListPage } from '../pages/post-list/post-list';
import { PostEditPage } from '../pages/post-edit/post-edit';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    Dashboard,
    Questionsform,
    Logout,
    List,
    CreateUpdateForm,
    PostListPage,
    Delete,
    QuestionList,
    LoginComponent,
    PostListComponent,
    PostEditPage

  ],
  imports: [
    XModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    Dashboard,
    Questionsform,
    Logout,
    List,
    CreateUpdateForm,
    PostListComponent,
    Delete,
    QuestionList,
    LoginComponent,
    PostListPage,
    PostEditPage
  ],
  providers: [ ]
})
export class AppModule {}
