import { Box, FormControl, TextField, Button } from "@mui/material";
import {
  isLoading,
  registerRequestAsync,
} from "../../redux/slice/authenticationSlice/authSlice";
import { RegisterModel } from "../../models/register";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Spinner } from "../../common/Spinner";

const registerFields = [
  { title: "Email", name: "email" },
  { title: "Password", name: "password" },
  { title: "Last Name", name: "firstname" },
  { title: "First Name", name: "lastname" },
  { title: "Phone", name: "phone" },
  { title: "Address", name: "address" },
];
export const Register = () => {
  const registerInit: RegisterModel = {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
  };
  const dispatch = useAppDispatch();
  const loadingState = useAppSelector(isLoading);
  const [registerInform, setRegisterInform] = useState(registerInit);
  const [isLoadingState, setisLoadingState] = useState(false);

  useEffect(() => {
    if (loadingState === "loading") {
      setisLoadingState(true);
      return;
    }
    setisLoadingState(false);
    if (loadingState === "fulfilled") {
      return;
    }
    if (loadingState === "failed") {
      console.log("Login failed");
    }
  }, [loadingState]);

  const handleChange = (event: any) => {
    setRegisterInform({
      ...registerInform,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegister = () => {
    dispatch(registerRequestAsync({ ...registerInform }));
  };
  return (
    <div>
      {isLoadingState ? (
        <Spinner />
      ) : (
        <Box className="m-2 p-2">
          <FormControl variant="standard">
            {registerFields.map((field) => {
              return (
                <TextField
                  type={field.name === "password" ? "password" : "text"}
                  id="input-with-icon-textfield"
                  name={field.name}
                  label={field.title}
                  onChange={(e) => handleChange(e)}
                  variant="standard"
                  size="small"
                />
              );
            })}
          </FormControl>
        </Box>
      )}
      <Button onClick={handleRegister}>Sign Up</Button>
    </div>
  );
};
