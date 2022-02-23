import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import orderModel from '../models/order.model';
import PostProductModel from '../models/post-product.model';
import ProductModel from '../models/product.model';
import { setProducts, setTotal } from '../redux/redux.component';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

public async getNumberOfAllProducts(){
  const products = await this.http.get<any>(environment.numberOfAllProductsURL).toPromise();
  return products
}
public async getNumberOfAllOrders(){
  const orders = await this.http.get<any>(environment.numberOfAllOrdersURL).toPromise();
  return orders
}

public async getAllCategories(){
  const categories = await this.http.get<[]>(environment.categoriesUrl).toPromise();
  return categories
}

  public async getAllProducts(id:number) {
          const products = await this.http.get<ProductModel[]>(environment.productsUrl+id).toPromise();
      return products
  }
  public async searchProducts(name:string) {
    const products = await this.http.get<ProductModel[]>(environment.searchProductUrl+name).toPromise();
       return products
}

  public async updateProduct(product: ProductModel) {
    const myFormData = ProductModel.convertToFormData(product);
    const update = await this.http.put<ProductModel>(environment.productsUrl+store.getState().productsState.product.id, myFormData).toPromise();
    return update;
  }

  public async addProduct(product: ProductModel) {
    const myFormData = ProductModel.convertToFormData(product);
    const updatedProduct = await this.http.post<ProductModel>(environment.productsUrl, myFormData).toPromise();
    return updatedProduct;
  }

  public async getMyProducts(cartid: number){
    const myprod = await this.http.get<any>(environment.myProductsUrl + cartid).toPromise();
    store.dispatch(setProducts(myprod));
      const arr = [];
      for (let i of myprod) {
        arr.push(i.total_Price);
      }
      const total = arr.reduce((a: number, b: number) => a + b, 0);
      store.dispatch(setTotal(total));
    return myprod
  }

  public async deleteProduct(id: number, cartid: number) {
    await this.http.delete<ProductModel>(environment.productsUrl + id + '/' + cartid).toPromise();
  }

  public async deleteAllProducts(cartid: number){
    await this.http.delete<ProductModel>(environment.productsUrl + cartid).toPromise();
  }

public async addProductToCart(product: PostProductModel){
  const myFormData = PostProductModel.convertToFormData(product);
  await this.http.post<PostProductModel>(environment.myProductsUrl, myFormData).toPromise();
}

  public async updateCount(product: PostProductModel){
    const myFormData = PostProductModel.convertToFormData(product);
    await this.http.put<PostProductModel>(environment.myProductsUrl, myFormData).toPromise();
  }

  public async order(product: orderModel){
    const myFormData = orderModel.convertToFormData(product);
      const add = await this.http.post<orderModel>(environment.newOrderUrl, myFormData).toPromise();
  }
}
