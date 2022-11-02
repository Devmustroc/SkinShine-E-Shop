import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@devmust/users';
import {Cart, CartService, Order, OrderItem, OrdersService} from "@devmust/orders";

@Component({
    selector: 'orders-checkout-page',
    templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent implements OnInit {
    constructor(
        private router: Router,
        private usersService: UsersService,
        private formBuilder: FormBuilder,
        private cartService: CartService,
        private ordersService: OrdersService
    ) {}
    checkoutFormGroup: FormGroup;
    isSubmitted = false;
    orderItems: OrderItem[] = [];
    userId = '609d65943373711346c5e950';
    countries = [];

    ngOnInit(): void {
        this._initCheckoutForm();
        this._getCartItems();
        this._getCountries();
    }

    private _initCheckoutForm() {
        this.checkoutFormGroup = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.email, Validators.required]],
            phone: ['', Validators.required],
            city: ['', Validators.required],
            country: ['', Validators.required],
            zip: ['', Validators.required],
            apartment: ['', Validators.required],
            street: ['', Validators.required]
        });
    }

    private _getCartItems() {
        const cart: Cart = this.cartService.getCart();
        this.orderItems = cart.items.map((item) => {
            return {
                product: item.productId,
                quantity: item.quantity
            };
        });
    }

    private _getCountries() {
        this.countries = this.usersService.getCountries();
    }
// routing to cart
    backToCart() {
        this.router.navigate(['/cart']);
    }
// placing order
    placeOrder() {
        this.isSubmitted = true;
        if (this.checkoutFormGroup.invalid) {
            return;
        }

        const order: Order = {
            orderItems: this.orderItems,
            shippingAddress1: this.checkoutForm.street.value,
            shippingAddress2: this.checkoutForm.apartment.value,
            city: this.checkoutForm.city.value,
            zip: this.checkoutForm.zip.value,
            country: this.checkoutForm.country.value,
            phone: this.checkoutForm.phone.value,
            status: 0,
            user: this.userId,
            dateOrdered: `${Date.now()}`
        };

        this.ordersService.createOrder(order).subscribe(
            () => {
                //redirect to thank you page // payment
                this.cartService.emptyCart();
                this.router.navigate(['/success']);
            }
        );
    }
// check form
    get checkoutForm() {
        return this.checkoutFormGroup.controls;
    }
}
