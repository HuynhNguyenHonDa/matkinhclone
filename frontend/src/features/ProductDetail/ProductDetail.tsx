import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../../common/Spinner";
import { Card } from "../Card/Card";
import { ProductOrderedModel } from "../../models/productOrdered";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getProductByIdAsync } from "../../redux/slice/productSlice/productSlice";
import { addMoreProduct } from "../../redux/slice/shoppingCartSlice/shoppingCartSlice";
import { CarouselCustom } from "../../shareComponent/Carousel";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Divider } from "@mui/material";
import './productdetail.css';
import { SnackbarCustom } from "../../shareComponent/SnackBarCustom";
import { Box, duration } from "@mui/material";
import InnerImageZoom from "react-inner-image-zoom";
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';



export const ProductDetail = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setisLoading] = useState(false);
  const [openSackBar, setOpenSackBar] = useState(false);
  const loadingStatus = useAppSelector((state) => state.product.status);


  //betseler
  const bestSaleProduct = useAppSelector(
    (state) => state.product.bestSellerProds
  );


  const handleAddToBag = () => {
    const productOrdered: ProductOrderedModel = {
      id: selectedProducts?.id,
      image: selectedProducts?.thumbnail,
      quantity: 1,
      name: selectedProducts?.name,
      colors: selectedProductColor,
      price: selectedProducts?.price,
    };

    dispatch(addMoreProduct(productOrdered));
    setOpenSackBar(true)
  };
  const selectedProducts = useAppSelector(
    (state) => state.product.selectedProduct
  );
  const [selectedProductColor, setSelectedProductColor] = useState(
    selectedProducts?.colors[0]?.label
  );
  const getParams = useParams();
  const [currentThumbnail, setCurrentThumbnail] = useState(
    selectedProducts?.thumbnail
  );
  const handleChangeThumbnail = (thumbnail?: string) => {
    setCurrentThumbnail(thumbnail);
  };
  useEffect(() => {
    if (loadingStatus === "loading") {
      setisLoading(true);
      return;
    }
    if (loadingStatus === "fullfilled") {
      setisLoading(false);
      setCurrentThumbnail(selectedProducts?.thumbnail);
      setSelectedProductColor(selectedProducts?.colors[0]?.label);
      return;
    }
    dispatch(getProductByIdAsync(Number(getParams.id)));
  }, [loadingStatus]);

  useEffect(() => {
    if (!getParams.id) return;
    dispatch(getProductByIdAsync(Number(getParams.id)));
  }, [getParams.id]);

  const priceCalculator = () => {
    const priceFormatted = selectedProducts?.price.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
    return priceFormatted;
  };

  const handleProductColorChange = (label: string) => {
    setSelectedProductColor(label);
  };
  /////////////////////////////////////
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  ////////////////////////////
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="h-full md:flex py-16 p-2 md:pt-20">
          <div className="md:w-1/2 grid grid-cols-4 grid-flow-col md:grid-rows-5 gap-2">
            <div className="md:h-full md:col-span-4 col-span-3 row-span-4 justify-center bg-no-repeat bg-cover bg-center">
              <InnerImageZoom
                src={currentThumbnail ?? ""}
                zoomSrc={currentThumbnail ?? ""}
                zoomScale={1 ?? ""} 
                // height={1000 ?? ""}
                // width={1000 ?? ""}
                hasSpacer={true ?? ""}
                zoomPreload={true ?? ""}
                fadeDuration={350 ?? ""}
                // fullscreenOnMobile={true ?? ""}
                />
            </div>
            {selectedProducts?.images.slice(0, 3).map((img, index) => {
              if (index === 0) {
                return (
                  <>
                    <div
                      className="justify-center bg-no-repeat bg-cover bg-center border-2 border-withe-600 "
                      style={{
                        backgroundImage: `URL(${selectedProducts?.thumbnail})`,
                      }}
                      onClick={() =>
                        handleChangeThumbnail(selectedProducts?.thumbnail)
                      }
                    >
                    </div>
                    <div
                      className="justify-center bg-no-repeat bg-cover bg-center border-2 border-withe-600"
                      style={{
                        backgroundImage: `URL(${img.image})`,
                      }}
                      onClick={() => handleChangeThumbnail(img.image)}>
                    </div>
                  </>
                );
              }
              return (
                <div
                  className="justify-center bg-no-repeat bg-cover bg-center "
                  style={{
                    backgroundImage: `URL(${img.image})`,
                  }}
                  onClick={() => handleChangeThumbnail(img.image)}>
                </div>
              );
            })}
          </div>
          <div className="md:px-20 w-full">
            <p className="uppercase font-semibold text-md md:text-lg">
              {selectedProducts?.name}
            </p>
            <div className="grid">
              <div className="">
                <div className="flex py-5 gap-2 text-xs md:text-md">
                  <p className="uppercase  text-center">Màu sắc:</p>
                  <div className="md:px-20 flex gap-2">
                    {selectedProducts?.colors.length === 0 ? (
                      <p className="uppercase md:px-20 text-center">
                        Not Found
                      </p>
                    ) : (
                      selectedProducts?.colors.map((col) => {
                        return (
                          <div className="w-16 md:w-24 text-center ">
                            <p
                              onClick={() =>
                                handleProductColorChange(col.label)
                              }
                              className={`${selectedProductColor === col.label
                                ? "bg-blue-500 text-black"
                                : "text-blue-500"
                                } border-blue-500 border-2 hover:bg-blue-500 hover:text-black text-xs md:text-md`}
                            >
                              {col?.label}
                            </p>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                <div className="flex text-xs md:text-md">
                  <p className="uppercase my--1">Số lượng:</p>
                  <p className="uppercase px-5 md:px-20 text-center">
                    {selectedProducts?.colors.find(
                      (col) => col.label === selectedProductColor
                    )?.quantity ?? "Not Found"}
                  </p>
                </div>



                <div className="flex text-xs md:text-md">
                  <p className="uppercase py-5">giá:</p>
                  <p className="py-5 px-5 md:px-20 text-center">
                    {priceCalculator()}
                  </p>
                </div>

                <div className="text-xs md:text-md">
                  <p className="uppercase mota">Mô tả chi tiết:</p>
                  {/* <p className=" px-5 md:px-20"> */}
                  <p className="text-base text-justify my-1">
                    {selectedProducts?.content ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: selectedProducts?.content,
                        }}
                      ></div>
                    ) : (
                      <></>
                    )}
                  </p>
                </div>

                {/* <div className="flex text-xs md:text-md ">
                  <p className="uppercase py-5 mota text-center">Mô tả:</p>
                  <p className="py-5 px-5 md:px-20 text-justify">
                    {selectedProducts?.content ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: selectedProducts?.content,
                        }}
                      ></div>
                    ) : (
                      <></>
                    )}
                  </p>
                </div> */}
              </div>
            </div>
            <button
              onClick={() => handleAddToBag()}
              className="uppercase mt-5 p-2 m w-full text-xs md:text-md bg-gradient-to-r from-[#1E90FF] to-[#0b7def] text-black font-semibold rounded-xl"
            >
              Thêm Vào Giỏ Hàng
            </button>
            <SnackbarCustom open={openSackBar} onClose={() => setOpenSackBar(false)}
              duration={2000} severity="success" />
          </div>
        </div>
      )}

      <Divider className="pt-5" color={"#efebe9"}>
        <p className="p-5 font-sans font-montserrat font-serif text-xl md:text-2xl uppercase text-black">
          CÁC SẢN PHẨM KHÁC
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
