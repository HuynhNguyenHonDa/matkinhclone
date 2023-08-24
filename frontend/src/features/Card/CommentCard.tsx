import { Avatar, Rating } from "@mui/material";
import React, { useState } from "react";

export interface CommentCardProps {
  userName: string;
  dateCreate?: string;
  title?: string;
  description: string;
  avatarURL?: string;
}

export const CommentCard = (card: CommentCardProps, { ...props }) => {
  const [isShowingFullContent, setIsShowingFullContent] = useState(false);
  const handleShowFull = () => {
    setIsShowingFullContent(!isShowingFullContent);
  };
  return (
    <div className={`border-2 p-4 ${isShowingFullContent ? "" : "h-52"}`}>
      <div className="flex">
        <Avatar alt="Travis Howard" src={card.avatarURL} />
        <div className="px-2">
          <p className="truncate text-xs lg:text-lg font-semibold">{card.userName}</p>
          <Rating
            value={4}
            size="small"
            readOnly
          />
          <p className="font-sans font-montserrat font-serif text-xs">{card.dateCreate}</p>
        </div>
      </div>
      <div onClick={() => handleShowFull()} className="px-4 cursor-pointer">
        <h1 className="font-sans font-montserrat font-serif">{card.title}</h1>
        <p
          className={`${
            isShowingFullContent ? "" : "overflow-hidden max-h-10"
          } text-sm `}
        >
          {card.description}
        </p>
      </div>
    </div>
  );
};
