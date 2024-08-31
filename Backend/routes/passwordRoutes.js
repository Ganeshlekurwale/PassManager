const express = require('express');
const { getAllPasswords, createPassword, deletePassword } = require('../controllers/passwordController');

const router = express.Router();

router.get('/getpass', getAllPasswords);
router.post('/setpass', createPassword);
router.delete('/delete', deletePassword);

module.exports = router;
