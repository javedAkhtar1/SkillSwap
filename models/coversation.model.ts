import { Schema, model, models } from "mongoose";

const ConversationSchema = new Schema(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }], // exactly 2 for 1-on-1
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
  },
  { timestamps: true }
);

const Conversation = models.Conversation || model("Conversation", ConversationSchema);

export default Conversation;
