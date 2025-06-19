import mongoose, { Model, Schema } from "mongoose";
import validator from "validator";
import { PropertyManagerDocument } from "../../types/models/posts/propertyManagers";

export const validTypes = [
  "Management of special properties",
  "Commercial administration",
  "Rental management",
  "WEG administration",
] as const;

export const validObjectStates = [
  "New building",
  "Good condition",
  "In need of renovation",
  "Mixed",
] as const;

const PropertyManagersSchema = new Schema<PropertyManagerDocument>(
  {
    text: {
      type: String,
      required: [true, "Please provide Post Text"],
      minlength: [20, "Post Text should be longer than 20 characters"],
      maxlength: [3000, "Post Textis too long (max 3000 characters)"],
    },
    photos: {
      type: [String],
      required: false,
      validate: {
        validator: (values: string[]) =>
          values.every((url) => validator.isURL(url)),
        message: "Each photo must be a valid URL",
      },
      default: [],
    },
    type: {
      type: String,
      required: [true, "Please provide Type"],
      enum: {
        values: validTypes,
        message: `Type must be one of: ${validTypes.join(", ")}`,
      },
    },
    residentialUnits: {
      type: Number,
      required: false,
      default: null,
    },
    objectState: {
      type: String,
      required: false,
      enum: {
        values: validObjectStates,
        message: `Object State must be one of: ${validObjectStates.join(", ")}`,
      },
      default: null,
    },
    date: {
      type: Date,
      required: false,
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
    location: {
      type: String,
      required: false,
      default: null,
    },
    street: {
      type: String,
      required: false,
      default: null,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User", // References User model
      required: true,
    },
  },
  { timestamps: true }
);

PropertyManagersSchema.set("toJSON", {
  virtuals: true,
  versionKey: false, // Removes `__v`
  transform: function (_, ret) {
    delete ret._id; // Remove `_id`
  },
});

const PropertyManagersModel: Model<PropertyManagerDocument> =
  mongoose.model<PropertyManagerDocument>(
    "property_managers_posts",
    PropertyManagersSchema
  );

export default PropertyManagersModel;
