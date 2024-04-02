import * as amqp from 'amqplib';

const queueName = 'notifications';

interface Message {
    title: string;
    message: string;
    id_user: string;
}

export async function send(title: string, body: string, id_user:string) {
    const connection = await amqp.connect('amqp://guest:guest@my-rabbit:5672/');
    const channel = await connection.createConfirmChannel();
    await channel.assertQueue(queueName, { durable: false });

    // Create a message
    let message: Message = {
        title: title,
        message: body,
        id_user: id_user
    };
    
    // Convert the message to a JSON string
    const jsonBody: string = JSON.stringify(message);

    // Send the message and wait for confirmation
    channel.sendToQueue(queueName, Buffer.from(jsonBody), {}, (err, ok) => {
        if (err) {
            console.error("Error:", err);
        } else {
            console.log(" [x] Sent '%s'", message);
        }

    });
}