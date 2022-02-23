class LoginModel {
  public castumer_ID: number | any;
  public firs_Name: string | any;
  public username: any;
  public password: any;
  public cart_ID: any;
  public city: any;
  public street: any;
  public token: string = '';
  public date: string = '';
  public admin: boolean | number | any;

  public static convertToFormData(product: LoginModel): FormData {
    const myFormData = new FormData();

    myFormData.append('username', product.username);
    myFormData.append('password', product.password.toString());

    return myFormData;
  }
}

export default LoginModel;
