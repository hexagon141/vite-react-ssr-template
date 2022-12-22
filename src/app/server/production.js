import fastify from 'fastify';
import {render} from './render.js';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';

/**
 * @type {import('fastify').FastifyInstance}
 **/
const app = fastify();
const __dirname = dirname(fileURLToPath(import.meta.url));
const template = readFileSync(join(__dirname, 'index.html'), 'utf-8');

const appConfig = {
  port: process.env.PORT ?? 5173,
};

app.get('*', (request, reply) => {
  try {
    const routerContext = {};
    const appAsHtml = render(request, routerContext);

    if (routerContext.url) {
      return reply.redirect(301, routerContext.url);
    }

    const html = template.replace(`<!--app-html-->`, appAsHtml);

    return reply
      .code(200)
      .header('Content-Type', 'text/html')
      .send(html);

  } catch (error) {
    return reply
      .code(500)
      .send(error.stack);
  }
});

app.listen(appConfig, (error) => {
  if (error) {
    app.log.error(error);

    process.exit(1);
  }

  console.log(`http://localhost:${appConfig.port}`);
});
