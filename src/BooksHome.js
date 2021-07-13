import React, { useState } from 'react'
import PropTypes from 'prop-types'
import * as BooksApi from './BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book'

export const BooksHome = React.memo((props) => {

    const [books, setBooks] = useState([]);

    const fetchBooks = () => {
        BooksApi.getAll()
            .then(books => {
                setBooks(books);
                console.log(books);
            });
    };
    React.useEffect(() => {
        fetchBooks();
    }, []);

    const shelves = [
        {
            name: 'Currently reading',
            value: 'currentlyReading'
        },
        {
            name: 'Want to read',
            value: 'wantToRead'
        },
        {
            name: 'Read',
            value: 'read'
        },
        {
            name: 'None',
            value: 'none'
        }];

    let book = books[0];
    return (<div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
                {shelves.map(shelf => (<div className="bookshelf">
                    <h2 className="bookshelf-title">{shelf.name}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {books
                                .filter(book => book.shelf === shelf.value)
                                .map(book => (
                                    <li key={book.id}>
                                        <Book shelves={shelves} book={book} />
                                    </li>)
                                )}
                        </ol>
                    </div>
                </div>))
                }
            </div>
        </div>
        <div className="open-search">
            <Link to={'/addBook'}>
                <button >Add a book</button>
            </Link>

        </div>
    </div>);
});

BooksHome.PropTypes = {

}