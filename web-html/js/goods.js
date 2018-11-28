new Vue({
    el:".article",
    data:function(){
        return {
           signout:true,
           isLogin:false,
           uname:"",
           search_text:"",
           cartBg:false,
           success:false,
           goodsList:[],
           cakeList:[],
           carCount:"",
           promotion:{title:"优惠促销",p1:"【玩转舌尖 纵享魔力】2018.9.30-2018.11.8下单且不晚于11.9配送的蛋糕订单，每单可9.9元加价购「哇哦！吐司」1份，先到先得，不与其他优惠同享。",p2:"【狂欢派对 甜蜜加倍】2018.11.1-2018.11.25，正价购买蛋糕馆内任意蛋糕，每笔订单赠半价蛋糕券1张（订单配送完成后48小时内到账）。配送时间截至2018.11.26。",p3:"【生日专“数” 缤纷好礼】2018.11.1-2018.11.29，正价购买指定款蛋糕1个，加18元即享加大升级。2-4人食蛋糕加大为5-8人食，5-8人食蛋糕加大为10-12人食。（适用蛋糕仅限5-8人食及以下规格）。配送时间：2018.11.2-2018.11.30。"},
           texone:{tex_active:true},
           textwo:{tex_active:false},
           texthree:{tex_active:false},
           texfour:{tex_active:false},
           loadDetail:false,
           loadMaterials:false,
           loadFooter:false,
        }
    },
    created(){
        axios.get("http://localhost:3000/user/islogin")
        .then((res)=>{
            var res=res.data
            if(res.ok==0){
                this.signout=true
                this.isLogin=false
            }else{
                this.signout=false
                this.isLogin=true
                this.uname=res.uname
            }
        })
        this.getGoodsList()
        this.getRecommendList()
        this.getCarCount()
    },
    methods:{
        goLogin(){
            var url=location.href
            location.href="http://localhost:3000/login.html?back="+url
        },
        signOut(){
            axios.get("http://localhost:3000/user/signout")
            .then((res)=>{
                location.reload(true)
            })
        },
        myIndent(){
            if(this.isLogin==true){
                location.href="index.html"
            }else{
                location.href="login.html"
            }
        },
        search(){
            var str=this.search_text
            str = str.replace(/\s*/g,"");
            if(str=="")
            str="雪域"
            location.href="product-search.html?kw="+str
        },
        shoppingCart(){
            if(this.isLogin==true){
                location.href="http://localhost:3000/shopping-car.html"
            }else{
                alert("请先登录")
                var url=location.href
                location.href="http://localhost:3000/login.html?back="+url
            }
        },
        getCarCount(){ 
            axios.get("http://localhost:3000/cart/getCount")
            .then((res)=>{
                this.carCount=res.data[0].count
            })  
        },
        navItemOne(){
            location.href="http://localhost:3000/index.html"
        },
        navItemTwo(){
            location.href="http://localhost:3000/product-cake.html"
        },
        navItemThree(){
            location.href="http://localhost:3000/product-toast.html"
        },
        navItemFour(){
            location.href="http://localhost:3000/product-gift.html"
        },
        navItemFive(){
            location.href="http://localhost:3000/user.html"
        },
        CLUB(){},
        card(){},
        getGoodsList(){
            var str=location.search
            str = str.replace(/\s*/g,"");
            if(str!="")
            axios.get("http://localhost:3000/goods/goodsList"+str)
            .then((res)=>{
                this.goodsList=res.data
                this.loadDetail=true
                this.loadMaterials=true
            })
        },
        texActive(i){
            if(i==1){
                this.texone.tex_active=true
                this.textwo.tex_active=this.texthree.tex_active=this.texfour.tex_active=false
            }else if(i==2){
                this.textwo.tex_active=true
                this.texone.tex_active=this.texthree.tex_active=this.texfour.tex_active=false
            }else if(i==3){
                this.texthree.tex_active=true
                this.textwo.tex_active=this.texone.tex_active=this.texfour.tex_active=false
            }else if(i==4){
                this.texfour.tex_active=true
                this.textwo.tex_active=this.texthree.tex_active=this.texone.tex_active=false
            }
        },
        addCart(i){
            var id=i
            axios.post("HTTP://localhost:3000/cart/addCar",Qs.stringify({
                pid:id
            }))
            .then((res)=>{
                if(res.data.code==1){
                    this.cartBg=true
                    this.success=true
                    this.carCount+=1
                }else{
                    this.success=false
                    this.cartBg=false
                    alert("请先登录")
                    var url=location.href
                    location.href="http://localhost:3000/login.html?back="+url
                }
            })
        },
        closeCart2(){
            this.success=false
            this.cartBg=false
        },
        account(){
            this.success=false
            this.cartBg=false
            location.href="http://localhost:3000/shopping-car.html"
        },
        buyNow(i){
            console.log(1)
        },
        getRecommendList(){
            axios.get("http://localhost:3000/goods/recommendList")
            .then((res)=>{
                this.cakeList=res.data
                this.loadFooter=true
            })
        }
    }
})