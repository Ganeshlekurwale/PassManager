const Password = require('../models/Password');

async function getAllPasswords(req, res) {
  try {
    const passwordModel = new Password();
    const passwords = await passwordModel.findAll();
    console.log(passwords);
    
    res.json(passwords);
  } catch (err) {
    console.error('Failed to retrieve passwords:', err);
    res.status(500).json({error: 'Failed to retrieve passwords' });
  }
  
}

async function createPassword(req, res) {
  try {
    const passwordModel = new Password(req.body);
    const result = await passwordModel.create();
    res.json({ success: true, result });
  } catch (err) {
    console.error('Failed to add password:', err);
    res.status(500).json({ error: 'Failed to add password' });
  }
}

async function deletePassword(req, res) {
  try {
    const { id } = req.body;
    const passwordModel = new Password();
    const result = await passwordModel.deleteById(id);
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Password not found' });
    }
    res.json({ success: true, result });
  } catch (err) {
    console.error('Failed to delete password:', err);
    res.status(500).json({ error: 'Failed to delete password' });
  }
}

module.exports = { getAllPasswords, createPassword, deletePassword };