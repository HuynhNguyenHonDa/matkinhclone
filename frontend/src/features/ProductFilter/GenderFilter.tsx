import React, { useEffect } from "react";
import { GendersModal } from "../../models/genders";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addGenderFilter,
  fetchGenderAsync,
} from "../../redux/slice/productFilterSlice/productsFilterSlice";

export const GenderFilter = (props: any) => {
  const genderList = useAppSelector((state) => state.productsFilter.genders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGenderAsync());
  }, []);

  const handleClickOnGender = (gender: GendersModal) => {
    dispatch(addGenderFilter(gender));
    props.handleNextStep();
  };
  return (
    <div className="flex py-5 justify-center gap-5 text-center">
      {genderList &&
        genderList.map((gender) => {
          return (
            <div
              onClick={() => handleClickOnGender(gender)}
              className="hover:cursor-pointer hover:text-blue-500 uppercase"
            >
              <div className="border-2 hover:border-blue-500 overflow-hidden w-32 h-32 md:w-56 md:h-56">
                <img
                  className="w-full h-auto"
                  src={gender.image}
                  alt={gender.name}
                />
              </div>
              <div className="my-2 rounded-lg m-auto text-md hover:scale-105">
                {gender.name}
              </div>
            </div>
          );
        })}
    </div>
  );
};
