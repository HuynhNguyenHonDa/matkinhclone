import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Error from "../shareComponent/Error";
import App from "../App";
import {
  HomePage,
  ContactPage,
  ProductPage,
  InsuracePage,
  PromotionPage,
  InformationPage,
} from "../features/Pages";
import { ProductDetail } from "../features/ProductDetail/ProductDetail";
import { BlogDetails } from "../features/Blog/BlogDetails";

export const RouterList = [
  {
    path: "/Home",
    element: <HomePage />,
    name: "Trang Chủ",
  },
  // {
  //   path: "/Contact",
  //   element: <ContactPage />,
  //   name: "Liên Hệ",
  // },
  {
    path: "/Product",
    element: <ProductPage />,
    name: "Sản Phẩm",
  },
  {
    path: "/Insurace",
    element: <InsuracePage />,
    name: "Bảo Hành",
  },
  {
    path: "/Promotion",
    element: <PromotionPage />,
    name: "Ưu Đãi",
  },
  {
    path: "/Information",
    element: <InformationPage />,
    name: "Tin Tức",
  },
];

export const Router = () => {
  const addionalChildRouter = [
    {
      path: "/",
      element: <HomePage />,
      name: "Tin Tức",
    },
    {
      path: "/Product/:id",
      element: <ProductDetail />,
      name: "Sản Phẩm",
    },
    {
      path: "/Information/:slug",
      element: <BlogDetails />,
      name: "Tin Tức",
    },
  ];

  const routerChild = RouterList.concat(addionalChildRouter);
  return createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <Error />,
      children: routerChild,
    },
  ]);
};
