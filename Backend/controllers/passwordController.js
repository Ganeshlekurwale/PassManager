const Password = require('../models/Password');
const { ObjectId } = require('mongodb');

async function getAllPasswords(req, res) {
  try {
    const passwordModel = new Password();
    const passwords = await passwordModel.findAll();

    if (!passwords || passwords.length === 0) {
      return res.status(404).json({ error: 'No passwords found' });
    }

    res.json(passwords);
  } catch (err) {
    console.error('Failed to retrieve passwords:', err);
    res.status(500).json({ error: 'Failed to retrieve passwords' });
  }
}

async function createPassword(req, res) {
  try {
    const { site, username, password } = req.body;

    if (!site || !username || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const passwordModel = new Password(req.body);
    const result = await passwordModel.create();

    res.status(201).json({ success: true, result });
  } catch (err) {
    console.error('Failed to add password:', err);
    res.status(500).json({ error: 'Failed to add password' });
  }
}

async function deletePassword(req, res) {
  try {
    const { id } = req.body;
   
    
    if (!id) {
      return res.status(400).json({ error: 'Valid Password ID is required' });
    }
    
    const passwordModel = new Password();
  
    const result = await passwordModel.deleteById(id);
      console.log(id);
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Password not found' });
    }

    res.json({ success: true, result });
  } catch (err) {
    console.error('Failed to delete password:', err);
    res.status(500).json({ error: 'Failed to delete password' });
  }
}

async function updatePassword(req, res) {
  try {
    const { id, site, username, password } = req.body;

    if (!id || !ObjectId.isValid(id) || !site || !username || !password) {
      return res.status(400).json({ error: 'Valid ID and all fields are required' });
    }

    const passwordModel = new Password();
    const result = await passwordModel.updateById(id, { site, username, password });

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Password not found or no change' });
    }

    res.json({ success: true, result });
  } catch (err) {
    console.error('Failed to update password:', err);
    res.status(500).json({ error: 'Failed to update password' });
  }
}

module.exports = { getAllPasswords, createPassword, deletePassword, updatePassword };
