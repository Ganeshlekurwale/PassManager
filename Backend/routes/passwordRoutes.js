const express = require('express');
const { getAllPasswords, createPassword, deletePassword, updatePassword } = require('../controllers/passwordController');

const router = express.Router();

router.get('/getpass', getAllPasswords);
router.post('/setpass', createPassword);
router.put('/update', updatePassword);
router.delete('/delete:id', deletePassword);

module.exports = router;
