import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { GalleryModule } from '../../components/gallery/gallery.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    SharedModule,
    GalleryModule,
  ],
  providers: [],
  exports: [HomeComponent]
})
export class HomeModule { }
