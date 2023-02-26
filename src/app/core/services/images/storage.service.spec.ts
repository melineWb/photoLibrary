import { TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { ImagesStorageService } from './storage.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ImageApiService } from './images.service';
import { BlobImage } from 'src/app/models/general.models';

describe('ImagesStorageService', () => {
  let service: ImagesStorageService;
  let httpClientSpy: any;
  let imageApiService: Partial<ImageApiService>;

  const blobFake: any = new Blob([''], { type: 'text/html' });
  blobFake.lastModifiedDate = '';
  blobFake.name = 'filename';
  blobFake.id = 'testId';
  blobFake.selected = false;

  const items$ = new Subject<BlobImage>();

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('httpClient', ['get']);
    httpClientSpy.get.and.callFake(() => {
      return of(blobFake);
    });

    items$.next({...blobFake});

    imageApiService = {
      images$: items$,
    };

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientSpy,
        },
        {
          provide: ImageApiService,
          useValue: imageApiService,
        },
      ],
    });

    service = TestBed.inject(ImagesStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add to Favorites 1 item', () => {
    const prevCount = service.getAllFavorites().length;

    service.addToFavorites(blobFake);
    expect(service.getAllFavorites().length).toBe(prevCount + 1);
  });

  it('should remove from Favorites item', () => {
    service.addToFavorites(blobFake);
    const items = service.getAllFavorites();
    const prevCount = items.length;

    service.removeFromFavorites(items[0]);
    expect(service.getAllFavorites().length).toBe(prevCount - 1);
  });
});
