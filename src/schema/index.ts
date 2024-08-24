import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GRETTING } from "../Queries/Gretting";
import { CREATE_USER, DELETE_USERS, UPDATE_USER } from "../Mutations/User";
import { GET_ALL_USERS, GET_USERS } from "../Queries/User";

const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    greting: GRETTING,
    getAllUsers: GET_ALL_USERS,
    getUser: GET_USERS
  },
});

const Mutation = new GraphQLObjectType({
  name: "MutationType",
  fields: {
    createUser: CREATE_USER,
    deleteUser: DELETE_USERS,
    updateUser: UPDATE_USER
  },
});

export const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: Mutation,
});
