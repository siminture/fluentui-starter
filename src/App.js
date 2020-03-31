import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AutoSwitchLayout } from './components/layout';
import { renderRoutes } from './components/route';
import routes from './routes';

function App() {
  return (
    <Router>
      <AutoSwitchLayout>
        <Suspense fallback={<div>Loading...</div>}>
          {renderRoutes(routes)}
        </Suspense>
      </AutoSwitchLayout>
    </Router>
  );
}

export default App;
