import React, { useEffect, useState } from "react";
import { ProductCategory } from "../../ProductsCategory/ProductCategory";
import { Spinner } from "../../../common/Spinner";
import { Promotion } from "../../Promotion/Promotion";
import { SupperCombo } from "../../SupperCombo/SupperCombo";
import { BestSeller } from "../../BestSeller/BestSeller";
import { ProductFilter } from "../../ProductFilter/ProductFilter";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchConfigImageAsync } from "../../../redux/slice/configSlice/configSlice";
import { useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import './HomePage.css'

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const mainBackgroundImage = useAppSelector(
    (state) => state.config.configImage?.main_background
  );
  const insuranceBackgroundImage = useAppSelector(
    (state) => state.config.configImage?.promotion_background
  );

  useEffect(() => {
    dispatch(fetchConfigImageAsync());
  }, []);

  const handleInsuranceNavigate = () => {
    navigate("/Insurace");
  };
  const [isLoading] = useState(false);
  return (
    <div>
      <Carousel animation="slide" className="">
        {mainBackgroundImage &&
          mainBackgroundImage.length !== 0 &&
          mainBackgroundImage.map((img) => {
            return <img className="w-screen" src={img?.image} />;
          })}
      </Carousel>
      {isLoading && <Spinner />}
      <BestSeller />
      <ProductCategory />
      <ProductFilter />
      <SupperCombo />
      <div
        className="overflow-hidden my-10 relative h-96 items-center flex h-full"
        onClick={handleInsuranceNavigate}
      >
        <div
          className={`justify-center bg-no-repeat bg-cover bg-center absolute h-full w-full object-cover  opacity-70 hover:cursor-pointer `}
          style={{
            // backgroundImage: `URL(${Item.image})`,
            backgroundImage: `URL(${insuranceBackgroundImage})`,
          }}
        ></div>
        <div className="z-10 text-center p-20  hover:cursor-pointer">
          <p className="uppercase font-semibold text-2xl text-black-700 text-shadow">
            Chính sách bảo hành
          </p>
        </div>
      </div>
      <Promotion />
    </div>
  );
};
