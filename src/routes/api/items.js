const express = require('express');

const router = express.Router();
const itemService = require('../../service/items');

router.get('/', async (req, res, next) => {
  try {
    const { cate_id } = req.query;
    const result = await itemService.read(cate_id);
    await res.send({ success: true, data: result });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
