import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RouterList } from "../../../common/Router";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchTreeCategoryAsync } from "../../../redux/slice/categorySlice/categorySlice";
import { fetchProductByCategoryAsync } from "../../../redux/slice/productSlice/productSlice";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";
import './NavBar.css'

const NavBar = () => {
  const [isHovering, setIsHovering] = useState(false);
  const dispatch = useAppDispatch();
  const categoryTree = useAppSelector((state) => state.category.categoryTree);
  const navigator = useNavigate();

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  useEffect(() => {
    dispatch(fetchTreeCategoryAsync());
  }, []);

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleClickOnCategory = (id: number) => {
    dispatch(fetchProductByCategoryAsync(id));
    navigator("/Product");
    setIsHovering(false);
  };

  return (
    <div className="hidden md:flex md:justify-between md:p-1 lg:px-20 sticky top-0 bg-white z-30 shadow-lg">
      <LeftNav />
      <nav className="self-center">
        <ul className="flex gap-8 lg:gap-20">
          {RouterList.map((router) => {
            return router.path === "/Product" ? (
              <li
                onMouseOver={() => handleMouseOver()}
                onMouseLeave={() => handleMouseOut()}
                className="uppercase  hover:text-blue-400 text-xs md:text-md lg:text-lg"
              >
                <Link to={router.path}>{router.name}</Link>
                {isHovering && (
                  <div
                    className={`absolute text-black z-50 bg-white  right-20 pr-4 pt-7 pl-0 pr-0  gap-7 w-1/03 grid grid-cols-5 text-left  ml-20`}
                  >
                    {categoryTree?.map((cat) => {
                      return (
                        <div className="">
                          <h3 className="text-sm w-full text-center md:text-lg ">
                            {cat.name}
                          </h3>
                          <ul>
                            {cat.children?.map((child) => {
                              return (
                                <li
                                  onClick={() =>
                                    handleClickOnCategory(child.id ?? 0)
                                  }
                                  className="text-xs p-1 hover:text-blue-500 hover:cursor-pointer "
                                >
                                  {child.name}
                                  <br></br>
                                </li>
                                
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                )}
              </li>
            ) : (
              <li className="uppercase hover:text-blue-400 text-xs lg:text-lg">
                <Link to={router.path}>{router.name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <RightNav />
    </div>
  );
};

export default NavBar;
