import React from "react";
import { isArray } from "lodash";
import { useHistory, useLocation, matchPath } from "react-router-dom";
import { NavToggler } from "./Nav";
import { findNode, getParents } from "global/hierarchical";
import routes from "routes";

function findRoute(pathname) {
  const current = findNode(routes, (route) => {
    const match = matchPath(pathname, route);
    return match?.isExact;
  });
  const paths = current ? getParents(current) : [];
  return { current, paths };
}

function isVisible(route) {
  return route.isHidden !== true;
}

function hasChildren(route) {
  return route?.children?.filter(isVisible).length;
}

export function Sidebar() {
  const history = useHistory();
  const { pathname } = useLocation();

  const { current, paths } = findRoute(pathname);

  function mapRouteToNavLink(route, deeply = true) {
    return {
      name: route.name,
      key: route.uniqueKey,
      alternateText: route.name,
      title: route.name,
      url: route.path,
      onClick: (e) => {
        e.preventDefault();
        history.push(route.path);
      },
      isExpanded:
        deeply &&
        hasChildren(route) &&
        paths.some((that) => that.uniqueKey === route.uniqueKey),
      links:
        deeply &&
        hasChildren(route) &&
        route.children
          .filter(isVisible)
          .map((child) => mapRouteToNavLink(child, deeply)),
      icon: route.icon
        ? route.icon
        : hasChildren(route)
        ? "DocumentSet"
        : "TextDocument",
    };
  }

  const homeLink = mapRouteToNavLink(routes, false);
  const topPageLinks = routes.children
    .filter((route) => isVisible(route) && !isArray(route.children))
    .map((route) => mapRouteToNavLink(route, false));

  const groupLinks = routes.children.filter(hasChildren).map((route) => ({
    name: route.name,
    groupType: "MenuGroup",
    links: route.children
      .filter(isVisible)
      .map((child) => mapRouteToNavLink(child, true)),
  }));

  const navLinkGroups = [
    {
      links: [
        {
          key: "Collapse",
          name: "Collapsed",
          alternateText: "Expanded",
          icon: "GlobalNavButton",
          title: "Collapse",
        },
      ],
      groupType: "ToggleGroup",
    },
    {
      links: [homeLink, ...topPageLinks],
      groupType: "MenuGroup",
    },
    ...groupLinks,
  ];

  return <NavToggler groups={navLinkGroups} selectedKey={current?.uniqueKey} />;
}
