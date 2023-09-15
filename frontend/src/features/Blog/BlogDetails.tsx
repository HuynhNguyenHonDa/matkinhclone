import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getBlogDetailAsync } from "../../redux/slice/blogSlice/blogSlice";

export const BlogDetails = () => {
  const blogDetail = useAppSelector((state) => state.blog.selectedBlog);
  const dispatch = useAppDispatch();
  const getParams = useParams();

  useEffect(() => {
    if (!getParams.slug) return;
    dispatch(getBlogDetailAsync(getParams.slug));
  }, [getParams.slug]);
  return (
    <div className="m-auto text-center">
      <div className="overflow-hidden relative h-96 items-center w-full">
      {/* <div className="h-96"> */}
        <div
          className={`bg-no-repeat bg-cover bg-center absolute h-full w-full object-cover`}
          style={{
            backgroundImage: `URL(${blogDetail?.thumbnail})`,
          }}
        ></div>
      </div>
      {/* <div className="w-2/3 m-auto"> */}
      <div className="">
        <h2 className="md:p-10 text-xl py-10 md:text-4xl text-left ml-5 mr-5 font-bold text-center">{blogDetail?.title}</h2>
        <div className="text-left ml-5 mr-5 text-justify"
          dangerouslySetInnerHTML={{
            __html: blogDetail?.body ? blogDetail?.body : "Not Found Content!",
          }}
        ></div>
      </div>
    </div>
  );
};
