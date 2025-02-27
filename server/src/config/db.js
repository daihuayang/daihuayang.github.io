const pool = mysql.createPool({
  host: 'localhost',  // 改为本地数据库地址
  user: 'root',       // 数据库用户名
  password: 'your_password', // 数据库密码
  database: 'qadb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}); 