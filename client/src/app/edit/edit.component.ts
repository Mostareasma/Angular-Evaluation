import {CategoryService} from './../category-service.service';
import {BookService} from './../book-service.service';
import {Category} from './../models/Category';
import {Book} from './../models/Book';
import {ActivatedRoute, Router} from '@angular/router';
import {Component} from '@angular/core';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

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

  formErrors: { [key: string]: string; } = {};

  selectedCategory: Category = {
    id: null,
    name: ""
  }

  categories: Category[] = []

  error: string | null = null;

  constructor(private router: Router, private bookService: BookService, private categoryService: CategoryService, private route: ActivatedRoute) {

  }

  handleSubmit() {

    event?.preventDefault()

    console.log(this.book)
    this.book.categories = [this.selectedCategory]

    this.validate();

    const hasErrors = Object.keys(this.formErrors).length > 0;
    if (!hasErrors) {
      this.bookService.update(this.id, this.book).subscribe(
        data => {
          console.log('Book updated to DB:', data);
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
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.categoryService.getAll().subscribe(categories => (this.categories = categories));
    this.bookService.getById(this.id).subscribe((book) => {
      this.book = book;
      this.selectedCategory = this.book.categories[0];
    });
  }

}
