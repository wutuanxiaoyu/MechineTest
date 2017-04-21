jQuery(function() {       

   App.init();
   login();
   
   invokeAdviceTypeCountInterface();

});

var invokeAdviceTypeCountInterface = function(){
	$.ajax({
        type:"GET",
        url: "http://202.117.157.250:8080/api/social/user/advices/admin/getAdviceTypeCount",
        data:{
        	tokenId : sessionStorage.getItem("tokenIdSave"),
        	userId : sessionStorage.getItem("userIdSave")
        },
        dataType:"json",
        async:true,
        success:function(res){
            if(res.code==200){
                console.log("getAdviceCount接口调用成功！");
                /*console.log(JSON.stringify(res.body));*/
				$.each(res.body, function(idx, ele){
					$('#advice_type').append('<option value="'+ele.type+'">'+ele.typeName+'</option>');
				});
				/*调用一次根据类型获取意见列表信息*/
				invokeAdviceByLastest();
            }else{
            	console.log("getAdviceCount接口调用失败，原因：" + res.message);
            }
        },
        error:function(){
            console.log("网络错误");
        }
    });
};

var invokeAdviceByLastest = function(){
	var currType = $('#advice_type').val();
	if(currType == null || currType == ''){
		console.log("advice type must not be empty!");
		return;
	}
	$.ajax({
        type:"GET",
        url: "http://202.117.157.250:8080/api/social/user/advices/admin/getByLatest",
        data:{
        	tokenId : sessionStorage.getItem("tokenIdSave"),
        	userId : sessionStorage.getItem("userIdSave"),
        	type : $('#advice_type').val()
        },
        dataType:"json",
        async:true,
        success:function(res){
            if(res.code==200){
                console.log("getByLastest接口调用成功！");
                console.log(JSON.stringify(res.body));
            }else{
            	console.log("getByLastest接口调用失败，原因：" + res.message);
            }
        },
        error:function(){
            console.log("网络错误");
        }
    });
};

