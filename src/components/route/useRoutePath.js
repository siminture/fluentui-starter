import { useLocation, matchPath } from 'react-router-dom';
import { findNode, getParents } from '../../libraries/hierarchical';
import routeConfig from '../../routeConfig';

export function findRoute(pathname) {
  const matcher = route => {
    const match = matchPath(pathname, route);
    return match && match.isExact;
  };
  const current = findNode(routeConfig, matcher);
  const paths = current ? getParents(current) : [];
  return {
    current,
    paths
  };
}

export default function useRoutePath() {
  const { pathname } = useLocation();
  return findRoute(pathname);
}
