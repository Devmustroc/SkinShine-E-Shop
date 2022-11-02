import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@devmust/orders';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {Product, ProductsService} from "@devmust/products";


@Component({
    selector: 'skshop-product-page',
    templateUrl: './product-page.component.html',
    styles: []
})
export class ProductPageComponent implements OnInit, OnDestroy {
    product: Product;
    endSubs$: Subject<void> = new Subject();
    quantity = 1;

    constructor(
        private prodService: ProductsService,
        private route: ActivatedRoute,
        private cartService: CartService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params.productid) {
                this._getProduct(params.productid);
            }
        });
    }

    ngOnDestroy(): void {
        this.endSubs$.next();
        this.endSubs$.complete();
    }

    addProductToCart() {
        const cartItem: CartItem = {
            productId: this.product.id,
            quantity: this.quantity
        };

        this.cartService.setCartItem(cartItem);
    }

    private _getProduct(id: string) {
        this.prodService
            .getProduct(id)
            .pipe(takeUntil(this.endSubs$))
            .subscribe((resProduct) => {
                this.product = resProduct;
            });
    }
}
