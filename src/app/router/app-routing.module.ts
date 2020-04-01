import { EditListingsComponent } from './../edit-listings/edit-listings.component';
import { BrowseComponent } from './../browse/browse.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../auth/login/login.component';
import { AuthService } from '../auth/auth.service';
import { UserGuard } from '../auth/user.guard';
import { EmailComponent } from '../auth/email/email.component';
import { SignupComponent } from '../auth/signup/signup.component';


const routes: Routes = [
  { path: '', redirectTo: 'browse', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login-email', component: EmailComponent },
  { path: 'browse', component: BrowseComponent, canActivate: [UserGuard] },
  { path: 'edit-listings', component: EditListingsComponent, canActivate: [UserGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    // AdminGuard,
    UserGuard,
    AuthService,
  ]
})
export class AppRoutingModule { }
