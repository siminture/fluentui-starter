import React, { Suspense } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProgressIndicator, styled } from '@fluentui/react';

import { AutoSwitchLayout } from './components/layout';
import { renderRoutes } from './components/util/route';
import routeConfig from './routeConfig';

function App({ theme }) {
  const { semanticColors } = theme;
  React.useLayoutEffect(() => {
    document.body.style.backgroundColor = semanticColors.bodyBackground;
    document.body.style.color = semanticColors.bodyText;
  }, [semanticColors]);

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

// Live reload != hot reload! CRA doesn't do hot reload, so we install it here.
let HotApp = process.env.NODE_ENV === 'production' ? App : hot(module)(App);

export default styled(HotApp);
