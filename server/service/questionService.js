const { getAsync, setAsync } = require('../config/redis.config');
const pool = require('../config/db.config');

async function getQuestionsWithCache(page, size) {
  const cacheKey = `questions:${page}:${size}`;
  const cachedData = await getAsync(cacheKey);
  
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const offset = (page - 1) * size;
  const [rows] = await pool.query(
    'SELECT * FROM questions LIMIT ? OFFSET ?',
    [size, offset]
  );
  
  await setAsync(cacheKey, JSON.stringify(rows), 'EX', 300); // 缓存5分钟
  return rows;
} 