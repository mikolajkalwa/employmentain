const amqplib = require('amqplib')
require('dotenv').config();

(async () => {
  const connection = await amqplib.connect(process.env.AMQP)
  const channel = await connection.createChannel()
  await channel.assertQueue(process.env.QUEUE)
  channel.consume(process.env.QUEUE, message => {
    if (message) {
      console.log(message.content.toString())
      channel.ack(message)
    }
  })
})()
