FROM node:20-slim

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /usr/src/app

COPY . .

RUN pnpm install --frozen-lockfile

ENV PORT=3002

CMD ["node", "index.js"]