import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './pages/home/home.module';
import { FavoritesModule } from './pages/favorites/favorites.module';
import { ImageApiService } from './core/services/images/images.service';
import { FavoritesResolver } from './core/favorites.resolver';
import { SingleItemComponent } from './pages/single-item/single-item.component';
import { ImagesStorageService } from './core/services/images/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SingleItemComponent,
  ],
  imports: [
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
  bootstrap: [AppComponent]
})
export class AppModule { }
