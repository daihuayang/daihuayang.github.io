export async function list(ctx) {
  const { page = 1, size = 10 } = ctx.query;
  const offset = (page - 1) * size;
  
  const [rows] = await pool.query(
    'SELECT * FROM questions LIMIT ? OFFSET ?',
    [parseInt(size), parseInt(offset)]
  );
  
  ctx.body = {
    code: 0,
    data: rows
  };
} 