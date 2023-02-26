import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '../../shared/shared.module';
import { CardItemComponent } from './card-item.component';
import { MatCardModule } from '@angular/material/card';

describe('CardItemComponent', () => {
  let component: CardItemComponent;
  let fixture: ComponentFixture<CardItemComponent>;

  const cardItem = {
    data: 'test',
    id: '123-123-123',
    selected: false,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        MatCardModule,
      ],
      declarations: [ CardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardItemComponent);
    component = fixture.componentInstance;
    component.cardItem = cardItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fire addToFavorites Event', () => {
    spyOn(component.openPreview, 'emit');
    component.openImagePage(cardItem);

    expect(component.openPreview.emit).toHaveBeenCalled();
  });

  it('should fire addToFavorites Event', () => {
    spyOn(component.addToFavorites, 'emit');
    component.selectToFavorites(cardItem);

    expect(component.addToFavorites.emit).toHaveBeenCalled();
  });

  it('should fire addToFavorites Event on ImageClick', () => {
    spyOn(component.addToFavorites, 'emit');
    const event = jasmine.createSpyObj('event', [ 'preventDefault' ]);

    component.onImageClick(event, cardItem);

    expect(component.addToFavorites.emit).toHaveBeenCalled();
  });

  it('should fire openPreview Event on ImageClick', () => {
    spyOn(component.openPreview, 'emit');
    component.openImageIcon = true;
    const event = jasmine.createSpyObj('event', [ 'preventDefault' ]);

    component.onImageClick(event, cardItem);

    expect(component.openPreview.emit).toHaveBeenCalled();
  });
});
