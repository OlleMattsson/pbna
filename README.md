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

## running prouction 
In the project root, run `docker compose up --build`
This starts all the containers


# license
Copyright 2023 Mattssoft Ab (www.mattssoft.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRAC