const amqplib = require("amqplib");

async function consumeMessage() {
  //connect to the rabbitMq server
  const connection = await amqplib.connect("amqp://localhost");
  //create a new channel
  const channel = await connection.createChannel();
  //create the exchange
  await channel.assertExchange("logExchange", "direct");
  //create the queue
  const q = await channel.assertQueue("infoQueue");
  //bind the queue to the exchange
  await channel.bindQueue(q.queue, "logExchange", "Info");
  //consume messages from the queue
  channel.consume(q.queue, (msg) => {
    const data = JSON.parse(msg.content);
    console.log(data);
    channel.ack(msg);
  });
}

consumeMessage();
