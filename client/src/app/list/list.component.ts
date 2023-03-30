import {Book} from './../models/Book';
import {Router} from '@angular/router';
import {Component} from '@angular/core';
import {BookService} from '../book-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  books: Book[] = []
  title: string = ''
  category: string = ''
  author: string = ''

  constructor(private router: Router, private bookService: BookService) {
  }

  delete(book: Book) {
    if (book.id != null) {
      this.bookService.delete(book.id).subscribe(
        data => {
          console.log('Book deleted from DB:', data);
        },
        error => console.log('Error:', error)
      );
      window.location.reload()
    }

  }

  ngOnInit(): void {
    this.bookService.getAll().subscribe(books => (this.books = books));
  }

  search(): void {
    this.bookService.getAll(this.title, this.category, this.author).subscribe(books => (this.books = books));
  }

  ngOnChanges(): void {
    this.bookService.getAll().subscribe(books => (this.books = books));
  }
}
