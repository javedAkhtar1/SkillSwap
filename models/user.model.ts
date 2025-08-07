import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
      min: 16,
    },
    email: { type: String, unique: true },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    bio: {
      type: String,
      default: "Skillswap user",
    },
    skillsToTeach: [
      {
        skill: { type: Schema.Types.ObjectId, ref: "Skill" },
        proficiency: {
          type: String,
          enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
          default: "Intermediate",
        },
        experienceYears: { type: Number, default: 0 },
        notes: { type: String },
      },
    ],
    skillsToLearn: [
      {
        skill: { type: Schema.Types.ObjectId, ref: "Skill" },
        expectation: { type: String },
        preferredLearningStyle: {
          type: String,
          enum: ["Visual", "Audio", "Hands-on", "Any"],
          default: "Any",
        },
        priority: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

const User = models.user || model("User", UserSchema);

export default User;
