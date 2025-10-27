import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema(
  {
    conversation: { type: Schema.Types.ObjectId, ref: "Conversation", required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String },
    readBy: [{ type: Schema.Types.ObjectId, ref: "User" }], // for read receipts
  },
  { timestamps: true }
);

const Message = models.Message || model("Message", MessageSchema);
export default Message;
