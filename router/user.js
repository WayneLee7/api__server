const express = require('express')

const router = express.Router()

const userHandler = require('../router_handler/user')

// 导入验证数据中间件
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user')


router.post('/reguser', expressJoi(reg_login_schema), userHandler.regUser)

router.post('/login', expressJoi(reg_login_schema), userHandler.login)

module.exports = router 