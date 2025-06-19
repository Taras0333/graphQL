import CustomError from "./CustomError";
import { StatusCodes } from "http-status-codes";

class UnAuthorizedError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export default UnAuthorizedError;
