import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { Dashboard } from '../pages/dashboard/dashboard';
import { XModule } from '../xmodule/modules/core';
import { Questionsform } from '../pages/questionsform/questionsform';
import { QuestionList } from '../pages/question-list/question-list';
import { PostEditPage } from '../pages/post-edit/post-edit';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    Dashboard,
    Questionsform,
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
    Dashboard,
    Questionsform,
    QuestionList,
    PostEditPage
  ],
  providers: [ ]
})
export class AppModule {}
