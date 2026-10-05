FROM node:26-slim AS builder
RUN npm install -g yarn@1.22.22
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
# Openship passes every project env var as a build arg. Only this one is
# declared, because `yarn build` runs the database migrations first.
ARG POSTGRES_URL
RUN yarn build

FROM node:26-slim
ENV NODE_ENV=production
# Must stay /app: the uploads volume in openship.json is mounted at
# /app/.data/uploads, and Nitro resolves that storage path from the working
# directory.
WORKDIR /app
COPY --from=builder /app/.output ./.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
