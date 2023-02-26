import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { BlobImage } from 'src/app/models/general.models';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardItemComponent {
    @Input() cardItem: BlobImage;
    @Input() favoritesIcon: boolean = false;
    @Input() openImageIcon: boolean = false;

    @Output() addToFavorites = new EventEmitter<BlobImage>();
    @Output() openPreview = new EventEmitter<BlobImage>();


    onImageClick($event: Event, item: BlobImage): void {
      $event.preventDefault();
      this.openImageIcon ? this.openPreview.emit(item) : this.addToFavorites.emit(item);
    }

    selectToFavorites(item: BlobImage): void {
      this.addToFavorites.emit(item);
    }

    openImagePage(item: BlobImage): void {
      this.openPreview.emit(item);
    }
}
