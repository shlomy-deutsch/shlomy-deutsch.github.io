import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { setAuth } from 'src/app/redux/redux.component';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';
import ProductModel from '../../models/auth.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public password1: number | any;
  public password2: number | any;
  public add: any;
  public citys: string[] = [
    'Tel aviv',
    'jerusalem',
    'Afule',
    'Ashdod',
    'Haifa',
    'Beer-Sheva',
    'Ramat-Gan',
    'Bnei-Brak',
    'Petach-Tikva',
    'Eilat',
  ];
  public auth: ProductModel = new ProductModel();
  secondFormGroup: FormGroup | any;
  firstFormGroup: FormGroup | any;
  public id: FormControl;
  public username: FormControl;
  public password: FormControl;
  public checkpassword: FormControl;
  public city: FormControl;
  public street: FormControl;
  public firstname: FormControl;
  public lastname: FormControl;

  isEditable = false;

  constructor(
    private myRouter: Router,
    private http: HttpClient,
    private notify: NotifyService,
    private myAuthService: AuthService,
  ) {
    this.id = new FormControl('', [
      Validators.max(999999999),
      Validators.min(10000000),
      Validators.required,
    ]);
    this.username = new FormControl(null, [
      Validators.required,
      Validators.pattern('^[A-Za-z0-9+_.-]+@(.+)$'),
    ]);
    this.password = new FormControl(null, Validators.required);
    this.checkpassword = new FormControl(null, Validators.required);
    this.city = new FormControl(null, Validators.required);
    this.street = new FormControl(null, Validators.required);
    this.firstname = new FormControl(null, Validators.required);
    this.lastname = new FormControl(null, Validators.required);

    this.firstFormGroup = new FormGroup({
      id: this.id,
      username: this.username,
      password: this.password,
      checkpassword: this.checkpassword,
    });
    this.secondFormGroup = new FormGroup({
      city: this.city,
      street: this.street,
      firstname: this.firstname,
      lastname: this.lastname,
    });
  }

  static checkLimit(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
        return { range: true };
      }
      return null;
    };
  }
  public async check(stepper: MatStepper) {
    if (this.password1 !== this.password2) {
      this.notify.error('ססמאות לא תואמות');
      return;
    }
    try {
      const myFormData = ProductModel.convertToFormData(this.auth);
      this.add = await this.http
        .get<ProductModel>(
          environment.registerUrl + this.auth.castumer_ID)
        .toPromise();
      if (this.add === null) {
        stepper.next();
      } else {
        this.notify.error('תעודת הזהות כבר קיימת במערכת');
      }
    } catch (err) {
      console.log(err);
    }
  }
  public async send(stepper: MatStepper) {
    try {
      this.auth = await this.myAuthService.register(this.auth)
      this.auth.open = 0;
      store.dispatch(setAuth(this.auth));

      stepper.next();
    } catch (err) {
      console.log(err);
    }
  }
  public async startshop() {
    this.auth.open = 1;
    const cartid = await this.myAuthService.getcartid(this.auth.castumer_ID)
    store.dispatch(setAuth(this.auth));
    this.myRouter.navigateByUrl('/shopping');
  }
}
