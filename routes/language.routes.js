const express = require('express');
const router = express.Router();
const dbService = require('../services/db.service');

router.post('/getall', async (req, res) => {
  const result = await dbService.execute_procedure('sp_language_getall');
  res.json(result[0]);
});

module.exports = router;
