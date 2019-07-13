
 


var vue = new Vue({
			// 进行控件绑定(el->element)，绑定html页面中id为card的控件，相当于document.getElementById("card")
			el:".contain ",
			data: {
				billNo:'',
				items:[]
				},
				
			watch: {　　　　　　　　
				billNo: {
		
					handler: function(val, oldval) {
						if(val.length == 21) {
							this.getBill();
						}
					},
				},
				　　　
			},
			created:function(){
				document.getElementById('billNo').focus();
		         var that =this;
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
					url:baseUrl+ "/bill/masters/list?type=2&state=4&wareCode=" + wareCode+"&itemMasterId="+itemMasterId,
					 
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
				 
					window.location.href = './re-check-detail/re-check-detail.html'
					 
				},
				
				getBill:function(){
					var billNo = this.billNo;
					var wareCode = localStorage.getItem('wareCode');
					 var itemMasterId = localStorage.getItem('itemMasterId');
					var queryQaram ={billNo:billNo,type:2,wareCode:wareCode,itemMasterId:itemMasterId}; 
    	            var data = getServerData('/bill/masters/list','GET',queryQaram); 
   		
					if(data.code ==200){
						 
						var billMaster = data.data.list[0];
						if(billMaster.state < 4 ){
							mui.alert('当前单据未分拣!', '返回', function() {
								window.location.reload();
							});
						}else if(billMaster.state > 4){
							mui.alert('当前单据已经复刻!', '返回', function() {
								window.location.reload();
							});
						}else{
							localStorage.setItem('billMaster', JSON.stringify(billMaster));
							window.location.href = './re-check-detail/re-check-detail.html'
						}
						
				 	 
					} 
						 
				}
			}	 
			 

})
