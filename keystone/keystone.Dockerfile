FROM node:21.1.0-alpine
WORKDIR /code

# copy & install deps first to improve caching
COPY package.json package-lock.json* ./
RUN npm install

COPY . .