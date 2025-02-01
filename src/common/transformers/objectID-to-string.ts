import { Types } from "mongoose";

export const objectIDToString = (objectIDs: Types.ObjectId[] | undefined | null): string[] => {
    if (!Array.isArray(objectIDs)) return []; // Ensure it's an array before mapping
    return objectIDs.map((objectID) => objectID instanceof Types.ObjectId ? objectID.toString() : objectID);
  };
  