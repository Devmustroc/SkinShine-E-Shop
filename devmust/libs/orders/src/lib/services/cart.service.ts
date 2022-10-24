import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    constructor() {}

    initCartLocalStorage() {
        const intialCart = {
            items: []
        }
        const initialCartJson = JSON.stringify(intialCart);
        localStorage.setItem('cart', initialCartJson)
    }
}
