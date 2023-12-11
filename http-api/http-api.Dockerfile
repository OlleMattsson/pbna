# base image 
FROM node:18.8.0-alpine
WORKDIR /code
COPY . /code
RUN npm install
CMD ["node", "/code/src/main.js"]