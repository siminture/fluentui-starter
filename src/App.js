import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {ProgressIndicator} from '@fluentui/react';
import { AutoSwitchLayout } from './components/layout';
import { renderRoutes } from './components/route';
import routeConfig from './routeConfig';

function App() {
  return (
    <Router>
      <AutoSwitchLayout>
        <Suspense fallback={<ProgressIndicator label="Page loading..." />}>
          {renderRoutes(routeConfig)}
        </Suspense>
      </AutoSwitchLayout>
    </Router>
  );
}

export default App;
