import { Express } from "express";

import connectDB from "../services/connectDB";

const spinUpServer = async (server: Express) => {
  const port = process.env.PORT || 5001;
  try {
    await connectDB(process.env.MONGO_URI as string);
    console.log("db is connected");
    server.listen(port, () => {
      console.log(`The server is listening to port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

export default spinUpServer;
