import { GraphQLSchema } from "graphql";
import { rootMutationaType } from "./mutations";
import { rootQueryType } from "./queries";

export const graphQLSchema = new GraphQLSchema({
  query: rootQueryType,
  mutation: rootMutationaType,
});
