// src/components/ActionCard.jsx
import React from "react";

interface ActionCardprops {
  title: string;
  description: string;
  buttonText: string;
  buttonColorClass: string;
}

const ActionCard = ({
  title,
  description,
  buttonText,
  buttonColorClass
}: ActionCardprops) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between h-56">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
      <button
        className={`mt-4 w-full py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity ${buttonColorClass}`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ActionCard;
