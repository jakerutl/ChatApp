const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) =>{
	res.sendFile(path.resolve(__dirname, '../views/index.html'));
});//tells which file to serve. this will route the URL

module.exports = router;