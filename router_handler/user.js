const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt= require('jsonwebtoken')
const config = require('../config')
exports.regUser=(req,res)=>{
    const userinfo = req.body
    // if(!userinfo.username||!userinfo.password){
    //     // res.send({status:1,message:'用户名或密码不能为空'})
    //     res.cc('用户名或密码不能为空')
    // }
    const sqlStr='select * from ev_users where username=?'
    db.query(sqlStr,userinfo.username,(err,results)=>{
        if(err){
            // return res.send({status:1,message:err.message})
            return res.cc(err)
        }
        if(results.length>0){
            // return res.send({status:1, message:'用户名被占用，请更换'})
            return res.cc('用户名被占用，请更换')
        }
      userinfo.password=bcrypt.hashSync(userinfo.password,10)
      const sql = 'insert into ev_users set ?'
      db.query(sql,{username:userinfo.username,password:userinfo.password},(err,results)=>{
        if(err){
            return res.send({status:1,message:err.message})
        }
        if(results.affectedRows!==1){
            // return res.send({status:1,message:'注册用户失败，请稍后再试'})
            return res.cc('注册用户失败，请稍后再试')
        }
        // return res.send({status:0,message:'注册成功'})
        return res.cc('注册成功',0)
      })
    })
}


exports.login= (req,res)=>{
    const userInfo = req.body
    const sql=`select * from ev_users where username=?`
    db.query(sql,userInfo.username,(err,results)=>{
        if(err) return res.cc(err)
        if(results.length!==1) return res.cc('登录失败!')
        // 判断密码是否正确
     const compareResult=  bcrypt.compareSync(userInfo.password,results[0].password)
     if(!compareResult) return res.cc('登录失败')
        const user= {...results[0],password:'',user_pic:''}
        const tokenStr=jwt.sign(user,config.jwtSecretKey,{expiresIn:config.expiresIn})
        res.send({
            status:0,
            message:'登录成功',
            token:'Bearer '+tokenStr
        })
    })
}