export default [
  {
    path: '/questions',
    name: '题目管理',
    icon: 'book',
    routes: [
      {
        path: '/list',
        name: '题目列表',
        component: './QuestionList',
      },
      {
        path: '/create',
        name: '新增题目',
        component: './QuestionForm',
      }
    ]
  }
]; 