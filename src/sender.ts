import * as amqp from 'amqplib';

const queueName = 'notifications';
//const message = 'Hello RabbitMQ from TypeScript!';

interface Message {
    title: string;
    message: string;
    id_user: string;
  }

async function send(title: string, body: string, id_user:string) {

    const connection = await amqp.connect('amqp://guest:guest@localhost:5672/');
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName, { durable: false });

    // Create a message
    let message: Message = {
        title: title,
        message: body,
        id_user: id_user
      };
    
    // Convert the message to a JSON string
    const jsonBody: string = JSON.stringify(message);

    channel.sendToQueue(queueName, Buffer.from(jsonBody));
    console.log(" [x] Sent '%s'", message);

    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
}

// send("Title", "Body", "1").catch((err) => {
//     console.error("Error:", err);
//     process.exit(1);
// });
