import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './pages/home/home.module';
import { FavoritesModule } from './pages/favorites/favorites.module';
import { ImageApiService } from './core/services/images/images.service';
import { FavoritesResolver } from './core/favorites.resolver';
import { ImagesStorageService } from './core/services/images/storage.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule,
        MatToolbarModule,
        HomeModule,
        FavoritesModule,
        AppRoutingModule,
      ],
      providers: [
        ImageApiService,
        ImagesStorageService,
        FavoritesResolver,
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'app-photo-lib'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('app-photo-lib');
  });
});
