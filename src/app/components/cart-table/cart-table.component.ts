import { Component, OnInit } from '@angular/core';
import PostProductModel from 'src/app/models/post-product.model';
import {
  productUpdatedAction,
  totalUpdatedAction,
} from 'src/app/redux/redux.component';
import store from 'src/app/redux/store';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.css'],
})
export class CartTableComponent implements OnInit {
  public product = new PostProductModel();
  public products: PostProductModel[] = [];
  constructor(private myProductsService: ProductsService) {}
  async ngOnInit() {
    try {
      const cartid = store.getState().productsState.cart_ID;
      const myprod = await this.myProductsService.getMyProducts(cartid);
      this.products = myprod;
    } catch (err) {
      console.log(err);
    }
  }

  public imageUrl = environment.productsImageUrl;
  async delete(id: number) {
    const cartid = store.getState().productsState.cart_ID;
    await this.myProductsService.deleteProduct(id, cartid);
    this.ngOnInit();
  }
  async deleteall() {
    const cartid = store.getState().productsState.cart_ID;
    await this.myProductsService.deleteAllProducts(cartid);
    this.ngOnInit();
  }
  public async changecount(p: PostProductModel | any, e: any) {
    this.product.cart_ID = store.getState().productsState.cart_ID;
    this.product.product_ID = p.product_ID;
    const count = p.count;
    const newc = +e.target.value;
    this.product.count = newc;
    this.product.image = p.image;
    this.product.name = p.name;
    const price = p.total_Price / count;
    this.product.total_Price = newc * price;
    const newt = (newc - count) * price;
    store.dispatch(productUpdatedAction(this.product));
    store.dispatch(totalUpdatedAction(newt));

    await this.myProductsService.updateCount(this.product);

    this.ngOnInit();
  }
}
