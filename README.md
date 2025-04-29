# PBNA

AI Augmented Accounting software

## installation

### requirements
docker 24.0.7 or later

### common files
`cd common && npm install`

### react-admin (for now, until containerized)
1. `cd react-admin && npm install`
2. `cd node_modules/ra-data-graphql-simple-keystone6/ && npm run build`

### llama model
1. download llama model: https://huggingface.co/TheBloke/Llama-2-13B-GGUF/blob/main/llama-2-13b.Q5_K_M.gguf  
2. place gguf file in `./models`` directory  

## run
in the root folder, run `docker compose up`
note: client facing ui (react-admin) has to be started manually `cd react-admin && npm run dev`

## developing keystone

### project folder structure

- Common: files shared between the services, currently only stuff related to redis. This could potentially be converted to a package for easier installation
- Frontend: old frontend `localhost:8000` that contains some interesting account, entry and lineItem test data, also contains business logic for  building an income statement and balancing the books
- keystone: cms, data storage, schema and graphql api accessible on `localhost:3000`
- models: for storing llm models
- node-llama: a microservice running llama
- read-admin: customer facing UI accessible on `localhost:5173`
- tesseract: a microservice running tesseract for OCR

#### Other things worth noting

docker compose: the system is designed to run in docker containers and spun up using docker compose 
redis-smq: microservices within the docker network can talk to one another with messages (events) sent over redis-smq

### when changing schema or keystone configs
1. In ./docker-compose.yml change 
1. `docker compose up keystone --build`
2. in another terminal `docker compose exec keystone /bin/sh`
3. `npx keystone dev`

### when changing files in "hooks" folder
These files are mounted to the container. Changes made are immediately available. 


### developing the services
- run the project using `docker compose up`
- service's source code is inside their corresponding `src` folder
- the `src` folder is mounted into the container, so any changes made to files residing inside this folder structure
  are automatically reflected in the running container.
- Ie, no need to restart containers in between iterations.
- if package.json or other folders outside the service's src folder, the container has to be stopped rebuilt with `docker compose build <container> `. Alternatively the container can be rebuilt with the up command like so `docker compose up <container> --build`


## trouble shooting

### docker informs that postgres port is already in use
This means that a postgres process is already runnig and using that port. On macos, it seems to be 
the case that homebrew uses postgres for something.

On macOS, running postgress instances can be killed like so
`sudo -u postgres /Library/PostgreSQL/<postgres_version>/bin/pg_ctl -D /Library/PostgreSQL/<postgres_version>/data stop`
Change <postgres_version> to whatever is installed on the system


### flush redis
Assuming redis is running in docker, run  
`docker compose exec redis /bin/sh`  
`redis-cli`  
`FLUSHDB` or `FLUSHALL`


# license
Copyright 2023 Mattssoft Ab (www.mattssoft.com)

CreaticeCommons BY NC 
(https://creativecommons.org/licenses/by-nc/4.0/deed.en)
