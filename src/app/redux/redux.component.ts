import LoginModel from '../models/login.model';
import PostProductModel from '../models/post-product.model';
import ProductModel from '../models/product.model';

export class ProductsState {
  public products: PostProductModel[] | any;
  public product: PostProductModel | ProductModel | any;
  public cart_ID: number = 0;
  public total: number = 0;
  public auth: LoginModel | any;

  public constructor() {
    const user = localStorage.getItem('user');
    if (user) {
      this.auth = JSON.parse(user);
    }
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cart_ID = JSON.parse(cart);
    }
  }
}

export enum ProductActionType {
  setCart_ID = 'setCart_ID',
  setTotal = 'setTotal',
  setAuth = 'setAuth',
  totalUpdated = 'totalUpdated',
  setProduct_ID = 'setProduct_ID',
  setProduct = 'setProduct',
  setProducts = 'setProducts',
  setQuantity = 'setQuantity',
  productAdded = 'productAdded',
  productUpdated = 'productUpdated',
}

export interface ProductAction {
  type: ProductActionType;
  payload: any;
}

export function setCart_ID(cart_ID: any): ProductAction {
  return { type: ProductActionType.setCart_ID, payload: cart_ID };
}
export function setAuth(auth: any): ProductAction {
  return { type: ProductActionType.setAuth, payload: auth };
}
export function setTotal(total: any): ProductAction {
  return { type: ProductActionType.setTotal, payload: total };
}
export function totalUpdatedAction(total: any): ProductAction {
  return { type: ProductActionType.totalUpdated, payload: total };
}

export function setProducts(products: PostProductModel): ProductAction {
  return { type: ProductActionType.setProducts, payload: products };
}
export function setProduct(
  product: PostProductModel | ProductModel | any
): ProductAction {
  return { type: ProductActionType.setProduct, payload: product };
}
export function productUpdatedAction(
  product: PostProductModel | ProductModel | any
): ProductAction {
  return { type: ProductActionType.productUpdated, payload: product };
}

export function productAddedAction(product: PostProductModel): ProductAction {
  return { type: ProductActionType.productAdded, payload: product };
}

export function productsReducer(
  currentState: ProductsState = new ProductsState(),
  action: ProductAction
): ProductsState {
  const newState = { ...currentState };
  switch (action.type) {
    case ProductActionType.setCart_ID:
      newState.cart_ID = action.payload;
      localStorage.setItem('cart', JSON.stringify(newState.cart_ID));
      break;
    case ProductActionType.setAuth:
      newState.auth = action.payload;

      if (newState.auth?.admin === 1) {
        newState.auth.admin = true;
      }

      localStorage.setItem('user', JSON.stringify(newState.auth));
      break;

    case ProductActionType.setTotal:
      newState.total = action.payload;
      localStorage.setItem('total', JSON.stringify(newState.total));

      break;
    case ProductActionType.setProducts:
      newState.products = action.payload;
      break;
    case ProductActionType.productUpdated: {
      const index = newState.products.findIndex(
        (p: { product_ID: any }) => p.product_ID === action.payload.product_ID
      );
      newState.products[index] = action.payload;
      break;
    }
    case ProductActionType.setProduct:
      newState.product = action.payload;
      break;

    case ProductActionType.productAdded:
      newState.products.push(action.payload);
      break;
    case ProductActionType.totalUpdated: {
      newState.total += action.payload;
      break;
    }
  }
  return newState;
}
