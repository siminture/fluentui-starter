import React from 'react';
import { useLocation } from 'react-router-dom';

export default function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>Coming soon.</h3>
      <p>
        The requested Page <code>{location.pathname}</code> is coming soon.
      </p>
    </div>
  );
}
