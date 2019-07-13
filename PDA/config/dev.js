
var ip = "192.168.1.110";
var port = "8000";
var baseUrl=localStorage.getItem('baseUrl');

var token='aaaaaa';

var itemBarCodeLength = 6;
var cellBarCodeLength = 6;
var itemBatchBarCodeLength =19;


var aaaa = function(arr,name,value){
	var newArr=[];
	 
	for(var i =0;i<arr.length;i++){
		var item = arr[i];
		var itemCode = item[name];
		if(itemCode == value){
			newArr.push(item)
		}
	}
	return newArr;
}


var getServerData = function(url,type,queryQaram){
	  
	queryQaram = JSON.stringify(queryQaram);
	var res='';
	 token = localStorage.getItem('token');
	 baseUrl=localStorage.getItem('baseUrl');
	if(type == 'POST'){
		  
		$.ajax({  
				 type: type,
				 dataType:"json",
				 data:queryQaram,
				 headers: {
				"Accept": "*/*",
				"access-token":token
				}, 
				contentType : "application/json",  
				url:baseUrl+ url,
				async:false,
				success:function(data){
					res = data;
				},
			});  
		
	}else if(type == 'GET'){
		var param = '?';
		 
		queryQaram =queryQaram.replace(/"/g, "");
		queryQaram =queryQaram.replace(/{/g, "");
		queryQaram =queryQaram.replace(/}/g, "");
		queryQaram =queryQaram.replace(/:/g, "=");
		queryQaram =queryQaram.replace(/,/g, "&");
		url = url + '?' +queryQaram;
		$.ajax({  
				type: type,
				dataType:"json",
				 
				headers: {
				"Accept": "*/*",
				"access-token":token
				}, 
				contentType : "application/json",  
				url:baseUrl+ url,
				async:false,
				success:function(data){
					res = data;
				},
			});   
	}
	
	return res
						 
	 

}




 
 