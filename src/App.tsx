import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Header from 'components/header/Header';
import { ExpandProvider } from 'contexts/expandContext';
import { ERouterLink } from 'constants/index';

import 'App.scss';

const ProfileLazy = React.lazy(() => import('pages/profile/Profile'));
const NewsLazy = React.lazy(() => import('pages/news/News'));

function App() {
  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <ExpandProvider>
          <Header />
          <React.Suspense fallback={<></>}>
            <Switch>
              <Route path={ERouterLink.News} component={NewsLazy} />
              <Route path={ERouterLink.Profile} component={ProfileLazy} />
              <Route path={ERouterLink.Root} exact>
                <Redirect to={ERouterLink.News} />
              </Route>
            </Switch>
          </React.Suspense>
        </ExpandProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
