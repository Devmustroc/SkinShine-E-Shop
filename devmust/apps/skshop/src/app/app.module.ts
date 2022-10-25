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
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";

const routes: Routes = [
    { path: '', component: HomePageComponent },
    {path: 'skinshine', component: LandingPageComponent}

];

@NgModule({
    declarations: [AppComponent, NxWelcomeComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent, LandingPageComponent],
    imports: [BrowserModule, CardModule, HttpClientModule, BrowserAnimationsModule, RouterModule.forRoot(routes), AccordionModule, ProductsModule, UiModule, OrdersModule, UsersModule, ButtonModule, RippleModule],
    providers: [],
    bootstrap: [AppComponent],
    exports: [
      NavComponent,
      LandingPageComponent
    ]
})
export class AppModule {}
