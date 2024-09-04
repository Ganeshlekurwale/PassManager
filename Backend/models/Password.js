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
  try {
    if (!id) {
      throw new Error('Invalid ID');
    }

    const result = await this.collection.deleteOne({ id });
    return result;
  } catch (error) {
    throw error;
  }
}

async updateById(id, data) {
  try {
    if (!id) {
      throw new Error('Invalid ID');
    }
    const result = await this.collection.updateOne({ id }, { $set: data });
    return result;
  } catch (error) {
    console.error('Error in updateById:', error);
    throw error;
  }
}

}

module.exports = Password;
