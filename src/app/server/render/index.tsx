import {Request} from 'express';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {StaticRouterContext} from 'react-router';
import {App} from '../../client/app';

export const render = (request: Request, routerContext: StaticRouterContext) => {
  return ReactDOMServer.renderToString(
    <StaticRouter location={request.originalUrl} context={routerContext}>
      <App />
    </StaticRouter>
  )
}