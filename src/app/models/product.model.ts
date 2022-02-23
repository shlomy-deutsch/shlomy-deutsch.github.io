class ProductModel {
  public category_ID: number | any;
  public name: string = '';
  public price: number = 0;
  public image?: FileList | any;
  public id: number | any;
  public category_Name: string = '';

  public static convertToFormData(product: ProductModel): FormData {
    const myFormData = new FormData();
    myFormData.append('category_ID', product.category_ID.toString());
    myFormData.append('name', product.name);
    myFormData.append('price', product.price.toString());
    myFormData.append('image', product.image?.item(0) as Blob);

    return myFormData;
  }
}

export default ProductModel;
