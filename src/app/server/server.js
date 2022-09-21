import express from 'express';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const template = readFileSync(join(__dirname, 'index.html'), 'utf-8');

const app = express();

app.use('*', async (request, response) => {
  try {
    const routerContext = {};
    const {render} = await import('./render/index.js');

    const appAsHtml = render(request, routerContext);

    if (routerContext.url) {
      return response.redirect(301, context.url);
    }

    const html = template.replace(`<!--app-html-->`, appAsHtml);

    response.set('Content-Type', 'text/html');

    response
      .status(200)
      .send(html);
  } catch (error) {
    console.error(error.stack);

    response
      .status(500)
      .send(error.stack);
  }
})

app.listen(5173, () => {
  console.log('http://localhost:5173')
})