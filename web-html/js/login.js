new Vue({
    el:"#login",
    data:{
        uname:"",
        upwd:"",
        uname_message:"",
        upwd_message:"",
        modal:false,
        err_message:"",
        active:{"now_login_active":false},
    },
    created(){
        this.getAuthCode()
    },
    methods:{
        unameJudge(){
            var reg=/^1[3-8]\d{9}$/
            if(this.uname==""){
                this.uname_message="*请输入手机号";
                return false;
            }else if(!reg.test(this.uname)){
                this.uname_message="*手机号码格式错误";
                return false;
            }else{
                this.uname_message="";
                return true;
            }
        },
        upwdJudge(){
            if(this.upwd==""){
                this.upwd_message="*请输入密码";
                return false;
            }else{
                this.upwd_message="";
                return true;
            }
        },
        login(){
            if(this.unameJudge()&&this.upwdJudge()){
               this.active.now_login_active=true
               axios.post("http://localhost:3000/user/login",
                    Qs.stringify({
                        uname:this.uname,
                        upwd:this.upwd,
                    })
               )
               .then((res)=>{
                    var res=res.data;
                    if(res.ok==1){
                        if(location.search.startsWith("?back=")){
                            var back=location.search.slice(6)
                            back=decodeURIComponent(back)
                            location.href=back
                         }else{
                            location.href="http://localhost:3000/index.html";
                          }
                          setTimeout(()=>{
                            this.active.now_login_active=false;
                        },100)
                    }else{
                        if(res.upwd.length<6){
                            this.modal=true;
                            this.err_message="密码为6-12位非纯数字或字母"
                            setTimeout(()=>{
                                this.active.now_login_active=false;
                            },100)
                        }else{
                            this.modal=true;
                            this.err_message="密码错误"
                            setTimeout(()=>{
                                this.active.now_login_active=false;
                            },100)
                        }
                    }
               })
            }
        },
        close(){
            this.modal=false;
        },
        getAuthCode(){
            var arr=["a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z"]
        }
    }
})