import { useEffect } from "react";
import { TopBar, NavBar } from "./features/Navigation";
import { Outlet } from "react-router-dom";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { categoryFetchAsync } from "./redux/slice/categorySlice/categorySlice";
import { Footer } from "./features/Footer/Footer";
import { Divider } from "@mui/material";
import { fetchFontAsync } from "./redux/slice/configSlice/configSlice";

function App() {
  const dispatch = useAppDispatch();
  const fontFamily = useAppSelector((state) => state.config.font);
  useEffect(() => {
    dispatch(categoryFetchAsync());
    dispatch(fetchFontAsync());
  }, []);
  return (
    <div style={{ fontFamily: fontFamily }}>
      <TopBar />
      <NavBar />
      <Outlet />
      {/* <Divider color={"#efebe9"} /> */}
      <div className="mt0">
        <Divider className="p-5 font-bold text-xl md:text-2xl uppercase text-black" color={"inherit"}>
          thông tin Mắt Kính Bảo Tín
        </Divider>
        <Footer />
      </div>
    </div>
  );
}

export default App;
