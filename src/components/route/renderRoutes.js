import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import flattenDeep from 'lodash/flattenDeep';
import AuthorizedRoute from './AuthorizedRoute';
import ComingSoon from './ComingSoon';
import NoMatch from './NoMatch';

import RouteIndex from './RouteIndex';
import isArray from 'lodash/isArray';
import isNil from 'lodash/isNil';

export function mapConfigToRoutes(routes) {
  return routes.map(route => {
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
    return isGroup
      ? [routeComponent, ...mapConfigToRoutes(route.children)]
      : routeComponent;
  });
}

export function renderRoutes(routes) {
  const routeComponents = mapConfigToRoutes(routes);
  const flatRouteComponents = flattenDeep(routeComponents);
  // console.log(routeComponents);
  // console.log(flatRouteComponents);
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/dashboard" />
      </Route>
      {flatRouteComponents}
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}
