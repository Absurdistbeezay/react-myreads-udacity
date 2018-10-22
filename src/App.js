import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

//imported components
import MainPage from "./components/MainPage";
import SearchPage from "./components/SearchPage";

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: []
  };

  componentDidMount() {
    this.updateBooks();
  }

  updateBooks = () => {
    BooksAPI.getAll().then(books => {
      this.setState({
        books
      });
    });
  };

  updateShelf = (book, shelf) => {
    if (shelf === "none") {
      this.setState(prevState => ({
        books: prevState.books.filter(bk => bk.id !== book.id)
      }));
    }
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        const booksIds = this.state.books.map(bk => bk.id);
        let myNewBooks = [];

        if (booksIds.includes(book.id)) {
          myNewBooks = this.state.books.map(
            bk => (bk.id === book.id ? { ...bk, shelf } : bk)
          );
        } else {
          book.shelf = shelf;
          myNewBooks = [...this.state.books, book];
        }
        this.setState({
          books: myNewBooks
        });
      });
    }
  };

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route
            exact
            path="/"
            render={() => (
              <MainPage
                updateShelf={this.updateShelf}
                books={this.state.books}
              />
            )}
          />
          <Route exact path="/search" render={() => <SearchPage />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp;
