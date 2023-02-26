import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { SingleItemComponent } from './single-item.component';
import { ImagesStorageService } from '../../core/services/images/storage.service';
import { of } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from "@angular/router/testing";

describe('SingleItemComponent', () => {
  let component: SingleItemComponent;
  let fixture: ComponentFixture<SingleItemComponent>;
  let imagesStorageService: Partial<ImagesStorageService>;
  let activatedRoute: Partial<ActivatedRoute>;

  const blobFake: any = new Blob([''], { type: 'text/html' });
  blobFake['lastModifiedDate'] = '';
  blobFake['name'] = 'filename';

  beforeEach(async () => {
    imagesStorageService = {
      removeFromFavorites: jasmine.createSpy('removeFromFavorites')
    };

    activatedRoute = {
      params: of({
        id: '123'
      }),
    };

    await TestBed.configureTestingModule({
      imports: [ SharedModule, RouterTestingModule ],
      providers: [
        { provider: ImagesStorageService, useValue: imagesStorageService },
        { provider: ActivatedRoute, useValue: activatedRoute },
      ],
      declarations: [ SingleItemComponent ],
      teardown: {destroyAfterEach: false},
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show toast after remove', () => {
    component.selectedItem = blobFake;
    component.removeFromFavorites();

    expect(component.message).toBe('Item successfully removed');
    expect(component.showMessage).toBeTrue();
  });

  it('should hide toast after close clicked', () => {
    component.selectedItem = blobFake;
    component.removeFromFavorites();

    expect(component.showMessage).toBeTrue();

    component.closeToast();
    expect(component.showMessage).toBeFalse();
  });
});
