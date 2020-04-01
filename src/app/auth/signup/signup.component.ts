import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  error: any;

  constructor(public afAuth: AngularFireAuth, private router: Router, private snackBar: MatSnackBar, private db: AngularFirestore) {

  }

  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.afAuth.auth.createUserWithEmailAndPassword(formData.data.email, formData.data.password)
        .then((success) => {
          const newUser = {
            authUID: success.user.uid,
            friendcode: formData.data.friendcode,
            inGameName: formData.data.inGameName,
            listed: 0,
            timezone: formData.data.timezone
          };
          this.db.collection('Users').add(newUser);
          this.router.navigate(['/']);
        }, (err) => {
          console.log(err);
          this.snackBar.open('Failed to login: ' + err, null, {duration: 3000});
        });
    }
  }

  ngOnInit() {
  }

}
