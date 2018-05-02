const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

//fake data:

// var books = [
//   { title: 'Plateforme', genre: 'Drama', id: '1', authorId: '1'},
//   { title: 'Lord of the Rings', genre: 'Adventure', id: '2', authorId: '2'},
//   { title: 'Don Quijote', genre: 'Fantasy', id: '3', authorId: '3'},
//   { title: 'Submission', genre: 'Drama', id: '4', authorId: '1'},
//   { title: 'The Hobbit', genre: 'Adventure', id: '5', authorId: '2'},
//   { title: 'The Simillarion', genre: 'Adventure', id: '6', authorId: '2'}
// ];
//
// var authors = [
//   { name: 'Michel Houellebecq', age: 66, id: '1' },
//   { name: "J.R.R. Tolken", age: 23, id: '2' },
//   { name: 'Miguel de Cervantes ', age: 100, id: '3' }
// ];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: (parent, args) => {
        //return _.find(authors, { id: parent.authorId });
        return Author.findById(parent.authorId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => {
        //return _.filter(books, {authorId: parent.id});
        return Book.find({ authorId: parent.id });
      }
    }
  })
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: (parent, args) => {
        let book = new Book({
          title: args.title,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
          // code to get data from db
          // return _.find(books, { id: args.id });
          return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) =>{
          // return _.find(authors, { id: args.id });
          return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => {
        // return books;
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: (parent, args) => {
        // return authors;
        return Author.find({});
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
