import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../auth.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar'
import {ConfigService} from '../../services/config.service';
import {EmailComponent} from '../email/email.component';
import {ViewEncapsulation} from '@angular/core';
import { User, auth } from 'firebase';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  appName: string;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private configService: ConfigService) {
  }

  ngOnInit() {
    this.afAuth.authState.pipe(
      map((user: User) => {
        if (user != null) {
          this.router.navigateByUrl(this.authService.redirectUrl || '/');
        }
      })
    );

    this.appName = this.configService.getConfig().interface.appName;
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(authInstance => {
      if(authInstance) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      }
    }, (err) => {
      console.error(err);
      this.snackBar.open('Failed to login: ' + err, null,{duration: 3000});
    });
  }

  loginEmail() {
    const dialogRef = this.dialog.open(EmailComponent);
  }
}
