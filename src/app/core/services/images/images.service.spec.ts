import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ImageApiService } from './images.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('ImageApiService', () => {
  let service: ImageApiService;
  let httpClientSpy: any;

  const blobFake: any = new Blob([''], { type: 'text/html' });
  blobFake['lastModifiedDate'] = '';
  blobFake['name'] = "filename";

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('httpClient', ['get']);
    httpClientSpy.get.and.callFake(() => {
      return of(blobFake);
    });

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientSpy,
        },
      ],
    });

    service = TestBed.inject(ImageApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get 1 image from server', () => {
    jasmine.clock().install();
    service.getImagesByCount();

    jasmine.clock().tick(300);

    expect(httpClientSpy.get).toHaveBeenCalled();

    jasmine.clock().uninstall();
  });

  it('should get 3 image from server', () => {
    jasmine.clock().install();
    service.getImagesByCount(3);

    jasmine.clock().tick(300 * 4);

    expect(httpClientSpy.get).toHaveBeenCalledTimes(3);

    jasmine.clock().uninstall();
  });

  it('should set id for image', () => {
    jasmine.clock().install();
    service.getImagesByCount();

    service.images$.subscribe((data) => {
        expect(typeof data.id).toEqual('string');
    })

    jasmine.clock().tick(300);

    jasmine.clock().uninstall();
  });

});
