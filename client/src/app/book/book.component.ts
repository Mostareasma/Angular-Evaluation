import {CategoryService} from './../category-service.service';
import {BookService} from './../book-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Book} from './../models/Book';
import {Component} from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  id: number = 0

  book: Book = {
    id: null,
    isbn: '',
    title: '',
    author: '',
    description: '',
    categories: [{
      id: null,
      name: ''
    }]
  };

  constructor(private router: Router, private bookService: BookService, private categoryService: CategoryService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.bookService.getById(this.id).subscribe((book) => {
      this.book = book
    });
  }


}
