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
		info: {},
		insertData: {
			billMaster: JSON.parse(localStorage.getItem('billMaster')),
			billDetails: []
		}
	},
	watch: {　　　　　　　　
		itemBatchBarCode: {

			handler: function(val, oldval) {
				if(val.length == 19) {
					this.changeBar();
				}
			},
		},
		　　　
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
					 
					var list = data.data.list;
					that.insertData.billDetails = list
				}
			}
		});
	},

	methods: {
		commit: function() {
			var billNo = this.insertData.billMaster.billNo;
			var billDetails = this.insertData.billDetails;
			var flag = 1;
			 
			for(var i=0;i<billDetails.length;i++){
				var billDetail = billDetails[i];
				if(billDetail.quantity != billDetail.acceptQuantity){
					flag =0
				}
			}
			if(flag == 0){
				mui.alert('复核数量不正确，请重新复核', '失败', function() {
						return 
				});
			}else{
				var data = getServerData('/bill/masters/reCheck', 'GET', {billNo:billNo});
				if(data.code == 200) {
					mui.alert('复核成功，返回上一页面', '成功', function() {
						window.location.href = '../re-check.html'
					});
				}
			}
			
		},

		change: function() {

			var acceptQuantity = this.acceptQuantity;
			if(this.info.itemCode != null) {
				var itemCode = this.info.itemCode;
				var nowDetail = aaaa(this.billDetails, 'itemCode', itemCode)
				nowDetail[0].acceptQuantity = parseInt(acceptQuantity);

			}
		},
		changeBar: function() {
			var that = this;
			itemBatchBarCode = that.itemBatchBarCode;
			that.itemBatchBarCode = '';
			var data = getServerData('/item/batchs/list', 'GET', {itembatchBarCode:itemBatchBarCode});
			that.batch = data.data.list[0];
			
			var itemCode = that.batch.itemCode;
			
			var nowDetail = aaaa(that.insertData.billDetails, 'itemCode', itemCode)
			if(nowDetail.length == 0) {
				return
			}
			var acceptQuantity = nowDetail[0].acceptQuantity;
			if(acceptQuantity == null) {
				acceptQuantity = 1;
			} else {
				acceptQuantity = acceptQuantity + 1
			}

			nowDetail[0].acceptQuantity = acceptQuantity;
			nowDetail[0].batchId = that.batch.batchId;
			that.itemBarCode = '';
			
			  

		},
		 

	}
})