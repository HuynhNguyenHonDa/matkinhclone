import React, { useEffect } from "react";
import { FormFaceModal } from "../../models/formface";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addFormFaceFilter,
  fetchFormFaceAsync,
  removeFormFaceFilter,
} from "../../redux/slice/productFilterSlice/productsFilterSlice";
import { CardForFilter } from "./CardForFilter";

export const FormFaceFilter = () => {
  const formList = useAppSelector((state) => state.productsFilter.formface);
  const dispatch = useAppDispatch();
  const SelectedFormFaceList = useAppSelector(
    (state) => state.productsFilter.selectedFilter.formface
  );

  const selectedGenderId = useAppSelector(
    (state) => state.productsFilter?.selectedFilter?.gender?.id
  );
  useEffect(() => {
    dispatch(fetchFormFaceAsync(selectedGenderId));
  }, []);

  const onFormFaceSelect = (formSelected: FormFaceModal) => {
    dispatch(addFormFaceFilter(formSelected));
  };

  const onFormFaceDeSelect = (formSelected: FormFaceModal) => {
    dispatch(removeFormFaceFilter(formSelected));
  };
  return (
      <div className="grid grid-cols-3 py-5 gap-10 text-center">
        {formList &&
          formList.map((form) => {
            const isSelected = SelectedFormFaceList?.some((prod) => {
              return prod.id === form.id;
            });
            return (
              <CardForFilter
                isSelectedCard={!!isSelected}
                handleSelected={() => onFormFaceSelect(form)}
                handleDeSelected={() => onFormFaceDeSelect(form)}
                cardInfo={form}
              />
            );
          })}
    </div>
  );
};
