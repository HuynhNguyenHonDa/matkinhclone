import { Box, FormControl, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  isLoading,
  authRequestAsync,
} from "../../redux/slice/authenticationSlice/authSlice";
import { Spinner } from "../../common/Spinner";

export const Login = () => {
  const dispatch = useAppDispatch();
  const loadingState = useAppSelector(isLoading);
  const [isLoadingState, setisLoadingState] = useState(false);
  const [authenticationInform, setAuthenticationInform] = useState({
    email: "",
    password: "",
  });
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
    const value = event.target.value;
    const name = event.target.name;
    setAuthenticationInform({ ...authenticationInform, [name]: value });
  };

  const handleLogin = () => {
    dispatch(authRequestAsync({ ...authenticationInform }));
  };
  return (
    <div>
      {isLoadingState ? (
        <Spinner />
      ) : (
        <Box className="m-2 p-2 ">
          <FormControl variant="standard">
            <TextField
              id="input-with-icon-textfield"
              name="email"
              label="Email"
              onChange={(e) => handleChange(e)}
              variant="standard"
            />
            <TextField
              type={"password"}
              name="password"
              id="input-with-icon-textfield"
              label="Password"
              onChange={(e) => handleChange(e)}
              variant="standard"
            />
          </FormControl>
        </Box>
      )}
      <Button onClick={handleLogin}>Log In</Button>
    </div>
  );
};
