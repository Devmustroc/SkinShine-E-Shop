// Importing module
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@devmust/users';
import {ShellComponent} from "./shared/shell/shell.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {CategoriesListComponent} from "./pages/categories/categories-list/categories-list.component";
import {CategoriesFormComponent} from "./pages/categories/categories-form/categories-form.component";
import {ProductsFormComponent} from "./pages/products/products-form/products-form.component";
import {ProductsListComponent} from "./pages/products/products-list/products-list.component";
import {UsersListComponent} from "./pages/users/users-list/users-list.component";
import {UsersFormComponent} from "./pages/users/users-form/users-form.component";
import {OrdersListComponent} from "./pages/orders/orders-list/orders-list.component";
import {OrderDetailsComponent} from "./pages/orders/orders-detail/orders-detail.component";


// Create routes
const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'categories',
        component: CategoriesListComponent
      },
      {
        path: 'categories/form',
        component: CategoriesFormComponent
      },
      {
        path: 'categories/form/:id',
        component: CategoriesFormComponent
      },
      {
        path: 'products/form',
        component: ProductsFormComponent
      },
      {
        path: 'products',
        component: ProductsListComponent
      },
      {
        path: 'products/form/:id',
        component: ProductsFormComponent
      },
      {
        path: 'users',
        component: UsersListComponent
      },
      {
        path: 'users/form',
        component: UsersFormComponent
      },
      {
        path: 'users/form/:id',
        component: UsersFormComponent
      },
      {
        path: 'orders',
        component: OrdersListComponent
      },
      {
        path: 'orders/:id',
        component: OrderDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class AppRoutingModule {}
