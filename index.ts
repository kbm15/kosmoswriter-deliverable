
import { startServiceBusReceiver, closeServiceBus } from "./servicebusClient";
import { insertToCosmos } from "./cosmosClient";
import { v4 as uuidv4 } from "uuid";

async function main() {
	console.info("[Main] Starting Service Bus receiver...");
		await startServiceBusReceiver(async (message) => {
			try {
				// Insert both message body and enqueuedTimeUtc
						const item = {
							id: uuidv4(),
							...message.body,
							ts: message.enqueuedTimeUtc
						};
				await insertToCosmos(item);
				console.info("[Main] Message processed and inserted to Cosmos DB.");
			} catch (err) {
				console.error("[Main] Error processing message:", err);
			}
		});
}

main().catch((err) => {
	console.error("[Main] Fatal error:", err);
	closeServiceBus();
});