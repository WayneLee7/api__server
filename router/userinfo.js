const express = require('express')
const router = express.Router()

const userinfo_handler = require('../router_handler/userinfo')
const expressJoi = require('@escook/express-joi')
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')
// 挂载路由
router.get('/userinfo', userinfo_handler.getUserInfo)

router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)

// 更新密码
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)
module.exports = router
// 更新用户头像
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)