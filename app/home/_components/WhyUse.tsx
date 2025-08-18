import {
  Users,
  Infinity,
  Handshake,
  DollarSign,
  Brain,
  LucideIcon,
} from "lucide-react";
import React from "react";
import WhyUseCard from "../cards/WhyUseCard";

type WhyUseItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const WHY_USE: WhyUseItem[] = [
  {
    title: "Learn for Free",
    description: "No payments, no subscriptions. Just mutual skill exchange.",
    icon: DollarSign,
  },
  {
    title: "Teach What You Know",
    description: "Share your knowledge and help others grow while you do too.",
    icon: Brain,
  },
  {
    title: "Meet Like-Minded People",
    description:
      "Find people with shared interests and build real connections.",
    icon: Users,
  },
  {
    title: "Mutual Growth",
    description: "Both users learn and grow together—everyone wins.",
    icon: Handshake,
  },
  {
    title: "Endless Possibilities",
    description:
      "From coding to cooking, explore any skill you’re curious about.",
    icon: Infinity,
  },
];

function WhyUse() {
  return (
    <section className="border-t">
      <div className="max-w-7xl py-15 mx-auto">
        <h3 className="text-3xl font-bold text-center font-poppins">
          Why use <span className="text-blue-900">Skill</span>Swap?
        </h3>

        {/* Desktop: 3 on top, 2 centered below */}
        <div className="hidden md:block mt-6 px-5">
          <div className="grid grid-cols-3 gap-6 place-items-center">
            {WHY_USE.slice(0, 3).map((item, index) => (
              <WhyUseCard
                key={index}
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-6 mt-6 max-w-2xl mx-auto place-items-center">
            {WHY_USE.slice(3).map((item, index) => (
              <WhyUseCard
                key={index}
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>
        </div>

        {/* Mobile/Tablet: responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 md:hidden max-w-4xl mx-auto place-items-center px-5">
          {WHY_USE.map((item, index) => (
            <WhyUseCard
              key={index}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyUse;
