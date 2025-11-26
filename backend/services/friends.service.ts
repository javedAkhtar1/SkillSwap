// services/friends.service.ts
import User from "../models/user.model";
import FriendRequest from "../models/friend-request.model";
import {ApiError} from "../lib/api-error";
import { Types } from "mongoose";

export default class FriendsService {
  static async sendRequest(from: string, to: string) {
    if (from === to) throw new ApiError("You cannot send a request to yourself.", 400);

    // Check already friends
    const user = await User.findById(from);
    if (user?.friends.includes(new Types.ObjectId(to))) {
      throw new ApiError("Already friends.", 400);
    }

    // Check existing pending request
    const existing = await FriendRequest.findOne({
      from,
      to,
      status: "pending",
    });

    if (existing) throw new ApiError("Friend request already sent.", 400);

    // Create new request
    return await FriendRequest.create({ from, to });
  }

  static async acceptRequest(requestId: string) {
    const request = await FriendRequest.findById(requestId);
    if (!request || request.status !== "pending") {
      throw new ApiError("Invalid request.", 400);
    }

    request.status = "accepted";
    await request.save();

    // Add friendship to both users
    await User.findByIdAndUpdate(request.from, {
      $addToSet: { friends: request.to },
    });

    await User.findByIdAndUpdate(request.to, {
      $addToSet: { friends: request.from },
    });

    return request;
  }

  static async rejectRequest(requestId: string) {
    const request = await FriendRequest.findById(requestId);
    if (!request || request.status !== "pending") {
      throw new ApiError("Invalid request.", 400);
    }

    request.status = "rejected";
    await request.save();
    return request;
  }

  static async cancelRequest(from: string, to: string) {
    const deleted = await FriendRequest.findOneAndDelete({
      from,
      to,
      status: "pending",
    });

    if (!deleted) throw new ApiError("No pending request found.", 404);
    return deleted;
  }

  static async getPendingReceived(userId: string) {
    return await FriendRequest.find({
      to: userId,
      status: "pending",
    }).populate("from", "name username email profilePicture");
  }

  static async getPendingSent(userId: string) {
    return await FriendRequest.find({
      from: userId,
      status: "pending",
    }).populate("to", "name username email profilePicture");
  }

  static async unfriend(userId: string, friendId: string) {
    await User.findByIdAndUpdate(userId, {
      $pull: { friends: friendId },
    });

    await User.findByIdAndUpdate(friendId, {
      $pull: { friends: userId },
    });

    return { success: true };
  }
}
