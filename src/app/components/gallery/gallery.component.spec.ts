import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '../../shared/shared.module';
import { GalleryComponent } from './gallery.component';
import { ImageApiService } from '../../core/services/images/images.service';
import { ImagesStorageService } from '../../core/services/images/storage.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CardItemModule } from '../card-item/card-item.module';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { BlobImage } from 'src/app/models/general.models';
import { ScrollDispatcher } from '@angular/cdk/scrolling';

xdescribe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  let imageApiService: Partial<ImageApiService>;
  let imagesStorageService: Partial<ImagesStorageService>;
  let scrollDispatcher: Partial<ScrollDispatcher>;

  const item = {
    data: 'testUrl',
    id: '12s-df4',
    selected: false,
  } as BlobImage;

  const items$ = new Subject<BlobImage>();
  const showLoader$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  beforeEach(async () => {
    items$.next({...item});

    imageApiService = {
      showLoader$,
      getImagesByCount: jasmine.createSpy('getImagesByCount')
    };

    imagesStorageService = {
      images$: items$,
      addToFavorites: jasmine.createSpy('addToFavorites')
    };

    scrollDispatcher = {
      register: jasmine.createSpy('register'),
      scrolled: jasmine.createSpy('addToFavorites').and.returnValue(of({
        measureScrollOffset: () => 123,
      } as any))
    };

    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        ScrollingModule,
        CardItemModule,
      ],
      providers: [
        { provider: ImageApiService, useValue: imageApiService },
        { provider: ImagesStorageService, useValue: imagesStorageService },
        { provide: ScrollDispatcher, useValue: scrollDispatcher},
      ],
      declarations: [ GalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
