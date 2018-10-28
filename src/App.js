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
  emptyBooks = () =>
    this.setState({
      searchedBooks: []
    });

  searchQuery = e => {
    const query = e.target.value;
    if (query !== "") {
      BooksAPI.search(query).then(searchResults => {
        if (!searchResults || searchResults.error) {
          this.setState({
            searchedBooks: []
          });
          return;
        }
        const adjustedBooks = searchResults.map(searchResult => {
          this.state.books.forEach(book => {
            if (book.id === searchResult.id) searchResult.shelf = book.shelf;
          });
          return searchResult;
        });
        this.setState({ searchedBooks: adjustedBooks });
      });
    } else {
      this.setState({ searchedResult: [] });
    }
  };
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
        const searchedBooksIds = this.state.books.map(bk => bk.id);
        let myNewBooks = [];
        let newSearchedBooks = [];

        if (booksIds.includes(book.id) || searchedBooksIds.includes(book.id)) {
          myNewBooks = this.state.books.map(
            bk => (bk.id === book.id ? { ...bk, shelf } : bk)
          );
          newSearchedBooks = this.state.searchedBooks.map(
            bk => (bk.id === book.id ? { ...bk, shelf } : bk)
          );
        } else {
          book.shelf = shelf;
          myNewBooks = [...this.state.books, book];
          newSearchedBooks = [...this.state.searchedBooks, book];
        }
        this.setState({
          books: myNewBooks,
          searchedBooks: newSearchedBooks
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
          <Route
            exact
            path="/search"
            render={() => (
              <SearchPage
                searchQuery={this.searchQuery}
                updateShelf={this.updateShelf}
                books={this.state.searchedBooks}
                emptyBooks={this.emptyBooks}
              />
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp;
