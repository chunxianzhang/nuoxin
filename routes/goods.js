const express=require('express')
const pool=require('../pool.js')
const cors=require('cors')
var router=express.Router()
router.use(cors({
    origin:["http://127.0.0.1:3000","http://localhost:3000"],
    credentials:true
}))
router.get('/goodsList',(req,res)=>{
    var gid=req.query.goods
    var sql=`SELECT product.id id,gid,gname,title_url,subtitle_url,t1_url,price,spec,kg,sweet,taste FROM goods INNER JOIN product ON gid=? AND title=gname`
    pool.query(sql,[gid],(err,result)=>{
        if(err)throw err
        if(result.length>0){
            res.send(result[0])
        }else{
            res.send({code:-1})
        }
    })
})
router.get('/recommendList',(req,res)=>{
    var sql=`SELECT product.id id,pid,img_url,skip_url,title,price,price_vip,tag1,tag2 FROM product ORDER BY pid LIMIT 0,4`
    pool.query(sql,(err,result)=>{
        if(err)throw err
        res.send(result)
    })
})


module.exports=router