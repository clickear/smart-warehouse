
 


var vue = new Vue({
			// 进行控件绑定(el->element)，绑定html页面中id为card的控件，相当于document.getElementById("card")
			el:".contain ",
			data: {
				billNo:'',
				items:[]
				},
			created:function(){
           var that =this
					 var wareCode = localStorage.getItem('wareCode');
					token = localStorage.getItem('token');
				 
					$.ajax({  
						 
						dataType:"json",
						 headers: {
						"Accept": "*/*",
						"access-token":token
						}, 
						contentType : "application/json",  
						url:baseUrl+ "/bill/masters/list?type=1&state=1&" + wareCode,
						 
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
				commit:function(billMaster){
					 
					
					localStorage.setItem('billMaster', JSON.stringify(billMaster));
				 
					window.location.href = './accept-detail/accept-detail.html'
					 
				}
			}	 
			 

})
