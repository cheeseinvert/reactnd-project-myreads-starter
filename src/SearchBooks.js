import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'
import { Link } from 'react-router-dom'

class SearchBooks extends Component {
    state = {
        books: []
    }
    static propTypes = {
      onUpdateBook: PropTypes.func.isRequired
    }
    doSearch(query) {
        let maxResults = 5
        console.log(`doing search "${query}"`)
        BooksAPI.search(query, maxResults).then(books => {
            console.log(`setting books: ${books}`)
            this.setState({ books })
        }).catch(this.setState({ books: [] }))
    }
  render() {
      const { onUpdateBook } = this.props
    return (
  <div className="search-books">
    <div className="search-books-bar">
      <Link className="close-search" to='/'>Close</Link>
      <div className="search-books-input-wrapper">
        {/*
          NOTES: The search from BooksAPI is limited to a particular set of search terms.
          You can find these search terms here:
          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
          you don't find a specific author or title. Every search is limited by search terms.
        */}
        <input type="text" onInput={(event) => this.doSearch(event.target.value)} placeholder="Search by title or author"/>

      </div>
    </div>
    <div className="search-books-results">
            <Bookshelf
                shelf="Search Results"
                books={this.state.books}
                onUpdateBook={onUpdateBook}
                />
      </div>
    </div>
    )
  }
}

export default SearchBooks
