import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import {AccordionModule} from 'primeng/accordion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavComponent } from './shared/nav/nav.component';
import {ProductsModule} from "@devmust/products";
import {CardModule} from "primeng/card";
import {HttpClientModule} from "@angular/common/http";
import {UiModule} from "@devmust/ui";
import {OrdersModule} from "@devmust/orders";
import {UsersModule} from "@devmust/users";

const routes: Routes = [
    { path: '', component: HomePageComponent },
];

@NgModule({
    declarations: [AppComponent, NxWelcomeComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent],
    imports: [BrowserModule, CardModule, HttpClientModule, BrowserAnimationsModule, RouterModule.forRoot(routes), AccordionModule, ProductsModule, UiModule, OrdersModule, UsersModule],
    providers: [],
    bootstrap: [AppComponent],
    exports: [
      NavComponent
    ]
})
export class AppModule {}
