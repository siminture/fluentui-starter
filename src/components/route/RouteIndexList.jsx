import React from "react";
import { RouteLink } from "./RouteLink";

export function RouteIndexList({ route }) {
  return (
    <dl>
      <dt>
        <h3>Index of {route.name}</h3>
      </dt>
      {route.children.map((child) => (
        <dd key={child.key}>
          <RouteLink href={child.path}>{child.name}</RouteLink>
        </dd>
      ))}
    </dl>
  );
}
