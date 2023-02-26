import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesGalleryComponent } from './favorites-gallery.component';

describe('FavoritesGalleryComponent', () => {
  let component: FavoritesGalleryComponent;
  let fixture: ComponentFixture<FavoritesGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritesGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
