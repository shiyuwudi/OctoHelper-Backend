const express = require('express');

const router = express.Router();
const service = require('../../service/categories');

router.get('/', async (req, res, next) => {
  try {
    const result = await service.read();
    await res.send({ success: true, data: result });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
