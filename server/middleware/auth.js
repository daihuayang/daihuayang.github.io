const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  
  if (!token) {
    return res.status(401).json({ code: -1, message: '未授权访问' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ code: -1, message: '令牌无效' })
  }
} 