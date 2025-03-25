import { Card } from "@/components/ui/card";
import React from "react";

// typescript
type CardComponent = {
  titulo: string;
  icon?: React.ElementType;
  itens: (string | React.ReactNode)[];
}[];

export function CardComponent({ sections }: { sections: CardComponent }) {
  return (
    <>
      {sections.map((section, index) => (
        <Card key={index} className="p-6 shadow-sm ">
          <h2 className="text-md font-semibold text-gray-800 mb-4">
            {section.titulo}
          </h2>
          {section.icon && React.createElement(section.icon)}
          <ul className="text-gray-500">
            {section.itens.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Card>
      ))}
    </>
  );
}
