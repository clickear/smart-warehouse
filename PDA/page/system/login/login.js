
var vue = new Vue({
            // 进行控件绑定(el->element)，绑定html页面中id为card的控件，相当于document.getElementById("card")
            el:".mui-content ",
            data: {
            	user:"13685133739", 
            	pwd:"123456",
            	address:'http://localhost:8000/wms'
              },
            methods:{
            	commit:function(){
							 
							var queryQaram ={account:this.user,password:this.pwd}; 
            	            var data = getServerData('/login','POST',queryQaram)	 
           					 
							if(data.code ==200){
								localStorage.setItem('token', data.data.token);
								window.location.href = "../index/index.html"; 
							} 
            	},
            	changeAdd:function(){
            		localStorage.setItem('baseUrl',this.address)
            	}
            },
            created:function(){
            	localStorage.setItem('baseUrl',this.address)
            }

        })
