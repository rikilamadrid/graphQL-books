import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

//component 
import BookDetails from './BookDetails';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  displayBooks() {
    var data = this.props.data;

    return data.loading
      ? <div style={{ fontSize: 22 }}>Loading books...</div>
      : data.books.map(book => {
          return (
            <li key={book.id}
                onClick={(e) => { this.setState({ selected: book.id }) }}>
                {book.title}
            </li>
          );
        }
      )

    // if(data.loading) {
    //   return(
    //     <div style={{ fontSize: 22 }}>
    //       Loading books ...
    //     </div>
    //   )
    // } else {
    //   return (
    //     data.books.map((book) => {
    //       return (
    //         <li key={book.id}>{book.title}</li>
    //       )
    //     })
    //   )
    // }
  }

  render(){
    return(
      <div>
        <ul id="book-list">
            <h2>Book titles:</h2>
            {this.displayBooks()}
        </ul>
        <BookDetails bookId={this.state.selected}/>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
