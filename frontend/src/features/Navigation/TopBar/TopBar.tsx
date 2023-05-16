import React, { useEffect, useRef, useState } from "react";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { Authentication } from "../../Authentication/Authentication";
import { Menu } from "@mui/icons-material";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import {
  checkValidTokenAsync,
  isAuthenticated,
  logout,
} from "../../../redux/slice/authenticationSlice/authSlice";
import { useAppSelector } from "../../../redux/hooks";
import { useCickOutside } from "../../../hooks/useClickOutside";
import { useAppDispatch } from "../../../redux/hooks";
import { totalOrdered } from "../../../redux/slice/shoppingCartSlice/shoppingCartSlice";
import { RouterList } from "../../../common/Router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import ArrowLeft from "@mui/icons-material/ArrowLeft";
import { ShoppingCart } from "../../ShoppingCart/ShoppingCart";
import { fetchProductByCategoryAsync } from "../../../redux/slice/productSlice/productSlice";

const TopBar = () => {
  const wrapperRef = useRef(null);
  const shoppingCartRef = useRef(null);
  const isClickOutsideAuth = useCickOutside(wrapperRef);
  const menuRef = useRef(null);
  const isClickOutsideMenu = useCickOutside(menuRef);
  const isClickOutsideShoppingCart = useCickOutside(shoppingCartRef);
  const isAuth = useAppSelector(isAuthenticated);
  const [isOpenAuthentication, setIsOpenAuthentication] = useState(false);
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state) => state.authentication.userName);
  const totalOrder = useAppSelector(totalOrdered);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenShoppingCart, setIsOpenShoppingCart] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    if (isClickOutsideAuth) {
      setIsOpenAuthentication(false);
    }
    if (isClickOutsideShoppingCart) {
      setIsOpenShoppingCart(false);
    }
    if (isClickOutsideMenu) {
      setIsOpenMenu(false);
      setIsOpenAuthentication(false);
    }
  }, [isClickOutsideAuth, isClickOutsideShoppingCart, isClickOutsideMenu]);

  useEffect(() => {
    dispatch(checkValidTokenAsync());
  }, []);

  const [isShowFullProductCategory, setIsShowFullProductCategory] =
    useState(false);
  const triggerAuthentication = () => {
    setIsOpenAuthentication(!isOpenAuthentication);
  };
  const handleLogout = () => {
    dispatch(logout());
    setIsOpenAuthentication(true);
  };
  const handleOpenTreeCategoryMobile = () => {};
  const triggerMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const triggerShoppingCart = () => {
    setIsOpenShoppingCart(!isOpenShoppingCart);
  };
  const openFullCategory = () => {
    setIsShowFullProductCategory(!isShowFullProductCategory);
  };
  const categoryTree = useAppSelector((state) => state.category.categoryTree);
  const handleClickOnCategory = (id: number) => {
    dispatch(fetchProductByCategoryAsync(id));
    navigator("/Product");
    setIsOpenMenu(false);
  };

  return (
    <div className="fixed md:static w-full z-20">
      <div className="hidden md:flex justify-between p-2 font-light bg-[#1E90FF] text-white overflow-hidden">
        <div className="flex justify-between gap-2 self-center px-10">
          <div className="p-1">
            <BsTelephone />
          </div>
          <p className="w-40">0983 523 067</p>
        </div>
        <div className="w-full z-0 self-center overflow-hidden">
          <div className="uppercase text-white font-semibold welcomeAnimation text-xs md:text-md right-0">
            MẮT KÍNH BẢO TÍN kính chào quý khách
          </div>
        </div>
        <div ref={wrapperRef} className="flex gap-2 p-1 px-8 z-10">
          {isAuth ? (
            <div className="flex gap-2 p-1 px-8">
              <span>Hi! {userName},</span>
              <span
                className="hover:cursor-pointer hover:font-bold"
                onClick={handleLogout}
              >
                Đăng Xuất
              </span>
            </div>
          ) : (
            <></>
          )}
          {/* {isOpenAuthentication && !isAuth && (
            <div className="absolute bg-opacity-90 bg-stone-200 z-50 p-5 m-10 right-5">
              <Authentication />
            </div>
          )} */}
        </div>
      </div>
      <div className="md:hidden flex justify-between px-2 font-light bg-[#1E90FF] text-white">
        <div onClick={triggerMenu} className="m-2 z-10">
          <Menu></Menu>
        </div>
        {isOpenMenu && (
          <div
            ref={menuRef}
            className="absolute bg-white h-screen w-2/3 overflow-y-auto"
          >
            <div>
              <div
                onClick={triggerMenu}
                className="text-black p-5 relative right-0"
              >
                <ArrowBackIosIcon className="right-5 absolute"></ArrowBackIosIcon>
              </div>
              <nav>
                <ul className="">
                  {RouterList.map((router) => {
                    return router.path === "/Product" ? (
                      <li
                        onClick={handleOpenTreeCategoryMobile}
                        className="uppercase text-xs md:text-md font-semibold text-black p-5 justify-between"
                      >
                        <div>
                          <div className="flex justify-between self-center">
                            <span onClick={openFullCategory}>
                              {router.name}
                            </span>
                            {!isShowFullProductCategory ? (
                              <ArrowLeft
                                color="primary"
                                fontSize="small"
                              ></ArrowLeft>
                            ) : (
                              <ArrowDropDown
                                color="primary"
                                fontSize="small"
                              ></ArrowDropDown>
                            )}
                          </div>
                          {isShowFullProductCategory &&
                            categoryTree?.map((cat) => {
                              return (
                                <div className="">
                                  <h3 className="text-sm p-5 w-full font-semibold md:text-lg">
                                    {cat.name}
                                  </h3>
                                  <ul>
                                    {cat.children?.map((child) => {
                                      return (
                                        <li
                                          onClick={() =>
                                            handleClickOnCategory(child.id ?? 0)
                                          }
                                          className="text-xs font-normal p-5 hover:cursor-pointer"
                                        >
                                          {child.name}
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              );
                            })}
                        </div>
                      </li>
                    ) : (
                      <li className="uppercase text-xs md:text-md font-semibold text-black p-5">
                        <Link to={router.path}>{router.name}</Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
            {/* <div className="text-black bottom-5 p-5">
              <div ref={wrapperRef} className="flex">
                {isAuth ? (
                  <div className="flex gap-2 p-1 text-xs">
                    <span>Hi! {userName},</span>
                    <span
                      className="hover:cursor-pointer font-bold"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </span>
                  </div>
                ) : (
                  <div className="flex" onClick={triggerAuthentication}>
                    <span className="p-1">
                      <AiOutlineUser size={18} />
                    </span>
                    <span className="hover:cursor-pointer font-bold">
                      Đăng nhập
                    </span>
                  </div>
                )}
                {isOpenAuthentication && !isAuth && (
                  <div className="absolute bg-opacity-90 bg-stone-200 z-50 p-5 -top-96">
                    <Authentication />
                  </div>
                )}
              </div>
            </div> */}
          </div>
        )}
        <div className="w-full z-0 self-center overflow-hidden">
          <div className="uppercase text-white font-semibold welcomeAnimation text-xs md:text-md right-0">
            MẮT KÍNH BẢO TÍN kính chào quý khách
          </div>
        </div>
        <div className="flex my-3 z-10">
          {isOpenShoppingCart ? <ShoppingCart ref={shoppingCartRef} /> : <></>}
          <FiShoppingCart size={16} onClick={triggerShoppingCart} />
          <span className="absolute top-0.5 right-1 text-red-500 font-bold text-xs">
            {totalOrder}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
