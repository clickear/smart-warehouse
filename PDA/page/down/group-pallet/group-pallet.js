
var vue = new Vue({
			// 进行控件绑定(el->element)，绑定html页面中id为card的控件，相当于document.getElementById("card")
			el:".contain ",
			data: {
				palletBarCode:'',
				pallet:{},
				palletId:'',
				itemBatchBarCode:'',
				item:{},
				quantity:'',
				list:[],
				 
			 
				},
			watch:{
	　　　　　palletBarCode:{
						
						handler:function(val,oldval){
								if(val.length == 3){
									  
									this.changePalletBar();
								}
						},
					},
					
					
			itemBatchBarCode:{
					handler:function(val,oldval){
							if(val.length == 19){
								this.changeItemBatchBar();
							}
					}
			}
             
　　　},
			created:function(){
            
	            	 
      },
            
			methods:{
				 
				 
				
				change:function(){
					 
					var acceptQuantity =this.acceptQuantity;
					if(this.info.itemCode != null){
						var itemCode = this.info.itemCode;
						var nowDetail =aaaa(this.billDetails,'itemCode',itemCode) 
						nowDetail[0].acceptQuantity =parseInt(acceptQuantity);
						 
						
					}
				},
				
				changePalletBar:function(){
					var that = this;
					var palletBarCode = that.palletBarCode;
					var data =  getServerData('/pallets/list','GET',{palletBarCode:palletBarCode});
					if(data.code = 200 ){
						var pallets = data.data.list;
						if(pallets.length >0){
							that.pallet = pallets[0];
							that.palletBarCode = "";
							 $('#palletBarCode').attr('disabled',true);
							 that.palletId = that.pallet.palletId;
							  
						}else{
							that.palletBarCode = "";
							return
						}
					}else{
						that.palletBarCode = "";
						return
					}
				},
				 
				changeItemBatchBar:function(){
					var that = this;
					var itemBatchBarCode  = this.itemBatchBarCode;
				 
					var ret = getServerData('/item/batchs/list','GET',{itemBatchBarCode:itemBatchBarCode});
					if(ret.code ==200){ 
					  
						that.item = ret.data.list[0];
						var item =that.item;
						var itemName = item.itemName;
						var itemCode = item.itemCode;
						var batch = item.batch;
						var palletId = that.palletId;
						var batchId = item.batchId;
						  
						if(that.list.length ==0){
							that.list.push({palletId:palletId,batchId:batchId,itemName:itemName,batch:batch,quantity:1});
						}else{
							  
							var nowItem =aaaa(that.list,'batchId',batchId) ;
							if(nowItem.length ==0){
								that.list.push({palletId:palletId,batchId:batchId,itemName:itemName,batch:batch,quantity:1});
							}else{
								nowItem[0].quantity =parseInt(nowItem[0].quantity) +1;
							}
							
						}
						that.itemBatchBarCode = '';
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
					if(that.palletId =='' || that.list.length ==0){
						return
					}
					 
					var palletBatchs = this.list;
					for (var i = 0 ;i < palletBatchs.length;i++) {
						palletBatchs[i].palletId = that.palletId;
					}
					var data =getServerData('/pallet/batchs/groupPallet','POST',palletBatchs);
					if(data.code ==200){
						mui.alert('组盘成功', '成功', function() {
							 
							that.pallet={};
							that.palletId='';
							 
							that.item={};
							that.quantity='';
							that.list=[];
							$('#palletBarCode').attr('disabled',false);
							 
						});
					}
				}
			}
			 

})
