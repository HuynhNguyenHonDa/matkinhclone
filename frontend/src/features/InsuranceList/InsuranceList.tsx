import React from "react";
import { Typography } from "@mui/material";
import { InsuracesList } from "../../mock/InsuracesList";

const listInsurace = InsuracesList;

export const InsuranceList = () => {
  return (
    <div className="w-full text-center md:p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-20">
        {listInsurace.description.error.map((Item) => {
          return (
            <div className="text-stone-500">
              <Typography
                className="p-2 text-center"
                color={"inherit"}
                variant="h5"
              >
                {Item.type}
              </Typography>
              {/* <div className={`grid grid-cols-${Item.details.length} gap-5`}> */}
              <div className={`grid grid-cols-${Item.details.length} gap-5`}>
                {Item.details?.map((detail) => {
                  return (
                    <div>
                      <Typography
                        className="font-semibold"
                        variant="subtitle1"
                        color={"#bcaaa4"}
                      >
                        {detail.name ? `${detail.name}` : ""}
                      </Typography>
                      <p className="text-sm text-stone-700">{detail.content}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
