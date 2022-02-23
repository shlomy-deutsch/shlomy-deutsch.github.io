import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { setAuth } from '../../redux/redux.component';
import store from 'src/app/redux/store';
import { NotifyService } from 'src/app/services/notify.service';
import ProductModel from '../../models/product.model';
import { Unsubscribe } from 'redux';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css'],
})
export class ShoppingComponent implements OnInit {
  private unsubscribeMe: Unsubscribe | any;

  public badge: number = 0;
  public id: number = 0;
  public username: string = store.getState().productsState.auth.first_Name;
  public total: number = 0;
  public showFiller: boolean = true;
  public results: string = '';
  public selected: number = 0;
  public searchme: string | any;
  public found: number = 0;
  public newproducts?: ProductModel[] = [];
  public products?: ProductModel[];
  public categories: [] | any;
  tabs = [{ category_ID: 0, category_Name: '' }];

  constructor(
    private myProductsService: ProductsService,
    private myRouter: Router,
    public dialog: MatDialog,
    private notify: NotifyService
  ) {}

  addTab() {
    this.tabs.push();
  }

  async ngOnInit() {
    this.unsubscribeMe = store.subscribe(() => {
      const all = store.getState().productsState.products;
      if (all) {
        this.badge = all.length;
      }
    });
    this.showFiller = true;
    const auth = await store.getState().productsState.auth;
    if (auth.open == 1) {
      if (auth.date == undefined) {
        this.notify.success('ברוך הבא לקנייתך הראשונה');
      } else {
        this.notify.success(
          'אתה באמצע קנייה מתאריך' + ' ' + auth.date.slice(0, 10)
        );
      }
      if (auth.open == 2) {
        this.notify.success(
          'קנייתך האחרונה בוצעה בתאריך' + ' ' + auth.date.slice(0, 10)
        );
      }
    }
    try {
      this.categories = await this.myProductsService.getAllCategories();
      this.tabs = this.categories;
      this.getproducts(1);
    } catch (err: any) {
      console.log(err);
      if (err.status == 403) {
        alert('login again please');
        this.myRouter.navigateByUrl('/home');
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
      }
    }
  }

  public async getproducts(e: Event | any) {
    if (e.index >= 0) {
      this.id = e.index + 1;
    } else {
      this.id = e;
    }
    this.products = await this.myProductsService.getAllProducts(this.id);
  }
  public async search() {
    this.newproducts = await this.myProductsService.searchProducts(
      this.searchme
    );
    this.results = 'תוצאת חיפוש';
    if (this.newproducts.length == 0) {
      this.found = 2;
      this.results = 'אין תוצאות חיפוש';
    }
    this.found = 1;
    this.selected = this.tabs.length;
  }
  public go() {
    if (store.getState().productsState.products.length == 0) {
      alert('שים לפחות מוצר אחד בעגלה');
    } else {
      this.myRouter.navigateByUrl('/order');
    }
  }
  public logout() {
    this.myRouter.navigateByUrl('/home');
    store.dispatch(setAuth(null));
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('total');
  }
}
