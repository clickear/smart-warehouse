
 


var vue = new Vue({
			// 进行控件绑定(el->element)，绑定html页面中id为card的控件，相当于document.getElementById("card")
			el:".contain ",
			data: {
				user:"aaa", 
				pwd:"",
				items:[]
				},
			created:function(){
				var that =this
				var wareCode = localStorage.getItem('wareCode');
				var token = localStorage.getItem('token');
				var billNo = localStorage.getItem('billNo');
				 
					$.ajax({  
						 
						dataType:"json",
						 headers: {
						"Accept": "*/*",
						"access-token":token
						}, 
						contentType : "application/json",  
						url:baseUrl+ "/prepare/tasks/list?state=0&billNo=" +billNo,
						 
						async:false,

						success:function(data){
							
							if(data.code ==200){
								var list = data.data.list;
								if(list.length ==0){
									mui.alert('返回上一页面！', '当前单据分拣任务全部完成！', function() {
										  window.location.href = '../task.html'
									});
					
								}
								
							 
								for(var i = 0;i<list.length;i++){
									that.items.push(list[i]);	
								};
							
							}
					
						}

					});  
					
			 
					
					
					
					 
            	  	
	            	 
      },
            
			methods:{
				commit:function(item){
					 var taskId = item.id;
					mui.alert('系统中将执行该拣货操作！', '确认该货位已拣货？', function() {
							 getServerData('/prepare/tasks/okTask','GET',{id:taskId});
							  window.location.reload();
					});
					 
				}
			}	 
			 

})
