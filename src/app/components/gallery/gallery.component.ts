import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';
import { ImageApiService } from '../../core/services/images/images.service';
import { ImagesStorageService } from '../../core/services/images/storage.service';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';
import { BlobImage } from 'src/app/models/general.models';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent implements OnInit, OnDestroy {
  images: BlobImage[] = [];
  scrollingSubscription: any;
  showLoader$: Observable<boolean>;
  private imagesInRow = 3; // TODO: change for Tablet / Mobile view
  private displayedRows = 2;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private scrolledRow = 1;
  private windowHeight: number;
  private cardHeight = 464;
  @HostListener('window:resize', ['$event'])
    onResize() {
      return this.setDisplatedRows();
    }

  constructor(
    private imageApiService: ImageApiService,
    private imagesStorageService: ImagesStorageService,
    private cdr: ChangeDetectorRef,
    public scroll: ScrollDispatcher,
  ) { }

  ngOnInit(): void {
    this.setDisplatedRows();

    this.showLoader$ = this.imageApiService.showLoader$.pipe(takeUntil(this.destroyed$));

    this.imagesStorageService.images$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: any) => {
        this.images = [...this.images, ...[data]];
        this.cdr.detectChanges();
      });

    this.scrollingSubscription = this.scroll
      .scrolled()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: any) => {
        this.onWindowScroll(data);
      });

    // Used library for virtual scroll due to lack of time
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  selectToFavorites(item: BlobImage) {
    this.images = this.imagesStorageService.addToFavorites(item);
    this.cdr.detectChanges();
  }

  private setDisplatedRows() {
    this.windowHeight = window.innerHeight;
    this.displayedRows = Math.ceil(this.windowHeight / this.cardHeight);
    this.imageApiService.getImagesByCount(this.imagesInRow * this.displayedRows);
  }

  private onWindowScroll(data: CdkScrollable): void {
    const cardHalfHeight = 150;
    if (data.measureScrollOffset('top') > cardHalfHeight * this.scrolledRow) {
      this.scrolledRow += 1;
      this.imageApiService.getImagesByCount(this.imagesInRow);
    }
  }
}
