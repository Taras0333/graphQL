import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt,
} from "graphql";
import UserModel from "../models/User";

export const UserTypeFields = {
  id: { type: GraphQLID }, // Comes from the virtual "id" field in the schema

  firstName: { type: new GraphQLNonNull(GraphQLString) },
  lastName: { type: new GraphQLNonNull(GraphQLString) },
  nickName: { type: new GraphQLNonNull(GraphQLString) },
  company: { type: new GraphQLNonNull(GraphQLString) },

  address: { type: GraphQLString },
  postCode: { type: GraphQLString },
  phone: { type: GraphQLString },
  linkedIn: { type: GraphQLString },
  email: { type: new GraphQLNonNull(GraphQLString) },
  password: { type: new GraphQLNonNull(GraphQLString) },

  profilePhoto: { type: GraphQLString },
  profileWallpaper: { type: GraphQLString },

  isVerified: { type: GraphQLBoolean },
  verified: { type: GraphQLString }, // Could be a GraphQLDate if you're using a custom scalar

  createdAt: { type: GraphQLString },
  updatedAt: { type: GraphQLString },
};

export const UserType = new GraphQLObjectType({
  name: "User",
  description: "This represents a list of users",
  fields: () => UserTypeFields,
});

export const PropertyManagersTypeFields = {
  id: { type: GraphQLID },

  text: { type: new GraphQLNonNull(GraphQLString) },

  photos: { type: new GraphQLList(GraphQLString) },

  type: { type: new GraphQLNonNull(GraphQLString) },

  residentialUnits: { type: GraphQLInt },

  objectState: { type: GraphQLString },

  date: { type: GraphQLString },

  postCode: { type: GraphQLString },

  location: { type: GraphQLString },

  street: { type: GraphQLString },

  author: {
    type: UserType,
    resolve: async (parent: any) => {
      return await UserModel.findById(parent.author);
    },
  },

  createdAt: { type: GraphQLString },

  updatedAt: { type: GraphQLString },
};

export const PropertyManagersType = new GraphQLObjectType({
  name: "PropertyManager",
  description: "A post created by a property manager",
  fields: () => PropertyManagersTypeFields,
});
