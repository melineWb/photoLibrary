import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { GalleryComponent } from './gallery.component';
import { ImageApiService } from '../../core/services/images/images.service';
import { ImagesStorageService } from '../../core/services/images/storage.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CardItemModule } from '../card-item/card-item.module';


@NgModule({
  declarations: [
    GalleryComponent,
  ],
  imports: [
    SharedModule,
    ScrollingModule,
    CardItemModule,
  ],
  providers: [
    ImageApiService,
    ImagesStorageService,
  ],
  exports: [
    GalleryComponent,
    CardItemModule,
  ]
})
export class GalleryModule { }
