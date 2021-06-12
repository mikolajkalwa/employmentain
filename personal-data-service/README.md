# Personal Data Service 

## Description

This project was created with [Nest CLI](https://docs.nestjs.com/cli/overview).

This application exposes one endpoint: `/api/v1/commands/run` which accepts POST requests. The body should contain JSON object with one field: `id` in range 100-120.

A user of provided id is downloaded from a 3rd party service (https://gorest.co.in/), then the data structure is converted to another format and send to RabbitMQ queue.

## Installation

```bash
$ npm install
```

## Environment Variables

To run this project, you will need the following environment variables:

`PORT` - Port on which API should be run

`AMQP` - RabbitMQ address

`QUEUE`- Queue name

## Running the app

```bash
$ npm run start
```

## Tests

End to end tests were created with [Postman](https://www.postman.com/).

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```