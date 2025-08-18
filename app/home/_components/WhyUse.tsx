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

const DesktopLayout = () => (
  <>
    <div className="grid grid-cols-3 gap-6 items-stretch mt-4">
      {WHY_USE.slice(0, 3).map((step, i) => (
        <WhyUseCard key={i} {...step} />
      ))}
    </div>
    <div className="grid grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto items-stretch">
      {WHY_USE.slice(3).map((step, i) => (
        <WhyUseCard key={i + 3} {...step} />
      ))}
    </div>
  </>
);

const MobileLayout = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch mt-4">
    {WHY_USE.map((step, i) => (
      <div
        key={i}
        className={`${i === 4 ? "sm:col-span-2 flex justify-center" : ""}`}
      >
        <WhyUseCard {...step} />
      </div>
    ))}
  </div>
);


function WhyUse() {
  return (
    <section className="border-t">
      <div className="max-w-7xl py-15 mx-auto px-4">
        <h3 className="text-3xl font-bold text-center font-poppins">
          Why use <span className="text-blue-900">Skill</span>Swap?
        </h3>

        <div className="block lg:hidden">
          <MobileLayout />
        </div>

        {/* Desktop */}
        <div className="hidden lg:block">
          <DesktopLayout />
        </div>
      </div>
    </section>
  );
}

export default WhyUse;
