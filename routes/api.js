var express = require('express');
var router = express.Router();
const yahooStockPrices = require('yahoo-stock-prices')
const {Portfolio, Wallet} = require('../lib/models');

// - GET http://localhost:3000/api/v1/search/:symbol
//     - GET http://localhost:3000/api/v1/portfolio
//     - POST http://localhost:3000/api/v1/portfolio  {stockSymbol: "AAPL", quantity: 100, price: 50}

//     - DELETE http://localhost:3000/api/v1/portfolio/45


router.get('/search/:symbol', async function(req, res, next) {
    console.log('the req.params are', req.params)
    const data = await yahooStockPrices.getCurrentData(req.params.symbol);
    res.json(data)
});

router.get('/portfolio', async function(req, res, next) {
    let items = await Portfolio.findAll({});
    res.json(items);
});

router.post('/portfolio', async function(req, res, next) {
    console.log('.the req.body is', req.body)
    let item = await Portfolio.create(req.body)

    res.json(item)
});

router.delete('/portfolio/:id', async function(req, res, next) {
    await Portfolio.destroy({
        where: {
          id: req.params.id
        }
      })
      res.json({success:true})
});

/* GET home page. */
router.get('/test', function(req, res, next) {
    res.json({api: true})
});

module.exports = router;