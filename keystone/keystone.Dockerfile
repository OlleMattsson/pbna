FROM node:21.1.0-alpine
WORKDIR /code

# Install dependencies first for better layer caching
COPY keystone/package.json keystone/package-lock.json ./
RUN npm install

# Copy Keystone source
COPY keystone/. ./

# Replace the symlinked common package with the real shared sources
RUN rm -rf common
COPY common ./common

# Build Keystone (this writes out the correct schema.prisma into .keystone/)
# the --no-ui skips building the ui files for faster buildtimes during dev
RUN DISABLE_REDIS=true npx keystone build --no-ui

# debug dump:
RUN echo "Contents of .keystone:" && ls -R .keystone

# Generate the Prisma Client from Keystone’s schema in memory
RUN DISABLE_REDIS=true npx keystone prisma generate
