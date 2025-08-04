import React from "react";
import FaqsCard from "../cards/FaqsCard";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQS: FAQItem[] = [
  {
    question: "Is SkillSwap completely free?",
    answer:
      "Yes, SkillSwap is 100% free. No hidden costs, no subscriptions. Just connect, learn, and teach.",
  },
  {
    question: "How do I connect with someone?",
    answer:
      "Browse users by skills, send a connection request, and once accepted, you can start chatting and exchanging skills.",
  },
  {
    question: "Can I both teach and learn?",
    answer:
      "Absolutely! You can offer skills you're confident in and learn skills you're interested in at the same time.",
  },
  {
    question: "Do I need to be an expert to teach?",
    answer:
      "Nope. As long as you have a decent understanding of a skill, you're welcome to teach others who are just starting out.",
  },
  {
    question: "Is there any limit to how many skills I can add?",
    answer:
      "No, you can add as many skills to your profile as you want — both for learning and offering.",
  },
];

function Faq() {
  return (
    <section className="border-t">
      <div className="max-w-7xl py-15 mx-auto">
        <h3 className="text-3xl font-bold text-center font-poppins">FAQs</h3>
        <div className="flex flex-col gap-2 mt-5">
        {FAQS.map((item, index) => (
            <FaqsCard key={index} question={item.question} answer={item.answer} />
        ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
