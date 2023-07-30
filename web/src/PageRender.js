import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NotFound from "./components/shared/NotFound";
import { defineRoutesByRole } from "./utils/constants";

const generatePage = (pageName) => {
  const component = () => require(`./pages/${pageName}`).default;

  try {
    return React.createElement(component());
  } catch (error) {
    return <NotFound />;
  }
};

const PageRender = () => {
  const { page, id } = useParams();
  const { auth } = useSelector((state) => state);
  const urlListByRole = defineRoutesByRole[auth.user?.role - 1];

  const isContains = urlListByRole?.some((url) => `/${page}` === url);
  if (!isContains) {
    return <NotFound />;
  }

  let pageName = "";
  if (auth.token) {
    if (id) {
      pageName = `${page}/[id]`;
    } else {
      pageName = `${page}`;
    }
  }

  return generatePage(pageName);
};

export default PageRender;
