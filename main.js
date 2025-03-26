class User {
    #name;
    #books;

    constructor(name) {
        this.#name = name;
        this.#books = [];
    }

    addBook(book) {
        const myBook = {
            'book': book,
            'availability': true // наявність книжки
        }
        this.#books.push(myBook);
        console.log(`Читач ${this.#name} взяв книгу з бібліотки.`);
    }

    returnBook(id) {
        const findIndex = this.#books.findIndex(book => (book.book.getId() == id & book.availability == true));
        console.log('index: ', findIndex);
        
        if (findIndex < 0) {
            console.log(`Книги з id '${id}' не існує`);
        } else {
            const findBook = this.#books[findIndex];
            (findBook.availability) ? findBook.availability = false : console.log(`Книга з id ${id} вже була повернута.`);;
            console.log(`Книга з id ${id} повернута до бібліотеки.`);
        }
    }

    // книги в наявності у читача
    booksIsAvailabilitys() {
        const listBooks = this.#books.filter(book => book.availability == true);
        listBooks.forEach(book => console.log(book.book.getInfo() + ` наявність ${book.availability}`));
    }

    // всі книги, які коритувач брав в бібліотеці
    getListBooks() {
        console.log(`Книжки користувача ${this.#name}:\n`) + this.#books.forEach(book => console.log(book.book.getInfo() + ` наявність ${book.availability}`));
    }
}


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
        return `ID: ${this.#id}, Назва: ${this.#title}, Автор: ${this.#author}, Рік: ${this.#year}, Жанр: ${this.#genre}, Доступна: ${this.#isAvailable}`
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

    setIsAvailable() {
        this.#isAvailable = !this.#isAvailable;
        // console.log('isAvailable: ', this.#isAvailable);
        console.log(`Книга (id: ${this.#id}, title: ${this.#title}) ` + (!this.#isAvailable ? 'видана читачу.' : 'повернута до бібліотеки.'));
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
        console.log(`Ви завантажили електронну книгу ${super.getTitle()} у форматі ${this.#format} (розмір файлу: ${this.#fileSize} MB)`); 
        return this;
    }

    getInfo(){
        return super.getInfo() + `, розмір файлу: ${this.#fileSize} MB, формат: ${this.#format}`;
    }
}

class Library {
    #arrayBooks = [];

    // додавання книг
    addBook(book) {
        if (this.bookIsExists(book.getId())) {
            console.log(`Книга з id ${book.getId()} вже існує.`);
        } else {
            this.#arrayBooks.push(book);
            console.log(`Книга з id ${book.getId()} додана до списку (всього ${this.#arrayBooks.length} книг)`);
        }
    }

    // видалення книг
    removeBook(id){
        let indexSearchBook = this.#arrayBooks.findIndex(book => book.getId() == id);
        // console.log('Видалення: ', indexSearchBook);
        if (indexSearchBook < 0) {
            console.log(`Книги з id '${id}' не існує`);
        } else {
            let removedBook = this.#arrayBooks.splice(indexSearchBook, 1);
            console.log(`Книга ${removedBook[0].getId()} була видалена`);
        }
        }

    // пошук книг (повертає масив книг, які задовольняють певний критерій пошуку (наприклад, title, author, genre, year))
    searchBooks(criteria) {
        const key = Object.keys(criteria)[0];
        const listBooks = this.#arrayBooks.filter(book => this.getMethod(key, book) == criteria[key]);
        
        return listBooks;
    }

    // повертає приватне значення відповідно вказаного ключа (key)
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
    // перевірка, чи існує книга з даним id
    bookIsExists(id) {
        return this.#arrayBooks.find(book => book.getId() == id);
    }
    
    // видача книги
    issueBook(id, user) {
        const bookIndex = this.#arrayBooks.findIndex(book => book.getId() == id);
        // console.log('index: ', bookIndex);
        if (bookIndex < 0) {
            console.log('Книга не знайдена');
        } else {
            const findedBook = this.#arrayBooks[bookIndex];
            findedBook.getIsAvailable() ? (findedBook.setIsAvailable(), user.addBook(findedBook)) : console.log('Книга вже видана.');
        }
    }

    // поверенення книги
    returnBook(id, user) {
        const bookIndex = this.#arrayBooks.findIndex(book => book.getId() == id);
        // console.log('index: ', bookIndex);
        if (bookIndex < 0) {
            console.log('Книга не знайдена');
        } else {
            const findedBook = this.#arrayBooks[bookIndex];
            !findedBook.getIsAvailable() ? (findedBook.setIsAvailable(), user.returnBook(findedBook.getId())) : console.log('Книга вже повернута.');
        }
    }

    listAllBooks(listBooks = this.#arrayBooks){
        let txtListBooks = "";
        listBooks.forEach((book) => txtListBooks += book.getInfo() + '\n');
        return txtListBooks;
    }
}

const myLibrary = new Library();
for (let i = 0; i < 10; i++) {
    const newBook = new Book('book-' + (i + 1), 'title-' + (i + 1), 'author-' + (i + 1), 2000 + (i + 1), 'genre-' + (i + 1), true);
    myLibrary.addBook(newBook);
}

console.log(myLibrary.listAllBooks());
console.log('Видалення книги за id \'book-3\'');
myLibrary.removeBook('book-3');
console.log(myLibrary.listAllBooks());
console.log('Видалення книги з неіснуючим id \'book-3\'');
myLibrary.removeBook('book-3');
console.log(myLibrary.listAllBooks());

const newBook = new Book('book-50', 'title-6', 'author-2', 2006, 'genre-2', false);
myLibrary.addBook(newBook);
console.log('Додавання книги з вже існуючим id \'book-6\'');
myLibrary.addBook(newBook);

console.log('Додавання e-книги  id \'book-7\'');
const newEBook = new EBook('e-book-7', 'title-7', 'author-2', 2006, 'genre-7', true).download(12,'pdf');
myLibrary.addBook(newEBook);


console.log('Пошук книги за \'title\': \'title-2\':\n', myLibrary.listAllBooks(myLibrary.searchBooks({'title': 'title-2'})));
console.log('Пошук книги за \'author\': \'author-2\':\n', myLibrary.listAllBooks(myLibrary.searchBooks({'author': 'author-2'})));
console.log(myLibrary.listAllBooks());

console.log('Створення користувача:');
const newUser = new User('Alex');

console.log('Видача книг:');
console.log('Видати книгу з id \'book-6\': ');
const id_Book = 'book-6';
myLibrary.issueBook(id_Book, newUser);
// newUser.addBook(newBook);
console.log('Видати не існуючу книгу з id \'book-3\': ');
myLibrary.issueBook('book-3', newUser);
console.log('Видати книгу, яка вже видана з id \'book-50\': ');
myLibrary.issueBook('book-50', newUser);
console.log(myLibrary.listAllBooks());

console.log('Повернення книг.');
console.log('Повернути книгу з id \'book-6\': ');
myLibrary.returnBook('book-6', newUser);
console.log(myLibrary.listAllBooks());
console.log('Повернути не існуючу книгу з id \'book-3\': ');
myLibrary.returnBook('book-3', newUser);
console.log('Повернути існуючу книгу з id \'book-1\': ');
myLibrary.returnBook('book-1', newUser);

console.log(myLibrary.listAllBooks());

console.log('Список доступних книг:');
const availableBook = myLibrary.searchBooks({'isAvailable': true});
console.log(myLibrary.listAllBooks(availableBook));

console.log('Видача декількох книг:');
for (let i=2; i < availableBook.length - 2; i++) {
    const idBook = availableBook[i].getId();
    myLibrary.issueBook(idBook, newUser);
}
console.log(myLibrary.listAllBooks());

console.log('Список виданих книг:');
console.log(myLibrary.listAllBooks(myLibrary.searchBooks({'isAvailable': false})));

console.log('Список книг в наявності у читача:');
newUser.booksIsAvailabilitys();

console.log('Повернути книгу з id \'book-6\': ');
myLibrary.returnBook('book-6', newUser);
console.log('Повернути книгу з id \'book-7\': ');
myLibrary.returnBook('book-7', newUser);
console.log('Повернути книгу з id \'book-4\': ');
myLibrary.returnBook('book-4', newUser);
console.log('Список книг, які брав читач:');
newUser.getListBooks();

console.log('Список книг в наявності у читача:');
newUser.booksIsAvailabilitys();