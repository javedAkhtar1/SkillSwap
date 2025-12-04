import Conversation from  "../models/conversation.model"
import Message from "../models/message.model"
import { TMessageData } from "../types/types";

export async function sendMessage(data: TMessageData) {
  const { conversationId, senderId, text } = data;

  const message = await Message.create({
    conversation: conversationId,
    sender: senderId,
    text,
  });

  // Update last message in conversation
  await Conversation.findByIdAndUpdate(conversationId, { lastMessage: message._id });

  return message;
}

export async function getMessages(conversationId: string, limit = 50, skip = 0) {
  const messages = await Message.find({ conversation: conversationId })
    .sort({ createdAt: 1 }) // oldest first
    .skip(skip)
    .limit(limit)
    .populate("sender", "name");

  return messages;
}
