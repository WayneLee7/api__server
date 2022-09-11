const express = require('express')
const app = express()
const joi = require('joi')
// 配置解析 application/x-www-form-urlencoded格式的表单数据中间件 
app.use(express.urlencoded({ extended: false }))

const cors = require('cors')
app.use(cors())


// 封装res.cc函数
app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

// 解析token的中间件
const expressJWT = require('express-jwt')
const config = require('./config')
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }))

// 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

const userInfoRouter = require('./router/userinfo')
app.use('/my', userInfoRouter)

// 文章分类
const artCateRouter = require('./router/artcate')
app.use('/my/article', artCateRouter)
// 使用文章
const articleRouter = require('./router/article')
app.use('/my/article', articleRouter)

// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))

app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) {
        return res.cc(err)
    }
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败')
    res.cc(err)
})

app.listen(83, () => {
    console.log('api server running at http://127.0.0.1:83');
})
