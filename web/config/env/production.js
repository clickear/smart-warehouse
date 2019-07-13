const project = '/DeerWMS';
const port = 3302;
const publicPath = `http://192.168.20.112:8002`; // webpack 上线环境地址
module.exports = {
    project: project,// 工程逻辑目录
    port: port,         // 监听端口
    isProdEnv: true,    // 当前环境是否为生产环境
    staticResources: 'dist', // 静态资源目录
    publicPath: publicPath,
    webservice: {
        url: 'http://122.112.219.208:8002',
        ver: '/wms',
        connectTimeout: false,
        requestTimeout: false
    },
    cache: { // 默认取本地缓存
        strategy: 'redis', // 缓存策略 local: 本地缓存(未安装redis环境)  redis：redis缓存(支持集群部署)
        
     
    },
    log4js: {
        level: 'info', // 日志级别：debug|info|error
        output: '/logs/app.log' // 日志输出路径
    },
    https: {
        enable: false,
        cert: [__dirname, '../certs/test-cert.pem'].join('/'), // 绝对路径
        key: [__dirname, '../certs/test-key.pem'].join('/')
    },
    rootPath: [__dirname, '/../../'].join(''), // 项目根目录
    session: {
        secret: 'mftp-secret', // session secret
        name: 'sid', // cookieName
        sid: '*',
        cookie: {
            path: project,
            maxAge: 3600000 // cookie最大生命周期1h，单位：ms
        },
        storeStrategy: 'redis', // 策略 mysql|redis|memory
        store: null,
        resave: true,
        rolling: true,
        saveUninitialized: false
    }
};