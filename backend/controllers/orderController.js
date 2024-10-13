const { matches } = require('validator');
const OrderItem = require('../models/orderModels')
const userModel = require('../models/userModel')
const Stripe = require('stripe');
const orderModels = require('../models/orderModels');
require('dotenv').config();

console.log('process.env.STRIPE_SECRETE_KEY', process.env.STRIPE_SECRETE_KEY)
const stripe = new Stripe(`${process.env.STRIPE_SECRETE_KEY}`)

const frontend_Url = 'http://localhost:5174/'
const placeOrder = async (req, res, next) => {
    // console.log('stripe   sss', process.env.STRIPE_SECRETE_KEY)
    // try {
    //     console.log('bodyyyyyyy', req.body)
    //     const { items, amount, userId, address } = req.body;

    //     const newOrder = new OrderItem({
    //         userId,
    //         items,
    //         amount,
    //         address,
    //     });
    //     await newOrder.save();
    //     await userModel.findByIdAndUpdate(userId, { cart: [] });
    //     console.log(items, 'items')
    //     const line_items = items.map((item) => ({
    //         price_data: {
    //             currency: 'pkr',
    //             product_data: {
    //                 name: `Name : ${item.name}`,
    //             },
    //             unit_amount: Math.round(item.price?.mrp * 277.41 * 100),
    //         },
    //         quantity: item.quantity
    //     }))
    //     line_items.push({
    //         price_data: {
    //             currency: "pkr",
    //             product_data: {
    //                 name: "Delivery Charges"
    //             },
    //             unit_amount: Math.round(2 * 277.41 * 100)
    //         },
    //         quantity: 1
    //     })
    //     const session = await stripe.checkout.sessions.create({
    //         line_items: line_items,
    //         mode: 'payment',
    //         success_url: `${frontend_Url}verify?success=true&orderId=${newOrder._id}`,
    //         cancel_url: `${frontend_Url}verify?success=false&orderId=${newOrder._id}`

    //     })
    //     res.json({ success: true, session_url: session.url })

    // } catch (err) {
    //     console.log(err, 'errrrrrrr')
    //     res.json({ success: false, message: 'Error' })
    // }
}

const verifyOrder = async (req, res, next) => {
    // const { orderId, success } = req.body;
    // try {
    //     if (success == "true") {
    //         await orderModels.findByIdAndUpdate(orderId, { payment: true })
    //         res.json({ success: true, message: 'paid' })
    //     }
    //     else {
    //         await orderModels.findByIdAndDelete(orderId)
    //         res.json({ success: false, message: 'Not Paid' })
    //     }
    // } catch (err) {
    //     console.log(err, 'errrrrrrr')
    //     res.json({ success: false, message: 'Error' })
    // }
}

const userOrder = async (req, res, next) => {
    // const { orderId, success } = req.body;
    // try {
    //     const orders = await OrderItem.find({userId:req.body.userId});
    //     res.json({ success: true, data: orders })

    // } catch (err) {
    //     console.log(err, 'errrrrrrr')
    //     res.json({ success: false, message: 'Error' })
    // }
}

// list order for admin panel
const listOrder = async (req, res, next) => {
    // try {
    //     const orders = await OrderItem.find();
    //     res.json({ success: true, data: orders })

    // } catch (err) {
    //     console.log(err, 'errrrrrrr')
    //     res.json({ success: false, message: 'Error' })
    // }
}
// api for update status


const updateStatus = async (req, res, next) => {
    // try {

    //     await OrderItem.findByIdAndUpdate(req.body.orderId, { status: req.body.status });

    //     res.json({ success: true, message: 'Status Updated' })

    // } catch (err) {
    //     console.log(err, 'errrrrrrr')
    //     res.json({ success: false, message: 'Error' })
    // }
}

const getOrderItem = async (req, res, next) => {
    // try {

    //     const allOrderedItems = await OrderItem.findById(req.body.id);

    //     return res.status(201).json({ allOrderedItems });
    // } catch (err) {
    //     next(err);
    // }
}




module.exports = { placeOrder, getOrderItem, verifyOrder , userOrder , listOrder ,updateStatus}