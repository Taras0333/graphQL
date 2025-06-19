import mongoose, { Model, Schema } from "mongoose";
import validator from "validator";
import { UserDocument, UserType } from "../types/models/users";

const UserSchema = new Schema<UserDocument>(
  {
    firstName: {
      type: String,
      required: [true, "Please provide First Name"],
      minlength: [3, "First Name should be longer than 3 characters"],
      maxlength: [50, "First Name is too long (max 50 characters)"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide Last Name"],
      minlength: [3, "Last Name should be longer than 3 characters"],
      maxlength: [50, "Last Name is too long (max 50 characters)"],
    },
    nickName: {
      type: String,
      required: [true, "Please provide Nick Name"],
      minlength: [3, "Nick Name should be longer than 3 characters"],
      maxlength: [50, "Nick Name is too long (max 50 characters)"],
    },
    company: {
      type: String,
      required: [true, "Please provide Company Name"],
      maxlength: [50, "Company name is too long (max 50 characters)"],
    },
    address: {
      type: String,
      maxlength: [100, "Address is too long (max 100 characters)"],
      default: null,
    },
    postCode: {
      type: String,
      maxlength: [10, "Post Code is too long (max 10 characters)"],
      validate: {
        validator: (value: string | null) =>
          value === null || validator.isPostalCode(value, "any"),
        message: "Please provide a valid Post Code",
      },
      default: null,
    },
    phone: {
      type: String,
      validate: {
        validator: (value: string | null) =>
          value === null ||
          validator.isMobilePhone(value, "any", { strictMode: true }),
        message: "Please provide a valid Phone Number",
      },
      default: null,
    },
    linkedIn: {
      type: String,
      validate: {
        validator: (value: string | null) =>
          value === null || validator.isURL(value),
        message: "Please provide a valid LinkedIn URL",
      },
      default: null,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide email"],
      validate: {
        validator: (str: UserType["email"]) => validator.isEmail(str),
        message: "Please provide a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: [6, "Password should be longer than 6 characters"],
    },
    profilePhoto: {
      type: String,
      required: false,
      validate: {
        validator: (value: string | null) =>
          value === null || validator.isURL(value),
        message: "Please provide a valid 'profilePhoto' URL",
      },
      default: null,
    },
    profileWallpaper: {
      type: String,
      required: false,
      validate: {
        validator: (value: string | null) =>
          value === null || validator.isURL(value),
        message: "Please provide a valid 'profilePhoto' URL",
      },
      default: null,
    },
    verificationToken: { type: String },
    isVerified: { type: Boolean, default: false },
    verified: { type: Date },
  },
  { timestamps: true }
);

UserSchema.methods.getFullName = function (): string {
  return `${this.firstName} ${this.lastName}`;
};

UserSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false, // Removes `__v`
  transform: function (_, ret) {
    delete ret._id; // Remove `_id`
  },
});

const UserModel: Model<UserDocument> = mongoose.model<UserDocument>(
  "User",
  UserSchema
);

export default UserModel;
