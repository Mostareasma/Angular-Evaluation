import {CategoryService} from './../category-service.service';
import {BookService} from './../book-service.service';
import {Category} from './../models/Category';
import {Book} from './../models/Book';
import {Router} from '@angular/router';
import {Component} from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {


  formErrors: { [key: string]: string; } = {};

  // this.router.navigateByUrl('/books');
  selectedCategory: Category = {
    id: null,
    name: ''
  };
  book: Book = {
    id: null,
    isbn: '',
    title: '',
    author: '',
    description: '',
    categories: [this.selectedCategory]
  }
  categories: Category[] = []
  public error: string | null = null;

  constructor(private router: Router, private bookService: BookService, private categoryService: CategoryService) {
  }

  handleSubmit() {

    event?.preventDefault()

    console.log(this.book)

    this.validate();

    const hasErrors = Object.keys(this.formErrors).length > 0;
    if (!hasErrors) {
      this.bookService.add(this.book).subscribe(
        data => {
          console.log('Book added to DB:', data);
          this.router.navigateByUrl('/');
        },
        error => {
          console.log('Error:', error);
        }
      );
      console.log('Book saved successfully!', this.book);
    }
  }


  validate() {
    this.formErrors = {};
    if (!this.book.title) {
      this.formErrors['title'] = '*Title required!*';
    }

    if (!this.book.isbn) {
      this.formErrors['isbn'] = '*Isbn required!*';
    }

    if (!this.book.author) {
      this.formErrors['author'] = '*Author required!*';
    }

    if (this.book.description.length < 10) {
      this.formErrors['description'] = '*Description most have at least 10 characters!*';
    }
    if (this.selectedCategory.name == '') {
      this.formErrors['categories'] = '*Book should have at least one category!*';
    }

    console.log(this.formErrors)
  }


  ngOnInit(): void {
    this.categoryService.getAll().subscribe(categories => (this.categories = categories));
  }

  delete(id: number): void {
    this.categoryService.getAll().subscribe(categories => (this.categories = categories));
  }
}
