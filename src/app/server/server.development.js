import path from 'node:path';
import express from 'express';
import {createServer} from 'vite';
import {readFileSync} from 'node:fs';

const src = path.join(process.cwd(), 'src');
const template = readFileSync(path.join(src, 'app', 'index.html'), 'utf-8');

const vite = await createServer({
  appType: 'custom',
  logLevel: 'error',
  server: {
    middlewareMode: true,
  },
});

const app = express();

app.use(vite.middlewares);

app.use('*', async (request, response) => {
  try {
    const routerContext = {};
    const {render} = await vite.ssrLoadModule('/server/render');
    const preparedTemplate = await vite.transformIndexHtml(request.originalUrl, template);

    const appAsHtml = render(request, routerContext);

    if (routerContext.url) {
      return response.redirect(301, routerContext.url);
    }

    const html = preparedTemplate.replace('<!--app-html-->', appAsHtml);

    response.set('Content-Type', 'text/html');

    response
      .status(200)
      .send(html);
  } catch (error) {
    vite.ssrFixStacktrace(error);

    console.error(error.stack);

    response
      .status(500)
      .send(error.stack);
  }
});

app.listen(5173, () => {
  console.log('http://localhost:5173')
});
