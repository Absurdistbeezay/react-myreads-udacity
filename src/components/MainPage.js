import React from "react";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";
const MainPage = props => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <BookShelf
          shelfTitle="Currently Reading"
          updateShelf={props.updateShelf}
          books={props.books.filter(book => book.shelf === "currentlyReading")}
        />
        <BookShelf
          shelfTitle="Want To Read"
          updateShelf={props.updateShelf}
          books={props.books.filter(book => book.shelf === "wantToRead")}
        />
        <BookShelf
          shelfTitle="Read"
          updateShelf={props.updateShelf}
          books={props.books.filter(book => book.shelf === "read")}
        />
      </div>
      <div className="open-search">
        <Link to="/search" />
      </div>
    </div>
  );
};

export default MainPage;
