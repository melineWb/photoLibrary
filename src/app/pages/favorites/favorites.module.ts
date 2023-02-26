import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FavoritesComponent } from './favorites.component';
import { FavoritesGalleryModule } from '../../components/favorites-gallery/favorites-gallery.module';
import { PageTitleComponent } from '../../components/page-title/page-title.component';

@NgModule({
  declarations: [
    FavoritesComponent,
    PageTitleComponent,
  ],
  imports: [
    SharedModule,
    FavoritesGalleryModule,
  ],
  providers: [],
  exports: [
    FavoritesComponent,
    PageTitleComponent,
  ]
})
export class FavoritesModule { }
