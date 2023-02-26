import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { BlobImage } from 'src/app/models/general.models';
import { ImagesStorageService } from '../../core/services/images/storage.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss']
})
export class SingleItemComponent implements OnInit, OnDestroy {
  selectedItem: BlobImage | null;
  showMessage: boolean = false;
  message: string = '';
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private location: Location,
    private imagesStorageService: ImagesStorageService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.selectedItem = (this.location.getState() as any)?.item as BlobImage ?? null;

    if (this.selectedItem === null) {
      this.route.params
        .pipe(takeUntil(this.destroyed$))
        .subscribe(params => {
          const img = this.getImageData(params['id']);
          if (img != null) {
            this.selectedItem = img;
          } else {
            this.showToast('Image is not found in Favorites');
          }
      });
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  removeFromFavorites() {
    if (!this.selectedItem) {
      return;
    }

    const isRemoved = this.imagesStorageService.removeFromFavorites(this.selectedItem);
    const msg = isRemoved ? 'Item successfully removed' : 'Issue during removing';
    this.showToast(msg);
  }

  // Would be better to move toast in separate component and create service to getting Data for toast
  showToast(msg: string) {
    this.showMessage = true;
    this.message = msg;
  }

  closeToast() {
    this.showMessage = false;
  }

  private getImageData(id: string): BlobImage | null {
    console.log(this.imagesStorageService.getFavoriteImage(id));
    return this.imagesStorageService.getFavoriteImage(id);
  }
}
