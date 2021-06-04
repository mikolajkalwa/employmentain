FROM node:14-alpine
RUN apk add --no-cache bash
WORKDIR /usr/src/app
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh ./
RUN chmod +x ./wait-for-it.sh
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY . .
CMD ["node", "index.js"]