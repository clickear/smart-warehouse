
var vue = new Vue({
			// 进行控件绑定(el->element)，绑定html页面中id为card的控件，相当于document.getElementById("card")
			el:".contain ",
			data: {
				shelfBarCode:'',
				shelf:{shelfName:'',sRow:'',sColumn:''},
				shelfCode:'',
				palletBarCode:'',
				itemBarCode:'',
				item:{},
				quantity:'',
				list:[],
				 
			 
				},
			watch:{
	　　　　　shelfBarCode:{
						
						handler:function(val,oldval){
								if(val.length == shelfBarCodeLength){
									  
									this.changeShelfBar();
								}
						},
					},
					
					
					itemBarCode:{
							handler:function(val,oldval){
									if(val.length == itemBarCodeLength){
										this.changeItemBar();
									}
							}
					}
             
　　　},
			created:function(){
            
	            	 
      },
            
			methods:{
				commit:function(state){
					var billMaster =  this.billMaster;
					billMaster.state = state;
					 
					var billDetails =  this.billDetails;
					   
					  
					// var data = getServerData('/bill/masters/accept','POST', {billMaster, billDetails});
					 var data = getServerData('/bill/masters/accept','POST','')	 
					 
					 if(data.code ==200){
						 mui.alert('验收成功，返回上一页面', '成功', function() {
						 	 window.location.href = '../accept.html'
						 });
					 }
				},
				
				change:function(){
					 
					var acceptQuantity =this.acceptQuantity;
					if(this.info.itemCode != null){
						var itemCode = this.info.itemCode;
						var nowDetail =aaaa(this.billDetails,'itemCode',itemCode) 
						nowDetail[0].acceptQuantity =parseInt(acceptQuantity);
						 
						
					}
				},
				changeShelfBar:function(){
					var that = this;
					var shelfBarCode  = this.shelfBarCode;
					var queryQaram = JSON.stringify({shelfBarCode:shelfBarCode}); 
					var shelfName = null;
					var ret = getServerData('/cell/shelfs/list','GET',queryQaram);
					if(ret.code ==200 && ret.data.list.length >0){ 
						that.cell = ret.data.list[0];	 
						that.cellCode = that.cell.cellCode;
						$("#itemBarCode").focus();
						}
					that.shelfBarCode = '';
					  
					 
				},
				
				changeItemBar:function(){
					var that = this;
					var itemBarCode  = this.itemBarCode;
				 var queryQaram = JSON.stringify({itemBarCode:itemBarCode});
					var ret = getServerData('/item/infos/detail','GET',queryQaram);
					if(ret.code ==200){ 
					 
						that.item = ret.data;
						var item =that.item;
						var itemName = item.itemName;
						var itemCode = item.itemCode;
						var itemClass = item.itemClass;
						var shelfCode = that.shelfCode;
						var palletBarCode = that.palletBarCode;
						  
						if(that.list.length ==0){
							that.list.push({shelfCode:shelfCode,itemName:itemName,itemCode:itemCode,itemClass:itemClass,quantity:1});
						}else{
							  
							var nowItem =aaaa(that.list,'itemCode',itemCode) ;
							if(nowItem.length ==0){
								that.list.push({shelfCode:shelfCode,itemName:itemName,itemCode:itemCode,itemClass:itemClass,quantity:1});
							}else{
								nowItem[0].quantity =parseInt(nowItem[0].quantity) +1;
							}
							
						}
						that.itemBarCode = '';
					}
				},
				change:function(){
					var that = this;
					var item = that.item;
					var quantity =that.quantity;
					if(that.list.length ==0){
						that.quantity = '';
						 return
					}else{
						
						var nowItem =aaaa(that.list,'itemCode',item.itemCode) 
						nowItem[0].quantity = that.quantity;
					}
				},
				commit:function(){
					var that = this;
					var cellItem = this.list;
					 var queryQaram = JSON.stringify(cellItem);
					var data =getServerData('/cell/items/insert','POST',queryQaram);
					if(data.code ==200){
						mui.alert('上架成功', '成功', function() {
							that.cellBarCode='';
							that.cell={};
							that.cellCode='';
							that.itemBarCode='';
							that.item={};
							that.quantity='';
							that.list=[];
							 
						});
					}
				}
			}
			 

})
