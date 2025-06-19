import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} from "graphql";

import { UserType, PropertyManagersType } from "./types";

import UserModel from "../models/User";
import PropertyManagersModel from "../models/Posts/PropertyManagers";

export const rootQueryType = new GraphQLObjectType({
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
        id: { type: new GraphQLNonNull(GraphQLID) },
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
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (_, args) => await PropertyManagersModel.findById(args.id),
    },
  }),
});
