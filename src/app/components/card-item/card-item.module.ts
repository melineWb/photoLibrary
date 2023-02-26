import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CardItemComponent } from './card-item.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    CardItemComponent,
  ],
  imports: [
    SharedModule,
    MatCardModule,
  ],
  exports: [CardItemComponent]
})
export class CardItemModule { }
