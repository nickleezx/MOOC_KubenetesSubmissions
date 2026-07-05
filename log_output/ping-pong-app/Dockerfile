FROM node:22-slim

# 1. Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /usr/src/app

COPY . .

RUN pnpm install --frozen-lockfile

CMD ["node", "index.js"]