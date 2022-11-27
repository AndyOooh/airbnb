import mongoDB, { MongoClient } from 'mongodb';
import { AIRBNB_COLLECTION, DB_NAME, MONGO_URI } from './VARS';

export const collections: { abbListings?: mongoDB.Collection } = {};

const dbConnect = async (): Promise<void | undefined> => {
  if (!MONGO_URI || !DB_NAME || !AIRBNB_COLLECTION) return;

  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db: mongoDB.Db = client.db(DB_NAME);
    const abbListingsCollection: mongoDB.Collection = db.collection(AIRBNB_COLLECTION);
    collections.abbListings = abbListingsCollection;
    console.log(
      `Connected to database: ${db.databaseName}, collection: ${abbListingsCollection.collectionName}`,
    );
  } catch (e) {
    console.error(e);
  }
};

export default dbConnect;
