import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  UserPlus,
  Search,
  Handshake,
  MessageCircle,
  Repeat,
} from "lucide-react";

interface ICardProps {
  icon: string;
  title: string;
  description: string;
  content: string;
}

const iconComponents = {
  UserPlus: UserPlus,
  Search: Search,
  Handshake: Handshake,
  MessageCircle: MessageCircle,
  Repeat: Repeat,
};

function StepsCard({ icon, title, description, content }: ICardProps) {
  const IconComponent = iconComponents[icon as keyof typeof iconComponents];

  return (
    <Card
      className="
            w-full h-full 
            flex flex-col 
            shadow-md font-poppins
          "
    >
      <CardHeader className="flex-1">
        <div className="flex gap-4 items-center font-inter">
          {IconComponent && <IconComponent className="h-8 w-8 text-blue-700" />}
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto max-h-[120px]">
        <p className="break-words whitespace-pre-wrap">{content}</p>
      </CardContent>
    </Card>
  );
}

export default StepsCard;
