'use strict';

const express = require('express');
const router = new express.Router();

module.exports = router;

router.use(require ('./users'));
router.use(require ('./locations'));
