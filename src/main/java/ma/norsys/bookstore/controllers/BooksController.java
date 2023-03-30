package ma.norsys.bookstore.controllers;

import jakarta.annotation.Nullable;
import ma.norsys.bookstore.exceptions.BookNotFoundException;
import ma.norsys.bookstore.exceptions.InvalidRequestException;
import ma.norsys.bookstore.models.Book;
import ma.norsys.bookstore.services.BooksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/books")
public class BooksController {
    @Autowired
    private BooksService booksService;

    @GetMapping
    public ResponseEntity<List<Book>> getAll(@Nullable String title, @Nullable String category, @Nullable String author) {
        List<Book> books;
        if ((title == null || title.isBlank()) && (category == null || category.isBlank()) && (author == null || author.isBlank())) {
            books = booksService.getAll();
        } else if ((title == null || title.isBlank()) && (category == null || category.isBlank())) {
            books = booksService.search(null, null, author.trim());
        } else if ((title == null || title.isBlank()) && (author == null || author.isBlank())) {
            books = booksService.search(null, category.trim(), null);
        } else if ((category == null || category.isBlank()) && (author == null || author.isBlank())) {
            books = booksService.search(title.trim(), null, null);
        } else if (title == null || title.isBlank()) {
            books = booksService.search(null, category.trim(), author.trim());
        } else if (category == null || category.isBlank()) {
            books = booksService.search(title.trim(), null, author.trim());
        } else if (author == null || author.isBlank()) {
            books = booksService.search(title.trim(), category.trim(), null);
        } else {
            books = booksService.search(title.trim(), category.trim(), author.trim());
        }
        return ResponseEntity.ok().body(books);
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody Book book) throws InvalidRequestException {
        Book savedBook = booksService.save(book);
        return ResponseEntity.ok().body(savedBook);
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<?> getById(@PathVariable Long bookId) throws BookNotFoundException {
        Book book = booksService.getById(bookId);
        return ResponseEntity.ok().body(book);
    }

    @PutMapping("/{bookId}")
    public ResponseEntity<?> update(@PathVariable Long bookId, @RequestBody Book book)
            throws BookNotFoundException, InvalidRequestException {
        Book existingBook = booksService.getById(book.getId());
        existingBook.setIsbn(book.getIsbn());
        existingBook.setTitle(book.getTitle());
        existingBook.setAuthor(book.getAuthor());
        existingBook.setCategories(book.getCategories());
        Book savedBook = booksService.update(existingBook);
        return ResponseEntity.ok().body(savedBook);
    }

    @DeleteMapping("/{bookId}")
    public ResponseEntity<?> delete(@PathVariable Long bookId) throws BookNotFoundException {
        String res = booksService.delete(bookId);
        return ResponseEntity.ok().body(res);
    }

}