const amqp = require("amqplib");

let connection;
let channel;

async function connectRabbitMQ() {
  if (!connection) {
    connection = await amqp.connect("amqp://localhost");
    console.log("Connected to RabbitMQ");
  }
}

async function createChannel() {
  if (!connection) await connectRabbitMQ();
  return await connection.createChannel();
}

async function publishToQueue(message) {
  if (!channel) {
    channel = await createChannel();
    await channel.assertExchange("annonces_exchange", "fanout", {
      durable: true,
    });
  }
  channel.publish(
    "annonces_exchange",
    "",
    Buffer.from(JSON.stringify(message))
  );
}

async function consumeQueue(queueName, handleMessage) {
  const localChannel = await createChannel();
  await localChannel.assertExchange("locations_exchange", "topic", {
    durable: true,
  });
  await localChannel.assertQueue(queueName, { durable: true });
  await localChannel.bindQueue(queueName, "annonces_exchange", "");
  console.log(`Queue ${queueName} est liée à annonces_exchange`);

  localChannel.consume(queueName, async (msg) => {
    if (msg !== null) {
      console.log(`Message reçu dans ${queueName}:`, msg.content.toString());
      const message = JSON.parse(msg.content.toString());
      await handleMessage(message);
      localChannel.ack(msg);
    }
  });
}

module.exports = { publishToQueue, consumeQueue };
