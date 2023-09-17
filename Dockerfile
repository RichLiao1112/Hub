FROM node:18.17.0 AS frontdBuilder
WORKDIR /app
RUN npm i -g pnpm && pnpm config set registry https://registry.npm.taobao.org
# hub-frontd build
COPY ./hub-frontd ./
RUN pnpm i
RUN pnpm run build:h5
# hub-server build
FROM node:18.17.0
ENV HOST 0.0.0.0
ENV PORT 3000
EXPOSE 3000
WORKDIR /app
RUN npm i -g pnpm && pnpm config set registry https://registry.npm.taobao.org
COPY ./hub-server ./
RUN pnpm i
RUN mkdir public && pnpm run build
COPY --from=frontdBuilder /app/dist ./public
CMD ["npm", "run", "start:prod"]