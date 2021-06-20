import { useLocation, matchPath } from "react-router-dom";
import { findNode, getParents } from "global/hierarchical";
import routeConfig from "routeConfig";

export function findRoute(pathname) {
  const current = findNode(routeConfig, (route) => {
    const match = matchPath(pathname, route);
    return match?.isExact;
  });
  const paths = current ? getParents(current) : [];
  return { current, paths };
}

export function useRoutePath() {
  const { pathname } = useLocation();
  return findRoute(pathname);
}
