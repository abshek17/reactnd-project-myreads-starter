import React from 'react';
import Book from './Book';
import * as BooksApi from './BooksAPI';
import { shelves, useFetchBooks } from './Constants';
import SearchBox from './SearchBox';

const NoneShelf = "none";

const AddBook = React.memo((props) => {

    const [searchResults, setSearchResults] = React.useState(undefined);
    const [addedBooks, setAddedBooks] = React.useState([]);
    const onSearch = (query) => {
        BooksApi.search(query || "")
            .then(result => {
                // handle the case where the search results nothing
                if (!result.error) {
                    setSearchResults(result || []);
                } else {
                    setSearchResults([]);
                }
            })
            .catch(error => setSearchResults([]));
    };

    React.useEffect(() => {
        useFetchBooks()
            .then(books => {
                setAddedBooks(books);
            });
    }, []);

    return (
        <div className="search-books">
            <SearchBox
                onSearch={onSearch}
            />
            <div className="search-books-results">
                <ol className="books-grid">
                    {

                        searchResults ?
                            searchResults.length > 0 && searchResults.map(result => {
                                // compute shelf of a book if it has already been added
                                const matchedBook = addedBooks.find(addedBook => addedBook.id === result.id);
                                if (matchedBook) {
                                    result.shelf = matchedBook.shelf || NoneShelf;
                                } else {
                                    result.shelf = NoneShelf;
                                }

                                return (
                                    <li key={result && result.id}>
                                        <Book book={result} shelves={shelves} onChange={() => { }} />
                                    </li>
                                )
                            }) || (
                                <div>
                                    <h3>No books were found matching your query. Please try a different search term.</h3>
                                </div>)
                            : (<div></div>)
                    }
                </ol>
            </div>
        </div>);
});

export default AddBook;