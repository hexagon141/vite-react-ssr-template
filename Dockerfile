FROM node:18.12.1-alpine3.16
WORKDIR /home/app
COPY . .
RUN npm i -g pnpm@7.19.0
RUN pnpm i

CMD ["pnpm", "dev"]