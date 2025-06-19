import dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
// @ts-ignore
import morgan from "morgan";
import { graphqlHTTP } from "express-graphql";

import spinUpServer from "./utils/serverSpinUp";

import errorHandler from "./middleware/errorHandler";
import notFound from "./middleware/notFound";
import { graphQLSchema } from "./graphql/Schema";

const server: Express = express();

server.set("trust proxy", 1);
//middleware
server.use(express.json());
server.use(morgan("tiny"));

// routes
server.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: graphQLSchema,
  })
);

// errors handle
server.use(notFound);
server.use(errorHandler);

spinUpServer(server);
