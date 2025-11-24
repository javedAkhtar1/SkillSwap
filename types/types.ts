export type TApiQueryResponse<T> = {
  success: boolean;
  data: T;
};

export interface IUserSignup {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export type TUserProfile = {
  _id: string;
  name: string;
  username: string;
  email: string;
  profilePicture: string;
  bio: string;
  skillsToTeach: string[];
  skillsToLearn: string[];
  profileComplete: boolean;
  provider: "credentials" | "google";
  isActive: boolean;
  isEmailVerified: boolean;
  friends: TFriend[];
};

type TFriend = {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
};

export type TCompleteProfileData = {
  age: number;
  bio: string;
  profilePicture: string | undefined;
  skillsToLearn: string[];
  skillsToTeach: string[];
};

export type TMessageData = {
  conversationId: string;
  senderId: string;
  text: string;
};

export type TMessage = {
  _id: string;
  conversation: string;
  sender: {
    _id: string;
    name: string;
  };
  text: string;
  readBy: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TMessagesResponse = {
  messages: TMessage[];
};


export type TPopulatedUser = {
  _id: string;
  name: string;
  username: string;
  email: string;
  profilePicture: string;
};

export type TObjectId = string;

export type TFriendRequestItem = {
  _id: string;
  from: TObjectId | TPopulatedUser;
  to:   TObjectId | TPopulatedUser;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type TFriendRequestListData = {
  message: string;
  requests: TFriendRequestItem[] | [];
};
