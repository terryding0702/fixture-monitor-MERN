import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;
console.log('@@@', MONGODB_URI);

if (!MONGODB_URI) throw new Error('Missing MONGODB_URI env variable');

let isConnected = false;

export async function dbConnection(): Promise<void> {
  if (isConnected) return;

  await mongoose.connect(MONGODB_URI, {
    dbName: 'fixtureCSV',
  });
  console.log('~~~~~~~~~~~');
  isConnected = true;
}
