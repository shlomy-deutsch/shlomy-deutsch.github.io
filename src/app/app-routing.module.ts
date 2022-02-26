import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/layout-area/home/home.component';
import { OrderComponent } from './components/order/order.component';
import { RegisterComponent } from './components/register/register.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { AdminGuard } from './services/admin.guard';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [ 
  { path: 'home', component: HomeComponent },
  { path: 'order', canActivate: [AuthGuard], component: OrderComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'shopping',  canActivate: [AuthGuard], component: ShoppingComponent},
  { path: 'admin',  canActivate: [AdminGuard], component: AdminComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
