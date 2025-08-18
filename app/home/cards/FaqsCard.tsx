"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";

interface IFaqsCardProps {
  question: string;
  answer: string;
}

function FaqsCard({ question, answer }: IFaqsCardProps) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Accordion
      className="px-5"
      type="single"
      collapsible
      value={open!}
      onValueChange={setOpen}
    >
      <AccordionItem value="item-1" className="border px-4 py-2 rounded-md shadow-sm">
        <AccordionTrigger className="font-poppins text-lg hover:no-underline flex justify-between items-center w-full">
          <span>{question}</span>
          <motion.span
            initial={false}
            animate={{ rotate: open === "item-1" ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="accordion-chevron"
          ></motion.span>
        </AccordionTrigger>

        <AnimatePresence initial={false}>
          {open === "item-1" && (
            <AccordionContent forceMount className="font-poppins text-md text-gray-700 overflow-hidden">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="pt-2 pb-1">
                  {answer}
                </div>
              </motion.div>
            </AccordionContent>
          )}
        </AnimatePresence>
      </AccordionItem>
    </Accordion>
  );
}

export default FaqsCard;
