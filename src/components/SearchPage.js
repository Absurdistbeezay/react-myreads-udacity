import React from "react";
import { Link } from "react-router-dom";
import DebounceInput from "react-debounce-input";
import BookShelf from "./BookShelf";

const SearchPage = props => {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/" />
        <div className="search-books-input-wrapper">
          <DebounceInput
            debounceTimeout={300}
            element="input"
            value={props.books.string}
            onChange={props.searchQuery}
            type="/text"
            placeholder="Search by title or author name.."
          />
        </div>
      </div>
      <div className="search-books-results">
        <BookShelf
          updateShelf={props.updateShelf}
          shelfTitle="Search Results"
          books={props.books}
        />
      </div>
    </div>
  );
};

export default SearchPage;
