import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import PostProductModel from 'src/app/models/post-product.model';
import {
  productAddedAction,
  productUpdatedAction,
  setProduct,
} from 'src/app/redux/redux.component';
import store from 'src/app/redux/store';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';
import ProductModel from '../../models/product.model';

@Component({
  selector: 'app-products-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.css'],
})
export class ProductsCardComponent {
  constructor(
    public dialog: MatDialog,
    private myProductsService: ProductsService
  ) {}
  public addproduct = new PostProductModel();
  public count: number = 1;
  public myproducts: PostProductModel[] = [];

  @Input()
  public product: PostProductModel | any;

  openDialog(product: PostProductModel): void {
    store.getState().productsState.product;
    store.dispatch(setProduct(product));

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog1, {
      width: '250px',
    });
  }

  public imageUrl = environment.productsImageUrl;
  public plus() {
    this.count++;
  }
  public minus() {
    if (this.count <= 1) {
      return;
    }
    this.count--;
  }
  public async addme(newproduct: ProductModel, qty: number) {
    this.addproduct.cart_ID = store.getState().productsState.cart_ID;
    this.addproduct.product_ID = newproduct.id;
    this.addproduct.name = newproduct.name;
    this.addproduct.image = newproduct.image;
    this.addproduct.count = qty;
    this.addproduct.total_Price = qty * newproduct.price;

    this.myproducts = store.getState().productsState.products;
    if (this.myproducts.length != 0) {
      for (let i of this.myproducts) {
        if (i.product_ID == this.addproduct.product_ID) {
          store.dispatch(productUpdatedAction(this.addproduct));
          await this.myProductsService.updateCount(this.addproduct);
          return;
        }
      }
      store.dispatch(productAddedAction(this.addproduct));
      await this.myProductsService.addProductToCart(this.addproduct);
    } else {
      store.dispatch(productAddedAction(this.addproduct));
      await this.myProductsService.addProductToCart(this.addproduct);
    }
  }
}

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
})
export class DialogOverviewExampleDialog1 {
  public total: number | any;
  public myproducts: PostProductModel[] = [];
  public product = new PostProductModel();
  public countControl: FormControl;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog1>,
    private myProductsService: ProductsService
  ) {
    this.countControl = new FormControl(null, Validators.required);
  }

  public async add() {
    this.product.cart_ID = store.getState().productsState.cart_ID;
    this.product.product_ID = store.getState().productsState.product.id;
    this.product.name = store.getState().productsState.product.name;
    this.product.image = store.getState().productsState.product.image;
    this.product.total_Price =
      this.product.count * store.getState().productsState.product.price;

    this.myproducts = store.getState().productsState.products;
    if (this.myproducts.length != 0) {
      for (let i of this.myproducts) {
        if (i.product_ID == this.product.product_ID) {
          store.dispatch(productUpdatedAction(this.product));
          this.total = this.myproducts.reduce((a: any, b: any) => a + b, 0);
          await this.myProductsService.updateCount(this.product);
          this.onNoClick();
          return;
        }
      }
      store.dispatch(productAddedAction(this.product));
      await this.myProductsService.addProductToCart(this.product);
    } else {
      store.dispatch(productAddedAction(this.product));
      await this.myProductsService.addProductToCart(this.product);
    }
    this.onNoClick();
  }
  onNoClick(): void {
    store.dispatch(setProduct(null));
    this.dialogRef.close();
  }
}
