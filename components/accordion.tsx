"use client";

import { useState } from "react";
import Button from "@/components/tracked-button";

interface AccordionProps {
  title: string;
  content: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-200">
      <Button
        aria-label={`Toggle ${title} accordion`}
        onClick={toggleAccordion}
        className="flex w-full items-center justify-between px-4 py-4 text-left focus:outline-none"
      >
        <span className="text-lg font-medium">{title}</span>
        <svg
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </Button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="p-4 text-gray-600">{content}</div>
      </div>
    </div>
  );
};

export default Accordion;
