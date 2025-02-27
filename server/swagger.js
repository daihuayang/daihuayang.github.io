/**
 * @swagger
 * /api/questions:
 *   get:
 *     summary: 获取题目列表
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 题目列表
 */ 