
 


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
					token = localStorage.getItem('token');
				 
					$.ajax({  
						 
						dataType:"json",
						 headers: {
						"Accept": "*/*",
						"access-token":token
						}, 
						contentType : "application/json",  
						url:baseUrl+ "/bill/masters/list?type=1&state=1",
						 
						async:false,

						success:function(data){
							
							if(data.code ==200){
								var list = data.data.list;
								
							 
								for(var i = 0;i<list.length;i++){
									that.items.push(list[i]);	
								};
							
							}
					
						}

					});  
					
			 
					
					
					
					 
            	  	
	            	 
      },
            
			methods:{
				commit:function(type){
					if(type ==1){
						
						window.location.href = './group-pallet/group-pallet.html'
					}if(type ==2){
						window.location.href = './pallet-down/pallet-down.html'
					}if(type ==3){
						window.location.href = './up-cell/up-cell.html'
					}if(type ==4){
						window.location.href = './task/task.html'
					}if(type ==5){
						window.location.href = './task-batch/task-batch.html'
					}
					 
				 
					
					 
				}
			}	 
			 

})
