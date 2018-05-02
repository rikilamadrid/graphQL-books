const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./schema/schema');

const app = express();
const user = "lamadrid";
const password = "boricua23";
const connecting = `mongodb://${user}:${password}@ds059207.mlab.com:59207/gql-lamadrid`;

mongoose.connect(connecting);
mongoose.connection.once('open', () => {
  console.log('conected to the database');
});

app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));
app.listen(4000, () => {
  console.log('now listening on 4000');
});
