# FROM node:18-alpine3.15

# # Set working directory
# RUN mkdir -p /var/www/pokedex
# WORKDIR /var/www/pokedex

# # Copiar el directorio y su contenido
# COPY . ./var/www/pokedex
# COPY package.json tsconfig.json tsconfig.build.json /var/www/pokedex/
# RUN yarn install --prod
# RUN yarn build


# # Dar permiso para ejecutar la applicación
# RUN adduser --disabled-password pokeuser
# RUN chown -R pokeuser:pokeuser /var/www/pokedex
# USER pokeuser

# # Limpiar el caché
# RUN yarn cache clean --force

# EXPOSE 3000

# CMD [ "yarn","start" ]

# Install dependencies only when needed

FROM node:20-bookworm-slim AS deps
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:20-bookworm-slim AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

FROM node:20-bookworm-slim AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=true

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main.js"]