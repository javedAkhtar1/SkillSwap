import { ApiError } from "../lib/api-error";
import { errorResponse } from "../lib/api-response";
import dbConnect from "../lib/dbConnect";
import Conversation from "../models/conversation.model";
import User from "../models/user.model";
export async function createConversation(senderId: string, receiverId: string) {
  await dbConnect();

  const isValidSender = await User.findById(senderId);
  const isValidReceiver = await User.findById(receiverId);

  if (!isValidSender || !isValidReceiver) {
    throw new ApiError("Invalid sender or receiver ID", 404);
  }

  let convo = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });
  if (!convo) {
    convo = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }
  return convo;
}

// gets one conversation between two users
export async function getConversation(senderId: string, receiverId: string) {
  await dbConnect();

  const isValidSender = await User.findById(senderId);
  const isValidReceiver = await User.findById(receiverId);

  if (!isValidSender || !isValidReceiver) {
    throw new ApiError("Invalid sender or receiver ID", 404);
  }

  const convo = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!convo) {
    throw new ApiError("Conversation not found", 404);
  }
  return convo;
}
