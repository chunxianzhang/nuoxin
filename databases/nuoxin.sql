#设置客户端使用utf-8编码
SET NAMES UTF8;
#删除数据库,如果存在的话
DROP DATABASE IF EXISTS nuoxin;
#创建数据库并设置编码utf-8
CREATE DATABASE nuoxin CHARSET=UTF8;
#进入数据库
USE nuoxin;
#创建用户资料数据表
CREATE TABLE user(
    uid INT PRIMARY KEY AUTO_INCREMENT,
    uname VARCHAR(11),
    upwd VARCHAR(12),
    gender BOOL,
    user_name VARCHAR(8),
    user_add VARCHAR(32),
    birthday DATE,
    phone INT,
    MSN_id VARCHAR(32),
    QQ_id INT,
    vip BOOL
);
INSERT INTO user(uname,upwd) VALUES("13000000000","11111a");
CREATE TABLE shipping_address(
    add_id INT PRIMARY KEY AUTO_INCREMENT,
    uid INT,
    consigness VARCHAR(8),
    take_add VARCHAR(32),
    postcode INT,
    phone INT,
    tel INT,
    FOREIGN KEY(uid) REFERENCES user(uid) 
);
CREATE TABLE integral(
    integral_id INT PRIMARY KEY AUTO_INCREMENT,
    uid INT,
    integral_balance DECIMAL(8),
    frost_integral DECIMAL(8),
    FOREIGN KEY(uid) REFERENCES user(uid)
);
CREATE TABLE money(
    mid INT PRIMARY KEY AUTO_INCREMENT,
    uid INT,
    money_balance DECIMAL(10,2),
    frost_integral DECIMAL(10,2),
    FOREIGN KEY(uid) REFERENCES user(uid)
);
CREATE TABLE card(
    cid INT PRIMARY KEY AUTO_INCREMENT,
    uid INT,
    cake_card INT,
    deposit_card_one INT,
    deposit_card_two INT,
    FOREIGN KEY(uid) REFERENCES user(uid)
);
CREATE TABLE ticket(
    tid INT PRIMARY KEY AUTO_INCREMENT,
    uid INT,
    can_use_ticket VARCHAR(128),
    not_use_ticket VARCHAR(128),
    FOREIGN KEY(uid) REFERENCES user(uid)
);
CREATE TABLE le_family(
    le_id INT PRIMARY KEY AUTO_INCREMENT,
    uid INT,
    my_le_name VARCHAR(8),
    my_gender BOOL,
    my_constellation VARCHAR(3),
    my_taste VARCHAR(128),
    family_le_name VARCHAR(8),
    family_gender BOOL,
    family_constellation VARCHAR(3),
    family_taste VARCHAR(128),
    FOREIGN KEY(uid) REFERENCES user(uid)
);
CREATE TABLE banner(
    bid INT PRIMARY KEY AUTO_INCREMENT,
    banner_id INT,
    img_url VARCHAR(128),
    skip_url VARCHAR(128)
);
INSERT INTO banner(banner_id,img_url,skip_url) VALUES(1,"http://localhost:3000/img/banner/banner1.png","http://localhost:3000/index.html");
INSERT INTO banner(banner_id,img_url,skip_url) VALUES(2,"http://localhost:3000/img/banner/banner2.png","http://localhost:3000/index.html");
INSERT INTO banner(banner_id,img_url,skip_url) VALUES(3,"http://localhost:3000/img/banner/banner3.png","http://localhost:3000/index.html");
INSERT INTO banner(banner_id,img_url,skip_url) VALUES(4,"http://localhost:3000/img/banner/banner4.png","http://localhost:3000/index.html");
INSERT INTO banner(banner_id,img_url,skip_url) VALUES(5,"http://localhost:3000/img/banner/banner5.png","http://localhost:3000/index.html");

CREATE TABLE product_title(
    id INT PRIMARY KEY AUTO_INCREMENT,
    tid INT,
    img_url VARCHAR(128),
    skip_url VARCHAR(128)
);
INSERT INTO product_title(tid,img_url,skip_url) VALUES(1,"http://localhost:3000/img/index/title/title_left.jpg","http://localhost:3000/index.html");
INSERT INTO product_title(tid,img_url,skip_url) VALUES(2,"http://localhost:3000/img/index/title/title_right.jpg","http://localhost:3000/index.html");
CREATE TABLE product(
    id INT PRIMARY KEY AUTO_INCREMENT,
    pid INT,
    img_url VARCHAR(128),
    skip_url VARCHAR(128),
    title VARCHAR(16),
    price DECIMAL(8,2),
    price_vip DECIMAL(8,2),
    tag1 VARCHAR(16),
    tag2 VARCHAR(16),
    taste VARCHAR(16),
    spec VARCHAR(16),
    sweet VARCHAR(1),
    kg VARCHAR(16)
);
INSERT INTO product(pid,img_url,skip_url,title,price,price_vip,tag1,tag2,taste,spec,sweet,kg) VALUES(1,"http://localhost:3000/img/index/list/list_1.jpg","http://localhost:3000/goods.html?goods=1","雪域牛乳芝士",198,'',"人气爆款","","奶油口味","约13×20×8cm",1,"约425kg");
INSERT INTO product(pid,img_url,skip_url,title,price,price_vip,tag1,tag2,taste,spec,sweet,kg) VALUES(2,"http://localhost:3000/img/index/list/list_2.jpg","http://localhost:3000/goods.html?goods=2","环游世界·秋冬季蛋糕",198,'',"NEW","","莫斯口味","约13×13×4cm",2,"约390kg");
INSERT INTO product(pid,img_url,skip_url,title,price,price_vip,tag1,tag2,taste,spec,sweet,kg) VALUES(3,"http://localhost:3000/img/index/list/list_3.jpg","http://localhost:3000/goods.html?goods=3","提拉米苏脆蛋糕",198,128,"人气爆款","","莫斯口味","约13×13×4cm",1,"约430kg");
INSERT INTO product(pid,img_url,skip_url,title,price,price_vip,tag1,tag2,taste,spec,sweet,kg) VALUES(4,"http://localhost:3000/img/index/list/list_4.jpg","http://localhost:3000/goods.html?goods=4","草莓蛋糕",298,128,"人气爆款","+18元升级","鲜果口味","约13×13×4cm",4,"约410kg");
INSERT INTO product(pid,img_url,skip_url,title,price,price_vip,tag1,tag2,taste,spec,sweet,kg) VALUES(5,"http://localhost:3000/img/index/list/list_5.jpg","http://localhost:3000/goods.html?goods=5","栗子千层蛋糕",218,'',"NEW","","奶油口味","约13×13×4cm",1,"约410kg");
INSERT INTO product(pid,img_url,skip_url,title,price,price_vip,tag1,tag2,taste,spec,sweet,kg) VALUES(6,"http://localhost:3000/img/index/list/list_6.jpg","http://localhost:3000/goods.html?goods=6","美刀刀蛋糕",198,128,"人气爆款","+18元升级","芝士口味","约13×20×8cm",2,"约380kg");
INSERT INTO product(pid,img_url,skip_url,title,price,price_vip,tag1,tag2,taste,spec,sweet,kg) VALUES(7,"http://localhost:3000/img/index/list/list_7.jpg","http://localhost:3000/goods.html?goods=7","数字蛋糕",198,128,"HOT","+18元升级","奶油口味","约13×20×8cm",3,"约425kg");
INSERT INTO product(pid,img_url,skip_url,title,price,price_vip,tag1,tag2,taste,spec,sweet,kg) VALUES(8,"http://localhost:3000/img/index/list/list_8.jpg","http://localhost:3000/goods.html?goods=8","蓝域草莓蛋糕",198,128,"HOT","","奶油口味","约13×20×8cm",5,"约400kg");
INSERT INTO product(pid,img_url,skip_url,title,price,price_vip,tag1,tag2,taste,spec,sweet,kg) VALUES(9,"http://localhost:3000/img/index/list/list_9.jpg","http://localhost:3000/goods.html?goods=9","王子蛋糕",198,128,"NEW","","巧克力口味","约13×20×8cm",5,"约400kg");
INSERT INTO product(pid,img_url,skip_url,title,price,price_vip,tag1,tag2,taste,spec,sweet,kg) VALUES(10,"http://localhost:3000/img/index/list/list_10.jpg","http://localhost:3000/goods.html?goods=10","公主蛋糕",198,128,"","","巧克力口味","约13×20×8cm",5,"约400kg");
INSERT INTO product(pid,img_url,skip_url,title,price,price_vip,tag1,tag2,taste,spec,sweet,kg) VALUES(11,"http://localhost:3000/img/index/list/list_15.jpg","http://localhost:3000/goods.html?goods=11","爱·发声蛋糕",198,128,"","","莫斯口味","约13×20×8cm",5,"约400kg");
INSERT INTO product(pid,img_url,skip_url,title,price,price_vip,tag1,tag2,taste,spec,sweet,kg) VALUES(12,"http://localhost:3000/img/index/list/list_16.jpg","http://localhost:3000/goods.html?goods=12","牛乳蓝莓蓝域双拼蛋糕",228,178,"NEW","","雪域口味","约13×20×8cm",5,"约400kg");
INSERT INTO product(pid,img_url,skip_url,title,price,price_vip,tag1,tag2,taste,spec,sweet,kg) VALUES(13,"http://localhost:3000/img/index/list/list_17.jpg","http://localhost:3000/goods.html?goods=13","牛乳大理石雪域双拼",228,178,"","","奶油口味","约13×20×8cm",5,"约400kg");
INSERT INTO product(pid,img_url,skip_url,title,price,price_vip,tag1,tag2,taste,spec,sweet,kg) VALUES(14,"http://localhost:3000/img/index/list/list_18.jpg","http://localhost:3000/goods.html?goods=14","蓝域蛋糕",198,128,"","","奶油口味","约13×20×8cm",5,"约400kg");
INSERT INTO product(pid,img_url,skip_url,title,price,price_vip,tag1,tag2,taste,spec,sweet,kg) VALUES(15,"http://localhost:3000/img/index/list/list_24.jpg","http://localhost:3000/goods.html?goods=15","彩虹心情蛋糕",198,128,"","","奶油口味","约13×20×8cm",5,"约400kg");
CREATE TABLE toast(
    id INT PRIMARY KEY AUTO_INCREMENT,
    tid INT,
    img_url VARCHAR(128),
    skip_url VARCHAR(128),
    title VARCHAR(16),
    price DECIMAL(8,2),
    price_vip DECIMAL(8,2),
    tag1 VARCHAR(16),
    tag2 VARCHAR(16)
);
INSERT INTO toast(tid,img_url,skip_url,title,price,price_vip,tag1,tag2) VALUES(1,"http://localhost:3000/img/F1/F1_1.jpg","http://localhost:3000/goods.html?goods=1","熊抱巧克力吐司(整条)",98,58,"人气明星","2元加购牛奶");
INSERT INTO toast(tid,img_url,skip_url,title,price,price_vip,tag1,tag2) VALUES(2,"http://localhost:3000/img/F1/F1_2.jpg","http://localhost:3000/goods.html?goods=1","熊抱原味匠心吐司(整条)",88,68,"金牌吐司","2元加购牛奶");
INSERT INTO toast(tid,img_url,skip_url,title,price,price_vip,tag1,tag2) VALUES(3,"http://localhost:3000/img/F1/F1_3.jpg","http://localhost:3000/goods.html?goods=1","熊抱吐司经典套餐",198,128,"10月底前198元蛋糕卡可兑换","");
INSERT INTO toast(tid,img_url,skip_url,title,price,price_vip,tag1,tag2) VALUES(4,"http://localhost:3000/img/F1/F1_4.jpg","http://localhost:3000/goods.html?goods=1","熊抱吐司尊享套餐",128,"","10月底前298元蛋糕卡可兑换","");
CREATE TABLE gift(
    id INT PRIMARY KEY AUTO_INCREMENT,
    gid INT,
    img_url VARCHAR(128),
    skip_url VARCHAR(128),
    title VARCHAR(16),
    price DECIMAL(8,2),
    price_vip DECIMAL(8,2),
    tag1 VARCHAR(16),
    tag2 VARCHAR(16)
);
INSERT INTO gift(gid,img_url,skip_url,title,price,price_vip,tag1,tag2) VALUES(1,"http://localhost:3000/img/F2/F2_1.jpg","http://localhost:3000/goods.html?goods=1","巧克力礼盒一",98,58,"顺丰物流配送","买一赠一");
INSERT INTO gift(gid,img_url,skip_url,title,price,price_vip,tag1,tag2) VALUES(2,"http://localhost:3000/img/F2/F2_2.jpg","http://localhost:3000/goods.html?goods=1","巧克力礼盒二",88,"","顺丰物流配送","");
INSERT INTO gift(gid,img_url,skip_url,title,price,price_vip,tag1,tag2) VALUES(3,"http://localhost:3000/img/F2/F2_3.jpg","http://localhost:3000/goods.html?goods=1","巧克力礼盒三",198,128,"","");
INSERT INTO gift(gid,img_url,skip_url,title,price,price_vip,tag1,tag2) VALUES(4,"http://localhost:3000/img/F2/F2_4.jpg","http://localhost:3000/goods.html?goods=1","巧克力礼盒四",128,"","","");
CREATE TABLE goods(
    id INT PRIMARY key AUTO_INCREMENT,
    gid INT,
    gname VARCHAR(16),
    title_url VARCHAR(128),
    subtitle_url VARCHAR(128),
    t1_url VARCHAR(128)
);
INSERT INTO goods(gid,gname,title_url,subtitle_url,t1_url) VALUES(1,"雪域牛乳芝士","http://localhost:3000/img/product/goods-1/title.jpg","http://localhost:3000/img/product/goods-1/subtitle.jpg","http://localhost:3000/img/product/goods-1/t1.jpg");
INSERT INTO goods(gid,gname,title_url,subtitle_url,t1_url) VALUES(2,"环游世界·秋冬季蛋糕","http://localhost:3000/img/product/goods-2/title.jpg","http://localhost:3000/img/product/goods-2/subtitle.jpg","http://localhost:3000/img/product/goods-2/t1.jpg");
INSERT INTO goods(gid,gname,title_url,subtitle_url,t1_url) VALUES(3,"提拉米苏脆蛋糕","http://localhost:3000/img/product/goods-3/title.jpg","http://localhost:3000/img/product/goods-3/subtitle.jpg","http://localhost:3000/img/product/goods-3/t1.jpg");
INSERT INTO goods(gid,gname,title_url,subtitle_url,t1_url) VALUES(4,"草莓蛋糕","http://localhost:3000/img/product/goods-4/title.jpg","http://localhost:3000/img/product/goods-4/subtitle.jpg","http://localhost:3000/img/product/goods-4/t1.jpg");
INSERT INTO goods(gid,gname,title_url,subtitle_url,t1_url) VALUES(5,"栗子千层蛋糕","http://localhost:3000/img/product/goods-5/title.jpg","http://localhost:3000/img/product/goods-5/subtitle.jpg","http://localhost:3000/img/product/goods-5/t1.jpg");
INSERT INTO goods(gid,gname,title_url,subtitle_url,t1_url) VALUES(6,"美刀刀蛋糕","http://localhost:3000/img/product/goods-6/title.jpg","http://localhost:3000/img/product/goods-6/subtitle.jpg","http://localhost:3000/img/product/goods-6/t1.jpg");
INSERT INTO goods(gid,gname,title_url,subtitle_url,t1_url) VALUES(7,"数字蛋糕","http://localhost:3000/img/product/goods-7/title.jpg","http://localhost:3000/img/product/goods-7/subtitle.jpg","http://localhost:3000/img/product/goods-7/t1.jpg");
INSERT INTO goods(gid,gname,title_url,subtitle_url,t1_url) VALUES(8,"蓝域草莓蛋糕","http://localhost:3000/img/product/goods-8/title.jpg","http://localhost:3000/img/product/goods-8/subtitle.jpg","http://localhost:3000/img/product/goods-8/t1.jpg");
INSERT INTO goods(gid,gname,title_url,subtitle_url,t1_url) VALUES(9,"王子蛋糕","http://localhost:3000/img/product/goods-9/title.jpg","http://localhost:3000/img/product/goods-9/subtitle.jpg","http://localhost:3000/img/product/goods-9/t1.jpg");
INSERT INTO goods(gid,gname,title_url,subtitle_url,t1_url) VALUES(10,"公主蛋糕","http://localhost:3000/img/product/goods-10/title.jpg","http://localhost:3000/img/product/goods-10/subtitle.jpg","http://localhost:3000/img/product/goods-10/t1.jpg");
INSERT INTO goods(gid,gname,title_url,subtitle_url,t1_url) VALUES(11,"爱·发声蛋糕","http://localhost:3000/img/product/goods-11/title.jpg","http://localhost:3000/img/product/goods-11/subtitle.jpg","http://localhost:3000/img/product/goods-11/t1.jpg");
INSERT INTO goods(gid,gname,title_url,subtitle_url,t1_url) VALUES(12,"牛乳蓝莓蓝域双拼蛋糕","http://localhost:3000/img/product/goods-12/title.jpg","http://localhost:3000/img/product/goods-12/subtitle.jpg","http://localhost:3000/img/product/goods-12/t1.jpg");
INSERT INTO goods(gid,gname,title_url,subtitle_url,t1_url) VALUES(13,"牛乳大理石雪域双拼","http://localhost:3000/img/product/goods-13/title.jpg","http://localhost:3000/img/product/goods-13/subtitle.jpg","http://localhost:3000/img/product/goods-13/t1.jpg");
INSERT INTO goods(gid,gname,title_url,subtitle_url,t1_url) VALUES(14,"蓝域蛋糕","http://localhost:3000/img/product/goods-14/title.jpg","http://localhost:3000/img/product/goods-14/subtitle.jpg","http://localhost:3000/img/product/goods-14/t1.jpg");
INSERT INTO goods(gid,gname,title_url,subtitle_url,t1_url) VALUES(15,"彩虹心情蛋糕","http://localhost:3000/img/product/goods-15/title.jpg","http://localhost:3000/img/product/goods-15/subtitle.jpg","http://localhost:3000/img/product/goods-15/t1.jpg");
CREATE TABLE shoppingcar(
    cid INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    goods_id INT,
    count INT,
    isChecked BOOL,
    wishHint VARCHAR(16),
    userWish VARCHAR(16),
    showWish BOOL
);
CREATE TABLE accessories(
    aid INT PRIMARY KEY AUTO_INCREMENT,
    aname VARCHAR(16),
    price DECIMAL(8,2),
    img_url VARCHAR(128)
);
INSERT INTO accessories(aname,price,img_url) VALUES("乐可可旋转烛台",58,"http://localhost:3000/img/accessories/1.jpg");
INSERT INTO accessories(aname,price,img_url) VALUES("餐具(5套一组)",2.5,"http://localhost:3000/img/accessories/2.jpg");
INSERT INTO accessories(aname,price,img_url) VALUES("金色蜡烛",10,"http://localhost:3000/img/accessories/3.jpg");
INSERT INTO accessories(aname,price,img_url) VALUES("Happy Birthday蜡烛",15,"http://localhost:3000/img/accessories/4.jpg");
INSERT INTO accessories(aname,price,img_url) VALUES("I LOVE MAMA蜡烛",15,"http://localhost:3000/img/accessories/5.jpg");
INSERT INTO accessories(aname,price,img_url) VALUES("I LOVE PAPA蜡烛",15,"http://localhost:3000/img/accessories/6.jpg");
INSERT INTO accessories(aname,price,img_url) VALUES("心形蜡烛",5,"http://localhost:3000/img/accessories/7.jpg");
INSERT INTO accessories(aname,price,img_url) VALUES("数字9蜡烛",5,"http://localhost:3000/img/accessories/8.jpg");
INSERT INTO accessories(aname,price,img_url) VALUES("数字8蜡烛",5,"http://localhost:3000/img/accessories/9.jpg");
INSERT INTO accessories(aname,price,img_url) VALUES("数字7蜡烛",5,"http://localhost:3000/img/accessories/10.jpg");
INSERT INTO accessories(aname,price,img_url) VALUES("数字6蜡烛",5,"http://localhost:3000/img/accessories/11.jpg");
INSERT INTO accessories(aname,price,img_url) VALUES("数字5蜡烛",5,"http://localhost:3000/img/accessories/12.jpg");
INSERT INTO accessories(aname,price,img_url) VALUES("数字4蜡烛",5,"http://localhost:3000/img/accessories/13.jpg");
INSERT INTO accessories(aname,price,img_url) VALUES("数字3蜡烛",5,"http://localhost:3000/img/accessories/14.jpg");
INSERT INTO accessories(aname,price,img_url) VALUES("数字2蜡烛",5,"http://localhost:3000/img/accessories/15.jpg");
INSERT INTO accessories(aname,price,img_url) VALUES("数字1蜡烛",5,"http://localhost:3000/img/accessories/16.jpg");
INSERT INTO accessories(aname,price,img_url) VALUES("数字0蜡烛",5,"http://localhost:3000/img/accessories/17.jpg");