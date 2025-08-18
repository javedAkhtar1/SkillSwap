import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface ICardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

function WhyUseCard({ title, description, icon: Icon }: ICardProps) {
  return (
    <Card
      className="
        w-full h-full 
        flex flex-col 
        shadow-md font-poppins
      "
    >
      <CardHeader>
        <div className="flex gap-4 items-center font-inter">
          <Icon className="h-8 w-8 text-blue-700" />
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="break-words whitespace-pre-wrap">{description}</p>
      </CardContent>
    </Card>
  );
}

export default WhyUseCard;
