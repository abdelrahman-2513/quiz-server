import { Types } from "mongoose";

export const objectIDToString = (objectIDs: Types.ObjectId[]) => objectIDs.map((objectID) => objectID.toString());