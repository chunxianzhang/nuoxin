const express=require('express');
var router=express.Router();
const pool=require('../pool.js');
const cors=require('cors')
router.use(cors({
    origin:["http://127.0.0.1:3000","http://localhost:3000"],
    credentials:true
}))
router.post('/register',(req,res)=>{
    var obj=req.body
    $uname=obj.uname
    $upwd=obj.upwd
    var sql1="SELECT * FROM user WHERE uname=?"
    var sql2=`INSERT INTO user(uname,upwd) value (?,?)`
    pool.query(sql1,[$uname],(err,result)=>{
        if(err)throw err;
        res.writeHead(200,{
            "Content-Type":"application/json;charset=utf-8",
        })
        if(result.length>0){
            res.write("0")
            res.end()
        }else{
            pool.query(sql2,[$uname,$upwd],(err,result)=>{
                if(err) throw err;
                if(result.affectedRows>0){
                    res.write("1")
                    res.end()
                }else{
                    res.write("2")
                    res.end()
                }
            })
        }
    })  
});
router.post('/login',(req,res)=>{
    var uname=req.body.uname
    var upwd=req.body.upwd
    var sql=`SELECT * FROM user WHERE uname=? AND upwd=?`
    pool.query(sql,[uname,upwd],(err,result)=>{
        if(err)throw err
        res.writeHead(200,{
            "Content-Type":"application/json;charset=utf-8",
        })
        if(result.length>0){
            req.session.uid=result[0].uid
            res.write(JSON.stringify({
                ok:1,
                uname:uname,
            }))
            res.end()
        }else{
            res.write(JSON.stringify({
                ok:0,
                upwd:upwd
            }))
            res.end()
        }
    })
})
router.get('/islogin',(req,res)=>{
    res.writeHead(200,{
        "Content-Type":"application/json;charset=utf-8",
    })
    if(req.session.uid===undefined){
        res.write(JSON.stringify({ok:0}))
        res.end()
    }else{
        var uid=req.session.uid
        var sql=`SELECT * FROM user WHERE uid=?`
        pool.query(sql,[uid],(err,result)=>{
            if(err)throw err
            res.write(JSON.stringify({
                ok:1,
                uname:result[0].uname,
            }))
            res.end()
        })
        
    }
})
router.get('/signout',(req,res)=>{
    req.session.uid=undefined
    res.end()
})

module.exports=router;