const express=require('express')
const pool=require('../pool.js')
const cors=require('cors')
const router=express.Router()
router.use(cors({
    origin:["http://localhost:3000","http//127.0.0.1:3000"],
    credentials:true,
}))
router.post('/addCar',(req,res)=>{
    if(req.session.uid===undefined){
        res.send({code:-1,msg:'请先登录'})
    }else{
        var uid=req.session.uid
        var pid=req.body.pid
        var count=1
        var checked=1
        var showWish=0
        var sql=`SELECT * FROM shoppingcar WHERE user_id=? AND goods_id=? `
        pool.query(sql,[uid,pid],(err,result)=>{
            if(err)throw err
            if(result.length==0){
                var sql=`INSERT INTO shoppingcar(user_id,goods_id,count,isChecked,showWish) VALUES(?,?,?,?,?)`
                pool.query(sql,[uid,pid,count,checked,showWish],(err,result)=>{
                    if(err)throw err
                    res.send({code:1})
                })
            }else{
                var sql=`UPDATE shoppingcar SET count=count+? WHERE user_id=? AND goods_id=?`
                pool.query(sql,[count,uid,pid],(err,result)=>{
                    if(err)throw err
                    res.send({code:1})
                })
            }
        })
    }
})
router.get('/userCake',(req,res)=>{
    var uid=req.session.uid
    if(uid===undefined){
        res.send({code:-1})
    }else{
        sql=`SELECT user_id,isChecked,showWish,wishHint,userWish,goods_id,count,title,img_url,skip_url,price FROM shoppingcar ENNER JOIN product WHERE user_id=? AND product.id=goods_id  ORDER BY cid DESC`
        pool.query(sql,[uid],(err,result)=>{
            if(err)throw err
            if(result.length==0){
                res.send({code:-1})
            }else{
                res.send(result)
            }
        })
    }
})
router.get('/getCount',(req,res)=>{
    var uid=req.session.uid
    if(uid===undefined){
        res.send([{count:""}])
    }else{
        var sql=`SELECT SUM(count) count FROM shoppingcar WHERE user_id=?`
        pool.query(sql,[uid],(err,result)=>{
            if(err)throw err
            if(result[0].count==null){
                res.send([{count:""}])
            }else{
                res.send(result)
            }
        })
    }
})
router.get('/updateCount',(req,res)=>{
    var goods_id=req.query.goods_id
    var uid=req.session.uid
    var count=req.query.count
    var sql=`UPDATE shoppingcar SET count=? WHERE user_id=? AND goods_id=?`
    pool.query(sql,[count,uid,goods_id],(err,result)=>{
        if(err)throw err
        res.send({code:1})
    })
})
router.get('/deleteGoods',(req,res)=>{
    var goods_id=req.query.goods_id
    var uid=req.session.uid
    var sql=`DELETE FROM shoppingcar WHERE user_id=? AND goods_id=?`
    pool.query(sql,[uid,goods_id],(err,result)=>{
        if(err)throw err
        res.send({code:1})
    })
})
router.get('/updateCheck',(req,res)=>{
    var goods_id=req.query.goods_id
    var uid=req.session.uid
    var check=req.query.check
    var sql=`UPDATE shoppingcar SET isChecked=? WHERE user_id=? AND goods_id=?`
    pool.query(sql,[check,uid,goods_id],(err,result)=>{
        if(err)throw err
        res.send({code:1})
    })
})
router.get('/allChecked',(req,res)=>{
    var uid=req.session.uid
    var sql=`UPDATE shoppingcar SET isChecked=1 WHERE user_id=?`
    pool.query(sql,[uid],(err,result)=>{
        if(err)throw err
        res.send({code:1})
    })
})
router.get('/allNoChecked',(req,res)=>{
    var uid=req.session.uid
    var sql=`UPDATE shoppingcar SET isChecked=0 WHERE user_id=?`
    pool.query(sql,[uid],(err,result)=>{
        if(err)throw err
        res.send({code:1})
    })
})
router.get('/deleteAllGoods',(req,res)=>{
    var uid=req.session.uid
    var sql=`DELETE FROM shoppingcar WHERE user_id=?`
    pool.query(sql,[uid],(err,result)=>{
        if(err)throw err
        res.send({code:1})
    })
})
router.get('/getAccessories',(req,res)=>{
    var sql=`SELECT aid,aname,price,img_url FROM accessories`
    pool.query(sql,(err,result)=>{
        if(err)throw err
        res.send(result)
    })
})





module.exports=router