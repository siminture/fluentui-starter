import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AutoSwitchLayout } from './components/layout';
import { renderRoutes } from './components/route';
import routeConfig from './routeConfig';

function App() {
  return (
    <Router>
      <AutoSwitchLayout>
        <Suspense fallback={<div>Loading...</div>}>
          {renderRoutes(routeConfig)}
        </Suspense>
      </AutoSwitchLayout>
    </Router>
  );
}

export default App;
