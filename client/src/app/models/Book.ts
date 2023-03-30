import {Category} from './Category';

export class Book {
  id: number | null
  isbn: String
  title: string
  author: string
  description: string
  categories: Category[]

  constructor(id: number | null, isbn: String, title: string, author: string, description: string, categories: Category[]) {
    this.id = id;
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.description = description;
    this.categories = categories;
  }
}
