import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { FavoritesComponent } from './favorites.component';
import { HeaderComponent } from '../../components/header/header.component';
import { SharedModule } from '../../shared/shared.module';
import { PageTitleComponent } from '../../components/page-title/page-title.component';
import { FavoritesGalleryModule } from '../../components/favorites-gallery/favorites-gallery.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let activatedRoute: Partial<ActivatedRoute>;

  const cardItems = [{
    data: 'test'
  }];

  beforeEach(async () => {
    activatedRoute = {
      snapshot: {
        data: {
          data: cardItems
        }
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        FavoritesGalleryModule,
        RouterTestingModule,
      ],
      providers: [{
        provide: ActivatedRoute,
        useValue: activatedRoute
      }],
      declarations: [ HeaderComponent, FavoritesComponent, PageTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
