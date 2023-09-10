FROM node:18.17.0
WORKDIR /app/hub-frontd
RUN npm i -g pnpm

# hub-frontd build
COPY ./hub-frontd/package.json ./
RUN pnpm i
COPY ./hub-frontd ./
RUN pnpm run build:h5
RUN mkdir ../public && mv ./dist/* ../public/
RUN rm -rf ./*

# hub-server build
WORKDIR /app
COPY ./hub-server/package.json ./
RUN pnpm i
COPY ./hub-server ./
RUN pnpm run build
EXPOSE 3000
CMD ["npm", "start"]