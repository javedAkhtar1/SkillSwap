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
};

export type TCompleteProfileData = {
  age: number;
  bio: string;
  profilePicture: string| undefined;
  skillsToLearn: string[];
  skillsToTeach: string[];
}

export type TMessageData = {
  conversationId: string;
  senderId: string;
  text: string;
}

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

export const skills = [
  "Web Development",
  "Graphic Design",
  "Guitar",
  "Cooking",
  "English",
  "Chess",
  "Yoga",
  "Video Editing",
  "Photography",
  "App Development",
  "UI/UX Design",
  "Drawing",
  "Singing",
  "Dancing",
  "Hindi",
] as const;

export type TSkill = (typeof skills)[number];

export type TUpdateProfilePayload = {
  name?: string;
  username?: string;
  age?: number;
  bio?: string;
  profilePicture?: string;
  skillsToTeach?: TSkill[];
  skillsToLearn?: TSkill[];
};