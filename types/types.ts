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
