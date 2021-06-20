import React from "react";

const routes = {
  key: "home",
  name: "Home",
  icon: "Home",
  path: "/",
  component: React.lazy(() => import("./pages/Dashboard")),
  children: [
    {
      key: "login",
      name: "Login",
      isPublic: true,
      isHidden: true,
      component: React.lazy(() => import("./pages/Login")),
    },
    {
      key: "profile",
      name: "Profile",
      isHidden: true,
    },
    {
      key: "order",
      name: "Order",
      icon: "visualizeApp",
      children: [
        {
          key: "purchase-order",
          name: "Purchase Order",
        },
        {
          key: "sales-order",
          name: "Sales Order",
        },
      ],
    },
    {
      key: "mangement",
      name: "System Management",
      icon: "managementApp",
      children: [
        {
          key: "organization",
          name: "Organization",
          icon: "Org",
        },
        {
          key: "user",
          name: "User",
          icon: "People",
        },
        {
          key: "authority",
          name: "Authority",
          icon: "SecurityGroup",
        },
        {
          key: "settings",
          name: "Settings",
          icon: "Settings",
          children: [
            {
              key: "list",
              name: "List",
            },
            {
              key: "unit",
              name: "Unit",
            },
          ],
        },
      ],
    },
  ],
};

export default routes;
