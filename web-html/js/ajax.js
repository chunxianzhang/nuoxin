function ajax({url,type,data,dataType}){
    return new Promise(function(open,err){
        var xhr=null;
        if(window.XMLHttpRequest){
            xhr=new window.XMLHttpRequest()
        }else{
            xhr=new ActiveXObject("Microsoft.XMLHttp")
        }
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
                if(dataType.toLowerCase()==="json"){
                   var res=JSON.parse(xhr.responseText)
                }else{
                   var res=xhr.responseText
                }
                open(res)
            }
        }
        if(type.toLowerCase()==="get"){
            url+="?"+data
            xhr.open(type,url,true)
            xhr.send(null)
        }else if(type.toLowerCase()==="post"){
            xhr.open(type,url,true)
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
            xhr.send(data)
        }
    })
}