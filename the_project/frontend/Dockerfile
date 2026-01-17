FROM node:20-slim

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /usr/src/app

COPY . .

RUN pnpm install --frozen-lockfile

RUN pnpm run build

COPY entrypoint.sh /entrypoint.sh

# 3. Give the script permission to run (critical!)
RUN chmod +x /entrypoint.sh

# 4. Use ENTRYPOINT to run the script first.
# The script will then finish by running the CMD (Nginx).
ENTRYPOINT ["/entrypoint.sh"]

CMD ["pnpm", "preview", "--host"]