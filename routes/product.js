const express=require('express')
const pool=require('../pool.js')
const cors=require('cors')
var router=express.Router()
router.use(cors({
    origin:["http://127.0.0.1:3000","http://localhost:3000"],
    credentials:true
}))
router.get('/title',(req,res)=>{
    var sql=`SELECT id,tid,img_url,skip_url FROM product_title ORDER BY tid LIMIT 0,2`
    pool.query(sql,(err,result)=>{
        if(err)throw err
        res.send(result)
    })
})
router.get('/list',(req,res)=>{
    var sql=`SELECT id,pid,img_url,skip_url,title,price,price_vip,tag1,tag2 FROM product ORDER BY pid LIMIT 0,8`
    pool.query(sql,(err,result)=>{
        if(err)throw err
        res.send(result)
    })
})
router.get('/proSpec',(req,res)=>{
    var id=req.query.id
    if(id==""){
        res.send("-1")
        return
    }
    var sql=`SELECT id,pid,title,price,taste,spec,sweet,kg FROM product WHERE pid=?`
    pool.query(sql,[id],(err,result)=>{
        if(err)throw err
        if(result.length>0){
            res.send(result[0])
        }else{
            res.send("-1")
        }
    })
})
router.get('/toastList',(req,res)=>{
    var sql=`SELECT id,tid,img_url,skip_url,title,price,price_vip,tag1,tag2 FROM toast ORDER BY tid LIMIT 0,4`
    pool.query(sql,(err,result)=>{
        if(err)throw err
        res.send(result)
    })
})
router.get('/giftList',(req,res)=>{
    var sql=`SELECT id,gid,img_url,skip_url,title,price,price_vip,tag1,tag2 FROM gift ORDER BY gid LIMIT 0,4`
    pool.query(sql,(err,result)=>{
        if(err)throw err
        res.send(result)
    })
})
router.get('/cakeList',(req,res)=>{
    var sql=`SELECT id,pid,img_url,skip_url,title,price,price_vip,tag1,tag2,taste FROM product ORDER BY pid`
    pool.query(sql,(err,result)=>{
        if(err)throw err
        res.send(result)
    })
})
router.get('/search',(req,res)=>{
    var kw=req.query.kw
    kw="%"+kw+"%"
    var sql=`SELECT id,pid,img_url,skip_url,title,price,price_vip,tag1,tag2 FROM product WHERE title LIKE ? ORDER BY pid`
    pool.query(sql,[kw],(err,result)=>{
        if(err)throw err
        if(result.length>0){
            res.send(result)
        }else{
            res.send({code:-1})
        }
    })
})

module.exports=router