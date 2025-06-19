import { Document, Types } from "mongoose";

import { PostCode } from "../../types";

export type UserType = {
  _id: Types.ObjectId;
  id: Types.ObjectId;
  firstName: string;
  lastName: string;
  nickName: string;
  company: string;
  address?: string | null;
  postCode?: PostCode;
  phone?: string | null;
  linkedIn?: string | null;
  email: string;
  password: string;
  verificationToken?: string;
  isVerified: boolean;
  verified?: Date;
  profilePhoto?: string | null;
  profileWallpaper?: string | null;
};

export type UserDocument = UserType &
  Document & {
    getFullName: () => string;
    validatePassword: (password: string) => Promise<boolean>;
  };
