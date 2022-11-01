import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AccordionModule } from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {ProductsModule} from "@devmust/products";
import {UiModule} from "@devmust/ui";
import {OrdersModule} from "@devmust/orders";
import {CardModule} from "primeng/card";
import {LandingPageComponent} from "./pages/landing-page/landing-page.component";
import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";

const routes: Routes = [
    { path: '', component: HomePageComponent },
    {path: 'skinshine', component: LandingPageComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        LandingPageComponent,
        HeaderComponent,
        FooterComponent,
        NavComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        ProductsModule,
        AccordionModule,
        BrowserAnimationsModule,
        UiModule,
        OrdersModule,
        ToastModule,
        CardModule,
        RippleModule,
        ButtonModule
    ],
    providers: [MessageService],
    bootstrap: [AppComponent],
    exports: [
      LandingPageComponent
    ]
})
export class AppModule {}
