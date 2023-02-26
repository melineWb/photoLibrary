import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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
    });

    this.getFromLocalStorage();
  }

  getAllFavorites(): BlobImage[] {
    return this.favorites;
  }

  getFavoriteImage(id: string): BlobImage | null {
    const img = this.favorites.find(item => item.id === id);
    return img ? { ...img } : null;
  }

  addToFavorites(item: BlobImage): BlobImage[] {
    const selectedItemIndex: number | undefined = this.findIndexById(item.id, this.images);

    // we can use lodash lib and isNil() check, but it not required for small projects
    if (selectedItemIndex != undefined) {
      const selectedItem = {...item, ...{
        selected: !item.selected,
      }};
      const images = [ ...this.images ];

      images[selectedItemIndex] = selectedItem;

      this.favorites.push(selectedItem);
      this.images = images;
      this.updateLocalStorage();
    }
    return this.getAllImages();
  }

  removeFromFavorites(item: BlobImage): boolean {
    const selectedItemIndex: number | undefined = this.findIndexById(item.id, this.images);
    const favoritesItemIndex: number | undefined = this.findIndexById(item.id, this.favorites);

    if (selectedItemIndex != undefined) {
      const selectedItem = {...item, ...{
        selected: false,
      }};

      const images = [ ...this.images ];

      if (favoritesItemIndex != undefined) {
        const favorites = [ ...this.favorites ];
        favorites.splice(favoritesItemIndex, 1);

        this.favorites = favorites;
        this.updateLocalStorage();
      }

      images[selectedItemIndex] = selectedItem;
      this.images = images;

      return true;
    }

    return false;
  }

  private getAllImages(): BlobImage[] {
    return this.images;
  }

  private findIndexById(id: string, arr: BlobImage[]): number | undefined {
    return arr.findIndex(item => item.id === id);
  }

  private updateLocalStorage(): void {
    sessionStorage.setItem('favoritesItems', JSON.stringify(this.favorites));
  }

  private getFromLocalStorage(): void {
    const favoritesItems = sessionStorage.getItem('favoritesItems');

    if (favoritesItems) {
      this.favorites = JSON.parse(favoritesItems);
    }
  }
}
