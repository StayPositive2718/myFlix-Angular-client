/** UserRegistrationFormComponent allows users to register a new account with a username, password, and email.
 * @module UserRegistrationFormComponent
 */
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {

  /** binds input proerties to DOM properties in the template*/
  @Input() userData = { username: '', password: '', Email: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  /** calls userRegistration from @service FetchApiDataService */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {

      this.dialogRef.close();
      console.log(response);
      this.snackBar.open('User registered succesfully! Please log in', 'OK', {
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
