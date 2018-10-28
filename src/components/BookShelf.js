import React, { Component } from "react";

export class BookShelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book, i) => (
              <li className="book" key={i}>
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: book.imageLinks
                        ? `url(${book.imageLinks.thumbnail})`
                        : `url(https://dummyimage.com/128x193/0056f7/fff&text=FEND)`
                    }}
                  />
                  <div className="book-shelf-changer">
                    <select
                      value={book.shelf ? book.shelf : "none"}
                      onChange={e =>
                        this.props.updateShelf(book, e.target.value)
                      }
                    >
                      <option disabled>Move to...</option>
                      <option value="currentlyReading">
                        Currently Reading
                      </option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>

                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                  {book.authors && (
                    <div className="book-authors">{book.authors[0]}</div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
