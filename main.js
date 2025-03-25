// class Book
class Book {
    #id;
    #title;
    #author;
    #year;
    #genre;
    #isAvailable;

    constructor(id, title, author, year, genre, isAvailable) {
        this.#id = id;
        this.#title = title;
        this.#author = author;
        this.#year = year;
        this.#genre = genre;
        this.#isAvailable = isAvailable;
    }

    getInfo() {
        return `"ID: ${this.#id}, Назва: ${this.#title}, Автор: ${this.#author}, Рік: ${this.#year}, Жанр: ${this.#genre}, Доступна: ${this.#isAvailable}"`
    }

    getId() {
        return this.#id;
    }
    
    getTitle() {
        return this.#title;
    }

    getAuthor() {
        return this.#author;
    }
    
    getYear() {
        return this.#year;
    }
    
    getGenre() {
        return this.#genre;
    }

    getIsAvailable() {
        return this.#isAvailable;
    }

}

class EBook extends Book{
    #fileSize; // розмір файлу, наприклад, у MB
    #format; // формат (PDF, EPUB тощо)

    constructor(id, title, author, year, genre, isAvailable) {
        super(id, title, author, year, genre, isAvailable);
    }
    
    download(fileSize, format){
        this.#fileSize = fileSize;
        this.#format = format;
        return `Ви завантажили електронну книгу ${super.getTitle()} у форматі ${this.#format} (розмір файлу: ${this.#fileSize} MB)`
    }

    getInfo(){
        return this.getInfo() + `розмір файлу: ${this.#fileSize} MB, формат: ${this.#format}`;
    }
}

class Library {
    #arrayBooks = [];

    // додавання книг
    addBook(book) {
        this.#arrayBooks.push(book);
        return `Книга ${book} додана до списку (всього ${this.#arrayBooks.length} книг)`;
    }

    // видалення книг
    removeBook(id){
        let indexSearchBook = this.#arrayBooks.findIndex(book => book.getId() == id);
        let removedBook = this.#arrayBooks.splice(indexSearchBook, 1);
        return `Книга ${removedBook[0].getInfo()} була видалена`;
    }

    // пошук книг (повертає масив книг, які задовольняють певний критерій пошуку (наприклад, title, author, genre, year))
    searchBooks(criteria) {
        const key = Object.keys(criteria)[0];
        let myBook = this.getMethod(key, this.#arrayBooks[1]);
        // console.log(myBook == criteria[key]);
        const listBooks = this.#arrayBooks.filter(book => this.getMethod(key, book) == criteria[key]);
        
        return listBooks;
    }

    getMethod(key, book) {
        switch(key) {
            case 'id': {
                return book.getId();
            };
            case 'title': {
                // console.log(book.getTitle());
                return book.getTitle();
            };
            case 'author': {
                // console.log(book.getTitle());
                return book.getAuthor();
            };
            case 'genre': {
                // console.log(book.getTitle());
                return book.getGenre();
            };
            case 'year': {
                // console.log(book.getTitle());
                return book.getYear();
            };
            case 'isAvailable': {
                // console.log(book.getTitle());
                return book.getIsAvailable();
            };
        }
    }
    
    // видача книги

    // поверенення книги

    listAllBooks(listBooks = this.#arrayBooks){
        let txtListBooks = "";
        listBooks.forEach((book) => txtListBooks += book.getInfo() + '\n');
        return txtListBooks;
    }
}

const myLibrary = new Library();
for (let i = 0; i < 5; i++) {
    const newBook = new Book('book-' + (i + 1), 'title-' + (i + 1), 'author-' + (i + 1), 2000 + (i + 1), 'genre-' + (i + 1), true);
    myLibrary.addBook(newBook);
}

console.log(myLibrary.listAllBooks());
// console.log(myLibrary.removeBook('book-3'));
// console.log(myLibrary.getInfo());

const newBook = new Book('book-6', 'title-6', 'author-2', 2006, 'genre-2', false);
myLibrary.addBook(newBook);

console.log(myLibrary.listAllBooks(myLibrary.searchBooks({'title': 'title-2'})));
console.log(myLibrary.listAllBooks(myLibrary.searchBooks({'author': 'author-2'})));
console.log(myLibrary.listAllBooks());
