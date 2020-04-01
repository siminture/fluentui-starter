import React from 'react';
import isArray from 'lodash/isArray';
import { useHistory } from 'react-router-dom';
import { NavToggler } from './Nav';
import routeConfig from '../../routeConfig';
import useRoutePath from '../route/useRoutePath';

function isVisible(route) {
  return route.isHidden !== true;
}

function hasChildren(route) {
  return isArray(route.children) && route.children.filter(isVisible).length > 0;
}

function Sidebar() {
  const history = useHistory();

  const { current, paths } = useRoutePath();
  const selectedKey = current ? current.uniqueKey : null;

  const mapRouteToNavLink = (route, deeply = true) => {
    const isGroup = hasChildren(route);
    return {
      name: route.name,
      key: route.uniqueKey,
      alternateText: route.name,
      title: route.name,
      url: route.path,
      onClick: e => {
        e.preventDefault();
        history.push(route.path);
      },
      isExpanded:
        deeply &&
        isGroup &&
        paths.some(that => that.uniqueKey === route.uniqueKey),
      links:
        deeply && isGroup
          ? route.children
              .filter(isVisible)
              .map(child => mapRouteToNavLink(child, deeply))
          : undefined,
      icon: route.icon ? route.icon : isGroup ? 'DocumentSet' : 'TextDocument'
    };
  };

  const homeLink = mapRouteToNavLink(routeConfig, false);
  const topPageLinks = routeConfig.children
    .filter(route => isVisible(route) && !isArray(route.children))
    .map(route => mapRouteToNavLink(route, false));

  const groupLinks = routeConfig.children
    .filter(route => hasChildren(route))
    .map(route => {
      return {
        name: route.name,
        groupType: 'MenuGroup',
        links: route.children
          .filter(isVisible)
          .map(child => mapRouteToNavLink(child, true))
      };
    });

  const navLinkGroups = [
    {
      links: [
        {
          key: 'Collapse',
          name: 'Collapsed',
          alternateText: 'Expanded',
          icon: 'GlobalNavButton',
          title: 'Collapse'
        }
      ],
      groupType: 'ToggleGroup'
    },
    {
      links: [homeLink, ...topPageLinks],
      groupType: 'MenuGroup'
    },
    ...groupLinks
  ];

  return (
    <NavToggler
      groups={navLinkGroups}
      enableCustomization={true}
      selectedKey={selectedKey}
    />
  );
}

export default Sidebar;
