import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@devmust/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'admin-products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit, OnDestroy {
    products = [];
    endSubs$: Subject<void> = new Subject();

    constructor(
        private productsService: ProductsService,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this._getProducts();
    }

    ngOnDestroy() {
        this.endSubs$.next();
        this.endSubs$.complete();
    }

    private _getProducts() {
        this.productsService.getProducts().pipe(takeUntil(this.endSubs$)).subscribe((products) => {
                this.products = products;
            });
    }

    updateProduct(productid: string) {
        this.router.navigateByUrl(`products/form/${productid}`);
    }

    deleteProduct(productId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this Product?',
            header: 'Delete Product',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.productsService
                    .deleteProduct(productId)
                    .pipe(takeUntil(this.endSubs$)).subscribe({
                        next: () => this.messageService.add({severity: 'success', summary: 'Success', detail: 'Category is deleted'}),
                        error: () => this.messageService.add({severity: 'error', summary: 'Error', detail: 'Category could not be deleted'}),
                        complete: () => setTimeout(() => this.router.navigate(['/products']), 2000)
                    });
            }
        });
    }
}

