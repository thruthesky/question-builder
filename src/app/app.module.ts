import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { UserAuth } from '../providers/user-auth';
import { QuestionsPage } from '../pages/questions/questions';
import { RegistrationPage } from '../pages/registration-page/registration-page';
import { PasswordReset } from '../pages/password-reset/password-reset';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    QuestionsPage,
    RegistrationPage,
    PasswordReset
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    QuestionsPage,
    RegistrationPage,
    PasswordReset
  ],
  providers: [ UserAuth ]
})
export class AppModule {}
