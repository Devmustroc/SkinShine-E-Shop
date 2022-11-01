import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@devmust/orders';
import { ProductsService } from '@devmust/products';
import { UsersService } from '@devmust/users';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
    statistics = [];
    endsubs$: Subject<void> = new Subject();

    constructor(
        private userService: UsersService,
        private productService: ProductsService,
        private ordersService: OrdersService
    ) {}

    ngOnInit(): void {
        combineLatest([
            this.ordersService.getOrdersCount(),
            this.productService.getProductsCount(),
            this.userService.getUsersCount(),
            this.ordersService.getTotalSales()
        ])
            .pipe(takeUntil(this.endsubs$))
            .subscribe((values) => {
                this.statistics = values;
            });
    }
// destroy
    ngOnDestroy() {
        this.endsubs$.next();
        this.endsubs$.complete();
    }
}
