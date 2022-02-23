import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatBadgeModule} from '@angular/material/badge';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HomeComponent } from './components/layout-area/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { DialogOverviewExampleDialog1 } from './components/products-card/products-card.component';
import { ProductsCardComponent } from './components/products-card/products-card.component';
import { AdminComponent, DialogOverviewExampleDialog } from './components/admin/admin.component';
import { CartTableComponent } from './components/cart-table/cart-table.component';
import { RegisterComponent } from './components/register/register.component';
import { TotalComponent } from './components/total/total.component';
import { OrderComponent } from './components/order/order.component';
import { ProductCardAdminComponent } from './components/admin/product-card-admin/product-card-admin.component';
import { CommonModule } from '@angular/common';
import { JwtInterceptor } from './services/jwt.interceptor';
import { Highlight } from '@mui/icons-material';
import { HighlightSearchComponent } from './components/highlight-search/highlight-search.component';


@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    RegisterComponent,
    ShoppingComponent,
    ProductsCardComponent,
    AdminComponent,
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialog1,
    CartTableComponent,
    TotalComponent,
    OrderComponent,
    ProductCardAdminComponent,
    HighlightSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatTabsModule,
    MatDialogModule,
    MatTableModule,
    CommonModule,
    MatBadgeModule

    ],
  providers: [{
    provide: HTTP_INTERCEPTORS, 
    useClass: JwtInterceptor, 
    multi: true, 
  },],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
