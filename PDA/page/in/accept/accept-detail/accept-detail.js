var vue = new Vue({
	// 进行控件绑定(el->element)，绑定html页面中id为card的控件，相当于document.getElementById("card")
	el: ".contain ",
	data: {
		itemBatchBarCode: '',
		acceptQuantity: '',
		user: "aaa",
		pwd: "",
		batch:{},
		item: [],
		insertData: {
			billMaster: JSON.parse(localStorage.getItem('billMaster')),
			billDetails: []
		},
		canAccept:'false'
	},
	watch: {
		itemBatchBarCode:{
			handler: function(val, oldval) {
				if(val.length == 19) {
					this.changeBar();
				}
			},
		},
		'insertData.billDetails':{
		   handler: function(val, oldval) {
				
		   },
		},
		deep: true,
		immediate: true
	},
	created: function() {
		var that = this
		token = localStorage.getItem('token');
		var billMaster = localStorage.getItem('billMaster');
		billMaster = JSON.parse(billMaster)

		var billNo = billMaster.billNo;
		$.ajax({

			dataType: "json",
			headers: {
				"Accept": "*/*",
				"access-token": token
			},
			contentType: "application/json",
			url: baseUrl + "/bill/details/list?billNo=" + billNo,
			async: false,
			success: function(data) {
				if(data.code == 200) {
					debugger
					var list = data.data.list;
					that.insertData.billDetails = list
				}
			}
		});
	},
	methods: {
		commit: function(state) {
		    var insertData = this.insertData;
			  insertData.billMaster.state = state;
			  var data = getServerData('/bill/masters/accept', 'POST', insertData);
			  if(data.code == 200) {
				mui.alert('入库成功，返回上一页面', '成功', function() {
				window.location.href = '../accept.html'
			  });
			  }
//		    if(this.panduan()){
//			  
//			}else{
//			   mui.alert('入库数量和实际数量不符');
//			}
		},
		change: function() {
			debugger
			var acceptQuantity = this.acceptQuantity;
			if(this.batch.itemCode != null) {
				var itemCode = this.batch.itemCode;
				var nowDetail = aaaa(this.insertData.billDetails, 'itemCode', itemCode)
				var Quantity=nowDetail[0].quantity;
				if(acceptQuantity<=Quantity)
				{
				  nowDetail[0].acceptQuantity = parseInt(acceptQuantity);
				}
			}
			this.acceptQuantity ='';
		},
		changeBar: function() {
			var that = this;
			itemBatchBarCode = that.itemBatchBarCode;
			debugger
			var data = getServerData('/item/batchs/list', 'GET', {itemBatchBarCode:itemBatchBarCode});
			that.itemBatchBarCode = '';
			that.batch = data.data.list[0];
			var itemCode = that.batch.itemCode;
			var nowDetail = aaaa(that.insertData.billDetails, 'itemCode', itemCode)
			if(nowDetail.length == 0) {
				return
			}
			var acceptQuantity = nowDetail[0].acceptQuantity;
			var Quantity=nowDetail[0].quantity;
			if(acceptQuantity == null) {
				acceptQuantity = 1;
			} else if(acceptQuantity<Quantity){
				acceptQuantity = acceptQuantity + 1
			}

			nowDetail[0].acceptQuantity = acceptQuantity;
			nowDetail[0].batchId = that.batch.batchId;
			that.itemBarCode = '';
		},
		panduan:function(){
			var list = this.insertData.billDetails;
			var flag = true;
			for(var i=0;list.length>0 && i<list.length;i++){
				if(list[i].quantity != list[i].acceptQuantity){
					flag = false;
					return;
				}
			}
			return flag;
		}
	}
})