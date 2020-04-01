import React from 'react';
import { Switch, Route } from 'react-router-dom';
import flattenDeep from 'lodash/flattenDeep';
import AuthorizedRoute from './AuthorizedRoute';
import ComingSoon from './ComingSoon';
import NoMatch from './NoMatch';

import RouteIndex from './RouteIndex';
import isArray from 'lodash/isArray';
import isNil from 'lodash/isNil';

export function mapConfigToRoutes(route) {
  const isGroup = isArray(route.children);
  const PageComponent = isNil(route.component)
    ? isGroup
      ? RouteIndex
      : ComingSoon
    : route.component;

  const routeComponent = (
    <AuthorizedRoute
      key={route.uniqueKey}
      path={route.path}
      exact={route.exact || isArray(route.children)}
      strict={route.strict}
      isPublic={route.isPublic}>
      <PageComponent route={route} />
    </AuthorizedRoute>
  );

  const childComponents = isGroup ? route.children.map(mapConfigToRoutes) : [];
  return [routeComponent, ...childComponents];
}

export function renderRoutes(routeConfig) {
  const routeComponents = mapConfigToRoutes(routeConfig);
  const flatRouteComponents = flattenDeep(routeComponents);
  // console.log(routeComponents);
  // console.log(flatRouteComponents);
  return (
    <Switch>
      {flatRouteComponents}
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}
