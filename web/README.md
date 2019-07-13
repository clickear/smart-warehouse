
## 功能支持
* 自定义工程根目录
* 支持https  

## 项目结构
* build: 项目启动文件存放目录
* app: 项目后端业务代码目录
* config: 项目配置文件目录  
    ./env: 项目环境配置目录  
    ./certs: https证书存放目录  
    ./strategy: session和passport策略目录  
    ./index.js: 项目配置统一对外暴露接口  
* logs: 日志目录  
* test: 测试文件目录  
* routes: 业务路由目录  
* public: 项目前端静态资源目录  
* views: ejs文件目录   
* pm2.json: PM2配置文件    

## 项目启动
1.npm install    （第一次导入项目需要先下载node依赖）
* 正常启动：``` npm start ```
* PM2启动：``` pm2 start pm2.json ```
* 生产环境启动：``` npm run start_pro ```  

## 项目构建  
构建脚本存放于gulpfile.js  

* 打包：``` npm run build-prod ```  
* Less编译： ``` npm run less ```  

## 单元测试  
### 如何编写单元测试？  
* 参考test目录下的例子  

### 如何运行单元测试？
1. 全局安装mocha模块
2. 使用命令：``` mocha FILE_DIRECTORY/YOUR_TEST_CASE_FILE ```  

### 如何调试单元测试？
方法有多种，这里我们采用的是node-inspector来实现。  

1. 全局安装node-inspector模块  
2. 启动node-inspector监视任务  
3. 以调试模式执行单元测试实例  
``` mocha -t TIME_OUT_MILLISECONDS --debug-brk FILE_DIRECTORY/YOUR_TEST_CASE_FILE ```  
4. 打开浏览器输入地址即可开始调试代码：[``` http://localhost:8080/debug?port=5858 ```](http://localhost:8080/debug?port=5858)
