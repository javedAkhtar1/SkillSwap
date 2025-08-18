import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface ICardProps {
  name: string;
  icon: LucideIcon;
}

function SkillsCard({ name, icon: Icon }: ICardProps) {
  return (
    <Card
      className="
                w-full h-full sm:min-h-[120px] min-h-[80px]
                flex flex-col 
                shadow-md font-poppins
                bg-gray-100
              "
    >
      <CardHeader className="flex-1 flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-2">
          <Icon className="w-6 h-6 text-blue-600" />
          <CardTitle>{name}</CardTitle>
        </div>
      </CardHeader>
    </Card>
  );
}

export default SkillsCard;
