import amqp from "amqplib";
const queue = "birthday_schedule";

export const produceMessage = async (message: any) => {
  let connection;
  try {
    connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    console.log("SENT: ", JSON.stringify(message));
    await channel.close();
  } catch (err: any) {
    console.log(err);
  } finally {
    if (connection) await connection.close();
  }
}

export const consumeMessage = async () => {
  try {
    let messages: amqp.ConsumeMessage[] = [];
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    process.once("SIGINT", async () => {
      await channel.close();
      await connection.close();
    });

    await channel.assertQueue(queue, { durable: false });
    await channel.consume(queue, (message) => {
      if (message) {
        messages.push(message);
      }
    });

    return messages;

  } catch (err: any) {
    console.log(err);
  }
}