import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchBlogAsync } from "../../redux/slice/blogSlice/blogSlice";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './BlogList.css'

export const BlogList = () => {
  const blogList = useAppSelector((state) => state.blog.blogs);
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const [isShowFull, setIsShowFull] = useState(false);

  useEffect(() => {
    dispatch(fetchBlogAsync());
  }, []);
  const handleClickBlog = (slug?: string) => {
    navigator("/Information/" + slug);
  };

  return (
    <>
      <div className="md:p-10 p-5 grid md:grid-cols-1 gap-10 justify-center items-center">
        {blogList &&
          blogList.length > 0 &&
          blogList
            .slice(0, isShowFull ? blogList.length - 1 : 20)
            .map((blog) => {
              return (
                <>
                  <div
                    onClick={() => handleClickBlog(blog.slug)}
                    className="flex padding-5 md:gap-5 hover:cursor-pointer margin-left"
                  >
                    <div className="overflow-hidden ">
                      <Box
                        className="m-auto border border-gray-300 rounded-lg"
                        component="img"
                        sx={{
                          height: 300,
                          maxHeight: { xs: 170, md: 270 },
                          // maxWidth: { xs: 300, md: 300 },
                          width: {xs: 350, md: 350}
                        }}
                        alt="The house from the offer."
                        src={blog.thumbnail}
                      ></Box>
                    </div>
                    <div className="ml-5">
                      <h3 className=" text-sm md:text-xl">
                        {blog.title}
                      </h3>
                      <p className="text-xs md:text-md">{blog.preview_body}</p>
                      <div className="flex justify-between pt-2">
                        <p className=" text-xs">
                          {blog.date_display}
                        </p>
                        <p className="text-xs">
                          {blog.author_display}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
      </div>
      {blogList && blogList.length > 20 && (
        <p
          onClick={() => {
            setIsShowFull(!isShowFull);
          }}
          className="uppercase text-xs text-center hover:cursor-pointer"
        >
          {!isShowFull ? "xem thêm" : "Ẩn"}
        </p>
      )}
    </>
  );
};
