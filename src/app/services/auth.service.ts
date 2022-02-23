import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import ProductModel from '../models/auth.model';
import LoginModel from '../models/login.model'
import { setAuth, setCart_ID } from '../redux/redux.component';
import store from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public async register(user: ProductModel) {
    const myFormData = ProductModel.convertToFormData(user);
      const addedUser = await this.http.post<ProductModel>(environment.registerUrl, myFormData).toPromise();
      store.dispatch(setAuth(addedUser));
      return addedUser;
  }

  public async login(credentials: LoginModel|any) {
      const loggedInUser = await this.http.post<LoginModel>(environment.loginUrl, credentials).toPromise();
      store.dispatch(setAuth(loggedInUser));
      return loggedInUser;
  }
 public async getcartid(castumer_ID: number){
  const cartid = await this.http.post<any>(environment.getcartUrl,{
    castumer_ID: castumer_ID}).toPromise();
    store.dispatch(setCart_ID(cartid));
    return cartid
 }
 public async getandupdtaecartid(castumer_ID: number){
  const cartid = await this.http.put<any>(environment.getcartUrl+castumer_ID,{
    castumer_ID: castumer_ID}).toPromise();
    store.dispatch(setCart_ID(cartid));
    return cartid
}
public async getdate(castumer_ID:number){
  const date = await this.http.get<any>(environment.dateUrl+castumer_ID).toPromise();
  return date
}
}