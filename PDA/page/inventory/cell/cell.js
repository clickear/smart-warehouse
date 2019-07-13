var vue = new Vue({
	// 进行控件绑定(el->element)，绑定html页面中id为card的控件，相当于document.getElementById("card")
	el: ".contain ",
	data: {
		cellBarCode:'',
		pallets:[],
		itemBatchBarCode: '',
		acceptQuantity: '',
		user: "aaa",
		pwd: "",
		batch:{},
		item: [],
		 
		insertData: {
			billMaster: JSON.parse(localStorage.getItem('billMaster')),
			billDetails: []
		}
	},
	watch: {　　　　　　　　
		cellBarCode: {

			handler: function(val, oldval) {
				if(val.length > 5) {
					this.changeBar();
				}
			},
		},
		　　　
	},
	created: function() {
		 
	},

	methods: {
		commit: function(state) {
			var pallets = this.pallets;
			debugger
			/*var insertData = this.insertData;
			insertData.billMaster.state = state;
			var data = getServerData('/bill/masters/accept', 'POST', insertData);
			if(data.code == 200) {
				mui.alert('验收成功，返回上一页面', '成功', function() {
					window.location.href = '../accept.html'
				});
			}*/
		},

		change: function() {

			debugger
			var acceptQuantity = this.acceptQuantity;
			if(this.batch.itemCode != null) {
				var itemCode = this.batch.itemCode;
				var nowDetail = aaaa(this.insertData.billDetails, 'itemCode', itemCode)
				nowDetail[0].acceptQuantity = parseInt(acceptQuantity);

			}
			this.acceptQuantity ='';
		},
		changeBar: function() {
			var that = this;
			var cellBarCode = that.cellBarCode;
			  
			var data = getServerData('/pallet/batchs/getCellInfo', 'GET', {cellCode:cellBarCode});
			if(data.code ==200 && data.data.list.length >0 ){
				that.pallets = data.data.list;
				 
			}
			that.cellBarCode = '';
			 
			
			 
			 

		},
		 

	}
})