# PBNA

## installation
`cd common && npm install`

## run
in the root folder, run `docker compose up`

## developing the services
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
