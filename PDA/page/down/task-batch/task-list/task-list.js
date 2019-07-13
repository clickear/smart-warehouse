
 


var vue = new Vue({
			// 进行控件绑定(el->element)，绑定html页面中id为card的控件，相当于document.getElementById("card")
			el:".contain ",
			data: {
				taskBatch:localStorage.getItem('taskBatch'),
				items:[]
				},
			created:function(){
				
					this.list();
			  	 
      		},
            
			methods:{
				commit:function(item){
					 var taskId = item.id;
					/*mui.alert('系统中将执行该拣货操作！', '确认该货位已拣货？', function() {
							 getServerData('/prepare/tasks/okTask','GET',{id:taskId});
							  window.location.reload();
					});*/
					
					var btnArray = ['确认', '返回'];
					mui.confirm('系统中将执行该拣货操作！', '确认该货位已拣货？', btnArray, function(e) {
					if (e.index == 0) {
						getServerData('/prepare/tasks/okTask','GET',{id:taskId});
						window.location.reload();
					} else {
						 
					}
				})
					 
				},
				
				list:function(){
					var that =this;
					that.items = [];
					var wareCode = localStorage.getItem('wareCode');
					var token = localStorage.getItem('token');
					var taskBatch = localStorage.getItem('taskBatch');
					 
						$.ajax({  
							 
							dataType:"json",
					 headers: {
					"Accept": "*/*",
					"access-token":token
					}, 
					contentType : "application/json",  
					url:baseUrl+ "/prepare/tasks/list?state=0&taskBatch=" +taskBatch,
						 
						async:false,
					
						success:function(data){
							
							if(data.code ==200){
								var list = data.data.list;
								if(list.length ==0){
									mui.alert('返回上一页面！', '当前批次任务全部完成！', function() {
										  window.location.href = '../task-batch.html'
									});
					
								}
								
							 
								for(var i = 0;i<list.length;i++){
									that.items.push(list[i]);	
								};
							
							}
					
						}
					
					});  
					
				}
				
				
			}	 
			 

})
