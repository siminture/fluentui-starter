import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProgressIndicator, styled } from '@fluentui/react';

import { AutoSwitchLayout } from './components/layout';
import { renderRoutes } from './components/route';
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

export default styled(App);
