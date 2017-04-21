jQuery(function() {       

   App.init();
   login();
   
   /*initialing advice type selector.*/
   invokeAdviceTypeCountInterface();
   
   $('body').delegate('#advice_submit', 'click', submitAdvice);
   /*initialing table list*/
   invokeAdviceByUserId();

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
            }else{
            	console.log("getAdviceCount接口调用失败，原因：" + res.message);
            }
        },
        error:function(){
            console.log("网络错误");
        }
    });
};

var invokeAdviceByUserId = function(){
	$.ajax({
        type:"GET",
        url: "http://202.117.157.250:8080/api/social/user/advices/getByUserId",
        data:{
        	tokenId : sessionStorage.getItem("tokenIdSave"),
        	userId : sessionStorage.getItem("userIdSave")
        },
        dataType:"json",
        async:true,
        success:function(res){
            if(res.code==200){
                console.log("getByUserId接口调用成功！");
                $('#table_list').html('');
                var data = res.body;
                var html = '';
                $.each(data, function(idx, ele) {
                	html += '<tr class="odd gradeX"><td>'+isEmptyByDef(ele['typeName'], '') +
                	'</td><td>'+isEmptyByDef(ele['advice'], '') +
                	'</td><td>'+isEmptyByDef(ele['createTime'], '')+
                	'</td><td><a class="btn red" href="javascript:deleteDevice(\''+ele['id']+'\');"><i class="icon-delete"></i> Delete</a></td></tr>';
                });
                $('#table_list').html(html);
            }else{
            	console.log("getByUserId接口调用失败，原因：" + res.message);
            }
        },
        error:function(){
            console.log("网络错误");
        }
    });
};

var submitAdvice = function(){
	var params = {
          tokenId : sessionStorage.getItem("tokenIdSave"),
		  collegeId: localStorage.getItem("collegeIdSave"),
		  userId: sessionStorage.getItem("userIdSave"),
		  type: $('#advice_type').val(),
		  
		  advice: $('#advice').val(),
		  status: 0
	};
	$.ajax({
    	headers: {
        	'Content-Type': 'application/json'
    	},
        type:"POST",
        url: "http://202.117.157.250:8080/api/social/user/advices/insert?tokenId="+sessionStorage.getItem("tokenIdSave")+"&userId="+sessionStorage.getItem("userIdSave"),
        data: params,
        dataType:"json",
        success:function(res){
            if(res.code==200){
                console.log("insert接口调用成功！");
                $('#advice').val('');
            }else{
            	console.log("insert接口调用失败，原因：" + res.exceptionInfo.message);
            }
           
        },
        error:function(){
            console.log("网络错误");
        }
    });
};

var deleteDevice = function(id){
		$.ajax({
			headers: {
        	'Content-Type': 'application/json'
	    	},
	        type:"DELETE",
	        url: "http://202.117.157.250:8080/api/social/user/advices/delete?tokenId="+sessionStorage.getItem("tokenIdSave")+"&userId="+sessionStorage.getItem("userIdSave")+"&deviceId="+id,
	        dataType:"json",
	        async:true,
	        success:function(res){
	            if(res.code==200){
	                console.log("delete接口调用成功！");
	                /*delete success, refresh table list*/
	                invokeAdviceByUserId();
	            }else{
	            	console.log("delete接口调用失败，原因：" + res.message);
	            }
	        },
	        error:function(){
	            console.log("网络错误");
	        }
	    });
}
