import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RouterList } from "../../../common/Router";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchTreeCategoryAsync } from "../../../redux/slice/categorySlice/categorySlice";
import { fetchProductByCategoryAsync } from "../../../redux/slice/productSlice/productSlice";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";

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
                className="uppercase hover:text-blue-400 text-xs md:text-md lg:text-lg"
              >
                <Link to={router.path}>{router.name}</Link>
                {isHovering && (
                  <div
                    className={`absolute text-black z-50 bg-stone-100 right-20 p-5 gap-5 grid grid-cols-5 text-center`}
                  >
                    {categoryTree?.map((cat) => {
                      return (
                        <div className="">
                          <h3 className="text-sm  w-full font-semibold md:text-lg">
                            {cat.name}
                          </h3>
                          <ul>
                            {cat.children?.map((child) => {
                              return (
                                <li
                                  onClick={() =>
                                    handleClickOnCategory(child.id ?? 0)
                                  }
                                  className="text-xs font-normal p-2 hover:text-blue-500 hover:cursor-pointer"
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
