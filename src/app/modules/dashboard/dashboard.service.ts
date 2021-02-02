import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IProduct } from './models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url = 'api/products.json';
  public productUpdate$: Observable<any>;

  public subject = new BehaviorSubject<IProduct[]>([]);
  private data:IProduct[] = [];
  constructor(private http: HttpClient) {
    this.productUpdate$ = this.subject.asObservable();
    this.subject.next([]);
    this.getProducts();
  }

  getProducts(): Subscription {
    return this.http.get<IProduct[]>(this.url)
    .pipe(
      tap(data => {
        this.data = data;
        this.subject.next(data);
      })
    ).subscribe();
  }

  addProduct(desc: string, price: number) {
    const product: IProduct = {
      productId: 10,
      productName: '',
      productCode: '1',
      releaseDate: '1',
      price: price,
      description: desc,
      starRating: 1,
      imageUrl: 'sda'
    };
    this.data.push(product);
    this.subject.next(this.data)
  }

}
