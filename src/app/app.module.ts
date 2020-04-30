import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderNavComponent } from './header/header-nav/header-nav.component';
import { HeaderAlertComponent } from './header/header-alert/header-alert.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { LoginComponent } from './access/login/login.component';
import { SignupComponent } from './access/signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { SharedService } from './shared.service';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { SettingsService } from './settings.service';
import { AuthInterceptorService } from './auth-interceptor.service';
import { InboxComponent } from './inbox/inbox.component';
import { UsersViewComponent } from './users/users-view/users-view.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UserSettingsComponent } from './users/user-settings/user-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
    HeaderAlertComponent,
    FooterComponent,
    HomeComponent,
    DashboardComponent,
    SidemenuComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent,
    InboxComponent,
    UsersViewComponent,
    ProfileComponent,
    SettingsComponent,
    UserProfileComponent,
    UserSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    SharedService,
    AuthService,
    AuthGuardService,
    SettingsService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
