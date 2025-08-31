import { ServiceBusClient, ServiceBusReceivedMessage } from "@azure/service-bus";

const connectionString = process.env.AZURE_SERVICE_BUS_CONNECTION_STRING;
const queueName = process.env.AZURE_SERVICE_BUS_QUEUE_NAME;

if (!connectionString || !queueName) {
  throw new Error("Missing AZURE_SERVICE_BUS_CONNECTION_STRING or AZURE_SERVICE_BUS_QUEUE_NAME in environment variables.");
}

const sbClient = new ServiceBusClient(connectionString);
const receiver = sbClient.createReceiver(queueName);

export async function startServiceBusReceiver(onMessage: (msg: ServiceBusReceivedMessage) => Promise<void>) {
  receiver.subscribe({
    async processMessage(message) {
      console.info("[ServiceBus] Received message:", JSON.stringify(message.body));
      await onMessage(message);
    },
    async processError(err) {
      console.error("[ServiceBus] Error receiving message:", err);
    }
  });
  console.info("[ServiceBus] Receiver started.");
}

export async function closeServiceBus() {
  await receiver.close();
  await sbClient.close();
}
