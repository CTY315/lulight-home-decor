const router = require('express').Router()
const {default: Axios} = require('axios')
const {OrderHistory} = require('../db/models')
const {Order} = require('../db/models')

//add product to order
router.put('/', async (req, res, next) => {
  //req.body is empty
  console.log('inside express route!!!!!!', req.user.id)
  try {
    const order = await Order.findOne({
      where: {userId: req.user.id},
      // include: {model: OrderHistory},
      include: [{all: true}]
    })
    console.log(order)
    const orderProduct = await OrderHistory.findOne({
      where: {
        orderId: order.id,
        productId: req.body.productId
      }
    })
    if (orderProduct) {
      await orderProduct.update({
        orderId: req.body.orderId,
        productId: req.body.productId,
        quantity: quantity++
      })
      res.json(orderProduct)
    } else {
      const newOrderProduct = await OrderHistory.create({
        orderId: order.id,
        productId: req.body.productId,
        quantity: 1
      })
      res.json(newOrderProduct)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
