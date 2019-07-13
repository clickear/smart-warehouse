
var vue = new Vue({
			// 进行控件绑定(el->element)，绑定html页面中id为card的控件，相当于document.getElementById("card")
			el:".contain ",
			data: {
				palletBarCode:'',
				pallet:{},
				palletId:'',
				cellBarCode:'',
				cell:{},
				cellId:'',
				
				
				 
			 
				 
			 
				},
			watch:{
	　　　　　palletBarCode:{
						
						handler:function(val,oldval){
								if(val.length >3){
									  
									this.changePalletBar();
								}
						},
					},
					
					
			cellBarCode:{
					handler:function(val,oldval){
						 
							if(val.length > 6){
								this.changeCellBar();
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
				
				changeCellBar:function(){
					var that = this;
					var cellBarCode = that.cellBarCode;
					var data =  getServerData('/cell/infos/list','GET',{cellBarCode:cellBarCode});
					debugger
					if(data.code = 200 ){
						var cells = data.data.list;
						if(cells.length >0){
							that.cell = cells[0];
							that.cellBarCode = "";
							 $('#CellBarCode').attr('disabled',true);
							 that.cellId = that.cell.cellId;
							  
						}else{
							that.CellBarCode = "";
							return
						}
					}else{
						that.CellBarCode = "";
						return
					}
					that.CellBarCode = "";
				},
				 
				 
			 
				commit:function(){
					
			         $("#commit").css("disabled",true);
					var that = this;
					if(that.palletId =='' || that.cellId==0){
						mui.alert('请扫描有效的托盘条码!', '无效', function() {
							 
						});
						 
						return
					}
					if(that.cell.cellCode =='' || that.cell.cellCode==null){
						mui.alert('请扫描有效的货位条码!', '无效', function() {
							 
						});
						return
					}
					
					
					
					 
					var palletId = that.palletId;
					var cellCode = that.cell.cellCode;
					 
					 
					var data =getServerData('/pallet/batchs/cell','GET',{palletId:palletId,cellCode:cellCode});
					mui(this).button('reset');
					if(data.code ==200){
						mui.alert('组盘成功', '成功', function() {
							 
							that.pallet={};
							that.cell={};
							that.palletId='';
							that.cellBarCode='';
							that.item={};
							that.quantity='';
							that.list=[];
							$('#palletBarCode').attr('disabled',false);
							 
						});
					}
				}
			}
			 

})
