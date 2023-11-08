FROM node:21.1.0-alpine
WORKDIR /code
COPY . /code
RUN npm install

# uncomment the below line to run keystone in dev mode
# CMD ["npm", "run", "dev"]