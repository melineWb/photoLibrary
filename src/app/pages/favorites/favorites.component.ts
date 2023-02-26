import { Component } from '@angular/core';
import { BlobImage } from 'src/app/models/general.models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  items: BlobImage[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.items = (this.route.snapshot.data as any).data;
  }

}
