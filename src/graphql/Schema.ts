import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
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

const rootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    users: {
      type: GraphQLList(UserType),
      description: "List of users",
      resolve: async () => await UserModel.find({}),
    },
    user: {
      type: UserType,
      description: "Get a single user",
      args: {
        id: { type: GraphQLString },
      },
      resolve: async (_, args) => await UserModel.findById(args.id),
    },
    posts: {
      type: GraphQLList(PropertyManagersType),
      description: "List of posts",
      resolve: async () => await PropertyManagersModel.find({}),
    },
    post: {
      type: PropertyManagersType,
      description: "Get the single Post article",
      args: { id: { type: GraphQLString } },
      resolve: async (_, args) => await PropertyManagersModel.findById(args.id),
    },
  }),
});

const rootMutationaType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: {
    addUser: {
      type: UserType,
      description: "Add new user",
      args: UserTypeFields,
      resolve: async (_, args) => await UserModel.create({ ...args }),
    },
    updateUserById: {
      type: UserType,
      description: "Update user",
      args: {
        id: { type: GraphQLID }, // Comes from the virtual "id" field in the schema

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
        id: { type: GraphQLID },
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
        author: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args) =>
        await PropertyManagersModel.create({ ...args }),
    },
    updatePostById: {
      type: PropertyManagersType,
      description: "Update post",
      args: {
        id: { type: GraphQLID },

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

export const graphQLSchema = new GraphQLSchema({
  query: rootQueryType,
  mutation: rootMutationaType,
});
