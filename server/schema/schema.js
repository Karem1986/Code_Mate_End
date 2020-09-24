const graphql = require("graphql");
const { GraphQLDate } = require("graphql-scalars");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
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

const allUsersType = new GraphQLObjectType({
  name: "allUsers",
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
console.log("users", users[0].name);
console.log("users", users);

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      //grabs one user only
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        //code to get data from db
        return _.find(users, { id: args.id }); //to test with dummy data
      },
    },
    allUsers: {
      type: new GraphQLList(allUsersType),
      resolve(parent, args) {
        return _.find([users]);
      },
    },
    review: {
      //grabs reviews by id
      type: ReviewType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        //code to get data from db
      },
    },
    session: {
      //grabs reviews by id
      type: SessionType,
      args: { sessionId: { type: GraphQLInt } },
      resolve(parent, args) {
        //code to get data from db
      },
    },
  },
});

//Next: test the queries in graphql local host
module.exports = new GraphQLSchema({
  query: RootQuery,
});
