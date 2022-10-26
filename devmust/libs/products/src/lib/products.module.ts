import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersModule } from '@devmust/orders';
import { RouterModule, Routes } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { UiModule } from '@devmust/ui';
import {CardModule} from "primeng/card";
import {ProductPageComponent} from "./pages/product-page/product-page.component";
import {ButtonModule} from "primeng/button";
import {ProductsListComponent} from "./pages/products-list/products-list.component";
import {ProductsSearchComponent} from "./components/products-search/products-search.component";
import {CategoriesBannerComponent} from "./components/categories-banner/categories-banner.component";
import {ProductItemComponent} from "./components/product-item/product-item.component";
import {FeaturedProductsComponent} from "./components/featured-products/featured-products.component";



const routes: Routes = [
    {
        path: 'products',
        component: ProductsListComponent
    },
    {
        path: 'category/:categoryid',
        component: ProductsListComponent
    },
    {
        path: 'products/:productid',
        component: ProductPageComponent
    }
];
@NgModule({
    imports: [
        CommonModule,
        OrdersModule,
        RouterModule.forChild(routes),
        ButtonModule,
        CheckboxModule,
        FormsModule,
        RatingModule,
        InputNumberModule,
        UiModule,
        CardModule
    ],
    declarations: [
        ProductsSearchComponent,
        CategoriesBannerComponent,
        ProductItemComponent,
        FeaturedProductsComponent,
        ProductsListComponent,
        ProductPageComponent,
    ],
    exports: [
        ProductsSearchComponent,
        CategoriesBannerComponent,
        ProductItemComponent,
        FeaturedProductsComponent,
        ProductsListComponent,
        ProductPageComponent,
    ]
})
export class ProductsModule {}
