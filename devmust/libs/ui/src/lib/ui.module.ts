import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { ButtonModule } from 'primeng/button';
import {CardModule} from "primeng/card";
@NgModule({
    imports: [CommonModule, ButtonModule, CardModule],
  declarations: [BannerComponent],
  exports: [BannerComponent]
})
export class UiModule {}
