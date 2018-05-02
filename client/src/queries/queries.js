import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const getBooksQuery = gql`
  {
    books {
      title
      id
    }
  }
`;

const getBookQuery = gql`
  query($id: ID){
    book(id:$id){
      id
      title
      genre
      author{
        id
        name
        age
        books{
          id
          title
        }
      }
    }
  }
`

const addBookMutation = gql`
  mutation($title: String!, $genre: String!, $authorId: ID!){
    addBook(title: $title, genre: $genre, authorId: $authorId){
      title
      id
    }
  }
`;

export {
  getAuthorsQuery,
  getBooksQuery,
  addBookMutation,
  getBookQuery
};
