# base image 
FROM node:18.8.0-alpine
WORKDIR /code

# copy & install deps first to improve caching
COPY package.json package-lock.json* .npmrc ./
RUN npm install

COPY . .
#CMD ["node", "/code/src/main.js"]