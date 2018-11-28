new Vue({
    el:"#register",
    data:{
        phone:"",
        upwd:"",
        upwdAgain:"",
        bg_text:"请按住滑块，拖动到最右边",
        bg_success_text:"",
        left:"0",
        bg_width:"0",
        transition:"",
        btn_bg:{
            sliding_block_btn:true,
            siliding_block_success_bg:false,
        },
        is_animate:true,
        is_success:false,
        phone_message:"",
        upwd_message:"",
        upwdAgain_message:"",
        slide_message:"",
        code_message:"",
        agreement_message:"",
        isChecked:true,
    },
    methods:{
        phoneJudge(){
            var reg=/^1[3-8]\d{9}$/
            if(this.phone==""){
                this.phone_message="*请输入手机号码";
                return false;
            }else if(!reg.test(this.phone)){
                this.phone_message="*手机号码格式错误";
                return false;
            }else{
                this.phone_message="";
                return true;
            }
        },
        upwdJudge(){
            var reg=/\d/
            if(this.upwd==""){
                this.upwd_message="*请输入密码";
                return false;
            }else if(Number(this.upwd) || !reg.test(this.upwd) || this.upwd.length<6){
                this.upwd_message="*密码为6-12位的非纯数字";
                return false;
            }else{
                this.upwd_message="";
                if(this.upwdAgain!=""){
                    this.upwdAgainJudge();
                }
                return true;
            }
        },
        upwdAgainJudge(){
            if(this.upwd!=""){
                if(this.upwdAgain==""){
                    this.upwdAgain_message="*请输入密码";
                    return false;
                }else if(this.upwd!=this.upwdAgain){
                    this.upwdAgain_message="*两次输入的密码不一致";
                    return false;
                }else{
                    this.upwdAgain_message="";
                    return true;
                }
            }else{
                return false;
            }
        },
        slideJudgeDown(e){
            e=event;
            var Mx=209;
            this.transition="";
            var startX=e.clientX;
            var success=false;
            document.onmousemove=(e)=>{
                e=event;
                var endX=e.clientX;
                var X=endX-startX;
                if(X>Mx){
                    X=Mx;
                    this.btn_bg.sliding_block_btn=false;
                    this.btn_bg.siliding_block_success_bg=true;
                    this.bg_text="";
                    this.bg_success_text="验证成功";
                    this.is_animate=false;
                    this.is_success=true;
                    document.onmousemove=null;
                    this.slideJudgeDown=()=>{return};
                }else if(X<0){
                    X=0;
                }
                this.left=X+"px";
                this.bg_width=X+"px";
            }
            document.onmouseup=(e)=>{
                document.onmousemove=null;
                if(this.is_success){
                   return; 
                }else{
                    this.left=0;
                    this.bg_width=0;
                    this.transition=".5s ease"
                }
                document.onmouseup=null;
            }
        },
        isRead(){
            if(this.isChecked==true){
                this.isChecked=false;
                this.agreement_message="*用户协议未勾选";
                return false;
            }else{
                this.isChecked=true;
                this.agreement_message="";
                return true;
            }
        },
        register(){
            if(this.phoneJudge()&&this.upwdJudge()&&this.upwdAgainJudge()){
            console.log(0)
                if(this.is_success==false){
                    this.slide_message="*请滑动滑块进行验证"
                } else if(this.isChecked==false){
                    this.slide_message=""
                    this.agreement_message="*用户协议未勾选";
                }else{
                    this.slide_message="";
                    this.agreement_message="";
                    axios.post("http://localhost:3000/user/register",
                        Qs.stringify({
                            uname:this.phone,
                            upwd:this.upwd,
                        })
                    )
                    .then(function(res){
                        var res=res.data;
                        if(res==0){
                            alert("用户名已经存在")
                        }else if(res==1){
                            alert("注册成功")
                            setTimeout(function(){
                                location.assign("http://localhost:3000/login.html")
                            },1000)
                        }else{
                            alert("注册失败，请稍后再试")
                        } 
                    })
                }
            }
        },
    }
})
// //手机验证码