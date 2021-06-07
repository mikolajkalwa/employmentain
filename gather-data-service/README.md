# Gather Data Service

## Description

This application connects to RabbitMQ queue and awaits new entries which are then removed from the queue and displayed on the console.

## Installation

```bash
$ npm install
```

## Environment Variables

To run this project, you will need to the following environment variables (it's possible to set them inside `.env` file):

`AMQP` - RabbitMQ address

`QUEUE`- Queue name

## Running the app

```bash
$ node index.js
```