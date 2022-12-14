import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@devmust/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ORDER_STATUS } from '../order.constants';

@Component({
    selector: 'admin-orders-list',
    templateUrl: './orders-list.component.html',
    styles: []
})
export class OrdersListComponent implements OnInit, OnDestroy {
    orders: Order[] = [];
    orderStatus = ORDER_STATUS;
    endSubs$: Subject<void> = new Subject();

    constructor(
        private ordersService: OrdersService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getOrders();
    }
    ngOnDestroy() {
        this.endSubs$.next();
        this.endSubs$.complete();
    }

    _getOrders() {
        this.ordersService
            .getOrders().pipe(takeUntil(this.endSubs$)).subscribe((orders) => {
                this.orders = orders;
            });
    }

    showOrder(orderId) {
        this.router.navigateByUrl(`orders/${orderId}`);
    }

    deleteOrder(orderId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to Delete this Order?',
            header: 'Delete Order',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ordersService
                    .deleteOrder(orderId)
                    .pipe(takeUntil(this.endSubs$)).subscribe({
                        next: () => this.messageService.add({severity: 'success', summary: 'Success', detail: 'Order is deleted'}),
                        error: () => this.messageService.add({severity: 'error', summary: 'Error', detail: 'Order could not be deleted'}),
                        complete: () => setTimeout(() => this.router.navigate(['/orders']), 2000)
                    });
            }
        });
    }
}
