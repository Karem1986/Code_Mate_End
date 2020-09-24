const graphql = require("graphql");
const { GraphQLDate } = require("graphql-scalars");
const_ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLSchema,
} = graphql;

//My types
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    password: { type: GraphQLString },
    githubUrl: { type: GraphQLString },
    programmingLanguages: { type: GraphQLString },
    whyIamHere: { type: GraphQLString },
    availability: { type: GraphQLBoolean },
    admin: { type: GraphQLBoolean },
  }),
});

const ReviewType = new GraphQLObjectType({
  name: "Review",
  fields: () => ({
    id: { type: GraphQLInt },
    comment: { type: GraphQLString },
  }),
});
const SessionType = new GraphQLObjectType({
  name: "Session",
  fields: () => ({
    sessionId: { type: GraphQLInt },
    date: { type: GraphQLDate },
  }),
});

//Root queries:
//1. Grab all users
//2. Grab one user
//3. Grab review by id
//4. Grab session by id

//Dummy data to test our queries:

let users = [
  { name: "larya", id: 1 },
  { name: "Wittma", id: 2 },
  { name: "Royan", id: 3 },
];

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      //grabs one user only
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        //code to get data from db
        return_find(users, { id: args.id });
      },
    },
    // allUsers: {
    //   type: UserType,
    //   args: { type: GraphQLString },
    //   resolve(parent, args) {
    //     return_find(users, { name: args.name });
    //   },
    // },
    // review: {
    //   //grabs reviews by id
    //   type: ReviewType,
    //   args: { id: { type: GraphQLInt } },
    //   resolve(parent, args) {
    //     //code to get data from db
    //   },
    // },
    // session: {
    //   //grabs reviews by id
    //   type: SessionType,
    //   args: { sessionId: { type: GraphQLInt } },
    //   resolve(parent, args) {
    //     //code to get data from db
    //   },
    // },
  },
});

//Next: test the queries in graphql local host
module.exports = new GraphQLSchema({
  query: RootQuery,
});
