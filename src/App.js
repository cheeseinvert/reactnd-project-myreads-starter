import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: ['Currently Reading', 'Want to Read', 'Read'],
  };
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }
  updateBook(book, shelf) {
    BooksAPI.update(book, shelf).then(data => {
      if (this.state.books.indexOf(book) < 0) {
        this.setState(s => ({
          books: s.books.concat([book]),
        }));
      }
      this.setState(s => ({
        books: s.books.map(b => {
          if (book.id === b.id) {
            b.shelf = shelf;
          }
          return b;
        }),
      }));
    });
  }
  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <Route
            exact
            path="/"
            render={() => (
              <ListBooks
                shelves={this.state.shelves}
                books={this.state.books}
                onUpdateBook={this.updateBook.bind(this)}
              />
            )}
          />
        </div>
        <Route
          path="/search"
          render={() => (
            <SearchBooks onUpdateBook={this.updateBook.bind(this)} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
