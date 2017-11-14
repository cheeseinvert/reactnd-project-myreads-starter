import React, { Component } from 'react';
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }
  
  render() {
    const { books, onUpdateBook } = this.props
    books.sort(sortBy('authors'))

    return (
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books.map((book) => (
                    <li key={ book.id } className='book-list-item'>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" 
                                style={{ width: 128, height: 194,
                                        backgroundImage: `url(${book.imageLinks.thumbnail})`
                        }}></div>
                        <div className="book-shelf-changer">
                          <select value={book.shelf} onChange={(event) => onUpdateBook(book, event.target.value)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
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
    )
  }
}

export default ListBooks
