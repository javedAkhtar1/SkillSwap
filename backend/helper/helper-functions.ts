import mongoose from "mongoose";
export function isValidIdFormat(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}