import dbConnect from "@/lib/dbConnect";
import Conversation from "@/models/conversation.model";
import Message from "@/models/message.model";
import mongoose from "mongoose";

export async function sendMessage(conversationId: string, senderId: string, text: string) {
  await dbConnect();

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
  await dbConnect();

  const messages = await Message.find({ conversation: conversationId })
    .sort({ createdAt: 1 }) // oldest first
    .skip(skip)
    .limit(limit)
    .populate("sender", "name");

  return messages;
}
