import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private auth: AuthService, private router: Router, private fs: FlashMessagesService) {}

  ngOnInit(): void {
  }

  onLoginSubmit(): any {
    const user = {
      username: this.username,
      password: this.password
    };

    this.auth.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.auth.storeUserData(data.token, data.user);
        this.fs.show('You are now logged in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/dashboard']);
      } else {
        this.fs.show(data.msg, {cssClass: 'alert-denger', timeout: 5000});
        this.router.navigate(['/login']);
      }
    });
  }

}
