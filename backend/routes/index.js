const express =require('express')
const routes = express.Router()


routes.use(require('./authRutes'))
routes.use(require('./foodRoutes'))
routes.use(require('./orderRoutes'))
// routes.use(require('./get'))


module.exports = routes