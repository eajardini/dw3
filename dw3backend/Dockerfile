FROM node:24-bookworm-slim

ENV NODE_ENV=production

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --chown=node:node . .

USER node

EXPOSE 40000

CMD ["node", "app.js"]
