/**
 * redis session store config
 */
exports.store = {
  host: '127.0.0.1', // 服务器
  db: 0, //  使用第几个数据库
  pass: '', // Redis数据库密码
  port: 6379,
  ttl: 3600, // Redis session TTL 过期时间 （秒） 60mins
  prefix: 'mftp-session:' // key前缀
};
