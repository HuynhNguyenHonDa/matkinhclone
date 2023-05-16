import React, { useEffect } from "react";
import { GlassesShapeModal } from "../../models/glassesShape";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addGlassShapeFilter,
  fetchGlassShapeAsync,
  removeGlassShapeFilter,
} from "../../redux/slice/productFilterSlice/productsFilterSlice";
import { CardForFilter } from "./CardForFilter";

export const GlassShapeFilter = () => {
  const dispatch = useAppDispatch();
  const glassShapeList = useAppSelector(
    (state) => state.productsFilter.glassShape
  );
  const glassShapeFilterSeleted = useAppSelector(
    (state) => state.productsFilter.selectedFilter.glassesShape
  );
  const onFormFaceSelect = (formSelected: GlassesShapeModal) => {
    dispatch(addGlassShapeFilter(formSelected));
  };

  const onFormFaceDeSelect = (formSelected: GlassesShapeModal) => {
    dispatch(removeGlassShapeFilter(formSelected));
  };
  useEffect(() => {
    dispatch(fetchGlassShapeAsync());
  }, []);

  return (
      <div className="grid grid-cols-3 py-5 justify-center gap-10 text-center">
        {glassShapeList &&
          glassShapeList.map((form) => {
            const isSelected = glassShapeFilterSeleted?.some((prod) => {
              return prod.id === form.id;
            });
            return (
              <CardForFilter
                handleDeSelected={() => onFormFaceDeSelect(form)}
                handleSelected={() => onFormFaceSelect(form)}
                cardInfo={form}
                isSelectedCard={!!isSelected}
              />
            );
          })}
      </div>
  );
};
