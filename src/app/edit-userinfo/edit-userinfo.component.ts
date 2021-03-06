/**EditUserInfoComponent allows the user to edit their username, email, and password. */
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-edit-userinfo',
  templateUrl: './edit-userinfo.component.html',
  styleUrls: ['./edit-userinfo.component.scss']
})
export class EditUserinfoComponent implements OnInit {

  /** binds input proerties to DOM properties in the template*/
  @Input() userData = { username: '', Email: '' };
  @Input() userPassword = { password: '' };

  /** The data that was passed to the EditUserInfoComponent dialog in the ProfileViewComponent is injected in to the constructor using the MAT_DIALOG_DATA  *injection token.  The data becomes a property of the class and is available to be used in the template. 
 */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditUserinfoComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  /** checks to see if username and Email inputs are empty upon submission, if either is empty, function passes back current values to editUser */
  getNewData(): object {
    let username;
    let Email;
    if (this.userData.username === '') {
      username = this.data.user.username;
    } else {
      username = this.userData.username;
    }
    if (this.userData.Email === '') {
      Email = this.data.user.Email;
    } else {
      Email = this.userData.Email;
    }
    let newUserData = {
      username: username,
      Email: Email
    }
    return newUserData
  }

  /** Function takes new username and Email and updates database */
  editUser(): void {
    const newUserData = this.getNewData();
    if ((this.userData.username != '') && (this.userData.username.length < 5)) {
      this.snackBar.open('Username must have at least 5 characters.', 'OK')
    } else if ((this.userData.Email != '') && (!this.userData.Email.includes('@'))) {
      this.snackBar.open('Email must be formatted correctly.', 'OK')
    } else {
      this.fetchApiData.updateUserProfile(newUserData).subscribe((response) => {
        this.dialogRef.close();
        localStorage.setItem('user', response.username);
        this.snackBar.open('User info succesfully updated.', 'OK', {
          duration: 2000
        });
      }, (response) => {
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000
        });
      });
    }
  }

  /** Function takes new password, checks that it is long enough and if so, updates password in database */
  editPassword(): void {
    if (this.userPassword.password.length < 7) {
      this.snackBar.open('Password must be at least 7 characters long', 'OK');
    } else {
      this.fetchApiData.updatePassword(this.userPassword).subscribe((response) => {
        this.dialogRef.close();
        console.log(response);
        this.snackBar.open('User password succesfully updated.', 'OK', {
          duration: 2000
        });
      }, (response) => {
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000
        });
      });
    }
  }

}





