import {
  Dialog,
  Divider,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { ShoppingCartItem } from "./ShoppingCartItem";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { isAuthenticated } from "../../redux/slice/authenticationSlice/authSlice";
import {
  cleanShoppingCart,
  submitOrderNoTokenAsync,
  totalPrice,
} from "../../redux/slice/shoppingCartSlice/shoppingCartSlice";
import { NumericFormat } from "react-number-format";
import { ProductOrderNoTokenModel } from "../../models/ProductOrderNoTokenModel";

export const ShoppingCart = React.forwardRef((props, ref: any) => {
  const productsOrdered = useAppSelector(
    (state) => state.shoppingCart.productsOrdered
  );
  const totalCartPrice = useAppSelector(totalPrice);

  const [productOrderNoToken, setProductOrderNoToken] = useState(
    {} as ProductOrderNoTokenModel
  );

  const orderStatus = useAppSelector((state) => state.shoppingCart.orderStatus);
  useEffect(() => {
    if (orderStatus === "fullfilled") {
      dispatch(cleanShoppingCart());
      setIsOpenModal(true);
    }
  }, [orderStatus]);
  const [validData, setValidData] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenFormModal, setIsOpenFormModal] = useState(false);
  const isAuth = useAppSelector(isAuthenticated);
  const dispatch = useAppDispatch();

  const handleOrder = () => {
    if (!isAuth) {
      // setIsOpenModal(true);
      setIsOpenFormModal(true);
      return;
    }
    if (productsOrdered?.length === 0) {
      return;
    }
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };
  const closeFormModal = () => {
    setIsOpenFormModal(false);
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProductOrderNoToken((prev) => {
      return { ...prev, [name]: value };
    });
  };
  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const checkValidForm = (data: any) => {
    if (!data || !data.email || !data.name) return;
    if (isValidEmail(data.email)) setValidData(true);
  };

  const handleSubmitForm = (formValue: any) => {
    // checkValidForm(formValue);
    // if (!validData) {
    //   setIsOpenModal(true);
    //   return;
    // }
    if (productsOrdered?.length === 0) {
      return;
    }
    // setProductOrderNoToken((prev) => {
    //   return { ...prev, products: productsOrdered } as ProductOrderNoTokenModel;
    // });
    dispatch(
      submitOrderNoTokenAsync({
        ...productOrderNoToken,
        products: productsOrdered,
      } as ProductOrderNoTokenModel)
    );
  };

  const formModal = () => {
    return (
      <Dialog ref={ref} fullWidth={true} open={isOpenFormModal}>
        <div
          onClick={() => closeFormModal()}
          className="absolute right-3 top-2 hover:cursor-pointer"
        >
          x
        </div>
        <div className="p-10 md:pt-20 m-auto">
          <span className="font-bold text-center text-xl uppercase">
            Nhập thông tin đặt hàng
          </span>
          {/* <p className="font-thin py-5">{promotionInformation?.descripton}</p> */}
          <FormControl className="w-full" variant="standard">
            {confirmModal()}
            <TextField
              onChange={(e) => handleChange(e)}
              id="input-with-icon-textfield"
              name="name"
              label="Họ và tên"
              variant="standard"
              required
            />
            <TextField
              required
              onChange={(e) => handleChange(e)}
              type={"email"}
              name="email"
              id="input-with-icon-textfield"
              label="Email"
              variant="standard"
            />
            <TextField
              required
              onChange={(e) => handleChange(e)}
              name="phonenumber"
              id="input-with-icon-textfield"
              label="Số điện thoại"
              variant="standard"
            />
            <TextField
              required
              onChange={(e) => handleChange(e)}
              name="address"
              id="input-with-icon-textfield"
              label="Địa Chỉ"
              variant="standard"
            />
          </FormControl>
          <div
            onClick={() => handleSubmitForm(productOrderNoToken)}
            className="border-2 rounded-lg bg-blue-500 hover:text-blue-500 hover:bg-white border-blue-500  p-3 mt-10 text-white uppercase text-center hover:cursor-pointer"
          >
            Đặt hàng
          </div>
        </div>
      </Dialog>
    );
  };
  const confirmModal = () => {
    return (
      <Dialog fullWidth={true} open={isOpenModal}>
        <div
          onClick={() => closeModal()}
          className="absolute right-3 top-2 hover:cursor-pointer"
        >
          x
        </div>
        <div className="p-10 text-center">
          <h1 className="text-2xl text-[#1E90FF]">Thông báo</h1>
          <p className="py-10 text-xl text-semibold">
              Đăng kí thành công!
          </p>
          <div
            onClick={() => closeModal()}
            className="hover:cursor-pointer p-2 rounded-md w-56 m-auto bg-red-500 text-white"
          >
            Đóng
          </div>
        </div>
      </Dialog>
    );
  };

  const orderModal = () => {
    return (
      <Dialog fullWidth={true} open={isOpenModal}>
        <div
          onClick={() => closeModal()}
          className="absolute right-3 top-2 hover:cursor-pointer"
        >
          x
        </div>
        <div className="p-10 text-center">
          <h1 className="text-2xl text-[#1E90FF]">Thông báo</h1>
          <p className="py-10 text-xl text-semibold">
            {orderStatus === "fullfilled"
              ? "Đặt hàng thành công!"
              : "Đăng nhập để Hoàn tất đặt hàng!"}
          </p>
          <div
            onClick={() => closeModal()}
            className="hover:cursor-pointer p-2 rounded-md w-56 m-auto bg-red-500 text-white"
          >
            Đóng
          </div>
        </div>
      </Dialog>
    );
  };

  return (
    <div
      ref={ref}
      className="w-screen gap-5 absolute top-10 md:top-20 right-0 md:right-5 border-2 text-black bg-white rounded-lg md:w-4/12 p-5 md:p-10"
    >
      {formModal()}
      <div className="p-5">
        <Typography variant="h5" color="GrayText">
          Giỏ hàng
        </Typography>
      </div>
      <div className="h-60 md:w-11/12 m-auto p-2 overflow-auto ">
        <ShoppingCartItem />
        <Divider />
      </div>
      <div className="py-5">Thông tin giỏ hàng</div>
      <Divider />
      <div className="py-5">
        <Typography variant="h5" color="GrayText">
          Tổng:{" "}
          <NumericFormat
            className="md:px-10 font-thin"
            value={totalCartPrice}
            displayType={"text"}
            thousandSeparator={true}
            prefix={""}
          />
        </Typography>
        <div
          onClick={() => handleOrder()}
          className="p-2 m-5 hover:cursor-pointer text-white text-center rounded-xl bg-blue-500 hover:text-blue-500 hover:bg-white border-blue-500 border-2"
        >
          Đặt hàng
        </div>
      </div>
    </div>
  );
});
