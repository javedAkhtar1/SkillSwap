import React from "react";
import StepsCard from "../cards/StepsCard";

const STEPS = [
  { icon: "UserPlus", title: "Create a Profile", description: "Sign up and let people know what you can teach and want to learn.", content: "Sign up and set up your profile with skills you offer and want to learn." },
  { icon: "Search", title: "Browse Users", description: "Discover people with matching interests and skills.", content: "Use filters and search to find users who match your learning or teaching goals." },
  { icon: "Handshake", title: "Send Connection Requests", description: "Reach out to users you'd like to connect with.", content: "Send a request to start a skill swap. You both must accept to start chatting." },
  { icon: "MessageCircle", title: "Start Chatting", description: "Coordinate with your match to begin the exchange.", content: "Use the built-in chat to discuss what and how you want to learn or teach." },
  { icon: "Repeat", title: "Learn & Teach Together", description: "Swap skills, help each other grow, and keep the cycle going.", content: "Enjoy teaching what you know and learning something new—it's a win-win." },
];

const DesktopLayout = () => (
  <>
    <div className="grid grid-cols-3 gap-6 items-stretch mt-4">
      {STEPS.slice(0, 3).map((step, i) => (
        <StepsCard key={i} {...step} />
      ))}
    </div>
    <div className="grid grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto items-stretch">
      {STEPS.slice(3).map((step, i) => (
        <StepsCard key={i + 3} {...step} />
      ))}
    </div>
  </>
);

const MobileLayout = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch mt-4">
    {STEPS.map((step, i) => (
      <div
        key={i}
        className={`${i === 4 ? "sm:col-span-2 flex justify-center" : ""}`}
      >
        <StepsCard {...step} />
      </div>
    ))}
  </div>
);

function HowItWorks() {
  return (
    <section className="max-w-7xl py-15 mx-auto px-4">
      <h3 className="text-3xl font-bold text-center font-poppins">How It Works</h3>

      {/* Mobile/Tablet */}
      <div className="block lg:hidden">
        <MobileLayout />
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <DesktopLayout />
      </div>
    </section>
  );
}

export default HowItWorks;
