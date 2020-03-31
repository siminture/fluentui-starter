import React from 'react';
import get from 'lodash/get';
import hierarchize from './libraries/hierarchize';

const routes = [
  {
    key: 'login',
    name: 'Login',
    isPublic: true,
    isHidden: true,
    component: React.lazy(() => import('./pages/Login'))
  },
  {
    key: 'dashboard',
    name: 'Dashboard',
    icon: 'dashboardApp',
    component: React.lazy(() => import('./pages/dashboard'))
  },
  {
    key: 'order',
    name: 'Order',
    icon: 'visualizeApp',
    children: [
      {
        key: 'purchase-order',
        name: 'Purchase Order',
        component: React.lazy(() => import('./pages/order/purchase'))
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
        name: 'Organization Management',
        children: [
          {
            key: 'user',
            name: 'User Management'
          },
          {
            key: 'authority',
            name: 'Authority'
          },
          {
            key: 'setting',
            name: 'System Settings'
          }
        ]
      },
      {
        key: 'user',
        name: 'User Management'
      },
      {
        key: 'authority',
        name: 'Authority'
      },
      {
        key: 'setting',
        name: 'System Settings'
      }
    ]
  }
];

const keyName = 'key';
const pathName = 'path';
const pathsName = '__paths';
const uniqueKeyName = 'uniqueKey';

function keyGenerator(node, parent) {
  const parentPaths = get(parent, pathsName, []);
  const paths = [...parentPaths, node[keyName]];
  node[pathsName] = paths;
  node[pathName] = '/' + paths.join('/');
  node[uniqueKeyName] = paths.join('.');
}

hierarchize(routes, null, keyGenerator);

// console.log(routes);

export default routes;
