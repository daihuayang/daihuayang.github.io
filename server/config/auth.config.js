// JWT配置
module.exports = {
  secret: process.env.JWT_SECRET || 'dev-secret',
  expiresIn: '2h'
} 