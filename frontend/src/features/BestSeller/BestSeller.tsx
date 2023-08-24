import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { productFetchAsync } from "../../redux/slice/productSlice/productSlice";
import { Card } from "../Card/Card";

export const BestSeller = () => {
  const [isShowAllBestSellerProd, setIsShowAllBestSellerProd] = useState(false);
  const bestProds = useAppSelector((state) => state.product.bestSellerProds);
  const bestSellerBackground = useAppSelector(
    (state) => state.config.configImage?.bestseller_background
  );
  const dispatch = useAppDispatch();

  const handleMoreBestSellerProds = () => {
    setIsShowAllBestSellerProd(!isShowAllBestSellerProd);
  };
  useEffect(() => {
    dispatch(productFetchAsync());
  }, []);

  return (
    <div>
      <div className="md:p-2 gap-5 justify-items-center w-screen overflow-hidden">
        <div className="overflow-hidden">
          <img className="w-screen h-auto" src={bestSellerBackground} alt="" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 p-5">
        {bestProds &&
          bestProds
            .slice(
              0,
              !isShowAllBestSellerProd
                ? 4
                : bestProds.length < 20
                ? bestProds.length
                : 20
            )
            .map((prod) => {
              return <Card {...prod} />;
            })}
      </div>
      <p
        onClick={handleMoreBestSellerProds}
        className="text-center cursor-pointer text-sm py-10 font-sans font-montserrat font-serif"
      >
        {!isShowAllBestSellerProd ? "XEM THÊM" : "Ẩn"}
      </p>
    </div>
  );
};
