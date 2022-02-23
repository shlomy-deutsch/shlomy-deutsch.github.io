class orderModel {
  public castumer_ID: number | any;
  public city: string | any;
  public street: string | any;
  public delivery_Date: string | any;
  public credit: number | any;
  public total_Price: number | any;
  public cart_ID: number | any;

  public static convertToFormData(product: orderModel): FormData {
    const myFormData = new FormData();
    myFormData.append('castumer_ID', product.castumer_ID.toString());
    myFormData.append('city', product.city);
    myFormData.append('street', product.street);
    myFormData.append('delivery_Date', product.delivery_Date);
    myFormData.append('credit', product.credit.toString());
    myFormData.append('total_Price', product.total_Price.toString());
    myFormData.append('cart_ID', product.cart_ID.toString());

    return myFormData;
  }
}

export default orderModel;
