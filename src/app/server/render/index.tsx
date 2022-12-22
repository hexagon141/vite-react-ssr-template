import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';

import {App} from '../../client/app';
import {RenderConfig} from './types';

export const render = ({location, routerContext}: RenderConfig) => {
  return ReactDOMServer.renderToString(
    <StaticRouter
      location={location}
      context={routerContext}
    >
      <App />
    </StaticRouter>
  )
}