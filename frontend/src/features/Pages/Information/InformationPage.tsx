import React from "react";
import { BlogList } from "../../Blog/BlogList";
import { SupperCombo } from "../../SupperCombo/SupperCombo";

export const InformationPage = () => {
  return (
    <div>
      <SupperCombo />
      <div className="p5">
        <div className="p-2 gap-5 text-center justify-items-center grid">
          <p className="p-5 font-semibold text-3xl   uppercase ">
            Tin tức mới nhất
          </p>
        </div>
        <BlogList />
      </div>
    </div>
  );
};
