import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from './models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) {
  }

  getAll(title?: string, category?: string, author?: string): Observable<Book[]> {
    let params = new HttpParams();
    if (title) {
      params = params.append('title', title);
    }
    if (category) {
      params = params.append('category', category);
    }
    if (author) {
      params = params.append('author', author);
    }
    return this.http.get<Book[]>(`${this.baseUrl}`, {params: params});
  }

  getById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`);
  }

  add(book: Book): Observable<Book> {
    return this.http.post<Book>(this.baseUrl, book);
  }

  update(id: number, book: Book): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, book);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
