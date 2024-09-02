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
    if (!ObjectId.isValid(id)) {
      console.log('Invalid ID format:', id);
      throw new Error('Invalid ID');
    }

    console.log('Deleting document with ID:', id);
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
    console.log('Delete result:', result);
    return result;
  } catch (error) {
    console.error('Error in deleteById:', error);
    throw error;
  }
}

async updateById(id, data) {
  try {
    if (!ObjectId.isValid(id)) {
      console.log('Invalid ID format:', id);
      throw new Error('Invalid ID');
    }

    console.log('Updating document with ID:', id, 'Update data:', data);
    const result = await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
    console.log('Update result:', result);
    return result;
  } catch (error) {
    console.error('Error in updateById:', error);
    throw error;
  }
}

}

module.exports = Password;
