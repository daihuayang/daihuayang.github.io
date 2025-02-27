export const questionRules = {
  title: [
    { required: true, message: '请输入题目内容' },
    { max: 500, message: '长度不超过500字符' }
  ],
  analysis: [
    { required: true, message: '请输入解析内容' }
  ]
} 