import React from 'react';
import {get} from 'lodash-es';
import paths from 'path';

import { hierarchize } from './util/hierarchical';

const keyName = 'key';
const pathName = 'path';
const uniqueKeyName = 'uniqueKey';

function pathGenerator(node, parent) {
  const parentUniqueKey = get(parent, uniqueKeyName);
  const uniqueKey = parentUniqueKey
    ? parentUniqueKey + '.' + node[keyName]
    : node[keyName];

  const parentPath = get(parent, pathName, '');
  const path = get(node, pathName, paths.join(parentPath, node[keyName]));
  node[uniqueKeyName] = uniqueKey;
  node[pathName] = path;
}

const routeConfig = hierarchize(
  {
    key: 'home',
    name: 'Home',
    icon: 'Home',
    path: '/',
    component: React.lazy(() => import('./components/pages/Dashboard')),
    children: [
      {
        key: 'login',
        name: 'Login',
        isPublic: true,
        isHidden: true,
        component: React.lazy(() => import('./components/pages/Login')),
      },
      {
        key: 'profile',
        name: 'Profile',
        isHidden: true
      },
      {
        key: 'order',
        name: 'Order',
        icon: 'visualizeApp',
        children: [
          {
            key: 'purchase-order',
            name: 'Purchase Order',
          },
          {
            key: 'sales-order',
            name: 'Sales Order'
          }
        ]
      },
      {
        key: 'mangement',
        name: 'System Management',
        icon: 'managementApp',
        children: [
          {
            key: 'organization',
            name: 'Organization',
            icon: 'Org'
          },
          {
            key: 'user',
            name: 'User',
            icon: 'People'
          },
          {
            key: 'authority',
            name: 'Authority',
            icon: 'SecurityGroup'
          },
          {
            key: 'settings',
            name: 'Settings',
            icon: 'Settings',
            children: [
              {
                key: 'list',
                name: 'List'
              },
              {
                key: 'unit',
                name: 'Unit'
              }
            ]
          }
        ]
      }
    ]
  },
  null,
  pathGenerator
);

console.log(routeConfig);

export default routeConfig;
