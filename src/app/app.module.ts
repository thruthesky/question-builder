import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { Dashboard } from '../pages/dashboard/dashboard';
import { XModule } from '../xmodule/modules/core';
import { List } from '../components/list/list'
import { Questionsform } from '../pages/questionsform/questionsform';
import { CreateUpdateForm } from '../pages/form/form';
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
    List,
    CreateUpdateForm,
    PostListPage,
    QuestionList,
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
    List,
    CreateUpdateForm,
    QuestionList,
    PostListPage,
    PostEditPage
  ],
  providers: [ ]
})
export class AppModule {}
