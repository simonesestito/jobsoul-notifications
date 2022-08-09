FROM node:17.5.0-alpine3.15
WORKDIR /app

COPY ./src/ ./src/
COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install --omit=dev

ENTRYPOINT [ "node", "." ]