import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { BlobImage } from '../models/general.models';
import { ImagesStorageService } from './services/images/storage.service';
@Injectable({
  providedIn: 'root'
})
export class FavoritesResolver implements Resolve<BlobImage[]> {
  constructor(
    private imagesStorageService: ImagesStorageService,
  ) { }

  resolve(): BlobImage[] {
    return this.imagesStorageService.getAllFavorites()
  }
}
