import { GraphQLID, GraphQLList } from "graphql";
import { Users } from "../Entities/users";
import { userType } from "../schema/typeDefs/User";

export const GET_ALL_USERS = {
  type: new GraphQLList(userType),
  async resolve() {
    return await Users.find();
  },
};

export const GET_USERS = {
  type: userType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_: any, args: any) {
    return await Users.findOne({ where: { id: args.id } });
  },
};

