FROM node:10 AS build
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run lint && npm test && npm run build

FROM node:10 AS release
COPY package*.json ./
RUN npm ci --only=production
COPY --from=build /dist /app
WORKDIR /app/server/main/

CMD [ "node", "app.js" ]