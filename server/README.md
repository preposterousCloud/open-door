
### Postgres Dev Install
1. Install Docker per their guide and make sure Docker VM is running. Running `docker-machine ls`
  should list a running machine.  Note its IP address.
2. `docker pull postgres` will download the image to your computer
3. The following will start a basic postgres database.  Set the variables to your desired values
`$ docker run -p 5432:5432 --name openDoorPostgres -e POSTGRES_USER=opendoor -e POSTGRES_PASSWORD=password -e POSTGRES_DB=opendoor -d postgres`
4. You can connect to the db by using the IP address from #1 and port specified in #3 (eg. 5432) 
5. On computer restart the docker VM will stop running.  You'll likely need to restart it and the openDoorPostGres container.
### Dev Server Configuration
1. Copy config.example.js to config.js and update based on your Postgres install and other dependencies
2. To create the tables run the following from the root dir to initialize the database.  The second command will setup
dummy data in the database.  Running either of these commadns will wipeout any existing data.
  `node server/db/initDb.js` or `npm run init-dummy-data`
3. The server includes its own package.json.  Running `npm install` from the server folder should be sufficient to install
server dependencies.  If you run into issues, running `npm run install:all` from the root will install dependencies
for all subprojects.
### Tests
- Tests for the server are located in a global testing folder at `~/tests/__tests__/server` (not in the server directory).
These tests, along with others, can be run w/ `npm run test` from the project root.
