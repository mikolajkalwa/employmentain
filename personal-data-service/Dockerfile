FROM node:14-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build

FROM node:14-alpine
RUN apk add --no-cache bash
WORKDIR /usr/src/app
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh ./
RUN chmod +x ./wait-for-it.sh
COPY --from=build /usr/src/app/package*.json ./
RUN npm ci --only=production
COPY --from=build /usr/src/app/dist ./dist
CMD ["node", "dist/main.js"]