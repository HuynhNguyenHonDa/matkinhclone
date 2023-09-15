import React, { useEffect, useState } from "react";
// import { productList } from "../../mock/ProductsList";
import { Card } from "../Card/Card";
import { CarouselCustom } from "../../shareComponent/Carousel";
import {
  productFetchAsync,
  loadingState,
} from "../../redux/slice/productSlice/productSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Spinner } from "../../common/Spinner";
import { Divider } from "@mui/material";

export const ProductList = () => {
  const getLoadingState = useAppSelector(loadingState);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const productList = useAppSelector((state) => state.product.products);
  const productFilter = useAppSelector((state) => state.product.productsFliter);
  const bestSaleProduct = useAppSelector(
    (state) => state.product.bestSellerProds
  );
  useEffect(() => {
    dispatch(productFetchAsync());
  }, []);

  useEffect(() => {
    if (getLoadingState !== "fullfilled" || "loading" || "failed") {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
  }, [getLoadingState]);

  return (
    <div className="snap-x py-10">
      {productFilter && productFilter.length > 0 ? (
        <>
          <Divider className="pt-5" color={"#efebe9"}>
            <p className="p-5  text-xl md:text-2xl uppercase text-black">
            các sản phẩm phù hợp
            </p>
          </Divider>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {!isLoading ? (
              <>
                {productFilter &&
                  productFilter.map((prod) => {
                    return <Card {...prod} />;
                  })}
              </>
            ) : (
              <Spinner />
            )}
          </div>
        </>
      ) : (
        <>
          {/* <p className="p-5 text-[#1E90FF] font-bold text-xl md:text-2xl uppercase">
            Search Product
          </p>
          <p className="text-center">Không tìm thấy kết quả!</p> */}
          <Divider className="pt-5" color={"#efebe9"}>
            <p className="p-5 text-xl md:text-2xl uppercase text-black">
            SẢN PHẨM
            </p>
          </Divider>
          {/* <p className="pt-10 md:p-5 text-[#1E90FF] font-bold text-xl md:text-2xl uppercase">
            Product
          </p> */}
          <div className="grid md:grid-cols-4 gap-5">
            {!isLoading ? (
              <>
                {productList &&
                  productList.map((prod) => {
                    return <Card {...prod} />;
                  })}
              </>
            ) : (
              <Spinner />
            )}
          </div>
        </>
      )}
      <Divider className="pt-5" color={"#efebe9"}>
        <p className="p-5  text-xl md:text-2xl uppercase text-black">
          BEST SELLER
        </p>
      </Divider>
      {!isLoading ? (
        <CarouselCustom startSpace="65%" className="p-2 gap-5">
          {bestSaleProduct &&
            bestSaleProduct.map((prod) => {
              return <Card {...prod} />;
            })}
        </CarouselCustom>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
