FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock .env ./
RUN yarn

COPY . .
CMD ["yarn", "dev"]
