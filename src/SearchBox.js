import { debounce } from "debounce";
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

const SearchBox = React.memo((props) => {
    const { onSearch } = props;
    return (
        <div className="search-books-bar">
            <NavLink exact={true || false} className={'close-search'} to={'/'}>Close</NavLink>
            <div className="search-books-input-wrapper">
                <input
                    type="text"
                    placeholder="Search by title or author"
                    onChange={debounce((event)=>{ onSearch(event.target.value)}, 500)} />
            </div>
        </div>);
})

SearchBox.propTypes = {
    onSearch: PropTypes.func.isRequired
}

export default SearchBox;