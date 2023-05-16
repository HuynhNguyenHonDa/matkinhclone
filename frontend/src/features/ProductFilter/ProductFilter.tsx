import { Dialog, Step, StepLabel, Stepper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GenderFilter } from "./GenderFilter";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { FormFaceFilter } from "./FormFaceFilter";
import { GlassShapeFilter } from "./GlassShapeFilter";
import { GlassMaterialFilter } from "./GlassMaterialFilter";
import {
  clearFilterList,
  fetchProductFilterAsync,
} from "../../redux/slice/productFilterSlice/productsFilterSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ProductFilterCommand } from "../../api/productFilterApi/productFilterApi";
import { useNavigate } from "react-router-dom";

export const ProductFilter = () => {
  const a = useAppSelector((state) => state.productsFilter.selectedFilter);
  useEffect(() => {
    dispatch(clearFilterList());
    return () => {
      dispatch(clearFilterList());
    };
  }, []);

  const dispatch = useAppDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false);
  const navigate = useNavigate();
  const recommendDescription = useAppSelector(
    (state) => state.contact?.contact?.recommend_glass_description
  );
  const productFilted = useAppSelector(
    (state) => state.productsFilter.selectedFilter
  );
  const renderFilterComponent = (currentStep: number) => {
    return <div className="m-auto">{steps[currentStep].body}</div>;
  };

  const productFilterBackground = useAppSelector(
    (state) => state.config.configImage?.recommend_glass_image
  );
  const handleCloseModal = () => {
    setIsOpenFilterModal(false);
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => {
      if (prev === steps.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSearchProd = () => {
    const formFaceIdList: number[] = [];
    const glassMaterialIdList: number[] = [];
    const glassesShapeIdList: number[] = [];

    productFilted.formface?.map((value) => {
      formFaceIdList.push(value.id);
    });
    productFilted.glassesMaterial?.map((value) => {
      glassMaterialIdList.push(value.id);
    });
    productFilted.glassesShape?.map((value) => {
      glassesShapeIdList.push(value.id);
    });
    const filterList: ProductFilterCommand = {
      genderId: productFilted.gender?.id,
      formFaceId: formFaceIdList,
      glassMaterialId: glassMaterialIdList,
      glassesShapeId: glassesShapeIdList,
    };

    dispatch(fetchProductFilterAsync(filterList));
    navigate("/Product");
  };
  const steps = [
    {
      title: "Giới Tính",
      body: <GenderFilter handleNextStep={handleNextStep}></GenderFilter>,
    },
    {
      title: "Giới Tính",
      body: <FormFaceFilter></FormFaceFilter>,
    },
    {
      title: "Giới Tính",
      body: <GlassShapeFilter />,
    },
    {
      title: "Giới Tính",
      body: <GlassMaterialFilter></GlassMaterialFilter>,
    },
  ];
  return (
    <div className="text-center">
      <div className="md:flex justify-center">
        <div className="p-5">
          <img className="h-96 w-full" src={productFilterBackground} alt="" />
        </div>
        <div className="md:w-1/4 self-center">
          <p
            onClick={() => {
              setIsOpenFilterModal(true);
            }}
            className="p-5 text-2xl hover:cursor-pointer hover:scale-105 uppercase"
          >
            Chọn Kính Phù Hợp
          </p>
          <p className="text-center p-5 m-auto text-md font-light">
            {recommendDescription}
          </p>
        </div>
      </div>

      <Dialog className="" open={isOpenFilterModal} fullScreen>
        <div
          onClick={handleCloseModal}
          className="absolute right-5 top-1 text-blue-700 uppercase hover:cursor-pointer"
        >
          x
        </div>
        <Stepper className="p-10" alternativeLabel activeStep={currentStep}>
          <Step key={"Giới Tính"}>
            <StepLabel>{"Giới Tính"}</StepLabel>
          </Step>
          <Step key={"Khuôn mặt"}>
            <StepLabel>{"Khuôn mặt"}</StepLabel>
          </Step>
          <Step key={"Gọng kính"}>
            <StepLabel>{"Gọng kính"}</StepLabel>
          </Step>
          <Step key={"Chất liệu gọng"}>
            <StepLabel>{"Chất liệu gọng"}</StepLabel>
          </Step>
        </Stepper>
        {renderFilterComponent(currentStep)}
        <div className="gap-5 flex relative p-10 text-blue-400 justify-center">
          {currentStep === steps.length - 1 ? (
            <>
              <div
                onClick={handlePrevStep}
                className="p-2 hover:cursor-pointer font-bold"
              >
                <KeyboardArrowLeftIcon />
              </div>
              <div
                onClick={handleSearchProd}
                className="border-2 p-2 text-center w-40 rounded-2xl hover:cursor-pointer text-white hover:bg-white bg-blue-500 hover:text-blue-500 font-bold hover:border-blue-500"
              >
                Search
              </div>
              <div
                onClick={handleNextStep}
                className="p-2 hover:cursor-pointer font-bold invisible "
              >
                <KeyboardArrowLeftIcon />
              </div>
            </>
          ) : (
            <>
              <div
                onClick={handlePrevStep}
                className={`p-2 hover:cursor-pointer font-bold ${
                  currentStep === 0 ? "invisible" : ""
                }`}
              >
                <KeyboardArrowLeftIcon />
              </div>
              <div
                onClick={handleCloseModal}
                className="border-2 p-2 text-center w-40 rounded-2xl hover:cursor-pointer text-white hover:bg-white bg-red-500 hover:text-red-400 font-bold hover:border-red-500"
              >
                Close
              </div>
              <div
                onClick={handleNextStep}
                className={`p-2 hover:cursor-pointer font-bold ${
                  currentStep === 0 ? "invisible" : ""
                }`}
              >
                <KeyboardArrowRightIcon />
              </div>
            </>
          )}
        </div>
      </Dialog>
    </div>
  );
};
