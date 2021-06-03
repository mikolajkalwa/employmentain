import { Injectable } from '@nestjs/common';
import { connect } from 'amqplib';

@Injectable()
export class MessageBroker {
  async putOnQueue(message: string): Promise<boolean> {
    const connection = await connect(process.env.AMQP);
    const channel = await connection.createChannel();
    await channel.assertQueue(process.env.QUEUE);
    const isSent = channel.sendToQueue(process.env.QUEUE, Buffer.from(message));
    await channel.close();
    await connection.close();
    return isSent;
  }
}
