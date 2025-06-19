import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
} from "graphql";

import {
  UserType,
  PropertyManagersType,
  UserTypeFields,
  PropertyManagersTypeFields,
} from "./types";

import UserModel from "../models/User";
import PropertyManagersModel from "../models/Posts/PropertyManagers";

export const rootMutationaType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: {
    addUser: {
      type: UserType,
      description: "Add new user",
      args: { ...UserTypeFields, id: { type: GraphQLID } },
      resolve: async (_, args) => await UserModel.create({ ...args }),
    },
    updateUserById: {
      type: UserType,
      description: "Update user",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }, // Comes from the virtual "id" field in the schema

        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        nickName: { type: GraphQLString },
        company: { type: GraphQLString },

        address: { type: GraphQLString },
        postCode: { type: GraphQLString },
        phone: { type: GraphQLString },
        linkedIn: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },

        profilePhoto: { type: GraphQLString },
        profileWallpaper: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        const { id, ...updateData } = args;
        return await UserModel.findByIdAndUpdate(id, updateData, {
          new: true,
          runValidators: true,
        });
      },
    },
    deleteUserById: {
      type: UserType,
      description: "Delete user",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, args) => {
        return await UserModel.findByIdAndDelete(args.id, { new: true });
      },
    },
    addPost: {
      type: PropertyManagersType,
      description: "Add new post",
      args: {
        ...PropertyManagersTypeFields,
        id: { type: GraphQLID },
        author: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args) =>
        await PropertyManagersModel.create({ ...args }),
    },
    updatePostById: {
      type: PropertyManagersType,
      description: "Update post",
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },

        text: { type: GraphQLString },

        photos: { type: GraphQLString },

        type: { type: GraphQLString },

        residentialUnits: { type: GraphQLInt },

        objectState: { type: GraphQLString },

        date: { type: GraphQLString },

        postCode: { type: GraphQLString },

        location: { type: GraphQLString },

        street: { type: GraphQLString },

        author: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        const { id, ...updateData } = args;
        return await PropertyManagersModel.findByIdAndUpdate(id, updateData, {
          new: true,
          runValidators: true,
        });
      },
    },
  },
});
