
 


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
					 var itemMasterId = localStorage.getItem('itemMasterId');
					 
					 var countId = localStorage.getItem('countId');
					 var queryQaram = {countId:countId}
				 
					 var data=getServerData('/count/tasks/list','GET',queryQaram); 
					 if(data.code ==200){
					 	
					 	var list= data.data.list;
					 	for(var i = 0;i<list.length;i++){
					 		var	item = list[i];
								if(item.countType ==1){
									item.countType ='明盘'
								}else if(item.countType ==2){
									item.countType ='暗盘'
								}
						};
						that.items = list;
					 }
			 
					
					
					
					 
            	  	
	            	 
      },
            
			methods:{
				commit:function(countMaster){
					 var countId = countMaster.countId;
					
					localStorage.setItem('countId', countId);
				 
					window.location.href = './task-list/task-list.html'
					 
				},
				
				getBill:function(){
					var billNo = this.billNo;
					var wareCode = localStorage.getItem('wareCode');
					 var itemMasterId = localStorage.getItem('itemMasterId');
					var queryQaram ={billNo:billNo,type:2,wareCode:wareCode,itemMasterId:itemMasterId}; 
    	            var data = getServerData('/bill/masters/list','GET',queryQaram); 
   		
					if(data.code ==200){
						var billMaster = data.data.list[0];
						localStorage.setItem('billMaster', JSON.stringify(billMaster));
						window.location.href = './re-check-detail/re-check-detail.html'
				 
						
				
						 
					} 
						 
				}
			}	 
			 

})
