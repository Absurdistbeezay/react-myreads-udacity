import React from "react";
import BookShelf from "./BookShelf";
const MainPage = props => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <BookShelf shelfTitle="Currently Reading" />
        <BookShelf shelfTitle="Want To Read" />
        <BookShelf shelfTitle="Read" />
      </div>
    </div>
  );
};

export default MainPage;
