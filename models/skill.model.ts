import mongoose, { Schema, model, models } from "mongoose";

const SkillSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      default: "General",
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Skill = models.skill || model("Skill", SkillSchema);

export default Skill;
