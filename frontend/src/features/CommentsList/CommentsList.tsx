import React from "react";
import { CommentCard } from "../Card/CommentCard";
import { CommentsList as cardsInfo } from "../../mock/CommentsList";

export const CommentsList = () => {
  return (
    <div className="p-5 md:p-10">
      <div className="grid md:grid-cols-4 gap-5">
        {cardsInfo.map((card) => {
          return <CommentCard {...card} />;
        })}
      </div>
      {/* <p className="text-center cursor-pointer text-sm font-thin p-5">XEM THÊM</p> */}
    </div>
  );
};
