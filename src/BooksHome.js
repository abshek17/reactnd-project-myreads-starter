import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksApi from './BooksAPI'
import { shelves } from './Constants'

export const BooksHome = React.memo((props) => {

    const [books, setBooks] = useState([]);

    const fetchBooks = () => {
        BooksApi.getAll()
            .then(books => {
                setBooks(books);
            });
    };
    React.useEffect(() => {
        fetchBooks();
    }, []);

    const refresh = () => {
        fetchBooks();
    }



    return (<div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
                {shelves
                .filter(shelf => shelf.value !== 'none')
                .map(shelf => (
                    <div key={shelf.value} className="bookshelf">
                        <h2 className="bookshelf-title">{shelf.name}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books
                                    .filter(book => book.shelf === shelf.value)
                                    .map(book => (
                                        <li key={book.id}>
                                            <Book shelves={shelves} book={book} onChange={() => { refresh(); }} />
                                        </li>)
                                    )}
                            </ol>
                        </div>
                    </div>))
                }
            </div>
        </div>
        <div className="open-search">
            <Link to={'/search'}>
                <button >Add a book</button>
            </Link>

        </div>
    </div>);
});