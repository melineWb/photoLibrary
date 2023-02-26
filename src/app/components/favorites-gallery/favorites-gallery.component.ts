import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BlobImage } from 'src/app/models/general.models';

@Component({
  selector: 'app-favorites-gallery',
  templateUrl: './favorites-gallery.component.html',
  styleUrls: ['./favorites-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesGalleryComponent {
  @Input() items: BlobImage[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  openPreviewPage(item: BlobImage) {
    const path = `/details/${item.id}`;
    this.router.navigateByUrl(path, { state:  { item } });
  }
}
