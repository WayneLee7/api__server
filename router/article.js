const express = require('express')
const router = express.Router()
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入文章的验证模块
const { add_article_schema } = require('../schema/article')


const article_handler = require('../router_handler/article')
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), article_handler.addArticle)

module.exports = router