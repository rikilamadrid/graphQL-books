import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

class BookDetails extends Component {
  displayDetails(){
    const { book } = this.props.data;
    if(book){
      return(
        <div>
          <h2>{book.title}</h2>
          <p>Genre: {book.genre}</p>
          <p>Author: {book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="author-books">
            {book.author.books.map(book => {
              return <li key={book.id}>{book.title}</li>
            })}
          </ul>
        </div>
      )
    } else {
      return (
        <div>
          <h2>Select a book...</h2>
        </div>
      )
    }
  }

  render(){
    return(
      <div id="book-details">
        {this.displayDetails()}
      </div>
    );
  }
}


export default graphql(getBookQuery,{
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails);
