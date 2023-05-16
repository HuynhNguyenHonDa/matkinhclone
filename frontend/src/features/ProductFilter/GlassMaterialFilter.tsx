import React, { useEffect } from "react";
import { GlassesMaterialModal } from "../../models/glassesMaterial";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addGlassMaterialFilter,
  fetchGlassesMaterialAsync,
  removeGlassMaterialFilter,
} from "../../redux/slice/productFilterSlice/productsFilterSlice";
import { CardForFilter } from "./CardForFilter";

export const GlassMaterialFilter = () => {
  const dispatch = useAppDispatch();
  const glassMaterialList = useAppSelector(
    (state) => state.productsFilter.glassMaterial
  );
  const glassMaterialFilterSeleted = useAppSelector(
    (state) => state.productsFilter.selectedFilter.glassesMaterial
  );

  const onFormFaceSelect = (formSelected: GlassesMaterialModal) => {
    dispatch(addGlassMaterialFilter(formSelected));
  };

  const onFormFaceDeSelect = (formSelected: GlassesMaterialModal) => {
    dispatch(removeGlassMaterialFilter(formSelected));
  };
  useEffect(() => {
    dispatch(fetchGlassesMaterialAsync());
  }, []);

  return (
    <div className="grid grid-cols-3 py-5 justify-center gap-10 text-center">
      {glassMaterialList &&
        glassMaterialList.map((form) => {
          const isSelected = glassMaterialFilterSeleted?.some((prod) => {
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
