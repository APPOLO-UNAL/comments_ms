import * as amqp from 'amqplib';

const queueName = 'hello';
const message = 'Hello RabbitMQ from TypeScript!';

async function send() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: false });

    channel.sendToQueue(queueName, Buffer.from(message));
    console.log(" [x] Sent '%s'", message);

    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
}

send().catch((err) => {
    console.error("Error:", err);
    process.exit(1);
});
