import { CosmosClient } from "@azure/cosmos";

const endpoint = process.env.AZURE_COSMOS_ENDPOINT;
const key = process.env.AZURE_COSMOS_KEY;
const databaseId = process.env.AZURE_COSMOS_DATABASE_ID;
const containerId = process.env.AZURE_COSMOS_CONTAINER_ID;

if (!endpoint || !key || !databaseId || !containerId) {
  throw new Error("Missing Cosmos DB environment variables.");
}

const cosmosClient = new CosmosClient({ endpoint, key });
const database = cosmosClient.database(databaseId);
const container = database.container(containerId);

export async function insertToCosmos(item: object) {
  try {
    const { resource } = await container.items.create(item);
    console.info("[CosmosDB] Item inserted:", resource);
    return resource;
  } catch (err) {
    console.error("[CosmosDB] Failed to insert item:", err);
    throw err;
  }
}
