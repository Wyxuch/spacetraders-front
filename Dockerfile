FROM node:20-alpine3.18 AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat

WORKDIR usr/src/app
COPY package.json yarn.lock ./
RUN yarn install


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR usr/src/app
COPY --from=deps usr/src/app/node_modules ./node_modules
COPY . .

RUN yarn build


FROM base AS runner
WORKDIR usr/src/app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder usr/src/app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs usr/src/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs usr/src/app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" node server.js