const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;

// http://localhost:3000/api/categories'
// http://localhost:3000/api/products'
// http://localhost:3000/api/tags'