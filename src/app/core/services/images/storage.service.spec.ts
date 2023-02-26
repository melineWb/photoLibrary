import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ImagesStorageService } from './storage.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ImageApiService } from './images.service';

describe('ImagesStorageService', () => {
  let service: ImagesStorageService;
  let httpClientSpy: any;
  let imageApiService: any;

  const blobFake: any = new Blob([''], { type: 'text/html' });
  blobFake['lastModifiedDate'] = '';
  blobFake['name'] = "filename";

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('httpClient', ['get']);
    httpClientSpy.get.and.callFake(() => {
      return of(blobFake);
    });

    imageApiService = jasmine.createSpyObj('ImageApiService', ['images$']);
    httpClientSpy.images$.and.callFake(() => {
      return of([blobFake]);
    });

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

    window = {
      sessionStorage: {
        setItem: jasmine.createSpy('setItem'),
        getItem: jasmine.createSpy('getItem'),
      },
    } as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add to Favorites 1 item', () => {
    expect(service.getAllFavorites().length).toBeFalsy();

    service.addToFavorites(blobFake);
    expect(service.getAllFavorites().length).toBe(1);
  });

  it('should set selected attr for images when it added to Favorites', () => {
    expect(service.getAllFavorites().length).toBeFalsy();

    const images = service.addToFavorites(blobFake);
    expect(images[0].selected).toBe(true);
  });

  it('should remove from Favorites item', () => {
    const item = service.addToFavorites(blobFake);
    expect(service.getAllFavorites().length).toBe(1);
    service.removeFromFavorites(item[0]);
    expect(service.getAllFavorites().length).toBe(0);
  });
});
