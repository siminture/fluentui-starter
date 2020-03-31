import React from 'react';
import { Link } from '@fluentui/react';

function RouteIndex({ route }) {
  return (
    <dl>
      <dt>
        <h3>Index of {route.name}</h3>
      </dt>
      {route.children.map(child => (
        <dd>
          <Link key={child.key} href={child.path}>
            {child.name}
          </Link>
        </dd>
      ))}
    </dl>
  );
}

export default RouteIndex;
