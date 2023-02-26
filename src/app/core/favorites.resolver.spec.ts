import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FavoritesResolver } from './favorites.resolver';
import { ImagesStorageService } from './services/images/storage.service';

describe('ImageApiService', () => {
  let service: FavoritesResolver;
  let imagesStorageService: any;

  const blobFake: any = new Blob([''], { type: 'text/html' });
  blobFake['lastModifiedDate'] = '';
  blobFake['name'] = 'filename';

  beforeEach(() => {
    imagesStorageService = jasmine.createSpyObj('ImagesStorageService', ['getAllFavorites']);
    imagesStorageService.getAllFavorites.and.callFake(() => {
      return [blobFake];
    });

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ImagesStorageService,
          useValue: imagesStorageService,
        },
      ],
    });

    service = TestBed.inject(FavoritesResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should resolve if items getted', () => {
    expect(service.resolve()).toEqual([blobFake]);
  });
});
