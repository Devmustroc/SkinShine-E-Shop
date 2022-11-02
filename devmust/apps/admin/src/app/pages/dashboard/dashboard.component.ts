import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import {OrdersService} from "@devmust/orders";
import {UsersService} from "@devmust/users";
import {ProductsService} from "@devmust/products";

@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: []
})
export class DashboardComponent implements OnInit {
    ordersCount: number;
    usersCount: number;
    productsCount: number;
    totalSales: number;
    msg = "You are not allowed to edit some data items, so the the content of the website will not be all empty !";
    infoMessage: Message[];

    constructor(
        private ordersService: OrdersService,
        private usersService: UsersService,
        private productsService: ProductsService
    ) { }

    ngOnInit(): void {
        this._getOrdersCount();
        this._getUsersCount();
        this._getProductsCount();
        this._getTotalSales();
        this.infoMessage = [{severity:'info', summary: `Keep in mind`, detail: this.msg}];
    }

    _getUsersCount() {
        this.usersService.getUsersCount().subscribe( usersCount => {
            this.usersCount = usersCount;
        })
    }

    _getOrdersCount() {
        this.ordersService.getOrdersCount().subscribe( ordersCount => {
            this.ordersCount = ordersCount;
        })
    }

    _getProductsCount() {
        this.productsService.getProductsCount().subscribe( productsCount => {
            this.productsCount = productsCount;
        })
    }

    _getTotalSales() {
        this.ordersService.getTotalSales().subscribe( totalSales => {
            this.totalSales = totalSales;
        })
    }


}
