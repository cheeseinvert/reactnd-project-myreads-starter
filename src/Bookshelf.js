import React, { Component } from "react";
import PropTypes from "prop-types";
import sortBy from "sort-by";

class Bookshelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  };

  render() {
    const { books, shelf, onUpdateBook } = this.props;
    books.sort(sortBy("authors"));

    return (
      <div className="bookshelf">
        {books.length > 0 && <h2 className="bookshelf-title">{shelf}</h2>}

        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id} className="book-list-item">
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 194,
                        backgroundImage: `url(${book.imageLinks.thumbnail})`
                      }}
                    />
                    <div className="book-shelf-changer">
                      <select
                        value={book.shelf || "none"}
                        onChange={event =>
                          onUpdateBook(book, event.target.value)
                        }
                      >
                        <option value="disabled" disabled>
                          Move to...
                        </option>
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
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
