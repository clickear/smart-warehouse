
var vue = new Vue({
			// 进行控件绑定(el->element)，绑定html页面中id为card的控件，相当于document.getElementById("card")
			el:".contain ",
			data: {
				cellBarCode:'',
				cell:{shelfName:'',sRow:'',sColumn:''},
				itemBatchBarCode:'',
				batch:{},
				quantity:'',
				list:[],
				insertData:{
					cellCode:'',
					batchCells:[],
				}
				},
			watch:{
	　　　　　		cellBarCode:{
	
						handler:function(val,oldval){
									if(val.length == cellBarCodeLength){
										  
										this.changeCellBar();
									}
							 
						}
					},
					
					
					itemBatchBarCode:{
						handler:function(val,oldval){
								if(val.length == itemBatchBarCodeLength){
									this.changeBatchBar();
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
				
				 
				changeCellBar:function(){
					var that = this;
					var cellBarCode  = this.cellBarCode; 
					var cellName = null;
					var ret = getServerData('/cell/infos/list','GET',{cellBarCode:cellBarCode});
					if(ret.code ==200 && ret.data.list.length >0){ 
						that.cell = ret.data.list[0];	 
						that.insertData.cellCode = that.cell.cellCode;
						$("#itemBarCode").focus();
						}
					that.cellBarCode = '';
					  
					 
				},
				
				changeBatchBar:function(){
					var that = this;
					var itemBatchBarCode  = this.itemBatchBarCode; 
					var ret = getServerData('/item/batchs/list','GET',{itemBatchBarCode:itemBatchBarCode});
					if(ret.code ==200){ 
					    var list = ret.data.list;
						that.batch = list[0];
						var batch =that.batch;
						batch.quantity = 1;
						var itemName = batch.itemName;
						var itemCode = batch.itemCode;
						var itemClass = batch.itemClass;
						var batchId = batch.batchId; 
						var cellCode = that.cellCode;
						  
						if(that.insertData.batchCells.length ==0){
							that.insertData.batchCells.push(batch);
						}else{
							  
							var nowItem =aaaa(that.insertData.batchCells,'batchId',batchId) ;
							if(nowItem.length ==0){
								that.insertData.batchCells.push(batch);
							}else{
								nowItem[0].quantity =parseInt(nowItem[0].quantity) +1;
							}
							
						}
						that.itemBatchBarCode = '';
					}
				},
				change:function(){
					var that = this;
					 
					var quantity =that.quantity;
					if(that.insertData.batchCells.length ==0){
						that.quantity = '';
						 return
					}else{
						
						var nowItem =aaaa(that.insertData.batchCells,'batchId',that.batch.batchId) 
						nowItem[0].quantity = that.quantity;
					}
				},
				commit:function(){
					var that = this;
					var insertData = that.insertData;
					
					var data =getServerData('/pallet/batchs/noPalletUp','POST',insertData);
					if(data.code ==200){
						mui.alert('上架成功', '成功', function() {
							that.cellBarCode='';
							that.cell={};
							that.cellCode='';
							that.itemBatchBarCode='';
							that.batch={};
							that.quantity='';
							that.insertData={}
							 
						});
					}
				}
			}
			 

})
