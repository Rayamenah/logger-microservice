const amqplib = require("amqplib");
const config = require("./config");
//connect to rabbitmq server
//create a new channel on the connection
class Producer {
  async createChannel() {
    const connection = await amqplib.connect(config.rabbitMQ.url);
    this.channel = await connection.createChannel();
  }

  async publishMessage(routingKey, message) {
    if (!this.channel) {
      await this.createChannel();
    }

    //create the exchange
    const exchangeName = config.rabbitMQ.exchangeName;
    await this.channel.assertExchange(exchangeName, "direct");
    //details of the message to be logged
    const logDetails = {
      logType: routingKey,
      message: message,
      dateTime: new Date(),
    };
    //publish the message on the exchange with a routing key
    await this.channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(logDetails))
    );

    console.log(`the message ${message} is sent to exchange ${exchangeName}`);
  }
}

module.exports = Producer;
