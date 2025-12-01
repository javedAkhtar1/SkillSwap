export const usersSeed = [
{
  name: "Aarav Sharma",
  username: "aarav01",
  email: "aarav01@example.com",
  profilePicture: "https://randomuser.me/api/portraits/men/10.jpg",
  bio: "Web dev enthusiast & tech lover.",
  skillsToTeach: ["Web Development"],
  skillsToLearn: ["Guitar"],
  profileComplete: true,
  provider: "credentials",
  isEmailVerified: true,
  isActive: true,
  age: 22,
  friends: [],
},
{
  name: "Priya Singh",
  username: "priya_sg",
  email: "priyasingh@example.com",
  profilePicture: "https://randomuser.me/api/portraits/women/11.jpg",
  bio: "UI/UX designer who loves minimalism.",
  skillsToTeach: ["UI/UX Design"],
  skillsToLearn: ["Photography"],
  profileComplete: true,
  provider: "credentials",
  isEmailVerified: true,
  isActive: true,
  age: 25,
  friends: [],
},
{
  name: "Kabir Mehta",
  username: "kabirmehta",
  email: "kabir@example.com",
  profilePicture: "https://randomuser.me/api/portraits/men/12.jpg",
  bio: "Full-stack dev & gym freak.",
  skillsToTeach: ["App Development", "Web Development"],
  skillsToLearn: ["Cooking"],
  profileComplete: true,
  provider: "credentials",
  isEmailVerified: true,
  isActive: true,
  age: 27,
  friends: [],
},

...Array.from({ length: 57 }).map((_, i) => {
  const skillPool = [
    "Web Development", "Graphic Design", "Guitar", "Cooking", "English",
    "Chess", "Yoga", "Video Editing", "Photography", "App Development",
    "UI/UX Design", "Drawing", "Singing", "Dancing", "Hindi",
  ];

  const randomSkill = () => skillPool[Math.floor(Math.random() * skillPool.length)];
  const randomAge = Math.floor(Math.random() * (45 - 14)) + 14;

  return {
    name: `User ${i + 4}`,
    username: `user${i + 4}`,
    email: `user${i + 4}@example.com`,
    profilePicture: `https://randomuser.me/api/portraits/men/${20 + i}.jpg`,
    bio: "SkillSwap community member.",
    skillsToTeach: [randomSkill(), randomSkill()],
    skillsToLearn: [randomSkill()],
    profileComplete: true,
    provider: "credentials",
    isEmailVerified: true,
    isActive: true,
    age: randomAge,
    friends: [],
  };
}),
];

export default usersSeed;
