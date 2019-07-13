
var vue = new Vue({
			// 进行控件绑定(el->element)，绑定html页面中id为card的控件，相当于document.getElementById("card")
			el:".contain ",
			data: {
				 insert:{
					 billMaster : {
					 	type:1,
					 	wareCode:localStorage.getItem('wareCode')
					 } ,
					 billDetails:[]
				 },
			 
				
				itemBarCode:'',
				acceptQuantity:'',
				 
				item:[],
				info:{},
				
				},
			watch:{
　　　　　　　　itemBarCode:{
								
                handler:function(val,oldval){
                    if(val.length == itemBarCodeLength){
											this.changeBar();
										}
                },
                 
            },
             
　　　},
			created:function(){
           	
	            	 
      },
            
			methods:{
				commit:function(state){
					var billMaster =  this.insert.billMaster;
					billMaster.state = state;
					 
					var billDetails =  this.insert.billDetails;
					var insert = this.insert;
					debugger
					insert.billMaster.wareCode = localStorage.getItem('wareCode');
					 
					 var data = getServerData('/bill/masters/no_bill_accept','POST',  insert);
					 if(data.code ==200){
						 mui.alert('验收成功，返回上一页面', '成功', function() {
						 	 window.location.href = '../in.html'
						 });
					 }
					 
					 
					 
					 
					 
				},
				
				change:function(){
					 
					var acceptQuantity =this.acceptQuantity;
					if(this.info.itemCode != null){
						var itemCode = this.info.itemCode;
						var item =aaaa(this.insert.billDetails,'itemCode',itemCode) 
						item[0].acceptQuantity =parseInt(acceptQuantity);
					this.acceptQuantity = '';
						
					}
				},
				changeBar:function(){
					itemBarCode = this.itemBarCode;
					 
						this.getItem(itemBarCode);
					 
				},
				getItem:function(itemBarCode){
					var that =this
					token = localStorage.getItem('token');
					 
					$.ajax({  
						 
						dataType:"json",
						 headers: {
						"Accept": "*/*",
						"access-token":token
						}, 
						contentType : "application/json",  
						url:baseUrl+ "/item/infos/detail?itemBarCode=" +itemBarCode,
						 
						async:false,

						success:function(data){
							that.itemBarCode = '';
							if(data.code ==200){
								 
									that.info = data.data; 
								 if(data.data == null){
									that.info = []
								 }else{
										
									 var item =that.info;
									 var itemName = item.itemName;
									 var itemCode = item.itemCode;
									 var itemClass = item.itemClass;
									 var cellCode = that.cellCode;
										
									 if(that.insert.billDetails.length ==0){
										that.insert.billDetails.push({itemName:itemName,itemCode:itemCode,itemClass:itemClass,acceptQuantity:1});
									 }else{
											
										var nowItem =aaaa(that.insert.billDetails,'itemCode',itemCode) ;
										if(nowItem.length ==0){
											that.insert.billDetails.push({itemName:itemName,itemCode:itemCode,itemClass:itemClass,acceptQuantity:1});
										}else{
											nowItem[0].acceptQuantity =parseInt(nowItem[0].acceptQuantity) +1;
										}
										
									 }
									  
									 that.itemBarCode = '';
								 
							 }
								
								 
								
					 
								 
							
							}
					
						},
						 
					});  
					            	  	
					
				},
				
				
				
			}	 
			 

})
