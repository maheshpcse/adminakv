import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './access/login/login.component';
import { SignupComponent } from './access/signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuardService } from './auth-guard.service';
import { InboxComponent } from './inbox/inbox.component';
import { UsersViewComponent } from './users/users-view/users-view.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { SettingsComponent } from './admin/settings/settings.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuardService],
    component: HomeComponent
  },
  {
    path: 'users',
    canActivate: [AuthGuardService],
    component: UsersViewComponent
  },
  {
    path: 'messages',
    canActivate: [AuthGuardService],
    component: InboxComponent
  },
  {
    path: 'admin/profile',
    canActivate: [AuthGuardService],
    component: ProfileComponent
  },
  {
    path: 'admin/settings',
    canActivate: [AuthGuardService],
    component: SettingsComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
