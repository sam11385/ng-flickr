import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

@Injectable()
export class FlickrService {
  result$: Observable<string[]>;
  key = 'fe2b00007676770451fa8b4bb61bdef2';
  constructor(private http: Http) {}

  getResult(query: string) {
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this
      .key}&tags=${query}&per_page=48&format=json&nojsoncallback=1`;
    return this.http
      .get(url)
      .map(res => res.json())
      .map(val => {
        if (val.stat === 'ok') {
          return val.photos.photo.map((photo: any) => {
            return {
              url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
              title: photo.title,
            };
          });
        } else {
          return [];
        }
      });
  }
}
