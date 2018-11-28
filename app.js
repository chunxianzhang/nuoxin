const express=require("express");
const bodyParser=require("body-parser");
const user=require('./routes/user.js');
const session=require("express-session")
const banner=require('./routes/banner.js')
const product=require('./routes/product.js')
const goods=require('./routes/goods.js')
const shoppingcar=require('./routes/shoppingcar.js')
var app=express();
app.listen(3000);
app.use(express.static('web-html'));
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(session({
    secret: '128位随机字符串',
    resave: false,
    saveUninitialized: true,
}))
app.use('/user',user);
app.use('/banner',banner);
app.use('/product',product);
app.use('/goods',goods);
app.use('/cart',shoppingcar);