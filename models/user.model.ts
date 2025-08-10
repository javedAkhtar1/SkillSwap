import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true }, // optional for OAuth users
    email: { type: String, unique: true, required: true },
    password: { type: String },

    // Extra profile fields (collected later)
    profilePicture: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    age: { type: Number },
    bio: { type: String, default: "Skillswap user" },
    skillsToTeach: [{ type: String }],
    skillsToLearn: [{ type: String }],
    profileComplete: { type: Boolean, default: false },
    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
