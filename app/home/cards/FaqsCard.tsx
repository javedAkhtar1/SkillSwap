import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface IFaqsCardProps {
  question: string;
  answer: string;
}

function FaqsCard({ question, answer }: IFaqsCardProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border px-4 py-2 rounded-md shadow-sm">
        <AccordionTrigger
          className="font-poppins text-lg hover:no-underline flex justify-between items-center"
        >
          <span>{question}</span>
        </AccordionTrigger>
        <AccordionContent className="font-poppins text-md text-gray-700 mt-2">
          {answer}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default FaqsCard;
