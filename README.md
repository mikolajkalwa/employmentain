# Employmentain

## About
This repository contains 2 services: [Personal Data Service](personal-data-service) and [Gather Data Service](gather-data-service). In order to work those two services require access to a RabbitMQ instance.


## Running the project 
The easiest way to run the application is to start it with docker: 
```bash
$ docker compose up
```

The Personal Data Service listens on port 3000. It exposes one endpoint: `localhost:3000/api/v1/commands/run` which accepts POST requests. The body should contain JSON object with one file `id` in range 100-120.

Example:
```json
{
    "id":119
}
```

The details about the given service can be found inside its directory.