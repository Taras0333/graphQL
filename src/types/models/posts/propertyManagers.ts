import { Document, Types } from "mongoose";

import {
  validObjectStates,
  validTypes,
} from "../../../models/Posts/PropertyManagers";
import { PostCode } from "../../../types";

type Type = (typeof validTypes)[number];

type ObjectStateType = (typeof validObjectStates)[number];

export type PropertyManagerType = {
  _id: Types.ObjectId;
  id: Types.ObjectId;
  text: string;
  photos: string[];
  type: Type;
  residentialUnits?: number | null;
  objectState?: ObjectStateType;
  date?: string | null;
  postCode?: PostCode;
  location?: string | null;
  street?: string | null;
  author: Types.ObjectId;
};

export type PropertyManagerDocument = PropertyManagerType & Document;
