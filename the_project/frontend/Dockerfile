FROM node:22-slim

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

COPY entrypoint.sh /entrypoint.sh

# 3. Give the script permission to run (critical!)
RUN chmod +x /entrypoint.sh

# 4. Use ENTRYPOINT to run the script first.
# The script will then finish by running the CMD (Nginx).
ENTRYPOINT ["/entrypoint.sh"]

CMD ["npm", "run", "preview", "--", "--host"]
