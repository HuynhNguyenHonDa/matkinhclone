import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchBlogAsync } from "../../redux/slice/blogSlice/blogSlice";

export const SupperCombo = () => {
  const supperComboBackground = useAppSelector(
    (state) => state.config.configImage?.inform_backgroud
  );
  const blog = useAppSelector((state) => state.blog.blogs);
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const handleOpenMoreInform = () => {
    navigator("/Information");
  };

  useEffect(() => {
    dispatch(fetchBlogAsync());
  }, [blog?.length]);

  return (
    <div className="overflow-hidden border-2 relative p-10 items-center flex h-full">
      {blog && blog.length > 0 && blog[0].body && (
        <>
          <div
            className={`justify-center bg-no-repeat bg-cover bg-center absolute h-full w-full object-cover`}
            style={{
              backgroundImage: `URL(${blog[0].thumbnail})`,
            }}
          ></div>
          <div
            onClick={handleOpenMoreInform}
            className="mx-5 relative bg-white md:w-1/2 p-10 md:mx-20 rounded-xl shadow-md hover:cursor-pointer"
          >
            <span className="text-lg md:text-3xl font-sans font-montserrat font-serif uppercase">
              {blog[0].title}
            </span>
            <div
              className="py-5 font-sans font-montserrat font-serif md:text-md text-xs"
              dangerouslySetInnerHTML={{
                __html: blog[0].body,
              }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
};
