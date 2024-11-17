const amqp = require("amqplib");

let connection;
let channel;

async function connectBroker() {
  try {
    connection = await amqp.connect(
      process.env.RABBITMQ_URL || "amqp://localhost"
    );
    channel = await connection.createChannel();

    await channel.assertExchange("annonceExchange", "fanout", {
      durable: true,
    });
    console.log("Connected to RabbitMQ and exchange configured");
  } catch (error) {
    console.error("RabbitMQ connection error:", error);
  }
}

async function publishToExchange(message) {
  try {
    if (!channel) await connectBroker();
    channel.publish(
      "annonceExchange",
      "",
      Buffer.from(JSON.stringify(message))
    );
  } catch (error) {
    console.error("Error publishing message to exchange:", error);
  }
}

async function consumeQueue(queueName, handleMessage) {
  if (!channel) await connectRabbitMQ();
  await channel.assertQueue(queueName, { durable: true });
  await channel.bindQueue(queueName, "annonces_exchange", "");
  console.log(`Queue ${queueName} est liée à annonces_exchange`);

  channel.consume(queueName, async (msg) => {
    if (msg !== null) {
      const message = JSON.parse(msg.content.toString());
      await handleMessage(message);
      channel.ack(msg);
    }
  });
}

process.on("exit", () => {
  if (connection) connection.close();
});

module.exports = { connectBroker, publishToExchange, consumeQueue };
