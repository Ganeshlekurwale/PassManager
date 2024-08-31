const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');

const url = `mongodb+srv://ganeshlekurwale:passmanager@123@cluster0.mt58v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

if (!url) {
  throw new Error('MONGO_URI environment variable is not set');
}

const client = new MongoClient(url);
const dbName = 'passmanager';

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Database connection established');
  } catch (err) {
    console.error('Database connection error:', err);
    throw err;
  }
}

function getDb() {
  return client.db(dbName);
}

module.exports = { connectToDatabase, getDb };
