
 


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
					 var itemMasterId = localStorage.getItem('itemMasterId');
					token = localStorage.getItem('token');
				 
					$.ajax({  
						 
						dataType:"json",
						 headers: {
						"Accept": "*/*",
						"access-token":token
						}, 
						contentType : "application/json",  
						url:baseUrl+ "/prepare/tasks/batchList?wareCode=" + wareCode+"&itemMasterId="+itemMasterId,
						 
						async:false,

						success:function(data){
							
							if(data.code ==200){
								 
								var list = data.data;
								
							 
								for(var i = 0;i<list.length;i++){
									that.items.push(list[i]);	
								};
							
							}
					
						}

					});  
					
			 
					
					
					
					 
            	  	
	            	 
      },
            
			methods:{
				commit:function(item){
					 var taskBatch = item.taskBatch;
					
					
					localStorage.setItem('taskBatch', taskBatch);
				 	
					window.location.href = './task-list/task-list.html'
					 
				}
			}	 
			 

})
