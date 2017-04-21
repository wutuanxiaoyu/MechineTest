/**
 * Created by Administrator on 2017/4/6 0006.
 */
function login() {
    var arr=$.md5("123456").split("");
    var temp1=arr[0];
    arr[0]=arr[arr.length-1]
    arr[arr.length-1]=temp1;
    var temp2=arr[4];
    arr[4]=arr[arr.length-5]
    arr[arr.length-5]=temp2;
    var userpassword='';
    for(var i=0;i<arr.length;i++){
        userpassword=userpassword+arr[i];
    }
    var keyWord={
        'phone':"18702904126",
        'password':userpassword,
    };
    $.ajax({
        type:"POST",
        url: "http://202.117.157.250:8080/api/social/login/login",
        data:keyWord,
        dataType:"json",
        async:false,
        success:function(res){
            if(res.code==200){
                console.log("登录成功");
                
                console.log(res.body.user.id);
                console.log(res.body.token.tokenId);
                console.log(res.body.user.collegeId);

                sessionStorage.setItem("userObj",JSON.stringify(res.body.user));
                sessionStorage.setItem("phoneSave",res.body.user.phone);
                sessionStorage.setItem("userIdSave",res.body.user.id);
                sessionStorage.setItem("tokenIdSave",res.body.token.tokenId);
                localStorage.setItem("collegeIdSave",res.body.user.collegeId);

            }
        },
        error:function(){
            console.log("网络错误");
        }
    });

}

//使用前调用login()
