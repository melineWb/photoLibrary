import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared/shared.module';
import { FavoritesGalleryComponent } from './favorites-gallery.component';
import { CardItemModule } from '../card-item/card-item.module';
import { Router } from '@angular/router';
import { BlobImage } from 'src/app/models/general.models';

describe('FavoritesGalleryComponent', () => {
  let component: FavoritesGalleryComponent;
  let fixture: ComponentFixture<FavoritesGalleryComponent>;
  let routerMock: Partial<Router>;

  beforeEach(async () => {
    routerMock = {
      url: '/pageA',
      navigateByUrl: jasmine.createSpy('navigateByUrl'),
    };

    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        CardItemModule,
      ],
      providers: [{
        provide: Router,
        useValue: routerMock,
      }],
      declarations: [ FavoritesGalleryComponent ],
      teardown: {destroyAfterEach: false},
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call router navigate with correct url', () => {
    const id = '123';
    const item = { id } as BlobImage;
    component.openPreviewPage(item);
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith(`/details/${id}`, { state:  { item } } );
  });
});
