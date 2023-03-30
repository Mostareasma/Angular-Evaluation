import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from './models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {
  }

  getAll(keyword?: string): Observable<Category[]> {
    if (keyword && keyword.trim().length > 0) {
      return this.http.get<Category[]>(`${this.baseUrl}?keyword=${keyword}`);
    } else {
      return this.http.get<Category[]>(this.baseUrl);
    }
  }
}
