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
  let imagesStorageService: any;
  let activatedRoute: Partial<ActivatedRoute>;

  beforeEach(async () => {
    imagesStorageService = jasmine.createSpyObj('ImagesStorageService', [
      'removeFromFavorites',
    ]);
    imagesStorageService.removeFromFavorites.and.callFake(() => {
      return true;
    });

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
});
