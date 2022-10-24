import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { ButtonModule } from 'primeng/button';
import {CardModule} from "primeng/card";
import {GalleryComponent} from "./components/gallery/gallery.component";
@NgModule({
    imports: [CommonModule, ButtonModule, CardModule],
  declarations: [BannerComponent, GalleryComponent],
  exports: [BannerComponent, GalleryComponent]
})
export class UiModule {}
