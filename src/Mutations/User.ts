import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLString,
} from "graphql";
import { Users } from "../Entities/users";
import { userType } from "../schema/typeDefs/User";
import bcrypt from "bcryptjs";
import { MessageType } from "../schema/typeDefs/message";

export const CREATE_USER = {
  type: userType,
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_: any, args: any) {
    const { name, username, password } = args;

    const encryptPassword = await bcrypt.hash(password, 10);

    const result = await Users.insert({
      name: name,
      username: username,
      password: encryptPassword,
    });
    return { ...args, id: result.identifiers[0].id, password: encryptPassword };
  },
};

export const DELETE_USERS = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_: any, { id }: any) {
    const resolve = await Users.delete(id);
    if (resolve.affected === 1) return true;
    return false;
    5;
  },
};

export const UPDATE_USER = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
    input: {
      type: new GraphQLInputObjectType({
        name: "UserInput",
        fields: {
          name: { type: GraphQLString },
          username: { type: GraphQLString },
          oldPassword: { type: GraphQLString },
          newPassword: { type: GraphQLString },
        },
      }),
    },
  },
  async resolve(_: any, { id, input }: any) {
    const userFound = await Users.findOne({ where: { id } });

    if (!userFound)
      return {
        success: false,
        message: "User not found",
      };

    const isMatch = await bcrypt.compare(
      input.oldPassword,
      userFound?.password ?? ""
    );

    if (!isMatch)
      return {
        success: false,
        message: "Incorrect old password",
      };

    const newPasswordHash = await bcrypt.hash(input.newPassword, 10);

    const respose = await Users.update(
      { id },
      {
        username: input.username,
        name: input.name,
        password: newPasswordHash,
      }
    );

    if (respose.affected === 0) return false;
    return {
      success: true,
      message: "Successfully updated",
    };
  },
};
