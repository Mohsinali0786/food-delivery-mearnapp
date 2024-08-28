const OrderItem = require('../models/orderModels')

const { createError } = require('../error')


const orderItem = async (req, res, next) => {
    try {
        console.log(req.body)
        const { orderItems, totalAmount, totalItems, userId } = req.body;
        console.log(orderItems,'orderItems')
        // const existingUser = await Food.findOne({ email }).exec();
        // if (existingUser) {
        //     return next(createError(409, "Email is already in use." ,res));
        // }
        // const salt = bcrypt.genSaltSync(10);
        // const hashedPassword = bcrypt.hashSync(password, salt);

        const food = new OrderItem({
            orderItems:orderItems,
            user:userId,
            totalAmount,
            totalItems,
        });
        const createFood = await food.save();
        console.log('createFood', createFood)

        return res.status(201).json({ createFood });
    } catch (err) {
        next(err);
    }
}

const getOrderItem = async (req, res, next) => {
    try {
        // const { foodItemId, totalAmount, totalItems, userId } = req.body;

        const allOrderedItems =await  OrderItem.findById(req.body.id);

        return res.status(201).json({ allOrderedItems });
    } catch (err) {
        next(err);
    }
}




module.exports = { orderItem , getOrderItem}