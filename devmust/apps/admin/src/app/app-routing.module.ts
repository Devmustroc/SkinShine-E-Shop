import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@bluebits/users';
import { CategoriesFormComponent } from '../../../../../../../Front-End/apps/admin/src/app/pages/categories/categories-form/categories-form.component';
import { CategoriesListComponent } from '../../../../../../../Front-End/apps/admin/src/app/pages/categories/categories-list/categories-list.component';
import { DashboardComponent } from '../../../../../../../Front-End/apps/admin/src/app/pages/dashboard/dashboard.component';
import { OrdersDetailComponent } from '../../../../../../../Front-End/apps/admin/src/app/pages/orders/orders-detail/orders-detail.component';
import { OrdersListComponent } from '../../../../../../../Front-End/apps/admin/src/app/pages/orders/orders-list/orders-list.component';
import { ProductsFormComponent } from '../../../../../../../Front-End/apps/admin/src/app/pages/products/products-form/products-form.component';
import { ProductsListComponent } from '../../../../../../../Front-End/apps/admin/src/app/pages/products/products-list/products-list.component';
import { UsersFormComponent } from '../../../../../../../Front-End/apps/admin/src/app/pages/users/users-form/users-form.component';
import { UsersListComponent } from '../../../../../../../Front-End/apps/admin/src/app/pages/users/users-list/users-list.component';
import { ShellComponent } from '../../../../../../../Front-End/apps/admin/src/app/shared/shell/shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
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
        path: 'products',
        component: ProductsListComponent
      },
      {
        path: 'products/form',
        component: ProductsFormComponent
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
        component: OrdersDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class AppRoutingModule {}
