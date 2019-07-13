
 


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
						
						window.location.href = './accept/accept.html'
					}if(type ==2){
						window.location.href = './bill-in/bill-in.html'
					}if(type ==3){
						window.location.href = 'cell/cell.html'
					}
					 
				 
					
					 
				}
			}	 
			 

})
