import {Component, OnInit} from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string;
  username: string;
  email: string;
  password: string;

  constructor(private vs: ValidateService, private fs: FlashMessagesService, private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onRegisterSubmit(): boolean {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
    };

    // Required Field
    if (!this.vs.validateRegister(user)) {
      this.fs.show('Please fill all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Email Field Validate
    if (!this.vs.validateEmail(user.email)) {
      this.fs.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    this.auth.registerUser(user).subscribe(data => {

      if (data.success) {
        this.fs.show('You are now register and can login', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.fs.show('Something Went Wrong', {cssClass: 'alert-denger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
  }

}
