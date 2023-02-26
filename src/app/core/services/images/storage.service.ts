import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ImageApiService } from './images.service';
import { BlobImage } from '../../../models/general.models';

@Injectable({
  providedIn: 'root',
})
export class ImagesStorageService {
  images$: Subject<any> = new Subject();
  favorites$: Subject<any> = new Subject();
  private images: BlobImage[] = [];
  protected favorites: BlobImage[] = [];

  constructor(private imageApiService: ImageApiService) {
    this.initGallery();
  }

  initGallery(): void {
    this.imageApiService.images$.subscribe((img: BlobImage) => {
      this.images$.next(img);
      this.images.push(img);
    })
  }

  getAllImages(): BlobImage[] {
    return this.images;
  }

  getAllFavorites(): BlobImage[] {
    return this.favorites;
  }

  addToFavorites(item: BlobImage): BlobImage[] {
    let selectedItemIndex: number | undefined = this.findIndexById(item.id);

    // we can use lodash lib and isNil() check
    if (selectedItemIndex != undefined) {
      const selectedItem = {...item, ...{
        selected: !item.selected,
      }};
      let images = [ ...this.images ];

      images[selectedItemIndex] = selectedItem;

      this.favorites.push(selectedItem);
      this.images = images;
    }
    return this.getAllImages();
  }

  private findIndexById(id: string): number | undefined {
    return this.images.findIndex(item => item.id === id);
  }
}
