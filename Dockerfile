FROM node:18.17.0
WORKDIR /app
COPY ./hub-server/package.json ./
RUN npm i -g pnpm
RUN pnpm i
COPY ./hub-server .
EXPOSE 3000
CMD ["npm", "start"]