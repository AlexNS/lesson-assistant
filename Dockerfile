FROM node:21-alpine3.18

RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json package-lock.json .
COPY src/ ./src
COPY server.js vite.config.js tailwind.config.js frontend-admin.html .
RUN npm ci && npm run build
RUN npm ci --production
EXPOSE 3000
CMD [ "npm", "start" ]