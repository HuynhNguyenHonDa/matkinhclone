import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchBlogAsync } from "../../redux/slice/blogSlice/blogSlice";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
      <div className="md:p-10 p-5 grid md:grid-cols-2 gap-10 justify-center items-center">
        {blogList &&
          blogList.length > 0 &&
          blogList
            .slice(0, isShowFull ? blogList.length - 1 : 4)
            .map((blog) => {
              return (
                <>
                  <div
                    onClick={() => handleClickBlog(blog.slug)}
                    className="flex padding-5 md:gap-5 md:h-56 m-auto hover:cursor-pointer"
                  >
                    <div className="w-32 h-32 md:w-52 md:h-52 overflow-hidden">
                      <Box
                        className="m-auto"
                        component="img"
                        sx={{
                          height: 500,
                          maxHeight: { xs: 300, md: 500 },
                          maxWidth: { xs: 300, md: 300 },
                        }}
                        alt="The house from the offer."
                        src={blog.thumbnail}
                      ></Box>
                    </div>
                    <div className="px-5 w-64 md:w-96">
                      <h3 className="font-bold text-sm md:text-xl">
                        {blog.title}
                      </h3>
                      <p className="text-xs md:text-md">{blog.preview_body}</p>
                      <div className="flex justify-between pt-2">
                        <p className="font-extralight text-xs">
                          {blog.date_display}
                        </p>
                        <p className="text-xs font-bold">
                          {blog.author_display}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
      </div>
      {blogList && blogList.length > 4 && (
        <p
          onClick={() => {
            setIsShowFull(!isShowFull);
          }}
          className="uppercase font-light text-xs text-center hover:cursor-pointer"
        >
          {!isShowFull ? "xem thêm" : "Ẩn"}
        </p>
      )}
    </>
  );
};
