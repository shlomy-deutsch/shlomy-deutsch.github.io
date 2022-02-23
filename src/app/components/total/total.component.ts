import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Unsubscribe } from 'redux';
import { setTotal } from 'src/app/redux/redux.component';
import store from 'src/app/redux/store';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css'],
})
export class TotalComponent implements OnInit {
  public total: number | any;
  private unsubscribeMe: Unsubscribe | any;

  ngOnInit() {
    this.unsubscribeMe = store.subscribe(() => {
      const myprod = store.getState().productsState.products;
      const arr = [];
      for (let i of myprod) {
        arr.push(i.total_Price);
      }
      this.total = arr.reduce((a: number, b: number) => a + b, 0);
    });
  }
}
