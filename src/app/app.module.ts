import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { UserAuth } from '../providers/user-auth';
import { Questions } from '../pages/questions/questions';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Login,
    Questions
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Login,
    Questions
  ],
  providers: [ UserAuth ]
})
export class AppModule {}
