const express = require('express');
const dotenv = require('dotenv');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const url = process.env.MONGO_URI;
const client = new MongoClient(url);
const dbName = 'passmanager';
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

client.connect(err => {
  if (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
  console.log('Connected to MongoDB');

  const db = client.db(dbName);
  const collection = db.collection('passwords');

  app.get('/', async (req, res) => {
    try {
      const findResult = await collection.find({}).toArray();
      res.json(findResult);
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve passwords' });
    }
  });

  app.post('/', async (req, res) => {
    try {
      const password = req.body;
      const result = await collection.insertOne(password);
      res.json({ success: true, result });
    } catch (err) {
      res.status(500).json({ error: 'Failed to add password' });
    }
  });

  app.delete('/', async (req, res) => {
    try {
      const { id } = req.body;
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Password not found' });
      }
      res.json({ success: true, result });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete password' });
    }
  });

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
});
