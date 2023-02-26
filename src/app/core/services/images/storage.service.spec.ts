import { TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { ImagesStorageService } from './storage.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ImageApiService } from './images.service';
import { BlobImage } from 'src/app/models/general.models';

fdescribe('ImagesStorageService', () => {
  let service: ImagesStorageService;
  let httpClientSpy: any;
  let imageApiService: Partial<ImageApiService>;

  const blobFake: any = new Blob([''], { type: 'text/html' });
  blobFake.lastModifiedDate = '';
  blobFake.data = 'filename';
  blobFake.id = 'testId';
  blobFake.selected = false;

  const items$ = new Subject<BlobImage>();

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('httpClient', ['get']);
    httpClientSpy.get.and.callFake(() => {
      return of(blobFake);
    });


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
    items$.next({...blobFake});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should remove from Favorites item', () => {
    jasmine.clock().install();
    const newItem = { ...blobFake, ...{id:  '123123'}};
-   items$.next({...newItem});
    items$.next({...newItem});

    service.addToFavorites(newItem);

    jasmine.clock().tick(300);
    const items = service.getAllFavorites();
    const prevCount = items.length;

    service.removeFromFavorites(newItem);
    expect(service.getAllFavorites().length).toBe(prevCount - 1);

    jasmine.clock().uninstall();
  });

  it('should add to Favorites 1 item', () => {
    jasmine.clock().install();
    service.removeFromFavorites(blobFake);

    jasmine.clock().tick(300);
    const prevCount = service.getAllFavorites().length;

    service.addToFavorites(blobFake);

    expect(service.getAllFavorites().length).toBe(prevCount + 1);

    jasmine.clock().uninstall();
  });
});
