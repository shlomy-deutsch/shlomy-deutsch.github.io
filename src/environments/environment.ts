// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  myProductsUrl: 'http://localhost:3000/api/products/cart/',
  productsImageUrl: 'http://localhost:3000/api/products/images/',
  searchProductUrl: 'http://localhost:3000/api/products/search/',
  productsUrl: 'http://localhost:3000/api/products/',
  categoriesUrl: 'http://localhost:3000/api/products/categories/',
  numberOfAllOrdersURL: 'http://localhost:3000/api/auth/order',
  numberOfAllProductsURL: 'http://localhost:3000/api/auth/products',
  dateUrl: 'http://localhost:3000/api/auth/date/',
  getcartUrl: 'http://localhost:3000/api/products/carts/',
  registerUrl: 'http://localhost:3000/api/auth/',
  loginUrl: 'http://localhost:3000/api/auth/login/',
  newOrderUrl: 'http://localhost:3000/api/products/order/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
