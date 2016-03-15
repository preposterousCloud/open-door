
### Postgres Dev Install
1. Install Docker and make sure Docker VM is running. Running `docker-machine ls`
  should list a running machine.  Note its IP address.
2. `docker pull postgres` will download the image to your computer
3. The following will start a basic postgres database.  Set the variables to your desired values
`$ docker run -p 5432:5432 --name openDoorPostgres -e POSTGRES_USER=opendoor -e POSTGRES_PASSWORD=password -e POSTGRES_DB=opendoor -d postgres`
4. You can connect to the db by using the IP address from #1 and port specified in #3 (eg. 5432) 

### Setup Config
1. Copy config.example.js to config.js and update based on your Postgres install and other dependencies
2. Run ./db/initDb.js to initialize the database.  Running this file will delete any existing DB of the sam ename

