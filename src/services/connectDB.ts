import mongoose from "mongoose";

import { ConnectDB } from "../types/db";

const connectDB: ConnectDB = (url) => {
  return mongoose.connect(url);
};

export default connectDB;
