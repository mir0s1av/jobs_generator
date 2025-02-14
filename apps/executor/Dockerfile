FROM node:18-slim as builder

WORKDIR /workspace

COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./
COPY jest.config.ts ./
COPY jest.preset.js ./
COPY .eslintrc.json ./
COPY webpack.*.config.js ./

COPY apps/executor ./apps/executor


COPY libs/nestjs ./libs/nestjs
COPY libs/pulsar ./libs/pulsar
COPY libs/grpc ./libs/grpc

RUN npm i

RUN apt-get update && apt-get install -y protobuf-compiler

RUN npx nx build executor

FROM node:18-slim as runner

WORKDIR /app

COPY --from=builder /workspace/package.json ./
COPY --from=builder /workspace/executor/package.json ./apps/executor/package.json

COPY --from=builder /workspace/libs/grpc/package.json ./libs/grpc/package.json
COPY --from=builder /workspace/libs/pulsar/package.json ./libs/pulsar/package.json
COPY --from=builder /workspace/libs/nestjs/package.json ./libs/nestjs/package.json

COPY --from=builder /workspace/package-lock.json ./


ENV NODE_ENV=production

RUN npm ci

COPY --from=builder /workspace/dist ./dist

CMD ["node","dist/apps/executor/main"]