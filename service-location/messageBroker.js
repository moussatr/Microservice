const amqp = require("amqplib");

let channel, connection;

async function connectBroker() {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    console.log("Connected to RabbitMQ");

    await channel.assertQueue("locations", { durable: true });
  } catch (error) {
    console.error("RabbitMQ connection error:", error);
  }
}

function publishToQueue(queue, message) {
  if (!channel) {
    console.error("Erreur: canal RabbitMQ non disponible.");
    return;
  }
  try {
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
    console.log(`Message publié dans la queue ${queue}`);
  } catch (error) {
    console.error("Erreur lors de la publication du message:", error);
  }
}

module.exports = { connectBroker, publishToQueue };
