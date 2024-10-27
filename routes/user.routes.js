const express = require('express');
const { execute_procedure } = require('../services/db.service');
const { isValidEmail } = require('../services/util.service');

const router = express.Router();

router.post('/register', async function (req, res) {
  const userData = req.body;

  if (!userData.name || !userData.email || !userData.password || !userData.repeat_password || !userData.country || !userData.language) {
    return res.json({ ok: false, msg: 'All fields are required.', data: null });
  }

  if (!isValidEmail(userData.email)) {
    return res.json({ ok: false, msg: 'Invalid email format.', data: null });
  }

  if (userData.password !== userData.repeat_password) {
    return res.json({ ok: false, msg: 'Passwords do not match.', data: null });
  }

  try {
    const procedureName = 'sp_user_register';
    const inputs = [
      userData.name,
      userData.email,
      userData.password,
      userData.repeat_password,
      userData.country,
      userData.language,
    ];
    
    const result = await execute_procedure(procedureName, inputs);
    const resultRow = result[0][0];

    res.json(resultRow);
  } catch (error) {
    console.error('Error registering user:', error);
    res.json({ ok: false, msg: 'An error occurred during registration.', data: null });
  }
});

module.exports = router;
