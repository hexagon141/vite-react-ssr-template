import path from 'node:path';
import express from 'express';
import {createServer} from 'vite';
import {readFileSync} from 'node:fs';

const PORT = process.env.PORT ?? 5173;

const src = path.join(process.cwd(), 'src');
const template = readFileSync(path.join(src, 'app', 'index.html'), 'utf-8');

const vite = await createServer({
  appType: 'custom',
  logLevel: 'error',
  server: {
    middlewareMode: true,
  },
});

/**
 * @type {import('express').Express}
 **/
const app = express();

app
  .use(vite.middlewares)
  .get('*', async (request, response) => {
    try {
      const routerContext = {};
      const {render} = await vite.ssrLoadModule('/server/render');
      const preparedTemplate = await vite.transformIndexHtml(request.originalUrl, template);

      const appAsHtml = render({
        routerContext,
        location: request.originalUrl,
      });

      if (routerContext.url) {
        return response.redirect(301, routerContext.url);
      }

      const html = preparedTemplate.replace('<!--app-html-->', appAsHtml);

      response
        .header('Content-Type', 'text/html')
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

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
