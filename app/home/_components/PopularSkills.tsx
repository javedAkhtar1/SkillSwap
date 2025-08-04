import {
  Code,
  Music,
  Utensils,
  MessageSquare,
  Brain,
  Paintbrush2,
  ScissorsSquareDashedBottom,
  Flower,
  LucideIcon,
} from "lucide-react";
import SkillsCard from "../cards/SkillsCard";

interface ISkill {
  name: string;
  icon: LucideIcon;
}

const SKILLS: ISkill[] = [
  { name: "Web Development", icon: Code },
  { name: "Guitar", icon: Music },
  { name: "Cooking", icon: Utensils },
  { name: "English", icon: MessageSquare },
  { name: "Chess", icon: Brain },
  { name: "Graphic Designing", icon: Paintbrush2 },
  {
    name: "Video Editing",
    icon: ScissorsSquareDashedBottom,
  },
  { name: "Yoga", icon: Flower },
];

function PopularSkills() {
  return (
    <section className="border-t">
    <div className="max-w-7xl py-15 mx-auto">
      <h3 className="text-3xl font-bold text-center font-poppins">
        Popular Skills
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center mt-4">
        {SKILLS.map((skill, index) => (
          <SkillsCard key={index} icon={skill.icon} name={skill.name} />
        ))}
      </div>
    </div>
    </section>
  );
}

export default PopularSkills;
