# KosmosWriter Backend

This backend service connects to Azure Service Bus, consumes messages, and stores them in Azure Cosmos DB.

### Prerequisites
- Docker
- Azure Service Bus queue
- Azure Cosmos DB account

### Environment Variables
Create a `.env` file in the project root with the following variables:

```
AZURE_SERVICE_BUS_CONNECTION_STRING=your-service-bus-connection-string
AZURE_SERVICE_BUS_QUEUE_NAME=your-queue-name
AZURE_COSMOS_ENDPOINT=https://your-cosmos-account.documents.azure.com:443/
AZURE_COSMOS_KEY=your-cosmos-key
AZURE_COSMOS_DATABASE_ID=your-database-id
AZURE_COSMOS_CONTAINER_ID=your-container-id
```


### How it works
- Listens to Azure Service Bus queue for messages
- Logs each received message
- Stores message body and timestamp (`enqueuedTimeUtc`) in Cosmos DB with a generated UUID

### File Structure
- `index.ts`: Entry point, starts the receiver and inserts messages
- `servicebusClient.ts`: Service Bus receiver logic
- `cosmosClient.ts`: Cosmos DB integration

### Troubleshooting
- Ensure all environment variables are set
- Check logs for connection errors

### Example Log Output

```
[Main] Message processed and inserted to Cosmos DB.
[ServiceBus] Received message: {"device_id":"potato1","button_state":0,"led_state":0,"random_delay":4}
[CosmosDB] Item inserted: {
    id: "744bb5e2-6957-41b0-8c30-c5d22e1474ca",
    device_id: "potato1",
    button_state: 0,
    led_state: 0,
    random_delay: 4,
    ts: "2025-08-31T18:04:03.480Z",
    _rid: "h2AMAPtFPOv-AQAAAAAAAA==",
    _self: "dbs/h2AMAA==/colls/h2AMAPtFPOs=/docs/h2AMAPtFPOv-AQAAAAAAAA==/",
    _etag: "\"3c016279-0000-0e00-0000-68b48e930000\"",
    _attachments: "attachments/",
    _ts: 1756663443
}
```

### License
MIT
