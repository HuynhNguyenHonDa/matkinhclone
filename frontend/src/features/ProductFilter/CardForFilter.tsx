import React, { useEffect, useState } from "react";

interface ButtonProps {
  isSelectedCard?: boolean;
  cardInfo: any;
  handleSelected: (form: any) => void;
  handleDeSelected: (form: any) => void;
}

export const CardForFilter = ({
  isSelectedCard,
  cardInfo,
  handleSelected,
  handleDeSelected,
}: ButtonProps) =>
  //   handleDeSelected: any
  {
    const [isSelected, setIsSelected] = useState(false);
    useEffect(() => {
      setIsSelected(!!isSelectedCard);
    }, []);

    const handleCardItemSeletect = (filter: any) => {
      setIsSelected(!isSelected);
      if (isSelected) {
        handleDeSelected(filter);
        return;
      }
      handleSelected(filter);
    };
    return (
      <div
        onClick={() => handleCardItemSeletect(cardInfo)}
        className="hover:cursor-pointer hover:text-blue-500 uppercase"
      >
        <div
          className={`m-auto border-2 hover:border-blue-500 overflow-hidden w-20 h-20 md:w-56 md:h-56 ${
            isSelected ? "border-blue-500" : ""
          }`}
        >
          <img
            className="w-44 m-auto h-auto"
            src={cardInfo.image}
            alt={cardInfo.name}
          />
        </div>
        <div className="my-2 rounded-lg m-auto text-md hover:scale-105">
          {cardInfo.name}
        </div>
      </div>
    );
  };
