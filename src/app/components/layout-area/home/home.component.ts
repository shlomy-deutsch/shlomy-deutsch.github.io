import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { setAuth } from '../../../redux/redux.component';
import store from 'src/app/redux/store';
import LoginModel from '../../../models/login.model';
import { NotifyService } from 'src/app/services/notify.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public date: number | any = [];
  public open: any = null;
  public products: number | any;
  public orders: number = 0;
  public auth?: LoginModel[] | any = [];
  public total: number = 0;

  constructor(
    private myAuthService: AuthService,
    private myProductsService: ProductsService,
    private _formBuilder: FormBuilder,
    private myRouter: Router,
    private notify: NotifyService
  ) {}

  async ngOnInit() {
    const total = localStorage.getItem('total');
    if (total) {
      this.total = JSON.parse(total);
    }
    this.products = await this.myProductsService.getNumberOfAllProducts();
    this.orders = await this.myProductsService.getNumberOfAllOrders();
    const user = store.getState().productsState.auth;
    if (user != undefined) {
      this.auth = user;
      if (this.auth.admin === 1 || this.auth.admin === true) {
        this.myRouter.navigateByUrl('/admin');
        return;
      }
      this.open = this.auth.open;
      this.auth.date = await this.myAuthService.getdate(this.auth.castumer_ID);
    } else {
      this.auth = this._formBuilder.group({
        firstCtrl: ['', Validators.required],
      });
    }
  }
  public async send() {
    try {
      const myFormData = LoginModel.convertToFormData(this.auth);
      this.auth = await this.myAuthService.login(myFormData);
      this.open = this.auth.open;
      if (this.auth.admin === 1 || this.auth.admin === true) {
        this.myRouter.navigateByUrl('/admin');
        return;
      }
      if (this.open == 1 || this.open == 2) {
        this.auth.date = await this.myAuthService.getdate(
          this.auth.castumer_ID
        );
      }
      try {
        if (this.open == 1) {
          const cartid = await this.myAuthService.getandupdtaecartid(
            this.auth.castumer_ID
          );
        }
        if (this.open == 0 || this.open == 2) {
          const cartid = await this.myAuthService.getcartid(
            this.auth.castumer_ID
          );
          this.auth.open = 1;
        }
        this.myRouter.navigateByUrl('/shopping');
        store.dispatch(setAuth(this.auth));
      } catch (err) {
        console.log(err);
      }
    } catch (err: any) {
      this.notify.error('שגיאה בקוד או בשם משתמש');
    }
  }
  public async newshop() {
    try {
      const cartid = await this.myAuthService.getcartid(this.auth.castumer_ID);
      const user = store.getState().productsState.auth;
      user.open = 1;
      store.dispatch(setAuth(user));
      this.myRouter.navigateByUrl('/shopping');
    } catch (err) {
      console.log(err);
    }
  }
  public async returnshop() {
    try {
      const cartid = await this.myAuthService.getandupdtaecartid(
        this.auth.castumer_ID
      );
      this.myRouter.navigateByUrl('/shopping');
    } catch (err) {
      console.log(err);
    }
  }
}
