import React from 'react';
import isArray from 'lodash/isArray';
import { useHistory, useLocation, matchPath } from 'react-router-dom';
import { useSessionStorage } from 'react-use';
import { findHierarchical } from '../../libraries/hierarchize';
import { NavToggler } from './Nav';
import routes from '../../routes';

function Sidebar() {
  const history = useHistory();
  const location = useLocation();

  const homeLinkGroups = [
    {
      links: [
        {
          name: 'Collapsed',
          alternateText: 'Expanded',
          icon: 'GlobalNavButton',
          key: 'Collapsed',
          title: '展开菜单'
        }
      ],
      groupType: 'ToggleGroup'
    },
    {
      links: [
        {
          name: '主页',
          isExpanded: true,
          icon: 'Home',
          key: 'home',
          onClick: () => history.push('/')
        }
      ],
      groupType: 'MenuGroup'
    }
  ];

  const mapRoutesToNavLinks = ({ uniqueKey, name, path, children }) => {
    const isGroup = isArray(children);
    return {
      name,
      key: uniqueKey,
      alternateText: name,
      title: name,
      url: path,
      onClick: e => {
        e.preventDefault();
        e.stopPropagation();
        history.push(path);
      },
      // isExpanded: isGroup && some(paths, route => route.key === key),
      links: isGroup ? children.map(mapRoutesToNavLinks) : undefined,
      icon: isGroup ? 'DocumentSet' : 'TextDocument'
    };
  };

  const mapRouteToNavGroup = route => {
    return {
      name: route.name,
      groupType: 'MenuGroup',
      links: route.children.map(mapRoutesToNavLinks)
    };
  };

  const pageLinkGroups = routes
    .filter(route => isArray(route.children) && route.children.length > 0)
    .map(mapRouteToNavGroup);

  const navLinkGroups = homeLinkGroups.concat(pageLinkGroups);

  const [isNavCollapsed, setIsNavCollapsed] = useSessionStorage(
    'isNavCollapsed',
    false
  );

  let selectedKey = null;

  if (location.pathname === '/') {
    selectedKey = 'home';
  } else {
    const matcher = route => {
      const match = matchPath(location.pathname, route);
      return match && match.isExact;
    };
    const currentPage = findHierarchical(routes, matcher);
    selectedKey = currentPage ? currentPage.uniqueKey : null;
    console.log(currentPage, selectedKey);
  }

  return (
    <NavToggler
      groups={navLinkGroups}
      enableCustomization={true}
      selectedKey={selectedKey}
      isNavCollapsed={isNavCollapsed}
      onNavCollapsedCallback={setIsNavCollapsed}
    />
  );
}

export default Sidebar;
