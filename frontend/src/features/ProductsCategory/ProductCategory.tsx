import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  categoryFetchAsync,
  isLoading,
  selectCategory,
} from "../../redux/slice/categorySlice/categorySlice";
import { Spinner } from "../../common/Spinner";
import { fetchProductByCategoryAsync } from "../../redux/slice/productSlice/productSlice";
import { useNavigate } from "react-router-dom";
import { colors } from "@mui/material";
import './ProductCategory.css';


export const ProductCategory = () => {
  const dispatch = useAppDispatch();
  const loadingState = useAppSelector(isLoading);
  const [isLoadingState, setisLoadingState] = useState(false);
  const categoriesList = useAppSelector(selectCategory);
  const navigator = useNavigate();
  const handleCategoriesClick = (id: number) => {
    dispatch(fetchProductByCategoryAsync(id));
    navigator("/Product");
  };
  useEffect(() => {
    if (loadingState === "loading") return;
    if (loadingState === "fullfilled") {
      setisLoadingState(true);
      return;
    }
    dispatch(categoryFetchAsync);
  }, [loadingState]);

  return (
    <div className="md:py-10 px-5">
      <div className="p-2 gap-5 text-center justify-items-center">
        <div>
          <p className="p-5 text-black-700 font-sans font-montserrat font-serif text-2xl md:text-5xl">
            <div className="h-0.5 w-5/12 m-auto bg-stone-300"></div>
            
            <h2 className="p-5 font-sans font-montserrat font-serif text-xl md:text-2xl uppercase text-black  ">Danh Mục Sản Phẩm</h2>
            <div className="h-0.5 w-5/12 m-auto bg-stone-300"></div>
          </p>
        </div>
      </div>
      <div className="">
        {!isLoadingState && <Spinner />}
        <div className="grid grid-cols-6 grid-rows-6 grid-flow-col gap-2 h-screen">
          {!!categoriesList &&
            categoriesList.map((Item, index) => {
              if (index === 0) {
                return (
                  <div
                    onClick={() => handleCategoriesClick(Item.id ?? 0)}
                    className="w-full h-full object-cover col-span-4 row-span-4 overflow-hidden shadow-xl rounded-lg relative hover:cursor-pointer"
                  >
                    <div
                      className={`w-full h-full object-cover img-fluid rounded-lg overflow-hidden justify-center bg-no-repeat bg-cover bg-center absolute h-full w-full object-cover hover:scale-125`}
                      style={{
                        backgroundImage: `URL(${Item.image})`,
                      }}
                    ></div>
                    <div className="animate-pulse font-bold  uppercase font-sans font-montserrat font-serif text-sm md:text-xl absolute bottom-1/2 -translate-x-1/2 left-1/2 text-center p-2 text-black-700 text-shadow">
                      {Item.name}
                    </div>
                  </div>
                );
              }
              if (index === 1) {
                return (
                  <div
                    onClick={() => handleCategoriesClick(Item.id ?? 0)}
                    className="img-fluid col-span-3 row-span-2 overflow-hidden shadow-xl rounded-lg relative hover:cursor-pointer"
                  >
                    <div
                      className={`img-fluid rounded-lg overflow-hidden justify-center bg-no-repeat hover:scale-125 bg-cover bg-center absolute w-full h-full object-cover`}
                      style={{
                        backgroundImage: `URL(${Item.image})`,
                      }}
                    ></div>
                    <div className="animate-pulse font-bold text-shadow uppercase font-sans font-montserrat font-serif text-sm md:text-xl absolute bottom-1/2 -translate-x-1/2 left-1/2 text-center p-2 text-black-700">
                      {Item.name}
                    </div>
                  </div>
                );
              }
              if (index === 2) {
                return (
                  <div
                    onClick={() => handleCategoriesClick(Item.id ?? 0)}
                    className="col-span-3 row-span-2 overflow-hidden shadow-xl rounded-lg relative hover:cursor-pointer w-full h-full object-cover"
                  >
                    <div
                      className={`rounded-lg  overflow-hidden justify-center bg-no-repeat bg-cover bg-center hover:scale-125 absolute w-full h-full object-cover`}
                      style={{
                        backgroundImage: `URL(${Item.image})`,
                      }}
                    ></div>
                    <div className="animate-pulse font-bold text-shadow uppercase font-sans font-montserrat font-serif text-sm md:text-xl absolute bottom-1/2 -translate-x-1/2 left-1/2 text-center p-2 text-black-700">
                      {Item.name}
                    </div>
                  </div>
                );
              }
              if (index === 3) {
                return (
                  <div
                    onClick={() => handleCategoriesClick(Item.id ?? 0)}
                    className="col-span-2 row-span-2 overflow-hidden shadow-xl rounded-lg relative hover:cursor-pointer w-full h-full object-cover"
                  >
                    <div
                      className={`rounded-lg  overflow-hidden justify-center bg-no-repeat bg-cover bg-center absolute h-full w-full hover:scale-125 w-full h-full object-cover`}
                      style={{
                        backgroundImage: `URL(${Item.image})`,
                      }}
                    ></div>
                    <div className="animate-pulse font-bold text-shadow uppercase font-sans font-montserrat font-serif text-sm md:text-xl absolute bottom-1/2 -translate-x-1/2 left-1/2 text-center p-2 text-black-700">
                      {Item.name}
                    </div>
                  </div>
                );
              }
              if (index === 4) {
                return (
                  <div
                    onClick={() => handleCategoriesClick(Item.id ?? 0)}
                    className="col-span-2 row-span-2 overflow-hidden shadow-xl rounded-lg relative hover:cursor-pointer w-full h-full object-cover"
                  >
                    <div
                      className={`rounded-lg  overflow-hidden justify-center bg-no-repeat bg-cover bg-center absolute h-full w-full hover:scale-125 w-full h-full object-cover`}
                      style={{
                        backgroundImage: `URL(${Item.image})`,
                      }}
                    ></div>
                    <div className="animate-pulse font-bold text-shadow uppercase font-sans font-montserrat font-serif text-sm md:text-xl absolute bottom-1/2 -translate-x-1/2 left-1/2 text-center p-2 text-black-700">
                      {Item.name}
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};
