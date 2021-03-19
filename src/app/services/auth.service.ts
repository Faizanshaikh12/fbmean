import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) {
  }

//register post
  registerUser(user): any {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers})
      .pipe(map((res: Response) => res));
  }

  //login post
  authenticateUser(user): any {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers})
      .pipe(map((res: Response) => res));
  }

  storeUserData(token, user): any {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  //logout
  logout(): any{
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  //get Profile
  getProfile(): any{
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers})
      .pipe(map((res: Response) => res));
  }

  loadToken(): any{
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(): boolean {
    return !!this.authToken;
  }

}
