import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import store from '../redux/store';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private notify: NotifyService,
    private myRouter: Router
  ) {}

  canActivate(): boolean | any {
    const user = store.getState().productsState.auth;
    if (!user) {
    this.notify.error("login first")
      this.myRouter.navigateByUrl('/home');
      return false;
    }
    if (user.open != 1) {
    this.notify.error("start shopping first")
      this.myRouter.navigateByUrl('/home');
      return false;
    }
    if (user) {
      if (user.admin == true) {
        this.notify.error("you are admin")
        this.myRouter.navigateByUrl('/admin');
      }
      return true;
    }
  }
}
