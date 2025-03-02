// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import axios from "axios";
import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export const MONGODB_URL =
  "mongodb+srv://iwon:npeixCSNn4OLOpKq@cluster0.v9mxy.mongodb.net/iwon";

if (!MONGODB_URL) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = MONGODB_URL;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }

  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
