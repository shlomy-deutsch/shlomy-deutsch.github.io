import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NotifyService } from './notify.service';
import store from '../redux/store';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private notify: NotifyService, 
    private myRouter: Router) {}

  canActivate(): boolean {
    const user = store.getState().productsState.auth;
    if (!user) {
    this.notify.error("login first")
      this.myRouter.navigateByUrl('/home');
      return false;
    }
    if (user.admin ==1) {
      return true;
    }

    this.notify.error('You are not an admin');
    this.myRouter.navigateByUrl(user?'/shopping':'/home');
    return false; 
  }
}
