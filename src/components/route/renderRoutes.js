import React from "react";
import { Switch, Route } from "react-router-dom";
import { flattenDeep, isArray, isNil } from "lodash";
import AuthorizedRoute from "./AuthorizedRoute";
import RouteIndex from "./RouteIndex";
import ComingSoon from "../../pages/ComingSoon";
import NoMatch from "../../pages/NoMatch";

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
      isPublic={route.isPublic}
    >
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
