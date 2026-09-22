FROM node:24-alpine

WORKDIR /app

ENV NODE_ENV=production \
    PORT=40100

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --chown=node:node . .

USER node

EXPOSE 40100

CMD ["node", "app.js"]
