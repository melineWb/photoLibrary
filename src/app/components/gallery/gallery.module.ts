import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { GalleryComponent } from './gallery.component';
import { MatCardModule } from '@angular/material/card';
import { ImageApiService } from '../../core/services/images/images.service';
import { ImagesStorageService } from '../../core/services/images/storage.service';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    GalleryComponent,
  ],
  imports: [
    SharedModule,
    MatCardModule,
    ScrollingModule,
  ],
  providers: [
    ImageApiService,
    ImagesStorageService,
  ],
  exports: [GalleryComponent]
})
export class GalleryModule { }
