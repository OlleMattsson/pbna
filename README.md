# PBNA

## development

While developing it can be convenient to run the containers separately. This makes it 
possible to reload containers as needed. One way of achieving this is to run the following
commands in separate terminals.

### start backend
1. cd to the `keystone` folder
2. In terminal 1, Start database: `npm run startpg`. This is an alias for `docker compose up postgres`
3. In terminal 2, Start keystone backend `npm run dev`

### start frontend
1. cd to `frontend` folder
2. In terminal 3, Start frontend `npm run start`

The keystone server runs on http://localhost:3000
The frontend client runs on http://localhost:8080

## running production 
In the project root, run `docker compose up --build`
This starts all the containers

## trouble shooting

### docker informs that postgres port is already in use
This means that a postgres process is already runnig and using that port. On macos, it seems to be 
the case that homebrew uses postgres for something.

On macOS, running postgress instances can be killed like so
`sudo -u postgres /Library/PostgreSQL/<postgres_version>/bin/pg_ctl -D /Library/PostgreSQL/<postgres_version>/data stop`
Change <postgres_version> to whatever is installed on the system

# license
Copyright 2023 Mattssoft Ab (www.mattssoft.com)

Licensed under CC BY NC 
(https://creativecommons.org/licenses/by-nc/4.0/deed.en)
