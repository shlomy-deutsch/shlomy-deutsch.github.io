class ProductModel {
  public castumer_ID: number | any;
  public first_Name: string | any;
  public last_Name: any;
  public username: any;
  public password: any;
  public city: any;
  public street: any;
  public open: any;
  public token: string = '';


  public static convertToFormData(product: ProductModel): FormData {
    const myFormData = new FormData();
    myFormData.append('castumer_ID', product.castumer_ID.toString());
    myFormData.append('first_Name', product.first_Name);
    myFormData.append('last_Name', product.last_Name);
    myFormData.append('username', product.username);
    myFormData.append('password', product.password.toString());
    myFormData.append('city', product.city);
    myFormData.append('street', product.street);

    return myFormData;
  }
}

export default ProductModel;
