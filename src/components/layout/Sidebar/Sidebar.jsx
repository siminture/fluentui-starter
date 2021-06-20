import React from "react";
import isArray from "lodash/isArray";
import { useHistory } from "react-router-dom";
import { NavToggler } from "./Nav";
import { useRoutePath } from "components/route";
import routeConfig from "routeConfig";

function isVisible(route) {
  return !route.isHidden;
}

export function Sidebar() {
  const history = useHistory();
  const { current, paths } = useRoutePath();

  const homeLink = mapRouteToNavLink(routeConfig, false);
  const topPageLinks = routeConfig.children
    .filter((route) => isVisible(route) && !isArray(route.children))
    .map((route) => mapRouteToNavLink(route, false));

  const groupLinks = routeConfig.children.filter(hasChildren).map((route) => ({
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

  function hasChildren(route) {
    return route?.children?.filter(isVisible).length;
  }
}
