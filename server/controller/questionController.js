const pool = require('../config/db.config');

exports.listQuestions = async (req, res) => {
  try {
    const { page = 1, size = 10 } = req.query;
    const offset = (page - 1) * size;
    
    const [rows] = await pool.query(
      'SELECT * FROM questions LIMIT ? OFFSET ?',
      [parseInt(size), parseInt(offset)]
    );
    
    res.json({
      code: 0,
      data: rows,
      pagination: {
        page: Number(page),
        pageSize: Number(size),
        total: rows.length
      }
    });
  } catch (err) {
    res.status(500).json({ code: -1, message: err.message });
  }
}; 