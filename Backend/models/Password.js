const { ObjectId } = require('mongodb');
const { getDb } = require('../config/database');

class Password {
  constructor(data) {
    this.collection = getDb().collection('passwords');
    this.data = data;
  }

  async findAll() {
    return await this.collection.find({}).toArray();
  }

  async create() {
    return await this.collection.insertOne(this.data);
  }

  async deleteById(id) {
    return await this.collection.deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = Password;