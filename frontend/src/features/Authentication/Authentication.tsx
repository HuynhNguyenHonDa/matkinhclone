import React, { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";

export enum formList {
  login = "Login",
  register = "Register",
}

export const Authentication = ({ formSelect = formList.login }) => {
  const [formSelected, setformSelected] = useState(formSelect);

  const handleFormSelect = (formSelected: formList) => {
    setformSelected(formSelected);
  };
  return (
    <div className="text-center text-slate-800 md:h-full h-screen">
      <h1 className="text-md md:text-xl font-sans font-montserrat font-serif">Welcom to Bao Tin</h1>
      {formSelected === formList.login && <Login />}
      {formSelected === formList.register && <Register />}
      <div className="flex gap-5 p-10 justify-between text-sm">
        <button
          className="hover:underline underline-offset-4	"
          onClick={() => handleFormSelect(formList.login)}
        >
          Login
        </button>
        <button
          className="hover:underline underline-offset-4	"
          onClick={() => handleFormSelect(formList.register)}
        >
          Register
        </button>
      </div>
    </div>
  );
};
