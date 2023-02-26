import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map, interval, switchMap, delayWhen, delay, of, BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BlobImage } from '../../../models/general.models';
import { Subject } from 'rxjs';
// import { concatMap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class ImageApiService {
  private imageUrl = `${environment.imageUrl}`;
  images$: Subject<BlobImage> = new Subject();
  showLoader$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(public httpClient: HttpClient) {}

  private getImageFromServ(): Observable<Blob> {
    return this.httpClient.get(this.imageUrl, { responseType: 'blob' });
  }

  getImagesByCount(countNum: number = 1) {
    const _this = this;

    for (let i = 1; i <= countNum; ++i) {
      const delayTime: number = this.getRandowDelay();

      setTimeout(function(){
        _this.getImage();
      }, i * delayTime);
    }
  }

  private getImage(): any {
    this.showLoader$.next(true);

    return this.getImageFromServ().subscribe(
      (data: Blob) => this.createImageFromBlob(data),
      this.handlePostsErrors
    );
  }

  private getRandowDelay(min: number = 200, max: number = 300): number {
    const minVal = Math.ceil(min);
    const maxVal = Math.floor(max);
    return Math.floor(Math.random() * (maxVal - minVal + 1) + minVal);
  }

  private handlePostsErrors(error: string) {
    // TODO: update with HttpErrorResponse
    console.log(error);
  }

  private createImageFromBlob(image: Blob): void {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.images$.next({
        id: this.getUniqueId(),
        data: reader.result
       });
       this.showLoader$.next(false);
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
   }

   private getUniqueId(parts: number = 3): string {
    const stringArr = [];
    for(let i = 0; i< parts; i++){
      // tslint:disable-next-line:no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }
}
