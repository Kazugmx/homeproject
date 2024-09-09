FROM node:22-alpine AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install pnpm -g
RUN pnpm install

COPY . .

RUN pnpm build

# Production Stage
FROM node:22-alpine

WORKDIR /app

COPY --from=build /app/dist ./

CMD ["npm", "start"]
EXPOSE 3000