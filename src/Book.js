import React from 'react';
import PropTypes from 'prop-types';
import * as BooksApi from './BooksAPI'


const Book = React.memo(props => {

    const { book, shelves, onChange } = props;

    const switchShelf = (book, shelf) => {
        return BooksApi
            .update(book, shelf);

    };

    const handleChange = (e) => {
        const selectedValue = e.target.value;
        switchShelf(book, selectedValue)
            .then(response => onChange());
    }

    return book && (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                <div className="book-shelf-changer">
                    <select id='shelfSelector' onChange={handleChange} value={book.shelf}>
                        <option value="move" key='moveTo' disabled>Move to...</option>
                        {shelves.map(shelf => <option key={shelf.value} value={shelf.value}>{shelf.name}</option>)}
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
        </div>) || <div />;
});

Book.propTypes = {
    book: PropTypes.any,
    shelves: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
}
export default Book;