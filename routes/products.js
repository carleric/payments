var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var products = [{id:1, price:14.99, title:"Ball cap", description:"Bob's brand ball cap."},
  	{id:2, price:24.95, title:"T-shirt", description:"Bob's brand t-shirt, size Large."},
  	{id:3, price:44.99, title:"Sweat shirt", description:"Bob's brand sweat shirt, size Medium."},
  	{id:4, price:39.95, title:"Sweat pants", description:"Bob's brand sweat pants, size Large."}];
  res.render('products', {products: products});
});

module.exports = router;
