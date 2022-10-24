import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:3000/api/v1/products/`);
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(`http://localhost:3000/api/v1/products/`, productData);
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`http://localhost:3000/api/v1/products/${productId}`);
  }

  updateProduct(productData: FormData, productid: string): Observable<Product> {
    return this.http.put<Product>(`http://localhost:3000/api/v1/products/${productid}`, productData);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/api/v1/products/${productId}`);
  }

  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`http://localhost:3000/api/v1/products//get/count`)
      .pipe(map((objectValue: any) => objectValue.productCount));
  }

  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:3000/api/v1/products/get/featured/${count}`);
  }
}
