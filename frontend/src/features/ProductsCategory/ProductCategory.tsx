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
          <p className="p-5 text-black-700  text-2xl md:text-5xl">
            <div className="h-0.5 w-5/12 m-auto bg-stone-300"></div>
            
            <h2 className="p-5 text-xl md:text-2xl uppercase text-black  ">DANH Mục Sản Phẩm</h2>
            <div className="h-0.5 w-5/12 m-auto bg-stone-300"></div>
          </p>
        </div>
      </div>
      <div className="">
        {!isLoadingState && <Spinner />}
        <div className="grid md:grid-cols-4 md:grid-rows-24  grid-flow-rows gap-2 h-screen">
          {!!categoriesList &&
            categoriesList.map((Item, index) => {
              if (index === 0) {
                return (
                  <div
                    onClick={() => handleCategoriesClick(Item.id ?? 0)}
                    className="w-full h-full object-cover md:col-span-2 md:row-span-5  overflow-hidden shadow-xl rounded-lg relative hover:cursor-pointer"
                  >
                    <div
                      className={`w-full h-full object-cover img-fluid rounded-lg overflow-hidden justify-center bg-no-repeat bg-cover bg-center absolute hover:scale-125`}
                      style={{
                        backgroundImage: `URL(${Item.image})`,
                      }}
                    ></div>
                    <div className="animate-pulse font-bold  uppercase text-sm md:text-xl absolute bottom-1/2 -translate-x-1/2 left-1/2 text-center text-black-700 text-shadow">
                      {Item.name}
                    </div>
                  </div>
                );
              }
              if (index === 1) {
                return (
                  <div
                    onClick={() => handleCategoriesClick(Item.id ?? 0)}
                    className="img-fluid md:col-span-2 md:row-span-5 object-cover overflow-hidden shadow-xl rounded-lg relative hover:cursor-pointer"
                  >
                    <div
                      className={`img-fluid rounded-lg overflow-hidden justify-center bg-no-repeat hover:scale-125 bg-cover bg-center absolute w-full h-full object-cover`}
                      style={{
                        backgroundImage: `URL(${Item.image})`,
                      }}
                    ></div>
                    <div className="animate-pulse font-bold text-shadow uppercase text-sm md:text-xl absolute bottom-1/2 -translate-x-1/2 left-1/2 text-center text-black-700">
                      {Item.name}
                    </div>
                  </div>
                );
              }
              if (index === 2) {
                return (
                  <div
                    onClick={() => handleCategoriesClick(Item.id ?? 0)}
                    className="md:col-span-2 md:row-span-5 overflow-hidden shadow-xl rounded-lg relative hover:cursor-pointer w-full h-full object-cover"
                  >
                    <div
                      className={`rounded-lg  overflow-hidden justify-center bg-no-repeat bg-cover bg-center hover:scale-125 absolute w-full h-full object-cover`}
                      style={{
                        backgroundImage: `URL(${Item.image})`,
                      }}
                    ></div>
                    <div className="animate-pulse font-bold text-shadow uppercase text-sm md:text-xl absolute bottom-1/2 -translate-x-1/2 left-1/2 text-center text-black-700">
                      {Item.name}
                    </div>
                  </div>
                );
              }
              if (index === 3) {
                return (
                  <div
                    onClick={() => handleCategoriesClick(Item.id ?? 0)}
                    className="md:col-span-2 md:row-span-5 overflow-hidden shadow-xl rounded-lg relative hover:cursor-pointer w-full h-full object-cover"
                  >
                    <div
                      className={`rounded-lg  overflow-hidden justify-center bg-no-repeat bg-cover bg-center absolute h-full w-full hover:scale-125 w-full h-full object-cover`}
                      style={{
                        backgroundImage: `URL(${Item.image})`,
                      }}
                    ></div>
                    <div className="animate-pulse font-bold text-shadow uppercase  text-sm md:text-xl absolute bottom-1/2 -translate-x-1/2 left-1/2 text-center text-black-700">
                      {Item.name}
                    </div>
                  </div>
                );
              }
              // if (index === 4) {
              //   return (
              //     <div
              //       onClick={() => handleCategoriesClick(Item.id ?? 0)}
              //       className="md:col-span-2 md:row-span-5 overflow-hidden shadow-xl rounded-lg relative hover:cursor-pointer w-full h-full object-cover"
              //     >
              //       <div
              //         className={`rounded-lg  overflow-hidden justify-center bg-no-repeat bg-cover bg-center absolute h-full w-full hover:scale-125 w-full h-full object-cover`}
              //         style={{
              //           backgroundImage: `URL(${Item.image})`,
              //         }}
              //       ></div>
              //       <div className="animate-pulse font-bold text-shadow uppercase text-sm md:text-xl absolute bottom-1/2 -translate-x-1/2 left-1/2 text-center p-2 text-black-700">
              //         {Item.name}
              //       </div>
              //     </div>
              //   );
              // }
            })}
        </div>
        <div className="">
          {!!categoriesList &&
            categoriesList.map((Item, index) => {
              
              if (index === 4) {
                return (
                  <div
                    onClick={() => handleCategoriesClick(Item.id ?? 0)}
                    className="overflow-hidden relative h-96 items-center mt-2"
                  >
                    <div
                      className={`justify-center bg-no-repeat bg-cover bg-center absolute h-full w-full object-cover hover:scale-125 hover:cursor-pointer `}
                      style={{
                        backgroundImage: `URL(${Item.image})`,
                      }}
                    ></div>
                    <div className="animate-pulse font-bold text-shadow uppercase text-sm md:text-xl absolute bottom-1/2 -translate-x-1/2 left-1/2 text-center text-black-700">
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
