
var vue = new Vue({
			// 进行控件绑定(el->element)，绑定html页面中id为card的控件，相当于document.getElementById("card")
			el:".contain ",
			data: {
				palletBarCode:'',
				pallet:{},
				palletId:'',
				itemBatchBarCode:'',
				batch:{},
				quantity:'',
				list:[],
				 
			 
				},
			watch:{
	　　　　　palletBarCode:{
						
						handler:function(val,oldval){
							if(val.length>3){
								this.changePalletBar();
							}
							
								 
						},
					},
					
					
			itemBatchBarCode:{
					handler:function(val,oldval){
						 
						 
							 if(val.length > 3){
								this.changeItemBatchBar();
							} 
					}
			}
             
　　　},
			created:function(){
            
	            	 
      },
            
			methods:{
				 
				 
				
				 
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
					that.itemBatchBarCode = '';
					if(ret.code ==200){ 
					  
						that.batch = ret.data.list[0];
						var batch =that.batch;
						var itemName = batch.itemName;
						var itemCode = batch.itemCode;
						var batchName = batch.batch;
						var palletId = that.palletId;
						var batchId = batch.batchId;
						  
						if(that.list.length ==0){
							that.list.push({palletId:palletId,batchId:batchId,itemName:itemName,batch:batchName,quantity:1});
						}else{
							  debugger
							var nowItem =aaaa(that.list,'batchId',batchId) ;
							if(nowItem.length ==0){
								that.list.push({palletId:palletId,batchId:batchId,itemName:itemName,batch:batchName,quantity:1});
							}else{
								nowItem[0].quantity =parseInt(nowItem[0].quantity) +1;
							}
							
						}
						
					}
					 
				},
				change:function(){
					var that = this;
					var batch = that.batch;
					var quantity =that.quantity;
					debugger
					if(that.list.length ==0){
						that.quantity = '';
						 return
					}else{
						
						var nowItem =aaaa(that.list,'batchId',batch.batchId) 
						nowItem[0].quantity = quantity;
					}
				}, 
				commit:function(){
					var that = this;
					if(that.palletId =='' ){
						mui.alert('请扫描有效的托盘条码!', '无效', function() {
						 
						});
						return
					}
					if(that.list.length ==0){
						mui.alert('请扫描有效的物料条码!', '无效', function() {
						 
						});
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
							 
							that.batch={};
							that.quantity='';
							that.list=[];
							$('#palletBarCode').attr('disabled',false);
							 
						});
					}
				}
			}
			 

})
