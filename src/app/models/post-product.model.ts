class PostProductModel {
  public product_ID: number | any;
  public count: number | any;
  public total_Price: number | any;
  public cart_ID: number | any;
  public image: FileList | any;
  public name: string = '';

  public static convertToFormData(product: PostProductModel): FormData {
    const myFormData = new FormData();
    myFormData.append('id', product.product_ID.toString());
    myFormData.append('count', product.count.toString());
    myFormData.append('total_Price', product.total_Price.toString());
    myFormData.append('cart_ID', product.cart_ID.toString());

    return myFormData;
  }
}

export default PostProductModel;
