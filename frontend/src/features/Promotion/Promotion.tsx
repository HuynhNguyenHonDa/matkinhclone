import { Dialog, FormControl, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

import {
  promotionModel,
  submitPromotionForm,
} from "../../api/formApi/submitPromotionForm";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchPromotionConfigAsync } from "../../redux/slice/configSlice/configSlice";

export const Promotion = () => {
  const [formValue, setFormValue] = useState({} as promotionModel);
  const [validData, setValidData] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const promotionInformation = useAppSelector(
    (state) => state.config.promotionConfig
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPromotionConfigAsync());
  }, []);

  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const checkValidForm = (data: promotionModel) => {
    if (!data || !data.email || !data.name) return;
    if (isValidEmail(data.email)) setValidData(true);
  };

  const handleSubmitForm = (formValue: promotionModel) => {
    checkValidForm(formValue);
    if (!validData) {
      setIsOpenModal(true);
      return;
    }
    submitPromotionForm(formValue);
    setIsOpenModal(true);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValue((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const closeModal = () => {
    setIsOpenModal(false);
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
            {validData ? "Đăng kí thành công!" : "Đăng kí thất bại!"}
          </p>
          <div
            onClick={() => closeModal()}
            className="hover:cursor-pointer p-2 rounded-md w-56 m-auto bg-red-500 text-white"
          >
            Close
          </div>
        </div>
      </Dialog>
    );
  };

  return (
    <div className="overflow-hidden border-2 relative">
      <div
        className={`opacity-70 justify-center bg-no-repeat bg-cover bg-center absolute h-full w-full`}
        style={{
          backgroundImage: `URL(${promotionInformation?.image})`,
        }}
      ></div>
      <div className="border-2 p-10 md:p-20 m-auto relative w-80 md:w-1/2 bg-slate-50 rounded-xl mb-10 shadow-xl top-5 opacity-80">
        <span className="font-sans font-montserrat font-serif text-xl uppercase">
          {promotionInformation?.title}
        </span>
        <p className="font-sans font-montserrat font-serif py-5">{promotionInformation?.descripton}</p>
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
            name="note"
            id="input-with-icon-textfield"
            label="Ghi Chú"
            variant="standard"
          />
        </FormControl>
        <div
          onClick={() => handleSubmitForm(formValue)}
          className="border-2 rounded-lg bg-gradient-to-r from-[#1E90FF] to-[#0b7def] p-3 mt-10 text-blackuppercase text-center  hover:cursor-pointer"
        >
          Đăng ký
        </div>
      </div>
    </div>
  );
};
