import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() {
  }

  validateRegister(user): boolean {
    if (user.name === undefined || user.email === undefined || user.username === undefined || user.password === undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email): boolean {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(email);
  }
}
