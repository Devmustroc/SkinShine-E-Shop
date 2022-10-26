import { Component, OnInit, Input } from '@angular/core';
import {Product} from "@devmust/products";
import {CartItem, CartService} from "@devmust/orders";



@Component({
  selector: 'skshop-product-item',
  templateUrl: './product-item.component.html',
  styles: []
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;

  constructor(
      private cartService: CartService
  ) {}

  ngOnInit(): void {}


  addProductToCArt() {
      const cartItem: CartItem = {
          productId : this.product.id,
          quantity: 1
      }
      this.cartService.setCartItem(cartItem)
  }
}
