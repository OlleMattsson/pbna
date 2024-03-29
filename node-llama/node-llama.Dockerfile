FROM node:21.1.0-alpine
WORKDIR /code
COPY . /code
RUN apk add --no-cache git g++ make python3 cmake
RUN npm install
RUN npx --no node-llama-cpp download

# uncomment the below line to run keystone in dev mode
# CMD ["npm", "run", "dev"]