import React, { Component } from 'react';
import Bookshelf from './Bookshelf';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import camelCase from 'camelcase';

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
  };
  render() {
    const { books, shelves, onUpdateBook } = this.props;
    books.sort(sortBy('authors'));
    return (
      <div className="list-books-content">
        <div>
          {shelves.map(s => (
            <Bookshelf
              key={camelCase(s)}
              onUpdateBook={onUpdateBook}
              books={books.filter(b => b.shelf === camelCase(s))}
              shelf={s}
            />
          ))}
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;
