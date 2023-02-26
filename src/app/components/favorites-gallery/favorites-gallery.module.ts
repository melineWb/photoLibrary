import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FavoritesGalleryComponent } from './favorites-gallery.component';
import { CardItemModule } from '../card-item/card-item.module';


@NgModule({
  declarations: [
    FavoritesGalleryComponent,
  ],
  imports: [
    SharedModule,
    CardItemModule,
  ],
  exports: [
    FavoritesGalleryComponent,
    CardItemModule,
  ]
})
export class FavoritesGalleryModule { }
