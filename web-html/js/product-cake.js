new Vue({
    el:".article",
    data:{
        //头部模块
        signout:true,
        isLogin:false,
        uname:"",
        search_text:"",
        //商品模块
        cakeList:[],
        cakeList2:[],
        carCount:"",
        isaddcart:false,
        carCake:{title:"",price:"",taste:"",spec:"",sweet:"",kg:"",},
        cakeSweet:1,
        cartBg:false,
        success:false,
        //加载
        loadFooter:false,
        loadProText:false,
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
    },
    mounted(){
        this.getCakeList()
        this.getCarCount()
    },
    methods:{
    //头部模块
        goLogin(){
            var url=location.href
            url=encodeURIComponent(url)
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
            location.reload(true)
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
    //...吐司
        getCakeList(){
            axios.get("http://localhost:3000/product/cakeList")
            .then((res)=>{
                this.cakeList=res.data
                this.cakeList2=res.data
                this.loadFooter=true
                setTimeout(()=>{ this.loadProText=true},100)
            })
        },
    //加入购物车
    cakeCart(i){
            var id=i
            axios.get("http://localhost:3000/product/proSpec?id="+id)
            .then((res)=>{
                var res=res.data
                if(res==-1){
                    alert("商品编号错误")
                }
                this.isaddcart=true
                this.cartBg=true
                this.carCake=res
            })
        },
        closeCart1(){
            this.isaddcart=false
            this.cartBg=false
        },
        goaddCart(i){
            var id=i
            axios.post("HTTP://localhost:3000/cart/addCar",Qs.stringify({
                pid:id
            }))
            .then((res)=>{
                if(res.data.code==1){
                    this.isaddcart=false
                    this.success=true
                    this.carCount+=1
                }else{
                    this.isaddcart=false
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
        AllTast(){
            this.cakeList=this.cakeList2
            this.cakeSweet=1
        },
        NyTast(){
            var list=this.cakeList2
            var arr=[]
            for(var item of list){
                if(item.taste=="奶油口味"){
                    arr.push(item)
                }
            }
            this.cakeList=arr
            this.cakeSweet=2
        },
        QklTast(){
            var list=this.cakeList2
            var arr=[]
            for(var item of list){
                if(item.taste=="巧克力口味"){
                    arr.push(item)
                }
            }
            this.cakeList=arr
            this.cakeSweet=3
        },
        XgTast(){
            var list=this.cakeList2
            var arr=[]
            for(var item of list){
                if(item.taste=="鲜果口味"){
                    arr.push(item)
                }
            }
            this.cakeList=arr
            this.cakeSweet=4
        },
        MsTast(){
            var list=this.cakeList2
            var arr=[]
            for(var item of list){
                if(item.taste=="莫斯口味"){
                    arr.push(item)
                }
            }
            this.cakeList=arr
            this.cakeSweet=5
        },  
        ZsTast(){
            var list=this.cakeList2
            var arr=[]
            for(var item of list){
                if(item.taste=="芝士口味"){
                    arr.push(item)
                }
            }
            this.cakeList=arr
            this.cakeSweet=6
        },
    }
})