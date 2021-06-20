import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProgressIndicator, styled } from "@fluentui/react";
import { get, isArray, isNil, flattenDeep } from "lodash";
import path from "path";
import { AutoSwitchLayout } from "./components/layout";
import {
  AuthorizedRoute,
  RouteIndexList,
  ComingSoon,
  NoMatch,
} from "./components/route";
import { hierarchize } from "./global/hierarchical";
import routes from "./routes";

const keyName = "key";
const pathName = "path";
const uniqueKeyName = "uniqueKey";

function generateRoutePath(node, parent) {
  const parentUniqueKey = get(parent, uniqueKeyName);
  const uniqueKey = parentUniqueKey
    ? parentUniqueKey + "." + node[keyName]
    : node[keyName];

  const parentPath = get(parent, pathName, "");
  const routePath = get(node, pathName, path.join(parentPath, node[keyName]));
  node[uniqueKeyName] = uniqueKey;
  node[pathName] = routePath;
}

function renderRoute(route) {
  const isGroup = isArray(route.children);
  const PageComponent = isNil(route.component)
    ? isGroup
      ? RouteIndexList
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

  const childComponents = isGroup ? route.children.map(renderRoute) : [];
  return [routeComponent, ...childComponents];
}

function App({ theme }) {
  const { semanticColors } = theme;
  React.useLayoutEffect(() => {
    document.body.style.backgroundColor = semanticColors.bodyBackground;
    document.body.style.color = semanticColors.bodyText;
  }, [semanticColors]);

  const routeList = hierarchize(routes, null, generateRoutePath);

  const routeComponents = renderRoute(routeList);
  const flatRouteComponents = flattenDeep(routeComponents);

  return (
    <Router>
      <AutoSwitchLayout>
        <Suspense fallback={<ProgressIndicator label="Page loading..." />}>
          <Switch>
            {flatRouteComponents}
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Suspense>
      </AutoSwitchLayout>
    </Router>
  );
}

export default styled(App);
