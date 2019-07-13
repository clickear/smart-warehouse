
var vue = new Vue({
            // 进行控件绑定(el->element)，绑定html页面中id为card的控件，相当于document.getElementById("card")
            el:".main",
            data: {
							wareCode:'',
								wareName:'',
								wareItems:[],
								masterItems:[],
								itemMasterName:'',
								itemMasterId:'',
								wareCode:'',
								
            	 
              }, 
            methods:{
							changeWare:function(){
							 	 
								var ware =aaaa(this.wareItems,'wareCode',this.wareCode) ;
								 
								this.wareName = ware[0].wareName;
								 
								localStorage.setItem('wareCode', ware[0].wareCode);
				 
							},
							
							changeMaster:function(){
									
								var masterItem =aaaa(this.masterItems,'itemMasterId',this.itemMasterId) ;
									
								this.itemMasterName = masterItem[0].itemMasterName;
									
								localStorage.setItem('itemMasterId', masterItem[0].itemMasterId);
					
							},
							commit:function(){
								document.getElementById("topPopover").style.display="none";//隐藏
								
							},
							tuichu:function(){
								 
								localStorage.clear();
								
				 
								window.location.href = '../login/login.html'
							}
          
            },
						created:function(){
							 
							var data = getServerData('/ware/infos/list','GET','');
							if(data.code = 200){
								 
								this.wareItems = data.data.list;
								var ware = this.wareItems[0];
								 
								var wareCode = ware.wareCode;
								var wareCode2 = localStorage.getItem('wareCode');
								  
								if(wareCode2 ==null || wareCode ==undefined){
									this.wareCode = wareCode;
									localStorage.setItem('wareCode', wareCode);
									 
								}else{
									this.wareCode = wareCode2
								}
								var ware =aaaa(this.wareItems,'wareCode',this.wareCode) ;
								 
								this.wareName = ware[0].wareName;
								
							};
							var masterData = getServerData('/item/masters/list','GET','');
							if(masterData.code = 200){
								 
								this.masterItems = masterData.data.list;
								var itemMaster = this.masterItems[0];
								 
								var itemMasterId = itemMaster.itemMasterId;
								var itemMasterId2 = localStorage.getItem('itemMasterId');
								 
								if(itemMasterId2 ==null || itemMasterId2 ==undefined){
									this.itemMasterId = itemMasterId;
									localStorage.setItem('itemMasterId', itemMasterId);
									 
								}else{
									this.itemMasterId = localStorage.getItem('itemMasterId');
								}
								 
								var itemMasterId = localStorage.getItem('itemMasterId');
								var masterItem =aaaa(this.masterItems,'itemMasterId',this.itemMasterId) ;
								this.itemMasterName = masterItem[0].itemMasterName;
								 
								 
							
							}
							
							
						}
})
