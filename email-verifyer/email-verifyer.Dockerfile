FROM node:21.1.0-alpine
WORKDIR /code
COPY . /code
RUN npm install